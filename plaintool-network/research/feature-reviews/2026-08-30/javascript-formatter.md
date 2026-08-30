# JavaScript Formatter 기능 리뷰

- 검토일: 2026-08-30
- 현재 공개 경로: `/{locale}/javascript-formatter/`
- 공개 상태: `indexable`
- 기능 소유: `apps/web/src/features/javascript-formatter/**`
- 코어/테스트 소유: `packages/javascript-formatter-core/**`, `scripts/qa/formatter_subnet_feature.py`

## 결론

현재 구현은 Format과 보수적인 Minify를 한 route에서 명시적으로 전환한다. Format은 Prettier 3.9.6 Babel/Estree, Minify는 Terser 5.51.2를 쓰되 `compress:false`, `mangle:false`, `sourceMap:false`, `ecma:2020`으로 고정한다. 즉 minify는 공격적 최적화가 아니라 layout/comment 축소에 가깝다. source는 실행되지 않고 textarea로만 돌아온다.

이 보수성은 좋은 차별점이지만 “no side effects” 또는 “production optimizer” claim은 허용하지 않아야 한다. 가장 먼저 개선할 점은 license comment 정책이다. 현재 기본값은 `/*! ... */`까지 제거하고 “Preserve comments”를 켜면 모든 주석을 남긴다. 법적 고지를 보존하는 중간 기본값이 필요하다.

## 이미 개선된 점과 추적 근거

- `a4a54d1`/`1328ad1` 계열에서 Prettier format, Terser minify, 명시 mode, state/policy/core tests가 추가됐다.
- `1f60abf`/`b9be9d1`에서 source non-execution browser QA, Worker timeout/output cap이 추가됐다.
- `c5836f1`/`3fac389`에서 format/minify core import를 분리해 선택 작업의 bundle만 lazy-load하고 OSS notice를 보강했다. `1f69677`에서 indexable로 승격됐다.
- Format은 modules, optional chaining, async, comments와 2칸·4칸·탭, print width, semicolon, single quote를 테스트한다.
- Minify는 script parse 실패 시 module parse를 시도하며 shebang을 유지한다. identifier mangle과 compress는 사용하지 않는다.
- mode 변경은 기존 결과를 stale로 만들고 actions를 끈다. sample, Clear, 새 input에서도 선택 mode는 유지된다.
- input은 256 KiB까지 자동, 2 MiB까지 수동, 그 이상 거부한다. Worker 5초 timeout과 output 20 MiB cap이 있다.
- Format/Minify 다운로드 파일명이 분리돼 있고 파일 입력은 `.js`, `.mjs`, `.cjs`로 제한된다.

## 경쟁 표면 관찰

관찰일은 모두 2026-08-30이다.

| 서비스 | 직접 관찰한 기능 | 비교 |
| --- | --- | --- |
| [Prettier 문서](https://prettier.io/docs) / [Playground](https://prettier.io/playground/) | JavaScript와 experimental syntax, JSX/Flow/TypeScript 등 여러 parser와 많은 option | PlainTool은 JavaScript Babel parser preset으로 단순하지만 parser breadth가 좁다. 같은 Prettier 전체 기능을 지원한다고 말할 수 없다. |
| [Beautifier.io](https://beautifier.io/) | JavaScript/JSON/React/HTML/CSS/SCSS/SASS, CodeMirror, brace/array/chained method 등 다수 옵션, packer/obfuscator detection 옵션, copy/download | PlainTool은 option 수가 적고 mode 의미가 명시적이다. editor·language breadth는 상대가 앞선다. |
| [FreeFormatter JavaScript Beautifier](https://www.freeformatter.com/javascript-beautifier.html) | paste/upload, encoding, tabs·2·3·4 spaces, brace style, 새 window output | PlainTool은 print width, quote/semi, 자동 처리와 copy/download, module-aware format/minify가 강하다. |
| [FreeFormatter minifier 목록](https://www.freeformatter.com/minifiers.html) | 별도 JS minifier가 whitespace 제거뿐 아니라 local variable rename을 설명 | PlainTool은 의도적으로 identifier를 바꾸지 않는다. 압축률은 약하지만 리뷰 가능성과 변환 범위는 더 예측 가능하다. 상대의 “no possible side-effect” 문구는 독립 검증하지 않았다. |

## 상대 평가

### 더 강한 부분

- format/minify 모두 source를 실행하지 않는다는 테스트 경계가 있다.
- Minify가 `compress:false`, `mangle:false`라 identifier rename이나 dead-code rewrite를 하지 않는 보수적 preset이다.
- mode별 옵션과 다운로드 이름, stale result authority가 분리돼 있다.
- format/minify dependency가 Worker에서 operation별로 lazy-load된다.

### 대체로 동등한 부분

- paste/file, format, minify, indentation, copy/download, syntax location이라는 온라인 JS formatter의 기본 흐름을 제공한다.
- modern JavaScript와 module을 처리하지만 engine/runtime 전체 문법과 future ECMAScript 지원을 보장하지 않는다.

### 약한 부분

- TypeScript parser, Flow, explicit JSX/React mode가 없다. Babel parser가 일부 syntax를 받아도 테스트·UI scope 밖이면 claim하면 안 된다.
- 3-space, brace style, trailing comma, arrow parens 등 broader style option이 없다.
- code editor syntax highlighting, line numbers, search, diff가 없다.
- Minify 압축률은 compress/mangle 도구보다 낮다.
- 기본 Minify가 license banner도 제거한다. Preserve comments는 all-or-nothing이다.
- source map 생성이 없다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 없음 | - | 높음 | - | source 실행이나 stale 권한 blocker는 발견하지 못했다. |
| P1 | 기본적으로 legal/license comments(`/*!`, `@license`, `@preserve`)를 보존하고 “all comments”는 별도 옵션으로 분리 | 큼 | 높음 | 낮음~중간 | 배포용 minify에서 법적 고지 삭제 위험을 줄인다. fixture와 locale 설명이 필요하다. |
| P1 | Minify를 “conservative minify / no compression or mangling”로 UI에서 더 명확히 설명 | 큼 | 높음 | 낮음 | 낮은 압축률을 결함처럼 숨기지 않고 의도된 안전 범위를 전달한다. |
| P2 | TypeScript/JSX를 별도 parser mode 또는 route로 추가 | 중간~큼 | 높음 | 중간~큼 | Babel JS claim과 분리하고 `.ts/.tsx/.jsx` accept, parser fixtures, locale/SEO를 각각 검토한다. |
| P2 | line number/error marker/search | 중간 | 중간 | 중간 | 큰 source 수정 시간을 줄이나 editor bundle 비용을 측정해야 한다. |
| P2 | aggressive compression/mangle은 별도 고급 operation으로만 조사 | 중간 | 중간 | 큼 | scope, eval, top-level, property mangle, source map 위험을 기본 Minify에 섞지 않는다. |
| P3 | source map download | 제한적 | 중간 | 큼 | 원본 filename과 mapping UX가 없는 paste tool에서는 우선순위가 낮다. |

## 표현 가능한 claim

- 안전: “Formats JavaScript with Prettier and offers a conservative Terser minify mode.”
- 안전: “The minifier disables compression and identifier mangling.”
- 안전: “JavaScript is treated as source text and is not executed by the tool.”
- 안전: “Supports tested script and ECMAScript module inputs; format options include indentation, print width, semicolons, and quotes.”

## 금지하거나 추가 검증이 필요한 claim

- 금지: “Minifies with no possible side effects.” Terser reprint와 comment removal까지 포함한 모든 프로그램 의미를 보장하지 않았다.
- 금지: “Best compression” 또는 “smallest output.” compress/mangle을 의도적으로 끈다.
- 금지: “Preserves licenses by default.” 현재는 `/*! license */`도 기본 제거한다.
- 금지: “Supports all JavaScript/ECMAScript/React/TypeScript.”
- 금지: “Detects malicious or obfuscated JavaScript.” source를 실행하지 않을 뿐 악성 여부를 판정하지 않는다.
- 금지: “Production-ready optimization replacement.” source map, build context, target configuration이 없다.

## 검증과 한계

- current integration core/UI/worker/policy/history를 읽기 전용으로 확인했다.
- JavaScript core 17개 + policy 6개 + state 7개 테스트가 통과했다. 전체 집중 묶음은 13 files / 112 tests 통과였다.
- 저장소 browser QA에는 hostile JavaScript non-execution 검사가 있으나 이번 턴에 live browser QA는 재실행하지 않았다.
- 경쟁 도구의 실제 minifier output, compression ratio, privacy/network behavior는 benchmark하지 않았다.
