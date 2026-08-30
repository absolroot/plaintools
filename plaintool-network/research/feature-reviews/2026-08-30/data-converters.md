# Data Converters 기능 리뷰

- 검토일: 2026-08-30
- 현재 공개 경로: `/{locale}/csv-to-markdown/`, `markdown-to-csv/`, `json-to-csv/`, `csv-to-json/`, `html-to-markdown/`, `markdown-to-html/`
- 공개 상태: 6개 route 모두 `indexable`
- 기능 소유: `apps/web/src/features/data-converter/**`
- 코어/테스트 소유: `packages/data-conversion-core/**`, `scripts/qa/data_converter_feature.py`

## 결론

현재 6개 변환은 “여러 형식을 한 거대한 편집기에 넣는 도구”보다 작업별 route가 명확하고, 변환 오류를 typed code와 위치로 처리하며, Worker에서 최신 입력만 commit하는 것이 장점이다. CSV quoted newline/escaped quote/BOM, 쉼표·탭·세미콜론·파이프 자동 감지, Markdown pipe/code span, JSON 객체 배열의 union header 등 실제 round-trip 함정을 상당히 잘 다룬다.

반면 TableConvert처럼 parsed table을 직접 보고 수정하고, transpose/deduplicate/find-replace 후 여러 출력 형식으로 내보내는 작업에는 크게 뒤진다. 현재 integration worktree의 미커밋 mode switch는 정방향/역방향 이동을 좋아지게 하지만 라벨 6개가 영어로 hardcode되어 17-locale 제품 계약을 어긴다. 이 부분이 가장 먼저 고칠 항목이다.

## 이미 개선된 점과 추적 근거

- `f903072`가 6개 변환 core/UI/Worker/tests를 추가했고, `01cd8ef`가 17-locale route와 catalog에 통합했으며, `1f69677`이 locale 검토 후 전부 indexable로 승격했다.
- 현재 integration worktree에는 정방향/역방향 쌍을 같은 상단 switch에서 이동시키는 미커밋 개선이 있다. CSV↔Markdown, JSON↔CSV, HTML↔Markdown의 관계가 즉시 보인다.
- CSV parser는 quoted delimiter, doubled quote, CRLF, quoted newline, BOM, empty cell을 다루며 malformed quote의 line/column을 반환한다.
- delimiter는 최대 12개 행에서 쉼표·탭·세미콜론·파이프를 비교하며, 따옴표 안 delimiter는 세지 않는다.
- CSV→Markdown은 행 폭을 정규화하고 pipe/backslash를 escape하며 multiline cell을 `<br>`로 보존한다. 첫 행 header 사용 여부도 선택할 수 있다.
- Markdown→CSV는 주변 prose에서 첫 table을 찾고 alignment marker, escaped pipe, inline-code pipe, `<br>`를 처리한다.
- JSON→CSV는 객체 배열만 받으며 모든 행의 key union을 header로 만든다. nested object/array는 compact JSON cell로 보존한다.
- CSV→JSON은 empty/duplicate header와 header보다 긴 row를 명시적으로 거부하고, 빠진 trailing cell은 빈 문자열로 채운다. pretty JSON 토글이 있다.
- HTML↔Markdown은 `turndown`과 `marked`를 사용하며 GFM table/fenced code를 다룬다. Markdown→HTML 결과는 실행하지 않고 textarea source로만 제공한다.
- 모든 mode는 파일 열기와 drag/drop, copy/download, 10 MiB 상한, 1 MiB 이하 자동 실행, Ctrl/Cmd+Enter를 제공한다.

## 경쟁 표면 관찰

관찰일은 모두 2026-08-30이다.

| 서비스 | 직접 관찰한 기능 | 비교 |
| --- | --- | --- |
| [TableConvert CSV to Markdown](https://tableconvert.com/csv-to-markdown) | paste/upload/drag, CSV·TSV, parsed table editor, undo/redo, transpose, empty 삭제, deduplicate, case 변환, regex replace, Markdown escape/header/alignment/multiline 옵션, copy/download | PlainTool은 집중 route와 오류 taxonomy가 단순하다. TableConvert는 변환 전 데이터 점검·수정과 출력 옵션이 훨씬 강하다. |
| [TableConvert JSON to CSV](https://tableconvert.com/json-to-csv) | JSON upload/drag, table editor, 여러 출력 format, quote/BOM/value delimiter/row delimiter/prefix/suffix 옵션 | PlainTool은 union header와 nested value 직렬화 규칙이 테스트로 명시돼 있다. TableConvert는 출력 세부 설정과 시각 편집이 앞선다. |
| [TableConvert HTML to Markdown](https://tableconvert.com/html-to-markdown) | HTML table을 source로 받고 table editor를 거쳐 Markdown을 생성하는 표 중심 workflow | PlainTool의 HTML→Markdown은 heading, link, list, emphasis, fenced code 등 일반 문서 변환 범위가 더 넓다. TableConvert와 목적 범위가 달라 전체 품질 우열로 말할 수 없다. |

TableConvert 페이지는 브라우저 로컬 처리와 10MB 파일 지원을 문구로 밝힌다. 이번 검토에서는 그 주장을 network capture로 독립 검증하지 않았으므로 privacy 우열 근거로 사용하지 않는다.

## 상대 평가

### 더 강한 부분

- 일반 HTML 문서↔Markdown과 table 변환을 같은 제품군에서 제공하되 route를 분리한다.
- CSV/Markdown/JSON의 오류·손실 가능성이 큰 edge case가 구체적 테스트로 고정돼 있다.
- Markdown→HTML에 raw HTML이 남더라도 현재 페이지에서는 source textarea 밖으로 inject하거나 실행하지 않는다.
- stale Worker reply, 늦은 file read, 늦은 clipboard 결과의 권한을 revision으로 차단한다.

### 대체로 동등한 부분

- paste, upload/drag, 자동 변환, copy/download, delimiter 선택, 브라우저 기반 처리라는 핵심 흐름은 직접 관찰한 TableConvert route와 겹친다.
- PlainTool은 10 MiB, TableConvert는 페이지 문구상 10MB다. 단위와 실제 측정 조건이 달라 동일하거나 더 크다고 주장하지 않는다.

### 약한 부분

- parsed table preview/editor, row/column 수정, undo/redo, transpose, deduplicate, sort, regex replace가 없다.
- CSV quote style, BOM output, row delimiter, prefix/suffix, Markdown alignment/bold/line number 옵션이 없다.
- Excel, XML, YAML, SQL, LaTeX 등 broader format network가 없다. 현재 6개 route 범위 밖이다.
- JSON→CSV는 root object, primitive array, JSON Lines를 받지 않는다. nested object는 flatten하지 않고 JSON 문자열 cell로 넣는다.
- Markdown→CSV는 첫 Markdown table만 읽고, HTML→Markdown은 DOM/Turndown 규칙의 best-effort 변환이다. arbitrary HTML fidelity를 약속할 수 없다.
- 현재 미커밋 `modeLabels`가 영어 상수라 비영어 route 상단에 영어가 노출된다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 없음 | - | 높음 | - | 확인된 변환 데이터 손실 blocker나 source 실행 경로는 없다. |
| P1 | mode switch 라벨을 locale bundle에서 공급 | 큼 | 높음 | 낮음 | 현재 미커밋 개선의 17-locale 회귀를 막는 필수 수정이다. hardcoded 영어를 그대로 merge하면 안 된다. |
| P1 | CSV/Markdown/JSON table route에 read-only parsed preview와 열 수·행 수·감지 delimiter 표시 | 큼 | 높음 | 중간 | 변환 전에 잘못 감지된 delimiter/header를 발견하게 한다. 전체 spreadsheet editor까지 확장하지 않는다. |
| P1 | Markdown→HTML 출력 옆에 “sanitize before insertion” 경고를 workspace 가까이에 유지/강화 | 큼 | 높음 | 낮음 | 결과 source 자체는 inert하지만 다운로드·복사 후 DOM에 넣는 위험은 남는다. sanitizer 기능을 지원한다고 암시하지 않는다. |
| P2 | CSV output의 UTF-8 BOM과 CRLF/LF를 명시 옵션으로 추가 | 중간 | 높음 | 중간 | Excel/기존 시스템 호환성을 높인다. locale copy와 round-trip fixture가 필요하다. |
| P2 | JSON→CSV의 flatten strategy를 opt-in으로 설계 | 중간 | 중간 | 중간~큼 | dot/bracket notation, array 정책, collision 규칙을 먼저 결정해야 한다. 현재 compact JSON cell을 기본으로 유지한다. |
| P2 | Markdown table alignment 보존·선택 | 중간 | 중간 | 중간 | 현재 alignment marker를 허용하지만 CSV round-trip에서 의미가 사라진다. 별도 metadata 정책 없이는 과장하지 않는다. |
| P3 | Excel/XML/YAML 등 새 형식은 독립 route 후보로 수요 조사 | 제한적 | 중간 | 큼 | 현재 route에 30+ format picker를 넣으면 한 route 한 작업 원칙과 locale 비용이 커진다. |

## 표현 가능한 claim

- 안전: “Six focused browser-based conversions: CSV↔Markdown, JSON↔CSV, and HTML↔Markdown.”
- 안전: “Handles quoted CSV fields, escaped delimiters, BOM input, and multiline cells.”
- 안전: “Markdown-to-HTML returns source text; it is not rendered or executed in the tool.”
- 안전: “JSON-to-CSV accepts an array of objects and preserves nested values as compact JSON cells.”

## 금지하거나 추가 검증이 필요한 claim

- 금지: “Lossless conversion between all supported formats.” HTML/Markdown과 table metadata는 본질적으로 완전 round-trip이 아니다.
- 금지: “Supports any CSV.” delimiter/encoding/record edge cases와 10 MiB 상한이 있다.
- 금지: “Sanitizes HTML” 또는 “safe HTML output.” raw HTML을 보존할 수 있으며 sanitize하지 않는다.
- 금지: “Supports all Markdown/GFM.” table/fenced code 등 테스트된 subset과 `marked`/`turndown` 동작 범위다.
- 금지: “Better than TableConvert.” 표 편집과 format breadth는 상대 서비스가 명백히 더 넓다.
- 금지: “No data leaves the device”를 이번 경쟁 비교의 network 계측 결과처럼 표현. 현재 코드 경계와 페이지 privacy 문구를 구분해야 한다.

## 검증과 한계

- integration worktree의 현재 uncommitted `DataConverter.astro` mode switch와 registry category 변경까지 읽기 전용으로 검토했다.
- `packages/data-conversion-core/src/index.test.ts` 21개 테스트가 통과했다. 전체 집중 묶음은 13 files / 112 tests 통과였다.
- 저장소 browser QA에는 Markdown→HTML XSS source가 textarea에 남고 실행되지 않는 검사가 있으나 이번 턴에 브라우저 QA 자체는 재실행하지 않았다.
- 경쟁 서비스의 표 편집 결과 정확도, 대용량 성능, 실제 local-only network 동작은 독립 검증하지 않았다.
