# CSS Formatter 기능 리뷰

- 검토일: 2026-08-30
- 현재 공개 경로: `/{locale}/css-formatter/`
- 공개 상태: `indexable`
- 기능 소유: `apps/web/src/features/css-formatter/**`
- 코어/테스트 소유: `packages/css-formatter-core/**`, `scripts/qa/formatter_subnet_feature.py`

## 결론

현재 도구는 plain CSS source를 Prettier 3.9.6 PostCSS plugin의 `css` parser로 포맷하는 데 집중한다. custom properties, at-rules, keyframes, 지원되는 native nesting, URL/string 보존, 위치 있는 parse error, print width, stale 권한이 테스트돼 있다. CSS를 style로 적용하거나 URL을 load하지 않고 textarea source로만 처리하는 경계도 분명하다.

경쟁 표면과 비교하면 print width와 비동기 결과 안전성은 좋지만, SCSS/Less와 minify가 없다. plain CSS route의 claim을 정확히 유지하고, 확장은 별도 parser/route 또는 별도 minify operation으로 분리하는 편이 좋다.

## 이미 개선된 점과 추적 근거

- `1e107a7`/`860f48b` 계열에서 core, Worker, state/policy tests와 UI가 추가됐다.
- `1f60abf`/`b9be9d1`에서 Worker timeout, output cap, inert CSS browser QA가 추가됐고, `c5836f1`/`3fac389`에서 lazy loading과 dependency notice가 정리됐다. `1f69677`에서 indexable로 승격됐다.
- core는 `prettier/plugins/postcss`의 `css` parser만 로드하며 SCSS/Less를 암시하지 않는다.
- 2칸·4칸·탭, print width 40~240, sample/file/Clear/copy/download, Ctrl/Cmd+Enter를 지원한다.
- URL과 문자열은 source로 보존되며 페이지에서 fetch하거나 CSSOM에 적용하지 않는다.
- input은 256 KiB까지 자동, 2 MiB까지 수동, 그 이상 거부한다. Worker 5초 timeout, output 20 MiB cap이 있다.
- stale result는 보이더라도 action disabled 상태이며, Clear/error/file replacement/새 Worker authority가 이전 권한을 끊는다.
- `PILOT_NOTES.md`가 plain CSS, format-only, no render/load/sanitize/minify 범위를 기록한다.

## 경쟁 표면 관찰

관찰일은 모두 2026-08-30이다.

| 서비스 | 직접 관찰한 기능 | 비교 |
| --- | --- | --- |
| [Prettier 문서](https://prettier.io/docs) / [Playground](https://prettier.io/playground/) | CSS, Less, SCSS를 포함한 parser 선택과 다수 style option | PlainTool은 CSS 한 작업으로 훨씬 단순하지만 Less/SCSS breadth는 없다. 같은 Prettier 생태계여도 plugin set이 다르다. |
| [FreeFormatter CSS Beautifier](https://www.freeformatter.com/css-beautifier.html) | paste/upload, encoding, tabs·2·3·4 spaces, 새 window 결과 | PlainTool은 print width, 자동 실행, copy/download, stale result authority가 강하다. 3칸 들여쓰기는 없다. |
| [Beautifier.io](https://beautifier.io/) | JavaScript/JSON/React/HTML/CSS/SCSS/SASS, CodeMirror, copy/download, 다수 formatting option | PlainTool은 parser와 claim 범위가 명료하다. 다언어/다옵션 breadth와 editor 기능은 약하다. |

## 상대 평가

### 더 강한 부분

- URL이 포함된 CSS도 네트워크 resource로 load하지 않고 source text로만 유지한다.
- stale 결과의 복사·다운로드 권한 차단과 Worker 최신성 검사가 명시적이다.
- print width를 기본 UI에서 조절할 수 있고 입력/출력 resource policy가 문서화돼 있다.
- plain CSS만 지원한다고 정확히 좁혀 SCSS/Less 오인 가능성을 줄였다.

### 대체로 동등한 부분

- paste/file, indentation, format, copy/download, syntax error라는 기본 CSS beautifier 흐름은 갖췄다.
- Prettier CSS parser output을 사용하지만 상대 서비스와 결과 일치나 속도 우열은 검증하지 않았다.

### 약한 부분

- SCSS, Sass, Less를 지원하지 않는다.
- Minify가 없다.
- 3 spaces, brace/newline 세부 style 같은 option이 없다. Prettier의 opinionated 동작을 따르는 현재 방향과는 일관된다.
- code editor 줄 번호, syntax highlight, search가 없다.
- 2 MiB max는 큰 generated stylesheet에 제약이 될 수 있다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 없음 | - | 높음 | - | 확인된 실행·stale·정확성 blocker는 없다. |
| P1 | SCSS와 Less를 별도 parser route 또는 명시 mode로 수요 검증 | 큼 | 높음 | 중간 | 현재 plain CSS claim을 깨지 않고 breadth 격차를 줄인다. locale/SEO/fixtures가 각각 필요하다. |
| P1 | resource benchmark 후 2 MiB max와 256 KiB auto 기준 재검토 | 중간 | 중간 | 중간 | generated CSS 사용자를 돕되 mobile memory와 timeout 증거가 선행돼야 한다. |
| P2 | CSS minifier를 독립 operation으로 추가 | 중간 | 중간 | 중간~큼 | comment/license, calc/custom property, restructuring safety 정책을 먼저 확정한다. format-only core에 임의 압축을 넣지 않는다. |
| P2 | line number/error marker와 search | 중간 | 중간 | 중간 | 긴 CSS 진단에 유용하다. editor dependency의 bundle 비용을 측정한다. |
| P3 | 3-space indentation | 낮음 | 높음 | 낮음 | 경쟁 parity는 되지만 제품 impact가 작고 Prettier 기본 UX에서 벗어난다. |

## 표현 가능한 claim

- 안전: “Formats plain CSS source locally with Prettier’s CSS parser.”
- 안전: “Supports 2 spaces, 4 spaces, tabs, and configurable print width.”
- 안전: “CSS URLs remain source text; the formatter does not apply styles or load them.”
- 안전: “Supports syntax accepted by the bundled Prettier CSS parser, including tested at-rules, keyframes, custom properties, and native nesting.”

## 금지하거나 추가 검증이 필요한 claim

- 금지: “Supports CSS, SCSS, Sass, and Less.” 현재는 plain CSS만 지원한다.
- 금지: “Validates browser compatibility” 또는 “fixes CSS.” formatter/parser일 뿐 compatibility linter가 아니다.
- 금지: “Minifies CSS.”
- 금지: “Semantics-preserving for every stylesheet.” parser acceptance와 runtime browser semantics 전체를 검증하지 않았다.
- 금지: “No network request anywhere.” 도구 source를 load하지 않는 것과 사이트 전체 request 부재는 다른 주장이다.

## 검증과 한계

- current integration core/UI/policy/history를 읽기 전용으로 확인했다.
- CSS core 7개 + policy 6개 + state 5개 테스트가 통과했다. 전체 집중 묶음은 13 files / 112 tests 통과였다.
- 저장소 browser QA에는 Arabic mobile LTR/overflow와 hostile CSS가 style로 활성화되지 않는 검사가 있으나 이번 턴에는 재실행하지 않았다.
- 경쟁 서비스의 parser 정확도, 서버 전송 여부, 대용량 처리량은 직접 계측하지 않았다.
