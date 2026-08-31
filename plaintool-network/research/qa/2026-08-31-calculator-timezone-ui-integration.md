# Calculator, password, and time-zone UI integration contract

Date: 2026-08-31

## Visual thesis

Use a compact operational density, the existing system type stack, a flat base-and-recessed surface hierarchy, and reserve brand or semantic colours for actions, focus, and genuine status rather than marking ordinary manual input and output as red or green.

## Shared axis and information inventory

- The page layout owns the outer content axis; each affected `.converter` fills that axis without adding another outer gutter.
- Desktop workspace sections use 16 px internal padding and mobile sections use 12 px. Operand groups, result rows, and the bounded world-clock list are intentional inner structures, not new outer axes.
- Password: result label, copy action, result value, adjacent regenerate action, strength, options, and one status row.
- Fraction calculator: mode navigation, one readable equation, one hint, calculate/clear actions, result, working, and one status row.
- Time-zone converter: source date/time and selectable source zone, format choice, convert/now actions, world-time comparison list, and one status row.
- Privacy and local-processing explanations remain in the page support content; the workspaces do not repeat them.

## Control geometry

- Standard desktop fields remain 36 px where already established; primary touch controls and every visible mobile control are at least 44 px.
- The password regenerate control matches the 68 px desktop result height and the 64 px mobile result height.
- Fraction numerator and denominator controls share one height and width family. The fraction bar and operator sit on the equation axis rather than relying on distant legends.
- Time-zone selection must be a real selectable control with a stable 44 px mobile target. The world-time list may scroll internally but must not create horizontal overflow.
- Existing zero-radius PlainTool tokens remain authoritative; circles are limited to semantic indicators.

## Browser evidence targets

- At 1440 x 1000 and 390 x 844, record `.tool-page`, affected `.converter`, workspace, primary action, and result/list bounding boxes.
- Equivalent visible controls must have centre-Y delta no greater than 1 px; mobile controls must be at least 44 px high.
- Confirm `scrollWidth === clientWidth` for the page and affected converter, including Arabic RTL at 390 px.
- Confirm the password value changes after regenerate, the fraction operation produces the expected exact result, the source-zone selection changes the rendered source row, and manual calculator surfaces resolve to neutral backgrounds.
- Record console errors and cross-origin requests. Tool input and result values must not leave the browser.
