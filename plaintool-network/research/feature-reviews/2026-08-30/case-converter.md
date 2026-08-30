# Case Converter 경쟁 기능 리뷰

- 감사일: `2026-08-30`
- 감사 계약 기준 커밋: `02a7c57`
- 실제 검토 표면: `worktree/lucky-cloud-860c`의 `6025eb0` 및 당시 미커밋 변경(Case Converter 관련 미커밋 변경 없음)
- 결론: 현재 도구는 Unicode 보존, 상태 경합 방지, 정확한 TXT 다운로드가 강하다. 그러나 17개 로케일을 공개하면서 실제 case mapping에는 locale을 전달하지 않아 터키어 같은 언어에서 현지 기대와 어긋날 수 있는 것이 최우선 결함이다.

## 경로, 공개 상태, 소유권

- 경로: 모든 공개 로케일의 `/{locale}/case-converter/`
- 공개 상태: `apps/web/src/lib/tool-registry.js`에서 `indexable`
- 기능/UI: `apps/web/src/features/case-converter/**`
- 코어: `packages/text-case-core/**`
- 얇은 라우트: `apps/web/src/pages/[locale]/case-converter/index.astro`
- 기능 QA: `scripts/qa/case_converter_feature.py`, 공통 등록/반응형/네트워크/로케일 QA
- 로케일 근거: `apps/web/src/lib/locale-review-manifests/case-converter.json`, 17개 공개 로케일

## 이미 개선된 점과 추적 근거

| 근거 | 현재 개선 내용 |
| --- | --- |
| `0df2e7e` (`Add case conversion preview`) | upper/lower/sentence/capitalize-words 네 모드, 즉시 변환, copy, exact UTF-8 `.txt` download, Clear를 도입했다. |
| `packages/text-case-core/src/index.ts` | 문자열을 임의 정규화하지 않고 결합 문자·공백·CR/LF/CRLF를 보존한다. sentence 모드는 ASCII와 전각 `。！？` 및 줄바꿈을 경계로 사용한다. capitalize-words는 Unicode letter/mark/number와 내부 apostrophe를 처리한다. |
| 코어 tests | 독일어 `ß` 확장, Greek contextual mapping, 결합 문자 비정규화, apostrophe, emoji/caseless scripts, 줄바꿈과 fixed-seed invariant를 검증한다. 단순 규칙의 abbreviation/decimal 결과도 고정해 과장된 언어 이해를 피한다. |
| 현재 client/worker | 90ms debounce, 1MB 제한, latest-only Worker, stale result와 action disable, clipboard race 차단, Worker failure, Clear 권한을 구현한다. |
| `scripts/qa/case_converter_feature.py` | 네 모드 결과, UTF-8 download, clipboard failure/race, 1MB 초과 회복, rapid input, delayed Worker 후 Clear, 모바일 control 크기와 overflow를 검사하도록 작성돼 있다. |
| `7d560c8`, `1f69677` | 17개 로케일 copy/manifest와 route를 갖추고 `indexable`로 승격됐다. |

## 경쟁 페이지 관찰

아래는 `2026-08-30`에 페이지에서 직접 확인한 기능만 적었다.

| 경쟁 페이지 | 관찰된 기능 |
| --- | --- |
| [TextRepeat Case Converter](https://textrepeat.org/case-converter) | lowercase, uppercase, title, sentence, alternating, inverse, camelCase, PascalCase, snake_case, kebab-case를 제공한다. 결과를 별도 영역에 보여 주며 copy/clear/reset mode와 브라우저 로컬 처리를 명시한다. |
| [TextFizz Case Converter](https://textfizz.com/tools/case-converter/) | upper/lower/title/sentence/capitalized/alternating/inverse 및 camel/Pascal/snake/kebab/CONSTANT_CASE, Undo, copy, `.txt` download, Clear를 제공한다. 단어·문자·문장·문단·줄·페이지·읽기/말하기 지표와 브라우저 로컬 처리를 함께 노출한다. |

## 상대 평가

### AbsolTools가 더 강한 지점

- 원본과 결과를 분리해 보존하며, 결과가 stale이면 copy/download를 막는다. 한 상자를 계속 덮어쓰는 경쟁 UI보다 원문 대조와 잘못된 결과 사용 방지가 명확하다.
- combining sequence를 정규화하지 않고 whitespace/line ending을 보존하는 코어 규칙과 exact UTF-8 download를 테스트한다.
- Worker/clipboard race와 실패 회복이 기능 QA에 포함돼 구현 추적성이 높다.

### 대체로 동등한 지점

- upper/lower/sentence/capitalized words, 즉시 변환, copy, Clear와 브라우저 로컬 처리라는 핵심은 경쟁 도구와 동등하다.
- TextFizz도 `.txt` download와 Unicode-aware 처리를 명시하므로 이것만으로 독점 우위를 주장할 수 없다.

### AbsolTools가 약한 지점

- `locale`이 UI→Worker→core 요청에 전달되지 않고 `toUpperCase()`/`toLowerCase()`를 사용한다. `/tr/`에서도 Turkish dotted/dotless I의 locale-aware mapping을 적용하지 않는다.
- title case와 style-guide 규칙이 없고, sentence case는 abbreviation/proper noun/decimal을 이해하지 않는 의도적인 단순 규칙이다.
- alternating/inverse와 개발자용 camel/Pascal/snake/kebab/constant mode가 없다.
- Undo가 없어 여러 모드를 실험한 결과 사이를 되돌릴 수 없다. 다만 원본/결과가 분리돼 원문 자체는 보존된다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | locale-aware casing 도입 및 Turkish/Azeri/Lithuanian 회귀 테스트 | 높음 | 높음 | 중간 | 17개 로케일 공개 상태와 현재 locale-insensitive core가 직접 충돌한다. UI locale을 typed worker request와 core에 전달하고 지원/예외 규칙을 문서화해야 한다. |
| P1 | `Title case`를 별도 모드로 추가하되 언어/스타일 범위를 명시 | 높음 | 높음 | 중간~높음 | 경쟁 페이지에서 반복되는 대표 모드다. 단순 “모든 단어 대문자”와 AP/Chicago식 title case를 같은 이름으로 섞지 않는다. |
| P2 | 개발자 naming case를 별도 Options 또는 전용 route로 분리 | 중간 | 높음 | 중간 | camel/Pascal/snake/kebab 수요는 관찰됐지만 prose case라는 현재 주기능을 흐릴 수 있다. 구두점·약어·숫자·Unicode 식별자 규칙이 필요하다. |
| P2 | 결과 스냅샷 1단계 Undo | 중간 | 중간 | 낮음~중간 | 모드 비교를 쉽게 한다. 도구 상태를 영구 저장할 필요는 없고 현재 탭 메모리만 사용한다. |
| P3 | alternating/inverse/random | 낮음 | 높음 | 낮음 | 경쟁 기능이지만 실용 가치가 낮고 기본 화면 밀도를 해친다. 별도 Options가 아니면 추가하지 않는다. |

## 안전한 claim 후보

- “대문자, 소문자, 문장형, 단어 첫 글자 대문자의 네 가지 변환을 제공합니다.”
- “원본과 결과를 나란히 유지하고 결과를 복사하거나 UTF-8 TXT로 다운로드할 수 있습니다.”
- “공백, 줄바꿈, 결합 문자 시퀀스를 임의 정규화하지 않습니다.”
- “빠른 입력과 복사 작업이 겹쳐도 오래된 결과가 최신 입력을 덮지 않도록 테스트했습니다.”
- locale-aware 개선 전에는 “JavaScript 기본 Unicode case mapping을 사용합니다”가 정확한 표현이다.

## 금지하거나 추가 증거가 필요한 claim

- “모든 언어에 locale-aware”, “터키어를 정확히 처리” — 현재 locale이 core에 전달되지 않는다.
- “문법적으로 완벽한 sentence case” — 약어, 고유명사, 문맥을 이해하지 않는다.
- “Title Case 지원” — 현재 `capitalize-words`는 단순 단어 첫 cased-character 대문자이며 title style이 아니다.
- “모든 Unicode를 손실 없이 변환” — Unicode case mapping 자체가 길이를 바꿀 수 있다(`ß`→`SS`).
- “경쟁 사이트보다 Unicode 정확도가 높다” — 공통 benchmark가 없다.
- “무제한” — 1,000,000 UTF-8 bytes 제한이 있다.

## 검증과 한계

- 현재 review surface의 route/registry/feature/core/copy/manifest, worker contract, `git log`를 확인했다.
- `2026-08-30` 집중 테스트에서 네 코어 `4 files / 46 tests`가 통과했으며 `text-case-core`는 12 tests다.
- `scripts/qa/case_converter_feature.py`의 결과/download/race/failure/mobile 계약을 검토했지만 브라우저 연결 메타데이터 문제로 실제 화면 QA를 재실행하지 못했다.
- 테스트 Node `v22.12.0`은 저장소 요구사항 `>=22.19 <23`보다 낮으므로 공식 전체 게이트 증거는 아니다.
- 경쟁 페이지의 UI/설명을 관찰했을 뿐 실제 locale mapping 정확도나 네트워크 동작을 독립 시험하지 않았다.
