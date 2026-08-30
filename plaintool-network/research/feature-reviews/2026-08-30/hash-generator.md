# Hash generator 기능 리뷰

- 검토일: 2026-08-30
- 검토 표면: `worktree/lucky-cloud-860c` 현재 작업 트리
- 공개 상태: `hash-generator`는 현재 registry에서 `indexable`
- 결론: 텍스트와 원시 파일 바이트에 대해 MD5/SHA-1/SHA-256/SHA-512를 한 번에 계산하고, Worker 취소와 stale-result 제어를 갖춘 실용적인 기본 도구다. 그러나 경쟁 도구도 같은 네 알고리즘 동시 산출과 로컬 처리를 제공하며, 일부는 expected checksum 비교·SHA-384·HMAC·출력 형식·대용량 streaming까지 제공한다. 현재 차별점은 안전한 상태 관리이지 알고리즘 폭이 아니다.

## 소유 경계와 근거

- 경로: `/{locale}/hash-generator/`
- 화면/상태: `apps/web/src/features/hash-generator/{HashGenerator.astro,client.ts,worker.ts,contract.ts,styles.css}`
- 해시 규칙: `packages/hash-core/src/index.ts`
- 단위 테스트: `packages/hash-core/src/index.test.ts`
- 브라우저 QA: `scripts/qa/code_security_feature.py`
- 공개·현지화 근거: `apps/web/src/lib/tool-registry.js`, `apps/web/src/lib/locale-review-manifests/hash-generator.json`

## 이미 개선된 점

1. MD5, SHA-1, SHA-256, SHA-512를 같은 입력에 대해 모두 산출해 알고리즘을 바꿔가며 반복 실행할 필요가 없다.
2. SHA 계열은 브라우저 `crypto.subtle.digest`, MD5는 별도 순수 구현을 사용한다. 표준 `abc` 벡터와 원시 파일 바이트 fixture로 결과를 검증한다.
3. 텍스트는 UTF-8 바이트, 파일은 `arrayBuffer()` 원시 바이트로 구분한다. 파일 이름이나 텍스트 재인코딩을 해시에 섞지 않는다.
4. 8,000,000 UTF-8 바이트 텍스트와 64 MiB 파일 상한을 두고, 파일 크기와 이름을 표시한다. 드래그앤드롭과 파일 선택을 모두 지원한다.
5. 각 해시를 따로 복사하고 네 결과를 `hashes.txt`로 함께 다운로드할 수 있다. MD5/SHA-1은 legacy라는 경고를 결과 위에 항상 둔다.
6. Web Worker로 UI thread를 분리하고 입력 변경 시 이전 Worker를 종료한다. 과거 파일 읽기·Worker reply·copy 완료가 새 입력을 덮지 않도록 revision을 검사하며, 빠른 작업에는 working flash를 지연한다.
7. 기능 도입은 `5b242df`, 17개 locale 및 route/QA 통합은 `f4f6efb`에서 추적된다.

## 경쟁 페이지 관찰

관찰일은 모두 2026-08-30이다.

| 경쟁 페이지 | 직접 관찰한 기능 | 현재 제품과의 관계 |
| --- | --- | --- |
| [Omnibus Hash Generator](https://omnibus.tools/hash-generator) | MD5, SHA-1, SHA-256, SHA-384, SHA-512 동시 산출, 텍스트/파일, 개별 또는 전체 복사, 텍스트 다운로드, expected checksum 비교, 브라우저 로컬 처리 | 현재 제품의 네 알고리즘·텍스트/파일·복사/다운로드는 대체로 동등하다. SHA-384와 직접 비교 기능은 경쟁 페이지가 강하다. |
| [emn178 SHA-256](https://emn178.github.io/online-tools/sha256.html) | UTF-8/UTF-16/Hex/Base64 등 입력 인코딩, lowercase/uppercase Hex와 Base64 출력, HMAC-SHA-256, auto update, 별도 file checksum 도구 안내 | 현재 제품은 네 알고리즘을 한 화면에서 보는 데 유리하다. 한 알고리즘의 입력/출력 형식과 HMAC 깊이는 경쟁 페이지가 강하다. |

### 상대 평가

- 더 강한 부분: 이전 결과 권한을 엄격히 취소하는 Worker 상태 모델, 네 결과를 단순하고 같은 축에서 보여 주는 흐름, legacy 경고의 상시 노출.
- 대체로 동등한 부분: MD5/SHA-1/SHA-256/SHA-512 동시 산출, 텍스트/로컬 파일, 개별 복사, 로컬 계산.
- 약한 부분: expected checksum 직접 비교, SHA-384/SHA-3/BLAKE 계열, HMAC, Hex/Base64 및 대소문자 출력 선택, 다중 파일·폴더·streaming·진행률.

## 결함 및 업그레이드 후보

| 우선순위 | 제안 | 사용자 영향 | 확신 | 노력 |
| --- | --- | --- | --- | --- |
| P0 | 즉시 차단할 정확성 결함은 발견하지 못했다. 표준 벡터와 원시 바이트 fixture는 통과했다. | - | 높음 | - |
| P1 | “기대 해시 붙여넣기 → 알고리즘/형식 자동 감지 → constant-time까지는 주장하지 않는 단순 일치/불일치” 흐름을 추가한다. | 높음: 실제 checksum 확인 과업을 도구 안에서 끝낸다. | 높음 | 중간 |
| P1 | 파일 전체를 메인 thread에서 `arrayBuffer()`로 읽는 구조를 chunk/stream Worker 모델로 바꾸고 진행률·취소를 표시한다. | 높음: 64 MiB 상한 근처의 메모리 복제와 모바일 실패 가능성을 줄인다. | 높음 | 높음 |
| P1 | MD5뿐 아니라 SHA-1도 legacy 경고에서 명시적으로 구분하고, 비밀번호 저장·진위 증명 용도가 아니라는 짧은 설명을 결과 옆에 둔다. | 높음: 보안 오용을 줄인다. | 높음 | 낮음 |
| P2 | SHA-384와 출력 형식(lower/upper hex, Base64)을 추가한다. 알고리즘은 수요가 확인된 범위만 늘린다. | 중간 | 높음 | 중간 |
| P2 | HMAC은 일반 hash와 다른 과업임을 분리해 별도 mode/route로 설계하고, 키 저장·공유·URL 반영을 금지한다. | 중간 | 높음 | 중간~높음 |
| P3 | 폴더·다중 파일·checksum manifest 일괄 검증은 별도 전문 route로 검토한다. | 낮음~중간 | 중간 | 높음 |

## 안전한 claim 후보

- “텍스트 또는 로컬 파일의 MD5, SHA-1, SHA-256, SHA-512를 한 번에 계산합니다.”
- “파일은 텍스트로 바꾸지 않고 원시 바이트를 해시합니다.”
- “SHA-1/SHA-256/SHA-512는 Web Crypto를 사용하고, 계산은 Web Worker에서 수행됩니다.”
- “현재 구현은 입력을 해시 API나 페이지 URL에 보내지 않습니다.”

## 금지하거나 조건부로만 쓸 claim

- “해시가 같으면 파일이 진짜다/안전하다”: 신뢰 가능한 expected digest가 없으면 unkeyed hash는 출처를 인증하지 않는다.
- “MD5와 SHA-1은 안전하다”: 충돌 저항이 필요한 새 보안 용도에 권장할 수 없다.
- “비밀번호를 안전하게 해시한다”: salt/work factor를 갖춘 password KDF가 아니다.
- “Web Crypto라서 cryptographically audited”: 브라우저 API 사용만으로 제품 전체 감사를 뜻하지 않는다. MD5는 자체 구현이다.
- “어떤 크기 파일도 처리”: 현재 64 MiB 정책이고 파일 전체를 메모리에 읽는다.
- “경쟁 도구보다 빠르다/private하다”: 동등 벤치마크와 네트워크 비교가 없다.

## 검증과 한계

- 현재 root 소스와 `5b242df`, `f4f6efb` 이력을 확인했다.
- `packages/hash-core/src/index.test.ts`의 5개 테스트가 2026-08-30에 통과했다. `abc` 표준 벡터, 원시 바이트, 다국어 결정성, 빈 입력을 포함한다.
- 브라우저 QA가 SHA-256 `abc` 결과와 Arabic 모바일 overflow를 확인하는 것을 검토했다.
- 큰 파일 메모리/시간 측정, 여러 브라우저 Web Crypto 비교, MD5 외부 독립 구현 교차검증은 이번 감사에서 수행하지 않았다.
- 경쟁 페이지는 공개 HTML에서 보이는 기능만 기록했고 내부 구현·성능·개인정보 처리는 독립 검증하지 않았다.
