# URL codec 기능 리뷰

- 검토일: 2026-08-30
- 검토 표면: `worktree/lucky-cloud-860c`의 현재 작업 트리(미커밋 mode-switch/조건부 옵션 변경 포함)
- 공개 상태: `url-encode`, `url-decode` 모두 현재 registry에서 `indexable`
- 결론: component/전체 URI/form 의미를 분리하고 잘못된 `%`와 UTF-8을 다른 오류로 보고하는 점이 좋다. 반복 디코드도 상한과 실제 횟수를 보여 준다. 다만 현재 미커밋 route 링크 방식은 encode/decode 전환 때 입력을 넘기지 않으며, 경쟁 도구에 있는 line-by-line·bulk·URL parser·코드 예시는 없다.

## 소유 경계와 근거

- 경로: `/{locale}/url-encode/`, `/{locale}/url-decode/`
- 화면/상태: `apps/web/src/features/url-codec/{UrlCodec.astro,client.ts,contract.ts,styles.css}`
- 변환 규칙: `packages/url-core/src/index.ts`
- 단위 테스트: `packages/url-core/src/index.test.ts`
- 브라우저 QA: `scripts/qa/url_codec_feature.py`
- 공개·현지화 근거: `apps/web/src/lib/tool-registry.js`, `apps/web/src/lib/locale-review-manifests/url-codec.json`

## 이미 개선된 점

1. `encodeURIComponent` 의미의 component 모드와 `encodeURI` 의미의 전체 URI 모드를 분리한다. form 모드에서는 공백과 `+`를 `application/x-www-form-urlencoded` 관례에 맞게 처리한다.
2. 디코드는 잘못된 percent triplet(`invalid-percent-sequence`)과 유효하지 않은 UTF-8(`invalid-utf8`)을 구분해 현지화된 오류로 연결한다.
3. 반복 디코드는 기본 off이고, 1~10회의 명시 상한을 둔다. 실제 pass 수와 상한 도달 여부를 배지로 보여 주며 상한 밖 값은 core에서 거부한다.
4. 90ms debounce 동안 이전 확정 결과를 stale 상태로 남겨 사용자가 맥락을 잃지 않게 하고, 새 입력 이후 과거 copy 완료가 상태를 덮지 못하게 revision을 검사한다.
5. 2,000,000 UTF-8 바이트 상한, 복사·텍스트 다운로드, 입력/출력 기술방향 LTR을 갖는다. Arabic route에서도 페이지 RTL과 도구 데이터 LTR을 분리하는 QA가 있다.
6. 현재 미커밋 표면은 route와 workspace에 중복되던 mode switch를 공통 `ToolModeSwitch` 하나로 합쳤고, 반복 디코드를 켠 때에만 pass limit를 보여 준다. 이 변경은 아직 커밋 이력으로 간주하지 않는다.
7. 최초 기능은 `5b242df`, 17개 locale과 indexable route/QA 통합은 `f4f6efb`에서 추적된다.

## 경쟁 페이지 관찰

관찰일은 모두 2026-08-30이다.

| 경쟁 페이지 | 직접 관찰한 기능 | 현재 제품과의 관계 |
| --- | --- | --- |
| [URLDecoder.org](https://www.urldecoder.org/) | 문자셋 선택, line-by-line, 최대 16회 반복 디코드, UTF-8 live mode, 100MB 파일 디코드와 결과 다운로드 | 현재 제품은 component/전체 URI 의미와 오류 유형·pass 상한 도달을 더 명확히 드러낸다. 경쟁 페이지는 문자셋·파일·line-by-line과 16회 범위가 넓다. 기본 서버 처리와 live mode의 로컬 처리를 페이지가 구분한다. |
| [URLEncoder.org](https://www.urlencoder.org/) | 문자셋·줄바꿈 선택, line-by-line, 76자 분할, UTF-8 live mode, 100MB 파일 인코드 | 현재 제품은 URI/component/form 의미 선택이 더 직접적이다. 경쟁 페이지는 파일·문자셋·줄 가공이 더 넓다. |

### 상대 평가

- 더 강한 부분: component와 전체 URI를 명시적으로 분리, malformed percent와 invalid UTF-8의 typed 오류, 반복 pass 수·상한 도달 표시, stale-result 및 copy revision 제어.
- 대체로 동등한 부분: UTF-8 percent encode/decode, `+` form-space 처리, 반복 디코드, 복사·다운로드.
- 약한 부분: 여러 문자셋, 파일, line-by-line/bulk, URL 구조·query parameter 분석, 코드 스니펫. 서버 처리 경쟁 모드와의 속도·개인정보 비교는 하지 않았다.

## 결함 및 업그레이드 후보

| 우선순위 | 제안 | 사용자 영향 | 확신 | 노력 |
| --- | --- | --- | --- | --- |
| P0 | 현재 확인된 데이터 손상·노출 결함은 없다. 반복 디코드가 기본 off이고 상한이 있어 즉시 차단할 사안은 발견하지 못했다. | - | 높음 | - |
| P1 | encode/decode route 전환 시 입력을 세션 메모리로 1회 인계하거나, 같은 값을 반대 동작에 적용하는 명시 버튼을 제공한다. URL query/localStorage에는 넣지 않는다. | 높음: 현재 anchor 전환은 입력 맥락을 잃는다. | 높음 | 중간 |
| P1 | “한 줄씩 변환”을 옵션 또는 별도 bulk route로 추가하고, 빈 줄·줄바꿈 보존 fixture를 만든다. | 높음: 로그·목록 처리 사용성이 커진다. | 높음 | 중간 |
| P1 | 반복 디코드 결과에 각 중간 단계 보기/복사를 제공해 구조가 언제 바뀌었는지 확인하게 한다. | 높음: `%252F`가 `/`로 바뀌는 지점을 감사할 수 있다. | 높음 | 중간 |
| P2 | 전체 URI 모드에 읽기 전용 parser 결과(path/query/fragment)를 별도 보조 영역으로 추가한다. 자동 탐색 링크로 만들지는 않는다. | 중간 | 중간 | 중간 |
| P2 | URL/form/component 차이를 실행 가능한 예제로 노출하고, `+`, `%2F`, `%26`, 비ASCII fixture를 각 locale 가이드와 연결한다. | 중간 | 높음 | 낮음 |
| P3 | 파일·비UTF-8 문자셋은 검색 수요와 실제 사용 사례가 확인된 뒤 별도 route로 검토한다. | 낮음~중간 | 중간 | 높음 |

## 안전한 claim 후보

- “URI component, 전체 URI, form-style 공백 규칙을 구분해 URL 인코딩·디코딩합니다.”
- “잘못된 percent escape와 UTF-8 디코딩 실패를 서로 다른 오류로 알려 줍니다.”
- “반복 디코드는 사용자가 켜야 하며 최대 횟수를 제한하고 실제 처리 횟수를 표시합니다.”
- “현재 구현은 입력과 출력 값을 페이지 URL·localStorage·변환 API에 넣지 않습니다.”

## 금지하거나 조건부로만 쓸 claim

- “RFC 3986 전체를 완전 지원”: core는 브라우저 `encodeURI`/`encodeURIComponent` 의미를 사용하며 모든 scheme별 정규화기가 아니다.
- “모든 URL을 안전하게 만든다/검사한다”: percent 변환 도구이지 URL 평판·피싱·리디렉션 검사기가 아니다.
- “디코드 결과 링크는 안전하다”: 현재 제품은 결과를 자동 탐색하지 않으며 안전성도 판정하지 않는다.
- “어떤 문자셋도 지원”: UI와 core는 현재 UTF-8 중심이다.
- “경쟁 도구보다 더 private”: 현재 local 구현은 말할 수 있지만 경쟁 페이지의 실제 네트워크 동작을 동일 조건에서 검사하지 않았다.

## 검증과 한계

- 현재 root 소스·미커밋 diff와 `5b242df`, `f4f6efb` 이력을 확인했다.
- `packages/url-core/src/index.test.ts`의 10개 테스트가 2026-08-30에 통과했다. 다국어 왕복, URI 구조 보존, form-space, 반복 상한과 오류 분리를 포함한다.
- 기존 브라우저 QA가 en/ko/ar 방향, canonical route 전환, 입력이 URL에 들어가지 않는지, 조건부 pass-limit 노출을 검사하는 것을 확인했다.
- 경쟁 페이지 기능은 공개 HTML 관찰 기준이다. 업로드 데이터의 서버 삭제 약속이나 실제 네트워크 처리는 독립 검증하지 않았다.
- 인앱 브라우저 연결 제약으로 미커밋 mode switch를 별도 수동 실행하지 못했다. route 전환 입력 손실 평가는 anchor navigation과 상태 비지속 소스에 근거한다.
