# 2026-08-30 전체 기능 경쟁력 리뷰

- 검토 범위: 17개 기능군, 25개 `indexable` 라우트, 17개 공개 로케일
- 기준 코드: `02a7c57` 이후 현재 통합 작업트리의 미커밋 UI 변경까지 읽기 전용 포함
- 상세 결론: [전체 요약](./summary.md)
- 재사용 양식: [기능 리뷰 템플릿](../_template.md)

## 기능별 인덱스

| 기능군 | 공개 라우트 | 현재 강점 | 가장 중요한 다음 항목 | 상세 |
| --- | --- | --- | --- | --- |
| Base64 codec | `base64-decode`, `base64-encode` | 복구 내역 공개, 파일 서명 기반 결과 처리, stale Worker 차단 | 반복 디코드를 명시적 opt-in/단계 보기로 변경 | [보고서](./base64-codec.md) |
| URL codec | `url-encode`, `url-decode` | component/URI/form 의미와 오류 유형 분리 | URL·storage 없이 반대 route로 입력 1회 인계 | [보고서](./url-codec.md) |
| Hash generator | `hash-generator` | 원시 파일 바이트, 4개 digest 동시 계산, legacy 경고 | expected checksum 직접 비교와 large-file streaming | [보고서](./hash-generator.md) |
| JWT decoder | `jwt-decoder` | decode와 verify 경계를 상단 고정 경고로 유지 | 결과와 다운로드에도 `NOT VERIFIED` 고정 | [보고서](./jwt-decoder.md) |
| QR | `qr-code-generator`, `qr-code-scanner` | 생성→PNG→스캔 왕복, 카메라 정리, URL 자동 탐색 금지 | EC/quiet-zone matrix와 structured payload | [보고서](./qr-code.md) |
| Word counter | `word-counter` | locale-aware word/grapheme 계산과 fallback 고지 | 문장 수·읽기 시간과 계산 규칙 도움말 | [보고서](./word-counter.md) |
| Text compare | `text-compare` | line ending/whitespace 구분, 원문 재구성, stale 보존 | ignore rules와 unified patch export | [보고서](./text-compare.md) |
| Case converter | `case-converter` | 원본/결과 분리, Unicode/공백 보존, locale-aware mapping | title case 범위를 정의한 별도 모드 | [보고서](./case-converter.md) |
| AI text cleaner | `ai-watermark-remover` | 제거 code point·개수 공개, AI 판별과 literal Unicode 분리 | bidi/NBSP를 보수적 safe preset 밖으로 분리 | [보고서](./ai-text-cleaner.md) |
| JSON formatter | `json-formatter` | 큰 숫자 lexeme 보존, duplicate key/BOM 경고, strict modes | 읽기 전용 tree/search | [보고서](./json-formatter.md) |
| Data converters | 6개 CSV/Markdown/JSON/HTML 변환 | quoted CSV·table escape·nested JSON 등 typed edge cases | mode label 로케일화와 read-only parsed preview | [보고서](./data-converters.md) |
| HTML formatter | `html-formatter` | source-only, Prettier HTML, stale/action 권한 차단 | embedded CSS/JS opt-in 성능 검증 | [보고서](./html-formatter.md) |
| CSS formatter | `css-formatter` | plain CSS 범위 명시, URL 비실행, print width | SCSS/Less를 별도 parser/route로 수요 검증 | [보고서](./css-formatter.md) |
| JavaScript formatter | `javascript-formatter` | source 비실행, conservative minify, format 옵션 | license/preserve comments 기본 보존 | [보고서](./javascript-formatter.md) |
| SQL formatter | `sql-formatter` | 6개 dialect를 명시하고 common subset/비검증 경계 유지 | dialect 확대와 8/32 KiB 한도 재측정 | [보고서](./sql-formatter.md) |
| Unix timestamp | `unix-timestamp-converter` | IANA zone, DST gap/repeat 구분, 단위 모호성 거부 | micro/nanoseconds와 multi-zone 비교 | [보고서](./unix-timestamp-converter.md) |
| IP subnet | `ip-subnet-calculator` | `/0`·`/31`·`/32`, special-use, binary, strict input | IPv6 별도 모드와 결과 행별 복사 | [보고서](./ip-subnet-calculator.md) |

## 상태 표기

- 보고서의 `더 강한 부분`은 공통 벤치마크 우승을 뜻하지 않는다. 우리 코드와
  테스트에서 확인되는 고유한 계약을 말한다.
- `P0`는 공개 전 의미 손실·신뢰 오해를 먼저 막아야 하는 항목이다.
- 큰 기능 폭 격차는 메인 route에 모두 추가하지 않는다. 한 route 한 주기능을
  유지하면서 Options나 별도 route로 나눌 후보를 보고서에 명시했다.

