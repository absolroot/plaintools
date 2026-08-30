export type CaseMode = "upper" | "lower" | "sentence" | "capitalize-words";

const sentenceTerminatorPattern = /[.!?。！？]/u;
const lineBreakPattern = /[\r\n]/u;
const wordCharacterPattern = /[\p{L}\p{M}\p{N}]/u;
const apostrophePattern = /['’]/u;

function upperCase(value: string, locale?: string): string {
  return locale ? value.toLocaleUpperCase(locale) : value.toUpperCase();
}

function lowerCase(value: string, locale?: string): string {
  return locale ? value.toLocaleLowerCase(locale) : value.toLowerCase();
}

function isCasedCharacter(character: string, locale?: string): boolean {
  return upperCase(character, locale) !== lowerCase(character, locale);
}

function convertSentenceCase(input: string, locale?: string): string {
  const characters = Array.from(lowerCase(input, locale));
  let needsCapital = true;

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index];

    if (sentenceTerminatorPattern.test(character)) {
      needsCapital = true;
      continue;
    }

    if (lineBreakPattern.test(character)) {
      needsCapital = true;
      continue;
    }

    if (needsCapital && isCasedCharacter(character, locale)) {
      characters[index] = upperCase(character, locale);
      needsCapital = false;
    }
  }

  return characters.join("");
}

function convertCapitalizeWords(input: string, locale?: string): string {
  const characters = Array.from(lowerCase(input, locale));
  let insideWord = false;
  let capitalizedWord = false;

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index];

    if (wordCharacterPattern.test(character)) {
      if (!insideWord) {
        insideWord = true;
        capitalizedWord = false;
      }

      if (!capitalizedWord && isCasedCharacter(character, locale)) {
        characters[index] = upperCase(character, locale);
        capitalizedWord = true;
      }
      continue;
    }

    const isInternalApostrophe =
      insideWord &&
      apostrophePattern.test(character) &&
      index + 1 < characters.length &&
      wordCharacterPattern.test(characters[index + 1]);

    if (!isInternalApostrophe) {
      insideWord = false;
      capitalizedWord = false;
    }
  }

  return characters.join("");
}

export function convertCase(
  input: string,
  mode: CaseMode,
  locale?: string,
): string {
  switch (mode) {
    case "upper":
      return upperCase(input, locale);
    case "lower":
      return lowerCase(input, locale);
    case "sentence":
      return convertSentenceCase(input, locale);
    case "capitalize-words":
      return convertCapitalizeWords(input, locale);
  }
}
