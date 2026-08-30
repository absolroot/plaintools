import type { LocaleBundle } from "./bundle";
import { catalog as newToolCatalog, tools } from "./new-tools/tr";

const bundle: LocaleBundle = {
  site: {
    brandName: "AbsolTools",
    languageName: "Türkçe",
    metaTitle: "Base64 Kodlayıcı ve Kod Çözücü — Hızlı, Gizli, Çevrim İçi",
    metaDescription:
      "Base64 metinlerini veya dosyalarını çevrim içi çözün; metinleri ya da dosyaları Base64 olarak kodlayın. Base64URL, eksik dolgu, Veri URI'leri ve eski karakter kodlamaları desteklenir.",
    decodeMetaTitle: "Metin ve Dosyalar için Base64 Kod Çözücü | AbsolTools",
    encodeMetaTitle: "Metin ve Dosyalar için Base64 Kodlayıcı | AbsolTools",
    skipToContent: "İçeriğe geç",
    languageNavLabel: "Dil",
    legalNavLabel: "Yasal bilgiler ve iletişim",
    modeLabel: "Dönüştürme modu",
    heading: "Base64 verisini çevrim içi çözün.",
    subheading:
      "Base64 metnini yapıştırın veya bir dosya açın. Standart Base64, Base64URL, eksik dolgu ve Veri URI girdileri tarayıcınızda işlenir.",
    encodeHeading:
      "Metinleri veya dosyaları çevrim içi Base64 olarak kodlayın.",
    encodeSubheading:
      "Metin girin veya bir dosya açın. UTF-8 metinleri ve ikili dosyaları yüklemeden standart Base64 ya da Base64URL biçimine dönüştürün.",
    decode: "Kodunu çöz",
    encode: "Kodla",
    inputLabel: "Base64 girdisi",
    outputLabel: "Çözülmüş çıktı",
    encodeInputLabel: "Metin veya dosya girdisi",
    encodeOutputLabel: "Base64 çıktısı",
    decodePlaceholder: "Örnek: SGVsbG8sIEFic29sVG9vbHMh",
    encodePlaceholder: "Örnek: Merhaba, AbsolTools!",
    outputPlaceholder: "Sonuç burada görünür.",
    openFile: "Dosya aç",
    runDecode: "Şimdi çöz",
    runEncode: "Şimdi kodla",
    options: "Seçenekler",
    detected: "Algılanan",
    decodeComplete: "Kod çözme tamamlandı",
    encodeComplete: "Kodlama tamamlandı",
    charset: "Karakter kodlaması",
    variant: "Base64 biçimi",
    auto: "Otomatik algıla",
    standard: "Standart",
    urlSafe: "URL güvenli",
    strict: "Katı doğrula",
    lineByLine: "Her satırı ayrı çöz",
    autoRepair: "Boşlukları ve dolguyu düzelt",
    lenientRepair: "Kalan geçersiz karakterleri kaldır",
    outputView: "Çıktı biçimi",
    text: "Metin",
    hex: "Onaltılık",
    includePadding: "= dolgusu ekle",
    mimeWrap: "76 karakterde satır kaydır",
    dataUri: "Veri URI ön eki ekle",
    dropHint: "Metin veya ikili dosyayı dönüştürücünün üzerine bırakın.",
    fileTooLarge: "En büyük girdi boyutu 100 MiB'dir.",
    binaryOutput:
      "İkili veri algılandı. Dosya türünü inceleyin; doğrudan çalıştırmak yerine dosyayı indirin.",
    executableWarning:
      "Çalıştırılabilir dosya algılandı. Güvenmediğiniz bir kaynaktan çözülen dosyayı çalıştırmayın.",
    imagePreview: "Görsel ön izlemesi",
    errors: {
      "empty-input": "Önce metin girin veya bir dosya açın.",
      "invalid-character":
        "Bu değer, Base64 için geçersiz bir karakter içeriyor.",
      "invalid-length": "Base64 değeri kesilmiş veya uzunluğu geçersiz.",
      "decode-failed": "Değerin kodu çözülemedi.",
      "encode-failed": "Dosya kodlanamadı.",
      "unsupported-charset":
        "Tarayıcınız bu karakter kodlamasını desteklemiyor.",
      "file-too-large": "Bu girdi 100 MiB güvenlik sınırını aşıyor.",
    },
    repairs: {
      "data-uri-removed": "Veri URI ön eki kaldırıldı",
      "whitespace-removed": "Boşluk karakterleri kaldırıldı",
      "url-alphabet-normalized": "Base64URL alfabesi algılandı",
      "padding-added": "Eksik dolgu eklendi",
      "invalid-characters-removed": "Geçersiz karakterler kaldırıldı",
    },
    guideTitle: "Base64 kodu nasıl çözülür?",
    guideIntro:
      "Base64 bir kodlama biçimidir, şifreleme değildir. Değeri elinde bulunduran herkes kodunu çözebilir.",
    guideSteps: [
      "Bir Base64 değeri yapıştırın veya bu değeri içeren dosyayı açın.",
      "Araç biçimi algılar; boşlukları kaldırmak veya eksik dolguyu tamamlamak gibi yaygın düzeltmeleri uygular.",
      "Okunabilir metni kopyalayın ya da ikili çıktıyı dosya olarak indirin.",
    ],
    encodeGuideTitle: "Base64 olarak nasıl kodlanır?",
    encodeGuideIntro:
      "Base64, metin veya ikili baytları yazdırılabilir karakterlere dönüştürür. Kaynak veriyi şifrelemez veya korumaz.",
    encodeGuideSteps: [
      "Kodlamak istediğiniz metni yazın veya dosyayı açın.",
      "Standart Base64 ya da URL güvenli alfabeyi seçin; dolguyu veya satır kaydırmayı yalnızca hedef bunu gerektiriyorsa değiştirin.",
      "Base64 sonucunu kopyalayın veya metin dosyası olarak indirin.",
    ],
    safetyTitle: "Girdiniz saklanmaz.",
    safetyBody:
      "Site, girdinizi veya dönüştürme sonuçlarını saklamaz ve bunları bir sunucuya göndermez. Her şey mevcut tarayıcı oturumunuzda işlenir; sayfayı yenilediğinizde ya da kapattığınızda kaybolur.",
    detailsTitle: "Standartlar ve girdi işleme",
    detailsBody:
      "Araç varsayılan olarak RFC 4648'i izler; standart ve URL güvenli alfabeleri, isteğe bağlı dolguyu, MIME boşluklarını ve Veri URI ön eklerini işler. Tam biçimin önemli olduğu durumlarda katı doğrulamayı açın.",
    faqTitle: "Sık sorulan sorular",
    faqs: [
      {
        q: "Base64 şifreleme midir?",
        a: "Hayır. Base64, ikili veriyi yazdırılabilir metne dönüştürür; gizlilik veya kimlik doğrulama sağlamaz.",
      },
      {
        q: "Çözülen çıktıyı neden okuyamıyorum?",
        a: "Çıktı bir dosya, sıkıştırılmış ya da şifrelenmiş veri veya farklı karakter kodlamasında metin olabilir. Dosyayı indirmeyi ya da başka bir karakter kodlaması seçmeyi deneyin.",
      },
      {
        q: "Bu site girdimi yükler mi?",
        a: "Hayır. Dönüştürme tarayıcınızda yapılır; girdiniz, dosyalarınız ve sonuçlarınız bir sunucuya yüklenmez.",
      },
    ],
    encodeFaqs: [
      {
        q: "Base64 şifreleme midir?",
        a: "Hayır. Base64, ikili veriyi yazdırılabilir metne dönüştürür; gizlilik veya kimlik doğrulama sağlamaz.",
      },
      {
        q: "Standart Base64 mü, Base64URL mi kullanmalıyım?",
        a: "Genel dosya ve veriler için standart Base64 kullanın. Değer bir URL'de veya dosya adında güvenle yer alacaksa Base64URL kullanın.",
      },
      {
        q: "Bu site girdimi yükler mi?",
        a: "Hayır. Dönüştürme tarayıcınızda yapılır; girdiniz, dosyalarınız ve sonuçlarınız bir sunucuya yüklenmez.",
      },
    ],
    advertisement: "Reklam",
    integrationState: {
      enabled: "izin denetimleriyle etkin",
      disabled: "devre dışı",
    },
    legalNav: {
      about: "Hakkında",
      privacy: "Gizlilik",
      cookies: "Çerezler",
      terms: "Koşullar",
      contact: "İletişim",
    },
    legal: {
      about: {
        title: "Hakkında",
        intro:
          "AbsolTools; metin, veri, zaman ve kodlama işlemleri için çevrim içi araçlar sunar.",
        sections: [
          {
            title: "Ne geliştiriyoruz?",
            body: [
              "Her araç, hesap gerektirmeden tek bir görevi yerine getirir. Araç girdileri ve sonuçları tarayıcınızda işlenir.",
            ],
          },
          {
            title: "İletişim",
            body: [
              "Sorularınızı, hata bildirimlerinizi ve gizlilik taleplerinizi {{email}} adresine gönderin.",
            ],
          },
        ],
      },
      privacy: {
        title: "Gizlilik politikası",
        intro:
          "Bu politika; araç girdileri ve sonuçlarıyla site, analiz ve reklam verilerini birbirinden ayırır.",
        sections: [
          {
            title: "Araç girdileri ve sonuçları",
            body: [
              "Metinler, dosyalar, JSON, tarih ve saat değerleri, çözülmüş baytlar ve oluşturulan sonuçlar tarayıcıda işlenir. Araç girdileri ve sonuçları bir sunucuya yüklenmez veya sunucuda saklanmaz.",
            ],
          },
          {
            title: "Sitenin sunulması",
            body: [
              "{{host_provider}} bu statik siteyi sunar ve korur; IP adresiniz, istek zamanı, tarayıcı bilgileri ve istenen URL gibi bağlantı verilerini işleyebilir. Bildirilen günlük saklama ayarı {{host_log_retention}} değeridir. Sağlayıcı politikası: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Analiz ve reklam",
            body: [
              "Google Analytics ve Google AdSense şu anda {{integration_state}}. Etkinleştirildiklerinde cihaz, kullanım, çerez, izin, saklama ve uluslararası aktarım ayrıntıları burada açıklanacak ve Gizlilik seçenekleri üzerinden yönetilecektir. Araç girdileri ve sonuçları tasarım gereği analiz ve reklam etkinliklerinin dışında tutulur.",
            ],
          },
          {
            title: "Çerezler ve otomatik toplama",
            body: [
              "Araçlar, araç girdilerini veya sonuçlarını çerezlerde ya da tarayıcı depolamasında saklamaz. Bir tema seçerseniz site yalnızca light veya dark değerini yerel depolamaya kaydeder ve bu değeri iletmez. Barındırma güvenliği teknolojisi, yalnızca seçilen sağlayıcı tarafından belgelendiğinde kesinlikle gerekli depolamayı kullanabilir. İsteğe bağlı analiz ve reklam depolaması, bu entegrasyonlar devre dışıyken engellenir.",
            ],
          },
          {
            title: "Saklama ve silme",
            body: [
              "İşletmeci, araç girdilerini veya sonuçlarını saklamaz. Barındırma istek verileri yukarıda belirtilen sağlayıcı saklama süresine tabidir. Yazışmalar, talebi yanıtlamak, yasal yükümlülükleri yerine getirmek veya kötüye kullanımı ele almak için gerektiği sürece tutulur; ardından silinir ya da anonimleştirilir.",
            ],
          },
          {
            title: "Alıcılar ve uluslararası aktarımlar",
            body: [
              "Seçilen barındırma sağlayıcısı, istek verilerini kendi politikasında belirtilen konum ve güvenceler kapsamında ülkeniz dışında işleyebilir. Analiz, reklam, izin yöneticisi veya başka bir alıcı etkinleştirilmeden önce bu bölüm; yürürlükteki hukukun gerektirdiği alıcıyı, ülkeleri, amacı, veriyi, zamanı, yöntemi, saklama süresini ve aktarım dayanağını belirtecektir.",
            ],
          },
          {
            title: "Seçimleriniz ve iletişim",
            body: [
              "Uygulanabildiği durumlarda {{email}} adresine yazarak erişim, düzeltme, silme, kısıtlama, itiraz, taşınabilirlik veya iznin geri çekilmesini talep edebilirsiniz. Talebi yerine getirmeden önce makul bir doğrulama isteyebiliriz.",
            ],
          },
          {
            title: "Çocuklar, güvenlik ve değişiklikler",
            body: [
              "Bu genel amaçlı geliştirici aracı çocuklara yönelik değildir. Riski azaltmak için statik, tarayıcıda yerel bir mimari ve kısıtlayıcı tarayıcı politikaları kullanırız; ancak hiçbir hizmet tamamen güvenli değildir. Önemli politika değişikliklerine bu sayfada tarih eklenir. Yürürlük tarihi: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Çerez politikası",
        intro: "Araçların girdiyi işlemesi için çerez gerekmez.",
        sections: [
          {
            title: "Mevcut kullanım",
            body: [
              "Analiz ve reklam şu anda {{integration_state}}. Site, araç girdilerini veya sonuçlarını çerezlerde ya da yerel depolamada saklamaz. Yalnızca seçtiğiniz tema tercihini (light veya dark) yerel depolamada saklar ve bu değeri iletmez.",
            ],
          },
          {
            title: "Entegrasyonlar etkinleştirilirse",
            body: [
              "Bir izin platformu gerekli tercih depolamasını, analiz depolamasını ve reklam depolamasını denetleyecektir. Kalıcı bir gizlilik denetimi, ziyaretçilerin izinlerini incelemesine veya geri çekmesine olanak verecektir.",
            ],
          },
        ],
      },
      terms: {
        title: "Kullanım koşulları",
        intro: "Bu ücretsiz aracın kullanımı bu koşullara tabidir.",
        sections: [
          {
            title: "Hizmet",
            body: [
              "Hizmet olduğu gibi sunulur; doğruluk, kullanılabilirlik, belirli bir amaca uygunluk veya kesintisiz çalışma garantisi verilmez. Önemli sonuçları bağımsız olarak doğrulayın.",
            ],
          },
          {
            title: "Güvenli ve yasal kullanım",
            body: [
              "Hizmeti sistemlere saldırmak, yasaları veya üçüncü taraf haklarını ihlal etmek ya da zararlı içerik dağıtmak için kullanmayın. Güvenmediğiniz bir kaynaktan çözülen dosyayı asla çalıştırmayın.",
            ],
          },
          {
            title: "Sorumluluk ve üçüncü taraflar",
            body: [
              "Emredici hukukun izin verdiği ölçüde işletmeci, dolaylı veya sonuç olarak ortaya çıkan kayıplardan sorumlu değildir. Üçüncü taraf reklamları ve bağlantıları onay anlamına gelmez.",
            ],
          },
          {
            title: "Fikrî mülkiyet ve değişiklikler",
            body: [
              "Site tasarımı ve özgün açıklama içeriği yürürlükteki hukuk tarafından korunur. İşlediğiniz içerikten siz sorumlusunuz. Özellikleri değiştirebilir veya sonlandırabiliriz; önemli koşul değişikliklerine tarih ekleriz.",
            ],
          },
          {
            title: "Uygulanacak hukuk ve iletişim",
            body: [
              "Bu hizmet {{region}} bölgesinden işletilmektedir. Uygulanacak hukuk: {{governing_law}}. Yetkili yer: {{jurisdiction}}. Emredici tüketici korumaları geçerliliğini korur. İletişim: {{email}}. Yürürlük tarihi: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "İletişim",
        intro:
          "Soruları, hata bildirimlerini, gizlilik taleplerini ve kötüye kullanım bildirimlerini kabul ediyoruz.",
        sections: [
          {
            title: "E-posta",
            body: [
              "{{email}} adresine yazın. İletinize hassas metinler, JSON, Base64 değerleri, parolalar, özel anahtarlar veya kişisel dosyalar gibi araç girdilerini eklemeyin.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Ön izleme",
    ready: "Hazır",
    working: "İşleniyor…",
    clear: "Temizle",
    copy: "Kopyala",
    copied: "Kopyalandı",
    copyFailed: "Sonuç kopyalanamadı.",
    processingFailed: "İşlem başarısız oldu. Yeniden deneyin.",
    download: "İndir",
    faqTitle: "Sık sorulan sorular",
    localTitle: "AbsolTools tarayıcınızda çalışır.",
    localBody:
      "Girdiniz ve sonuçlarınız yalnızca bu tarayıcıda işlenir. Bir sunucuya yüklenmez veya sunucuda saklanmaz.",
  },
  preview: {
    word: {
      title: "Kelime ve karakter sayacı",
      description:
        "Metninizi yüklemeden kelimeleri, karakterleri, boşluksuz karakterleri, satırları ve paragrafları sayın.",
      inputLabel: "Metin",
      words: "Kelimeler",
      characters: "Karakterler",
      noWhitespace: "Boşluksuz karakterler",
      lines: "Satırlar",
      paragraphs: "Paragraflar",
      completed: "Sayım tamamlandı",
      approximate:
        "Bu tarayıcı Intl.Segmenter özelliğini desteklemediği için karakter ve kelime sayıları yaklaşıktır.",
      tooLarge:
        "Girdi 1 MB sınırını aşıyor. Devam etmek için metni kısaltın veya temizleyin.",
      guideTitle: "Neler sayılır?",
      guideBody:
        "Desteklenen tarayıcılarda karakterler, kullanıcının tek karakter olarak algıladığı grafem kümeleriyle sayılır; bu nedenle bir emoji veya birleştirme işaretli bir harf genellikle bir sayılır. Boşluksuz sayı, iki yandaki grafemleri birleştirmeden yalnızca özgün metindeki boşluk grafemlerini atlar. Satırlar satır sonlarına göre sayılır. Yalnızca boşluk içerenler dâhil, görünürde boş satırlar paragrafları ayırır.",
      faqs: [
        {
          q: "Kelimeler nasıl sayılır?",
          a: "Intl.Segmenter destekleyen tarayıcılar, mevcut sayfa dilinin kelime sınırlarını kullanır ve kelime niteliğindeki bölümleri sayar. Diğer tarayıcılar yaklaşık bir sayı gösterir.",
        },
        {
          q: "Emojiler karakter olarak sayılır mı?",
          a: "Desteklenen tarayıcılarda tek karakter gibi görünen emoji veya birleşik karakter bir kez sayılır.",
        },
      ],
    },
    json: {
      title: "JSON biçimlendirici",
      description:
        "JSON'u daha okunaklı biçimlendirin, hatalarını denetleyin veya tek satıra küçültün.",
      inputLabel: "JSON girdisi",
      outputLabel: "Sonuç",
      placeholder: "JSON'u buraya yapıştırın…",
      outputPlaceholder:
        "Biçimlendirilmiş veya küçültülmüş JSON burada görünür.",
      openFile: ".json aç",
      tooLarge: "Girdi 10 MiB sınırını aşıyor.",
      manualRequired:
        "Bu büyük girdide otomatik doğrulama duraklatıldı. Biçimlendir, Doğrula veya Küçült'ü seçin.",
      format: "Biçimlendir",
      validate: "Doğrula",
      validateHelpLabel: "Doğrulama hakkında",
      validateHelp:
        "Girdinin RFC 8259 JSON sözdizimine uyup uymadığını denetler ve sözdizimi hatasının konumuyla nedenini bildirir. Metni yeniden biçimlendirmez veya değiştirmez.",
      minify: "Küçült",
      minifyHelpLabel: "Küçültme hakkında",
      minifyHelp:
        "Geçerli JSON'daki isteğe bağlı boşlukları ve satır sonlarını kaldırır. Dize içerikleri, sayıların özgün yazımı ve yinelenen nesne anahtarları korunur.",
      indent: "Girinti",
      twoSpaces: "2 boşluk",
      fourSpaces: "4 boşluk",
      tabs: "Sekmeler",
      valid: "Geçerli JSON",
      invalidAt: "{message} Satır {line}, sütun {column}.",
      duplicate: "{line}. satırın {column}. sütununda yinelenen anahtar",
      bom: "İşlemeden önce UTF-8 BOM kaldırıldı.",
      errorMessages: {
        InvalidSymbol: "Geçersiz simge.",
        InvalidNumberFormat: "Geçersiz sayı biçimi.",
        PropertyNameExpected: "Özellik adı gerekli.",
        ValueExpected: "Değer gerekli.",
        ColonExpected: "Özellik adından sonra iki nokta gerekli.",
        CommaExpected: "Öğeler arasında virgül gerekli.",
        CloseBraceExpected: "Kapanış süslü parantezi gerekli.",
        CloseBracketExpected: "Kapanış köşeli parantezi gerekli.",
        EndOfFileExpected: "JSON değerinden sonra beklenmeyen içerik var.",
        InvalidCommentToken: "Yorumlar geçerli JSON değildir.",
        UnexpectedEndOfComment: "Yorum tamamlanmamış.",
        UnexpectedEndOfString: "Dize tamamlanmamış.",
        UnexpectedEndOfNumber: "Sayı tamamlanmamış.",
        InvalidUnicode: "Unicode kaçışı geçersiz.",
        InvalidEscapeCharacter: "Kaçış dizisi geçersiz.",
        InvalidCharacter: "Bu karakter burada geçersiz.",
        Unknown: "JSON geçerli değil.",
      },
      guideTitle: "JSON kuralları ve sayıların korunması",
      guideBody:
        "Doğrulama RFC 8259'u izler: yorumlar, sondaki virgüller ve tek tırnaklar hata olarak bildirilir. Yinelenen anahtarlar uyarıyla korunur ve büyük sayılar girdiğiniz yazımı aynen tutar.",
      faqs: [
        {
          q: "Büyük sayılar değişir mi?",
          a: "Hayır. Biçimlendirme ve küçültme sayıları yeniden hesaplamaz; girdiğiniz yazımı korur ve büyük sayıları yuvarlamaz.",
        },
        {
          q: "Yinelenen anahtarlar neden bildirilir?",
          a: "Yazılımlar yinelenen nesne anahtarlarını farklı biçimde işleyebilir. AbsolTools, verileri sessizce silmek yerine anahtarları korur ve uyarı gösterir.",
        },
        {
          q: "Biçimlendirici geçersiz JSON'u onarır mı?",
          a: "Hayır. Kaynağı bilinçli olarak düzeltebilmeniz için yorumlar, sondaki virgüller, tek tırnaklar ve diğer geçersiz sözdizimleri bildirilir.",
        },
      ],
    },
    time: {
      title: "Unix zaman damgası dönüştürücü",
      description:
        "Saniye veya milisaniye cinsindeki Unix zaman damgalarını seçilen saat dilimindeki tarih ve saatlere, tarih ve saatleri de zaman damgalarına dönüştürün.",
      timestampMode: "Zaman damgasından tarih ve saate",
      dateMode: "Tarih ve saatten zaman damgasına",
      timestampLabel: "Unix zaman damgası",
      dateLabel: "Tarih ve saat",
      datePlaceholder: "YYYY-MM-DDTHH:mm",
      pickDate: "Tarih ve saat seç",
      unit: "Birim",
      auto: "Otomatik algıla",
      seconds: "Saniye",
      milliseconds: "Milisaniye",
      zoneMode: "Saat dilimi",
      utc: "UTC farkı",
      local: "Tarayıcı saat dilimi",
      selected: "IANA saat dilimi",
      zoneLabel: "Şehir, bölge veya IANA saat dilimi",
      zonePlaceholder: "İstanbul, Europe veya Europe/Istanbul arayın",
      popularZones: [
        {
          value: "Europe/Istanbul",
          label: "İstanbul, Türkiye — Europe/Istanbul · UTC+03:00",
        },
        {
          value: "Europe/London",
          label: "Londra, Birleşik Krallık — Europe/London",
        },
        { value: "Europe/Paris", label: "Paris, Fransa — Europe/Paris" },
        { value: "Europe/Madrid", label: "Madrid, İspanya — Europe/Madrid" },
        {
          value: "America/New_York",
          label: "New York, ABD — America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, ABD — America/Los_Angeles",
        },
        {
          value: "Asia/Seoul",
          label: "Seul, Güney Kore — Asia/Seoul · UTC+09:00",
        },
        { value: "Asia/Tokyo", label: "Tokyo, Japonya — Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Şanghay, Çin — Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapur — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "Kalküta, Hindistan — Asia/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "Sidney, Avustralya — Australia/Sydney",
        },
      ],
      offsetLabel: "UTC farkı",
      disambiguation: "Atlanan veya yinelenen yerel saat",
      reject: "Hata göster",
      earlier: "Erken sonucu kullan",
      later: "Geç sonucu kullan",
      now: "Şimdi",
      convert: "Dönüştür",
      instant: "UTC tarih ve saati",
      zoned: "Seçilen dilimde tarih ve saat",
      unixSeconds: "Unix zaman damgası (saniye)",
      unixMilliseconds: "Unix zaman damgası (milisaniye)",
      converted: "Dönüştürme tamamlandı",
      invalid:
        "Geçerli bir Unix zaman damgası veya ISO tarih ve saati girin; saat dilimini denetleyin.",
      ambiguousUnit:
        "11 veya 12 basamaklı değerlerin birimi belirsizdir. Saniye ya da milisaniye seçin.",
      nonexistentTime:
        "Saat ileri alındığı için bu tarih ve saat seçilen saat diliminde yoktur. Erken veya geç sonucu seçin.",
      repeatedTime:
        "Saat geri alındığı için bu tarih ve saat seçilen saat diliminde iki kez oluşur. Erken veya geç sonucu seçin.",
      y2038: "Bu değer işaretli 32 bit Unix zaman aralığının dışındadır.",
      guideTitle: "Birimler ve saat dilimleri nasıl işlenir?",
      guideBody:
        "Otomatik algılama; ondalıkları ve 1–10 basamaklı tam sayıları saniye, 13 basamaklı tam sayıları milisaniye kabul eder; 11 veya 12 basamaklı sayılarda birim seçmenizi ister. Yerel tarih ve saati doğrudan girebilir ya da seçiciyi kullanabilirsiniz; saniye ve kesirli saniye isteğe bağlıdır. Varsayılan, tarayıcının saat dilimidir. Bir zaman damgası dönüştürülürken saat dilimi yalnızca gösterilen yerel tarih ve saati değiştirir. Yerel tarih ve saat dönüştürülürken Unix değerini saat dilimi belirler.",
      faqs: [
        {
          q: "Otomatik birim algılama nasıl çalışır?",
          a: "Ondalıklar ve 1–10 basamaklı tam sayılar saniye, 13 basamaklı tam sayılar milisaniye kabul edilir. 11–12 basamaklı değerler için birim seçin.",
        },
        {
          q: "Hangi tarih biçimini girebilirim?",
          a: "2026-08-29T14:30 gibi UTC farkı içermeyen yerel tarih ve saat girin. Saniye ve dokuz basamağa kadar kesirli saniye isteğe bağlıdır; seçiciyi de kullanabilirsiniz.",
        },
        {
          q: "Saat dilimi seçenekleri nasıl ayrılır?",
          a: "Tarayıcı saat dilimi cihazınızdaki saat kurallarını izler. UTC farkı, +00:00 veya +03:00 gibi sabit bir değer kullanır. Europe/Istanbul gibi bir IANA dilimi o bölgenin saat değişikliği kurallarını izler.",
        },
        {
          q: "Yaz saati Unix zaman damgasını belirsiz yapar mı?",
          a: "Hayır. Unix zaman damgası tek bir anı belirtir. Belirsizlik yalnızca saatlerin değiştiği bir bölgede yerel tarih ve saati dönüştürürken ortaya çıkar: bazı yerel saatler atlanır, bazıları iki kez oluşur. Araç varsayılan olarak hata gösterir; yalnızca bilinçli olarak çözmek istiyorsanız erken veya geç sonucu seçin.",
        },
      ],
    },
    textCompare: {
      title: "Metin karşılaştırma",
      description:
        "İki metni yüklemeden satır satır karşılaştırın; eklemeleri, silmeleri ve düzenlemeleri vurgulayın.",
      originalLabel: "Özgün metin",
      changedLabel: "Değiştirilmiş metin",
      originalPlaceholder: "Özgün metni buraya yapıştırın…",
      changedPlaceholder: "Değiştirilmiş metni buraya yapıştırın…",
      compare: "Karşılaştır",
      swap: "Yer değiştir",
      results: "Karşılaştırma sonuçları",
      empty: "Karşılaştırmak için en az bir tarafa metin girin.",
      tooLarge: "Her metin 1 MiB veya daha küçük olmalıdır.",
      tooManyLines: "İki metin toplamda en fazla 20.000 satır içerebilir.",
      tooComplex:
        "Bu karşılaştırma güvenle işlenemeyecek kadar karmaşık. Daha kısa metinler deneyin.",
      stale:
        "Aşağıdaki sonuç önceki karşılaştırmaya aittir. Güncellemek için yeniden karşılaştırın.",
      complete: "Karşılaştırma tamamlandı",
      identical: "İki metin aynı.",
      approximate:
        "Bu tarayıcı Intl.Segmenter özelliğini desteklemediği için satır içi karakter vurguları yaklaşıktır.",
      inlineLimited:
        "Karşılaştırmanın hızlı kalması için bazı uzun düzenlenmiş satırlar tüm satır değişikliği olarak gösterilir.",
      additions: "Eklenen satırlar: {count}",
      deletions: "Silinen satırlar: {count}",
      changes: "Değişen satırlar: {count}",
      previousChange: "Önceki değişiklik",
      nextChange: "Sonraki değişiklik",
      expandUnchanged: "Değişmeyen {count} satırı göster",
      whitespaceChange: "Boşluk değişti",
      lineEndingChange: "Satır sonu değişti",
      unchangedRow: "Değişmeyen satır",
      addedRow: "Eklenen satır",
      removedRow: "Silinen satır",
      changedRow: "Değişen satır",
      originalLine: "Özgün metin {line}. satır",
      changedLine: "Değiştirilmiş metin {line}. satır",
      guideTitle: "Karşılaştırma nasıl çalışır?",
      guideBody:
        "Karşılaştırma önce satırları hizalar, ardından eşleştirilmiş değişen satırlardaki karakter düzeyi düzenlemeleri vurgular. Yalnızca boşluk veya satır sonu değişiklikleri açıkça etiketlenir. Değişmeyen uzun bölümler siz açana kadar daraltılmış kalır.",
      faqs: [
        {
          q: "AbsolTools metinleri yükler mi?",
          a: "Hayır. İki metin tarayıcınızda yerel olarak karşılaştırılır ve bir sunucuya gönderilmez.",
        },
        {
          q: "Farklı satır sonları algılanır mı?",
          a: "Evet. Görünen satır metni aynı olsa bile CRLF, LF ve CR satır sonları arasındaki farklar işaretlenir.",
        },
      ],
    },
    caseConverter: {
      title: "Büyük-küçük harf dönüştürücü",
      description:
        "Metni yüklemeden büyük harfe, küçük harfe, cümle düzenine veya kelime başları büyük biçime dönüştürün.",
      inputLabel: "Metin",
      outputLabel: "Dönüştürülen metin",
      placeholder: "Metni yazın veya yapıştırın…",
      outputPlaceholder: "Dönüştürülen metin burada görünür.",
      modeLabel: "Dönüştürme",
      upper: "BÜYÜK HARF",
      lower: "küçük harf",
      sentence: "Cümle düzeni",
      capitalizeWords: "Kelime başlarını büyüt",
      converted: "Dönüştürme tamamlandı",
      noChange: "Metin zaten bu dönüşümle aynı.",
      outdated: "Görünen çıktı önceki girdiye aittir.",
      tooLarge: "Girdi 1 MB sınırını aşıyor.",
      guideTitle: "Dönüşümler nasıl çalışır?",
      guideBody:
        "Büyük ve küçük harf dönüşümü Unicode'un varsayılan, dilden bağımsız eşlemelerini kullanır; Türkçeye özgü yerel eşleme uygulanmaz ve özellikle I/İ/ı/i sonuçları Türkçe yazım beklentisinden farklı olabilir. Cümle düzeni metni küçük harfe çevirir ve başta, satır sonundan sonra veya . ! ? 。 ！ ？ işaretlerinden sonra gelen ilk harf biçimli karakteri büyütür. Kelime başlarını büyütme, boşlukları, noktalama işaretlerini, satır sonlarını, kesme işaretlerini, kısa çizgileri ve alt çizgileri koruyarak her kelimenin ilk harf biçimli karakterini büyütür.",
      faqs: [
        {
          q: "Kelime başlarını büyütmek başlık düzeniyle aynı mı?",
          a: "Hayır. Her kelimeyi mekanik olarak büyütür; edatlar, özel adlar, kısaltmalar veya Türkçeye özgü başlık kurallarını uygulamaz.",
        },
        {
          q: "Boşluklar ve satır sonları korunur mu?",
          a: "Evet. Araç yalnızca harf biçimini değiştirir; özgün boşlukları, noktalama işaretlerini ve satır sonlarını korur.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Örnek: AbsolTools çevrim içi kelimeleri ve karakterleri sayar.",
    jsonInput: 'Örnek: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Örnek: 1704067200 (saniye) veya 1704067200000 (milisaniye).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Örnek biçim: 2024-01-01T00:00. Saniye isteğe bağlıdır; tarih ve saat seçicisini de kullanabilirsiniz.",
    timeResult: "Dönüştürülen değer",
  },
  catalog: {
    "base64-decode": {
      name: "Base64 kod çözücü",
      summary: "Base64 metnini veya dosyalarını çevrim içi çözün.",
      searchTerms: [
        "Base64 çözme",
        "kod çözücü",
        "Base64URL",
        "Veri URI",
        "metin",
        "dosya",
        "ikili",
      ],
    },
    "base64-encode": {
      name: "Base64 kodlayıcı",
      summary: "Metni veya dosyaları çevrim içi Base64 olarak kodlayın.",
      searchTerms: [
        "Base64 kodlama",
        "kodlayıcı",
        "Base64URL",
        "Veri URI",
        "metin",
        "dosya",
        "ikili",
      ],
    },
    "word-counter": {
      name: "Kelime ve karakter sayacı",
      summary:
        "Kelimeleri, karakterleri, satırları ve paragrafları çevrim içi sayın.",
      searchTerms: [
        "kelime sayısı",
        "karakter sayısı",
        "boşluksuz",
        "satır sayısı",
        "paragraf",
        "metin",
      ],
    },
    "json-formatter": {
      name: "JSON biçimlendirici",
      summary: "JSON'u okunaklı yapın, doğrulayın veya tek satıra küçültün.",
      searchTerms: [
        "JSON biçimlendirme",
        "JSON doğrulama",
        "JSON küçültme",
        "JSON düzenleme",
        "veri",
      ],
    },
    "unix-timestamp-converter": {
      name: "Unix zaman damgası dönüştürücü",
      summary:
        "Unix saniye veya milisaniyelerini tarih ve saate, tarih ve saati de geri dönüştürün.",
      searchTerms: [
        "Unix zamanı",
        "epoch",
        "zaman damgası",
        "saniye",
        "milisaniye",
        "tarih",
      ],
    },
    "text-compare": {
      name: "Metin karşılaştırma",
      summary: "İki metni satır satır karşılaştırın ve farkları vurgulayın.",
      searchTerms: [
        "metin karşılaştırma",
        "metin farkı",
        "farklar",
        "satır karşılaştırma",
        "diff",
      ],
    },
    "case-converter": {
      name: "Büyük-küçük harf dönüştürücü",
      summary:
        "Metni büyük, küçük, cümle veya kelime başı büyük biçime dönüştürün.",
      searchTerms: [
        "büyük harf",
        "küçük harf",
        "cümle düzeni",
        "kelime başı",
        "harf dönüştürme",
        "metin",
      ],
    },
    ...newToolCatalog,
  },
  tools,
  network: {
    allTools: "Tüm araçlar",
    directoryMetaTitle: "AbsolTools | Tarayıcıda metin, veri ve kod araçları",
    directoryMetaDescription:
      "Metin, veri ve kodu doğrudan tarayıcıda biçimlendirin, dönüştürün, kodlayın, çözün, karşılaştırın ve inceleyin. Girdiler ve sonuçlar yüklenmez.",
    directoryTitle:
      "Sık kullandığınız araçları daha sade ve kullanışlı hâle getiriyoruz",
    directoryIntro:
      "Bu siteyi yer imlerinize ekleyin; böylece bir sonraki sefer doğrudan erişebilirsiniz.",
    toolPromise:
      "AbsolTools, sık kullanılan çevrim içi araçları daha doğru ve kullanışlı hâle getirir. Siteyi yer imlerinize ekleyin.",
    directorySearchLabel: "Araçlarda ara",
    directorySearchPlaceholder: "Ad, açıklama veya anahtar kelimeyle ara",
    directorySearchClear: "Aramayı temizle",
    directorySearchNoResults: "Aramanızla eşleşen araç yok.",
    directorySearchCount: "Eşleşen araçlar: {count}",
    available: "Kullanılabilir",
    research: "Ön izleme",
    reserve: "Değerlendiriliyor",
    breadcrumbLabel: "Gezinti yolu",
    encodingCategory: "Kodlama ve kod çözme",
    categories: {
      encoding: "Kodlama ve kod çözme",
      text: "Metin",
      converter: "Dönüştürücüler",
      image: "Görseller",
      data: "Veri",
      time: "Zaman",
    },
    footerNote: "Sık kullanılan özellikler, daha kolay kullanım.",
    catalogAria: "Araç dizini",
    useLightTheme: "Açık temayı kullan",
    useDarkTheme: "Koyu temayı kullan",
    relatedTools: "İlgili araçlar",
  },
};

export default bundle;
