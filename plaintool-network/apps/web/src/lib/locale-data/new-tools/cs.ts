import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";

const backgroundRemover = backgroundRemoverFor("cs");

const seed = {
  formatterSubnet: formatterSubnetFor("cs"),
  background: backgroundRemover.copy,
  ui: {
    clear: "Vymazat",
    copy: "Kopírovat",
    download: "Stáhnout",
    openFile: "Otevřít soubor",
    chooseImage: "Vybrat obrázek",
    dropFile: "Přetáhněte sem obrázek.",
    ready: "Připraveno",
    working: "Pracuji…",
    complete: "Dokončeno",
    unchanged: "Není třeba nic měnit",
    outdated: "Výsledek je zastaralý",
    copied: "Zkopírováno",
    copyFailed: "Kopírování se nezdařilo",
    tooLarge: "Vstup je příliš velký pro bezpečné zpracování.",
    failed: "Zpracování se nezdařilo. Zkontrolujte vstup a zkuste to znovu.",
    resultHere: "Zde se zobrazí výsledek.",
    localTitle: "Zpracování pouze v tomto prohlížeči",
    localBody:
      "Vstup ani výsledky se nenahrávají ani neukládají. Zůstávají na této kartě prohlížeče.",
    guideTitle: "Jak používat {name}",
    safetyTitle: "Soukromé místní zpracování",
    faqWhat: "Co dělá {name}?",
    faqPrivacy: "Nahrávají se má data?",
    faqCheck: "Co mám při používání nástroje {name} zkontrolovat?",
  },
  ai: {
    input: "Původní text",
    output: "Vyčištěný text",
    placeholder: "Vložte text, který může obsahovat skryté znaky Unicode.",
    run: "Odstranit skryté znaky",
    report: "Přehled odstranění",
    removed: "Odstraněné znaky",
    normalized: "Normalizované mezery",
    noChanges: "Nebyly nalezeny žádné z vybraných skrytých znaků.",
    count: "Odstraněno: {count}",
    advanced: "Pokročilé možnosti Unicode",
    advancedWarning:
      "Tyto možnosti mohou změnit pravopis, emoji nebo tvarování písma. Zapněte je pouze tehdy, když rozumíte zdrojovému textu.",
    joinControls: "Odstranit ZWJ a ZWNJ",
    joinWarning:
      "Může narušit sekvence emoji a tvarování arabského, perského nebo indického písma.",
    variationSelectors: "Odstranit selektory variant",
    variationWarning: "Může změnit vzhled emoji nebo znaků CJK.",
    combiningMarks: "Odstranit kombinační znaky",
    combiningWarning:
      "Může odstranit diakritiku, samohlásková znaménka a další významové znaky.",
    noBreakSpaces: "Normalizovat nezlomitelné mezery",
    noBreakNote: "Převede mezery podobné NBSP na běžné mezery.",
    kinds: [
      "Mezera nulové šířky",
      "Spojovač slov",
      "Značka pořadí bajtů",
      "Volitelný spojovník",
      "Řídicí znak obousměrného textu",
      "Neviditelný oddělovač",
      "Řízení spojování",
      "Selektor variant",
      "Kombinační znak",
      "Nezlomitelná nebo číselná mezera",
      "Úzká nezlomitelná mezera",
    ],
  },
  url: {
    mode: "Režim převodu URL",
    encode: "Zakódovat",
    decode: "Dekódovat",
    encodeInput: "Text nebo URL ke kódování",
    decodeInput: "Zakódovaná hodnota URL",
    encodeOutput: "Zakódovaný výsledek",
    decodeOutput: "Dekódovaný výsledek",
    encodePlaceholder: "Příklad: https://example.com/search?q=ahoj světe",
    decodePlaceholder: "Příklad: ahoj%20světe%3Fstrana%3D1",
    scope: "Rozsah kódování",
    component: "Součást URL",
    uri: "Úplné URI",
    formSpace: "Použít + pro mezery ve formulářových datech",
    recursive: "Dekódovat opakovaně",
    passLimit: "Maximální počet průchodů",
    encoded: "Kódování URL dokončeno",
    decoded: "Dekódování URL dokončeno",
    passCount: "Dekódováno v {count} průchodu/průchodech",
    limitReached:
      "Po dosažení limitu průchodů zbývají další zakódované vrstvy.",
    errors: [
      "Nejprve zadejte hodnotu.",
      "Procentní sekvence je neúplná nebo neplatná.",
      "Dekódované bajty nejsou platné UTF-8.",
      "Zvolte limit průchodů od 1 do 10.",
    ],
  },
  hash: {
    input: "Text nebo soubor",
    placeholder:
      "Zadejte text pro výpočet hashů SHA-256, SHA-512, SHA-1 a MD5.",
    results: "Hodnoty hash",
    resultLabel: "Hash {algorithm}",
    copyLabel: "Kopírovat hash {algorithm}",
    fileSelected: "Vybráno: {name} ({size})",
    drop: "Přetáhněte sem soubor a vypočítejte jeho hash místně.",
    textTooLarge: "Text je pro tuto relaci prohlížeče příliš velký.",
    fileTooLarge: "Soubor překračuje místní bezpečnostní limit.",
    legacyWarning:
      "MD5 a SHA-1 jsou určeny ke kontrole kompatibility, nikoli k ukládání hesel nebo návrhu nového zabezpečení.",
    expectedChecksum: "Očekávaný kontrolní součet",
    checksumMatch: "Shoda",
    checksumMismatch: "Neshoda",
    checksumInvalid: "Zadejte podporovaný šestnáctkový kontrolní součet.",
    empty: "Nejprve zadejte text nebo vyberte soubor.",
    unavailable: "Prohlížeč nedokáže vypočítat jeden z požadovaných hashů.",
  },
  jwt: {
    input: "Token JWT",
    placeholder: "Vložte třídílný JWT: header.payload.signature",
    header: "Hlavička",
    payload: "Datová část",
    signature: "Podpis",
    copyHeader: "Kopírovat dekódovanou hlavičku JWT",
    copyPayload: "Kopírovat dekódovanou datovou část JWT",
    copySignature: "Kopírovat bajty podpisu JWT",
    signatureBytes: "{count} bajtů",
    timestamps: "Časové deklarace",
    expires: "Vyprší (exp)",
    notBefore: "Platí od (nbf)",
    issuedAt: "Vydáno (iat)",
    invalidTimestamp: "Tato deklarace není platné číselné časové razítko.",
    noTimestamps: "Nebyly nalezeny deklarace exp, nbf ani iat.",
    noVerifyTitle: "Podpis nebyl ověřen",
    noVerifyBody:
      "Dekódování pouze odhalí obsah tokenu. Nedokazuje, kdo token vydal, ani zda je podpis platný.",
    errors: [
      "Nejprve vložte JWT.",
      "JWT musí obsahovat přesně tři části oddělené tečkami.",
      "Hlavička JWT je prázdná.",
      "Datová část JWT je prázdná.",
      "Segment není platný Base64URL.",
      "Segment není platné UTF-8.",
      "Hlavička není platný JSON.",
      "Datová část není platný JSON.",
      "Hlavička musí být objekt JSON.",
      "Datová část musí být objekt JSON.",
    ],
  },
  qr: {
    input: "Text nebo URL",
    placeholder: "Zadejte text nebo URL, které chcete vložit do QR kódu.",
    preview: "Náhled QR kódu",
    previewEmpty: "Zadejte obsah pro vytvoření QR kódu.",
    options: "Možnosti QR kódu",
    correction: "Oprava chyb",
    correctionLevels: [
      "Nízká (L)",
      "Střední (M)",
      "Kvartilová (Q)",
      "Vysoká (H)",
    ],
    quietZone: "Ochranná zóna",
    quietZones: ["Žádná", "2 moduly", "4 moduly (doporučeno)", "8 modulů"],
    generate: "Vytvořit QR kód",
    png: "Stáhnout PNG",
    svg: "Stáhnout SVG",
    empty: "Nejprve zadejte text nebo URL.",
    tooLong: "Obsah je pro tuto úroveň opravy chyb příliš dlouhý.",
    generationFailed: "QR kód se nepodařilo vytvořit.",
    downloadFailed: "Obrázek se nepodařilo připravit ke stažení.",
    upload: "Obrázek QR kódu",
    formats: "PNG, JPEG, WebP, GIF nebo BMP do 10 MB",
    camera: "Skener fotoaparátem",
    cameraHint:
      "Povolte přístup k fotoaparátu pro průběžné skenování. Dekódované URL se nikdy neotevírají automaticky.",
    startCamera: "Spustit fotoaparát",
    stopCamera: "Zastavit fotoaparát",
    scanResult: "Dekódovaný obsah",
    scanPlaceholder: "Zde se zobrazí naskenovaný text.",
    urlDetected: "Zjištěna URL",
    openUrl: "Otevřít URL",
    urlDialogTitle: "Otevřít tuto adresu URL?",
    urlDialogBody:
      "Tato adresa URL byla nalezena v QR kódu. Ověřte, že je bezpečná a patří webu, který očekáváte.",
    urlDialogDestination: "Cílová adresa",
    cancel: "Zrušit",
    reading: "Načítání obrázku…",
    starting: "Spouštění fotoaparátu…",
    scanning: "Hledání QR kódu…",
    invalidImage: "Vyberte platný obrázek v podporovaném formátu.",
    noCode: "V obrázku nebyl nalezen čitelný QR kód.",
    unsupported: "Tento prohlížeč nepodporuje skenování fotoaparátem.",
    denied: "Přístup k fotoaparátu byl zamítnut.",
    unavailable: "Není k dispozici vhodný fotoaparát.",
    scanFailed: "QR kód se nepodařilo naskenovat.",
  },
  data: {
    convert: "Převést",
    inputPlaceholder: "Sem vložte zdrojová data.",
    outputPlaceholder: "Zde se zobrazí převedený výstup.",
    drop: "Přetáhněte sem podporovaný textový soubor.",
    readFailed: "Soubor se nepodařilo načíst.",
    errorAt: "{message} Řádek {line}, sloupec {column}.",
    delimiter: "Oddělovač CSV",
    auto: "Zjistit automaticky",
    comma: "Čárka (,)",
    semicolon: "Středník (;)",
    tab: "Tabulátor",
    pipe: "Svislá čára (|)",
    firstHeader: "Použít první řádek jako hlavičku",
    pretty: "Formátovat JSON s odsazením",
    errors: [
      "CSV obsahuje neuzavřenou uvozovku nebo chybnou položku.",
      "Nebyla nalezena tabulka Markdown s oddělovacím řádkem.",
      "Tabulka Markdown je poškozená.",
      "Vstup není platný JSON.",
      "JSON musí být pole objektů.",
      "Hlavička CSV je prázdná.",
      "Hlavičky CSV musí být jedinečné.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Odstraňovač AI vodoznaků a skrytých znaků",
      description:
        "Vyhledá a odstraní skutečné skryté znaky Unicode, které se často zkopírují z GPT, Claude, PDF nebo webových stránek. Tento nástroj neurčuje, zda text vytvořila AI.",
      guide:
        "Vložte text, nejprve zkontrolujte vyčištěný výsledek a poté přesné názvy znaků, jejich počty a kódové body U+. Rizikové možnosti ovlivňující tvarování písma jsou ve výchozím nastavení vypnuté.",
      terms: [
        "odstranění AI vodoznaku",
        "skryté znaky GPT",
        "skryté znaky Claude",
        "mezera nulové šířky",
        "čištění Unicode",
      ],
    },
    "url-encode": {
      title: "Kodér URL",
      description:
        "Procentně kóduje text, hodnoty dotazu nebo celé URI podle standardních pravidel webu.",
      guide:
        "Pro jednu hodnotu dotazu zvolte součást URL, nebo celé URI, chcete-li zachovat oddělovače URL. Plus pro mezery zapínejte pouze pro formulářová data.",
      terms: [
        "kódování URL",
        "procentní kódování",
        "encodeURIComponent",
        "řetězec dotazu",
      ],
    },
    "url-decode": {
      title: "Dekodér URL",
      description:
        "Dekóduje procentně zakódované URL a hodnoty dotazu s volitelným omezeným počtem průchodů.",
      guide:
        "Vložte zakódovanou hodnotu, zvolte její rozsah a opakované dekódování použijte jen u zdroje se známým vnořeným kódováním.",
      terms: [
        "dekódování URL",
        "procentní dekódování",
        "decodeURIComponent",
        "řetězec dotazu",
      ],
    },
    "hash-generator": {
      title: "Generátor hashů",
      description:
        "Místně vypočítá kontrolní součty SHA-256, SHA-512, SHA-1 a MD5 pro text nebo soubory.",
      guide:
        "Zadejte text nebo vyberte soubor a přesně porovnejte požadovaný algoritmus. Hash ověřuje shodu; sám data nešifruje ani bezpečně neukládá hesla.",
      terms: ["SHA-256", "SHA-512", "MD5", "kontrolní součet", "hash souboru"],
    },
    "jwt-decoder": {
      title: "Dekodér JWT",
      description:
        "Dekóduje hlavičku, datovou část, bajty podpisu a časové deklarace JWT bez nahrávání tokenu.",
      guide:
        "Prohlédněte dekódovaný JSON a časová razítka, ale podpisy a deklarace ověřte v systému, který vlastní podpisový klíč. Samotné dekódování důvěryhodnost nepotvrzuje.",
      terms: [
        "dekodér JWT",
        "JSON Web Token",
        "datová část JWT",
        "hlavička JWT",
      ],
    },
    "qr-code-generator": {
      title: "Generátor QR kódů",
      description:
        "Vytvoří standardní statický QR kód pro text nebo URL a umožní jej stáhnout jako PNG či SVG.",
      guide:
        "Zadejte přesný obsah, pro spolehlivé skenování ponechte ochrannou zónu čtyř modulů a při možném částečném zakrytí zvyšte opravu chyb.",
      terms: ["generátor QR kódů", "QR PNG", "QR SVG", "statický QR kód"],
    },
    "qr-code-scanner": {
      title: "Skener QR kódů",
      description:
        "Místně přečte QR kód z obrázku nebo fotoaparátu, aniž by automaticky otevíral dekódované odkazy.",
      guide:
        "Použijte ostrý, dobře osvětlený obrázek s viditelnou celou ochrannou zónou. Než rozhodnete, zda je URL bezpečná, dekódovanou hodnotu zkontrolujte a zkopírujte.",
      terms: [
        "skener QR",
        "skenování obrázku QR",
        "čtečka QR fotoaparátem",
        "dekódování QR",
      ],
    },
    "csv-to-markdown": {
      title: "Převod CSV na Markdown",
      description:
        "Převede řádky CSV na přehlednou tabulku Markdown s rozpoznáním oddělovače a ošetřením buněk.",
      guide:
        "Zkontrolujte oddělovač a zda je první řádek hlavička. Víceřádkové buňky se převedou na bezpečné zalomení a svislé čáry se escapují.",
      inputLabel: "Vstup CSV",
      outputLabel: "Tabulka Markdown",
      inputPlaceholder: "jméno,skóre\nAri,92",
      terms: ["CSV na Markdown", "tabulka Markdown", "převodník CSV"],
    },
    "markdown-to-csv": {
      title: "Převod Markdown na CSV",
      description:
        "Převede tabulku Markdown na standardní CSV pro tabulkové a datové nástroje.",
      guide:
        "Do tabulky Markdown zahrňte hlavičku a oddělovací řádek a poté zvolte oddělovač vyžadovaný cílovou aplikací.",
      inputLabel: "Tabulka Markdown",
      outputLabel: "Výstup CSV",
      inputPlaceholder: "| jméno | skóre |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown na CSV", "tabulka na CSV", "převodník Markdown"],
    },
    "json-to-csv": {
      title: "Převod JSON na CSV",
      description:
        "Převede pole objektů JSON na CSV se stabilním sjednocením klíčů objektů.",
      guide:
        "Použijte pole objektů na nejvyšší úrovni. Vnořené hodnoty zůstanou jako kompaktní řetězce JSON, proto ověřte jejich zpracování v cílové tabulkové aplikaci.",
      inputLabel: "Pole JSON",
      outputLabel: "Výstup CSV",
      inputPlaceholder: '[{"jméno":"Ari","skóre":92}]',
      terms: ["JSON na CSV", "pole JSON na CSV", "převodník dat"],
    },
    "csv-to-json": {
      title: "Převod CSV na JSON",
      description:
        "Převede CSV na pole objektů JSON a použije první řádek jako názvy polí.",
      guide:
        "Každá hlavička musí být vyplněná a jedinečná. Před převodem dat s čárkami, uvozovkami nebo víceřádkovými buňkami zkontrolujte rozpoznaný oddělovač.",
      inputLabel: "Vstup CSV",
      outputLabel: "Pole JSON",
      inputPlaceholder: "jméno,skóre\nAri,92",
      terms: ["CSV na JSON", "parser CSV", "pole JSON"],
    },
    "html-to-markdown": {
      title: "Převod HTML na Markdown",
      description:
        "Převede strukturu HTML na čitelný Markdown včetně nadpisů, odkazů, seznamů, kódu a tabulek.",
      guide:
        "Vložte fragment HTML, který chcete převést. Zkontrolujte složitá rozvržení a vložený obsah, protože Markdown neumí vyjádřit každé chování HTML.",
      inputLabel: "Vstup HTML",
      outputLabel: "Výstup Markdown",
      inputPlaceholder: "<h1>Nadpis</h1><p>Ahoj <strong>světe</strong>.</p>",
      terms: ["HTML na Markdown", "převodník HTML", "Turndown"],
    },
    "markdown-to-html": {
      title: "Převod Markdown na HTML",
      description:
        "Vykreslí Markdown jako HTML s běžnými tabulkami GFM, seznamy, odkazy a ohraničenými bloky kódu.",
      guide:
        "Převádějte jen Markdown, který chcete použít, a před vložením nedůvěryhodného výstupu na webovou stránku HTML znovu sanitizujte.",
      inputLabel: "Vstup Markdown",
      outputLabel: "Výstup HTML",
      inputPlaceholder: "# Nadpis\n\nAhoj **světe**.",
      terms: ["Markdown na HTML", "vykreslení Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
