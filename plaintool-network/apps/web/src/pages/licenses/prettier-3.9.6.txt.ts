import notices from "../../../../../packages/javascript-formatter-core/node_modules/prettier/THIRD-PARTY-NOTICES.md?raw";

export const prerender = true;

export function GET() {
  return new Response(notices, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
