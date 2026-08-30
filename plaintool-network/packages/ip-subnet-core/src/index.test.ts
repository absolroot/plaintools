import { describe, expect, it } from "vitest";
import {
  IPV4_SUBNET_INPUT_MAX_LENGTH,
  IpSubnetError,
  calculateIpv4Subnet,
  classifyIpv4,
} from "./index";

describe("IPv4 subnet calculation", () => {
  it("calculates the complete /0 range without signed 32-bit overflow", () => {
    const result = calculateIpv4Subnet("203.0.113.9/0");
    expect(result).toMatchObject({
      networkAddress: "0.0.0.0",
      broadcastAddress: "255.255.255.255",
      netmask: "0.0.0.0",
      wildcardMask: "255.255.255.255",
      totalAddresses: 4_294_967_296,
      usableAddresses: 4_294_967_294,
    });
  });

  it("calculates /1 boundaries", () => {
    expect(calculateIpv4Subnet("200.1.2.3/1")).toMatchObject({
      networkAddress: "128.0.0.0",
      broadcastAddress: "255.255.255.255",
      firstUsableAddress: "128.0.0.1",
      lastUsableAddress: "255.255.255.254",
    });
  });

  it("calculates conventional /30 host endpoints", () => {
    expect(calculateIpv4Subnet("192.168.4.6/30")).toMatchObject({
      networkAddress: "192.168.4.4",
      broadcastAddress: "192.168.4.7",
      firstUsableAddress: "192.168.4.5",
      lastUsableAddress: "192.168.4.6",
      totalAddresses: 4,
      usableAddresses: 2,
      semantics: "subnet",
    });
  });

  it("treats both /31 endpoints as usable for point-to-point links", () => {
    expect(calculateIpv4Subnet("198.51.100.11/31")).toMatchObject({
      networkAddress: "198.51.100.10",
      broadcastAddress: "198.51.100.11",
      firstUsableAddress: "198.51.100.10",
      lastUsableAddress: "198.51.100.11",
      totalAddresses: 2,
      usableAddresses: 2,
      semantics: "point-to-point",
    });
  });

  it("treats /32 as one usable single-address range", () => {
    expect(calculateIpv4Subnet("8.8.8.8/32")).toMatchObject({
      networkAddress: "8.8.8.8",
      broadcastAddress: "8.8.8.8",
      firstUsableAddress: "8.8.8.8",
      lastUsableAddress: "8.8.8.8",
      totalAddresses: 1,
      usableAddresses: 1,
      semantics: "single-address",
    });
  });

  it("finds the containing range for an address inside a network", () => {
    const result = calculateIpv4Subnet("172.16.45.129/20");
    expect(result.containingRange).toBe("172.16.32.0 – 172.16.47.255");
    expect(result.cidr).toBe("172.16.32.0/20");
  });

  it("normalizes CIDR and dotted netmask inputs equivalently", () => {
    const cidr = calculateIpv4Subnet("192.168.1.34/27");
    const slashMask = calculateIpv4Subnet("192.168.1.34/255.255.255.224");
    const spacedMask = calculateIpv4Subnet("192.168.1.34 255.255.255.224");
    expect(slashMask).toEqual(cidr);
    expect(spacedMask).toEqual(cidr);
  });

  it("returns the normalized wildcard mask", () => {
    expect(calculateIpv4Subnet("10.9.8.7/21").wildcardMask).toBe("0.0.7.255");
  });

  it("includes binary details only when requested", () => {
    expect(calculateIpv4Subnet("192.0.2.1/24").binary).toBeUndefined();
    expect(
      calculateIpv4Subnet("192.0.2.1/24", { includeBinary: true }).binary,
    ).toEqual({
      address: "11000000.00000000.00000010.00000001",
      netmask: "11111111.11111111.11111111.00000000",
      wildcardMask: "00000000.00000000.00000000.11111111",
      networkAddress: "11000000.00000000.00000010.00000000",
      broadcastAddress: "11000000.00000000.00000010.11111111",
    });
  });
});

describe("IPv4 input errors", () => {
  it.each([
    ["", "empty-input"],
    ["192.168.1.1", "missing-prefix"],
    ["192.168.1.1/", "missing-prefix"],
    ["192.168.1.1/33", "invalid-prefix"],
    ["192.168.1.1/x", "invalid-prefix"],
    ["192.168.1.1/24/1", "invalid-format"],
    ["192.168.1.1 24", "invalid-netmask"],
    ["192.168.1/24", "invalid-address"],
    ["256.0.0.1/24", "invalid-octet"],
    ["01.2.3.4/24", "invalid-octet"],
    ["192.168.1.1/255.0.255.0", "non-contiguous-netmask"],
    ["192.168.1.1/255.255.255.999", "invalid-netmask"],
  ])("reports %s as %s", (input, code) => {
    expect(() => calculateIpv4Subnet(input)).toThrowError(
      expect.objectContaining({ code }),
    );
  });

  it("uses a typed domain error", () => {
    expect(() => calculateIpv4Subnet("1.2.3.4")).toThrowError(IpSubnetError);
  });

  it.each([
    "0x7f.0.0.1/8",
    "+127.0.0.1/8",
    "127.0.0.1e0/8",
    "１２７.０.０.１/８",
    "127.0.0.1/8\u0000",
    "127.0.0.1/8\u202e",
    "127.0.0.1/8\n8.8.8.8/32",
    "127.0.0.1\u00a0255.0.0.0",
    "127.0.0.1\n255.0.0.0",
  ])("rejects ambiguous or control-bearing input %j", (input) => {
    expect(() => calculateIpv4Subnet(input)).toThrowError(IpSubnetError);
  });

  it("rejects oversized input before parsing it", () => {
    const input = "1".repeat(IPV4_SUBNET_INPUT_MAX_LENGTH + 1);
    expect(() => calculateIpv4Subnet(input)).toThrowError(
      expect.objectContaining({ code: "invalid-format" }),
    );
    expect(() => classifyIpv4(input)).toThrowError(
      expect.objectContaining({ code: "invalid-format" }),
    );
  });
});

describe("IPv4 address classification", () => {
  it.each([
    ["10.0.0.0", "private-use", "10.0.0.0/8"],
    ["10.255.255.255", "private-use", "10.0.0.0/8"],
    ["172.16.0.0", "private-use", "172.16.0.0/12"],
    ["172.31.255.255", "private-use", "172.16.0.0/12"],
    ["192.168.0.0", "private-use", "192.168.0.0/16"],
    ["192.168.255.255", "private-use", "192.168.0.0/16"],
  ])("recognizes RFC 1918 boundary %s", (input, code, cidr) => {
    expect(classifyIpv4(input)).toEqual({ code, cidr, specialUse: true });
  });

  it.each([
    "9.255.255.255",
    "11.0.0.0",
    "172.15.255.255",
    "172.32.0.0",
    "192.167.255.255",
    "192.169.0.0",
  ])("does not extend RFC 1918 across boundary %s", (input) => {
    expect(classifyIpv4(input).code).toBe("not-classified");
  });

  it.each([
    ["0.0.0.0", "unspecified"],
    ["0.1.2.3", "current-network"],
    ["100.64.0.1", "shared-address-space"],
    ["127.0.0.1", "loopback"],
    ["169.254.10.20", "link-local"],
    ["192.0.0.8", "ietf-protocol-assignment"],
    ["192.0.2.10", "documentation"],
    ["192.88.99.1", "deprecated-6to4-relay"],
    ["192.88.99.2", "6a44-relay"],
    ["198.51.100.10", "documentation"],
    ["203.0.113.10", "documentation"],
    ["198.18.0.1", "benchmarking"],
    ["224.0.0.1", "multicast"],
    ["240.0.0.1", "reserved"],
    ["255.255.255.255", "limited-broadcast"],
  ])("classifies %s as %s", (input, code) => {
    expect(classifyIpv4(input)).toMatchObject({ code, specialUse: true });
  });

  it("makes no reachability claim outside supported classification blocks", () => {
    expect(classifyIpv4("8.8.8.8")).toEqual({
      code: "not-classified",
      cidr: null,
      specialUse: null,
    });
  });
});
