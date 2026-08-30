export type IpSubnetErrorCode =
  | "empty-input"
  | "missing-prefix"
  | "invalid-format"
  | "invalid-address"
  | "invalid-octet"
  | "invalid-prefix"
  | "invalid-netmask"
  | "non-contiguous-netmask";

export class IpSubnetError extends Error {
  constructor(public readonly code: IpSubnetErrorCode) {
    super(code);
    this.name = "IpSubnetError";
  }
}

export type IpSubnetSemantics = "subnet" | "point-to-point" | "single-address";

export type Ipv4ClassificationCode =
  | "not-classified"
  | "unspecified"
  | "current-network"
  | "private-use"
  | "shared-address-space"
  | "loopback"
  | "link-local"
  | "ietf-protocol-assignment"
  | "documentation"
  | "deprecated-6to4-relay"
  | "6a44-relay"
  | "benchmarking"
  | "multicast"
  | "reserved"
  | "limited-broadcast";

export interface Ipv4Classification {
  code: Ipv4ClassificationCode;
  /** The most specific supported special-use block, when applicable. */
  cidr: string | null;
  /** Null means that no supported classification matched; it is not a reachability claim. */
  specialUse: boolean | null;
}

export interface IpSubnetBinaryDetails {
  address: string;
  netmask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
}

export interface IpSubnetOptions {
  includeBinary?: boolean;
}

export interface IpSubnetResult {
  inputAddress: string;
  prefixLength: number;
  cidr: string;
  netmask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableAddress: string;
  lastUsableAddress: string;
  totalAddresses: number;
  usableAddresses: number;
  containingRange: string;
  semantics: IpSubnetSemantics;
  classification: Ipv4Classification;
  binary?: IpSubnetBinaryDetails;
}

interface ParsedAddress {
  octets: [number, number, number, number];
  value: number;
  normalized: string;
}

interface ClassificationRange {
  code: Exclude<Ipv4ClassificationCode, "not-classified">;
  network: number;
  prefix: number;
}

const IPV4_MAX = 2 ** 32 - 1;
export const IPV4_SUBNET_INPUT_MAX_LENGTH = 64;

function trimBoundedInput(input: string): string {
  if (input.length > IPV4_SUBNET_INPUT_MAX_LENGTH) {
    throw new IpSubnetError("invalid-format");
  }
  return input.trim();
}

function parseAddress(input: string, mask = false): ParsedAddress {
  const parts = input.split(".");
  if (parts.length !== 4) {
    throw new IpSubnetError(mask ? "invalid-netmask" : "invalid-address");
  }

  const octets = parts.map((part) => {
    if (!/^(?:0|[1-9]\d{0,2})$/u.test(part)) {
      throw new IpSubnetError(mask ? "invalid-netmask" : "invalid-octet");
    }
    const value = Number(part);
    if (value > 255) {
      throw new IpSubnetError(mask ? "invalid-netmask" : "invalid-octet");
    }
    return value;
  }) as [number, number, number, number];

  const value =
    octets[0] * 2 ** 24 + octets[1] * 2 ** 16 + octets[2] * 2 ** 8 + octets[3];
  return { octets, value, normalized: octets.join(".") };
}

function valueToAddress(value: number): string {
  const normalized = Math.trunc(value);
  return [
    Math.floor(normalized / 2 ** 24),
    Math.floor(normalized / 2 ** 16) % 256,
    Math.floor(normalized / 2 ** 8) % 256,
    normalized % 256,
  ].join(".");
}

function prefixToMaskValue(prefixLength: number): number {
  return prefixLength === 0 ? 0 : IPV4_MAX - (2 ** (32 - prefixLength) - 1);
}

function maskToPrefix(mask: ParsedAddress): number {
  const bits = mask.octets
    .map((octet) => octet.toString(2).padStart(8, "0"))
    .join("");
  if (!/^1*0*$/u.test(bits)) {
    throw new IpSubnetError("non-contiguous-netmask");
  }
  return bits.indexOf("0") === -1 ? 32 : bits.indexOf("0");
}

function parsePrefix(value: string): number {
  if (!/^(?:0|[1-9]\d?)$/u.test(value)) {
    throw new IpSubnetError("invalid-prefix");
  }
  const prefix = Number(value);
  if (prefix > 32) throw new IpSubnetError("invalid-prefix");
  return prefix;
}

function parseInput(input: string): {
  address: ParsedAddress;
  prefixLength: number;
} {
  const trimmed = trimBoundedInput(input);
  if (!trimmed) throw new IpSubnetError("empty-input");

  let addressPart: string;
  let maskPart: string;
  const usesSlash = trimmed.includes("/");
  if (usesSlash) {
    const parts = trimmed.split("/");
    if (parts.length !== 2) throw new IpSubnetError("invalid-format");
    [addressPart, maskPart] = parts;
  } else {
    const parts = trimmed.split(/ +/u);
    if (parts.length === 1) throw new IpSubnetError("missing-prefix");
    if (parts.length !== 2) throw new IpSubnetError("invalid-format");
    [addressPart, maskPart] = parts;
  }

  if (!addressPart) throw new IpSubnetError("invalid-address");
  if (!maskPart) throw new IpSubnetError("missing-prefix");
  const address = parseAddress(addressPart);
  const prefixLength =
    !usesSlash || maskPart.includes(".")
      ? maskToPrefix(parseAddress(maskPart, true))
      : parsePrefix(maskPart);
  return { address, prefixLength };
}

function range(code: ClassificationRange["code"], cidr: string) {
  const [address, prefix] = cidr.split("/");
  return {
    code,
    network: parseAddress(address).value,
    prefix: Number(prefix),
  } satisfies ClassificationRange;
}

// Ordered from the most specific supported block to broader catch-alls.
const CLASSIFICATION_RANGES: ClassificationRange[] = [
  range("unspecified", "0.0.0.0/32"),
  range("limited-broadcast", "255.255.255.255/32"),
  range("6a44-relay", "192.88.99.2/32"),
  range("deprecated-6to4-relay", "192.88.99.0/24"),
  range("documentation", "192.0.2.0/24"),
  range("documentation", "198.51.100.0/24"),
  range("documentation", "203.0.113.0/24"),
  range("ietf-protocol-assignment", "192.0.0.0/24"),
  range("private-use", "10.0.0.0/8"),
  range("private-use", "172.16.0.0/12"),
  range("private-use", "192.168.0.0/16"),
  range("shared-address-space", "100.64.0.0/10"),
  range("loopback", "127.0.0.0/8"),
  range("link-local", "169.254.0.0/16"),
  range("benchmarking", "198.18.0.0/15"),
  range("current-network", "0.0.0.0/8"),
  range("multicast", "224.0.0.0/4"),
  range("reserved", "240.0.0.0/4"),
];

function contains(value: number, network: number, prefix: number): boolean {
  const size = 2 ** (32 - prefix);
  return value >= network && value < network + size;
}

export function classifyIpv4(input: string): Ipv4Classification {
  const address = parseAddress(trimBoundedInput(input));
  const match = CLASSIFICATION_RANGES.find((candidate) =>
    contains(address.value, candidate.network, candidate.prefix),
  );
  return match
    ? {
        code: match.code,
        cidr: `${valueToAddress(match.network)}/${match.prefix}`,
        specialUse: true,
      }
    : { code: "not-classified", cidr: null, specialUse: null };
}

function toBinary(address: string): string {
  return parseAddress(address)
    .octets.map((octet) => octet.toString(2).padStart(8, "0"))
    .join(".");
}

export function calculateIpv4Subnet(
  input: string,
  options: IpSubnetOptions = {},
): IpSubnetResult {
  const { address, prefixLength } = parseInput(input);
  const totalAddresses = 2 ** (32 - prefixLength);
  const networkValue =
    Math.floor(address.value / totalAddresses) * totalAddresses;
  const broadcastValue = networkValue + totalAddresses - 1;
  const netmaskValue = prefixToMaskValue(prefixLength);
  const wildcardValue = IPV4_MAX - netmaskValue;
  const networkAddress = valueToAddress(networkValue);
  const broadcastAddress = valueToAddress(broadcastValue);
  const netmask = valueToAddress(netmaskValue);
  const wildcardMask = valueToAddress(wildcardValue);

  let semantics: IpSubnetSemantics = "subnet";
  let firstUsableValue = networkValue + 1;
  let lastUsableValue = broadcastValue - 1;
  let usableAddresses = Math.max(0, totalAddresses - 2);
  if (prefixLength === 31) {
    semantics = "point-to-point";
    firstUsableValue = networkValue;
    lastUsableValue = broadcastValue;
    usableAddresses = 2;
  } else if (prefixLength === 32) {
    semantics = "single-address";
    firstUsableValue = lastUsableValue = networkValue;
    usableAddresses = 1;
  }

  const result: IpSubnetResult = {
    inputAddress: address.normalized,
    prefixLength,
    cidr: `${networkAddress}/${prefixLength}`,
    netmask,
    wildcardMask,
    networkAddress,
    broadcastAddress,
    firstUsableAddress: valueToAddress(firstUsableValue),
    lastUsableAddress: valueToAddress(lastUsableValue),
    totalAddresses,
    usableAddresses,
    containingRange: `${networkAddress} – ${broadcastAddress}`,
    semantics,
    classification: classifyIpv4(address.normalized),
  };

  if (options.includeBinary) {
    result.binary = {
      address: toBinary(address.normalized),
      netmask: toBinary(netmask),
      wildcardMask: toBinary(wildcardMask),
      networkAddress: toBinary(networkAddress),
      broadcastAddress: toBinary(broadcastAddress),
    };
  }
  return result;
}
