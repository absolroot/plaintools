# PlainTool Mono web subsets

These WOFF2 files are self-hosted subsets of Noto Sans Mono CJK Regular from
the official `notofonts/noto-cjk` repository at commit
`f8d157532fbfaeda587e826d4cd5b21a49186f7c`.

- Latin, punctuation, and symbols use `NotoSansMonoCJKkr-Regular.otf`.
- Hangul and Korean Jamo use `NotoSansMonoCJKkr-Regular.otf`.
- CJK symbols and Han ideographs use `NotoSansMonoCJKsc-Regular.otf`.
- The common Chinese subset contains the 3,755 GB2312 level-one ideographs;
  less-common Han characters fall through to range-specific subsets.
- The subsets were generated with fontTools 4.60.0 and Brotli 1.2.0.
- The font software remains under the SIL Open Font License 1.1 in `OFL.txt`.

The files are separated by `unicode-range` and font-family fallback so typical
loads stay proportional to the text rendered in a code field:

- Latin and Spanish text: 47 KB.
- Korean text: the Latin subset plus the 1.05 MB Hangul subset.
- Common Simplified Chinese text: the Latin subset plus the 1.28 MB common Han
  subset.
- Less-common Han and CJK Extension A characters: only their matching fallback
  range is fetched on demand.
