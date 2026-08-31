# AI image upscaler delivery record

- Review date: `2026-08-31`
- Planned route: `/{locale}/image-upscaler/`
- Planned publication: `indexable`, only after the production, locale, model-integrity, and real-browser gates pass
- Baseline commit: `6cc1114be924694fef9b3a9d593b0488a3744206`
- Product boundary: static, browser-local processing; no upload, account, batch queue, face enhancement, or creative-detail generation

## Search intent and naming

The Korean page separates a broad task phrase from the product label:

- H1: `이미지 해상도 높이기`
- tool label: `AI 이미지 업스케일러`
- title: `AI 이미지 업스케일러 – 사진 해상도 2배·4배 높이기`

Google autocomplete collected in Korea on 2026-08-31 returned `이미지 해상도 높이기` first for `이미지 해상도`, while `이미지 업스케일링`, `이미지 업스케일링 ai`, and `이미지 업스케일러` appeared for `이미지 업스케일`. Naver DataLab relative trend data for 2025-08-30 through 2026-08-30 showed:

| Query group | Mean | Median | Maximum | Non-zero days |
| --- | ---: | ---: | ---: | ---: |
| 해상도 높이기 | 45.1649 | 48.1781 | 100.0000 | 366/366 |
| 이미지 업스케일링 | 38.0478 | 38.0567 | 68.8259 | 366/366 |
| 이미지 업스케일러 | 0.1095 | 0.0000 | 3.6437 | 18/366 |

The DataLab values are relative indices, not absolute search counts. The raw query groups and collection metadata are preserved under `research/seo/evidence/image-upscaler/`.

## Verified product benchmarks

All observations below came from actual browser interaction on 2026-08-31, including selecting a local 128×96 PNG and starting the operation.

| Product | Completed flow | Useful pattern | Gap or pattern to reject |
| --- | --- | --- | --- |
| [W3Schools Image Upscaler](https://www.w3schools.com/tools/tool_image_upscale.php) | 2× PNG downloaded successfully | Clear 2×/3×/4× controls, output-size preview, format choice | Interpolation only, no result preview, sharpening adds an avoidable default control |
| [Pocket Web Tools Image Upscaler](https://pocketweb.tools/image-upscaler) | 4× result completed and rendered | Before/after comparison, explicit model choice, browser-local message | Page said about 33 MB but the run fetched 50.3 MB; model/runtime came from Hugging Face/Xet/jsDelivr rather than the same origin |
| [iLoveIMG Upscale Image](https://www.iloveimg.com/upscale-image) | Server upload, processing, and download page completed | Predicted dimensions before action, restrained 2×/4× choice | Cloud upload and premium gating conflict with the local-processing promise |
| [Upscale.media](https://www.upscale.media/upload) | Upload reached the credit gate; no result was produced | 2×/4×/8× and a simple enhance toggle | Account/credit gate and upload consent interrupt the task |

The checked-in `references/emn178-online-tools` snapshot contains no image-upscaler implementation, so it supplies no reusable semantics for this feature.

## Product contract

### Primary flow

1. Select or drop one PNG, JPEG, or WebP up to 10 MB.
2. See the original preview and exact source dimensions before running.
3. Choose `Compact` or `Quality`, and `2×` or `4×`; defaults are `Compact` and `2×`.
4. Immediately before the first model download, show the exact transfer size and ask for confirmation.
5. Process locally with cancellable state and tile progress, then render a draggable before/after comparison. Compact inference runs in a terminable WASM worker; WebGPU Quality can be cancelled logically and stale output is discarded.
6. Download PNG or JPEG. Preserve alpha as PNG by default; default opaque images to JPEG quality 0.92. Flatten alpha onto white only when JPEG is explicitly selected.

### Limits

- Maximum upload: 10 MB.
- Maximum decoded output: 16,777,216 pixels and 4096 px on either edge.
- Compact/WASM and Quality/WebGPU maximum input: 262,144 pixels.
- Quality is disabled when WebGPU is unavailable; there is no silent backend downgrade.
- Native inference is 4×. The 2× result is deterministically reduced from the 4× tile output with Lanczos3; copy must not claim that 2× inference is faster.
- Initial tiles: Compact 64 px and Quality 256 px, with 16 px overlap. The smaller compatibility tiles keep WASM cancellation responsive; Quality uses WebGPU on the main browser context because Chromium's worker WebGPU session initialization stalled in repeatable tests.

## Model provenance and license decision

The release implementation uses Swin2SR's official real-world x4 model through a pinned Transformers.js ONNX conversion. The initial Real-ESRGAN candidate exports matched PyTorch within `2.21e-6` maximum absolute error in Python ONNX Runtime, but ONNX Runtime Web session creation did not complete in repeated browser runs, so those artifacts were rejected and are not shipped.

| Mode | Artifact | Bytes | SHA-256 | Runtime intent |
| --- | --- | ---: | --- | --- |
| Compact | `model_quantized.onnx` | 21,438,622 | `9e9bae06e1c280a1f2f5ab093312ee1ec39186afc8912259bb9e3de838f85fb8` | Q8, cancellable WASM worker |
| Quality | reconstructed `model.onnx` | 52,772,645 | `f496dc73dcc01d778b1a12eb4c4038d6b27cd1c0b5bcd4258455ed6d7816c835` | FP32, WebGPU |

- Official source and pretrained-model repository: [mv-lab/swin2sr](https://github.com/mv-lab/swin2sr)
- Pinned conversion repository: [Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr](https://huggingface.co/Xenova/swin2SR-realworld-sr-x4-64-bsrgan-psnr), revision `d0e9926970c93e472ce2392373d72597fc849027`
- License: [Apache 2.0](https://github.com/mv-lab/swin2sr/blob/main/LICENSE). The official repository explicitly covers its code and pretrained models.
- Runtime: `@huggingface/transformers@4.2.0`, with its ONNX Runtime Web assets bundled from the pinned lockfile rather than fetched from a third-party CDN.
- Delivery: model parts are same-origin, individually SHA-256 checked, cached only after verification, and disclosed with exact model bytes immediately before consent. The quality file is reconstructed from three sub-20 MB verified parts.

The deployed manifest records the full-model and per-part hashes. Browser tests
reconstructed and verified both variants before session creation; an unverified
response is never written to the cache.

## Visual and interaction thesis

The tool should feel like an image inspection bench rather than an AI dashboard. The upload/preview surface and controls share the established 1180 px page axis. Mode and scale are short segmented controls, not a grid of marketing cards. The result owns the visual hierarchy through one large comparison frame; technical details sit in a compact status row. Desktop controls target 36 px minimum height, mobile controls 44 px, and the primary action remains full-width on narrow screens.

Important state rules:

- Changing the file, mode, scale, or output format invalidates the prior downloadable result.
- A new image cancels decode, model fetch, inference, composition, and export from the prior revision.
- Download stays disabled until the visible result and selected format match the current controls.
- A failed or cancelled run keeps the source preview and allows retry.
- Model consent is specific to the selected model/version and precedes expensive transfer.

## Claims ledger

Safe after implementation and verification:

- The selected image is processed in the browser and is not uploaded by this tool.
- The tool can produce a 2× or 4× PNG/JPEG result within the published size limits.
- The first run downloads a model whose exact size is shown before consent.

Do not claim:

- lost detail is recovered exactly;
- every image becomes sharper or more natural;
- 2× is faster than 4×;
- the tool is universally better or more private than competitors;
- unlimited resolution, face restoration, or lossless JPEG output.

## Required release evidence

- checkpoint and built-part hash checks;
- PyTorch-to-ONNX differential fixtures;
- transparent PNG, opaque JPEG, tiny, odd-sized, noisy, text/line-art, and cancellation fixtures;
- measured cold/warm transfer, inference time, peak memory proxy, output seam checks, and retry behavior;
- 1440×1000 and 390×844 browser geometry, RTL, keyboard, console, and network checks;
- all 17 locale bundles and locale-review manifest;
- development and production static builds, sitemap/robots/canonical/structured data, privacy canaries;
- post-push verification of the exact live commit and same-origin model assets.

## Completed pre-integration verification

- Quality/WebGPU: 33×25 transparent PNG → 66×50 PNG in 9.2 seconds including
  interaction and export; sampled alpha remained 78–255.
- Quality/WebGPU tiled seam fixture: 321×129 → 642×258 in 5.1 seconds. The
  expected x=512 tile boundary had a mean adjacent-column RGB delta of 0.765,
  below the fixture-wide maximum of 0.946, so no boundary spike was detected.
- Quality warm 4×: 256×192 → 1024×768 in 663 ms.
- Compact/WASM: 256×192 → 512×384 in 58 seconds; 32×24 → 64×48 in 13.6
  seconds on a cold model/session path.
- Compact worker cancellation returned immediately at 3 seconds. Quality
  logical cancellation at 0.5 seconds discarded the later model result.
- Changing model, scale, format, or JPEG quality invalidated the result and
  disabled download.
- Chromium 1440×1000 and 390×844 checks found no comparison geometry drift or
  horizontal overflow. Arabic rendered RTL with stacked panes inside the
  viewport.
- A simulated browser without WebGPU disabled Quality, kept Compact selected,
  and exposed the compatibility explanation.
- Invalid MIME and 10,000,001-byte inputs were rejected before decode. No model
  request occurred before explicit consent.
