import type { CodecMode } from "@plaintool/codec-core";
import type { Base64ModeCopy, Base64ModeDefinition } from "./contract";

export function createBase64ModeDefinitions(
  copy: Base64ModeCopy,
): Record<CodecMode, Base64ModeDefinition> {
  return {
    decode: {
      slug: "base64-decode",
      metaTitle: copy.decodeMetaTitle,
      heading: copy.heading,
      description: copy.subheading,
      guideTitle: copy.guideTitle,
      guideIntro: copy.guideIntro,
      guideSteps: copy.guideSteps,
      faqs: copy.faqs,
      inputLabel: copy.inputLabel,
      outputLabel: copy.outputLabel,
      inputPlaceholder: copy.decodePlaceholder,
      runLabel: copy.runDecode,
      completeLabel: copy.decodeComplete,
    },
    encode: {
      slug: "base64-encode",
      metaTitle: copy.encodeMetaTitle,
      heading: copy.encodeHeading,
      description: copy.encodeSubheading,
      guideTitle: copy.encodeGuideTitle,
      guideIntro: copy.encodeGuideIntro,
      guideSteps: copy.encodeGuideSteps,
      faqs: copy.encodeFaqs,
      inputLabel: copy.encodeInputLabel,
      outputLabel: copy.encodeOutputLabel,
      inputPlaceholder: copy.encodePlaceholder,
      runLabel: copy.runEncode,
      completeLabel: copy.encodeComplete,
    },
  };
}
