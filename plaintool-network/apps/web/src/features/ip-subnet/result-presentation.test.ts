import { describe, expect, it } from "vitest";
import { calculateIpv4Subnet } from "@plaintool/ip-subnet-core";
import type { ToolCommonCopy } from "../common-copy-contract";
import type { IpSubnetCopy } from "./contract";
import { createIpSubnetClientCopy } from "./copy";
import {
  createIpSubnetResultRows,
  createIpSubnetTextResult,
} from "./result-presentation";

const feature = {
  ariaLabel: "도구",
  inputLabel: "주소와 마스크",
  inputPlaceholder: "예시",
  inputHint: "안내",
  sample: "샘플",
  resultTitle: "결과",
  normalizedCidr: "정규화 CIDR",
  netmask: "넷마스크",
  wildcardMask: "와일드카드",
  networkAddress: "네트워크",
  broadcastAddress: "브로드캐스트",
  firstUsableAddress: "첫 주소",
  lastUsableAddress: "끝 주소",
  totalAddresses: "전체 개수",
  usableAddresses: "사용 가능 개수",
  containingRange: "포함 범위",
  semanticsLabel: "주소 의미",
  semantics: {
    subnet: "일반 서브넷",
    "point-to-point": "지점 간 링크",
    "single-address": "단일 주소",
  },
  specialUseTitle: "특수 용도 세부 정보",
  classificationLabel: "분류",
  classificationBlockLabel: "분류 블록",
  classifications: {
    "not-classified": "지원 분류와 일치하지 않음",
    unspecified: "미지정",
    "current-network": "현재 네트워크",
    "private-use": "사설 사용",
    "shared-address-space": "공유 주소 공간",
    loopback: "루프백",
    "link-local": "링크 로컬",
    "ietf-protocol-assignment": "IETF 프로토콜 할당",
    documentation: "문서 예시",
    "deprecated-6to4-relay": "폐기된 6to4 릴레이",
    "6a44-relay": "6a44 릴레이",
    benchmarking: "벤치마크",
    multicast: "멀티캐스트",
    reserved: "예약",
    "limited-broadcast": "제한 브로드캐스트",
  },
  binaryTitle: "이진 세부 정보",
  binaryAddress: "주소 이진값",
  binaryNetmask: "넷마스크 이진값",
  binaryWildcard: "와일드카드 이진값",
  binaryNetwork: "네트워크 이진값",
  binaryBroadcast: "브로드캐스트 이진값",
  calculated: "계산 완료",
  outdated: "이전 결과",
  downloadFilename: "서브넷-결과.txt",
  errors: {
    "empty-input": "빈 입력",
    "missing-prefix": "프리픽스 누락",
    "invalid-format": "형식 오류",
    "invalid-address": "주소 오류",
    "invalid-octet": "옥텟 오류",
    "invalid-prefix": "프리픽스 오류",
    "invalid-netmask": "넷마스크 오류",
    "non-contiguous-netmask": "연속되지 않은 넷마스크",
  },
} satisfies IpSubnetCopy;

const common = {
  ready: "준비",
  working: "작업 중",
  clear: "지우기",
  copy: "복사",
  download: "다운로드",
  copied: "복사 완료",
  copyFailed: "복사 실패",
  processingFailed: "처리 실패",
  localTitle: "로컬 처리",
  localBody: "브라우저 안에서 처리됩니다.",
} satisfies ToolCommonCopy;

describe("IP subnet result presentation", () => {
  it("maps every primary field by an explicit key", () => {
    const result = calculateIpv4Subnet("192.168.1.70/26");
    expect(createIpSubnetResultRows(result, feature)).toEqual([
      { key: "cidr", label: "정규화 CIDR", value: "192.168.1.64/26" },
      { key: "netmask", label: "넷마스크", value: "255.255.255.192" },
      { key: "wildcardMask", label: "와일드카드", value: "0.0.0.63" },
      {
        key: "networkAddress",
        label: "네트워크",
        value: "192.168.1.64",
      },
      {
        key: "broadcastAddress",
        label: "브로드캐스트",
        value: "192.168.1.127",
      },
      {
        key: "firstUsableAddress",
        label: "첫 주소",
        value: "192.168.1.65",
      },
      {
        key: "lastUsableAddress",
        label: "끝 주소",
        value: "192.168.1.126",
      },
      { key: "totalAddresses", label: "전체 개수", value: "64" },
      { key: "usableAddresses", label: "사용 가능 개수", value: "62" },
      {
        key: "containingRange",
        label: "포함 범위",
        value: "192.168.1.64 – 192.168.1.127",
      },
    ]);
  });

  it("builds copy and download text entirely from injected labels", () => {
    const result = calculateIpv4Subnet("198.51.100.10/31");
    const text = createIpSubnetTextResult(result, feature);
    expect(text).toContain("주소 의미: 지점 간 링크");
    expect(text).toContain("분류: 문서 예시");
    expect(text).toContain("분류 블록: 198.51.100.0/24");
    expect(text).not.toContain("Semantics");
    expect(text).not.toContain("Classification");
  });

  it("creates the exact typed client facade without fallback copy", () => {
    expect(createIpSubnetClientCopy(feature, common)).toEqual({
      feature,
      common,
    });
  });
});
