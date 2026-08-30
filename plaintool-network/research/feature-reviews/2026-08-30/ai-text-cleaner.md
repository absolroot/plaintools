# AI Text Cleaner / AI Watermark Remover 경쟁 기능 리뷰

- 감사일: `2026-08-30`
- 감사 계약 기준 커밋: `02a7c57`
- 실제 검토 표면: `worktree/lucky-cloud-860c`의 `6025eb0` 및 당시 미커밋 변경
- 현재 미커밋 차이: `normalizeNoBreakSpaces`가 기본 checked로 바뀌었고, 한국어 metadata에 Gemini 표현이 추가됐으며 QA가 기본 checked를 요구한다.
- 결론: 정확한 code point·개수 보고와 위험 옵션 분리는 좋은 방향이다. 그러나 현재 안전 preset이 bidi controls를 기본 삭제하고, 미커밋 표면은 NBSP 계열까지 접힌 옵션 안에서 기본 변환한다. 다국어 텍스트 의미/배치를 바꿀 수 있으므로 preset을 보수적으로 재정의하는 것이 최우선이다.

## 경로, 공개 상태, 소유권

- 경로: 모든 공개 로케일의 `/{locale}/ai-watermark-remover/`
- 공개 상태: `apps/web/src/lib/tool-registry.js`에서 `indexable`
- 기능/UI: `apps/web/src/features/ai-text-cleaner/**`
- 코어: `packages/text-cleaner-core/**`
- 얇은 라우트: `apps/web/src/pages/[locale]/ai-watermark-remover/index.astro`
- 기능 QA: `scripts/qa/ai_text_cleaner_feature.py`, `scripts/qa/new_tools_contract.py`, 공통 등록/반응형/네트워크/로케일 QA
- 로케일 근거: `apps/web/src/lib/locale-review-manifests/ai-text-cleaner.json`, 17개 공개 로케일

## 이미 개선된 점과 추적 근거

| 근거 | 현재 개선 내용 |
| --- | --- |
| `16b9928`/`bf59f1c` (`Add AI text cleaner and QR tools`) | 원문/정제 결과 분리, 자동 정제와 명시적 Run, copy, 제거/정규화 항목별 이름·`U+` code point·개수 보고를 도입했다. |
| `packages/text-cleaner-core/src/index.ts` | ZWSP, word joiner, soft hyphen, BOM/ZWNBSP, invisible separator, 여러 bidi controls를 curated default로 처리한다. ZWJ/ZWNJ, variation selectors, combining marks는 별도 opt-in으로 분리했다. |
| `0441e0a` (`Harden feature orchestration and Unicode defaults`) | legacy Mongolian vowel separator `U+180E`를 기본 제거 목록에서 제외하고 회귀 테스트를 추가했다. 의미 있는 joiner/emoji/combining sequence는 기본 보존한다. |
| `72d90c6` (`Escape inline feature copy payloads`) | inline JSON copy에서 `<`를 escape해 script context를 닫는 문자열 주입을 막았다. |
| 현재 client | 80ms 자동 실행, 1MB 제한, 입력 revision을 이용한 clipboard race 차단, 오류 시 결과 무효화와 Clear 후 초점 복귀를 구현한다. 입력은 DOM에 `textContent`로 보고된다. |
| `01cd8ef`, `1f69677` | 17개 locale copy/manifest와 기능 QA에 통합됐고 `indexable`로 승격됐다. copy는 “AI 작성 여부 판별 기능이 아님”을 명시한다. |
| 현재 미커밋 표면 | NBSP, narrow NBSP, figure space를 ASCII space로 바꾸는 옵션을 기본 checked로 변경하고 QA에 그 상태를 추가했다. 이 감사는 해당 변경을 현재 사용자 표면으로 포함한다. |

## 경쟁 페이지 관찰

아래는 `2026-08-30`에 페이지에서 직접 확인한 기능만 적었다.

| 경쟁 페이지 | 관찰된 기능 |
| --- | --- |
| [UnicodeNow Invisible Character Remover](https://unicodenow.com/invisible-character-remover/) | safe/security/aggressive/custom preset, 문자군별 선택, remove/space/visible-marker replacement, original 보존, position·code point·Unicode name·action·reason·replacement log, report copy/download를 제공한다. safe preset은 ZWJ/ZWNJ, variation selectors, bidi controls를 보존하고 고급 제거는 기본 off다. 브라우저 로컬 처리를 명시한다. |
| [DevKitLab Invisible Character Viewer](https://www.devkitlab.com/en/tools/invisible-character-viewer/) | spaces/tabs/line breaks와 zero-width/BOM/Unicode spaces/soft hyphen/bidi/C0/C1을 inline token으로 보여 주고, family color·Unicode name·code point·count를 제공한다. 제거 동작은 일반 spacing을 보존하며 browser-local이라고 명시한다. |
| [CodeAva Invisible Character Detector & Unicode Normalizer](https://www.codeava.com/tools/invisible-character-detector-unicode-normalizer) | inspect/compare/normalize/sanitize 모드, UTF-8 bytes·code points·UTF-16·graphemes, highlighted character list, escaped/JSON/security view, NFC/NFD/NFKC/NFKD 비교, 여러 보수적 profile과 destructive/lossy 경고를 제공한다. ZWJ/ZWNJ를 기본 보존한다. |
| [Made Good Designs Remove Invisible Characters](https://madegooddesigns.com/tools/remove-invisible-characters/) | 문자군 toggle, inline highlight, 이름/code point/count audit, copy/download와 browser-local 처리를 제공한다. 동시에 invisible checker는 AI 작성 여부를 신뢰성 있게 판별할 수 없고 SynthID 같은 token-pattern watermark를 제거하지 못한다고 명시한다. |

## 상대 평가

### AbsolTools가 더 강한 지점

- “숨은 Unicode 정리”와 “AI 작성 여부 판별”을 copy에서 구분하고, 제거한 code point와 개수를 결과 바로 아래에 보여 준다.
- ZWJ/ZWNJ·variation selector·combining mark를 고급 opt-in과 경고로 분리하고, `U+180E`를 보존하는 회귀 이력이 있다.
- 입력과 결과가 분리되고 복사 완료의 revision authority가 있어, 편집 중 오래된 복사 성공 상태가 이기지 않는다.
- 작은 한 가지 정리 작업에 집중해 Unicode normalization/compare/security toolkit 전체를 기본 화면에 섞지 않는다.

### 대체로 동등한 지점

- zero-width/soft hyphen/BOM 계열 제거, code point/count 보고, 브라우저 로컬 처리, 위험한 joiner/variation selector의 opt-in은 비교 대상에도 존재한다.
- “AI watermark remover”라는 검색 표면 자체는 차별점이 아니다. 실제 기능은 literal Unicode 정리로 설명해야 한다.

### AbsolTools가 약한 지점

- occurrence position과 inline reveal이 없어 같은 code point가 문장 어디에 있었는지 알 수 없다.
- Unicode tag characters, C0/C1 controls, broader Unicode spaces, `U+034F`, position-sensitive `U+FEFF` 분류를 지원하지 않는다.
- preset/profile, visible-marker preview, report copy/download, NFC/NFD/NFKC/NFKD inspect/compare가 없다.
- 현재 default가 `U+061C`, LRM/RLM, embedding/override/isolate controls를 자동 삭제한다. RTL 문맥에서 합법적인 방향 제어를 바꿀 수 있으며 경쟁 safe preset은 이를 보존하거나 security review로 분리한다.
- 현재 미커밋 UI는 NBSP normalization을 접힌 옵션 안에서 기본 checked로 둔다. 정규화 사실은 보고하지만 사용자가 기본 변환임을 실행 전에 보기 어렵고, 의도적인 non-breaking layout을 바꿀 수 있다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 보수적 기본 preset으로 재정의: bidi controls 기본 보존, `Security review`에서 명시적 제거 | 높음 | 높음 | 중간 | 17개 locale, 특히 Arabic/RTL에서 의미/배치 변경 위험이 직접 존재한다. default cleanup과 security sanitization을 분리하고 core/UI/locale/QA를 함께 갱신해야 한다. |
| P0 | NBSP normalization 기본 checked 변경 재검토 또는 옵션을 접힘 밖에서 명시 | 높음 | 높음 | 낮음~중간 | 현재 dirty surface는 사용자가 펼치지 않은 옵션으로 U+00A0/U+2007/U+202F를 바꾼다. 기본 off가 가장 보수적이며, 유지한다면 실행 전 “special spaces will change”를 보여 줘야 한다. |
| P1 | occurrence 위치와 inline visible-marker preview | 높음 | 높음 | 중간 | “무엇을 제거했나”에서 “어디서 제거했나”로 진단 가치를 높이는 가장 큰 기능 격차다. bidi token이 결과 UI 자체를 재정렬하지 않도록 isolate/escaping이 필요하다. |
| P1 | safe/security/aggressive preset 및 변경 이유/action log | 높음 | 높음 | 중간~높음 | 개별 checkbox보다 위험 경계를 이해하기 쉽다. original을 유지하고 각 preset의 lossy 범위를 명시한다. |
| P2 | tag characters와 C0/C1 탐지(기본 제거와 분리) | 중간 | 높음 | 중간 | 탐지 범위는 넓어지지만 control characters는 의미가 다양하므로 “suspicious/malicious”로 뭉뚱그리지 않는다. |
| P3 | NFC/NFD/NFKC/NFKD 정규화/문자열 비교 | 중간 | 높음 | 높음 | 유용하지만 현재 주기능을 넘어선다. Unicode inspector/normalizer 전용 route가 더 적합하다. |

## 안전한 claim 후보

- “정의된 zero-width 및 format 문자 목록을 찾아 제거하고 code point와 개수를 보여 줍니다.”
- “AI 작성 여부를 판별하지 않으며, literal hidden Unicode만 다룹니다.”
- “ZWJ/ZWNJ, variation selectors, combining marks는 기본 보존하고 고급 옵션에서만 제거합니다.” 단, bidi controls와 NBSP의 실제 기본값은 별도로 정확히 설명해야 한다.
- “정리 작업은 현재 페이지의 브라우저 메모리에서 실행됩니다.” 배포 네트워크 QA가 유지된다는 전제에서 사용한다.
- “고급 제거는 emoji 모양이나 언어 shaping을 바꿀 수 있어 경고와 함께 제공합니다.”

## 금지하거나 추가 증거가 필요한 claim

- “GPT/Claude/Gemini watermark를 제거한다” — literal Unicode와 provider-level statistical/token watermark는 다르다.
- “AI detector를 우회한다”, “undetectable text를 만든다”, “AI 점수를 낮춘다” — 현재 기능·검증 범위가 아니며 오해를 유도한다.
- “AI가 생성한 글인지 판별한다” — 현재 copy도 이를 부인한다.
- “모든 invisible Unicode를 제거한다” — curated 목록이며 tag/C0/C1/많은 spaces 등을 다루지 않는다.
- “flagged character는 악성이다”, “보안 위협을 제거한다” — joiner/bidi/variation selector는 합법적 언어·emoji 용도가 있다.
- “lossless cleanup” — bidi, soft hyphen, NBSP, combining/joiner 옵션은 표시·의미를 바꿀 수 있다.
- “100% safe/private” — 절대 표현 대신 실제 처리 경계와 예외를 말한다.

## 검증과 한계

- 현재 review surface의 route/registry/feature/core/locale copy/manifest, current dirty diff와 `git log`를 확인했다.
- `2026-08-30` 집중 테스트에서 네 코어 `4 files / 46 tests`가 통과했으며 `text-cleaner-core`는 5 tests다.
- 현재 미커밋 QA는 English/Korean/Arabic output, `U+200B`/`U+2060` report, warning, NBSP 기본 checked를 요구하는 것을 확인했다. 브라우저 연결 메타데이터 문제로 그 Playwright QA 자체는 재실행하지 못했다.
- 테스트 Node `v22.12.0`은 저장소 요구사항 `>=22.19 <23`보다 낮으므로 공식 전체 게이트 증거로 쓰지 않는다.
- 경쟁 페이지의 UI/설명을 관찰했을 뿐 내부 구현, 실제 네트워크 동작, Unicode 데이터베이스 완전성을 독립 검증하지 않았다.
