# Locale display tracking review

Date: 2026-08-30 KST
Surface: PlainTool's zero-request cross-platform system font stack

## Product and interaction contract

Visual thesis: PlainTool remains a compact operational utility. Tracking may refine short display headings, but it must not leak into working text, controls, code, results, navigation, or translated body copy.

- Use proportional `em`, not root-relative `rem`, when a tracking value is tied to the text role. At a 16 px root, `-0.025rem` is always `-0.4px`; `-0.025em` scales from `-0.3px` at 12 px to `-0.75px` at 30 px.
- Keep Korean at the font's natural spacing. PlainTool cannot assume one Korean font because the stack resolves differently across Windows, macOS, and other platforms.
- Tighten only Latin directory and legal display headings (30 px desktop, 26 px directory mobile) by `-0.01em`.
- Keep 20 px tool titles, 15–18 px section/card headings, body text, navigation, labels, inputs, results, badges, and monospaced text at `normal`.
- Express the choice as one locale-overridable display token. Do not load another font or add a font request.

## Official and font-specific evidence

- [Apple iPhone, English](https://www.apple.com/iphone/) uses loaded SF Pro faces and role-specific negative tracking: 12 px navigation `-0.01em`, 14 px copy `-0.016em`, 17 px body `-0.022em`, 56 px display `-0.005em`, and 80 px H1 `-0.015em`.
- [Apple iPhone, Korean](https://www.apple.com/kr/iphone/) uses an SF Pro KR-first stack and explicitly overrides the corresponding Korean body, navigation, copy, and display roles to `0em`. This is direct evidence against copying the English values into Korean.
- [Wanted Montage typography](https://montage.wanted.co.kr/docs/foundations/base-material/typography) pairs Pretendard JP with size-specific values from `-0.0319em` at 56 px through positive tracking at small text. It supports optical role tokens, not one Korean constant.
- [KRDS typography](https://www.krds.go.kr/html/site/style/style_03.html) pairs Pretendard GOV with `0px` body and most heading tracking, while noting that nominally equal sizes differ by font and require visual balancing.
- [Inter](https://rsms.me/inter/) uses optical-size-aware variable-font metrics. Its live site leaves body and navigation natural, uses about `-0.01em` on a 33 px H2, and reserves stronger tightening for very large display text.
- [Material 2 typography](https://m2.material.io/inline-tools/typography/) assigns Roboto values by role, including positive tracking for many 12–20 px UI/body roles and small negative values only on its largest headings.
- Live cross-checks on [Toss](https://toss.im/en-us), [NAVER](https://www.navercorp.com/main), [Kakao](https://www.kakaocorp.com/page/), and the [Google Store](https://store.google.com/us/?hl=en-US) also used font- and role-specific values rather than a universal page-wide value.

## Decision

```css
:root {
  --tracking-display: -0.01em;
}

html[lang="ko"] {
  --tracking-display: normal;
}
```

Apply the token only to `.directory-header h1` and `.legal-page h1`. English and Spanish share the Latin setting; Korean explicitly retains natural spacing. This is the conservative overlap of the live references and avoids pretending that SF Pro, Pretendard, Inter, Roboto, Segoe UI, Apple SD Gothic Neo, and Malgun Gothic share one optical correction.

## Approval criteria

- Computed display tracking matches the locale token on desktop and mobile.
- Every other page H1 remains `normal`.
- Body, form values, working text, and monospaced output remain `normal`.
- No horizontal overflow, wrapping regression, external font request, console error, or page error appears in the full locale/route matrix.
