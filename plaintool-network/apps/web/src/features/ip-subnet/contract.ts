import type {
  IpSubnetErrorCode,
  IpSubnetSemantics,
  Ipv4ClassificationCode,
} from "@plaintool/ip-subnet-core";
import type { ToolCommonCopy } from "../common-copy-contract";

export interface IpSubnetCopy {
  ariaLabel: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputHint: string;
  sample: string;
  resultTitle: string;
  normalizedCidr: string;
  netmask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableAddress: string;
  lastUsableAddress: string;
  totalAddresses: string;
  usableAddresses: string;
  containingRange: string;
  semanticsLabel: string;
  semantics: Record<IpSubnetSemantics, string>;
  specialUseTitle: string;
  classificationLabel: string;
  classificationBlockLabel: string;
  classifications: Record<Ipv4ClassificationCode, string>;
  binaryTitle: string;
  binaryAddress: string;
  binaryNetmask: string;
  binaryWildcard: string;
  binaryNetwork: string;
  binaryBroadcast: string;
  calculated: string;
  outdated: string;
  downloadFilename: string;
  errors: Record<IpSubnetErrorCode, string>;
}

export interface IpSubnetClientCopy {
  feature: IpSubnetCopy;
  common: ToolCommonCopy;
}

export interface IpSubnetComponentProps {
  copy: IpSubnetCopy;
  commonCopy: ToolCommonCopy;
  sampleInput: string;
}
