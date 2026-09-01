import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";
import { dateCalculatorFor } from "./date-calculator";
import { timeZoneConverterFor } from "./time-zone-converter";
import { calculatorSuiteFor } from "./calculator-suite";
import { uuidGeneratorFor } from "./uuid-generator";
import { imageResizerFor } from "./image-resizer";

const backgroundRemover = backgroundRemoverFor("ar");

const seed = {
  locale: "ar",
  formatterSubnet: formatterSubnetFor("ar"),
  background: backgroundRemover.copy,
  imageResizer: imageResizerFor("ar"),
  dateCalculator: dateCalculatorFor("ar"),
  timeZoneConverter: timeZoneConverterFor("ar"),
  calculatorSuite: calculatorSuiteFor("ar"),
  uuidGenerator: uuidGeneratorFor("ar"),
  ui: {
    clear: "مسح",
    copy: "نسخ",
    download: "تنزيل",
    openFile: "فتح ملف",
    chooseImage: "اختيار صورة",
    dropFile: "أفلت صورة هنا.",
    ready: "جاهز",
    working: "جارٍ العمل…",
    complete: "اكتمل",
    unchanged: "لا حاجة إلى تغيير",
    outdated: "النتيجة قديمة",
    copied: "تم النسخ",
    copyFailed: "تعذر النسخ",
    tooLarge: "حجم الإدخال كبير جدًا بحيث لا يمكن معالجته بأمان.",
    failed: "فشلت المعالجة. تحقق من الإدخال وحاول مرة أخرى.",
    resultHere: "ستظهر النتيجة هنا.",
    localTitle: "تتم المعالجة في هذا المتصفح فقط",
    localBody:
      "لا تُرفع مدخلاتك أو نتائجك ولا تُخزَّن؛ بل تبقى داخل علامة تبويب المتصفح هذه.",
    guideTitle: "كيفية استخدام ⁨{name}⁩",
    safetyTitle: "معالجة محلية داخل المتصفح",
    faqWhat: "ما وظيفة ⁨{name}⁩؟",
    faqPrivacy: "هل يتم رفع بياناتي؟",
    faqCheck: "ما الذي ينبغي التحقق منه عند استخدام ⁨{name}⁩؟",
  },
  ai: {
    input: "النص الأصلي",
    output: "النص المنظَّف",
    placeholder: "الصق نصًا قد يحتوي على محارف Unicode مخفية.",
    run: "تنظيف المحارف المخفية",
    report: "تقرير الإزالة",
    removed: "المحارف التي تمت إزالتها",
    normalized: "المسافات التي تم توحيدها",
    noChanges: "لم يتم العثور على أي من المحارف المخفية المستهدفة.",
    count: "تمت إزالة {count}",
    advanced: "خيارات Unicode المتقدمة",
    advancedWarning:
      "قد تغيّر هذه الخيارات التهجئة أو الرموز التعبيرية أو تشكيل النص. لا تفعّلها إلا إذا كنت تفهم بنية النص المصدر.",
    joinControls: "إزالة ZWJ وZWNJ",
    joinWarning:
      "قد يؤدي ذلك إلى كسر تسلسلات الرموز التعبيرية وتشكيل النص العربي أو الفارسي أو الهندي.",
    variationSelectors: "إزالة محددات الشكل",
    variationWarning: "قد يغيّر ذلك مظهر الرموز التعبيرية أو محارف CJK.",
    combiningMarks: "إزالة علامات التشكيل المركبة",
    combiningWarning: "قد يزيل ذلك النبرات والحركات وعلامات أخرى ذات معنى.",
    noBreakSpaces: "توحيد المسافات غير القابلة للكسر",
    noBreakNote: "يحوّل محارف المسافات الشبيهة بـ NBSP إلى مسافات عادية.",
    kinds: [
      "مسافة بعرض صفري",
      "واصل الكلمات",
      "علامة ترتيب البايت",
      "واصلة اختيارية",
      "محرف تحكم ثنائي الاتجاه",
      "فاصل غير مرئي",
      "محرف تحكم في الوصل",
      "محدد الشكل",
      "علامة تشكيل مركبة",
      "مسافة غير قابلة للكسر أو مسافة بعرض رقم",
      "مسافة ضيقة غير قابلة للكسر",
    ],
  },
  url: {
    mode: "وضع تحويل URL",
    encode: "ترميز",
    decode: "فك الترميز",
    encodeInput: "النص أو عنوان URL المراد ترميزه",
    decodeInput: "قيمة URL مرمّزة",
    encodeOutput: "نتيجة الترميز",
    decodeOutput: "نتيجة فك الترميز",
    encodePlaceholder: "مثال: https://example.com/search?q=hello world",
    decodePlaceholder: "مثال: hello%20world%3Fpage%3D1",
    scope: "نطاق الترميز",
    component: "مكوّن URL",
    uri: "URI كامل",
    formSpace: "استخدام + للمسافات في بيانات النماذج",
    recursive: "تكرار فك الترميز",
    passLimit: "الحد الأقصى للمرات",
    encoded: "اكتمل ترميز URL",
    decoded: "اكتمل فك ترميز URL",
    passCount: "تم فك الترميز في {count} مرة",
    limitReached: "ما زالت هناك طبقات مرمّزة بعد بلوغ الحد الأقصى.",
    errors: [
      "أدخل قيمة أولًا.",
      "تسلسل الهروب المئوي ناقص أو غير صالح.",
      "البايتات بعد فك الترميز ليست UTF-8 صالحة.",
      "اختر حدًا بين 1 و10 مرات.",
    ],
  },
  hash: {
    input: "نص أو ملف",
    placeholder: "أدخل نصًا لحساب قيم SHA-256 وSHA-512 وSHA-1 وMD5.",
    results: "قيم التجزئة",
    resultLabel: "قيمة تجزئة {algorithm}",
    copyLabel: "نسخ تجزئة {algorithm}",
    fileSelected: "المحدد: {name} ({size})",
    drop: "أفلت ملفًا هنا لحساب تجزئته محليًا.",
    textTooLarge: "النص كبير جدًا لجلسة المتصفح هذه.",
    fileTooLarge: "يتجاوز الملف حد الأمان للمعالجة المحلية.",
    legacyWarning:
      "يتوفر MD5 وSHA-1 للتحقق من التوافق فقط، وليس لتخزين كلمات المرور أو تصميم أنظمة أمان جديدة.",
    expectedChecksum: "قيمة التحقق المتوقعة",
    checksumMatch: "متطابقة",
    checksumMismatch: "غير متطابقة",
    checksumInvalid: "أدخل قيمة تحقق سداسية عشرية مدعومة.",
    empty: "أدخل نصًا أو اختر ملفًا أولًا.",
    unavailable: "لا يستطيع هذا المتصفح حساب إحدى قيم التجزئة المطلوبة.",
  },
  jwt: {
    input: "رمز JWT",
    placeholder: "الصق JWT من ثلاثة أجزاء: header.payload.signature",
    header: "الترويسة",
    payload: "الحمولة",
    signature: "التوقيع",
    copyHeader: "نسخ ترويسة JWT المفكوكة",
    copyPayload: "نسخ حمولة JWT المفكوكة",
    copySignature: "نسخ بايتات توقيع JWT",
    signatureBytes: "{count} بايت",
    timestamps: "مطالبات الطابع الزمني",
    expires: "انتهاء الصلاحية (exp)",
    notBefore: "ليس قبل (nbf)",
    issuedAt: "وقت الإصدار (iat)",
    invalidTimestamp: "هذه المطالبة ليست طابعًا زمنيًا رقميًا صالحًا.",
    noTimestamps: "لم يتم العثور على مطالبات exp أو nbf أو iat.",
    noVerifyTitle: "لم يتم التحقق من التوقيع",
    noVerifyBody:
      "يكشف فك الترميز محتوى الرمز فقط، ولا يثبت الجهة التي أصدرته أو صحة التوقيع.",
    errors: [
      "الصق JWT أولًا.",
      "يجب أن يحتوي JWT على ثلاثة أجزاء تفصل بينها نقاط بالضبط.",
      "ترويسة JWT فارغة.",
      "حمولة JWT فارغة.",
      "أحد المقاطع ليس Base64URL صالحًا.",
      "أحد المقاطع ليس UTF-8 صالحًا.",
      "الترويسة ليست JSON صالحًا.",
      "الحمولة ليست JSON صالحًا.",
      "يجب أن تكون الترويسة كائن JSON.",
      "يجب أن تكون الحمولة كائن JSON.",
    ],
  },
  qr: {
    input: "نص أو عنوان URL",
    placeholder: "أدخل النص أو عنوان URL المراد وضعه في رمز QR.",
    preview: "معاينة رمز QR",
    previewEmpty: "أدخل محتوى لإنشاء رمز QR.",
    options: "خيارات رمز QR",
    correction: "تصحيح الأخطاء",
    correctionLevels: ["منخفض (L)", "متوسط (M)", "ربعي (Q)", "عالٍ (H)"],
    quietZone: "الهامش الهادئ",
    quietZones: ["بلا هامش", "وحدتان", "4 وحدات (موصى به)", "8 وحدات"],
    generate: "إنشاء رمز QR",
    png: "تنزيل PNG",
    svg: "تنزيل SVG",
    empty: "أدخل نصًا أو عنوان URL أولًا.",
    tooLong: "المحتوى طويل جدًا لمستوى تصحيح الأخطاء هذا.",
    generationFailed: "تعذر إنشاء رمز QR.",
    downloadFailed: "تعذر تجهيز الصورة للتنزيل.",
    upload: "صورة رمز QR",
    formats: "PNG أو JPEG أو WebP أو GIF أو BMP حتى 10 MB",
    camera: "ماسح الكاميرا",
    cameraHint:
      "اسمح بالوصول إلى الكاميرا للمسح المتواصل. لا تُفتح عناوين URL المفكوكة تلقائيًا أبدًا.",
    startCamera: "تشغيل الكاميرا",
    stopCamera: "إيقاف الكاميرا",
    scanResult: "المحتوى المفكوك",
    scanPlaceholder: "سيظهر النص الممسوح هنا.",
    urlDetected: "تم اكتشاف URL",
    openUrl: "فتح الرابط",
    urlDialogTitle: "هل تريد فتح هذا الرابط؟",
    urlDialogBody:
      "تم العثور على هذا الرابط في رمز QR. تحقق من أنه آمن وينتمي إلى الموقع الذي تتوقعه.",
    urlDialogDestination: "عنوان الوجهة",
    cancel: "إلغاء",
    reading: "جارٍ قراءة الصورة…",
    starting: "جارٍ تشغيل الكاميرا…",
    scanning: "جارٍ البحث عن رمز QR…",
    invalidImage: "اختر صورة صالحة بتنسيق مدعوم.",
    noCode: "لم يتم العثور على رمز QR قابل للقراءة في هذه الصورة.",
    unsupported: "المسح بالكاميرا غير مدعوم في هذا المتصفح.",
    denied: "تم رفض إذن الكاميرا.",
    unavailable: "لا توجد كاميرا مناسبة.",
    scanFailed: "تعذر مسح رمز QR.",
  },
  data: {
    convert: "تحويل",
    inputPlaceholder: "الصق البيانات المصدر هنا.",
    outputPlaceholder: "سيظهر الناتج المحوّل هنا.",
    drop: "أفلت ملفًا نصيًا مدعومًا هنا.",
    readFailed: "تعذرت قراءة الملف.",
    errorAt: "⁨{message}⁩ السطر ⁨{line}⁩، العمود ⁨{column}⁩.",
    delimiter: "فاصل CSV",
    auto: "اكتشاف تلقائي",
    comma: "فاصلة (,)",
    semicolon: "فاصلة منقوطة (;)",
    tab: "علامة تبويب",
    pipe: "شرطة عمودية (|)",
    firstHeader: "استخدام الصف الأول كترويسة",
    pretty: "تنسيق JSON بمسافات بادئة",
    errors: [
      "يحتوي CSV على علامة اقتباس غير مغلقة أو حقل مشوّه.",
      "لم يتم العثور على جدول Markdown يحتوي على صف فاصل.",
      "جدول Markdown مشوّه.",
      "الإدخال ليس JSON صالحًا.",
      "يجب أن يكون JSON مصفوفة من الكائنات.",
      "إحدى ترويسات CSV فارغة.",
      "يجب ألا تتكرر ترويسات CSV.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "مزيل العلامة المائية النصية للذكاء الاصطناعي",
      description:
        "يعثر على آثار الأحرف المخفية التي قد تختلط بالنص المنسوخ من ChatGPT أو Claude أو Gemini أو الويب وينظفها. لا يحدد ما إذا كان النص مولدًا بالذكاء الاصطناعي ولا يضمن تجاوز أدوات الكشف.",
      guide:
        "الصق النص وراجع النتيجة المنظَّفة أولًا، ثم افحص أسماء المحارف الدقيقة وأعدادها ونقاطها البرمجية U+. تظل الخيارات التي قد تؤثر في تشكيل النص معطلة افتراضيًا.",
      terms: [
        "إزالة العلامة المائية للذكاء الاصطناعي",
        "علامة مائية نصية للذكاء الاصطناعي",
        "أحرف ChatGPT المخفية",
        "أحرف Claude المخفية",
        "أحرف Gemini المخفية",
        "إزالة أحرف العرض الصفري",
      ],
    },
    "url-encode": {
      title: "أداة ترميز URL",
      description:
        "يرمّز النصوص أو قيم الاستعلام أو عناوين URI الكاملة ترميزًا مئويًا وفق قواعد الويب القياسية.",
      guide:
        "اختر مكوّن URL لقيمة استعلام واحدة، أو URI كاملًا للإبقاء على فواصل العنوان. فعّل علامة الجمع للمسافات في بيانات النماذج فقط.",
      terms: [
        "ترميز URL",
        "الترميز المئوي",
        "encodeURIComponent",
        "سلسلة الاستعلام",
      ],
    },
    "url-decode": {
      title: "أداة فك ترميز URL",
      description:
        "تفك ترميز عناوين URL وقيم الاستعلام المرمّزة مئويًا، مع وضع اختياري متعدد المرات ضمن حد محدد.",
      guide:
        "الصق القيمة المرمّزة واختر نطاقها، ولا تستخدم فك الترميز المتكرر إلا عندما تعرف أن المصدر يحتوي على ترميز متداخل.",
      terms: [
        "فك ترميز URL",
        "فك الترميز المئوي",
        "decodeURIComponent",
        "سلسلة الاستعلام",
      ],
    },
    "hash-generator": {
      title: "مولّد التجزئة",
      description:
        "يحسب محليًا قيم تحقق SHA-256 وSHA-512 وSHA-1 وMD5 للنصوص أو الملفات.",
      guide:
        "أدخل نصًا أو اختر ملفًا، ثم قارن قيمة الخوارزمية المطلوبة بدقة. تثبت التجزئة تطابق البيانات، لكنها لا تشفّرها ولا تخزّن كلمات المرور بأمان بمفردها.",
      terms: [
        "مولد التجزئة",
        "إنشاء SHA-256",
        "حساب التجزئة",
        "SHA-256",
        "SHA-512",
        "MD5",
        "قيمة تحقق",
        "تجزئة ملف",
      ],
    },
    "jwt-decoder": {
      title: "أداة فك JWT",
      description:
        "تفك ترويسة JWT وحمولته وبايتات توقيعه ومطالبات الوقت من دون رفع الرمز.",
      guide:
        "افحص JSON والطوابع الزمنية المفكوكة، لكن تحقّق من التوقيع والمطالبات داخل النظام الذي يملك مفتاح التوقيع. فك الترميز وحده لا يثبت الثقة.",
      terms: ["فك JWT", "JSON Web Token", "حمولة JWT", "ترويسة JWT"],
    },
    "qr-code-generator": {
      title: "مولّد رمز QR",
      description:
        "ينشئ رمز QR ثابتًا ومتوافقًا مع المعايير لنص أو عنوان URL، مع تنزيله بصيغة PNG أو SVG.",
      guide:
        "أدخل المحتوى بدقة، واحتفظ بهامش هادئ من أربع وحدات لضمان سهولة المسح، وارفع مستوى تصحيح الأخطاء إذا كان جزء من الرمز قد يُحجب.",
      terms: ["مولّد رمز QR", "QR PNG", "QR SVG", "QR ثابت"],
    },
    "qr-code-scanner": {
      title: "ماسح رمز QR",
      description:
        "يقرأ رمز QR محليًا من صورة أو كاميرا من دون فتح الروابط المفكوكة تلقائيًا.",
      guide:
        "استخدم صورة واضحة وجيدة الإضاءة يظهر فيها الهامش الهادئ كاملًا. راجع القيمة المفكوكة وانسخها قبل تقرير ما إذا كان عنوان URL آمنًا.",
      terms: ["ماسح رمز QR", "مسح صورة QR", "قارئ QR بالكاميرا", "فك QR"],
    },
    "csv-to-markdown": {
      title: "تحويل CSV إلى Markdown",
      description:
        "يحوّل صفوف CSV إلى جدول Markdown منسّق مع اكتشاف الفاصل ومعالجة المحارف الخاصة في الخلايا.",
      guide:
        "تحقق من الفاصل ومن استخدام الصف الأول كترويسة. تتحول الخلايا متعددة الأسطر إلى فواصل أسطر آمنة للجدول، وتتم معالجة الشرطات العمودية.",
      inputLabel: "إدخال CSV",
      outputLabel: "جدول Markdown",
      inputPlaceholder: "الاسم,النتيجة\nAri,92",
      terms: ["CSV إلى Markdown", "جدول Markdown", "محول CSV"],
    },
    "markdown-to-csv": {
      title: "تحويل Markdown إلى CSV",
      description:
        "يحوّل جدول Markdown إلى CSV متوافق مع جداول البيانات وأدوات البيانات.",
      guide:
        "أدرج صف ترويسة وصف فاصل في جدول Markdown، ثم اختر الفاصل الذي يتطلبه التطبيق الوجهة.",
      inputLabel: "جدول Markdown",
      outputLabel: "ناتج CSV",
      inputPlaceholder: "| الاسم | النتيجة |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown إلى CSV", "جدول إلى CSV", "محول Markdown"],
    },
    "json-to-csv": {
      title: "تحويل JSON إلى CSV",
      description:
        "يحوّل مصفوفة كائنات JSON إلى CSV باتحاد ثابت لمفاتيح الكائنات.",
      guide:
        "استخدم مصفوفة كائنات في المستوى الأعلى. تُحفظ القيم المتداخلة كسلاسل JSON مختصرة، لذا تحقق من طريقة تعامل جدول البيانات الوجهة معها.",
      inputLabel: "مصفوفة JSON",
      outputLabel: "ناتج CSV",
      inputPlaceholder: '[{"الاسم":"Ari","النتيجة":92}]',
      terms: ["JSON إلى CSV", "مصفوفة JSON إلى CSV", "محول بيانات"],
    },
    "csv-to-json": {
      title: "تحويل CSV إلى JSON",
      description:
        "يحوّل CSV إلى مصفوفة كائنات JSON مستخدمًا الصف الأول لأسماء الحقول.",
      guide:
        "اجعل كل ترويسة غير فارغة وفريدة. راجع اكتشاف الفاصل قبل تحويل بيانات تحتوي على فواصل أو علامات اقتباس أو خلايا متعددة الأسطر.",
      inputLabel: "إدخال CSV",
      outputLabel: "مصفوفة JSON",
      inputPlaceholder: "الاسم,النتيجة\nAri,92",
      terms: ["CSV إلى JSON", "محلل CSV", "مصفوفة JSON"],
    },
    "html-to-markdown": {
      title: "تحويل HTML إلى Markdown",
      description:
        "يحوّل بنية HTML إلى Markdown مقروء، بما فيها العناوين والروابط والقوائم والشيفرات والجداول.",
      guide:
        "الصق جزء HTML الذي تريد تحويله. راجع التخطيطات المعقدة والمحتوى المضمّن لأن Markdown لا يستطيع تمثيل كل سلوكيات HTML.",
      inputLabel: "إدخال HTML",
      outputLabel: "ناتج Markdown",
      inputPlaceholder: "<h1>عنوان</h1><p>مرحبًا <strong>بالعالم</strong>.</p>",
      terms: [
        "HTML إلى Markdown",
        "تحويل HTML إلى Markdown",
        "محول HTML إلى Markdown",
      ],
    },
    "markdown-to-html": {
      title: "تحويل Markdown إلى HTML",
      description:
        "يعرض Markdown بصيغة HTML مع جداول GFM والقوائم والروابط وكتل الشيفرة المسيّجة الشائعة.",
      guide:
        "حوّل Markdown الذي تنوي استخدامه فقط، ثم طهّر HTML مرة أخرى قبل إدراج ناتج غير موثوق به في صفحة ويب.",
      inputLabel: "إدخال Markdown",
      outputLabel: "ناتج HTML",
      inputPlaceholder: "# عنوان\n\nمرحبًا **بالعالم**.",
      terms: ["Markdown إلى HTML", "عارض Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
