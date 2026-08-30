# JWT decoder 기능 리뷰

- 검토일: 2026-08-30
- 검토 표면: `worktree/lucky-cloud-860c` 현재 작업 트리(미커밋 결과 강조 스타일 포함)
- 공개 상태: `jwt-decoder`는 현재 registry에서 `indexable`
- 결론: 이 기능은 JWT를 **디코드할 뿐 서명을 검증하지 않는다**. 그 경계를 상단 고정 경고와 QA로 유지하는 점이 가장 중요한 강점이다. 구조/Base64URL/UTF-8/JSON 오류를 나누고 signature bytes와 NumericDate를 보여 주지만, jwt.io의 키 기반 검증이나 경쟁 decoder의 만료 상태·claim 설명·duplicate-key 검출에는 못 미친다.

## 소유 경계와 근거

- 경로: `/{locale}/jwt-decoder/`
- 화면/상태: `apps/web/src/features/jwt-decoder/{JwtDecoder.astro,client.ts,worker.ts,contract.ts,styles.css}`
- 디코드 규칙: `packages/jwt-core/src/index.ts`
- 단위 테스트: `packages/jwt-core/src/index.test.ts`
- 브라우저 QA: `scripts/qa/code_security_feature.py`
- 공개·현지화 근거: `apps/web/src/lib/tool-registry.js`, `apps/web/src/lib/locale-review-manifests/jwt-decoder.json`

## 이미 개선된 점

1. `header.payload.signature` 세 segment를 요구하고, 빈 header/payload, Base64URL, fatal UTF-8, JSON syntax, JSON object shape 오류를 서로 다른 typed error로 보고한다.
2. header와 payload를 들여쓴 JSON으로 분리하고, signature segment는 검증 결과가 아니라 원시 byte length와 hex로 표시한다. 빈 signature를 가진 `alg: none` 형태도 “디코드 가능한 세 부분 토큰”으로만 처리한다.
3. `exp`, `nbf`, `iat`가 유한 숫자일 때 ISO UTC로 바꾸고, 잘못된 값은 invalid로 표시한다. 값이 없을 때도 명시적 빈 상태를 보여 준다.
4. 상단 `jwt-verification-warning`은 입력 전후 항상 보이며 “no verification” 제목과 본문을 유지한다. 브라우저 QA가 경고가 사라지거나 바뀌지 않는지, 토큰이 URL에 포함되지 않는지 검사한다.
5. 1,000,000 UTF-8 바이트 상한과 Worker를 두고, debounce·stale 상태·revision으로 과거 결과와 copy 완료가 새 토큰을 덮지 못하게 한다.
6. header/payload/signature를 각각 복사하고 한 파일로 다운로드한다. 현재 미커밋 스타일은 입력 표면보다 결과 표면을 강조하도록 시각 계층을 바로잡고 QA로 색상 관계를 검사한다.
7. 기능 도입은 `5b242df`, 17개 locale과 route/QA 통합은 `f4f6efb`에서 추적된다.

## 경쟁 페이지 관찰

관찰일은 모두 2026-08-30이다.

| 경쟁 페이지 | 직접 관찰한 기능 | 현재 제품과의 관계 |
| --- | --- | --- |
| [jwt.io JWT Debugger](https://www.jwt.io/) | header/payload JSON과 claims table, encoder, secret 입력을 통한 선택적 signature verification, 생성 예제, copy | signature verification 범위와 claims table은 jwt.io가 명확히 강하다. 현재 제품은 키를 받지 않는 decoder-only 경계를 더 단순하게 유지하지만 이것은 검증 기능보다 우월하다는 뜻이 아니다. |
| [jwt.ms](https://jwt.ms/) | 토큰이 브라우저를 떠나지 않는다는 안내, decoded token과 claims 표, signature 섹션 | 로컬 decode와 claims 열람은 대체로 동등하다. 현재 제품은 typed parsing 오류, signature byte length/hex, `exp`/`nbf`/`iat` ISO 목록을 코드와 테스트로 확인할 수 있다. jwt.ms의 signature 유효성 판정은 공개 페이지에서 관찰되지 않아 있다고 기록하지 않는다. |

### 상대 평가

- 더 강한 부분: decoder-only 경계를 항상 보이는 경고로 고정, parsing 실패 원인을 세분화, signature를 “verified”가 아닌 bytes/hex로 표현, stale worker 결과 방지.
- 대체로 동등한 부분: header/payload pretty JSON, claim 열람, 로컬 입력 처리, copy.
- 약한 부분: secret/public key/JWKS를 이용한 서명 검증, claims table의 설명, 현재 시각 기준 expired/not-yet-valid 상태, issuer/audience 해석, Bearer prefix 정리, duplicate JSON name 경고.

## 결함 및 업그레이드 후보

| 우선순위 | 제안 | 사용자 영향 | 확신 | 노력 |
| --- | --- | --- | --- | --- |
| P0 | 결과·다운로드의 signature 제목에도 항상 `NOT VERIFIED`를 포함하고, 성공 상태를 “Decoded”로만 유지한다. “Valid”라는 단어는 서명/claim 검증을 구현하기 전 사용하지 않는다. | 매우 높음: decode 성공을 신뢰 판정으로 오해하는 것을 막는다. | 높음 | 낮음 |
| P1 | `exp`/`nbf`를 현재 시각과 비교해 “expired/not active” 참고 상태를 추가하되, clock skew·issuer 정책·signature를 검사하지 않았으므로 전체 token validity로 표현하지 않는다. | 높음 | 높음 | 중간 |
| P1 | JSON duplicate member를 감지해 경고한다. 일반 `JSON.parse`가 마지막 값을 남기는 사실을 숨기지 않는다. | 높음: 보안 분석 중 parser 간 해석 차이를 찾을 수 있다. | 중간~높음 | 중간 |
| P1 | `Authorization: Bearer` prefix·따옴표·줄바꿈을 제거하는 명시적 opt-in paste cleanup과 적용 내역 배지를 추가한다. | 높음: 로그에서 복사한 토큰 처리 실패를 줄인다. | 높음 | 낮음~중간 |
| P2 | 알고리즘, `kid`, `typ`, `iss`, `aud`, registered claims를 표로 요약하되 “claimed value”로 표시한다. | 중간 | 높음 | 중간 |
| P2 | 서명 검증이 필요하면 decoder 안에 secret box를 즉흥 추가하지 말고 별도 verifier route로 설계한다. 알고리즘 allowlist, 키 유형 일치, `alg:none` 거부, 키 비저장, JWKS 네트워크 경계를 먼저 정의한다. | 높음 | 높음 | 높음 |
| P3 | JWT encoder는 별도 과업이며 기본 decoder 화면에 합치지 않는다. | 낮음 | 높음 | 중간~높음 |

## 안전한 claim 후보

- “JWT header와 payload를 Base64URL 디코드해 읽을 수 있는 JSON으로 보여 줍니다.”
- “`exp`, `nbf`, `iat` 숫자 값을 ISO UTC 시각으로 표시합니다.”
- “signature segment의 바이트 수와 hex를 표시하지만 서명은 검증하지 않습니다.”
- “현재 구현은 토큰을 페이지 URL·localStorage·검증 API에 넣지 않습니다.”

## 금지하거나 조건부로만 쓸 claim

- “JWT를 검증/validate/verify합니다”, “Signature verified”, “Valid JWT”: 현재 구현은 어떤 키도 사용하지 않는다.
- “만료되지 않은 안전한 토큰”: 현재는 시각 비교도 issuer/audience/signature 정책도 검사하지 않는다.
- “signature를 디코드했으므로 진짜다”: signature bytes 열람은 cryptographic verification이 아니다.
- “민감한 production token을 붙여도 안전”: bearer token 자체가 credential일 수 있고 페이지 외부 통합/브라우저 환경까지 보증할 수 없다.
- “모든 JWT/JWS/JWE 지원”: 현재는 JSON object header/payload를 가진 3-part compact 형태만 다룬다. JWE 5-part는 지원하지 않는다.
- “jwt.io보다 안전하다”: 기능 범위와 키 입력 설계가 다르며 독립 보안평가가 없다.

## 검증과 한계

- 현재 root 소스·미커밋 diff와 `5b242df`, `f4f6efb` 이력을 확인했다.
- `packages/jwt-core/src/index.test.ts`의 6개 테스트가 2026-08-30에 통과했다. padded/unpadded Base64URL, 빈 signature, NumericDate, 구조·UTF-8·JSON 오류를 포함한다.
- 브라우저 QA가 no-verification 경고의 지속성, URL 비누출, Arabic 기술문자 LTR, 미커밋 결과 강조 표면을 검사하는 것을 확인했다.
- 키 기반 서명 검증은 구현도 시험도 하지 않았다. 보고서 어디에서도 현재 JWT의 진위를 판정했다고 보지 않는다.
- 인앱 브라우저 연결 제약으로 현재 미커밋 스타일을 별도 수동 브라우저 세션에서 재확인하지 못했다. 경쟁 기능은 공개 HTML 관찰 범위다.
