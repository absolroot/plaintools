declare module "elheif" {
  export function ensureInitialized(): Promise<void>;
  export function jsDecodeImage(input: Uint8Array): {
    err: string;
    data: Array<{ width: number; height: number; data: Uint8Array }>;
  };
  export function jsEncodeImage(
    input: Uint8Array,
    width: number,
    height: number,
  ): { err: string; data: Uint8Array };
}
