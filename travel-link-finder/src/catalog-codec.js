const key = [71, 108, 102, 45, 84, 114, 97, 118, 101, 108, 45, 50, 48, 50, 54];

function bytesToBase64(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

export function obfuscateCatalog(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const mixed = bytes.map((byte, index) => byte ^ key[index % key.length]);
  return bytesToBase64(mixed);
}

export function restoreCatalog(value) {
  const mixed = base64ToBytes(value);
  const bytes = mixed.map((byte, index) => byte ^ key[index % key.length]);
  return JSON.parse(new TextDecoder().decode(bytes));
}

