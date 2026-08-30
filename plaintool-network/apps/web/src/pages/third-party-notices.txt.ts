import notices from "../../../../THIRD_PARTY_NOTICES.md?raw";

export const prerender = true;

export function GET() {
  return new Response(notices, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
