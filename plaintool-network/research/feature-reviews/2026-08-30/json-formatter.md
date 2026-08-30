# JSON Formatter 기능 리뷰

- 검토일: 2026-08-30
- 현재 공개 경로: `/{locale}/json-formatter/`
- 공개 상태: `indexable` (`apps/web/src/lib/tool-registry.js`)
- 기능 소유: `apps/web/src/features/json/**`
- 코어/테스트 소유: `packages/json-core/**`, `apps/web/src/features/json/operation.test.ts`

## 결론

현재 구현은 단순 `JSON.parse` 후 재직렬화하는 도구보다 보수적이다. 원문의 큰 정수 표기를 숫자로 변환하지 않고 그대로 보존하며, 엄격한 JSON 문법을 검사하고, 중복 키와 BOM 제거를 별도 경고로 노출한다. Format/Validate/Minify, 2칸·4칸·탭, 파일 열기, 복사, 모드별 다운로드 이름, 10 MiB 상한, 1 MiB 초과 수동 실행, Worker 최신 결과 권한까지 갖췄다.

가장 큰 빈칸은 구조 탐색이다. 경쟁 도구에서 보이는 트리 보기, 키 검색, 접기/펼치기, 선택 경로 복사가 없어 깊은 JSON을 읽는 작업에는 불리하다. 이 기능은 포맷 기능을 흐리지 않는 별도 결과 보기 또는 별도 route로 검토하는 편이 맞다.

## 이미 개선된 점과 추적 근거

- `packages/json-core/src/index.ts`는 `jsonc-parser`의 tree와 edit API를 사용한다. `formatJson()`과 `minifyJson()`은 문자열 숫자 lexeme와 escape를 재직렬화하지 않아 큰 정수 표기를 보존한다.
- 주석, trailing comma, 작은따옴표를 허용하지 않는 엄격 모드다. 첫 오류의 line/column/offset을 typed issue로 반환한다.
- 문법이 유효한 경우 객체별 중복 키를 수집하며, UTF-8 BOM을 제거했는지 별도로 기록한다.
- `apps/web/src/features/json/client.ts`는 Format/Validate/Minify 선택 상태를 유지하고, Format에서만 들여쓰기 옵션을 활성화한다. Format과 Minify 다운로드 이름도 분리한다.
- 입력 변경 시 이전 출력은 stale로 표시하되 복사/다운로드 권한을 즉시 끊고, 최신 Worker 응답만 commit한다. Clear, 파일 교체, 오류도 이전 결과 권한을 무효화한다.
- 10 MiB를 넘는 입력은 거부하고 1 MiB를 넘으면 자동 처리하지 않는다. 입력과 출력은 textarea 값으로만 다뤄진다.
- Git 추적: `23bfbca`에서 HTML pilot과 함께 JSON 모드/옵션/다운로드/stale UX가 보강됐고, `1f60abf`에서 포매터 공통 보안 경계가 강화됐으며, `1f69677`에서 locale 검토 후 indexable로 승격됐다.

## 경쟁 표면 관찰

관찰일은 모두 2026-08-30이다. 아래는 페이지에서 직접 확인한 컨트롤과 설명만 적었다.

| 서비스 | 직접 관찰한 기능 | 비교 |
| --- | --- | --- |
| [JSONLint JSON Formatter](https://jsonlint.com/json-formatter) | Validate, Compress, Sort Keys, Copy, Load Sample, 키보드 단축키, 브라우저 처리 설명 | PlainTool은 파일 열기·다운로드·중복 키/BOM 경고·명시적 들여쓰기 탭이 좋다. JSONLint는 Sort Keys와 더 넓은 JSON 도구 연결이 앞선다. |
| [JSONLint Pretty Print](https://jsonlint.com/json-pretty-print) | 1·2·4칸 들여쓰기, 자동 입력 처리, 키 정렬, 복사·다운로드 | PlainTool은 탭 들여쓰기와 Validate/Minify가 한 작업면에 있다. JSONLint는 1칸과 키 정렬을 제공한다. |
| [JSONFormatter.org](https://jsonformatter.org/) | 트리 보기, graph 보기, 업로드·다운로드, 2·3·4칸, 자동 갱신, 마지막 데이터 localStorage 복원 | PlainTool은 도구 데이터 persistence를 하지 않는 구조라 민감 입력에 더 단순한 경계를 제공한다. 구조 탐색과 3칸 들여쓰기는 부족하다. 상대 사이트의 실제 네트워크·저장 동작은 이번 검토에서 계측하지 않았다. |

## 상대 평가

### 더 강한 부분

- 큰 정수 lexeme를 JS number로 변환하지 않고 보존한다는 점이 코드와 테스트로 고정돼 있다.
- duplicate key를 조용히 덮어쓰지 않고 위치별 경고로 보여 준다.
- BOM 제거를 숨기지 않고 고지한다.
- 자동 처리와 수동 처리 경계, UTF-8 byte 상한, stale 결과 차단이 명시적이다.
- 도구 입력을 URL, localStorage, 결과 preview DOM에 넣지 않는 제품 경계가 문서와 코드에 있다.

### 대체로 동등한 부분

- strict validation, pretty print, minify, copy/download, 파일 입력은 주요 온라인 포매터와 같은 기본 작업을 덮는다.
- 즉시 처리와 명시적 실행을 함께 제공한다. 실제 체감 속도 우열은 벤치마크하지 않았다.

### 약한 부분

- 트리 보기, collapse/expand, key/value 검색, JSONPath, 선택 노드 복사가 없다.
- 키 정렬이 없다. 단, 키 순서를 바꾸는 기능은 기본 동작이 아니라 명시적 opt-in이어야 한다.
- 코드 에디터식 줄 번호·구문 강조·오류 gutter가 없다. 현재는 오류 위치로 textarea selection만 이동한다.
- JSON Repair, JSON5, JSON Schema validation은 지원하지 않는다. 엄격 JSON 도구라는 현재 범위에는 오히려 맞지만 이를 경쟁 기능처럼 암시해서는 안 된다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 없음 | - | 높음 | - | 현재 확인된 데이터 손실·실행·stale 권한 blocker는 없다. |
| P1 | 읽기 전용 트리 보기와 key/value 검색을 별도 결과 view로 추가 | 큼 | 높음 | 중간 | 깊은 JSON 읽기라는 가장 큰 경쟁 격차를 메운다. 원문/포맷 결과를 source of truth로 유지한다. |
| P1 | 줄 번호와 오류 위치 강조를 제공하는 경량 editor layer 검토 | 큼 | 중간 | 중간 | 큰 문서 오류 수정 시간을 줄인다. 코드 폰트·모바일 성능 예산을 먼저 측정한다. |
| P2 | `Sort keys`를 명시적 비기본 옵션으로 추가 | 중간 | 높음 | 낮음~중간 | diff 정리에 유용하지만 객체 키 순서를 실제로 변경한다는 경고와 중첩 정책이 필요하다. |
| P2 | 선택 노드 JSON Pointer/JSONPath 복사 | 중간 | 중간 | 중간 | 트리 보기가 도입될 때 함께 검토한다. 독립적으로 넣으면 주 작업을 복잡하게 한다. |
| P3 | JSON5/repair/schema를 별도 route 후보로 조사 | 제한적 | 중간 | 큼 | strict JSON의 의미를 흐리지 않도록 현재 route에 섞지 않는다. |

## 표현 가능한 claim

- 안전: “Format, validate, and minify strict JSON in your browser.”
- 안전: “Preserves large numeric text while changing only JSON whitespace.”
- 안전: “Reports syntax locations, duplicate keys, and BOM removal.”
- 안전: “Files up to 10 MiB are accepted; inputs over 1 MiB require a manual action.”

## 금지하거나 추가 검증이 필요한 claim

- 금지: “The fastest JSON formatter.” 성능 비교를 하지 않았다.
- 금지: “No data ever leaves your device.” 현재 도구 데이터 경계는 로컬이지만 브라우저 QA의 실제 network capture 없이 사이트 전체 전송 부재로 확대하면 안 된다.
- 금지: “Validates every JSON standard” 또는 JSON5/JSON Schema 지원 암시.
- 금지: “Fixes invalid JSON.” 오류를 보고할 뿐 repair하지 않는다.
- 금지: “Duplicate keys make JSON invalid.” RFC 문법 오류로 처리하지 않고 경고한다.
- 금지: “Formatting never changes meaning”을 무조건적으로 사용. 중복 키 문서의 소비자 의미는 구현마다 다를 수 있고 BOM은 제거된다.

## 검증과 한계

- 현재 integration worktree의 코드, 테스트, registry, uncommitted locale fingerprint 변경을 읽기 전용으로 확인했다.
- 집중 테스트: JSON core 9개 + operation 3개, 모두 통과. 전체 묶음은 13 files / 112 tests 통과였다.
- 경쟁 페이지의 노출 UI와 문구만 확인했다. 상대 서비스에 민감 데이터를 입력하거나 network/storage를 계측하지 않았다.
- 이번 분기에서는 live desktop/mobile 브라우저 상호작용을 재실행하지 않았다. 저장소 QA에는 formatter 보안·stale 검사가 있으나 이번 보고서의 직접 실행 증거로 간주하지 않는다.
