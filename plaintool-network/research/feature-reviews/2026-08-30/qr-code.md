# QR code generator / scanner 기능 리뷰

- 검토일: 2026-08-30
- 검토 표면: `worktree/lucky-cloud-860c` 현재 작업 트리(미커밋 generator/scanner 공통 switch 포함)
- 공개 상태: `qr-code-generator`, `qr-code-scanner` 모두 현재 registry에서 `indexable`
- 결론: 같은 제품 안에서 생성한 QR을 이미지로 내려받아 다시 스캔할 수 있고, 카메라·업로드·권한 실패를 브라우저 안에서 닫힌 흐름으로 처리한다. URL도 자동으로 열지 않아 안전한 기본값이다. 반면 생성 형식은 일반 텍스트 하나뿐이고, 경쟁 generator의 로고·색상·템플릿·PDF/EPS나 경쟁 scanner의 다중 symbology·PDF·paste·structured payload 해석은 없다.

## 소유 경계와 근거

- 경로: `/{locale}/qr-code-generator/`, `/{locale}/qr-code-scanner/`
- 화면/상태: `apps/web/src/features/qr/{QrGenerator.astro,QrScanner.astro,generator-client.ts,scanner-client.ts,contract.ts,styles.css}`
- 생성/스캔 규칙: `packages/qr-core/src/{encode.ts,decode.ts,types.ts}`
- 단위 테스트: `packages/qr-core/src/index.test.ts`
- 브라우저 QA: `scripts/qa/qr_feature.py`
- 공개·현지화 근거: `apps/web/src/lib/tool-registry.js`, `apps/web/src/lib/locale-review-manifests/qr-code.json`

## 이미 개선된 점

1. generator는 L/M/Q/H 오류정정 수준과 quiet zone 0/2/4/8을 선택하고, 1024px 목표의 integer module canvas를 만든다. image smoothing을 끄고 SVG에는 `shape-rendering="crispEdges"`를 넣는다.
2. PNG와 standalone SVG를 다운로드한다. SVG는 배경과 전경 path를 직접 작성하고 quiet zone을 viewBox에 포함한다.
3. scanner는 PNG/JPEG/WebP/GIF/BMP 이미지 선택·drag/drop과 live camera를 지원한다. 이미지 최대 15MB, 스캔 장변 최대 1800px 정책을 둔다.
4. `createImageBitmap`을 우선 사용하고 EXIF orientation을 반영하며, 미지원 환경에서는 object URL image decode로 후퇴한다. 임시 URL과 `ImageBitmap` 자원을 해제한다.
5. 카메라는 후면을 선호하고 160ms 간격으로 frame을 읽는다. code를 찾으면 track을 종료하며, 사용자 stop·clear·pagehide·권한 실패에서도 stream을 닫는다.
6. 스캔 결과가 HTTP(S) URL인지 배지만 표시하고 자동 탐색 링크를 만들지 않는다. QA가 URL QR을 생성→PNG→scanner로 왕복하고, 페이지가 이동하지 않았는지 확인한다.
7. revision으로 늦게 끝난 이미지 decode·카메라 시작·clipboard 결과를 무시한다. 권한 거부 후 시작 버튼이 다시 사용 가능한지도 모바일 QA에 있다.
8. core round-trip test는 다국어/emoji URL, Q 오류정정, quiet zone 4로 생성한 QR을 RGBA로 렌더한 뒤 jsQR로 다시 읽는다.
9. 기능 도입은 `bf59f1c`, 17개 locale과 route/QA 통합은 `f4f6efb`에서 추적된다. 현재 미커밋 표면은 generator/scanner 사이 공통 route switch를 추가했으며 아직 커밋 이력은 아니다.

## 경쟁 페이지 관찰

관찰일은 모두 2026-08-30이다.

| 경쟁 페이지 | 직접 관찰한 기능 | 현재 제품과의 관계 |
| --- | --- | --- |
| [QRCode Monkey](https://www.qrcode-monkey.com/?lang=en) | static QR, 로고와 디자인 옵션, 오류정정 최대 30% 안내, PNG/SVG/PDF/EPS 다운로드, 고해상도·인쇄 용도 | 디자인·콘텐츠 preset·출력 형식은 경쟁 페이지가 크게 강하다. 현재 제품은 일반 텍스트, EC/quiet zone, PNG/SVG에 집중한다. |
| [W3Schools QR Scanner / Decoder](https://www.w3schools.com/tools/tool_qr_decoder.php) | PNG/JPEG/WebP/GIF/BMP upload/drop, live camera, copy, jsQR 기반 브라우저 처리, 감지 후 카메라 자동 종료, 결과를 먼저 보여 주는 안전 안내 | 핵심 upload/camera/copy/local decode는 대체로 동등하다. 현재 제품도 URL을 자동 열지 않고 결과 텍스트를 먼저 보여 주며, generator와 실제 PNG round-trip QA를 갖는다. |

### 상대 평가

- 더 강한 부분: generator와 scanner를 한 제품 내 왕복 QA로 묶은 추적성, 권한 거부·stale async·camera track 종료 규칙, URL 자동 탐색 금지.
- 대체로 동등한 부분: static QR 생성, PNG/SVG, L/M/Q/H, 이미지 upload/drop, live camera, copy, 브라우저 내 jsQR decode.
- 약한 부분: URL/Wi-Fi/vCard/email/SMS 등 structured generator, 로고·색상·모양·크기, PDF/EPS, paste/clipboard 이미지, PDF/다중 QR, 1D barcode·DataMatrix·Aztec·PDF417, scan history와 structured result action.

## 결함 및 업그레이드 후보

| 우선순위 | 제안 | 사용자 영향 | 확신 | 노력 |
| --- | --- | --- | --- | --- |
| P0 | 즉시 차단할 자동 탐색·업로드 결함은 발견하지 못했다. 현재 URL 결과는 badge와 text로만 보여 준다. | - | 높음 | - |
| P1 | generator의 각 EC/quiet-zone 조합으로 PNG와 SVG를 만든 뒤 scanner가 재인식하는 fixture matrix를 추가한다. quiet zone 0에는 인쇄/스캔 실패 가능 경고를 붙인다. | 높음: 다운로드 가능과 실제 스캔 가능의 차이를 잡는다. | 높음 | 중간 |
| P1 | scanner에 paste image를 추가하고, 여러 QR이 있는 이미지에서는 “첫 code만 읽음”을 명시하거나 multi-result decoder를 도입한다. | 높음: 스크린샷 과업과 결과 누락을 줄인다. | 높음 | 중간~높음 |
| P1 | URL/Wi-Fi/vCard/email/plain text를 별도 입력 form으로 제공하되 최종 payload preview를 항상 보여 준다. | 높음: generator 실사용 범위를 넓힌다. | 높음 | 중간 |
| P2 | 출력 크기 선택과 프린트-safe preset을 추가한다. 색상/로고는 contrast와 실제 재스캔 검사를 통과한 경우에만 제공한다. | 중간 | 높음 | 중간~높음 |
| P2 | scanner 결과를 URL/Wi-Fi/vCard 등으로 파싱하되 자동 실행·자동 연결·자동 저장은 하지 않고 원문을 최우선으로 보여 준다. | 중간 | 높음 | 중간 |
| P2 | BarcodeDetector가 있으면 보조 경로로 쓰고 jsQR fallback과 결과 일치 fixture를 두는 방안을 검토한다. | 중간 | 중간 | 높음 |
| P3 | PDF/EPS, PDF 내 다중 QR, 1D/다른 2D barcode는 별도 route와 별도 core로 확장한다. | 낮음~중간 | 중간 | 높음 |
| P3 | dynamic QR/추적/계정 기반 수정은 현재 정적·무계정 제품 경계 밖이므로 도입하지 않는다. | 낮음 | 높음 | 매우 높음 |

## 안전한 claim 후보

- “일반 텍스트 QR 코드를 만들고 PNG 또는 SVG로 다운로드할 수 있습니다.”
- “L/M/Q/H 오류정정 수준과 quiet zone을 선택할 수 있습니다.”
- “이미지 업로드 또는 카메라로 QR을 읽고 결과를 텍스트로 먼저 보여 줍니다.”
- “현재 scanner는 감지한 URL을 자동으로 열지 않습니다.”
- “현재 구현은 선택한 이미지와 카메라 frame을 브라우저 canvas에서 처리합니다.”

## 금지하거나 조건부로만 쓸 claim

- “모든 QR/바코드를 읽는다”: core는 jsQR 기반 QR 하나를 읽으며 다른 symbology를 지원하지 않는다.
- “QR 링크가 안전하다”: URL 형식만 감지하며 평판·피싱·redirect 검사를 하지 않는다.
- “어떤 이미지에서도 정확히 읽는다”: 해상도·왜곡·손상·대비·quiet zone에 따라 실패한다.
- “로고가 있어도 항상 스캔된다”: 현재 로고 생성 기능이 없고, 추가하더라도 실측 없이 보장할 수 없다.
- “무제한/영구/추적 가능 QR”: static payload만 생성하며 tracking service가 아니다.
- “카메라 권한 없이 live scan”: 사용자가 명시적으로 권한을 허용해야 한다.
- “경쟁 도구보다 더 private”: 로컬 구현 사실과 시장 우월 주장은 다르다.

## 검증과 한계

- 현재 root 소스·미커밋 diff와 `bf59f1c`, `f4f6efb` 이력을 확인했다.
- `packages/qr-core/src/index.test.ts`의 3개 테스트가 2026-08-30에 통과했다. 다국어 generator→scanner round trip, standalone SVG/quiet zone, 잘못된 입력을 포함한다.
- 기존 브라우저 QA가 실제 canvas PNG round-trip, URL 비자동탐색, camera 미지원/권한 거부 회복, Arabic 모바일 overflow를 검사하는 것을 확인했다.
- 실물 카메라, 저조도, 흐림/회전/손상/인쇄, 여러 code 이미지, 모든 EC/quiet zone 조합은 이번 감사에서 실측하지 않았다.
- 경쟁 페이지는 공개 HTML에서 관찰한 기능만 기록했다. QRCode Monkey의 생성물 품질이나 W3Schools의 네트워크 동작을 독립 측정하지 않았다.
- 인앱 브라우저 연결 제약으로 현재 미커밋 공통 switch를 별도 수동 실행하지 못했다.
