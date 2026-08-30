# HTML Formatter 기능 리뷰

- 검토일: 2026-08-30
- 현재 공개 경로: `/{locale}/html-formatter/`
- 공개 상태: `indexable`
- 기능 소유: `apps/web/src/features/html-formatter/**`
- 코어/테스트 소유: `packages/html-formatter-core/**`, `scripts/qa/formatter_subnet_feature.py`

## 결론

현재 HTML Formatter는 Prettier 3.9.6 HTML parser를 Worker에서 지연 로드하고, source를 절대로 preview DOM에 넣지 않는 format-only 도구다. 들여쓰기와 print width, sample/file/copy/download, 오류 위치 focus, stale 결과 차단, HTML 전용 1 MiB 상한이 갖춰졌다. “코드를 보기 좋게 정리하되 실행하지 않는다”는 경계는 선명하다.

경쟁 도구보다 부족한 핵심은 embedded `<style>`/`<script>`의 실제 CSS/JS formatting이다. 현재는 HTML plugin만 로드하므로 body를 HTML raw text 범위에서 들여쓰기할 뿐 PostCSS/Babel로 다시 포맷하지 않는다. Preview/minify가 없는 것은 기능 폭에서는 약점이지만, 현재 route의 source-only 안전성과 단일 목적에는 맞다.

## 이미 개선된 점과 추적 근거

- `41c4a2d`/`23bfbca` 계열에서 HTML pilot과 JSON UX 개선이 추가됐다. `1f60abf`/`b9be9d1`에서 Worker timeout·output cap·inert output browser QA가 보강됐고, `c5836f1`/`3fac389`에서 lazy loading과 OSS notice가 정리됐다. `1f69677`에서 indexable로 승격됐다.
- core는 `prettier/standalone` + `prettier/plugins/html`, parser `html`, LF output을 명시한다.
- 2칸·4칸·탭과 print width 40~240을 지원한다.
- malformed HTML의 Prettier location을 `HtmlInputError`로 변환하고 line/column을 UI에 보여 주며, 명시 실행 시 해당 위치를 선택한다.
- input edit 중 이전 결과는 보이더라도 stale notice와 함께 copy/download가 즉시 disabled된다. 오래된 Worker reply는 commit되지 않는다.
- Worker는 lazy 생성되고 5초 timeout과 20 MiB output cap이 있다. HTML input은 64 KiB까지 자동, 1 MiB까지 수동, 그 이상 거부한다.
- sample은 빈 input에서만 로드된다. output은 readonly textarea 값이며 `innerHTML` preview가 없다.
- `PILOT_NOTES.md`가 `<pre>`/`<code>` whitespace 정규화와 embedded code 미포맷 범위를 명시하며 “semantics-preserving” claim을 금지한다.

## 경쟁 표면 관찰

관찰일은 모두 2026-08-30이다.

| 서비스 | 직접 관찰한 기능 | 비교 |
| --- | --- | --- |
| [Prettier Playground](https://prettier.io/playground/) 및 [browser docs](https://prettier.io/docs/browser) | HTML 포함 여러 parser, 많은 Prettier option. browser standalone은 필요한 plugin을 직접 로드하며 embedded code formatting에는 관련 plugin이 더 필요하다고 문서화 | PlainTool은 같은 엔진의 좁은 HTML preset과 간단한 UX를 제공한다. Playground의 parser/option breadth에는 못 미친다. |
| [JSONFormatter.org HTML Formatter](https://jsonformatter.org/html-formatter/) | auto update, `Format CSS & JavaScript`, tab space, file/URL load, download, Run/Preview, localStorage restore, save/share | PlainTool은 URL import·save/share·preview가 없어 source가 외부 URL이나 실행 surface로 이동할 가능성을 줄인다. 상대는 embedded formatting과 preview가 강하다. |
| [FreeFormatter HTML Formatter](https://www.freeformatter.com/html-formatter.html) | paste/file upload, file encoding, indentation 선택, 새 window 출력 | PlainTool은 print width, 자동 처리, stale authority, local copy/download가 더 풍부하다. FreeFormatter의 서버/브라우저 처리 위치는 페이지 관찰만으로 확정하지 않았다. |

## 상대 평가

### 더 강한 부분

- output이 항상 inert textarea source이며, 테스트 fixture가 script/image source를 넣어도 실행·DOM 활성화되지 않도록 설계돼 있다.
- stale 결과를 단지 표시하는 데 그치지 않고 copy/download 권한까지 끊는다.
- 자동/수동/거부 byte 경계, Worker timeout, output cap이 구체적이다.
- print width와 tab/space 설정이 작고 명료한 Options 아래 있다.

### 대체로 동등한 부분

- paste, file, sample, auto format, explicit format, copy/download, syntax 위치 오류라는 기본 흐름은 충분하다.
- 엔진은 Prettier HTML parser다. Prettier Playground 전체와 동일한 plugin set 또는 option set이라고 말할 수는 없다.

### 약한 부분

- embedded CSS/JavaScript를 해당 언어 parser로 포맷하지 않는다.
- Minify와 live preview가 없다. preview는 current safety thesis와 충돌하므로 단순 parity 항목으로 넣으면 안 된다.
- Vue, Angular, Handlebars, MJML 등 HTML 유사 template parser를 지원하지 않는다.
- HTML standards validator가 아니다. malformed parse error를 잡지만 W3C conformance, attribute validity, accessibility를 검사하지 않는다.
- HTML 상한 1 MiB는 경쟁 페이지의 미표시/미검증 한도와 비교할 수 없지만, 큰 정적 export에는 제약이다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 없음 | - | 높음 | - | 확인된 source 실행 또는 stale 권한 blocker는 없다. |
| P3 | embedded CSS/JS formatting은 기본 formatter 옵션으로 넣지 않고 별도 실험으로 보류 | 중간 | 중간 | 중간~큼 | HTML + PostCSS + Babel/Estree plugin 비용과 숨은 결과 변경이 크다. 반복 수요와 오류 경계를 먼저 확인하고 source-only output을 유지한다. |
| P1 | 1 MiB 상한과 64 KiB auto threshold를 실제 파일 benchmark로 재조정 | 중간~큼 | 중간 | 중간 | 현재 수치는 방어적이다. timeout·memory·mobile 결과가 확보될 때만 상향한다. |
| P2 | 오류 line/column을 보이는 최소 line-number gutter | 중간 | 중간 | 중간 | textarea selection만으로 찾기 어려운 긴 문서를 개선한다. |
| P2 | HTML minifier를 별도 route/operation으로 설계 | 중간 | 중간 | 큼 | whitespace-sensitive content와 embedded code 정책이 달라 format과 분리 검토한다. |
| P3 | safe preview는 sanitizer와 sandbox 정책이 독립적으로 승인될 때만 별도 surface로 검토 | 제한적 | 높음 | 큼 | 현재 route에 직접 DOM preview를 추가하지 않는다. |

## 표현 가능한 claim

- 안전: “Formats HTML source locally with Prettier 3.9.6’s HTML parser.”
- 안전: “Your HTML is shown as source text and is not rendered or executed by this formatter.”
- 안전: “Choose 2 spaces, 4 spaces, tabs, and a print width from 40 to 240.”
- 안전: “Shows parser error locations when the formatter provides them.”

## 금지하거나 추가 검증이 필요한 claim

- 금지: “Validates standards-compliant HTML.” parser formatting은 standards validation이 아니다.
- 금지: “Formats embedded CSS and JavaScript.” 현재 plugin set으로는 보장하지 않는다.
- 금지: “Preserves semantics exactly.” `<pre>`/`<code>` whitespace 정규화 등 엔진 출력 변화가 있다.
- 금지: “Sanitizes HTML” 또는 “safe to publish.” sanitize하지 않는다.
- 금지: “Supports all HTML/template frameworks.”
- 금지: “Faster than Prettier Playground/competitors.” 번들 load 개선은 있었지만 비교 benchmark가 없다.

## 검증과 한계

- current integration source, pilot notes, history와 resource policy를 확인했다.
- HTML core 7개 + state 5개 테스트가 통과했다. 전체 집중 묶음은 13 files / 112 tests 통과였다.
- 저장소 browser QA source에는 hostile HTML inertness와 stale action 검사가 있으나 이번 턴에 live browser QA는 재실행하지 않았다.
- 경쟁 서비스 preview 실행 안전성, 저장·공유 privacy, 실제 processing location은 독립 검증하지 않았다.
