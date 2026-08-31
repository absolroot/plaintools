import type { TimeZoneConverterCopy } from "../../../features/time-zone-converter/contract";
import type { Locale } from "../../site";

type TimeZoneConverterPageSeed = {
  title: string;
  description: string;
  mobileDescription: string;
  guide: string;
  terms: readonly string[];
  faqs: Array<{ q: string; a: string }>;
};

export type TimeZoneConverterLocaleSeed = {
  page: TimeZoneConverterPageSeed;
  feature: TimeZoneConverterCopy;
};

const locales = {
  en: {
    page: {
      title: "Time Zone Converter & World Clock",
      description:
        "Convert a date and time across cities, or use the live world clock to compare local times, UTC offsets, and date changes at a glance.",
      mobileDescription:
        "Convert time zones and compare a live world clock across cities.",
      guide:
        "Choose the source date, time, and IANA time zone. Add the cities or zones you want to compare, then switch between 12-hour and 24-hour time. The selected date determines each location's daylight-saving offset.",
      terms: [
        "time zone converter",
        "timezone converter",
        "world clock",
        "world time converter",
        "city time",
        "international meeting time",
        "UTC offset",
      ],
      faqs: [
        {
          q: "What is the difference between a time zone converter and a world clock?",
          a: "A converter shows one chosen moment in other time zones. A world clock shows the current local time in several places. This page supports both views.",
        },
        {
          q: "Does the conversion account for daylight saving time?",
          a: "Yes. The browser applies the time-zone rules for the exact date you select, so seasonal offsets can change between locations.",
        },
        {
          q: "Are my cities or times saved or shared?",
          a: "No. The comparison runs in this browser tab and is not placed in the URL, uploaded, or saved after you leave.",
        },
      ],
    },
    feature: {
      ariaLabel: "Time zone converter and world clock",
      sourceTime: "Source date and time",
      sourceTimeHint:
        "Use Now for a live world clock, or choose a time to plan ahead.",
      sourceZone: "Source time zone",
      sourceZonePlaceholder: "City or IANA zone, such as Asia/Seoul",
      now: "Now",
      convert: "Convert",
      hourFormat: "Time format",
      hour12: "12-hour",
      hour24: "24-hour",
      worldClock: "World clock",
      addZone: "Add a city or time zone",
      zonePlaceholder: "Add city or time zone",
      add: "Add",
      removeZone: "Remove time zone",
      sourceBadge: "Source",
      ahead: "{difference} ahead",
      behind: "{difference} behind",
      sameOffset: "Same time",
      live: "Live world clock",
      converted: "Time zones converted",
      maxZones: "You can compare up to eight time zones at once.",
      duplicateZone: "That time zone is already in the world clock.",
      invalidZone: "Choose a valid city or IANA time zone.",
      invalidTime: "Choose a valid date and time.",
      nonexistentTime:
        "That local time is skipped by a daylight-saving change. Choose another time.",
      repeatedTime:
        "That local time occurs twice during a daylight-saving change. Choose a time before or after it.",
      emptyZones:
        "Add another city or time zone to compare it with the source.",
    },
  },
  ko: {
    page: {
      title: "시간대 변환기 및 세계 시계",
      description:
        "도시별 날짜와 시간을 변환하거나 실시간 세계 시계에서 현지 시각, UTC 오프셋, 날짜 변경을 한눈에 비교하세요.",
      mobileDescription:
        "시간대를 변환하고 여러 도시의 세계 시계를 비교하세요.",
      guide:
        "기준 날짜·시각과 IANA 시간대를 선택한 뒤 비교할 도시나 시간대를 추가하세요. 12시간제와 24시간제를 바꿀 수 있으며, 선택한 날짜에 맞는 서머타임 규칙이 자동으로 적용됩니다.",
      terms: [
        "시간대 변환기",
        "타임존 변환",
        "세계 시계",
        "세계 시간",
        "도시별 현재 시간",
        "해외 회의 시간",
        "UTC 시차",
      ],
      faqs: [
        {
          q: "시간대 변환기와 세계 시계는 어떻게 다른가요?",
          a: "시간대 변환기는 선택한 한 시각을 다른 지역 시각으로 바꾸고, 세계 시계는 여러 도시의 현재 시각을 보여 줍니다. 이 페이지에서는 두 기능을 함께 사용할 수 있습니다.",
        },
        {
          q: "서머타임도 반영되나요?",
          a: "네. 브라우저가 선택한 날짜의 시간대 규칙을 적용하므로 지역별 계절 시차가 자동으로 반영됩니다.",
        },
        {
          q: "도시와 시간이 저장되거나 공유되나요?",
          a: "아니요. 비교는 현재 브라우저 탭에서만 처리되며 URL, 서버 또는 저장소로 전송되지 않습니다.",
        },
      ],
    },
    feature: {
      ariaLabel: "시간대 변환기 및 세계 시계",
      sourceTime: "기준 날짜 및 시각",
      sourceTimeHint:
        "지금 버튼으로 실시간 세계 시계를 보거나 원하는 시각을 선택해 일정을 계획하세요.",
      sourceZone: "기준 시간대",
      sourceZonePlaceholder: "도시 또는 IANA 시간대 (예: Asia/Seoul)",
      now: "지금",
      convert: "변환",
      hourFormat: "시간 표시",
      hour12: "12시간",
      hour24: "24시간",
      worldClock: "세계 시계",
      addZone: "도시 또는 시간대 추가",
      zonePlaceholder: "도시 또는 시간대 추가",
      add: "추가",
      removeZone: "시간대 삭제",
      sourceBadge: "기준",
      ahead: "{difference} 빠름",
      behind: "{difference} 느림",
      sameOffset: "같은 시각",
      live: "실시간 세계 시계",
      converted: "시간대 변환 완료",
      maxZones: "한 번에 최대 8개 시간대를 비교할 수 있습니다.",
      duplicateZone: "이미 세계 시계에 있는 시간대입니다.",
      invalidZone: "올바른 도시 또는 IANA 시간대를 선택하세요.",
      invalidTime: "올바른 날짜와 시각을 선택하세요.",
      nonexistentTime:
        "서머타임 전환으로 존재하지 않는 현지 시각입니다. 다른 시각을 선택하세요.",
      repeatedTime:
        "서머타임 전환으로 두 번 발생하는 현지 시각입니다. 전후 시각을 선택하세요.",
      emptyZones: "다른 도시나 시간대를 추가해 기준 시각과 비교하세요.",
    },
  },
  es: {
    page: {
      title: "Conversor de zonas horarias y reloj mundial",
      description:
        "Convierte una fecha y hora entre ciudades o compara horas locales, desfases UTC y cambios de día en un reloj mundial en vivo.",
      mobileDescription:
        "Convierte zonas horarias y compara un reloj mundial por ciudades.",
      guide:
        "Elige la fecha, la hora y la zona IANA de origen. Añade las ciudades que quieras comparar y alterna entre el formato de 12 y 24 horas. Se aplican las reglas de horario de verano de la fecha elegida.",
      terms: [
        "conversor de zonas horarias",
        "reloj mundial",
        "hora mundial",
        "hora en ciudades",
        "diferencia horaria",
        "hora UTC",
      ],
      faqs: [
        {
          q: "¿En qué se diferencian el conversor y el reloj mundial?",
          a: "El conversor muestra un momento elegido en otras zonas; el reloj mundial muestra la hora actual en varios lugares. Esta página ofrece ambas vistas.",
        },
        {
          q: "¿Tiene en cuenta el horario de verano?",
          a: "Sí. El navegador aplica las reglas de cada zona para la fecha seleccionada.",
        },
        {
          q: "¿Se guardan o comparten mis datos?",
          a: "No. Todo se calcula en esta pestaña y no se añade a la URL ni se sube o guarda.",
        },
      ],
    },
    feature: {
      ariaLabel: "Conversor de zonas horarias y reloj mundial",
      sourceTime: "Fecha y hora de origen",
      sourceTimeHint:
        "Usa Ahora para el reloj en vivo o elige una hora para planificar.",
      sourceZone: "Zona horaria de origen",
      sourceZonePlaceholder: "Ciudad o zona IANA, como Europe/Madrid",
      now: "Ahora",
      convert: "Convertir",
      hourFormat: "Formato horario",
      hour12: "12 horas",
      hour24: "24 horas",
      worldClock: "Reloj mundial",
      addZone: "Añadir ciudad o zona",
      zonePlaceholder: "Añadir ciudad o zona",
      add: "Añadir",
      removeZone: "Quitar zona horaria",
      sourceBadge: "Origen",
      ahead: "{difference} por delante",
      behind: "{difference} por detrás",
      sameOffset: "Misma hora",
      live: "Reloj mundial en vivo",
      converted: "Zonas horarias convertidas",
      maxZones: "Puedes comparar hasta ocho zonas a la vez.",
      duplicateZone: "Esa zona ya está en el reloj mundial.",
      invalidZone: "Elige una ciudad o zona IANA válida.",
      invalidTime: "Elige una fecha y hora válidas.",
      nonexistentTime:
        "Esa hora local no existe por un cambio de horario de verano. Elige otra.",
      repeatedTime:
        "Esa hora local se repite por un cambio de horario de verano. Elige una hora anterior o posterior.",
      emptyZones: "Añade otra ciudad o zona para compararla con el origen.",
    },
  },
  de: {
    page: {
      title: "Zeitzonenrechner & Weltzeituhr",
      description:
        "Rechnen Sie Datum und Uhrzeit zwischen Städten um oder vergleichen Sie Ortszeiten, UTC-Abstände und Datumswechsel in einer Live-Weltzeituhr.",
      mobileDescription:
        "Zeitzonen umrechnen und Städte in einer Weltzeituhr vergleichen.",
      guide:
        "Wählen Sie Datum, Uhrzeit und IANA-Ausgangszone. Fügen Sie Vergleichsorte hinzu und wechseln Sie zwischen 12- und 24-Stunden-Anzeige. Für das gewählte Datum gelten automatisch die jeweiligen Sommerzeitregeln.",
      terms: [
        "Zeitzonenrechner",
        "Weltzeituhr",
        "Weltzeit",
        "Uhrzeit Städte",
        "Zeitunterschied",
        "UTC Offset",
      ],
      faqs: [
        {
          q: "Was unterscheidet Zeitzonenrechner und Weltzeituhr?",
          a: "Der Rechner zeigt einen gewählten Zeitpunkt in anderen Zonen; die Weltzeituhr zeigt die aktuelle Ortszeit mehrerer Orte. Diese Seite bietet beides.",
        },
        {
          q: "Wird die Sommerzeit berücksichtigt?",
          a: "Ja. Der Browser nutzt die Zeitzonenregeln des ausgewählten Datums.",
        },
        {
          q: "Werden Orte oder Zeiten gespeichert?",
          a: "Nein. Die Berechnung bleibt in diesem Tab und wird weder in die URL geschrieben noch hochgeladen oder gespeichert.",
        },
      ],
    },
    feature: {
      ariaLabel: "Zeitzonenrechner und Weltzeituhr",
      sourceTime: "Ausgangsdatum und -zeit",
      sourceTimeHint:
        "Mit Jetzt läuft die Weltzeituhr live; wählen Sie eine Zeit für die Planung.",
      sourceZone: "Ausgangszeitzone",
      sourceZonePlaceholder: "Stadt oder IANA-Zone, z. B. Europe/Berlin",
      now: "Jetzt",
      convert: "Umrechnen",
      hourFormat: "Zeitformat",
      hour12: "12 Stunden",
      hour24: "24 Stunden",
      worldClock: "Weltzeituhr",
      addZone: "Stadt oder Zeitzone hinzufügen",
      zonePlaceholder: "Stadt oder Zeitzone hinzufügen",
      add: "Hinzufügen",
      removeZone: "Zeitzone entfernen",
      sourceBadge: "Ausgang",
      ahead: "{difference} voraus",
      behind: "{difference} zurück",
      sameOffset: "Gleiche Zeit",
      live: "Live-Weltzeituhr",
      converted: "Zeitzonen umgerechnet",
      maxZones: "Sie können bis zu acht Zeitzonen gleichzeitig vergleichen.",
      duplicateZone: "Diese Zeitzone ist bereits in der Weltzeituhr.",
      invalidZone: "Wählen Sie eine gültige Stadt oder IANA-Zeitzone.",
      invalidTime: "Wählen Sie ein gültiges Datum und eine gültige Uhrzeit.",
      nonexistentTime:
        "Diese Ortszeit entfällt bei einer Zeitumstellung. Wählen Sie eine andere Zeit.",
      repeatedTime:
        "Diese Ortszeit tritt bei einer Zeitumstellung zweimal auf. Wählen Sie eine Zeit davor oder danach.",
      emptyZones:
        "Fügen Sie einen weiteren Ort oder eine Zeitzone zum Vergleich hinzu.",
    },
  },
  ja: {
    page: {
      title: "タイムゾーン変換・世界時計",
      description:
        "都市間で日時を変換し、ライブ世界時計で現地時刻、UTCオフセット、日付のずれを一覧比較できます。",
      mobileDescription:
        "タイムゾーンを変換し、都市ごとの世界時計を比較します。",
      guide:
        "基準の日時とIANAタイムゾーンを選び、比較したい都市を追加します。12時間・24時間表示を切り替えられ、選択した日付の夏時間規則が自動で反映されます。",
      terms: [
        "タイムゾーン変換",
        "世界時計",
        "世界時間",
        "都市 時刻",
        "時差計算",
        "UTCオフセット",
      ],
      faqs: [
        {
          q: "タイムゾーン変換と世界時計の違いは何ですか？",
          a: "変換機能は指定した瞬間を別の地域時刻で表示し、世界時計は複数都市の現在時刻を表示します。このページでは両方を使えます。",
        },
        {
          q: "夏時間は反映されますか？",
          a: "はい。選択した日付に対応する各地域のタイムゾーン規則をブラウザが適用します。",
        },
        {
          q: "都市や時刻は保存・共有されますか？",
          a: "いいえ。このタブ内だけで計算し、URLへの追加、アップロード、保存は行いません。",
        },
      ],
    },
    feature: {
      ariaLabel: "タイムゾーン変換と世界時計",
      sourceTime: "基準の日時",
      sourceTimeHint:
        "「現在」でライブ表示するか、予定を立てる日時を選択します。",
      sourceZone: "基準タイムゾーン",
      sourceZonePlaceholder: "都市またはIANAゾーン（例：Asia/Tokyo）",
      now: "現在",
      convert: "変換",
      hourFormat: "時刻表示",
      hour12: "12時間",
      hour24: "24時間",
      worldClock: "世界時計",
      addZone: "都市またはタイムゾーンを追加",
      zonePlaceholder: "都市またはタイムゾーンを追加",
      add: "追加",
      removeZone: "タイムゾーンを削除",
      sourceBadge: "基準",
      ahead: "{difference}進んでいます",
      behind: "{difference}遅れています",
      sameOffset: "同じ時刻",
      live: "ライブ世界時計",
      converted: "タイムゾーンを変換しました",
      maxZones: "一度に比較できるタイムゾーンは8件までです。",
      duplicateZone: "そのタイムゾーンはすでに世界時計にあります。",
      invalidZone: "有効な都市またはIANAタイムゾーンを選んでください。",
      invalidTime: "有効な日時を選んでください。",
      nonexistentTime:
        "夏時間への切り替えで存在しない現地時刻です。別の時刻を選んでください。",
      repeatedTime:
        "夏時間の切り替えで2回現れる現地時刻です。前後の時刻を選んでください。",
      emptyZones: "別の都市またはタイムゾーンを追加して比較してください。",
    },
  },
  fr: {
    page: {
      title: "Convertisseur de fuseaux horaires et horloge mondiale",
      description:
        "Convertissez une date et une heure entre plusieurs villes, ou comparez les heures locales, décalages UTC et changements de date sur une horloge mondiale en direct.",
      mobileDescription:
        "Convertissez les fuseaux et comparez l'heure de plusieurs villes.",
      guide:
        "Choisissez la date, l'heure et le fuseau IANA de départ. Ajoutez les villes à comparer et passez du format 12 h au format 24 h. Les règles d'heure d'été de la date choisie sont appliquées automatiquement.",
      terms: [
        "convertisseur fuseau horaire",
        "horloge mondiale",
        "heure mondiale",
        "heure ville",
        "décalage horaire",
        "décalage UTC",
      ],
      faqs: [
        {
          q: "Quelle différence entre convertisseur et horloge mondiale ?",
          a: "Le convertisseur affiche un instant choisi dans d'autres fuseaux ; l'horloge mondiale affiche l'heure actuelle de plusieurs lieux. Cette page propose les deux.",
        },
        {
          q: "L'heure d'été est-elle prise en compte ?",
          a: "Oui. Le navigateur applique les règles de chaque fuseau à la date sélectionnée.",
        },
        {
          q: "Mes villes et heures sont-elles enregistrées ?",
          a: "Non. Le calcul reste dans cet onglet et rien n'est ajouté à l'URL, envoyé ou enregistré.",
        },
      ],
    },
    feature: {
      ariaLabel: "Convertisseur de fuseaux horaires et horloge mondiale",
      sourceTime: "Date et heure de départ",
      sourceTimeHint:
        "Utilisez Maintenant pour l'horloge en direct ou choisissez une heure à planifier.",
      sourceZone: "Fuseau de départ",
      sourceZonePlaceholder: "Ville ou fuseau IANA, par ex. Europe/Paris",
      now: "Maintenant",
      convert: "Convertir",
      hourFormat: "Format de l'heure",
      hour12: "12 heures",
      hour24: "24 heures",
      worldClock: "Horloge mondiale",
      addZone: "Ajouter une ville ou un fuseau",
      zonePlaceholder: "Ajouter une ville ou un fuseau",
      add: "Ajouter",
      removeZone: "Retirer le fuseau",
      sourceBadge: "Départ",
      ahead: "{difference} d'avance",
      behind: "{difference} de retard",
      sameOffset: "Même heure",
      live: "Horloge mondiale en direct",
      converted: "Fuseaux horaires convertis",
      maxZones: "Vous pouvez comparer jusqu'à huit fuseaux à la fois.",
      duplicateZone: "Ce fuseau figure déjà dans l'horloge mondiale.",
      invalidZone: "Choisissez une ville ou un fuseau IANA valide.",
      invalidTime: "Choisissez une date et une heure valides.",
      nonexistentTime:
        "Cette heure locale est sautée lors d'un changement d'heure. Choisissez-en une autre.",
      repeatedTime:
        "Cette heure locale se produit deux fois lors d'un changement d'heure. Choisissez une heure avant ou après.",
      emptyZones:
        "Ajoutez une autre ville ou un autre fuseau pour le comparer au départ.",
    },
  },
  "pt-BR": {
    page: {
      title: "Conversor de fuso horário e relógio mundial",
      description:
        "Converta data e hora entre cidades ou compare horários locais, offsets UTC e mudanças de data em um relógio mundial ao vivo.",
      mobileDescription:
        "Converta fusos e compare um relógio mundial entre cidades.",
      guide:
        "Escolha data, hora e fuso IANA de origem. Adicione as cidades que deseja comparar e alterne entre 12 e 24 horas. As regras de horário de verão da data escolhida são aplicadas automaticamente.",
      terms: [
        "conversor de fuso horário",
        "relógio mundial",
        "hora mundial",
        "horário cidades",
        "diferença de horário",
        "offset UTC",
      ],
      faqs: [
        {
          q: "Qual é a diferença entre conversor e relógio mundial?",
          a: "O conversor mostra um momento escolhido em outros fusos; o relógio mundial mostra a hora atual em vários lugares. Esta página oferece os dois.",
        },
        {
          q: "O horário de verão é considerado?",
          a: "Sim. O navegador aplica as regras de cada fuso para a data escolhida.",
        },
        {
          q: "Minhas cidades ou horários são salvos?",
          a: "Não. O cálculo fica nesta aba e não é colocado na URL, enviado ou salvo.",
        },
      ],
    },
    feature: {
      ariaLabel: "Conversor de fuso horário e relógio mundial",
      sourceTime: "Data e hora de origem",
      sourceTimeHint:
        "Use Agora para o relógio ao vivo ou escolha um horário para planejar.",
      sourceZone: "Fuso horário de origem",
      sourceZonePlaceholder: "Cidade ou fuso IANA, como America/Sao_Paulo",
      now: "Agora",
      convert: "Converter",
      hourFormat: "Formato de hora",
      hour12: "12 horas",
      hour24: "24 horas",
      worldClock: "Relógio mundial",
      addZone: "Adicionar cidade ou fuso",
      zonePlaceholder: "Adicionar cidade ou fuso",
      add: "Adicionar",
      removeZone: "Remover fuso horário",
      sourceBadge: "Origem",
      ahead: "{difference} adiantado",
      behind: "{difference} atrasado",
      sameOffset: "Mesmo horário",
      live: "Relógio mundial ao vivo",
      converted: "Fusos horários convertidos",
      maxZones: "É possível comparar até oito fusos por vez.",
      duplicateZone: "Esse fuso já está no relógio mundial.",
      invalidZone: "Escolha uma cidade ou fuso IANA válido.",
      invalidTime: "Escolha uma data e hora válidas.",
      nonexistentTime:
        "Esse horário local não existe por causa da mudança de horário de verão. Escolha outro.",
      repeatedTime:
        "Esse horário local ocorre duas vezes na mudança de horário de verão. Escolha um horário antes ou depois.",
      emptyZones: "Adicione outra cidade ou fuso para comparar com a origem.",
    },
  },
  it: {
    page: {
      title: "Convertitore di fusi orari e orologio mondiale",
      description:
        "Converti data e ora tra città oppure confronta orari locali, offset UTC e cambi di data in un orologio mondiale in tempo reale.",
      mobileDescription:
        "Converti i fusi orari e confronta l'ora nelle città del mondo.",
      guide:
        "Scegli data, ora e fuso IANA di partenza. Aggiungi le città da confrontare e passa dal formato 12 al formato 24 ore. Vengono applicate le regole dell'ora legale della data scelta.",
      terms: [
        "convertitore fuso orario",
        "orologio mondiale",
        "ora mondiale",
        "ora città",
        "differenza oraria",
        "offset UTC",
      ],
      faqs: [
        {
          q: "Qual è la differenza tra convertitore e orologio mondiale?",
          a: "Il convertitore mostra un momento scelto in altri fusi; l'orologio mondiale mostra l'ora attuale in più luoghi. Questa pagina offre entrambe le funzioni.",
        },
        {
          q: "Tiene conto dell'ora legale?",
          a: "Sì. Il browser applica le regole di ogni fuso alla data selezionata.",
        },
        {
          q: "Città e orari vengono salvati?",
          a: "No. Il calcolo resta in questa scheda e non viene inserito nell'URL, caricato o salvato.",
        },
      ],
    },
    feature: {
      ariaLabel: "Convertitore di fusi orari e orologio mondiale",
      sourceTime: "Data e ora di partenza",
      sourceTimeHint:
        "Usa Adesso per l'orologio in tempo reale o scegli un'ora da pianificare.",
      sourceZone: "Fuso orario di partenza",
      sourceZonePlaceholder: "Città o fuso IANA, ad es. Europe/Rome",
      now: "Adesso",
      convert: "Converti",
      hourFormat: "Formato orario",
      hour12: "12 ore",
      hour24: "24 ore",
      worldClock: "Orologio mondiale",
      addZone: "Aggiungi città o fuso",
      zonePlaceholder: "Aggiungi città o fuso",
      add: "Aggiungi",
      removeZone: "Rimuovi fuso orario",
      sourceBadge: "Partenza",
      ahead: "{difference} avanti",
      behind: "{difference} indietro",
      sameOffset: "Stessa ora",
      live: "Orologio mondiale in tempo reale",
      converted: "Fusi orari convertiti",
      maxZones: "Puoi confrontare fino a otto fusi alla volta.",
      duplicateZone: "Questo fuso è già nell'orologio mondiale.",
      invalidZone: "Scegli una città o un fuso IANA valido.",
      invalidTime: "Scegli una data e un'ora valide.",
      nonexistentTime:
        "Quest'ora locale viene saltata nel cambio dell'ora legale. Scegline un'altra.",
      repeatedTime:
        "Quest'ora locale ricorre due volte nel cambio dell'ora legale. Scegli un'ora prima o dopo.",
      emptyZones: "Aggiungi un'altra città o fuso da confrontare.",
    },
  },
  nl: {
    page: {
      title: "Tijdzoneconverter en wereldklok",
      description:
        "Zet datum en tijd om tussen steden of vergelijk lokale tijden, UTC-verschillen en datumwissels in een live wereldklok.",
      mobileDescription:
        "Zet tijdzones om en vergelijk steden in een wereldklok.",
      guide:
        "Kies de brondatum, tijd en IANA-tijdzone. Voeg plaatsen toe en wissel tussen 12- en 24-uursnotatie. De zomertijdregels voor de gekozen datum worden automatisch toegepast.",
      terms: [
        "tijdzone converter",
        "wereldklok",
        "wereldtijd",
        "tijd steden",
        "tijdsverschil",
        "UTC verschil",
      ],
      faqs: [
        {
          q: "Wat is het verschil tussen een converter en wereldklok?",
          a: "De converter toont één gekozen moment in andere zones; de wereldklok toont de huidige tijd op meerdere plaatsen. Deze pagina doet beide.",
        },
        {
          q: "Wordt zomertijd meegenomen?",
          a: "Ja. De browser past de tijdzoneregels van de gekozen datum toe.",
        },
        {
          q: "Worden mijn plaatsen of tijden bewaard?",
          a: "Nee. De berekening blijft in dit tabblad en wordt niet in de URL gezet, geüpload of opgeslagen.",
        },
      ],
    },
    feature: {
      ariaLabel: "Tijdzoneconverter en wereldklok",
      sourceTime: "Brondatum en -tijd",
      sourceTimeHint:
        "Gebruik Nu voor de live wereldklok of kies een tijd om vooruit te plannen.",
      sourceZone: "Brontijdzone",
      sourceZonePlaceholder: "Stad of IANA-zone, zoals Europe/Amsterdam",
      now: "Nu",
      convert: "Omrekenen",
      hourFormat: "Tijdnotatie",
      hour12: "12 uur",
      hour24: "24 uur",
      worldClock: "Wereldklok",
      addZone: "Stad of tijdzone toevoegen",
      zonePlaceholder: "Stad of tijdzone toevoegen",
      add: "Toevoegen",
      removeZone: "Tijdzone verwijderen",
      sourceBadge: "Bron",
      ahead: "{difference} voor",
      behind: "{difference} achter",
      sameOffset: "Dezelfde tijd",
      live: "Live wereldklok",
      converted: "Tijdzones omgerekend",
      maxZones: "Je kunt maximaal acht tijdzones tegelijk vergelijken.",
      duplicateZone: "Die tijdzone staat al in de wereldklok.",
      invalidZone: "Kies een geldige stad of IANA-tijdzone.",
      invalidTime: "Kies een geldige datum en tijd.",
      nonexistentTime:
        "Deze lokale tijd wordt overgeslagen bij de zomertijdwissel. Kies een andere tijd.",
      repeatedTime:
        "Deze lokale tijd komt tweemaal voor bij de zomertijdwissel. Kies een tijd ervoor of erna.",
      emptyZones: "Voeg een andere stad of tijdzone toe om te vergelijken.",
    },
  },
  sv: {
    page: {
      title: "Tidszonsomvandlare och världsklocka",
      description:
        "Omvandla datum och tid mellan städer eller jämför lokala tider, UTC-skillnader och datumbyten i en världsklocka i realtid.",
      mobileDescription:
        "Omvandla tidszoner och jämför städer i en världsklocka.",
      guide:
        "Välj datum, tid och IANA-tidszon som utgångspunkt. Lägg till orter och växla mellan 12- och 24-timmarsformat. Reglerna för sommartid på det valda datumet används automatiskt.",
      terms: [
        "tidszonsomvandlare",
        "världsklocka",
        "världstid",
        "tid städer",
        "tidsskillnad",
        "UTC-skillnad",
      ],
      faqs: [
        {
          q: "Vad skiljer en tidszonsomvandlare från en världsklocka?",
          a: "Omvandlaren visar ett valt ögonblick i andra zoner; världsklockan visar aktuell lokal tid på flera platser. Den här sidan gör båda.",
        },
        {
          q: "Tar den hänsyn till sommartid?",
          a: "Ja. Webbläsaren använder tidszonsreglerna för det valda datumet.",
        },
        {
          q: "Sparas eller delas mina orter och tider?",
          a: "Nej. Beräkningen stannar i fliken och läggs inte i webbadressen, laddas upp eller sparas.",
        },
      ],
    },
    feature: {
      ariaLabel: "Tidszonsomvandlare och världsklocka",
      sourceTime: "Datum och tid från",
      sourceTimeHint:
        "Använd Nu för en levande världsklocka eller välj en tid att planera.",
      sourceZone: "Tidszon från",
      sourceZonePlaceholder: "Stad eller IANA-zon, t.ex. Europe/Stockholm",
      now: "Nu",
      convert: "Omvandla",
      hourFormat: "Tidsformat",
      hour12: "12 timmar",
      hour24: "24 timmar",
      worldClock: "Världsklocka",
      addZone: "Lägg till stad eller tidszon",
      zonePlaceholder: "Lägg till stad eller tidszon",
      add: "Lägg till",
      removeZone: "Ta bort tidszon",
      sourceBadge: "Utgång",
      ahead: "{difference} före",
      behind: "{difference} efter",
      sameOffset: "Samma tid",
      live: "Världsklocka i realtid",
      converted: "Tidszoner omvandlade",
      maxZones: "Du kan jämföra upp till åtta tidszoner samtidigt.",
      duplicateZone: "Tidszonen finns redan i världsklockan.",
      invalidZone: "Välj en giltig stad eller IANA-tidszon.",
      invalidTime: "Välj ett giltigt datum och klockslag.",
      nonexistentTime:
        "Den lokala tiden hoppas över vid en sommartidsändring. Välj en annan tid.",
      repeatedTime:
        "Den lokala tiden inträffar två gånger vid en sommartidsändring. Välj en tid före eller efter.",
      emptyZones: "Lägg till en annan stad eller tidszon för jämförelse.",
    },
  },
  cs: {
    page: {
      title: "Převodník časových pásem a světové hodiny",
      description:
        "Převádějte datum a čas mezi městy nebo porovnávejte místní časy, posuny UTC a změny data v živých světových hodinách.",
      mobileDescription:
        "Převádějte časová pásma a porovnávejte města ve světových hodinách.",
      guide:
        "Zvolte zdrojové datum, čas a pásmo IANA. Přidejte místa k porovnání a přepínejte mezi 12- a 24hodinovým formátem. Automaticky se použijí pravidla letního času pro vybrané datum.",
      terms: [
        "převodník časových pásem",
        "světové hodiny",
        "světový čas",
        "čas ve městech",
        "časový rozdíl",
        "posun UTC",
      ],
      faqs: [
        {
          q: "Jaký je rozdíl mezi převodníkem a světovými hodinami?",
          a: "Převodník ukáže zvolený okamžik v jiných pásmech; světové hodiny ukazují aktuální čas na více místech. Tato stránka umí obojí.",
        },
        {
          q: "Zohledňuje se letní čas?",
          a: "Ano. Prohlížeč použije pravidla časového pásma platná ve zvoleném datu.",
        },
        {
          q: "Ukládají se moje města nebo časy?",
          a: "Ne. Výpočet probíhá jen na této kartě a nic se nevkládá do URL, neodesílá ani neukládá.",
        },
      ],
    },
    feature: {
      ariaLabel: "Převodník časových pásem a světové hodiny",
      sourceTime: "Zdrojové datum a čas",
      sourceTimeHint:
        "Pro živé hodiny použijte Nyní, nebo zvolte čas pro plánování.",
      sourceZone: "Zdrojové časové pásmo",
      sourceZonePlaceholder: "Město nebo pásmo IANA, např. Europe/Prague",
      now: "Nyní",
      convert: "Převést",
      hourFormat: "Formát času",
      hour12: "12 hodin",
      hour24: "24 hodin",
      worldClock: "Světové hodiny",
      addZone: "Přidat město nebo pásmo",
      zonePlaceholder: "Přidat město nebo pásmo",
      add: "Přidat",
      removeZone: "Odebrat časové pásmo",
      sourceBadge: "Zdroj",
      ahead: "o {difference} napřed",
      behind: "o {difference} pozadu",
      sameOffset: "Stejný čas",
      live: "Živé světové hodiny",
      converted: "Časová pásma převedena",
      maxZones: "Současně lze porovnat nejvýše osm pásem.",
      duplicateZone: "Toto pásmo už ve světových hodinách je.",
      invalidZone: "Vyberte platné město nebo časové pásmo IANA.",
      invalidTime: "Vyberte platné datum a čas.",
      nonexistentTime:
        "Tento místní čas je při změně na letní čas přeskočen. Zvolte jiný.",
      repeatedTime:
        "Tento místní čas nastává při změně času dvakrát. Zvolte čas před ním nebo po něm.",
      emptyZones: "Přidejte další město nebo pásmo k porovnání.",
    },
  },
  pl: {
    page: {
      title: "Konwerter stref czasowych i zegar światowy",
      description:
        "Przeliczaj datę i godzinę między miastami albo porównuj czas lokalny, przesunięcia UTC i zmiany daty na żywym zegarze światowym.",
      mobileDescription:
        "Przeliczaj strefy czasowe i porównuj miasta na zegarze światowym.",
      guide:
        "Wybierz datę, godzinę i źródłową strefę IANA. Dodaj miejsca do porównania i przełączaj format 12- lub 24-godzinny. Reguły czasu letniego dla wybranej daty są stosowane automatycznie.",
      terms: [
        "konwerter stref czasowych",
        "zegar światowy",
        "czas światowy",
        "czas w miastach",
        "różnica czasu",
        "przesunięcie UTC",
      ],
      faqs: [
        {
          q: "Czym różni się konwerter od zegara światowego?",
          a: "Konwerter pokazuje wybraną chwilę w innych strefach, a zegar światowy bieżący czas w kilku miejscach. Ta strona oferuje oba widoki.",
        },
        {
          q: "Czy uwzględniany jest czas letni?",
          a: "Tak. Przeglądarka stosuje reguły stref czasowych właściwe dla wybranej daty.",
        },
        {
          q: "Czy miasta lub godziny są zapisywane?",
          a: "Nie. Obliczenia pozostają w tej karcie i nie trafiają do adresu URL, na serwer ani do pamięci.",
        },
      ],
    },
    feature: {
      ariaLabel: "Konwerter stref czasowych i zegar światowy",
      sourceTime: "Data i godzina źródłowa",
      sourceTimeHint:
        "Użyj Teraz dla zegara na żywo albo wybierz godzinę do planowania.",
      sourceZone: "Źródłowa strefa czasowa",
      sourceZonePlaceholder: "Miasto lub strefa IANA, np. Europe/Warsaw",
      now: "Teraz",
      convert: "Przelicz",
      hourFormat: "Format czasu",
      hour12: "12 godzin",
      hour24: "24 godziny",
      worldClock: "Zegar światowy",
      addZone: "Dodaj miasto lub strefę",
      zonePlaceholder: "Dodaj miasto lub strefę",
      add: "Dodaj",
      removeZone: "Usuń strefę czasową",
      sourceBadge: "Źródło",
      ahead: "{difference} do przodu",
      behind: "{difference} do tyłu",
      sameOffset: "Ta sama godzina",
      live: "Zegar światowy na żywo",
      converted: "Strefy czasowe przeliczone",
      maxZones: "Możesz porównać jednocześnie do ośmiu stref.",
      duplicateZone: "Ta strefa jest już na zegarze światowym.",
      invalidZone: "Wybierz prawidłowe miasto lub strefę IANA.",
      invalidTime: "Wybierz prawidłową datę i godzinę.",
      nonexistentTime:
        "Ta godzina lokalna jest pomijana przy zmianie czasu. Wybierz inną.",
      repeatedTime:
        "Ta godzina lokalna występuje dwukrotnie przy zmianie czasu. Wybierz godzinę przed nią lub po niej.",
      emptyZones: "Dodaj inne miasto lub strefę do porównania.",
    },
  },
  da: {
    page: {
      title: "Tidszoneomregner og verdensure",
      description:
        "Omregn dato og klokkeslæt mellem byer, eller sammenlign lokale tider, UTC-forskelle og datoskift i et live-verdensure.",
      mobileDescription: "Omregn tidszoner og sammenlign byer i et verdensure.",
      guide:
        "Vælg kildedato, klokkeslæt og IANA-tidszone. Tilføj steder, og skift mellem 12- og 24-timers format. Reglerne for sommertid på den valgte dato anvendes automatisk.",
      terms: [
        "tidszone omregner",
        "verdensure",
        "verdens tid",
        "tid i byer",
        "tidsforskel",
        "UTC forskel",
      ],
      faqs: [
        {
          q: "Hvad er forskellen på en omregner og et verdensure?",
          a: "Omregneren viser et valgt tidspunkt i andre zoner; verdensuret viser den aktuelle tid flere steder. Denne side kan begge dele.",
        },
        {
          q: "Tages der højde for sommertid?",
          a: "Ja. Browseren anvender reglerne for hver tidszone på den valgte dato.",
        },
        {
          q: "Gemmes eller deles mine byer og tider?",
          a: "Nej. Beregningen bliver i denne fane og sættes ikke i URL'en, uploades eller gemmes.",
        },
      ],
    },
    feature: {
      ariaLabel: "Tidszoneomregner og verdensure",
      sourceTime: "Kildedato og -tid",
      sourceTimeHint:
        "Brug Nu til live-uret, eller vælg et tidspunkt til planlægning.",
      sourceZone: "Kildetidszone",
      sourceZonePlaceholder: "By eller IANA-zone, f.eks. Europe/Copenhagen",
      now: "Nu",
      convert: "Omregn",
      hourFormat: "Tidsformat",
      hour12: "12 timer",
      hour24: "24 timer",
      worldClock: "Verdensure",
      addZone: "Tilføj by eller tidszone",
      zonePlaceholder: "Tilføj by eller tidszone",
      add: "Tilføj",
      removeZone: "Fjern tidszone",
      sourceBadge: "Kilde",
      ahead: "{difference} foran",
      behind: "{difference} bagud",
      sameOffset: "Samme tid",
      live: "Live-verdensure",
      converted: "Tidszoner omregnet",
      maxZones: "Du kan sammenligne op til otte tidszoner ad gangen.",
      duplicateZone: "Tidszonen er allerede i verdensuret.",
      invalidZone: "Vælg en gyldig by eller IANA-tidszone.",
      invalidTime: "Vælg en gyldig dato og et klokkeslæt.",
      nonexistentTime:
        "Denne lokale tid springes over ved skift til sommertid. Vælg en anden.",
      repeatedTime:
        "Denne lokale tid forekommer to gange ved tidsskift. Vælg en tid før eller efter.",
      emptyZones: "Tilføj en anden by eller tidszone til sammenligning.",
    },
  },
  no: {
    page: {
      title: "Tidssonekonverterer og verdensur",
      description:
        "Konverter dato og klokkeslett mellom byer, eller sammenlign lokale tider, UTC-avvik og datoskifter i et levende verdensur.",
      mobileDescription:
        "Konverter tidssoner og sammenlign byer i et verdensur.",
      guide:
        "Velg kildedato, klokkeslett og IANA-tidssone. Legg til steder og bytt mellom 12- og 24-timersformat. Reglene for sommertid på valgt dato brukes automatisk.",
      terms: [
        "tidssone konverterer",
        "verdensur",
        "verdens tid",
        "tid i byer",
        "tidsforskjell",
        "UTC avvik",
      ],
      faqs: [
        {
          q: "Hva er forskjellen på en konverterer og et verdensur?",
          a: "Konvertereren viser et valgt tidspunkt i andre soner; verdensuret viser gjeldende tid flere steder. Denne siden gjør begge deler.",
        },
        {
          q: "Tas det hensyn til sommertid?",
          a: "Ja. Nettleseren bruker tidssonereglene som gjelder på valgt dato.",
        },
        {
          q: "Lagres eller deles byene og tidene mine?",
          a: "Nei. Beregningen blir i denne fanen og legges ikke i nettadressen, lastes opp eller lagres.",
        },
      ],
    },
    feature: {
      ariaLabel: "Tidssonekonverterer og verdensur",
      sourceTime: "Kildedato og -tid",
      sourceTimeHint:
        "Bruk Nå for et levende verdensur, eller velg et tidspunkt å planlegge.",
      sourceZone: "Kildetidssone",
      sourceZonePlaceholder: "By eller IANA-sone, f.eks. Europe/Oslo",
      now: "Nå",
      convert: "Konverter",
      hourFormat: "Tidsformat",
      hour12: "12 timer",
      hour24: "24 timer",
      worldClock: "Verdensur",
      addZone: "Legg til by eller tidssone",
      zonePlaceholder: "Legg til by eller tidssone",
      add: "Legg til",
      removeZone: "Fjern tidssone",
      sourceBadge: "Kilde",
      ahead: "{difference} foran",
      behind: "{difference} bak",
      sameOffset: "Samme tid",
      live: "Levende verdensur",
      converted: "Tidssoner konvertert",
      maxZones: "Du kan sammenligne opptil åtte tidssoner samtidig.",
      duplicateZone: "Tidssonen er allerede i verdensuret.",
      invalidZone: "Velg en gyldig by eller IANA-tidssone.",
      invalidTime: "Velg en gyldig dato og et klokkeslett.",
      nonexistentTime:
        "Denne lokale tiden hoppes over ved overgang til sommertid. Velg en annen.",
      repeatedTime:
        "Denne lokale tiden forekommer to ganger ved tidsskifte. Velg en tid før eller etter.",
      emptyZones: "Legg til en annen by eller tidssone for sammenligning.",
    },
  },
  ar: {
    page: {
      title: "محوّل المناطق الزمنية والساعة العالمية",
      description:
        "حوّل التاريخ والوقت بين المدن أو قارن الأوقات المحلية وفروق UTC وتغيّر التاريخ في ساعة عالمية مباشرة.",
      mobileDescription:
        "حوّل المناطق الزمنية وقارن أوقات المدن في ساعة عالمية.",
      guide:
        "اختر تاريخ ووقت ومنطقة IANA للمصدر، ثم أضف المدن التي تريد مقارنتها وبدّل بين نظامي 12 و24 ساعة. تُطبّق قواعد التوقيت الصيفي الخاصة بالتاريخ المختار تلقائياً.",
      terms: [
        "محول المناطق الزمنية",
        "الساعة العالمية",
        "التوقيت العالمي",
        "وقت المدن",
        "فرق التوقيت",
        "فرق UTC",
      ],
      faqs: [
        {
          q: "ما الفرق بين محوّل الوقت والساعة العالمية؟",
          a: "يعرض المحوّل لحظة مختارة في مناطق أخرى، بينما تعرض الساعة العالمية الوقت الحالي في عدة أماكن. توفر هذه الصفحة الطريقتين.",
        },
        {
          q: "هل يُحتسب التوقيت الصيفي؟",
          a: "نعم. يطبّق المتصفح قواعد كل منطقة زمنية في التاريخ المحدد.",
        },
        {
          q: "هل تُحفظ المدن أو الأوقات أو تُشارك؟",
          a: "لا. تتم العملية داخل علامة التبويب ولا تُضاف البيانات إلى الرابط ولا تُرفع أو تُحفظ.",
        },
      ],
    },
    feature: {
      ariaLabel: "محوّل المناطق الزمنية والساعة العالمية",
      sourceTime: "تاريخ ووقت المصدر",
      sourceTimeHint: "استخدم الآن للساعة المباشرة أو اختر وقتاً للتخطيط.",
      sourceZone: "المنطقة الزمنية للمصدر",
      sourceZonePlaceholder: "مدينة أو منطقة IANA مثل Asia/Riyadh",
      now: "الآن",
      convert: "تحويل",
      hourFormat: "نظام الوقت",
      hour12: "12 ساعة",
      hour24: "24 ساعة",
      worldClock: "الساعة العالمية",
      addZone: "إضافة مدينة أو منطقة",
      zonePlaceholder: "أضف مدينة أو منطقة زمنية",
      add: "إضافة",
      removeZone: "إزالة المنطقة الزمنية",
      sourceBadge: "المصدر",
      ahead: "متقدم {difference}",
      behind: "متأخر {difference}",
      sameOffset: "الوقت نفسه",
      live: "ساعة عالمية مباشرة",
      converted: "تم تحويل المناطق الزمنية",
      maxZones: "يمكنك مقارنة ما يصل إلى ثماني مناطق زمنية معاً.",
      duplicateZone: "هذه المنطقة موجودة بالفعل في الساعة العالمية.",
      invalidZone: "اختر مدينة أو منطقة زمنية IANA صالحة.",
      invalidTime: "اختر تاريخاً ووقتاً صالحين.",
      nonexistentTime:
        "هذا الوقت المحلي غير موجود بسبب انتقال التوقيت الصيفي. اختر وقتاً آخر.",
      repeatedTime:
        "يتكرر هذا الوقت المحلي مرتين عند انتقال التوقيت. اختر وقتاً قبله أو بعده.",
      emptyZones: "أضف مدينة أو منطقة أخرى لمقارنتها بالمصدر.",
    },
  },
  "zh-TW": {
    page: {
      title: "時區轉換器與世界時鐘",
      description:
        "轉換不同城市的日期與時間，或用即時世界時鐘比較當地時間、UTC 時差與跨日變化。",
      mobileDescription: "轉換時區並比較多個城市的世界時鐘。",
      guide:
        "選擇來源日期、時間與 IANA 時區，再加入要比較的城市。可切換 12 小時制與 24 小時制，並依所選日期自動套用各地日光節約時間規則。",
      terms: [
        "時區轉換器",
        "世界時鐘",
        "世界時間",
        "城市時間",
        "時差計算",
        "UTC時差",
      ],
      faqs: [
        {
          q: "時區轉換器和世界時鐘有什麼不同？",
          a: "轉換器會顯示同一指定時刻在其他時區的時間；世界時鐘則顯示多個地點的目前時間。本頁同時提供兩者。",
        },
        {
          q: "會計算日光節約時間嗎？",
          a: "會。瀏覽器會依所選日期套用各時區的規則。",
        },
        {
          q: "城市或時間會被儲存或分享嗎？",
          a: "不會。所有計算只在此分頁進行，不會寫入網址、上傳或儲存。",
        },
      ],
    },
    feature: {
      ariaLabel: "時區轉換器與世界時鐘",
      sourceTime: "來源日期與時間",
      sourceTimeHint: "按「現在」查看即時世界時鐘，或選擇時間來規劃行程。",
      sourceZone: "來源時區",
      sourceZonePlaceholder: "城市或 IANA 時區，例如 Asia/Taipei",
      now: "現在",
      convert: "轉換",
      hourFormat: "時間格式",
      hour12: "12 小時",
      hour24: "24 小時",
      worldClock: "世界時鐘",
      addZone: "加入城市或時區",
      zonePlaceholder: "加入城市或時區",
      add: "加入",
      removeZone: "移除時區",
      sourceBadge: "來源",
      ahead: "快 {difference}",
      behind: "慢 {difference}",
      sameOffset: "時間相同",
      live: "即時世界時鐘",
      converted: "時區轉換完成",
      maxZones: "一次最多可比較八個時區。",
      duplicateZone: "此時區已在世界時鐘中。",
      invalidZone: "請選擇有效的城市或 IANA 時區。",
      invalidTime: "請選擇有效的日期與時間。",
      nonexistentTime: "此當地時間因日光節約時間切換而不存在，請選擇其他時間。",
      repeatedTime:
        "此當地時間在日光節約時間切換時會出現兩次，請選擇前後的其他時間。",
      emptyZones: "加入其他城市或時區與來源時間比較。",
    },
  },
  tr: {
    page: {
      title: "Saat dilimi dönüştürücü ve dünya saati",
      description:
        "Tarih ve saati şehirler arasında dönüştürün veya canlı dünya saatinde yerel saatleri, UTC farklarını ve tarih değişimlerini karşılaştırın.",
      mobileDescription:
        "Saat dilimlerini dönüştürün ve şehirleri dünya saatinde karşılaştırın.",
      guide:
        "Kaynak tarih, saat ve IANA saat dilimini seçin. Karşılaştırılacak yerleri ekleyin ve 12/24 saat biçimi arasında geçiş yapın. Seçilen tarihteki yaz saati kuralları otomatik uygulanır.",
      terms: [
        "saat dilimi dönüştürücü",
        "dünya saati",
        "dünya zamanı",
        "şehir saatleri",
        "saat farkı",
        "UTC farkı",
      ],
      faqs: [
        {
          q: "Saat dilimi dönüştürücü ile dünya saati arasındaki fark nedir?",
          a: "Dönüştürücü seçilen bir anı diğer dilimlerde gösterir; dünya saati birden çok yerdeki güncel saati gösterir. Bu sayfa ikisini de sunar.",
        },
        {
          q: "Yaz saati hesaba katılıyor mu?",
          a: "Evet. Tarayıcı seçilen tarihte geçerli olan saat dilimi kurallarını uygular.",
        },
        {
          q: "Şehirlerim veya saatlerim kaydediliyor mu?",
          a: "Hayır. Hesaplama bu sekmede kalır; URL'ye eklenmez, yüklenmez veya kaydedilmez.",
        },
      ],
    },
    feature: {
      ariaLabel: "Saat dilimi dönüştürücü ve dünya saati",
      sourceTime: "Kaynak tarih ve saat",
      sourceTimeHint:
        "Canlı dünya saati için Şimdi'yi kullanın veya planlanacak bir saat seçin.",
      sourceZone: "Kaynak saat dilimi",
      sourceZonePlaceholder: "Şehir veya IANA dilimi, ör. Europe/Istanbul",
      now: "Şimdi",
      convert: "Dönüştür",
      hourFormat: "Saat biçimi",
      hour12: "12 saat",
      hour24: "24 saat",
      worldClock: "Dünya saati",
      addZone: "Şehir veya saat dilimi ekle",
      zonePlaceholder: "Şehir veya saat dilimi ekle",
      add: "Ekle",
      removeZone: "Saat dilimini kaldır",
      sourceBadge: "Kaynak",
      ahead: "{difference} ileride",
      behind: "{difference} geride",
      sameOffset: "Aynı saat",
      live: "Canlı dünya saati",
      converted: "Saat dilimleri dönüştürüldü",
      maxZones:
        "Aynı anda en fazla sekiz saat dilimini karşılaştırabilirsiniz.",
      duplicateZone: "Bu saat dilimi dünya saatinde zaten var.",
      invalidZone: "Geçerli bir şehir veya IANA saat dilimi seçin.",
      invalidTime: "Geçerli bir tarih ve saat seçin.",
      nonexistentTime:
        "Bu yerel saat yaz saati geçişinde atlanıyor. Başka bir saat seçin.",
      repeatedTime:
        "Bu yerel saat yaz saati geçişinde iki kez yaşanıyor. Öncesinden veya sonrasından bir saat seçin.",
      emptyZones:
        "Kaynakla karşılaştırmak için başka bir şehir veya saat dilimi ekleyin.",
    },
  },
} as const satisfies Record<Locale, TimeZoneConverterLocaleSeed>;

export function timeZoneConverterFor(
  locale: Locale,
): TimeZoneConverterLocaleSeed {
  return locales[locale];
}
