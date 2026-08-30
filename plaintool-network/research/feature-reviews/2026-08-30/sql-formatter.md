# SQL Formatter 기능 리뷰

- 검토일: 2026-08-30
- 현재 공개 경로: `/{locale}/sql-formatter/`
- 공개 상태: `indexable`
- 기능 소유: `apps/web/src/features/sql-formatter/**`
- 코어/테스트 소유: `packages/sql-formatter-core/**`, `scripts/qa/formatter_subnet_feature.py`

## 결론

현재 지원 범위는 정확히 6개 선택지다: `sql` common subset, PostgreSQL, MySQL, MariaDB, SQLite, SQL Server Transact-SQL. 자동 dialect 감지는 없고, query를 실행·DB 연결·parameter 치환·minify하지 않는다. 들여쓰기와 keyword case만 제공하는 좁고 이해하기 쉬운 formatter다.

명시적 dialect 선택과 stale/source-only 안전성은 좋지만, 기반 `sql-formatter` 15.8.2가 지원하는 dialect와 option 중 작은 부분만 노출한다. BigQuery, Snowflake, Oracle PL/SQL, Redshift, Spark/Trino 같은 실사용 dialect가 없고, 32 KiB 상한도 migration/query bundle에는 작다. “all SQL dialects” 또는 “ANSI SQL validator”는 절대 쓸 수 없다.

## 정확한 지원 범위

- `sql`: common subset. 자동 감지가 아니며 특정 DB 문법을 모두 지원하지 않는다.
- `postgresql`
- `mysql`
- `mariadb`
- `sqlite`
- `transactsql`: SQL Server Transact-SQL
- 옵션: 2 spaces, 4 spaces, tabs; keyword case `preserve`, `upper`, `lower`
- 하지 않는 일: query execution, DB/network connection, parameter replacement, minification, schema validation, query optimization
- 기반 library의 공개 문서상 stored procedure와 `;` 이외 delimiter 변경은 지원하지 않는다. PlainTool도 이를 확장하지 않는다.

## 이미 개선된 점과 추적 근거

- `3a414bc`/`d3c3cf1` 계열에서 core/UI/Worker/state와 dialect별 fixture가 추가됐다.
- `1f60abf`/`b9be9d1`에서 SQL source inertness, oversized input rejection, Worker timeout/output cap을 보강했다.
- `c5836f1`/`3fac389`에서 formatter lazy loading과 OSS notice가 정리됐고, `1f69677`에서 indexable로 승격됐다.
- `SQL_DIALECTS` 상수가 6개 목록을 고정하며, 테스트가 목록 전체를 exact equality로 확인한다.
- 각 dialect fixture는 PostgreSQL cast/JSON operator, MySQL/MariaDB backtick, SQLite `json_extract`, T-SQL `TOP`/bracket identifier를 포함한다.
- generic `sql`은 “unknown dialect auto detection”이 아니라 common subset이라는 주석과 test가 있다.
- parse failure는 하나의 typed `FormattingFailed` code로 유지하고, library error의 line/column suffix만 UI focus용으로 추출한다.
- input은 8 KiB까지 자동, 32 KiB까지 수동, 그 이상 거부한다. Worker timeout은 5초, output cap은 20 MiB다.
- output은 readonly textarea이고 query-like hostile source도 실행 surface에 삽입하지 않는다.

## 경쟁 표면 관찰

관찰일은 모두 2026-08-30이다.

| 서비스 | 직접 관찰한 기능 | 비교 |
| --- | --- | --- |
| [sqlformat.org](https://sqlformat.org/) | browser formatting, keyword/identifier case, indentation, output format, remove comments, compact mode, Ctrl/Cmd shortcuts | PlainTool은 6개 dialect 선택과 parser failure 위치가 강하다. sqlformat.org는 identifier/compact/comment/output 옵션이 넓다. |
| [SQL Formatter 공식 demo](https://sql-formatter-org.github.io/sql-formatter/) / [dialect docs](https://github.com/sql-formatter-org/sql-formatter/blob/master/docs/dialect.md) | library가 BigQuery, ClickHouse, DB2, DuckDB, Hive, PL/SQL, PostgreSQL, Redshift, Snowflake, Spark, SQLite, T-SQL, Trino 등 더 많은 dialect를 노출하며 generic `sql`은 auto-detection이 아닌 common subset이라고 명시 | PlainTool은 같은 library의 6개 subset만 노출한다. dialect breadth는 명백히 약하다. |
| [sqlfmt.app](https://www.sqlfmt.app/) | dialect 선택 기반 formatting과 grammar validation, syntax error line/column/snippet, typo warning을 페이지가 설명 | PlainTool은 formatter parse failure만 제공하며 validator/typo checker가 아니다. 상대 정확도나 dialect별 coverage는 이번 검토에서 입력 fixture로 검증하지 않았다. |

## 상대 평가

### 더 강한 부분

- dialect를 사용자가 반드시 명시하고 generic `sql`의 한계를 문서화한다.
- query를 실행하거나 parameter를 치환하지 않는 source-only 경계가 코드에 있다.
- stale Worker 결과와 oversized input의 copy/download 권한을 차단한다.
- 6개 dialect fixture와 exact public dialect list가 테스트로 고정돼 있다.

### 대체로 동등한 부분

- indentation, keyword case, paste/file, auto/manual format, copy/download, keyboard shortcut이라는 기본 formatter UX는 갖췄다.
- local browser processing을 구현하지만 실제 competitor privacy와 성능 우열은 계측하지 않았다.

### 약한 부분

- BigQuery, ClickHouse, DB2, DuckDB, Hive, Oracle PL/SQL, Redshift, Snowflake, Spark, Trino 등 기반 library의 다른 dialect를 노출하지 않는다.
- data type/function/identifier case, logical operator newline, expression width, lines between queries, dense operators, semicolon position 등 기반 library option이 없다.
- remove comments, compact mode, split statements, parameter formatting이 없다.
- schema-aware validation, DB object resolution, typo/lint, query plan/optimization이 없다.
- 32 KiB max는 다른 formatter보다 작다고 단정할 근거는 없지만 실제 multi-query 파일에는 빠르게 도달할 수 있는 제한이다.
- stored procedures와 alternate delimiter를 지원하지 않는다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 없음 | - | 높음 | - | 현재 6개 명시 dialect 범위 안에서 실행·stale blocker는 발견하지 못했다. |
| P1 | BigQuery, Snowflake, Oracle PL/SQL, Redshift를 우선 후보로 실제 fixture/수요 검증 후 추가 | 큼 | 높음 | 중간 | library export가 있다는 사실만으로 publish하지 말고 dialect별 query corpus와 locale copy를 통과시킨다. |
| P1 | 32 KiB max와 8 KiB auto threshold를 benchmark로 재조정 | 큼 | 높음 | 중간 | migration/query bundle usability를 개선한다. mobile memory, 5초 timeout, worst-case parser fixture가 선행돼야 한다. |
| P2 | identifier/data type/function case와 lines-between-queries를 Options에 선별 추가 | 중간 | 높음 | 중간 | 기반 library가 제공하지만 UI 복잡도와 dialect별 결과를 검토한다. |
| P2 | Format-only를 유지하면서 statement count와 선택 dialect를 결과 metadata로 표시 | 중간 | 중간 | 낮음~중간 | 사용자가 자동 감지로 오해하지 않도록 선택 범위를 강화한다. 정확한 split 정책이 필요하다. |
| P2 | remove comments/compact는 별도 operation으로 분리 | 중간 | 높음 | 중간 | source information을 삭제하므로 일반 formatting option처럼 숨기지 않는다. |
| P3 | lint/typo/schema validation은 별도 제품 후보 | 제한적 | 높음 | 큼 | formatter를 validator나 DB client로 확장하지 않는다. |

## 표현 가능한 claim

- 안전: “Formats SQL source for six explicit choices: common SQL subset, PostgreSQL, MySQL, MariaDB, SQLite, and Transact-SQL.”
- 안전: “The common SQL option is not automatic dialect detection.”
- 안전: “Choose 2 spaces, 4 spaces, tabs, and preserved/upper/lower keyword case.”
- 안전: “Queries are treated as source text; the tool does not execute them or connect to a database.”

## 금지하거나 추가 검증이 필요한 claim

- 절대 금지: “Supports all SQL dialects.”
- 금지: “ANSI SQL compatible” 또는 “standard SQL validator.” `sql`은 library의 common subset이며 validation claim이 아니다.
- 금지: “Automatically detects your dialect.”
- 금지: “Validates queries against your database/schema” 또는 “optimizes queries.”
- 금지: “Supports stored procedures.” 기반 library 문서가 비지원으로 명시한다.
- 금지: “Preserves query semantics for every supported database.” formatter fixture와 실제 DB execution equivalence는 다르다.
- 금지: “Replaces parameters safely.” parameter replacement를 하지 않는다.

## 검증과 한계

- current integration core/UI/client/resource policy/registry/history를 읽기 전용으로 확인했다.
- SQL core 14개 + state 5개 테스트가 통과했다. 전체 집중 묶음은 13 files / 112 tests 통과였다.
- 저장소 browser QA에는 hostile SQL inertness와 32 KiB 초과 거부 검사가 있으나 이번 턴에 live browser QA는 재실행하지 않았다.
- 각 dialect를 실제 DB parser/server에 보내 equivalence를 검증하지 않았다. 경쟁 도구의 dialect 정확도와 privacy/network도 독립 계측하지 않았다.
