import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";

const seed = {
  formatterSubnet: formatterSubnetFor("tr"),
  ui: {
    clear: "Temizle",
    copy: "Kopyala",
    download: "İndir",
    openFile: "Dosya aç",
    chooseImage: "Görsel seç",
    dropFile: "Bir görseli buraya bırakın.",
    ready: "Hazır",
    working: "İşleniyor…",
    complete: "Tamamlandı",
    unchanged: "Değişiklik gerekmiyor",
    outdated: "Sonuç güncel değil",
    copied: "Kopyalandı",
    copyFailed: "Kopyalanamadı",
    tooLarge: "Girdi, güvenli biçimde işlenemeyecek kadar büyük.",
    failed: "İşleme başarısız oldu. Girdiyi denetleyip yeniden deneyin.",
    resultHere: "Sonuç burada görünür.",
    localTitle: "Yalnızca bu tarayıcıda işlenir",
    localBody:
      "Girdiniz ve sonuçlarınız yüklenmez veya saklanmaz. Yalnızca bu tarayıcı sekmesinde kalır.",
    guideTitle: "{name} nasıl kullanılır?",
    safetyTitle: "Gizli ve yerel işleme",
    faqWhat: "{name} ne yapar?",
    faqPrivacy: "Verilerim yükleniyor mu?",
    faqCheck: "{name} kullanırken neleri denetlemeliyim?",
  },
  ai: {
    input: "Özgün metin",
    output: "Temizlenmiş metin",
    placeholder: "Gizli Unicode karakterleri içerebilecek metni yapıştırın.",
    run: "Gizli karakterleri temizle",
    report: "Kaldırma raporu",
    removed: "Kaldırılan karakterler",
    normalized: "Normalleştirilen boşluklar",
    noChanges: "Hedeflenen gizli karakterlerden hiçbiri bulunamadı.",
    count: "{count} kaldırıldı",
    advanced: "Gelişmiş Unicode seçenekleri",
    advancedWarning:
      "Bu seçenekler yazımı, emojileri veya yazı biçimlenmesini değiştirebilir. Yalnızca kaynak metnin yapısını anlıyorsanız etkinleştirin.",
    joinControls: "ZWJ ve ZWNJ karakterlerini kaldır",
    joinWarning:
      "Emoji dizilerini ve Arapça, Farsça veya Hint yazılarının biçimlenmesini bozabilir.",
    variationSelectors: "Varyasyon seçicilerini kaldır",
    variationWarning: "Emoji veya CJK gliflerinin görünümünü değiştirebilir.",
    combiningMarks: "Birleştirme işaretlerini kaldır",
    combiningWarning:
      "Aksanları, ünlü işaretlerini ve anlam taşıyan diğer işaretleri kaldırabilir.",
    noBreakSpaces: "Bölünemez boşlukları normalleştir",
    noBreakNote:
      "NBSP benzeri boşluk karakterlerini normal boşluklara dönüştürür.",
    kinds: [
      "Sıfır genişlikli boşluk",
      "Sözcük birleştirici",
      "Bayt sırası işareti",
      "Yumuşak tire",
      "Çift yönlü metin denetimi",
      "Görünmez ayırıcı",
      "Birleştirme denetimi",
      "Varyasyon seçicisi",
      "Birleştirme işareti",
      "Bölünemez veya rakam genişliğinde boşluk",
      "Dar bölünemez boşluk",
    ],
  },
  url: {
    mode: "URL dönüştürme modu",
    encode: "Kodla",
    decode: "Kodunu çöz",
    encodeInput: "Kodlanacak metin veya URL",
    decodeInput: "Kodlanmış URL değeri",
    encodeOutput: "Kodlama sonucu",
    decodeOutput: "Kod çözme sonucu",
    encodePlaceholder: "Örnek: https://example.com/search?q=hello world",
    decodePlaceholder: "Örnek: hello%20world%3Fpage%3D1",
    scope: "Kodlama kapsamı",
    component: "URL bileşeni",
    uri: "Tam URI",
    formSpace: "Form verilerindeki boşluklar için + kullan",
    recursive: "Yinelenen kod çözme",
    passLimit: "En fazla geçiş",
    encoded: "URL kodlandı",
    decoded: "URL kodu çözüldü",
    passCount: "{count} geçişte çözüldü",
    limitReached:
      "Geçiş sınırından sonra kodlanmış katmanlar kalmaya devam ediyor.",
    errors: [
      "Önce bir değer girin.",
      "Yüzde kaçış dizisi eksik veya geçersiz.",
      "Kodu çözülen baytlar geçerli UTF-8 değil.",
      "1 ile 10 arasında bir geçiş sınırı seçin.",
    ],
  },
  hash: {
    input: "Metin veya dosya",
    placeholder:
      "SHA-256, SHA-512, SHA-1 ve MD5 karmalarını hesaplamak için metin girin.",
    results: "Karma değerleri",
    resultLabel: "{algorithm} karma değeri",
    copyLabel: "{algorithm} karmasını kopyala",
    fileSelected: "Seçili: {name} ({size})",
    drop: "Karmasını yerel olarak hesaplamak için bir dosyayı buraya bırakın.",
    textTooLarge: "Metin bu tarayıcı oturumunda işlenemeyecek kadar büyük.",
    fileTooLarge: "Dosya, yerel güvenlik sınırını aşıyor.",
    legacyWarning:
      "MD5 ve SHA-1, parola saklamak veya yeni güvenlik tasarımları için değil, uyumluluk denetimleri için sunulur.",
    expectedChecksum: "Beklenen sağlama toplamı",
    checksumMatch: "Eşleşiyor",
    checksumMismatch: "Eşleşmiyor",
    checksumInvalid: "Desteklenen bir onaltılık sağlama toplamı girin.",
    empty: "Önce metin girin veya bir dosya seçin.",
    unavailable: "Bu tarayıcı istenen karmalardan birini hesaplayamıyor.",
  },
  jwt: {
    input: "JWT belirteci",
    placeholder: "Üç parçalı bir JWT yapıştırın: header.payload.signature",
    header: "Üst bilgi",
    payload: "Yük",
    signature: "İmza",
    copyHeader: "Kodu çözülmüş JWT üst bilgisini kopyala",
    copyPayload: "Kodu çözülmüş JWT yükünü kopyala",
    copySignature: "JWT imza baytlarını kopyala",
    signatureBytes: "{count} bayt",
    timestamps: "Zaman damgası talepleri",
    expires: "Sona erme (exp)",
    notBefore: "Geçerlilik başlangıcı (nbf)",
    issuedAt: "Düzenlenme zamanı (iat)",
    invalidTimestamp: "Bu talep geçerli bir sayısal zaman damgası değil.",
    noTimestamps: "exp, nbf veya iat talebi bulunamadı.",
    noVerifyTitle: "İmza doğrulanmadı",
    noVerifyBody:
      "Kod çözme yalnızca belirtecin içeriğini gösterir. Belirteci kimin düzenlediğini veya imzanın geçerli olduğunu kanıtlamaz.",
    errors: [
      "Önce bir JWT yapıştırın.",
      "JWT, noktalarla ayrılmış tam olarak üç parçadan oluşmalıdır.",
      "JWT üst bilgisi boş.",
      "JWT yükü boş.",
      "Bir bölüm geçerli Base64URL değil.",
      "Bir bölüm geçerli UTF-8 değil.",
      "Üst bilgi geçerli JSON değil.",
      "Yük geçerli JSON değil.",
      "Üst bilgi bir JSON nesnesi olmalıdır.",
      "Yük bir JSON nesnesi olmalıdır.",
    ],
  },
  qr: {
    input: "Metin veya URL",
    placeholder: "QR koduna yerleştirilecek metni veya URL'yi girin.",
    preview: "QR kodu önizlemesi",
    previewEmpty: "QR kodu oluşturmak için içerik girin.",
    options: "QR kodu seçenekleri",
    correction: "Hata düzeltme",
    correctionLevels: ["Düşük (L)", "Orta (M)", "Yüksekçe (Q)", "Yüksek (H)"],
    quietZone: "Sessiz bölge",
    quietZones: ["Yok", "2 modül", "4 modül (önerilen)", "8 modül"],
    generate: "QR kodu oluştur",
    png: "PNG indir",
    svg: "SVG indir",
    empty: "Önce metin veya URL girin.",
    tooLong: "İçerik bu hata düzeltme düzeyi için çok uzun.",
    generationFailed: "QR kodu oluşturulamadı.",
    downloadFailed: "Görsel indirmeye hazırlanamadı.",
    upload: "QR kodu görseli",
    formats: "En fazla 10 MB PNG, JPEG, WebP, GIF veya BMP",
    camera: "Kamera tarayıcısı",
    cameraHint:
      "Sürekli tarama için kamera erişimine izin verin. Çözülen URL'ler hiçbir zaman otomatik açılmaz.",
    startCamera: "Kamerayı başlat",
    stopCamera: "Kamerayı durdur",
    scanResult: "Çözülen içerik",
    scanPlaceholder: "Taranan metin burada görünür.",
    urlDetected: "URL algılandı",
    reading: "Görsel okunuyor…",
    starting: "Kamera başlatılıyor…",
    scanning: "QR kodu aranıyor…",
    invalidImage: "Geçerli ve desteklenen bir görsel seçin.",
    noCode: "Bu görselde okunabilir bir QR kodu bulunamadı.",
    unsupported: "Bu tarayıcı kamera ile taramayı desteklemiyor.",
    denied: "Kamera izni reddedildi.",
    unavailable: "Uygun bir kamera yok.",
    scanFailed: "QR kodu taranamadı.",
  },
  data: {
    convert: "Dönüştür",
    inputPlaceholder: "Kaynak veriyi buraya yapıştırın.",
    outputPlaceholder: "Dönüştürülen çıktı burada görünür.",
    drop: "Desteklenen bir metin dosyasını buraya bırakın.",
    readFailed: "Dosya okunamadı.",
    errorAt: "{message} Satır {line}, sütun {column}.",
    delimiter: "CSV ayırıcı",
    auto: "Otomatik algıla",
    comma: "Virgül (,)",
    semicolon: "Noktalı virgül (;)",
    tab: "Sekme",
    pipe: "Dikey çizgi (|)",
    firstHeader: "İlk satırı başlık olarak kullan",
    pretty: "JSON'u girintili biçimlendir",
    errors: [
      "CSV'de kapatılmamış bir tırnak veya hatalı bir alan var.",
      "Ayırıcı satırı olan bir Markdown tablosu bulunamadı.",
      "Markdown tablosu hatalı.",
      "Girdi geçerli JSON değil.",
      "JSON, nesnelerden oluşan bir dizi olmalıdır.",
      "Bir CSV başlığı boş.",
      "CSV başlıkları benzersiz olmalıdır.",
    ],
  },
  pages: {
    "ai-watermark-remover": {
      title: "AI filigranı ve gizli karakter temizleyici",
      description:
        "GPT, Claude, PDF veya web sayfalarından kopyalanabilen gerçek gizli Unicode kalıntılarını bulup kaldırır. Bu araç metnin AI tarafından yazılıp yazılmadığını belirlemez.",
      guide:
        "Metni yapıştırıp önce temizlenmiş sonucu gözden geçirin, ardından tam karakter adlarını, sayılarını ve U+ kod noktalarını inceleyin. Yazı biçimlenmesini etkileyebilecek riskli seçenekler varsayılan olarak kapalıdır.",
      terms: [
        "AI filigranı temizleme",
        "GPT gizli karakterleri",
        "Claude gizli karakterleri",
        "sıfır genişlikli boşluk",
        "Unicode temizleyici",
      ],
    },
    "url-encode": {
      title: "URL kodlayıcı",
      description:
        "Metni, sorgu değerlerini veya tam URI'leri standart web kurallarına göre yüzde kodlar.",
      guide:
        "Tek bir sorgu değeri için URL bileşenini, URL ayırıcılarını korumak için tam URI'yi seçin. Artı işaretli boşlukları yalnızca form türü verilerde etkinleştirin.",
      terms: [
        "URL kodlama",
        "yüzde kodlaması",
        "encodeURIComponent",
        "sorgu dizesi",
      ],
    },
    "url-decode": {
      title: "URL kod çözücü",
      description:
        "Yüzde kodlu URL'lerin ve sorgu değerlerinin kodunu, isteğe bağlı sınırlı çoklu geçişle çözer.",
      guide:
        "Kodlanmış değeri yapıştırıp kapsamını seçin. Yinelenen kod çözmeyi yalnızca kaynağın iç içe kodlama içerdiği biliniyorsa kullanın.",
      terms: [
        "URL kod çözme",
        "yüzde kodu çözme",
        "decodeURIComponent",
        "sorgu dizesi",
      ],
    },
    "hash-generator": {
      title: "Karma oluşturucu",
      description:
        "Metin veya dosyalar için SHA-256, SHA-512, SHA-1 ve MD5 sağlama toplamlarını yerel olarak hesaplar.",
      guide:
        "Metin girin veya dosya seçin, ardından gereken algoritmanın değerini tam olarak karşılaştırın. Karmalar eşitliği denetler; tek başlarına veriyi şifrelemez veya parolaları güvenle saklamaz.",
      terms: ["SHA-256", "SHA-512", "MD5", "sağlama toplamı", "dosya karması"],
    },
    "jwt-decoder": {
      title: "JWT kod çözücü",
      description:
        "Belirteci yüklemeden JWT üst bilgisini, yükünü, imza baytlarını ve zaman damgası taleplerini çözer.",
      guide:
        "Çözülen JSON'u ve zaman damgalarını inceleyin, ancak imza ile talepleri imzalama anahtarının sahibi olan sistemde doğrulayın. Yalnızca kod çözme güven oluşturmaz.",
      terms: [
        "JWT kod çözücü",
        "JSON Web Token",
        "JWT yükü",
        "JWT üst bilgisi",
      ],
    },
    "qr-code-generator": {
      title: "QR kodu oluşturucu",
      description:
        "Metin veya URL için standartlara uygun, PNG ya da SVG olarak indirilebilen statik bir QR kodu oluşturur.",
      guide:
        "Tam içeriği girin, güvenilir tarama için dört modüllük sessiz bölgeyi koruyun ve kod kısmen kapanabilecekse hata düzeltme düzeyini yükseltin.",
      terms: ["QR kodu oluşturucu", "QR PNG", "QR SVG", "statik QR"],
    },
    "qr-code-scanner": {
      title: "QR kodu tarayıcı",
      description:
        "Bir görsel veya kameradaki QR kodunu yerel olarak okur ve çözülen bağlantıları otomatik açmaz.",
      guide:
        "Sessiz bölgenin tamamının göründüğü net ve iyi aydınlatılmış bir görsel kullanın. Bir URL'nin güvenli olup olmadığına karar vermeden önce çözülen değeri gözden geçirip kopyalayın.",
      terms: [
        "QR kodu tarayıcı",
        "QR görseli tara",
        "kameralı QR okuyucu",
        "QR kodu çözme",
      ],
    },
    "csv-to-markdown": {
      title: "CSV'den Markdown'a dönüştürücü",
      description:
        "CSV satırlarını ayırıcı algılama ve kaçış uygulanmış hücrelerle düzenli bir Markdown tablosuna dönüştürür.",
      guide:
        "Ayırıcıyı ve ilk satırın başlık olup olmadığını denetleyin. Çok satırlı hücreler tabloya uygun satır sonlarına dönüştürülür, dikey çizgiler kaçışla korunur.",
      inputLabel: "CSV girdisi",
      outputLabel: "Markdown tablosu",
      inputPlaceholder: "ad,puan\nAri,92",
      terms: ["CSV'den Markdown'a", "Markdown tablosu", "CSV dönüştürücü"],
    },
    "markdown-to-csv": {
      title: "Markdown'dan CSV'ye dönüştürücü",
      description:
        "Bir Markdown tablosunu elektronik tablolar ve veri araçları için standartlara uygun CSV'ye dönüştürür.",
      guide:
        "Markdown tablosunda bir başlık ve ayırıcı satır bulundurun, ardından hedef uygulamanın gerektirdiği ayırıcıyı seçin.",
      inputLabel: "Markdown tablosu",
      outputLabel: "CSV çıktısı",
      inputPlaceholder: "| ad | puan |\n| --- | --- |\n| Ari | 92 |",
      terms: ["Markdown'dan CSV'ye", "tablodan CSV'ye", "Markdown dönüştürücü"],
    },
    "json-to-csv": {
      title: "JSON'dan CSV'ye dönüştürücü",
      description:
        "JSON nesneleri dizisini, nesne anahtarlarının kararlı birleşimiyle CSV'ye dönüştürür.",
      guide:
        "Üst düzeyde bir nesne dizisi kullanın. İç içe değerler kısa JSON dizeleri olarak korunur; hedef elektronik tablonun bunları nasıl işleyeceğini denetleyin.",
      inputLabel: "JSON dizisi",
      outputLabel: "CSV çıktısı",
      inputPlaceholder: '[{"ad":"Ari","puan":92}]',
      terms: ["JSON'dan CSV'ye", "JSON dizisinden CSV'ye", "veri dönüştürücü"],
    },
    "csv-to-json": {
      title: "CSV'den JSON'a dönüştürücü",
      description:
        "CSV'yi, ilk satırı alan adları olarak kullanarak JSON nesneleri dizisine dönüştürür.",
      guide:
        "Her başlığın dolu ve benzersiz olmasını sağlayın. Virgül, tırnak veya çok satırlı hücre içeren verileri dönüştürmeden önce ayırıcı algılamasını gözden geçirin.",
      inputLabel: "CSV girdisi",
      outputLabel: "JSON dizisi",
      inputPlaceholder: "ad,puan\nAri,92",
      terms: ["CSV'den JSON'a", "CSV ayrıştırıcı", "JSON dizisi"],
    },
    "html-to-markdown": {
      title: "HTML'den Markdown'a dönüştürücü",
      description:
        "Başlıklar, bağlantılar, listeler, kodlar ve tablolar dahil HTML yapısını okunabilir Markdown'a dönüştürür.",
      guide:
        "Dönüştürülecek HTML parçasını yapıştırın. Markdown her HTML davranışını gösteremediğinden karmaşık düzenleri ve gömülü içeriği gözden geçirin.",
      inputLabel: "HTML girdisi",
      outputLabel: "Markdown çıktısı",
      inputPlaceholder: "<h1>Başlık</h1><p>Merhaba <strong>dünya</strong>.</p>",
      terms: ["HTML'den Markdown'a", "HTML dönüştürücü", "Turndown"],
    },
    "markdown-to-html": {
      title: "Markdown'dan HTML'ye dönüştürücü",
      description:
        "Yaygın GFM tabloları, listeleri, bağlantıları ve çitli kod blokları içeren Markdown'ı HTML olarak işler.",
      guide:
        "Yalnızca kullanmayı düşündüğünüz Markdown'ı dönüştürün; güvenilmeyen çıktıyı bir web sayfasına eklemeden önce HTML'yi yeniden arındırın.",
      inputLabel: "Markdown girdisi",
      outputLabel: "HTML çıktısı",
      inputPlaceholder: "# Başlık\n\nMerhaba **dünya**.",
      terms: ["Markdown'dan HTML'ye", "Markdown işleyici", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
