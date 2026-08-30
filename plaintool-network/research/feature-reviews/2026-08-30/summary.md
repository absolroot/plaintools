# 전체 기능 경쟁력 요약

## 결론

AbsolTools의 가장 설득력 있는 강점은 기능 수가 아니다. 입력을 브라우저 로컬
경계에 두고, 오래된 비동기 결과가 최신 입력을 이기지 못하게 하며, 자동 복구·
오류·손실 가능성을 숨기지 않는 **설명 가능한 단일 목적 도구**라는 점이다.

경쟁 도구도 browser-local, copy/download, dark mode 같은 기본 요소를 흔히
제공한다. 따라서 이 항목만으로 “더 안전하다”거나 “더 좋다”고 말하면 안 된다.
대신 아래처럼 구현과 테스트로 증명 가능한 계약을 제품 설명의 중심에 둔다.

- Base64 복구 코드, JSON duplicate key/BOM, text diff line ending처럼 입력에
  일어난 변화를 구체적으로 보여 준다.
- Worker, file read, clipboard의 revision/authority를 검사해 오래된 결과 사용을
  막는다.
- JWT decode≠verify, formatter≠validator, hash≠authentication처럼 도구의 한계를
  결과 가까이에서 말한다.
- HTML/CSS/JavaScript/SQL을 source text로만 처리하고 현재 DOM에서 실행하지 않는다.
- 17개 로케일에서 route, 오류, FAQ, legal/SEO 계약을 함께 관리한다.

## 경쟁 도구보다 좋은 지점

| 축 | 평가 | 대표 기능 |
| --- | --- | --- |
| 상태 정확성 | 최신 입력만 결과 권한을 가지는 계약과 QA가 넓게 적용돼 있다 | Base64, JSON, diff, case, formatter, converter |
| 설명 가능성 | 자동 복구·정규화·경고를 숨기지 않는다 | Base64, AI cleaner, JSON, timestamp |
| 경계 의미 | 애매한 값을 추측하거나 성공을 신뢰 판정으로 확대하지 않는다 | timestamp 11~12자리, JWT, SQL dialect, `/31`·`/32` |
| 원문 안전 | code/source 결과를 preview DOM에 실행하지 않고, 원문과 결과를 분리한다 | HTML/JS/CSS/SQL, data converter, case |
| 다국어 제품화 | 단순 UI 번역이 아니라 오류·FAQ·SEO·RTL/LTR 기술 입력까지 계약화했다 | 전체 25 routes |

이 평가는 공개 기능 관찰과 현 구현 근거를 비교한 것이다. 동일 브라우저·동일
입력 corpus·동일 네트워크 조건의 시장 전체 벤치마크는 아니므로 속도·정확도
우승 표현에는 사용할 수 없다.

## 부족한 지점

1. 전문 경쟁 도구의 폭: JSON tree/search, diff ignore/patch, checksum compare,
   structured QR, timestamp micro/nanoseconds, IPv6/VLSM이 없다.
2. 대용량 처리: Base64/hash는 파일 전체 메모리 모델이고, SQL/formatter 한도는
   실제 large-source benchmark가 부족하다.
3. 결과 사용성: 일부 도구는 전체 결과만 복사하거나, 단계/중간 결과·행별 복사·
   parsed preview가 없다.
4. 위험 기본값: Base64 반복 디코드와 AI cleaner bidi/NBSP는 사용자가 예상한
   한 단계보다 더 큰 의미 변경을 만들 수 있다.
5. 신뢰 문구: JWT는 상단 경고뿐 아니라 결과와 다운로드에도 `NOT VERIFIED`가
   따라다녀야 한다.

## 우선순위

### P0 — 공개 의미와 신뢰를 먼저 보호

| 상태 | 항목 | 판단 |
| --- | --- | --- |
| 완료 | Case Converter route locale을 Worker/core에 전달 | `7e59906`, Turkish 네 모드 회귀 테스트 추가 |
| 미완료 | AI cleaner의 bidi controls 기본 보존, NBSP 기본값 재검토 | RTL/의도적 non-breaking spacing 의미 변경 가능 |
| 미완료 | Base64 반복 디코드 기본 off 또는 1단계/최종 결과 분리 | 사용자가 기대한 원문보다 더 깊게 해석 가능 |
| 미완료 | JWT 결과·다운로드에 `NOT VERIFIED` 고정 | decode 성공을 token validity로 오해할 위험 |

미완료 P0 경로는 이번 감사 중 다른 세션의 미커밋 UI·17 locale 작업과 겹쳐
덮어쓰지 않았다. 각 기능 보고서에 정확한 변경 범위와 claim guardrail을 남겼다.

### P1 — 작은 노력 대비 효과가 큰 순서

1. 현재 Data Converter mode switch의 영어 hardcode를 locale copy로 이동.
2. JavaScript Minify에서 `/*!`, `@license`, `@preserve` 고지를 기본 보존.
3. Base64 hex preview의 전체 byte 수와 잘림 여부 표시.
4. Hash에 expected checksum 일치/불일치 흐름 추가.
5. Word Counter 결과 가까이에 grapheme/문단 계산 규칙 설명 추가.
6. IP subnet 결과 행별 복사 추가.

### P1/P2 — 별도 설계가 필요한 확장

- JSON tree/search, Text Compare ignore rules+patch, timestamp micro/nano,
  IPv6/VLSM, QR structured payload, large-file streaming.
- 이 확장은 기능 수를 늘리는 것보다 현재 한 route 한 주기능을 유지하는 것이
  중요하다. 보조 보기, 접힌 Options, 또는 별도 route 중 하나를 먼저 결정한다.

## 이번 감사에서 실제 반영한 변경

- `research/feature-reviews/`에 재사용 가능한 템플릿, 날짜별 인덱스, 17개
  기능군 보고서, 전체 요약을 만들었다.
- Case Converter의 locale-aware mapping을 구현하고 Turkish dotted/dotless I를
  upper/lower/sentence/capitalize-words 네 모드에서 테스트했다.
- 경쟁 기능, 현재 강점, 부족한 점, P0~P3 백로그, 안전한/금지 claim을 기능별로
  분리해 이후 구현 커밋을 같은 문서에 연결할 수 있게 했다.

## 검증 상태

- root 집중 테스트: timestamp+subnet `2 files / 69 tests`, Case 수정 후
  `1 file / 13 tests` 통과.
- 병렬 리뷰에서 읽기 전용 기준으로 실행한 집중 테스트: text cores
  `4 files / 46 tests`, codec/security `6 files / 41 tests`, data/formatter
  `13 files / 112 tests` 통과.
- root TypeScript 단계는 통과했다. 전체 Astro check는 감사와 겹쳐 진행 중인
  `NewToolPreview.astro`의 새 required `help` prop 누락 5건으로 실패했다.
- 인앱 브라우저 연결은 실행 메타데이터 문제로 사용할 수 없었다. 저장소의
  Chromium QA는 별도 로컬 서버에서 최종 재시도하며, 실패 시 원인을 이 문서와
  오케스트레이션 원장에 기록한다.
- 실행 Node는 `v22.12.0`으로 저장소 요구 버전 `>=22.19 <23`보다 낮다. 따라서
  위 집중 테스트는 유효한 회귀 신호지만 정식 전체 release gate 통과 주장은 아니다.

