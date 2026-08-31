# Third-party notices

The deployed copy of these notices is available at
`/third-party-notices.txt` and is linked from every page with `rel="license"`.

## flag-icons

The language menu embeds selected country flag SVGs from
[flag-icons](https://github.com/lipis/flag-icons), version 7.5.0.

MIT License

Copyright (c) 2013 Panayiotis Lipiridis

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Prettier

The HTML, CSS, and JavaScript formatters bundle [Prettier](https://prettier.io/),
version 3.9.6. Copyright James Long and contributors. Prettier is distributed
under the MIT License terms reproduced above. Prettier's published standalone
and plugin artifacts include additional third-party software. The complete
vendor-supplied notice is deployed verbatim at
`/licenses/prettier-3.9.6.txt`.

## uuid

The UUID generator bundles [uuid](https://github.com/uuidjs/uuid), version
14.0.2. Copyright (c) 2010-2020 Robert Kieffer and other contributors. It is
distributed under the MIT License terms reproduced above.

## sql-formatter

The SQL formatter bundles [sql-formatter](https://github.com/sql-formatter-org/sql-formatter),
version 15.8.2. Copyright 2016-2020 ZeroTurnaround LLC, 2020-2021 George
Leslie-Waksman and other contributors, and 2021-present inferrinizzard and
other contributors. It is distributed under the MIT License terms reproduced
above.

### nearley

The SQL formatter includes [nearley](https://nearley.js.org/), version 2.20.1.
Copyright (c) 2014, 2015, 2016, 2017, 2018, 2019 Kartik Chandra, Tim Radvan.
It is distributed under the MIT License terms reproduced above.

## JsBarcode

The browser-local barcode generator bundles
[JsBarcode](https://github.com/lindell/JsBarcode), version 3.12.3. Copyright
Johan Lindell and contributors. It is distributed under the MIT License terms
reproduced above. Barcode values are passed only to the bundled browser code;
they are not sent to the JsBarcode project or an external rendering service.

## ONNX Runtime Web

The image background remover bundles
[ONNX Runtime Web](https://github.com/microsoft/onnxruntime), version 1.29.0.
Copyright (c) Microsoft Corporation. It is distributed under the MIT License
terms reproduced above.

## U²-Net model artifacts

The image background remover serves pinned copies of the U2NetP and Silueta
ONNX model artifacts from the
[rembg model release](https://github.com/danielgatis/rembg/releases/tag/v0.0.0).
Their exact upstream URLs, byte sizes, and checksums are published in
`/models/background-remover/v1/manifest.json`.

The U²-Net project source is Copyright (c) 2020 Xuebin Qin and is licensed
under Apache License 2.0. The complete license is deployed at
`/licenses/u2net-apache-2.0.txt`. The rembg source repository is MIT
licensed; that source-code license is not presented here as a separate license
grant for the model weights.

## MODNet model artifact

The image background remover serves a pinned quantized ONNX conversion of
[MODNet](https://github.com/ZHKKKe/MODNet) from the
[Xenova/modnet](https://huggingface.co/Xenova/modnet) model repository. Its
exact revision, byte size, and checksum are published in
`/models/background-remover/v1/manifest.json`.

The MODNet project states that its code, models, and demos are released under
Apache License 2.0. The complete license is deployed at
`/licenses/u2net-apache-2.0.txt`.

## BiRefNet Lite model artifact

The image background remover serves a pinned 512x512 FP16 ONNX conversion of
[BiRefNet Lite](https://huggingface.co/ZhengPeng7/BiRefNet_lite) from the
[studioludens/birefnet-lite-512](https://huggingface.co/studioludens/birefnet-lite-512)
model repository. Its exact revision, byte size, and checksums are published in
`/models/background-remover/v1/manifest.json`.

BiRefNet is Copyright (c) 2024 ZhengPeng and is distributed under the MIT
License terms reproduced above. The conversion repository identifies the
artifact as MIT-licensed and records BiRefNet Lite as its base model.

## Terser

The JavaScript minifier bundles [Terser](https://terser.org/), version 5.51.2.

Copyright 2012-2018 (c) Mihai Bazon <mihai.bazon@gmail.com>

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

### @jridgewell source-map packages

Terser also includes the following MIT-licensed source-map packages:

- `@jridgewell/source-map` 0.3.11
- `@jridgewell/gen-mapping` 0.3.13
- `@jridgewell/trace-mapping` 0.3.31
- `@jridgewell/resolve-uri` 3.1.2
- `@jridgewell/sourcemap-codec` 1.6.0

Copyright 2019 Justin Ridgewell <jridgewell@google.com>

Copyright 2024 Justin Ridgewell <justin@ridgewell.name>

These packages are distributed under the MIT License terms reproduced above.


## Image converter codecs

The browser-local image converters use the following open-source packages. No
image bytes are sent to these projects or to an external conversion service.

- [jSquash](https://github.com/jamsinclair/jSquash): AVIF 2.1.1, JPEG 1.6.0,
  PNG 3.1.1, WebP 1.5.0, OxiPNG 2.3.0, and the Discourse HEIC decoder 1.0.0.
  Copyright Jamie Sinclair, Discourse, and contributors. Licensed under the
  Apache License 2.0. These packages
  incorporate their documented upstream codecs, including libavif, MozJPEG,
  libpng/PNG Rust tooling, libwebp, and OxiPNG.
- [gifenc](https://github.com/mattdesl/gifenc), version 1.0.3. Copyright Matt
  DesLauriers and contributors. Licensed under the MIT License terms reproduced
  above. Its palette quantizer is derived from PnnQuant as documented by the
  project.
- [elheif](https://github.com/hpp2334/elheif), version 0.1.0. Copyright hpp2334.
  Licensed under the MIT License terms reproduced above. Its WebAssembly build
  incorporates [libheif](https://github.com/strukturag/libheif),
  [libde265](https://github.com/strukturag/libde265), and
  [Kvazaar](https://github.com/ultravideo/kvazaar). Their respective LGPL-3.0
  and BSD-3-Clause terms and corresponding source are available from those
  linked upstream repositories.

The Apache License 2.0 text is available at
<https://www.apache.org/licenses/LICENSE-2.0>. The package versions are pinned
by the deployed application's lockfile.
