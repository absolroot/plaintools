import type { IpSubnetResult } from "@plaintool/ip-subnet-core";
import type { IpSubnetCopy } from "./contract";

export type IpSubnetResultKey =
  | "cidr"
  | "netmask"
  | "wildcardMask"
  | "networkAddress"
  | "broadcastAddress"
  | "firstUsableAddress"
  | "lastUsableAddress"
  | "totalAddresses"
  | "usableAddresses"
  | "containingRange";

export interface IpSubnetResultRow {
  key: IpSubnetResultKey;
  label: string;
  value: string;
}

export function createIpSubnetResultRows(
  result: IpSubnetResult,
  copy: IpSubnetCopy,
): IpSubnetResultRow[] {
  return [
    { key: "cidr", label: copy.normalizedCidr, value: result.cidr },
    { key: "netmask", label: copy.netmask, value: result.netmask },
    {
      key: "wildcardMask",
      label: copy.wildcardMask,
      value: result.wildcardMask,
    },
    {
      key: "networkAddress",
      label: copy.networkAddress,
      value: result.networkAddress,
    },
    {
      key: "broadcastAddress",
      label: copy.broadcastAddress,
      value: result.broadcastAddress,
    },
    {
      key: "firstUsableAddress",
      label: copy.firstUsableAddress,
      value: result.firstUsableAddress,
    },
    {
      key: "lastUsableAddress",
      label: copy.lastUsableAddress,
      value: result.lastUsableAddress,
    },
    {
      key: "totalAddresses",
      label: copy.totalAddresses,
      value: String(result.totalAddresses),
    },
    {
      key: "usableAddresses",
      label: copy.usableAddresses,
      value: String(result.usableAddresses),
    },
    {
      key: "containingRange",
      label: copy.containingRange,
      value: result.containingRange,
    },
  ];
}

export function createIpSubnetTextResult(
  result: IpSubnetResult,
  copy: IpSubnetCopy,
): string {
  const lines = createIpSubnetResultRows(result, copy).map(
    ({ label, value }) => `${label}: ${value}`,
  );
  lines.push(`${copy.semanticsLabel}: ${copy.semantics[result.semantics]}`);
  lines.push(
    `${copy.classificationLabel}: ${copy.classifications[result.classification.code]}`,
  );
  if (result.classification.cidr) {
    lines.push(
      `${copy.classificationBlockLabel}: ${result.classification.cidr}`,
    );
  }
  return lines.join("\n");
}
