export type CaseMode = "upper" | "lower" | "sentence" | "capitalize-words";

const sentenceTerminatorPattern = /[.!?。！？]/u;
const lineBreakPattern = /[\r\n]/u;
const wordCharacterPattern = /[\p{L}\p{M}\p{N}]/u;
const apostrophePattern = /['’]/u;

function isCasedCharacter(character: string): boolean {
  return character.toUpperCase() !== character.toLowerCase();
}

function convertSentenceCase(input: string): string {
  const characters = Array.from(input.toLowerCase());
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

    if (needsCapital && isCasedCharacter(character)) {
      characters[index] = character.toUpperCase();
      needsCapital = false;
    }
  }

  return characters.join("");
}

function convertCapitalizeWords(input: string): string {
  const characters = Array.from(input.toLowerCase());
  let insideWord = false;
  let capitalizedWord = false;

  for (let index = 0; index < characters.length; index += 1) {
    const character = characters[index];

    if (wordCharacterPattern.test(character)) {
      if (!insideWord) {
        insideWord = true;
        capitalizedWord = false;
      }

      if (!capitalizedWord && isCasedCharacter(character)) {
        characters[index] = character.toUpperCase();
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

export function convertCase(input: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return input.toUpperCase();
    case "lower":
      return input.toLowerCase();
    case "sentence":
      return convertSentenceCase(input);
    case "capitalize-words":
      return convertCapitalizeWords(input);
  }
}
