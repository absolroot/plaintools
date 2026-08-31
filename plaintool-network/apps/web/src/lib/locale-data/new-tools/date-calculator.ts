import type { DateCalculatorCopy } from "../../../features/date-calculator/contract";
import type { Locale } from "../../site";

export type DateCalculatorPageId =
  | "date-calculator"
  | "dday-calculator"
  | "age-calculator";

export type DateCalculatorPageSeed = {
  title: string;
  description: string;
  mobileDescription: string;
  guide: string;
  terms: readonly string[];
  faqs: Array<{ q: string; a: string }>;
};

export type DateCalculatorLocaleSeed = {
  pages: Record<DateCalculatorPageId, DateCalculatorPageSeed>;
  feature: DateCalculatorCopy;
};

type DateCalculatorTranslation = {
  page: {
    title: string;
    description: string;
    mobileDescription: string;
    guide: string;
    terms: readonly string[];
    faqs: Array<{ q: string; a: string }>;
  };
  feature: DateCalculatorCopy;
};

type DateSeedSource = Omit<DateCalculatorTranslation, "feature"> & {
  feature: Omit<DateCalculatorCopy, "ariaLabel">;
};

function define(input: DateSeedSource): DateCalculatorTranslation {
  return {
    ...input,
    feature: { ariaLabel: input.page.title, ...input.feature },
  };
}

const translations = {
  en: define({
    page: {
      title: "Date Calculator – Days, D-Day & Age",
      description:
        "Count days between dates, find a D-Day or deadline, add or subtract calendar time, and calculate exact age from a birth date.",
      mobileDescription:
        "Count days, calculate a date, or find exact age from a birth date.",
      guide:
        "Choose Date difference for days or a D-Day count, Add / subtract to move a calendar date, or Age for completed years and the next birthday. Calculations use date-only Gregorian calendar values, so daylight-saving time does not shift the answer.",
      terms: [
        "date calculator",
        "days between dates",
        "day counter",
        "D-Day calculator",
        "countdown calculator",
        "add days to date",
        "subtract days from date",
        "age calculator",
        "birthday calculator",
      ],
      faqs: [
        {
          q: "Are the start and end dates both counted?",
          a: "By default, the calculator counts the gap between the dates. Turn on Include the end date when a stay, event, or other period should count its final calendar day as well.",
        },
        {
          q: "How are age and leap-day birthdays calculated?",
          a: "Age means completed calendar years on the chosen reference date. A February 29 birthday is observed on February 28 in a non-leap year here; official rules can differ by jurisdiction, so verify legal deadlines separately.",
        },
        {
          q: "Are my dates uploaded or saved?",
          a: "No. Dates and results stay in this browser tab and are neither uploaded nor stored by the tool.",
        },
      ],
    },
    feature: {
      differenceMode: "Date difference",
      dateMathMode: "Add / subtract",
      ageMode: "Age calculator",
      startDate: "Start date",
      endDate: "End date",
      baseDate: "Starting date",
      birthDate: "Date of birth",
      referenceDate: "Age on this date",
      today: "Today",
      includeEndDate: "Include the end date",
      includeEndHint: "Adds the final calendar day to the counted period.",
      operation: "Operation",
      add: "Add",
      subtract: "Subtract",
      years: "Years",
      months: "Months",
      weeks: "Weeks",
      days: "Days",
      calculate: "Calculate",
      resultTitle: "Result",
      totalDays: "Total days",
      calendarDifference: "Calendar difference",
      weeksAndDays: "Weeks and days",
      dDay: "D-Day",
      resultingDate: "Resulting date",
      fullAge: "Completed age",
      exactAge: "Exact age",
      livedDays: "Total days lived",
      nextBirthday: "Next birthday",
      calendarNote:
        "Age is based on completed Gregorian calendar years, months, and days.",
      monthEndNote:
        "If the target month is shorter, the result uses its last valid day. Years and months are applied before weeks and days.",
      calculated: "Calculation complete",
      fullAgeTemplate: "{count} years old",
      nextBirthdayTemplate: "{date} — {count} days away (turning {age})",
      birthdayTodayTemplate: "{date} — today (age {age})",
      errors: {
        invalidDate: "Enter valid dates in every required field.",
        invalidAmount: "Use whole numbers from 0 to 100,000 for date amounts.",
        birthAfterReference:
          "The birth date must be on or before the reference date.",
        outOfRange: "The resulting date is outside the supported range.",
      },
    },
  }),
  ko: define({
    page: {
      title: "날짜 계산기 · 디데이 · 만 나이 계산기",
      description:
        "두 날짜 사이의 일수와 디데이를 계산하고, 날짜를 더하거나 빼고, 생년월일과 기준일로 만 나이와 다음 생일까지 남은 날을 확인하세요.",
      mobileDescription:
        "날짜 차이, 디데이, 날짜 더하기·빼기와 만 나이를 한곳에서 계산하세요.",
      guide:
        "‘날짜 차이’에서는 두 날짜 사이의 일수와 D-Day를, ‘더하기 / 빼기’에서는 기준 날짜에서 연·월·주·일을 이동한 날짜를, ‘만 나이’에서는 생년월일 기준 만 나이와 다음 생일까지 남은 날을 확인할 수 있습니다. 시간대가 아닌 달력 날짜만 사용하므로 서머타임 때문에 하루가 달라지지 않습니다.",
      terms: [
        "날짜 계산기",
        "날짜 차이 계산기",
        "일수 계산기",
        "날짜수 계산",
        "디데이 계산기",
        "D-Day 계산기",
        "날짜 더하기",
        "날짜 빼기",
        "만 나이 계산기",
        "만나이 계산기",
        "나이 계산기",
        "생일 계산기",
      ],
      faqs: [
        {
          q: "시작일과 종료일을 모두 포함해서 계산하나요?",
          a: "기본값은 두 날짜 사이의 간격이라 종료일을 포함하지 않습니다. 숙박일·행사 기간처럼 마지막 날까지 세려면 ‘종료일 포함’을 선택하세요.",
        },
        {
          q: "만 나이와 2월 29일생의 생일은 어떻게 계산하나요?",
          a: "만 나이는 기준일에 이미 지난 생일을 기준으로 완전히 경과한 연수를 표시합니다. 이 도구는 윤년이 아닌 해의 2월 29일생 생일을 2월 28일로 계산합니다. 법률·행정상 기한은 해당 기관의 기준을 별도로 확인하세요.",
        },
        {
          q: "생년월일이나 날짜가 서버에 저장되나요?",
          a: "아니요. 입력한 날짜와 결과는 현재 브라우저 탭 안에서만 계산되며 업로드되거나 저장되지 않습니다.",
        },
      ],
    },
    feature: {
      differenceMode: "날짜 차이",
      dateMathMode: "더하기 / 빼기",
      ageMode: "만 나이",
      startDate: "시작일",
      endDate: "종료일",
      baseDate: "기준 날짜",
      birthDate: "생년월일",
      referenceDate: "나이 기준일",
      today: "오늘",
      includeEndDate: "종료일 포함",
      includeEndHint: "선택하면 마지막 날짜를 기간에 하루 더 포함합니다.",
      operation: "계산 방식",
      add: "더하기",
      subtract: "빼기",
      years: "년",
      months: "개월",
      weeks: "주",
      days: "일",
      calculate: "계산하기",
      resultTitle: "계산 결과",
      totalDays: "전체 일수",
      calendarDifference: "달력 기준 차이",
      weeksAndDays: "주·일 환산",
      dDay: "디데이",
      resultingDate: "계산된 날짜",
      fullAge: "만 나이",
      exactAge: "정확한 경과 나이",
      livedDays: "태어난 지 지난 일수",
      nextBirthday: "다음 생일",
      calendarNote:
        "만 나이는 그레고리력 생일을 기준으로 완전히 지난 연·월·일을 계산합니다.",
      monthEndNote:
        "계산할 달에 같은 날짜가 없으면 그 달의 마지막 날을 사용합니다. 년·개월을 먼저 적용한 뒤 주·일을 적용합니다.",
      calculated: "날짜 계산이 완료되었습니다",
      fullAgeTemplate: "만 {count}세",
      nextBirthdayTemplate: "{date} · {count}일 후 (만 {age}세)",
      birthdayTodayTemplate: "{date} · 오늘 (만 {age}세)",
      errors: {
        invalidDate: "필수 항목에 올바른 날짜를 입력하세요.",
        invalidAmount: "기간은 0부터 100,000까지의 정수로 입력하세요.",
        birthAfterReference: "생년월일은 나이 기준일보다 늦을 수 없습니다.",
        outOfRange: "계산 결과가 지원하는 날짜 범위를 벗어났습니다.",
      },
    },
  }),
  ja: define({
    page: {
      title: "日付計算・日数計算・年齢計算",
      description:
        "2つの日付の日数差やD-Day、日付の加算・減算、生年月日と基準日から満年齢と次の誕生日までの日数を計算します。",
      mobileDescription: "日数差、日付の加減算、満年齢をまとめて計算できます。",
      guide:
        "「日付の差」では2つの日付の間の日数とD-Dayを、「加算・減算」では年月週日を足し引きした日付を、「満年齢」では基準日時点の満年齢と次の誕生日までの日数を確認できます。時刻を使わないため、夏時間で結果が1日ずれることはありません。",
      terms: [
        "日付計算",
        "日付計算機",
        "日数計算",
        "日数カウント",
        "2つの日付の差",
        "D-Day計算",
        "日付加算",
        "日付減算",
        "年齢計算",
        "満年齢計算",
        "誕生日計算",
      ],
      faqs: [
        {
          q: "開始日と終了日の両方を日数に含めますか？",
          a: "初期設定では2つの日付の間隔を数え、終了日は含めません。宿泊やイベント期間のように最終日も数える場合は「終了日を含める」を選択してください。",
        },
        {
          q: "満年齢と2月29日生まれはどのように計算しますか？",
          a: "満年齢は基準日までに完了した暦年で計算します。このツールでは平年の2月29日生まれの誕生日を2月28日として扱います。法令上の年齢や期限は公的機関の基準も確認してください。",
        },
        {
          q: "入力した日付は保存されますか？",
          a: "いいえ。日付と結果はこのブラウザータブ内だけで処理され、アップロードも保存もされません。",
        },
      ],
    },
    feature: {
      differenceMode: "日付の差",
      dateMathMode: "加算・減算",
      ageMode: "満年齢",
      startDate: "開始日",
      endDate: "終了日",
      baseDate: "基準日",
      birthDate: "生年月日",
      referenceDate: "年齢の基準日",
      today: "今日",
      includeEndDate: "終了日を含める",
      includeEndHint: "最終日を数える場合は1日を加えます。",
      operation: "計算方法",
      add: "加算",
      subtract: "減算",
      years: "年",
      months: "か月",
      weeks: "週",
      days: "日",
      calculate: "計算する",
      resultTitle: "計算結果",
      totalDays: "合計日数",
      calendarDifference: "暦上の差",
      weeksAndDays: "週と日",
      dDay: "D-Day",
      resultingDate: "計算後の日付",
      fullAge: "満年齢",
      exactAge: "正確な年齢",
      livedDays: "生まれてからの日数",
      nextBirthday: "次の誕生日",
      calendarNote: "満年齢はグレゴリオ暦で完了した年・月・日を基準にします。",
      monthEndNote:
        "移動先の月に同じ日がない場合は月末日を使用します。年・月の後に週・日を適用します。",
      calculated: "日付の計算が完了しました",
      fullAgeTemplate: "満{count}歳",
      nextBirthdayTemplate: "{date}（あと{count}日・満{age}歳）",
      birthdayTodayTemplate: "{date}（今日・満{age}歳）",
      errors: {
        invalidDate: "必須項目に正しい日付を入力してください。",
        invalidAmount: "期間は0から100,000までの整数で入力してください。",
        birthAfterReference: "生年月日は基準日以前の日付にしてください。",
        outOfRange: "計算結果が対応範囲外の日付です。",
      },
    },
  }),
  "zh-TW": define({
    page: {
      title: "日期計算機：相差天數、日期加減與年齡",
      description:
        "計算兩個日期相差幾天與 D-Day、日期加減年月週日，並依出生日期與基準日計算實歲和距離下次生日的天數。",
      mobileDescription: "計算相差天數、日期加減與實歲。",
      guide:
        "「日期差」可算相隔天數與 D-Day；「日期加減」可從基準日期增減年、月、週、日；「年齡」會顯示基準日當天的實歲與下次生日。所有運算只使用公曆日期，不受時區或日光節約時間影響。",
      terms: [
        "日期計算機",
        "日期計算器",
        "相差天數",
        "天數計算",
        "日期差計算",
        "倒數日計算",
        "日期加減",
        "年齡計算機",
        "實歲計算",
        "生日計算",
      ],
      faqs: [
        {
          q: "起始日和結束日都會算進去嗎？",
          a: "預設計算兩個日期之間的間隔，不包含最後一天。住宿或活動期間需要把最後一天也算入時，請勾選「包含結束日」。",
        },
        {
          q: "實歲與 2 月 29 日生日如何計算？",
          a: "實歲是基準日當天已完整度過的公曆年數。本工具在非閏年以 2 月 28 日作為 2 月 29 日生日的對應日；法律或行政期限仍請依主管機關規定確認。",
        },
        {
          q: "輸入的生日或日期會被儲存嗎？",
          a: "不會。日期與結果只在目前的瀏覽器分頁中計算，不會上傳或儲存。",
        },
      ],
    },
    feature: {
      differenceMode: "日期差",
      dateMathMode: "日期加減",
      ageMode: "年齡計算",
      startDate: "起始日期",
      endDate: "結束日期",
      baseDate: "基準日期",
      birthDate: "出生日期",
      referenceDate: "年齡基準日",
      today: "今天",
      includeEndDate: "包含結束日",
      includeEndHint: "將最後一個日曆日也計入期間。",
      operation: "運算方式",
      add: "加上",
      subtract: "減去",
      years: "年",
      months: "月",
      weeks: "週",
      days: "日",
      calculate: "開始計算",
      resultTitle: "計算結果",
      totalDays: "總天數",
      calendarDifference: "公曆年月日差",
      weeksAndDays: "週數與天數",
      dDay: "D-Day",
      resultingDate: "計算後日期",
      fullAge: "實歲",
      exactAge: "完整年齡",
      livedDays: "出生至今總天數",
      nextBirthday: "下次生日",
      calendarNote: "年齡以公曆中已完整經過的年、月、日計算。",
      monthEndNote:
        "若目標月份沒有相同日期，會使用該月最後一天；先套用年、月，再套用週、日。",
      calculated: "日期計算完成",
      fullAgeTemplate: "實歲 {count} 歲",
      nextBirthdayTemplate: "{date}，還有 {count} 天（滿 {age} 歲）",
      birthdayTodayTemplate: "{date}，就是今天（滿 {age} 歲）",
      errors: {
        invalidDate: "請在所有必填欄位輸入有效日期。",
        invalidAmount: "期間請輸入 0 到 100,000 的整數。",
        birthAfterReference: "出生日期不得晚於年齡基準日。",
        outOfRange: "計算後的日期超出支援範圍。",
      },
    },
  }),
  de: define({
    page: {
      title: "Datumsrechner – Tage, Countdown & Alter",
      description:
        "Berechnen Sie Tage zwischen zwei Daten, einen Countdown, ein neues Datum durch Addition oder Subtraktion und das genaue Alter am Stichtag.",
      mobileDescription:
        "Datumsabstand, Zieldatum und genaues Alter berechnen.",
      guide:
        "Wählen Sie „Datumsdifferenz“ für Tage und Countdown, „Addieren / Subtrahieren“ für ein neues Kalenderdatum oder „Altersrechner“ für vollendete Jahre und den nächsten Geburtstag. Es werden reine gregorianische Kalendertage ohne Sommerzeitverschiebung verwendet.",
      terms: [
        "Datumsrechner",
        "Tagerechner",
        "Tage zwischen Daten",
        "Tage zählen",
        "Countdown Rechner",
        "Datum addieren",
        "Datum subtrahieren",
        "Altersrechner",
        "Alter berechnen",
      ],
      faqs: [
        {
          q: "Werden Anfangs- und Enddatum mitgezählt?",
          a: "Standardmäßig wird der Abstand berechnet und der Endtag nicht zusätzlich gezählt. Aktivieren Sie „Enddatum mitzählen“, wenn der letzte Tag etwa bei Aufenthalt oder Veranstaltung dazugehören soll.",
        },
        {
          q: "Wie werden Alter und der 29. Februar behandelt?",
          a: "Das Alter entspricht den am Stichtag vollendeten Kalenderjahren. In Nichtschaltjahren gilt hier der 28. Februar als Geburtstag für am 29. Februar Geborene. Rechtliche Fristen bitte gesondert prüfen.",
        },
        {
          q: "Werden meine Daten gespeichert?",
          a: "Nein. Eingaben und Ergebnisse bleiben in diesem Browser-Tab und werden weder hochgeladen noch gespeichert.",
        },
      ],
    },
    feature: {
      differenceMode: "Datumsdifferenz",
      dateMathMode: "Addieren / Subtrahieren",
      ageMode: "Altersrechner",
      startDate: "Anfangsdatum",
      endDate: "Enddatum",
      baseDate: "Ausgangsdatum",
      birthDate: "Geburtsdatum",
      referenceDate: "Alter am Stichtag",
      today: "Heute",
      includeEndDate: "Enddatum mitzählen",
      includeEndHint: "Zählt den letzten Kalendertag zusätzlich mit.",
      operation: "Rechenart",
      add: "Addieren",
      subtract: "Subtrahieren",
      years: "Jahre",
      months: "Monate",
      weeks: "Wochen",
      days: "Tage",
      calculate: "Berechnen",
      resultTitle: "Ergebnis",
      totalDays: "Tage insgesamt",
      calendarDifference: "Kalenderdifferenz",
      weeksAndDays: "Wochen und Tage",
      dDay: "Countdown",
      resultingDate: "Ergebnisdatum",
      fullAge: "Vollendetes Alter",
      exactAge: "Genaues Alter",
      livedDays: "Lebenstage insgesamt",
      nextBirthday: "Nächster Geburtstag",
      calendarNote:
        "Das Alter basiert auf vollendeten Jahren, Monaten und Tagen des gregorianischen Kalenders.",
      monthEndNote:
        "Fehlt der entsprechende Tag im Zielmonat, wird dessen letzter gültiger Tag verwendet. Jahre und Monate werden vor Wochen und Tagen angewendet.",
      calculated: "Berechnung abgeschlossen",
      fullAgeTemplate: "{count} Jahre alt",
      nextBirthdayTemplate: "{date} – in {count} Tagen (dann {age})",
      birthdayTodayTemplate: "{date} – heute ({age} Jahre)",
      errors: {
        invalidDate: "Geben Sie in allen Pflichtfeldern gültige Daten ein.",
        invalidAmount: "Verwenden Sie ganze Zahlen von 0 bis 100.000.",
        birthAfterReference:
          "Das Geburtsdatum darf nicht nach dem Stichtag liegen.",
        outOfRange:
          "Das Ergebnisdatum liegt außerhalb des unterstützten Bereichs.",
      },
    },
  }),
  fr: define({
    page: {
      title: "Calculateur de dates, de jours et d’âge",
      description:
        "Calculez le nombre de jours entre deux dates, un compte à rebours, une date après ajout ou retrait, et l’âge exact à une date donnée.",
      mobileDescription:
        "Calculez un écart de dates, une date cible ou un âge exact.",
      guide:
        "Choisissez « Écart entre dates » pour compter les jours, « Ajouter / soustraire » pour déplacer une date, ou « Calcul d’âge » pour connaître l’âge révolu et le prochain anniversaire. Le calcul porte sur des dates du calendrier grégorien, sans décalage lié à l’heure d’été.",
      terms: [
        "calculateur de dates",
        "différence entre deux dates",
        "nombre de jours",
        "compte à rebours",
        "ajouter des jours à une date",
        "soustraire des jours",
        "calculateur d’âge",
        "calcul âge exact",
      ],
      faqs: [
        {
          q: "Les dates de début et de fin sont-elles toutes deux comptées ?",
          a: "Par défaut, le calcul mesure l’intervalle et n’ajoute pas le dernier jour. Activez « Inclure la date de fin » si le dernier jour d’un séjour ou d’un événement doit aussi compter.",
        },
        {
          q: "Comment l’âge et les naissances du 29 février sont-ils calculés ?",
          a: "L’âge correspond aux années civiles révolues à la date de référence. Ici, un anniversaire du 29 février est fixé au 28 février les années non bissextiles. Vérifiez séparément toute règle juridique.",
        },
        {
          q: "Mes dates sont-elles enregistrées ?",
          a: "Non. Les dates et résultats restent dans cet onglet et ne sont ni téléversés ni enregistrés.",
        },
      ],
    },
    feature: {
      differenceMode: "Écart entre dates",
      dateMathMode: "Ajouter / soustraire",
      ageMode: "Calcul d’âge",
      startDate: "Date de début",
      endDate: "Date de fin",
      baseDate: "Date de départ",
      birthDate: "Date de naissance",
      referenceDate: "Âge à la date du",
      today: "Aujourd’hui",
      includeEndDate: "Inclure la date de fin",
      includeEndHint: "Ajoute le dernier jour civil à la période comptée.",
      operation: "Opération",
      add: "Ajouter",
      subtract: "Soustraire",
      years: "Années",
      months: "Mois",
      weeks: "Semaines",
      days: "Jours",
      calculate: "Calculer",
      resultTitle: "Résultat",
      totalDays: "Nombre total de jours",
      calendarDifference: "Écart calendaire",
      weeksAndDays: "Semaines et jours",
      dDay: "Compte à rebours",
      resultingDate: "Date obtenue",
      fullAge: "Âge révolu",
      exactAge: "Âge exact",
      livedDays: "Nombre de jours vécus",
      nextBirthday: "Prochain anniversaire",
      calendarNote:
        "L’âge repose sur les années, mois et jours révolus du calendrier grégorien.",
      monthEndNote:
        "Si le mois cible est plus court, son dernier jour valide est utilisé. Les années et mois sont appliqués avant les semaines et jours.",
      calculated: "Calcul terminé",
      fullAgeTemplate: "{count} ans révolus",
      nextBirthdayTemplate: "{date} — dans {count} jours ({age} ans)",
      birthdayTodayTemplate: "{date} — aujourd’hui ({age} ans)",
      errors: {
        invalidDate: "Saisissez une date valide dans chaque champ obligatoire.",
        invalidAmount: "Utilisez des nombres entiers de 0 à 100 000.",
        birthAfterReference:
          "La date de naissance doit précéder ou égaler la date de référence.",
        outOfRange: "La date obtenue est hors de la plage prise en charge.",
      },
    },
  }),
  es: define({
    page: {
      title: "Calculadora de fechas, días y edad",
      description:
        "Calcula días entre fechas, una cuenta regresiva, una nueva fecha al sumar o restar tiempo y la edad exacta en una fecha de referencia.",
      mobileDescription:
        "Calcula diferencias de fechas, fechas futuras o edad exacta.",
      guide:
        "Elige «Diferencia de fechas» para contar días, «Sumar / restar» para mover una fecha o «Cálculo de edad» para ver los años cumplidos y el próximo cumpleaños. Se usan fechas del calendario gregoriano sin que el horario de verano altere el resultado.",
      terms: [
        "calculadora de fechas",
        "diferencia entre fechas",
        "días entre dos fechas",
        "contador de días",
        "cuenta regresiva",
        "sumar días a fecha",
        "restar días",
        "calculadora de edad",
        "edad exacta",
      ],
      faqs: [
        {
          q: "¿Se cuentan tanto la fecha inicial como la final?",
          a: "De forma predeterminada se calcula el intervalo y no se suma el último día. Activa «Incluir la fecha final» cuando ese día también forme parte de una estancia o un evento.",
        },
        {
          q: "¿Cómo se calcula la edad de quien nació el 29 de febrero?",
          a: "La edad muestra años naturales cumplidos en la fecha de referencia. En años no bisiestos, aquí se considera el 28 de febrero para nacimientos del 29. Comprueba aparte los plazos legales.",
        },
        {
          q: "¿Se guardan las fechas que escribo?",
          a: "No. Las fechas y resultados permanecen en esta pestaña del navegador y no se suben ni se guardan.",
        },
      ],
    },
    feature: {
      differenceMode: "Diferencia de fechas",
      dateMathMode: "Sumar / restar",
      ageMode: "Cálculo de edad",
      startDate: "Fecha inicial",
      endDate: "Fecha final",
      baseDate: "Fecha de partida",
      birthDate: "Fecha de nacimiento",
      referenceDate: "Edad en la fecha",
      today: "Hoy",
      includeEndDate: "Incluir la fecha final",
      includeEndHint: "Añade al recuento el último día natural.",
      operation: "Operación",
      add: "Sumar",
      subtract: "Restar",
      years: "Años",
      months: "Meses",
      weeks: "Semanas",
      days: "Días",
      calculate: "Calcular",
      resultTitle: "Resultado",
      totalDays: "Días totales",
      calendarDifference: "Diferencia natural",
      weeksAndDays: "Semanas y días",
      dDay: "Cuenta regresiva",
      resultingDate: "Fecha resultante",
      fullAge: "Años cumplidos",
      exactAge: "Edad exacta",
      livedDays: "Días vividos",
      nextBirthday: "Próximo cumpleaños",
      calendarNote:
        "La edad se basa en años, meses y días completos del calendario gregoriano.",
      monthEndNote:
        "Si el mes de destino es más corto, se usa su último día válido. Los años y meses se aplican antes que las semanas y días.",
      calculated: "Cálculo completado",
      fullAgeTemplate: "{count} años cumplidos",
      nextBirthdayTemplate: "{date} — faltan {count} días (cumplirá {age})",
      birthdayTodayTemplate: "{date} — hoy (cumple {age})",
      errors: {
        invalidDate:
          "Introduce fechas válidas en todos los campos obligatorios.",
        invalidAmount: "Usa números enteros entre 0 y 100 000.",
        birthAfterReference:
          "La fecha de nacimiento debe ser igual o anterior a la fecha de referencia.",
        outOfRange: "La fecha resultante está fuera del intervalo admitido.",
      },
    },
  }),
  "pt-BR": define({
    page: {
      title: "Calculadora de datas, dias e idade",
      description:
        "Calcule dias entre datas, contagem regressiva, uma nova data ao somar ou subtrair tempo e a idade exata em uma data de referência.",
      mobileDescription:
        "Calcule diferença entre datas, data futura ou idade exata.",
      guide:
        "Use “Diferença entre datas” para contar dias, “Somar / subtrair” para deslocar uma data ou “Calcular idade” para ver a idade completa e o próximo aniversário. O cálculo usa datas do calendário gregoriano e não sofre alteração pelo horário de verão.",
      terms: [
        "calculadora de datas",
        "diferença entre datas",
        "dias entre duas datas",
        "contador de dias",
        "contagem regressiva",
        "somar dias a uma data",
        "subtrair dias",
        "calculadora de idade",
        "idade exata",
      ],
      faqs: [
        {
          q: "As datas inicial e final são contadas?",
          a: "Por padrão, o resultado mede o intervalo e não adiciona o último dia. Marque “Incluir a data final” quando o último dia de uma estadia ou evento também fizer parte do período.",
        },
        {
          q: "Como são calculadas a idade e a data de 29 de fevereiro?",
          a: "A idade mostra os anos completos na data de referência. Em anos não bissextos, este cálculo considera 28 de fevereiro para quem nasceu no dia 29. Confirme regras legais separadamente.",
        },
        {
          q: "Minhas datas ficam salvas?",
          a: "Não. Datas e resultados permanecem apenas nesta aba do navegador e não são enviados nem armazenados.",
        },
      ],
    },
    feature: {
      differenceMode: "Diferença entre datas",
      dateMathMode: "Somar / subtrair",
      ageMode: "Calcular idade",
      startDate: "Data inicial",
      endDate: "Data final",
      baseDate: "Data de partida",
      birthDate: "Data de nascimento",
      referenceDate: "Idade na data",
      today: "Hoje",
      includeEndDate: "Incluir a data final",
      includeEndHint: "Adiciona o último dia do calendário ao período.",
      operation: "Operação",
      add: "Somar",
      subtract: "Subtrair",
      years: "Anos",
      months: "Meses",
      weeks: "Semanas",
      days: "Dias",
      calculate: "Calcular",
      resultTitle: "Resultado",
      totalDays: "Total de dias",
      calendarDifference: "Diferença no calendário",
      weeksAndDays: "Semanas e dias",
      dDay: "Contagem regressiva",
      resultingDate: "Data resultante",
      fullAge: "Idade completa",
      exactAge: "Idade exata",
      livedDays: "Total de dias vividos",
      nextBirthday: "Próximo aniversário",
      calendarNote:
        "A idade é calculada em anos, meses e dias completos do calendário gregoriano.",
      monthEndNote:
        "Se o mês de destino for mais curto, será usado o último dia válido. Anos e meses são aplicados antes de semanas e dias.",
      calculated: "Cálculo concluído",
      fullAgeTemplate: "{count} anos completos",
      nextBirthdayTemplate: "{date} — faltam {count} dias (fará {age})",
      birthdayTodayTemplate: "{date} — hoje ({age} anos)",
      errors: {
        invalidDate: "Informe datas válidas em todos os campos obrigatórios.",
        invalidAmount: "Use números inteiros de 0 a 100.000.",
        birthAfterReference:
          "A data de nascimento deve ser igual ou anterior à data de referência.",
        outOfRange: "A data resultante está fora do intervalo compatível.",
      },
    },
  }),
  it: define({
    page: {
      title: "Calcolatore di date, giorni ed età",
      description:
        "Calcola i giorni tra due date, un conto alla rovescia, una nuova data aggiungendo o sottraendo tempo e l’età esatta a una data scelta.",
      mobileDescription:
        "Calcola differenze tra date, date future ed età esatta.",
      guide:
        "Scegli “Differenza tra date” per contare i giorni, “Aggiungi / sottrai” per spostare una data o “Calcolo età” per vedere gli anni compiuti e il prossimo compleanno. Si usano date del calendario gregoriano, senza variazioni dovute all’ora legale.",
      terms: [
        "calcolatore date",
        "differenza tra date",
        "giorni tra due date",
        "calcolo giorni",
        "conto alla rovescia",
        "aggiungere giorni a una data",
        "sottrarre giorni",
        "calcolo età",
        "età esatta",
      ],
      faqs: [
        {
          q: "Vengono contate sia la data iniziale sia quella finale?",
          a: "Per impostazione predefinita viene misurato l’intervallo senza aggiungere l’ultimo giorno. Attiva “Includi la data finale” quando anche l’ultimo giorno di un soggiorno o evento va contato.",
        },
        {
          q: "Come vengono calcolati l’età e i compleanni del 29 febbraio?",
          a: "L’età indica gli anni di calendario compiuti alla data di riferimento. Negli anni non bisestili, qui il 29 febbraio viene osservato il 28. Per scadenze legali verifica le regole applicabili.",
        },
        {
          q: "Le date inserite vengono salvate?",
          a: "No. Date e risultati restano in questa scheda del browser e non vengono caricati né memorizzati.",
        },
      ],
    },
    feature: {
      differenceMode: "Differenza tra date",
      dateMathMode: "Aggiungi / sottrai",
      ageMode: "Calcolo età",
      startDate: "Data iniziale",
      endDate: "Data finale",
      baseDate: "Data di partenza",
      birthDate: "Data di nascita",
      referenceDate: "Età alla data",
      today: "Oggi",
      includeEndDate: "Includi la data finale",
      includeEndHint: "Aggiunge l’ultimo giorno di calendario al periodo.",
      operation: "Operazione",
      add: "Aggiungi",
      subtract: "Sottrai",
      years: "Anni",
      months: "Mesi",
      weeks: "Settimane",
      days: "Giorni",
      calculate: "Calcola",
      resultTitle: "Risultato",
      totalDays: "Giorni totali",
      calendarDifference: "Differenza di calendario",
      weeksAndDays: "Settimane e giorni",
      dDay: "Conto alla rovescia",
      resultingDate: "Data risultante",
      fullAge: "Età compiuta",
      exactAge: "Età esatta",
      livedDays: "Giorni vissuti",
      nextBirthday: "Prossimo compleanno",
      calendarNote:
        "L’età si basa su anni, mesi e giorni compiuti del calendario gregoriano.",
      monthEndNote:
        "Se il mese di arrivo è più corto, viene usato il suo ultimo giorno valido. Anni e mesi sono applicati prima di settimane e giorni.",
      calculated: "Calcolo completato",
      fullAgeTemplate: "{count} anni compiuti",
      nextBirthdayTemplate: "{date} — tra {count} giorni (compirà {age})",
      birthdayTodayTemplate: "{date} — oggi ({age} anni)",
      errors: {
        invalidDate: "Inserisci date valide in tutti i campi obbligatori.",
        invalidAmount: "Usa numeri interi da 0 a 100.000.",
        birthAfterReference:
          "La data di nascita deve essere uguale o precedente alla data di riferimento.",
        outOfRange:
          "La data risultante non rientra nell’intervallo supportato.",
      },
    },
  }),
  nl: define({
    page: {
      title: "Datumcalculator voor dagen en leeftijd",
      description:
        "Bereken dagen tussen datums, een aftelling, een nieuwe datum door tijd op te tellen of af te trekken en de exacte leeftijd op een peildatum.",
      mobileDescription:
        "Bereken datumverschil, een doeldatum of exacte leeftijd.",
      guide:
        "Kies ‘Verschil tussen datums’ om dagen te tellen, ‘Optellen / aftrekken’ om een datum te verschuiven of ‘Leeftijd berekenen’ voor de voltooide leeftijd en volgende verjaardag. De berekening gebruikt Gregoriaanse kalenderdatums en wordt niet beïnvloed door zomertijd.",
      terms: [
        "datumcalculator",
        "datumberekening",
        "dagen tussen datums",
        "dagen tellen",
        "aftelcalculator",
        "dagen optellen bij datum",
        "dagen aftrekken",
        "leeftijd berekenen",
        "leeftijdscalculator",
      ],
      faqs: [
        {
          q: "Worden de begin- en einddatum allebei meegeteld?",
          a: "Standaard wordt het verschil berekend zonder de laatste dag extra te tellen. Schakel ‘Einddatum meetellen’ in als de laatste dag van bijvoorbeeld een verblijf of evenement erbij hoort.",
        },
        {
          q: "Hoe worden leeftijd en 29 februari behandeld?",
          a: "De leeftijd is het aantal voltooide kalenderjaren op de peildatum. In een niet-schrikkeljaar geldt hier 28 februari voor een geboorte op 29 februari. Controleer wettelijke termijnen afzonderlijk.",
        },
        {
          q: "Worden mijn datums opgeslagen?",
          a: "Nee. Datums en resultaten blijven in dit browsertabblad en worden niet geüpload of opgeslagen.",
        },
      ],
    },
    feature: {
      differenceMode: "Verschil tussen datums",
      dateMathMode: "Optellen / aftrekken",
      ageMode: "Leeftijd berekenen",
      startDate: "Begindatum",
      endDate: "Einddatum",
      baseDate: "Startdatum",
      birthDate: "Geboortedatum",
      referenceDate: "Leeftijd op datum",
      today: "Vandaag",
      includeEndDate: "Einddatum meetellen",
      includeEndHint: "Telt de laatste kalenderdag bij de periode op.",
      operation: "Bewerking",
      add: "Optellen",
      subtract: "Aftrekken",
      years: "Jaren",
      months: "Maanden",
      weeks: "Weken",
      days: "Dagen",
      calculate: "Berekenen",
      resultTitle: "Resultaat",
      totalDays: "Totaal aantal dagen",
      calendarDifference: "Kalenderverschil",
      weeksAndDays: "Weken en dagen",
      dDay: "Aftelling",
      resultingDate: "Berekende datum",
      fullAge: "Voltooide leeftijd",
      exactAge: "Exacte leeftijd",
      livedDays: "Totaal geleefde dagen",
      nextBirthday: "Volgende verjaardag",
      calendarNote:
        "Leeftijd is gebaseerd op voltooide jaren, maanden en dagen van de Gregoriaanse kalender.",
      monthEndNote:
        "Is de doelmaand korter, dan wordt de laatste geldige dag gebruikt. Jaren en maanden worden vóór weken en dagen toegepast.",
      calculated: "Berekening voltooid",
      fullAgeTemplate: "{count} jaar oud",
      nextBirthdayTemplate: "{date} — over {count} dagen (wordt {age})",
      birthdayTodayTemplate: "{date} — vandaag ({age} jaar)",
      errors: {
        invalidDate: "Vul in elk verplicht veld een geldige datum in.",
        invalidAmount: "Gebruik gehele getallen van 0 tot 100.000.",
        birthAfterReference:
          "De geboortedatum moet op of vóór de peildatum liggen.",
        outOfRange: "De berekende datum valt buiten het ondersteunde bereik.",
      },
    },
  }),
  pl: define({
    page: {
      title: "Kalkulator dat, dni i wieku",
      description:
        "Oblicz dni między datami, odliczanie, nową datę po dodaniu lub odjęciu czasu oraz dokładny wiek na wybrany dzień.",
      mobileDescription: "Oblicz różnicę dat, datę docelową lub dokładny wiek.",
      guide:
        "Wybierz „Różnica dat”, aby policzyć dni, „Dodaj / odejmij”, aby przesunąć datę, albo „Kalkulator wieku”, aby sprawdzić ukończone lata i następne urodziny. Obliczenia używają dat kalendarza gregoriańskiego i nie zmieniają się przez czas letni.",
      terms: [
        "kalkulator dat",
        "różnica między datami",
        "ile dni między datami",
        "kalkulator dni",
        "odliczanie dni",
        "dodawanie dni do daty",
        "odejmowanie dni",
        "kalkulator wieku",
        "dokładny wiek",
      ],
      faqs: [
        {
          q: "Czy data początkowa i końcowa są wliczane?",
          a: "Domyślnie liczony jest odstęp bez dodatkowego dnia końcowego. Włącz „Uwzględnij datę końcową”, gdy ostatni dzień pobytu lub wydarzenia także należy do okresu.",
        },
        {
          q: "Jak liczony jest wiek osoby urodzonej 29 lutego?",
          a: "Wiek oznacza ukończone lata kalendarzowe w dniu odniesienia. W latach nieprzestępnych ten kalkulator przyjmuje 28 lutego. Terminy prawne należy sprawdzić według właściwych przepisów.",
        },
        {
          q: "Czy wpisane daty są zapisywane?",
          a: "Nie. Daty i wyniki pozostają w tej karcie przeglądarki i nie są wysyłane ani zapisywane.",
        },
      ],
    },
    feature: {
      differenceMode: "Różnica dat",
      dateMathMode: "Dodaj / odejmij",
      ageMode: "Kalkulator wieku",
      startDate: "Data początkowa",
      endDate: "Data końcowa",
      baseDate: "Data bazowa",
      birthDate: "Data urodzenia",
      referenceDate: "Wiek na dzień",
      today: "Dzisiaj",
      includeEndDate: "Uwzględnij datę końcową",
      includeEndHint: "Dodaje ostatni dzień kalendarzowy do okresu.",
      operation: "Działanie",
      add: "Dodaj",
      subtract: "Odejmij",
      years: "Lata",
      months: "Miesiące",
      weeks: "Tygodnie",
      days: "Dni",
      calculate: "Oblicz",
      resultTitle: "Wynik",
      totalDays: "Łączna liczba dni",
      calendarDifference: "Różnica kalendarzowa",
      weeksAndDays: "Tygodnie i dni",
      dDay: "Odliczanie",
      resultingDate: "Data wynikowa",
      fullAge: "Ukończony wiek",
      exactAge: "Dokładny wiek",
      livedDays: "Łączna liczba przeżytych dni",
      nextBirthday: "Następne urodziny",
      calendarNote:
        "Wiek opiera się na ukończonych latach, miesiącach i dniach kalendarza gregoriańskiego.",
      monthEndNote:
        "Jeśli miesiąc docelowy jest krótszy, używany jest jego ostatni prawidłowy dzień. Lata i miesiące stosuje się przed tygodniami i dniami.",
      calculated: "Obliczenia zakończone",
      fullAgeTemplate: "Ukończone {count} lat",
      nextBirthdayTemplate: "{date} — za {count} dni (ukończy {age} lat)",
      birthdayTodayTemplate: "{date} — dzisiaj ({age} lat)",
      errors: {
        invalidDate: "Wpisz poprawne daty we wszystkich wymaganych polach.",
        invalidAmount: "Użyj liczb całkowitych od 0 do 100 000.",
        birthAfterReference:
          "Data urodzenia nie może być późniejsza niż data odniesienia.",
        outOfRange: "Data wynikowa wykracza poza obsługiwany zakres.",
      },
    },
  }),
  cs: define({
    page: {
      title: "Kalkulačka data, dnů a věku",
      description:
        "Spočítejte dny mezi daty, odpočet, nové datum po přičtení či odečtení času a přesný věk k vybranému dni.",
      mobileDescription: "Spočítejte rozdíl dat, cílové datum nebo přesný věk.",
      guide:
        "Volba „Rozdíl dat“ spočítá dny, „Přičíst / odečíst“ posune datum a „Výpočet věku“ ukáže dokončený věk a příští narozeniny. Používají se kalendářní data gregoriánského kalendáře, takže letní čas výsledek neposune.",
      terms: [
        "kalkulačka data",
        "rozdíl mezi daty",
        "počet dnů mezi daty",
        "kalkulačka dnů",
        "odpočet dnů",
        "přičíst dny k datu",
        "odečíst dny",
        "výpočet věku",
        "kalkulačka věku",
      ],
      faqs: [
        {
          q: "Počítá se počáteční i koncové datum?",
          a: "Ve výchozím nastavení se měří mezera a poslední den se nepřičítá. Zapněte „Zahrnout koncové datum“, pokud má období zahrnovat i poslední den pobytu nebo události.",
        },
        {
          q: "Jak se počítá věk u narození 29. února?",
          a: "Věk znamená dokončené kalendářní roky k referenčnímu dni. V nepřestupném roce tato kalkulačka používá 28. únor. Právní lhůty ověřte podle příslušných pravidel.",
        },
        {
          q: "Ukládají se zadaná data?",
          a: "Ne. Data a výsledky zůstávají v této kartě prohlížeče a neodesílají se ani neukládají.",
        },
      ],
    },
    feature: {
      differenceMode: "Rozdíl dat",
      dateMathMode: "Přičíst / odečíst",
      ageMode: "Výpočet věku",
      startDate: "Počáteční datum",
      endDate: "Koncové datum",
      baseDate: "Výchozí datum",
      birthDate: "Datum narození",
      referenceDate: "Věk k datu",
      today: "Dnes",
      includeEndDate: "Zahrnout koncové datum",
      includeEndHint: "Přidá poslední kalendářní den do období.",
      operation: "Operace",
      add: "Přičíst",
      subtract: "Odečíst",
      years: "Roky",
      months: "Měsíce",
      weeks: "Týdny",
      days: "Dny",
      calculate: "Vypočítat",
      resultTitle: "Výsledek",
      totalDays: "Celkem dnů",
      calendarDifference: "Kalendářní rozdíl",
      weeksAndDays: "Týdny a dny",
      dDay: "Odpočet",
      resultingDate: "Výsledné datum",
      fullAge: "Dokončený věk",
      exactAge: "Přesný věk",
      livedDays: "Celkem prožitých dnů",
      nextBirthday: "Příští narozeniny",
      calendarNote:
        "Věk vychází z dokončených roků, měsíců a dnů gregoriánského kalendáře.",
      monthEndNote:
        "Je-li cílový měsíc kratší, použije se jeho poslední platný den. Roky a měsíce se použijí před týdny a dny.",
      calculated: "Výpočet dokončen",
      fullAgeTemplate: "Dokončený věk: {count}",
      nextBirthdayTemplate: "{date} — za {count} dnů (věk {age})",
      birthdayTodayTemplate: "{date} — dnes (věk {age})",
      errors: {
        invalidDate: "Zadejte platná data do všech povinných polí.",
        invalidAmount: "Použijte celá čísla od 0 do 100 000.",
        birthAfterReference:
          "Datum narození musí být nejpozději v referenční den.",
        outOfRange: "Výsledné datum je mimo podporovaný rozsah.",
      },
    },
  }),
  sv: define({
    page: {
      title: "Datumräknare för dagar och ålder",
      description:
        "Räkna dagar mellan datum, en nedräkning, ett nytt datum genom att lägga till eller dra av tid samt exakt ålder på ett valt datum.",
      mobileDescription: "Räkna datumskillnad, måldatum eller exakt ålder.",
      guide:
        "Välj ”Skillnad mellan datum” för att räkna dagar, ”Lägg till / dra av” för att flytta ett datum eller ”Ålderskalkylator” för fyllda år och nästa födelsedag. Beräkningen använder gregorianska kalenderdatum och påverkas inte av sommartid.",
      terms: [
        "datumräknare",
        "datumkalkylator",
        "dagar mellan datum",
        "räkna dagar",
        "nedräkning",
        "lägg till dagar till datum",
        "dra av dagar",
        "ålderskalkylator",
        "beräkna ålder",
      ],
      faqs: [
        {
          q: "Räknas både start- och slutdatum?",
          a: "Som standard beräknas avståndet utan att sista dagen läggs till. Aktivera ”Ta med slutdatum” om sista dagen i en vistelse eller händelse också ska räknas.",
        },
        {
          q: "Hur räknas ålder för den som är född 29 februari?",
          a: "Ålder betyder fyllda kalenderår på referensdatumet. Under år som inte är skottår används här 28 februari. Kontrollera juridiska tidsfrister enligt gällande regler.",
        },
        {
          q: "Sparas datumen jag skriver in?",
          a: "Nej. Datum och resultat stannar i den här webbläsarfliken och laddas inte upp eller sparas.",
        },
      ],
    },
    feature: {
      differenceMode: "Skillnad mellan datum",
      dateMathMode: "Lägg till / dra av",
      ageMode: "Ålderskalkylator",
      startDate: "Startdatum",
      endDate: "Slutdatum",
      baseDate: "Utgångsdatum",
      birthDate: "Födelsedatum",
      referenceDate: "Ålder på datum",
      today: "I dag",
      includeEndDate: "Ta med slutdatum",
      includeEndHint: "Lägger till periodens sista kalenderdag.",
      operation: "Åtgärd",
      add: "Lägg till",
      subtract: "Dra av",
      years: "År",
      months: "Månader",
      weeks: "Veckor",
      days: "Dagar",
      calculate: "Beräkna",
      resultTitle: "Resultat",
      totalDays: "Totalt antal dagar",
      calendarDifference: "Kalenderskillnad",
      weeksAndDays: "Veckor och dagar",
      dDay: "Nedräkning",
      resultingDate: "Resultatdatum",
      fullAge: "Fyllda år",
      exactAge: "Exakt ålder",
      livedDays: "Totalt levda dagar",
      nextBirthday: "Nästa födelsedag",
      calendarNote:
        "Åldern bygger på hela år, månader och dagar i den gregorianska kalendern.",
      monthEndNote:
        "Om målmånaden är kortare används dess sista giltiga dag. År och månader tillämpas före veckor och dagar.",
      calculated: "Beräkningen är klar",
      fullAgeTemplate: "{count} år",
      nextBirthdayTemplate: "{date} — om {count} dagar (fyller {age})",
      birthdayTodayTemplate: "{date} — i dag ({age} år)",
      errors: {
        invalidDate: "Ange giltiga datum i alla obligatoriska fält.",
        invalidAmount: "Använd heltal från 0 till 100 000.",
        birthAfterReference:
          "Födelsedatumet måste vara på eller före referensdatumet.",
        outOfRange: "Resultatdatumet ligger utanför intervallet som stöds.",
      },
    },
  }),
  da: define({
    page: {
      title: "Datoberegner til dage og alder",
      description:
        "Beregn dage mellem datoer, en nedtælling, en ny dato ved at lægge tid til eller fra samt den nøjagtige alder på en valgt dato.",
      mobileDescription: "Beregn datoforskel, måldato eller nøjagtig alder.",
      guide:
        "Vælg “Forskel mellem datoer” for at tælle dage, “Læg til / træk fra” for at flytte en dato eller “Aldersberegner” for fyldte år og næste fødselsdag. Beregningen bruger gregorianske kalenderdatoer og påvirkes ikke af sommertid.",
      terms: [
        "datoberegner",
        "datokalkulator",
        "dage mellem datoer",
        "beregn antal dage",
        "nedtælling",
        "læg dage til dato",
        "træk dage fra",
        "aldersberegner",
        "beregn alder",
      ],
      faqs: [
        {
          q: "Tælles både start- og slutdato med?",
          a: "Som standard beregnes afstanden uden at lægge den sidste dag til. Slå “Medtag slutdato” til, hvis sidste dag i et ophold eller arrangement også skal tælles.",
        },
        {
          q: "Hvordan beregnes alder for personer født 29. februar?",
          a: "Alder betyder fyldte kalenderår på referencedatoen. I år uden skuddag bruger denne beregner 28. februar. Juridiske frister bør kontrolleres efter de gældende regler.",
        },
        {
          q: "Gemmes de datoer, jeg indtaster?",
          a: "Nej. Datoer og resultater bliver i denne browserfane og bliver hverken uploadet eller gemt.",
        },
      ],
    },
    feature: {
      differenceMode: "Forskel mellem datoer",
      dateMathMode: "Læg til / træk fra",
      ageMode: "Aldersberegner",
      startDate: "Startdato",
      endDate: "Slutdato",
      baseDate: "Udgangsdato",
      birthDate: "Fødselsdato",
      referenceDate: "Alder på dato",
      today: "I dag",
      includeEndDate: "Medtag slutdato",
      includeEndHint: "Lægger periodens sidste kalenderdag til.",
      operation: "Handling",
      add: "Læg til",
      subtract: "Træk fra",
      years: "År",
      months: "Måneder",
      weeks: "Uger",
      days: "Dage",
      calculate: "Beregn",
      resultTitle: "Resultat",
      totalDays: "Dage i alt",
      calendarDifference: "Kalenderforskel",
      weeksAndDays: "Uger og dage",
      dDay: "Nedtælling",
      resultingDate: "Resultatdato",
      fullAge: "Fyldt alder",
      exactAge: "Nøjagtig alder",
      livedDays: "Levede dage i alt",
      nextBirthday: "Næste fødselsdag",
      calendarNote:
        "Alder beregnes ud fra hele år, måneder og dage i den gregorianske kalender.",
      monthEndNote:
        "Hvis målmåneden er kortere, bruges dens sidste gyldige dag. År og måneder anvendes før uger og dage.",
      calculated: "Beregningen er færdig",
      fullAgeTemplate: "{count} år",
      nextBirthdayTemplate: "{date} — om {count} dage (fylder {age})",
      birthdayTodayTemplate: "{date} — i dag ({age} år)",
      errors: {
        invalidDate: "Indtast gyldige datoer i alle obligatoriske felter.",
        invalidAmount: "Brug heltal fra 0 til 100.000.",
        birthAfterReference:
          "Fødselsdatoen skal ligge på eller før referencedatoen.",
        outOfRange: "Resultatdatoen ligger uden for det understøttede område.",
      },
    },
  }),
  no: define({
    page: {
      title: "Datokalkulator for dager og alder",
      description:
        "Beregn dager mellom datoer, en nedtelling, en ny dato ved å legge til eller trekke fra tid og nøyaktig alder på en valgt dato.",
      mobileDescription: "Beregn datoforskjell, måldato eller nøyaktig alder.",
      guide:
        "Velg «Forskjell mellom datoer» for å telle dager, «Legg til / trekk fra» for å flytte en dato eller «Alderskalkulator» for fylte år og neste bursdag. Beregningen bruker gregorianske kalenderdatoer og påvirkes ikke av sommertid.",
      terms: [
        "datokalkulator",
        "datoberegner",
        "dager mellom datoer",
        "beregne antall dager",
        "nedtelling",
        "legge dager til dato",
        "trekke fra dager",
        "alderskalkulator",
        "beregne alder",
      ],
      faqs: [
        {
          q: "Telles både start- og sluttdatoen med?",
          a: "Som standard beregnes avstanden uten å legge til siste dag. Slå på «Ta med sluttdato» hvis siste dag i et opphold eller arrangement også skal telles.",
        },
        {
          q: "Hvordan beregnes alder for personer født 29. februar?",
          a: "Alder betyr fylte kalenderår på referansedatoen. I år uten skuddag bruker denne kalkulatoren 28. februar. Juridiske frister bør kontrolleres etter gjeldende regler.",
        },
        {
          q: "Lagres datoene jeg skriver inn?",
          a: "Nei. Datoer og resultater blir i denne nettleserfanen og blir verken lastet opp eller lagret.",
        },
      ],
    },
    feature: {
      differenceMode: "Forskjell mellom datoer",
      dateMathMode: "Legg til / trekk fra",
      ageMode: "Alderskalkulator",
      startDate: "Startdato",
      endDate: "Sluttdato",
      baseDate: "Utgangsdato",
      birthDate: "Fødselsdato",
      referenceDate: "Alder på dato",
      today: "I dag",
      includeEndDate: "Ta med sluttdato",
      includeEndHint: "Legger periodens siste kalenderdag til.",
      operation: "Handling",
      add: "Legg til",
      subtract: "Trekk fra",
      years: "År",
      months: "Måneder",
      weeks: "Uker",
      days: "Dager",
      calculate: "Beregn",
      resultTitle: "Resultat",
      totalDays: "Dager totalt",
      calendarDifference: "Kalenderforskjell",
      weeksAndDays: "Uker og dager",
      dDay: "Nedtelling",
      resultingDate: "Resultatdato",
      fullAge: "Fylt alder",
      exactAge: "Nøyaktig alder",
      livedDays: "Totalt antall levde dager",
      nextBirthday: "Neste bursdag",
      calendarNote:
        "Alder beregnes ut fra hele år, måneder og dager i den gregorianske kalenderen.",
      monthEndNote:
        "Hvis målmåneden er kortere, brukes den siste gyldige dagen. År og måneder brukes før uker og dager.",
      calculated: "Beregningen er ferdig",
      fullAgeTemplate: "{count} år",
      nextBirthdayTemplate: "{date} — om {count} dager (fyller {age})",
      birthdayTodayTemplate: "{date} — i dag ({age} år)",
      errors: {
        invalidDate: "Skriv inn gyldige datoer i alle obligatoriske felt.",
        invalidAmount: "Bruk heltall fra 0 til 100 000.",
        birthAfterReference:
          "Fødselsdatoen må være på eller før referansedatoen.",
        outOfRange: "Resultatdatoen er utenfor området som støttes.",
      },
    },
  }),
  tr: define({
    page: {
      title: "Tarih, gün ve yaş hesaplama",
      description:
        "İki tarih arasındaki günleri, geri sayımı, süre ekleyip çıkararak yeni tarihi ve seçilen tarihteki tam yaşı hesaplayın.",
      mobileDescription:
        "Tarih farkını, hedef tarihi veya tam yaşı hesaplayın.",
      guide:
        "Gün saymak için “Tarih farkı”, bir tarihi ileri veya geri taşımak için “Ekle / çıkar”, tamamlanan yaş ve sonraki doğum günü için “Yaş hesaplama” seçeneğini kullanın. Hesaplama Gregoryen takvim tarihlerini kullanır ve yaz saati değişikliklerinden etkilenmez.",
      terms: [
        "tarih hesaplama",
        "tarih hesaplayıcı",
        "iki tarih arası gün",
        "gün hesaplama",
        "geri sayım",
        "tarihe gün ekleme",
        "tarihten gün çıkarma",
        "yaş hesaplama",
        "tam yaş hesaplama",
      ],
      faqs: [
        {
          q: "Başlangıç ve bitiş tarihleri birlikte sayılır mı?",
          a: "Varsayılan olarak iki tarih arasındaki fark hesaplanır ve son gün ayrıca eklenmez. Konaklama veya etkinliğin son günü de süreye dahilse “Bitiş tarihini dahil et” seçeneğini açın.",
        },
        {
          q: "29 Şubat doğumluların yaşı nasıl hesaplanır?",
          a: "Yaş, referans tarihinde tamamlanmış takvim yıllarını gösterir. Bu araç artık yıllarda bulunmayan 29 Şubat için 28 Şubat’ı kullanır. Hukuki süreleri ilgili kurala göre ayrıca doğrulayın.",
        },
        {
          q: "Girdiğim tarihler kaydediliyor mu?",
          a: "Hayır. Tarihler ve sonuçlar yalnızca bu tarayıcı sekmesinde kalır; yüklenmez veya saklanmaz.",
        },
      ],
    },
    feature: {
      differenceMode: "Tarih farkı",
      dateMathMode: "Ekle / çıkar",
      ageMode: "Yaş hesaplama",
      startDate: "Başlangıç tarihi",
      endDate: "Bitiş tarihi",
      baseDate: "Temel tarih",
      birthDate: "Doğum tarihi",
      referenceDate: "Yaşın hesaplanacağı tarih",
      today: "Bugün",
      includeEndDate: "Bitiş tarihini dahil et",
      includeEndHint: "Dönemin son takvim gününü de sayıma ekler.",
      operation: "İşlem",
      add: "Ekle",
      subtract: "Çıkar",
      years: "Yıl",
      months: "Ay",
      weeks: "Hafta",
      days: "Gün",
      calculate: "Hesapla",
      resultTitle: "Sonuç",
      totalDays: "Toplam gün",
      calendarDifference: "Takvim farkı",
      weeksAndDays: "Hafta ve gün",
      dDay: "Geri sayım",
      resultingDate: "Sonuç tarihi",
      fullAge: "Tamamlanan yaş",
      exactAge: "Tam yaş",
      livedDays: "Yaşanan toplam gün",
      nextBirthday: "Sonraki doğum günü",
      calendarNote:
        "Yaş, Gregoryen takvimde tamamlanan yıl, ay ve günlere göre hesaplanır.",
      monthEndNote:
        "Hedef ay daha kısaysa ayın son geçerli günü kullanılır. Yıl ve aylar, hafta ve günlerden önce uygulanır.",
      calculated: "Hesaplama tamamlandı",
      fullAgeTemplate: "{count} yaşında",
      nextBirthdayTemplate: "{date} — {count} gün sonra ({age} yaş)",
      birthdayTodayTemplate: "{date} — bugün ({age} yaş)",
      errors: {
        invalidDate: "Gerekli alanların tümüne geçerli tarihler girin.",
        invalidAmount: "0 ile 100.000 arasında tam sayılar kullanın.",
        birthAfterReference: "Doğum tarihi referans tarihinden sonra olamaz.",
        outOfRange: "Sonuç tarihi desteklenen aralığın dışında.",
      },
    },
  }),
  ar: define({
    page: {
      title: "حاسبة التاريخ والأيام والعمر",
      description:
        "احسب عدد الأيام بين تاريخين والعد التنازلي، وأضف مدة إلى تاريخ أو اطرحها، واعرف العمر المكتمل في تاريخ مرجعي محدد.",
      mobileDescription: "احسب فرق التاريخ أو التاريخ الناتج أو العمر الدقيق.",
      guide:
        "اختر «الفرق بين تاريخين» لعد الأيام، أو «إضافة / طرح» لنقل التاريخ، أو «حاسبة العمر» لمعرفة العمر المكتمل وموعد عيد الميلاد التالي. تستخدم الأداة تواريخ التقويم الميلادي فقط ولا يتغير الناتج بسبب التوقيت الصيفي.",
      terms: [
        "حاسبة التاريخ",
        "الفرق بين تاريخين",
        "حساب عدد الأيام",
        "الأيام بين تاريخين",
        "العد التنازلي",
        "إضافة أيام إلى تاريخ",
        "طرح أيام من تاريخ",
        "حاسبة العمر",
        "حساب العمر بالميلادي",
      ],
      faqs: [
        {
          q: "هل يُحتسب تاريخ البداية وتاريخ النهاية معًا؟",
          a: "يحسب الوضع الافتراضي الفاصل بين التاريخين من دون إضافة اليوم الأخير. فعّل «تضمين تاريخ النهاية» إذا كان آخر يوم من الإقامة أو الفعالية جزءًا من المدة.",
        },
        {
          q: "كيف يُحسب عمر المولود في 29 فبراير؟",
          a: "العمر هو عدد السنوات الميلادية المكتملة في التاريخ المرجعي. في السنة غير الكبيسة تعتبر هذه الأداة 28 فبراير تاريخًا مقابلًا لميلاد 29 فبراير. تحقّق من القواعد الرسمية للمهل القانونية.",
        },
        {
          q: "هل تُحفظ التواريخ التي أدخلها؟",
          a: "لا. تبقى التواريخ والنتائج داخل علامة تبويب المتصفح هذه ولا تُرفع إلى خادم ولا تُخزّن.",
        },
      ],
    },
    feature: {
      differenceMode: "الفرق بين تاريخين",
      dateMathMode: "إضافة / طرح",
      ageMode: "حاسبة العمر",
      startDate: "تاريخ البداية",
      endDate: "تاريخ النهاية",
      baseDate: "التاريخ الأساسي",
      birthDate: "تاريخ الميلاد",
      referenceDate: "العمر في تاريخ",
      today: "اليوم",
      includeEndDate: "تضمين تاريخ النهاية",
      includeEndHint: "يضيف آخر يوم ميلادي إلى المدة المحتسبة.",
      operation: "العملية",
      add: "إضافة",
      subtract: "طرح",
      years: "سنوات",
      months: "أشهر",
      weeks: "أسابيع",
      days: "أيام",
      calculate: "احسب",
      resultTitle: "النتيجة",
      totalDays: "إجمالي الأيام",
      calendarDifference: "الفرق بالتقويم",
      weeksAndDays: "الأسابيع والأيام",
      dDay: "العد التنازلي",
      resultingDate: "التاريخ الناتج",
      fullAge: "العمر المكتمل",
      exactAge: "العمر الدقيق",
      livedDays: "إجمالي الأيام منذ الميلاد",
      nextBirthday: "عيد الميلاد التالي",
      calendarNote:
        "يُحسب العمر بالسنوات والأشهر والأيام المكتملة في التقويم الميلادي (الغريغوري).",
      monthEndNote:
        "إذا كان الشهر الناتج أقصر، يُستخدم آخر يوم صالح فيه. تُطبّق السنوات والأشهر قبل الأسابيع والأيام.",
      calculated: "اكتمل الحساب",
      fullAgeTemplate: "{count} سنة مكتملة",
      nextBirthdayTemplate: "{date} — بعد {count} يومًا (العمر {age})",
      birthdayTodayTemplate: "{date} — اليوم (العمر {age})",
      errors: {
        invalidDate: "أدخل تواريخ صحيحة في جميع الحقول المطلوبة.",
        invalidAmount: "استخدم أعدادًا صحيحة من 0 إلى 100,000.",
        birthAfterReference: "يجب ألا يكون تاريخ الميلاد بعد التاريخ المرجعي.",
        outOfRange: "التاريخ الناتج خارج النطاق المدعوم.",
      },
    },
  }),
} satisfies Record<Locale, DateCalculatorTranslation>;

type RouteCopy = Pick<
  DateCalculatorPageSeed,
  "title" | "description" | "mobileDescription" | "terms"
>;

const routeCopy = {
  en: {
    "date-calculator": {
      title: "Date Calculator",
      description:
        "Add or subtract years, months, weeks, and days from a starting date.",
      mobileDescription: "Add or subtract calendar time from a date.",
      terms: ["date calculator", "add days to date", "subtract days from date"],
    },
    "dday-calculator": {
      title: "D-Day Calculator",
      description:
        "Count days between two dates and see the D-Day value, with optional end-date inclusion.",
      mobileDescription: "Count days between dates and calculate D-Day.",
      terms: [
        "D-Day calculator",
        "days between dates",
        "day counter",
        "countdown calculator",
      ],
    },
    "age-calculator": {
      title: "Age Calculator",
      description:
        "Calculate completed age, exact calendar age, days lived, and the next birthday.",
      mobileDescription: "Calculate exact age from a birth date.",
      terms: ["age calculator", "birthday calculator", "exact age calculator"],
    },
  },
  ko: {
    "date-calculator": {
      title: "날짜 계산기",
      description:
        "기준 날짜에 년·월·주·일을 더하거나 빼서 결과 날짜를 계산합니다.",
      mobileDescription: "날짜에 기간을 더하거나 빼서 결과 날짜를 계산합니다.",
      terms: ["날짜 계산기", "날짜 더하기", "날짜 빼기", "날짜 계산"],
    },
    "dday-calculator": {
      title: "디데이 계산기",
      description:
        "두 날짜 사이의 일수와 D-Day를 계산하고 종료일 포함 여부를 선택합니다.",
      mobileDescription: "두 날짜의 차이와 디데이를 계산합니다.",
      terms: [
        "디데이 계산기",
        "D-Day 계산기",
        "날짜 차이 계산기",
        "일수 계산기",
      ],
    },
    "age-calculator": {
      title: "만 나이 계산기",
      description:
        "생년월일과 기준일로 만 나이, 정확한 경과 기간, 다음 생일까지 남은 날을 계산합니다.",
      mobileDescription: "생년월일을 기준으로 만 나이를 계산합니다.",
      terms: ["만 나이 계산기", "만나이 계산기", "나이 계산기", "생일 계산기"],
    },
  },
  ja: {
    "date-calculator": {
      title: "日付計算機",
      description:
        "基準日から年・月・週・日を足し引きして、結果の日付を計算します。",
      mobileDescription: "日付に期間を足し引きして結果を求めます。",
      terms: ["日付計算", "日付計算機", "日付加算", "日付減算"],
    },
    "dday-calculator": {
      title: "日数・D-Day計算機",
      description:
        "2つの日付の間の日数とD-Dayを計算し、終了日を含めるか選べます。",
      mobileDescription: "2つの日付の差とD-Dayを計算します。",
      terms: ["日数計算", "日付差", "D-Day計算", "日数カウント"],
    },
    "age-calculator": {
      title: "年齢計算機",
      description:
        "生年月日と基準日から満年齢、正確な経過期間、次の誕生日までの日数を計算します。",
      mobileDescription: "生年月日から正確な年齢を計算します。",
      terms: ["年齢計算", "年齢計算機", "満年齢計算", "誕生日計算"],
    },
  },
  "zh-TW": {
    "date-calculator": {
      title: "日期計算機",
      description: "在基準日期加上或減去年、月、週與日，計算結果日期。",
      mobileDescription: "在日期加減一段時間並計算結果。",
      terms: ["日期計算機", "日期加減", "日期加天數", "日期減天數"],
    },
    "dday-calculator": {
      title: "日期差與倒數日計算機",
      description: "計算兩個日期之間的天數與倒數日，並可選擇是否包含結束日。",
      mobileDescription: "計算兩個日期的相差天數與倒數日。",
      terms: ["日期差計算", "相差天數", "倒數日計算", "天數計算機"],
    },
    "age-calculator": {
      title: "年齡計算機",
      description:
        "依出生日期與基準日計算實歲、完整經過期間及距離下次生日的天數。",
      mobileDescription: "依出生日期計算精確年齡。",
      terms: ["年齡計算機", "年齡計算", "實歲計算", "歲數計算", "生日計算"],
    },
  },
  de: {
    "date-calculator": {
      title: "Datumsrechner",
      description:
        "Jahre, Monate, Wochen und Tage zu einem Ausgangsdatum addieren oder davon abziehen.",
      mobileDescription: "Kalenderzeit zu einem Datum addieren oder abziehen.",
      terms: ["Datumsrechner", "Datum addieren", "Datum subtrahieren"],
    },
    "dday-calculator": {
      title: "Tages- und Countdown-Rechner",
      description:
        "Tage zwischen zwei Daten und den Countdown berechnen; das Enddatum kann mitgezählt werden.",
      mobileDescription: "Tage zwischen Daten und den Countdown berechnen.",
      terms: ["Tagerechner", "Tage zwischen Daten", "Countdown Rechner"],
    },
    "age-calculator": {
      title: "Altersrechner",
      description:
        "Vollendetes und genaues Alter sowie Lebenstage und den nächsten Geburtstag berechnen.",
      mobileDescription: "Das genaue Alter aus dem Geburtsdatum berechnen.",
      terms: ["Altersrechner", "Alter berechnen", "Geburtstagsrechner"],
    },
  },
  fr: {
    "date-calculator": {
      title: "Calculateur de date",
      description:
        "Ajoutez ou retirez des années, des mois, des semaines et des jours à une date de départ.",
      mobileDescription: "Ajoutez ou retirez une durée à une date.",
      terms: [
        "calculateur de date",
        "ajouter des jours",
        "soustraire des jours",
      ],
    },
    "dday-calculator": {
      title: "Calculateur de jours et de compte à rebours",
      description:
        "Calculez le nombre de jours entre deux dates et le compte à rebours, avec inclusion facultative de la date de fin.",
      mobileDescription:
        "Calculez les jours entre deux dates et le compte à rebours.",
      terms: [
        "calculateur de jours",
        "jours entre deux dates",
        "compte à rebours",
      ],
    },
    "age-calculator": {
      title: "Calculateur d’âge",
      description:
        "Calculez l’âge révolu, l’âge calendaire exact, les jours vécus et le prochain anniversaire.",
      mobileDescription:
        "Calculez l’âge exact à partir de la date de naissance.",
      terms: ["calculateur d'âge", "calcul âge", "calcul anniversaire"],
    },
  },
  es: {
    "date-calculator": {
      title: "Calculadora de fechas",
      description:
        "Suma o resta años, meses, semanas y días a una fecha inicial.",
      mobileDescription: "Suma o resta tiempo de calendario a una fecha.",
      terms: ["calculadora de fechas", "sumar días", "restar días"],
    },
    "dday-calculator": {
      title: "Calculadora de días y cuenta regresiva",
      description:
        "Cuenta los días entre dos fechas y calcula la cuenta regresiva, con la opción de incluir la fecha final.",
      mobileDescription:
        "Cuenta días entre fechas y calcula la cuenta regresiva.",
      terms: ["calculadora de días", "días entre fechas", "cuenta regresiva"],
    },
    "age-calculator": {
      title: "Calculadora de edad",
      description:
        "Calcula la edad cumplida, la edad exacta, los días vividos y el próximo cumpleaños.",
      mobileDescription: "Calcula la edad exacta desde la fecha de nacimiento.",
      terms: [
        "calculadora de edad",
        "calcular edad",
        "calculadora de cumpleaños",
      ],
    },
  },
  "pt-BR": {
    "date-calculator": {
      title: "Calculadora de datas",
      description:
        "Some ou subtraia anos, meses, semanas e dias de uma data inicial.",
      mobileDescription: "Some ou subtraia tempo de calendário de uma data.",
      terms: ["calculadora de datas", "somar dias", "subtrair dias"],
    },
    "dday-calculator": {
      title: "Calculadora de dias e contagem regressiva",
      description:
        "Conte os dias entre duas datas e calcule a contagem regressiva, com opção de incluir a data final.",
      mobileDescription:
        "Conte dias entre datas e calcule a contagem regressiva.",
      terms: ["calculadora de dias", "dias entre datas", "contagem regressiva"],
    },
    "age-calculator": {
      title: "Calculadora de idade",
      description:
        "Calcule a idade completa, a idade exata, os dias vividos e o próximo aniversário.",
      mobileDescription: "Calcule a idade exata pela data de nascimento.",
      terms: [
        "calculadora de idade",
        "calcular idade",
        "calculadora de aniversário",
      ],
    },
  },
  it: {
    "date-calculator": {
      title: "Calcolatore di date",
      description:
        "Aggiungi o sottrai anni, mesi, settimane e giorni a una data iniziale.",
      mobileDescription: "Aggiungi o sottrai tempo di calendario a una data.",
      terms: ["calcolatore di date", "aggiungere giorni", "sottrarre giorni"],
    },
    "dday-calculator": {
      title: "Calcolatore di giorni e conto alla rovescia",
      description:
        "Conta i giorni tra due date e calcola il conto alla rovescia, includendo facoltativamente la data finale.",
      mobileDescription:
        "Conta i giorni tra date e calcola il conto alla rovescia.",
      terms: [
        "calcolatore di giorni",
        "giorni tra due date",
        "conto alla rovescia",
      ],
    },
    "age-calculator": {
      title: "Calcolatore dell’età",
      description:
        "Calcola l’età compiuta, l’età esatta, i giorni vissuti e il prossimo compleanno.",
      mobileDescription: "Calcola l’età esatta dalla data di nascita.",
      terms: ["calcolatore età", "calcolo età", "calcolo compleanno"],
    },
  },
  nl: {
    "date-calculator": {
      title: "Datumcalculator",
      description:
        "Tel jaren, maanden, weken en dagen op bij een begindatum of trek ze ervan af.",
      mobileDescription:
        "Tel kalendertijd op bij een datum of trek die ervan af.",
      terms: ["datumcalculator", "dagen optellen", "dagen aftrekken"],
    },
    "dday-calculator": {
      title: "Dagen- en aftelcalculator",
      description:
        "Bereken dagen tussen twee datums en de aftelling, met de optie om de einddatum mee te tellen.",
      mobileDescription: "Bereken dagen tussen datums en de aftelling.",
      terms: ["dagencalculator", "dagen tussen datums", "aftelcalculator"],
    },
    "age-calculator": {
      title: "Leeftijdscalculator",
      description:
        "Bereken de voltooide en exacte leeftijd, geleefde dagen en de volgende verjaardag.",
      mobileDescription: "Bereken de exacte leeftijd uit de geboortedatum.",
      terms: [
        "leeftijdscalculator",
        "leeftijd berekenen",
        "verjaardag berekenen",
      ],
    },
  },
  pl: {
    "date-calculator": {
      title: "Kalkulator dat",
      description:
        "Dodaj lub odejmij lata, miesiące, tygodnie i dni od daty początkowej.",
      mobileDescription: "Dodaj lub odejmij czas kalendarzowy od daty.",
      terms: ["kalkulator dat", "dodawanie dni", "odejmowanie dni"],
    },
    "dday-calculator": {
      title: "Kalkulator dni i odliczania",
      description:
        "Oblicz liczbę dni między dwiema datami i odliczanie, opcjonalnie z datą końcową.",
      mobileDescription: "Oblicz dni między datami i odliczanie.",
      terms: ["kalkulator dni", "dni między datami", "odliczanie dni"],
    },
    "age-calculator": {
      title: "Kalkulator wieku",
      description:
        "Oblicz ukończony i dokładny wiek, liczbę przeżytych dni oraz następne urodziny.",
      mobileDescription: "Oblicz dokładny wiek z daty urodzenia.",
      terms: ["kalkulator wieku", "obliczanie wieku", "kalkulator urodzin"],
    },
  },
  cs: {
    "date-calculator": {
      title: "Kalkulačka data",
      description:
        "Přičtěte nebo odečtěte roky, měsíce, týdny a dny od počátečního data.",
      mobileDescription: "Přičtěte nebo odečtěte kalendářní dobu od data.",
      terms: ["kalkulačka data", "přičítání dnů", "odečítání dnů"],
    },
    "dday-calculator": {
      title: "Kalkulačka dnů a odpočtu",
      description:
        "Spočítejte dny mezi dvěma daty a odpočet s volitelným zahrnutím koncového data.",
      mobileDescription: "Spočítejte dny mezi daty a odpočet.",
      terms: ["kalkulačka dnů", "dny mezi daty", "odpočet dnů"],
    },
    "age-calculator": {
      title: "Kalkulačka věku",
      description:
        "Spočítejte dokončený i přesný věk, prožité dny a příští narozeniny.",
      mobileDescription: "Spočítejte přesný věk z data narození.",
      terms: ["kalkulačka věku", "výpočet věku", "výpočet narozenin"],
    },
  },
  sv: {
    "date-calculator": {
      title: "Datumräknare",
      description:
        "Lägg till eller dra bort år, månader, veckor och dagar från ett startdatum.",
      mobileDescription: "Lägg till eller dra bort kalendertid från ett datum.",
      terms: ["datumräknare", "lägg till dagar", "dra bort dagar"],
    },
    "dday-calculator": {
      title: "Dag- och nedräkningsräknare",
      description:
        "Räkna dagar mellan två datum och nedräkningen, med val att ta med slutdatumet.",
      mobileDescription: "Räkna dagar mellan datum och nedräkning.",
      terms: ["dagräknare", "dagar mellan datum", "nedräkningsräknare"],
    },
    "age-calculator": {
      title: "Ålderskalkylator",
      description:
        "Beräkna fylld och exakt ålder, levda dagar och nästa födelsedag.",
      mobileDescription: "Beräkna exakt ålder från födelsedatumet.",
      terms: ["ålderskalkylator", "beräkna ålder", "födelsedagsräknare"],
    },
  },
  da: {
    "date-calculator": {
      title: "Datoberegner",
      description:
        "Læg år, måneder, uger og dage til en startdato, eller træk dem fra.",
      mobileDescription: "Læg kalendertid til en dato, eller træk den fra.",
      terms: ["datoberegner", "læg dage til", "træk dage fra"],
    },
    "dday-calculator": {
      title: "Dage- og nedtællingsberegner",
      description:
        "Beregn dage mellem to datoer og nedtællingen med mulighed for at medregne slutdatoen.",
      mobileDescription: "Beregn dage mellem datoer og nedtælling.",
      terms: ["dageberegner", "dage mellem datoer", "nedtællingsberegner"],
    },
    "age-calculator": {
      title: "Aldersberegner",
      description:
        "Beregn fuldført og nøjagtig alder, levede dage og næste fødselsdag.",
      mobileDescription: "Beregn nøjagtig alder ud fra fødselsdatoen.",
      terms: ["aldersberegner", "beregn alder", "fødselsdagsberegner"],
    },
  },
  no: {
    "date-calculator": {
      title: "Datokalkulator",
      description:
        "Legg år, måneder, uker og dager til en startdato, eller trekk dem fra.",
      mobileDescription: "Legg kalendertid til en dato, eller trekk den fra.",
      terms: ["datokalkulator", "legg til dager", "trekk fra dager"],
    },
    "dday-calculator": {
      title: "Dags- og nedtellingskalkulator",
      description:
        "Beregn dager mellom to datoer og nedtellingen, med mulighet for å ta med sluttdatoen.",
      mobileDescription: "Beregn dager mellom datoer og nedtelling.",
      terms: ["dagskalkulator", "dager mellom datoer", "nedtellingskalkulator"],
    },
    "age-calculator": {
      title: "Alderskalkulator",
      description:
        "Beregn fullført og nøyaktig alder, levedager og neste fødselsdag.",
      mobileDescription: "Beregn nøyaktig alder fra fødselsdatoen.",
      terms: ["alderskalkulator", "beregn alder", "fødselsdagskalkulator"],
    },
  },
  tr: {
    "date-calculator": {
      title: "Tarih hesaplama",
      description:
        "Başlangıç tarihine yıl, ay, hafta ve gün ekleyin veya çıkarın.",
      mobileDescription: "Bir tarihe takvim süresi ekleyin veya çıkarın.",
      terms: ["tarih hesaplama", "tarihe gün ekleme", "tarihten gün çıkarma"],
    },
    "dday-calculator": {
      title: "Gün ve geri sayım hesaplama",
      description:
        "İki tarih arasındaki günleri ve geri sayımı, bitiş tarihini dahil etme seçeneğiyle hesaplayın.",
      mobileDescription:
        "Tarihler arasındaki günleri ve geri sayımı hesaplayın.",
      terms: ["gün hesaplama", "iki tarih arası gün", "geri sayım hesaplama"],
    },
    "age-calculator": {
      title: "Yaş hesaplama",
      description:
        "Tamamlanan ve kesin yaşı, yaşanan günleri ve sonraki doğum gününü hesaplayın.",
      mobileDescription: "Doğum tarihinden kesin yaşı hesaplayın.",
      terms: ["yaş hesaplama", "yaş hesaplayıcı", "doğum günü hesaplama"],
    },
  },
  ar: {
    "date-calculator": {
      title: "حاسبة التاريخ",
      description:
        "أضف السنوات والأشهر والأسابيع والأيام إلى تاريخ بداية أو اطرحها منه.",
      mobileDescription: "أضف مدة تقويمية إلى تاريخ أو اطرحها منه.",
      terms: ["حاسبة التاريخ", "إضافة أيام إلى تاريخ", "طرح أيام من تاريخ"],
    },
    "dday-calculator": {
      title: "حاسبة فرق الأيام والعد التنازلي",
      description:
        "احسب الأيام بين تاريخين والعد التنازلي، مع خيار احتساب تاريخ النهاية.",
      mobileDescription: "احسب الأيام بين تاريخين والعد التنازلي.",
      terms: ["حاسبة فرق الأيام", "الأيام بين تاريخين", "حاسبة العد التنازلي"],
    },
    "age-calculator": {
      title: "حاسبة العمر",
      description:
        "احسب العمر المكتمل والدقيق، وأيام العمر، وموعد عيد الميلاد التالي.",
      mobileDescription: "احسب العمر الدقيق من تاريخ الميلاد.",
      terms: ["حاسبة العمر", "حساب العمر", "حاسبة عيد الميلاد"],
    },
  },
} satisfies Record<Locale, Record<DateCalculatorPageId, RouteCopy>>;

export function dateCalculatorFor(locale: Locale): DateCalculatorLocaleSeed {
  const translation = translations[locale];
  const localRoutes = routeCopy[locale];
  const page = (id: DateCalculatorPageId): DateCalculatorPageSeed => ({
    ...localRoutes[id],
    guide: translation.page.guide,
    faqs: translation.page.faqs,
  });
  return {
    pages: {
      "date-calculator": page("date-calculator"),
      "dday-calculator": page("dday-calculator"),
      "age-calculator": page("age-calculator"),
    },
    feature: translation.feature,
  };
}
