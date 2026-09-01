import { arRouteFacts } from "./ar";
import { csRouteFacts } from "./cs";
import { daRouteFacts } from "./da";
import { deRouteFacts } from "./de";
import { enRouteFacts } from "./en";
import { esRouteFacts } from "./es";
import { frRouteFacts } from "./fr";
import { itRouteFacts } from "./it";
import { jaRouteFacts } from "./ja";
import { koRouteFacts } from "./ko";
import { nlRouteFacts } from "./nl";
import { noRouteFacts } from "./no";
import { plRouteFacts } from "./pl";
import { ptBRRouteFacts } from "./pt-BR";
import { svRouteFacts } from "./sv";
import { trRouteFacts } from "./tr";
import type { ImageConversionRouteFacts } from "./types";
import { zhTWRouteFacts } from "./zh-TW";

export const imageConversionRouteFacts = {
  en: enRouteFacts,
  ko: koRouteFacts,
  es: esRouteFacts,
  de: deRouteFacts,
  ja: jaRouteFacts,
  fr: frRouteFacts,
  "pt-BR": ptBRRouteFacts,
  it: itRouteFacts,
  nl: nlRouteFacts,
  sv: svRouteFacts,
  cs: csRouteFacts,
  pl: plRouteFacts,
  da: daRouteFacts,
  no: noRouteFacts,
  ar: arRouteFacts,
  "zh-TW": zhTWRouteFacts,
  tr: trRouteFacts,
} satisfies Record<string, ImageConversionRouteFacts>;

export {
  routeFactKinds,
  type ImageConversionRouteFactKind,
  type ImageConversionRouteFacts,
} from "./types";
