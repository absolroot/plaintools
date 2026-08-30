# Word Counter 경쟁 기능 리뷰

- 감사일: `2026-08-30`
- 감사 계약 기준 커밋: `02a7c57`
- 실제 검토 표면: `worktree/lucky-cloud-860c`의 `6025eb0` 및 당시 미커밋 변경(Word Counter 관련 미커밋 변경 없음)
- 결론: 현재 도구는 “작고 정확한 다국어 기본 카운터”로는 탄탄하다. 경쟁 도구의 문장 수·읽기 시간·키워드 빈도를 그대로 따라가기보다, 현재 숫자의 계산 기준을 먼저 설명하고 추가 지표는 실제 수요가 확인될 때 보조 Details로 검토한다.

## 경로, 공개 상태, 소유권

- 경로: 모든 공개 로케일의 `/{locale}/word-counter/`
- 공개 상태: `apps/web/src/lib/tool-registry.js`에서 `indexable`
- 기능/UI: `apps/web/src/features/word/**`
- 코어: `packages/text-metrics-core/**`
- 얇은 라우트: `apps/web/src/pages/[locale]/word-counter/index.astro`
- 기능 QA: `scripts/qa/word_feature.py`, 공통 등록/반응형/네트워크/로케일 QA
- 로케일 근거: `apps/web/src/lib/locale-review-manifests/word-counter.json`, 17개 공개 로케일

## 이미 개선된 점과 추적 근거

| 근거 | 현재 개선 내용 |
| --- | --- |
| `0f103ad` (`Correct locale-aware text metrics`) | `Intl.Segmenter`의 locale-aware 단어 분할과 grapheme 단위 글자 수를 도입했다. 결합 문자와 확장 이모지를 UTF-16 code unit 수로 잘못 세지 않는다. Segmenter가 없을 때는 code point/Unicode 정규식 근사값으로 전환하고 `approximate`를 노출한다. |
| `0f103ad` 및 `packages/text-metrics-core/src/index.test.ts` | LF/CRLF/CR 혼합, 공백만 있는 줄, 연속된 비공백 줄, 빈 입력, regional-indicator emoji를 테스트한다. 문단은 빈 줄로 나뉜 블록으로 일관되게 계산한다. |
| 현재 `client.ts` | 90ms debounce와 latest-only Worker를 사용한다. 빠른 입력 중 이전 결과를 0으로 번쩍이거나 오래된 Worker 응답으로 덮지 않으며, 작업 상태도 180ms보다 짧은 처리에는 지연 표시한다. |
| 현재 UI | 단어·글자 수를 1차 지표, 공백 제외 글자·줄·문단을 2차 지표로 구분한다. 별도 실행 버튼 없이 입력 즉시 계산하고 Clear 뒤 입력에 초점을 돌린다. |
| `7d560c8`, `1f69677` | 17개 독립 로케일 번들 및 검토 manifest를 갖췄고, 이후 `indexable`로 승격됐다. |
| `scripts/qa/word_feature.py` | 한국어/영어 혼합, emoji/Unicode 공백, 1,000,000-byte 경계, 오류 회복, rapid-input, Clear, 모바일 2+3 지표 배치와 44px Clear를 검증하도록 작성돼 있다. |

## 경쟁 페이지 관찰

아래는 `2026-08-30`에 페이지에서 직접 확인한 기능만 적었다.

| 경쟁 페이지 | 관찰된 기능 |
| --- | --- |
| [WordCounter.net](https://wordcounter.net/) | 단어·고유 단어·문자/공백 제외 문자·문장·문단·줄 외에도 문장 길이, 평균 단어 길이, 페이지/음절, 읽기·말하기·필기 시간, 읽기 수준, keyword density, flow score, 목표, 찾기/바꾸기, PDF/TXT/DOC/DOCX/ODT 업로드와 다운로드, Google Drive 저장 및 autosave를 노출한다. |
| [WordCounter.net Character Counter](https://wordcounter.net/character-count) | 문자, 단어, 문장, 문단, 줄과 `Count Spaces` 토글을 한 화면에 둔다. |
| [Rankato Word Counter](https://rankato.com/tools/word-counter) | 입력 즉시 단어·문자·공백 제외 문자·문장·문단·줄을 계산하고, 조정 가능한 읽기/말하기 속도, 평균 단어 길이, 최장 단어, 상위 10개 키워드와 stopword/case 옵션을 제공한다. 페이지는 브라우저 로컬 계산이라고 명시한다. |

## 상대 평가

### AbsolTools가 더 강한 지점

- 구현과 테스트가 `Intl.Segmenter` 기반 grapheme/word segmentation 및 fallback 경고까지 명시한다. 경쟁 페이지의 “Unicode-aware” 문구만으로 동일한 경계 정확도를 확인할 수는 없으므로, 이는 “더 정확하다”가 아니라 **계산 규칙과 회귀 근거가 더 구체적**이라는 강점이다.
- 계산 기능에 업로드, 저장, 계정, 목표 추적을 섞지 않는다. 저장소 아키텍처와 현재 소스상 입력은 브라우저 메모리에만 머물며 도구 상태를 `localStorage`에 저장하지 않는다.
- 1MB 입력 제한과 실패/회복 상태가 명시적이고, 빠른 입력·Worker 실패·Clear 권한을 QA 계약으로 관리한다.

### 대체로 동등한 지점

- 기본 단어·문자·공백 제외 문자·줄·문단을 입력 즉시 보여 주는 핵심 작업은 경쟁 카운터와 동등하다.
- 브라우저 로컬 계산은 Rankato도 명시하므로 독점적 차별점으로 말하면 안 된다.

### AbsolTools가 약한 지점

- 문장 수, 읽기/말하기 시간, 고유 단어, 평균/최장 단어, keyword frequency/density가 없다.
- 파일 불러오기, 결과 내보내기, 목표 설정, 찾기/바꾸기가 없다. 다만 이러한 기능 전부를 한 화면에 추가하면 “한 경로 한 주기능” 원칙과 충돌한다.
- 사용자가 “글자”가 grapheme cluster이고 “단어”가 locale-aware segmentation 결과라는 규칙을 결과 가까이서 바로 확인하기 어렵다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 확인된 긴급 결함 없음 | - | 높음 | - | 현재 코어/상태 계약에서 데이터 손실이나 오계산의 재현 가능한 P0는 발견하지 못했다. |
| P1 | 결과 근처에 계산 규칙 도움말 추가 | 중간 | 높음 | 낮음 | “문자=grapheme”, 문단=빈 줄 구분, fallback 시 근사값이라는 의미를 짧게 설명하면 숫자 신뢰성이 올라간다. |
| P2 | `.txt` 로컬 파일 불러오기 | 중간 | 높음 | 낮음~중간 | 장문 붙여넣기 마찰을 줄인다. 파일명/내용/오류를 네트워크·URL·저장소로 보내지 않는 기존 정책을 유지해야 한다. |
| P3 | `문장 수`와 `예상 읽기 시간`을 보조 Details로 추가 | 중간 | 중간 | 중간 | 로케일별 문장 경계와 WPM 가정이 필요하므로 실제 사용 요청 전에는 기본 지표를 늘리지 않는다. |
| P3 | 상위 단어 빈도를 별도 장문 분석 경로로 추가 | 낮음~중간 | 중간 | 중간 | stopword와 CJK tokenization 정책이 필요하다. `keyword density`를 SEO 점수처럼 해석시키지 않아야 한다. |
| P3 | 목표·활동·자동 저장 | 낮음 | 높음 | 높음 | 경쟁 기능이지만 계정/지속 상태 없는 정적 도구 방향과 충돌한다. 별도 제품 결정 없이는 넣지 않는다. |

## 안전한 claim 후보

- “단어, grapheme 단위 글자, 공백 제외 글자, 줄, 문단을 브라우저에서 계산합니다.”
- “`Intl.Segmenter`를 사용할 수 있을 때 로케일별 단어 경계와 grapheme cluster를 사용합니다.”
- “Segmenter가 없는 환경에서는 근사 계산임을 표시합니다.”
- “입력은 업로드하거나 도구 상태로 저장하지 않습니다.” 단, 배포 후 네트워크 QA가 계속 통과한다는 전제에서 사용한다.
- “빠르게 입력해도 최신 입력의 결과만 반영하도록 설계되고 테스트됐습니다.”

## 금지하거나 추가 증거가 필요한 claim

- “가장 정확한 word counter”, “경쟁 사이트보다 정확함” — 공통 다국어 benchmark가 없다.
- “모든 언어를 완벽하게 계산” — segmentation 규칙과 브라우저 구현 차이가 있다.
- “100% private/secure” — 범위가 무제한이고 배포 환경·서드파티 스크립트까지 포함하는 절대 표현이다.
- “SEO 점수를 개선한다”, “최적 keyword density를 알려 준다” — 현재 기능이 아니며 검색 성과 보장도 불가하다.
- “무제한 입력” — UI 제한은 1,000,000 UTF-8 bytes다.

## 검증과 한계

- 현재 review surface의 route/registry/feature/core/copy/manifest 및 `git log`를 확인했다.
- `2026-08-30`에 네 코어의 집중 테스트를 실행했고 `4 files / 46 tests`가 통과했다. 이 중 `text-metrics-core`는 15 tests다.
- 저장소의 `scripts/qa/word_feature.py` 계약을 검토했지만 이번 분기에서는 브라우저 연결 메타데이터 문제로 실제 desktop/mobile QA를 재실행하지 못했다.
- 테스트 실행 Node는 `v22.12.0`으로 저장소 요구사항 `>=22.19 <23`보다 낮았다. 테스트 통과는 유효하지만 공식 전체 게이트의 대체 증거로 쓰지 않는다.
- 경쟁 비교는 페이지가 공개한 현재 UI/설명 관찰이다. 경쟁사의 내부 알고리즘, 실제 네트워크 동작, 정확도, 보존 정책을 독립 검증하지 않았다.
