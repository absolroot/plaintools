# Text Compare 경쟁 기능 리뷰

- 감사일: `2026-08-30`
- 감사 계약 기준 커밋: `02a7c57`
- 실제 검토 표면: `worktree/lucky-cloud-860c`의 `6025eb0` 및 당시 미커밋 변경(Text Compare 관련 미커밋 변경 없음)
- 결론: 정확한 원문 보존, line-ending/whitespace 구분, stale-result 방지는 좋다. 반면 local-first 경쟁 도구도 같은 프라이버시와 Worker 구조를 제공하면서 파일 입력, ignore 규칙, unified/patch export까지 갖춰 기능 격차가 크다.

## 경로, 공개 상태, 소유권

- 경로: 모든 공개 로케일의 `/{locale}/text-compare/`
- 공개 상태: `apps/web/src/lib/tool-registry.js`에서 `indexable`
- 기능/UI: `apps/web/src/features/text-compare/**`
- 코어: `packages/text-diff-core/**` (`diff` 패키지 사용)
- 얇은 라우트: `apps/web/src/pages/[locale]/text-compare/index.astro`
- 기능 QA: `scripts/qa/text_compare_feature.py`, 공통 등록/반응형/네트워크/로케일 QA
- 로케일 근거: `apps/web/src/lib/locale-review-manifests/text-compare.json`, 17개 공개 로케일

## 이미 개선된 점과 추적 근거

| 근거 | 현재 개선 내용 |
| --- | --- |
| `13bf583` (`Add text comparison preview`) | side-by-side line diff, 변경 줄의 grapheme 단위 inline diff, 추가/삭제/변경 통계, 줄 번호, Swap/Clear, 변경 이동, 긴 unchanged block 접기를 도입했다. |
| `packages/text-diff-core/src/index.ts` | CR/LF/CRLF 및 마지막 개행을 정규화로 지우지 않고 보존하며 `lineEndingChange`와 `whitespaceOnlyChange`를 별도 표시한다. canonical-equivalent Unicode도 임의 정규화하지 않는다. |
| 현재 core/client | 각 입력 1MiB, 합산 20,000 logical lines, 1.2초 diff timeout, 8,000 rendered-row 한계와 typed `too-complex` 결과가 있다. inline diff budget 초과 시 전체 줄 표시와 경고로 degrade한다. |
| 현재 client | 명시적 Compare와 `Ctrl/Cmd+Enter`, latest-only Worker, 기존 결과를 남긴 stale 표시, Clear/Swap의 pending-work 무효화, Worker failure 오류를 구현한다. |
| `7d560c8`, `01cd8ef`, `1f69677` | 17개 로케일 copy/manifest와 기능 QA에 통합됐고 이후 `indexable`로 승격됐다. |
| `scripts/qa/text_compare_feature.py` | line/inline 결과, whitespace/line-ending badge, 변경 이동, stale 결과, 빈 입력 회복, Worker failure와 desktop/mobile layout을 검사하도록 작성돼 있다. |

## 경쟁 페이지 관찰

아래는 `2026-08-30`에 페이지에서 직접 확인한 기능만 적었다.

| 경쟁 페이지 | 관찰된 기능 |
| --- | --- |
| [Diffchecker](https://www.diffchecker.com/) | side-by-side/unified, character precision, merge, PDF export, file drag/drop, real-time recompare, custom ignore rule, unchanged-line 숨김, line wrap, 비교 링크 공유와 inline comment를 소개한다. Pro에는 AI difference summary가 있고, desktop app은 폴더 및 여러 문서 형식을 offline 비교한다고 안내한다. |
| [Shahawi Apps Diff Checker](https://shahawiapps.com/tools/diff/) | 브라우저 로컬 background worker, 5MB/side 파일 열기·drag/drop, live diff, moved-line 감지, unchanged fold, side-by-side/unified/patch, patch copy/download, ignore whitespace/case, 로컬 기기 내 최근 텍스트 기억을 제공한다. |
| [DraftFort Text Compare](https://draftfort.com/tools/text-compare) | 명시적 Compare, 브라우저 로컬/무저장, side-by-side line/inline diff, ignore case·normalize spaces·ignore blank lines, similarity percentage, 변경 이동 및 patch export를 설명한다. ignore 옵션이 원문이나 patch를 조용히 바꾸지 않는다고 명시한다. |

## 상대 평가

### AbsolTools가 더 강한 지점

- line-ending 차이와 whitespace-only 차이를 별도 플래그로 표시하고 원문을 정확히 재구성하는 테스트가 명시돼 있다.
- 제한 초과를 브라우저 정지로 방치하지 않고 입력/줄/편집 복잡도/렌더 수 한계와 로컬화된 복구 오류로 바꾼다.
- 편집 중 이전 결과를 지우지 않고 `stale`로 보존하는 상태 계약과 stale Worker 차단이 코드·QA로 추적된다.
- 입력을 URL, 저장소, 공유 링크에 넣지 않는 범위가 구조적으로 좁다. 다만 Shahawi Apps와 DraftFort도 로컬 처리를 명시하므로 “유일한 private diff”는 아니다.

### 대체로 동등한 지점

- side-by-side line diff, 수정 줄의 inline highlight, unchanged fold, Swap/Clear, 변경 이동은 현대적인 경쟁 도구의 기본군과 대체로 동등하다.
- 수동 Compare는 DraftFort도 의도적으로 선택한다. live diff가 없다는 사실만으로 성능 열세라 단정할 수 없다.

### AbsolTools가 약한 지점

- ignore case/whitespace/blank-line, custom ignore 같은 비교 규칙이 없다.
- unified/patch view, patch copy/download, PDF export, 결과 공유/주석/merge가 없다.
- 파일 입력과 drag/drop이 없다.
- moved-line 감지, similarity score, syntax highlight가 없다.
- 경쟁 local-first 도구의 5MB/side 관찰치보다 현재 1MiB/side 제한이 작다. 알고리즘과 렌더 예산이 다르므로 단순 성능 열세로 표현하지는 않는다.

## 업그레이드 후보

| 우선순위 | 후보 | 사용자 영향 | 확신 | 노력 | 판단 |
| --- | --- | --- | --- | --- | --- |
| P0 | 확인된 긴급 결함 없음 | - | 높음 | - | 현재 테스트/소스에서 원문 손실이나 stale 결과 승리의 재현 가능한 P0는 발견하지 못했다. |
| P1 | `Ignore case`, `Ignore whitespace`, `Ignore blank lines`를 접힌 Options로 추가 | 높음 | 높음 | 중간~높음 | 세 경쟁 페이지에서 반복 관찰된 핵심 격차다. 원문과 export는 바꾸지 않고 alignment 규칙만 바꿔야 하며, 활성 규칙을 결과에 계속 표시해야 한다. |
| P1 | unified patch 보기 + `.patch` copy/download | 높음 | 높음 | 중간 | 개발/리뷰 작업의 다음 행동을 완성한다. 화면 규칙과 patch 원문 semantics를 분리해야 한다. |
| P2 | `.txt`, `.md`, `.log` 로컬 파일 열기/drag-drop | 중간 | 높음 | 중간 | 붙여넣기 마찰을 줄이되 파일명·내용·오류를 브라우저 메모리 밖으로 보내지 않는다. 1MiB 정책과 인코딩 오류를 명확히 해야 한다. |
| P2 | moved-line 감지 | 중간 | 중간 | 높음 | 긴 문서에서는 churn을 줄이지만 false match 설명과 성능 예산이 필요하다. |
| P3 | share link, inline comment, AI summary, merge | 낮음~중간 | 높음 | 높음 | 서버/저장/계정/AI 전송 경계를 새로 만들고 현재 정적 local-only 원칙과 충돌한다. 별도 제품·개인정보 결정을 거치기 전에는 넣지 않는다. |

## 안전한 claim 후보

- “두 텍스트를 브라우저의 Web Worker에서 비교합니다.”
- “추가·삭제·수정 줄과 줄 안의 문자 차이를 나란히 보여 줍니다.”
- “CR, LF, CRLF와 공백만 달라진 변경을 구분합니다.”
- “편집 후에는 기존 결과를 지우지 않고 오래된 결과임을 표시하며, 최신 작업만 결과를 갱신합니다.”
- “긴 unchanged 구간은 접고 필요할 때 펼칠 수 있습니다.”

## 금지하거나 추가 증거가 필요한 claim

- “Diffchecker보다 좋다/빠르다/정확하다” — 공통 corpus와 시간·메모리 benchmark가 없다.
- “minimal diff를 항상 보장한다” — 사용하는 알고리즘과 timeout/complexity fallback의 범위를 함께 설명해야 한다.
- “모든 파일을 비교한다” — 현재는 paste text만 지원하고 각 입력 1MiB, 합산 20,000줄 제한이다.
- “moved lines를 감지한다”, “ignore whitespace를 지원한다”, “patch를 export한다” — 현재 기능이 아니다.
- “100% private/secure” — 절대 표현 대신 브라우저 로컬 처리와 금지된 데이터 경로를 구체적으로 말한다.
- “표절/의미/법률 redline을 판단한다” — 텍스트 diff일 뿐이다.

## 검증과 한계

- 현재 review surface의 route/registry/feature/core/copy/manifest, `git log`, current diff를 확인했다.
- `2026-08-30` 집중 테스트에서 네 코어 `4 files / 46 tests`가 통과했으며 `text-diff-core`는 14 tests다.
- `scripts/qa/text_compare_feature.py`의 desktop/mobile/worker-failure/stale-result 계약을 검토했지만 브라우저 연결 메타데이터 문제로 실제 화면 QA를 재실행하지 못했다.
- 테스트 Node `v22.12.0`은 저장소 요구사항 `>=22.19 <23`보다 낮으므로 전체 게이트 통과 주장에는 쓰지 않는다.
- 경쟁 페이지의 UI/설명을 관찰했을 뿐 내부 알고리즘, 서버 처리, 보존 정책, 유료 제한을 독립 검증하지 않았다.
