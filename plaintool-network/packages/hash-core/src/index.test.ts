import { describe, expect, it } from "vitest";
import { HashError, hashAllBytes, hashBytes, hashText, md5 } from "./index";

describe("hash core", () => {
  it("matches the standard empty MD5 vector at the primitive layer", () => {
    expect(md5(new Uint8Array())).toBe("d41d8cd98f00b204e9800998ecf8427e");
  });

  it("matches standard vectors for all supported algorithms", async () => {
    await expect(hashText("abc")).resolves.toEqual({
      MD5: "900150983cd24fb0d6963f7d28e17f72",
      "SHA-1": "a9993e364706816aba3e25717850c26c9cd0d89d",
      "SHA-256":
        "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
      "SHA-512":
        "ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a" +
        "2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f",
    });
  });

  it("hashes raw file bytes without text transcoding", async () => {
    await expect(
      hashBytes(new Uint8Array([0x00, 0xff, 0x10]), "MD5"),
    ).resolves.toBe("481e4551ec039aada760901cf52b1917");
  });

  it("is deterministic for multilingual UTF-8 text", async () => {
    const first = await hashText("한글 café");
    const second = await hashText("한글 café");
    expect(first).toEqual(second);
  });

  it("rejects empty public inputs", async () => {
    await expect(hashAllBytes(new Uint8Array())).rejects.toEqual(
      new HashError("empty-input"),
    );
  });
});
