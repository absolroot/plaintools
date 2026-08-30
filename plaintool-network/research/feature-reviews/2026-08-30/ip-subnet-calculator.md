# IP subnet calculator

- 리뷰 일자: `2026-08-30`
- 라우트: `/[locale]/ip-subnet-calculator/`
- 기능/코어/QA: `apps/web/src/features/ip-subnet/`, `packages/ip-subnet-core/`, `scripts/qa/formatter_subnet_feature.py`
- 공개 상태: `indexable`, 17개 로케일
- 검토 기준: 커밋 `02a7c57`과 현재 통합 작업트리

## 이미 개선된 점

| 개선 | 사용자 가치 | 근거 | 주요 커밋 |
| --- | --- | --- | --- |
| CIDR, slash netmask, 공백+netmask 입력을 같은 결과로 정규화 | 현장에서 복사한 다양한 IPv4 표현을 다시 고칠 필요가 적다 | `parseInput()`, 동등성 unit test | `1b059f8` |
| `/0`, `/1`, `/30`, `/31`, `/32` 경계 의미를 명시적으로 테스트 | JS signed 32-bit 오버플로와 point-to-point/host route 오류를 방지 | `index.test.ts` 경계 테스트 | `1b059f8` |
| network/broadcast/usable range, netmask, wildcard, binary, 총/사용 가능 주소를 제공 | 계산 결과와 수동 검산 근거를 한 화면에서 볼 수 있다 | `IpSubnetResult`, binary details | `1b059f8` |
| RFC 1918 외에도 shared, loopback, link-local, documentation, benchmark, multicast 등을 구분 | 주소 범위의 성격을 빠르게 파악하되 reachability로 과장하지 않는다 | `CLASSIFICATION_RANGES`, `specialUse: null` 계약 | `1b059f8` |
| 제어문자, 전각 숫자, non-contiguous mask, 과대 입력을 엄격히 거부 | 애매하거나 붙여넣기 오염된 입력을 조용히 정상화하지 않는다 | security unit tests | `1f60abf` |
| 90ms debounce와 revision 기반 stale-result 방지 | 빠른 입력 중 오래된 결과가 최신 입력처럼 보이지 않는다 | `client.ts` | `1b059f8` |
| 전체 결과 복사·텍스트 다운로드와 브라우저 로컬 처리 | 계산 결과를 티켓/문서에 옮기기 쉽고 입력이 서버로 전송되지 않는다 | client, architecture/network QA | `1b059f8` |

## 경쟁 도구에서 확인한 점

| 경쟁 도구 | 확인된 기능 | 확인 일자 | 직접 URL |
| --- | --- | --- | --- |
| Calculator.net | IPv4와 IPv6 계산, network/usable range/subnet mask/IP class 등의 결과 | 2026-08-30 | https://www.calculator.net/ip-subnet-calculator.html |
| OpenVPN subnet calculator | IPv4/IPv6, CIDR 또는 subnet mask, wildcard/binary/capacity, IPv6 `/64` 분할, 브라우저 로컬 실행 | 2026-08-30 | https://openvpn.net/subnet-calculator/ |

기술 의미 검토에는 RFC 3021(`/31`)과 IANA special-purpose registry 계열을
참조해야 한다. 경쟁 페이지의 문구만으로 구현 정확도를 판정하지 않았다.

## 상대 평가

### 더 나은 점

- 현재 IPv4 범위에서는 `/0`과 `/31`·`/32`를 명시적으로 회귀 테스트하고,
  애매한 입력과 control-bearing input을 엄격히 거부한다.
- 특수 용도 분류가 “공개/도달 가능” 같은 네트워크 상태 주장으로 확장되지
  않도록 `not-classified`와 `specialUse: null`을 구분한다.
- 결과 전체를 한 번에 복사하거나 다운로드할 수 있고, stale-result 권한
  계약이 코드와 QA에 있다.

### 비슷한 점

- network/broadcast/usable range, netmask, wildcard, address count, binary는
  전문 경쟁 도구에서도 일반적으로 제공된다.
- 브라우저 로컬 계산 역시 OpenVPN 등 경쟁 도구가 명시하므로 단독 우위가 아니다.

### 부족한 점

- IPv6 계산을 지원하지 않는다.
- VLSM 계획, prefix split, supernet aggregation, range→최소 CIDR 변환이 없다.
- 각 개별 결과 옆의 복사 버튼과 `/0`~`/32` 치트시트가 없다.
- wildcard mask 입력과 필요한 host 수에서 prefix를 찾는 입력 방식이 없다.

## 업그레이드 백로그

| 우선순위 | 후보 | 사용자 영향 | 확신 | 예상 노력 | 상태 |
| --- | --- | --- | --- | --- | --- |
| P1 | 결과 행별 복사 버튼 | 네트워크 설정에 필요한 한 값만 빠르게 복사 | 높음 | 작음~중간 | 후보 |
| P3 | IPv6 전용 도구: prefix, 범위, address count, `/127`·`/128` 의미 | 전문 네트워크 작업 | 중간 | 큼: 별도 core/계약/17 locale/QA | 수요 근거 전까지 별도 기능으로 보류 |
| P3 | subnet split과 host-count→prefix | 전문 설계 작업 | 중간 | 큼 | 별도 VLSM 도구 수요가 확인될 때 검토 |
| P3 | range→최소 CIDR 집합 | ACL/라우팅 목록 작성 | 중간 | 큼 | 기본 계산기 옵션으로 추가하지 않고 별도 작업으로 보류 |
| P3 | CIDR 치트시트/학습 시각화 | 초보자 검산과 검색 가치 | 중간 | 중간 | 후보 |

## 주장 원장

### 지금 말해도 되는 표현

- “IPv4 CIDR과 dotted netmask를 network, broadcast, host range, wildcard, binary 정보로 브라우저에서 계산합니다.”
- “`/31` point-to-point와 `/32` single-address 의미를 별도로 처리합니다.”
- “지원하는 특수 목적 IPv4 블록을 분류하되 도달 가능성은 주장하지 않습니다.”

### 아직 말하면 안 되는 표현

- “IPv4와 IPv6를 모두 지원합니다.”
- “완전한 네트워크/VLSM 설계 도구입니다.”
- “다른 subnet calculator보다 더 정확하거나 더 안전합니다.”

## 검증과 한계

- 소스 검토: core, client, UI, 31개 core unit case, 전용 QA 모듈.
- 경쟁 페이지는 2026-08-30 기준 직접 URL의 공개 기능을 비교했다.
- IPv6/VLSM은 현재 범위 밖이며 단순 UI 옵션 추가로 해결할 수 없는 별도 기능군이다.
- 인앱 브라우저 연결 실패로 이 문서 작성 시 수동 인터랙션은 완료하지 못했다.
  저장소 Chromium QA 결과는 최종 인덱스에 별도 기록한다.
