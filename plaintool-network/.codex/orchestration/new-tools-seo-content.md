# New tools: SEO and content decisions

Date: 2026-08-30

## AI text cleaner positioning

Primary Korean query and page name: **AI 워터마크 제거기**.

- Recommended slug: `ai-watermark-remover`
- Korean title: `AI 워터마크 제거기 - GPT·Claude 숨은 문자 정리`
- Korean H1: `AI 워터마크·숨은 문자 제거기`
- Korean description: `ChatGPT, Claude와 웹 문서에서 복사한 텍스트의 제로폭 문자, 방향 제어 문자, 특수 공백을 브라우저에서 찾아 정리하고 제거 내역을 확인합니다.`
- English title: `AI Text Watermark Remover & Hidden Unicode Cleaner`
- English H1: `Remove hidden Unicode from AI-copied text.`

The visible title should not lead with `GPT 작성 확인기`, `클로드 작성 확인기`, `클로드 디텍터`, or `AI 디텍터`. Those names imply model authorship detection, which literal Unicode inspection cannot establish. Use those phrases naturally once in the comparison FAQ and catalog search aliases so the page can answer that intent without making a false claim.

Recommended Korean comparison FAQ:

> GPT 작성 확인기나 클로드 디텍터와 같은 기능인가요?
>
> 아닙니다. 이 도구는 글의 작성자가 GPT인지 Claude인지 판별하지 않습니다. 텍스트에 실제로 들어 있는 숨은 유니코드 문자와 특수 공백만 찾아 정리하며, 발견된 문자와 개수를 그대로 보여 줍니다.

Result hierarchy:

1. Cleaned text and copy action.
2. Summary: removed count and before/after character counts.
3. Exact removal report grouped by character class, with character name, code point, count, and whether it was removed or preserved.
4. Advanced controls for characters with legitimate language or emoji meaning.

Safe defaults must preserve ZWJ, ZWNJ, variation selectors, and combining marks. They can be meaningful in Arabic-derived scripts, Indic scripts, emoji, CJK variation sequences, and normalized text. If advanced removal is offered, the warning must say it can change spelling or appearance.

## Tool names and route intent

| Slug | Korean page name | English page name | Primary intent |
| --- | --- | --- | --- |
| `url-encode` | URL 인코더 | URL Encoder | UTF-8 percent-encode text, URI components, or form values |
| `url-decode` | URL 디코더 | URL Decoder | Decode percent escapes and optional `+` form spaces |
| `hash-generator` | 해시 생성기 | Hash Generator | MD5, SHA-1, SHA-256, and SHA-512 for text/files |
| `jwt-decoder` | JWT 디코더 | JWT Decoder | Read header and payload without signature verification |
| `qr-code-generator` | QR 코드 생성기 | QR Code Generator | Generate standard static QR codes locally |
| `qr-code-scanner` | QR 코드 스캐너 | QR Code Scanner | Scan an image or camera stream without auto-opening links |
| `csv-to-markdown` | CSV to Markdown 변환기 | CSV to Markdown Converter | Convert CSV rows to a Markdown table |
| `markdown-to-csv` | Markdown to CSV 변환기 | Markdown to CSV Converter | Convert a Markdown table to quoted CSV |
| `json-to-csv` | JSON to CSV 변환기 | JSON to CSV Converter | Convert an array of objects to CSV |
| `csv-to-json` | CSV to JSON 변환기 | CSV to JSON Converter | Convert header-based CSV to JSON objects |
| `html-to-markdown` | HTML to Markdown 변환기 | HTML to Markdown Converter | Convert semantic HTML to readable Markdown |
| `markdown-to-html` | Markdown to HTML 변환기 | Markdown to HTML Converter | Generate HTML source without executing it |

## FAQ coverage

Each page should have two or three questions that answer real edge cases rather than repeat the introduction.

- URL: difference between full URL and component encoding; `%20` versus `+`; nested decoding and malformed `%` sequences.
- Hash: hashes are not encryption; MD5/SHA-1 are legacy; same bytes produce the same result; local file processing.
- JWT: decoding is not verification; timestamps; secrets and sensitive claims; malformed Base64URL.
- QR: static codes do not expire; error correction versus density; camera permission; image screenshots; decoded links are never opened automatically.
- CSV/Markdown/JSON: quoted delimiters and embedded newlines; first row/header behavior; nested JSON value serialization; uneven rows and empty values.
- HTML/Markdown: supported structures; raw HTML and unsafe markup; generated HTML is displayed as source, not inserted into the page.

## References used

- Google Search title guidance: https://developers.google.com/search/docs/appearance/title-link
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Unicode variation selector FAQ: https://www.unicode.org/faq/vs.html
- Unicode Chapter 23, special and invisible characters: https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-23/
- Mark AI Korean positioning reference: https://mark.ai.kr/
- Onul hidden-Unicode cleaner reference: https://onul.works/tools/space-remover?hl=ko
- URL encoder/decoder interaction references: https://www.urlencoder.org/ and https://www.urldecoder.org/
- Hash inventory reference: https://emn178.github.io/online-tools/

Google recommends concise, descriptive, page-specific titles and warns against keyword stuffing. Therefore each page gets one primary task phrase in the title/H1; secondary phrases belong only where they clarify a real distinction.
