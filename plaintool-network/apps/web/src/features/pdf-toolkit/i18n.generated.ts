// Generated from the reviewed English PDF toolkit source copy.
// Keep every locale object complete; do not replace entries with source-locale fallbacks.
export const generatedPdfLocaleTexts = {
  es: {
    ui: {
      ariaLabel: "herramientas PDF",
      choosePdf: "Elegir PDF",
      choosePdfs: "Elegir PDFs",
      chooseImages: "Elegir imágenes",
      addFiles: "Agregar archivos",
      replaceFile: "Reemplazar archivo",
      dropPdf: "o suelta un PDF aquí",
      dropPdfs: "o suelta PDFs aquí",
      dropImages: "o arrastra imágenes aquí",
      pdfTypes: "PDF · hasta 200 MiB en esta sesión del navegador",
      imageTypes: "JPG, PNG o WebP · hasta 200 MiB en total",
      selectedFiles: "Archivos seleccionados",
      options: "Opciones",
      result: "Resultado",
      remove: "Eliminar",
      moveUp: "Mover hacia arriba",
      moveDown: "Mover hacia abajo",
      pages: "páginas",
      page: "página",
      size: "Tamaño",
      dimensions: "Dimensiones",
      progress: "Progreso",
      cancel: "Cancelar",
      complete: "tarea de PDF completada",
      compress: "Comprimir PDF",
      merge: "Unir PDFs",
      split: "Dividir PDF",
      convertToImages: "Convertir a imágenes",
      createPdf: "Crear PDF",
      downloadPdf: "Descargar PDF",
      downloadZip: "Descargar ZIP",
      downloadImage: "Descargar imagen",
      originalSize: "Tamaño original",
      resultSize: "Tamaño del resultado",
      smallerBy: "Más pequeño en",
      largerBy: "Más grande en",
      compressionLevel: "Nivel de compresión",
      preserveDocument: "Conservar documento",
      preserveDocumentHint:
        "Mantiene el texto seleccionable y las funciones del documento; el tamaño puede cambiar poco.",
      balanced: "Equilibrado · recomendado",
      balancedHint:
        "144 DPI y calidad JPEG equilibrada para escaneos y PDFs con muchas imágenes.",
      smallerFile: "Archivo más pequeño",
      smallerFileHint: "110 DPI y compresión de imagen más fuerte.",
      rasterWarningTitle: "Las páginas se convierten en imágenes",
      rasterWarningBody:
        "Los modos equilibrado y más pequeño preservan la apariencia, pero eliminan la selección de texto, la búsqueda, los enlaces, los formularios, las anotaciones, las capas y la estructura de accesibilidad.",
      extractPages: "Extraer páginas",
      splitDocument: "Dividir documento",
      pageSelection: "Páginas",
      pageSelectionHint: "Ejemplo: 1, 3-5",
      everyPages: "Cada N páginas",
      customRanges: "Rangos personalizados",
      pagesPerFile: "Páginas por PDF",
      customRangesHint: "Cada rango separado por comas se convierte en un PDF.",
      selectAll: "Seleccionar todo",
      clearSelection: "Borrar selección",
      outputFormat: "Formato de imagen",
      resolution: "Resolución",
      quality: "Calidad JPG",
      pageSize: "Tamaño de página",
      fitImage: "Ajustar imagen",
      orientation: "Orientación",
      automatic: "Automático",
      portrait: "Vertical",
      landscape: "Horizontal",
      margin: "Margen",
      noMargin: "Sin margen",
      smallMargin: "Pequeño",
      largeMargin: "Grande",
      resultFiles: "Archivos de resultados",
      noReduction:
        "El resultado no es más pequeño. Intenta otro ajuste preestablecido o conserva el original.",
      fileTooLarge:
        "Los archivos seleccionados superan el límite de procesamiento local de 200 MiB.",
      tooManyPages: "Este PDF supera el límite de copia de 500 páginas.",
      tooManyRasterPages:
        "Selecciona como máximo 120 páginas y mantén la salida renderizada por debajo de 240 megapíxeles.",
      invalidPdf: "Elige un archivo PDF válido y legible.",
      encryptedPdf:
        "Los PDF protegidos con contraseña aún no son compatibles. Desbloquea el archivo primero e inténtalo de nuevo.",
      invalidImage:
        "No se pudo leer una imagen. Prueba con un archivo JPG, PNG o WebP válido.",
      unsupportedImage: "Elige imágenes JPG, PNG o WebP.",
      minimumMergeFiles: "Elige al menos dos PDF para fusionar.",
      emptySelection: "Selecciona al menos una página.",
      invalidRange:
        "Verifica la expresión de la página. Usa valores como 1, 3-5.",
      rangeOutOfBounds:
        "Se seleccionó una página que está fuera del recuento de páginas de este documento.",
      reversedRange: "Un rango de páginas debe comenzar antes de que termine.",
      renderFailed:
        "No se pudo renderizar una página. Intente con un rango más pequeño o una resolución más baja.",
      workerFailed:
        "No se pudo procesar el PDF en este navegador. Verifique el archivo y vuelva a intentarlo.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Cómo usar {title}",
    safetyTitle: "Los archivos permanecen en este navegador",
    safetyBody:
      "Los archivos seleccionados y los resultados se procesan únicamente en esta pestaña del navegador. No se cargan, almacenan, agregan a una URL ni se envían a un tercero.",
    privacyQuestion: "¿Se suben mis archivos?",
    privacyAnswer:
      "No. La lectura de archivos, el procesamiento de PDF, la representación y la creación de ZIP ocurren localmente en esta pestaña del navegador.",
    limitQuestion: "¿Por qué hay límites de páginas y archivos?",
    limitAnswer:
      "La renderización de PDF puede usar varios bytes de memoria por píxel. Los límites evitan que trabajos grandes congelen o cierren la pestaña del navegador.",
    pages: {
      "compress-pdf": {
        title: "Comprimir PDF",
        description:
          "Reduce el tamaño de un PDF y elige si quieres conservar las funciones del documento.",
        guide:
          "Elige un PDF y un nivel de compresión, y descarga el resultado. Usa Conservar documento si necesitas mantener el texto seleccionable y los enlaces.",
        faqQuestion:
          "¿La compresión mantendrá el texto y los enlaces seleccionables?",
        faqAnswer:
          "Preservar documento mantiene el contenido de la página. Los modos equilibrado y más pequeño convierten las páginas en imágenes, por lo que se eliminan la selección, búsqueda, enlaces, formularios, anotaciones, capas y la estructura de accesibilidad.",
        searchTerms: [
          "comprimir PDF",
          "reducir el tamaño de PDF",
          "compresor de PDF",
        ],
      },
      "merge-pdf": {
        title: "Combinar PDF",
        description:
          "Combina varios PDF en un solo archivo en el orden que elijas.",
        guide:
          "Añade al menos dos PDF, ordénalos como prefieras y descarga el archivo combinado.",
        faqQuestion: "¿Puedo cambiar el orden de las páginas dentro de un PDF?",
        faqAnswer:
          "Esta primera versión ordena archivos completos. Divide o reorganiza el PDF de origen primero cuando las páginas individuales necesiten un orden diferente.",
        searchTerms: ["combinar PDF", "combinar PDFs", "fusión de PDF"],
      },
      "split-pdf": {
        title: "Dividir PDF",
        description:
          "Extrae las páginas que quieras o divide un PDF en varios archivos.",
        guide:
          "Elige un PDF y extrae páginas o divídelo por número de páginas o rangos. Los resultados múltiples se descargan en un ZIP.",
        faqQuestion: "¿La división reduce la calidad de las páginas?",
        faqAnswer:
          "No se utiliza rasterización para la división. Las páginas existentes del PDF se copian en nuevos archivos, aunque las funciones avanzadas de todo el documento pueden no trasladarse.",
        searchTerms: [
          "dividir PDF",
          "extraer páginas de PDF",
          "divisor de PDF",
        ],
      },
      "pdf-to-image": {
        title: "PDF a Imagen",
        description:
          "Convierte las páginas seleccionadas de un PDF en imágenes JPG o PNG.",
        guide:
          "Elige un PDF y las páginas, el formato de imagen y la resolución. Varias páginas se descargan en un ZIP.",
        faqQuestion: "¿Debería elegir JPG o PNG?",
        faqAnswer:
          "JPG suele ser más pequeño para fotos y escaneos. PNG es sin pérdida y a menudo mejor para diagramas, texto nítido o transparencia, pero puede ser mucho más grande.",
        searchTerms: ["PDF a imagen", "PDF a JPG", "PDF a PNG"],
      },
      "image-to-pdf": {
        title: "Imagen a PDF",
        description:
          "Combina imágenes JPG, PNG o WebP en un PDF en el orden que elijas.",
        guide:
          "Añade y ordena las imágenes, elige el diseño de página y crea el PDF para descargarlo.",
        faqQuestion: "¿Mis imágenes se recortan o se amplían?",
        faqAnswer:
          "No. Las imágenes se centran y solo se reducen cuando es necesario. El modo ajustar utiliza las proporciones propias de cada imagen para la página del PDF.",
        searchTerms: ["imagen a PDF", "JPG a PDF", "PNG a PDF"],
      },
    },
  },
  de: {
    ui: {
      ariaLabel: "PDF Werkzeuge",
      choosePdf: "Wähle PDF",
      choosePdfs: "Wähle PDFs",
      chooseImages: "Wähle Bilder",
      addFiles: "Dateien hinzufügen",
      replaceFile: "Datei ersetzen",
      dropPdf: "oder ziehe eine PDF hierher",
      dropPdfs: "oder ziehe PDFs hierher",
      dropImages: "oder Bilder hier ablegen",
      pdfTypes: "PDF · bis zu 200 MiB in dieser Browsersitzung",
      imageTypes: "JPG, PNG oder WebP · insgesamt bis zu 200 MiB",
      selectedFiles: "Ausgewählte Dateien",
      options: "Optionen",
      result: "Ergebnis",
      remove: "Entfernen",
      moveUp: "Nach oben verschieben",
      moveDown: "Nach unten bewegen",
      pages: "Seiten",
      page: "Seite",
      size: "Größe",
      dimensions: "Abmessungen",
      progress: "Fortschritt",
      cancel: "Abbrechen",
      complete: "PDF Aufgabe abgeschlossen",
      compress: "PDF komprimieren",
      merge: "PDFs zusammenführen",
      split: "PDF teilen",
      convertToImages: "In Bilder konvertieren",
      createPdf: "PDF erstellen",
      downloadPdf: "PDF herunterladen",
      downloadZip: "ZIP herunterladen",
      downloadImage: "Bild herunterladen",
      originalSize: "Originalgröße",
      resultSize: "Ergebnisgröße",
      smallerBy: "Kleiner um",
      largerBy: "Größer um",
      compressionLevel: "Komprimierungsstufe",
      preserveDocument: "Dokument beibehalten",
      preserveDocumentHint:
        "Behält auswählbaren Text und Dokumentfunktionen; Größe kann sich geringfügig ändern.",
      balanced: "Ausgewogen · empfohlen",
      balancedHint:
        "144 DPI und ausgewogene JPEG-Qualität für Scans und bildlastige PDFs.",
      smallerFile: "Kleinere Datei",
      smallerFileHint: "110 DPI und stärkere Bildkompression.",
      rasterWarningTitle: "Seiten werden zu Bildern",
      rasterWarningBody:
        "Ausgewogene und kleinere Modi bewahren das Erscheinungsbild, entfernen jedoch die Textauswahl, Suche, Links, Formulare, Anmerkungen, Ebenen und Barrierefreiheitsstruktur.",
      extractPages: "Seiten extrahieren",
      splitDocument: "Dokument aufteilen",
      pageSelection: "Seiten",
      pageSelectionHint: "Beispiel: 1, 3-5",
      everyPages: "Jede N Seiten",
      customRanges: "Benutzerdefinierte Bereiche",
      pagesPerFile: "Seiten pro PDF",
      customRangesHint:
        "Jeder durch Komma getrennte Bereich wird zu einem PDF.",
      selectAll: "Alle auswählen",
      clearSelection: "Auswahl löschen",
      outputFormat: "Bildformat",
      resolution: "Auflösung",
      quality: "JPG Qualität",
      pageSize: "Seitengröße",
      fitImage: "Bild anpassen",
      orientation: "Ausrichtung",
      automatic: "Automatisch",
      portrait: "Hochformat",
      landscape: "Querformat",
      margin: "Rand",
      noMargin: "Kein Rand",
      smallMargin: "Klein",
      largeMargin: "Groß",
      resultFiles: "Ergebnisdateien",
      noReduction:
        "Das Ergebnis ist nicht kleiner. Versuchen Sie eine andere Voreinstellung oder behalten Sie das Original.",
      fileTooLarge:
        "Die ausgewählten Dateien überschreiten das lokale Verarbeitungs-Limit von 200 MiB.",
      tooManyPages: "Dieses PDF überschreitet das Kopierlimit von 500 Seiten.",
      tooManyRasterPages:
        "Wählen Sie höchstens 120 Seiten aus und halten Sie die gerenderte Ausgabe unter 240 Megapixeln.",
      invalidPdf: "Wählen Sie eine gültige, lesbare PDF-Datei.",
      encryptedPdf:
        "Passwortgeschützte PDF-Dateien werden derzeit nicht unterstützt. Entsperren Sie die Datei zuerst und versuchen Sie es erneut.",
      invalidImage:
        "Ein Bild konnte nicht gelesen werden. Versuchen Sie eine gültige JPG-, PNG- oder WebP-Datei.",
      unsupportedImage: "Wählen Sie JPG-, PNG- oder WebP-Bilder.",
      minimumMergeFiles:
        "Wählen Sie mindestens zwei PDF-Dateien zum Zusammenführen aus.",
      emptySelection: "Wählen Sie mindestens eine Seite aus.",
      invalidRange:
        "Überprüfen Sie den Seitenausdruck. Verwenden Sie Werte wie 1, 3-5.",
      rangeOutOfBounds:
        "Eine ausgewählte Seite liegt außerhalb der Seitenanzahl dieses Dokuments.",
      reversedRange: "Ein Seitenbereich muss vor seinem Ende beginnen.",
      renderFailed:
        "Eine Seite konnte nicht dargestellt werden. Versuchen Sie einen kleineren Bereich oder eine niedrigere Auflösung.",
      workerFailed:
        "Die PDF konnte in diesem Browser nicht verarbeitet werden. Überprüfen Sie die Datei und versuchen Sie es erneut.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Wie man {title} benutzt",
    safetyTitle: "Dateien bleiben in diesem Browser",
    safetyBody:
      "Die ausgewählten Dateien und Ergebnisse werden nur in diesem Browsertab verarbeitet. Sie werden nicht hochgeladen, gespeichert, zu einer URL hinzugefügt oder an Dritte gesendet.",
    privacyQuestion: "Werden meine Dateien hochgeladen?",
    privacyAnswer:
      "Nein. Das Lesen der Dateien, die PDF-Verarbeitung, die Anzeige und die Erstellung von ZIP erfolgen lokal in diesem Browsertab.",
    limitQuestion: "Warum gibt es Seiten- und Dateibegrenzungen?",
    limitAnswer:
      "PDF-Rendering kann mehrere Bytes Speicher pro Pixel verwenden. Die Begrenzungen verhindern, dass große Aufträge den Browser-Tab einfrieren oder schließen.",
    pages: {
      "compress-pdf": {
        title: "PDF komprimieren",
        description:
          "Verkleinern Sie eine PDF und wählen Sie, ob Dokumentfunktionen erhalten bleiben sollen.",
        guide:
          "Wählen Sie eine PDF und eine Komprimierungsstufe und laden Sie das Ergebnis herunter. Nutzen Sie Dokument beibehalten, wenn auswählbarer Text und Links wichtig sind.",
        faqQuestion:
          "Bleiben auswählbarer Text und Links bei der Kompression erhalten?",
        faqAnswer:
          "Dokument beibehalten erhält den Seiteninhalt. Ausgewogen- und kleine Modi wandeln Seiten in Bilder um, sodass Auswahl, Suche, Links, Formulare, Anmerkungen, Ebenen und Zugänglichkeitsstruktur entfernt werden.",
        searchTerms: [
          "PDF komprimieren",
          "PDF Größe reduzieren",
          "PDF Kompressor",
        ],
      },
      "merge-pdf": {
        title: "PDF zusammenführen",
        description:
          "Führen Sie mehrere PDFs in der gewünschten Reihenfolge zu einer Datei zusammen.",
        guide:
          "Fügen Sie mindestens zwei PDFs hinzu, ordnen Sie sie wie gewünscht an und laden Sie die zusammengeführte Datei herunter.",
        faqQuestion:
          "Kann ich die Seitenreihenfolge innerhalb eines PDF ändern?",
        faqAnswer:
          "Diese erste Version ordnet ganze Dateien. Teile oder ordne das Quell-PDF zuerst neu, wenn einzelne Seiten eine andere Reihenfolge benötigen.",
        searchTerms: [
          "PDF zusammenführen",
          "PDFs zusammenführen",
          "PDF-Zusammenführung",
        ],
      },
      "split-pdf": {
        title: "PDF teilen",
        description:
          "Extrahieren Sie ausgewählte Seiten oder teilen Sie eine PDF in mehrere Dateien.",
        guide:
          "Wählen Sie eine PDF und extrahieren Sie Seiten oder teilen Sie sie nach Seitenzahl oder Bereichen. Mehrere Ergebnisse werden als ZIP heruntergeladen.",
        faqQuestion: "Führt das Teilen zu Qualitätsverlusten bei den Seiten?",
        faqAnswer:
          "Für das Teilen wird keine Rasterisierung verwendet. Bestehende PDF-Seiten werden in neue Dateien kopiert, obwohl erweiterte dokumentweite Funktionen möglicherweise nicht übernommen werden.",
        searchTerms: ["PDF teilen", "PDF Seiten extrahieren", "PDF-Teiler"],
      },
      "pdf-to-image": {
        title: "PDF zu Bild",
        description:
          "Wandeln Sie ausgewählte PDF-Seiten in JPG- oder PNG-Bilder um.",
        guide:
          "Wählen Sie eine PDF sowie Seiten, Bildformat und Auflösung. Mehrere Seiten werden als ZIP heruntergeladen.",
        faqQuestion: "Soll ich JPG oder PNG wählen?",
        faqAnswer:
          "JPG ist normalerweise kleiner für Fotos und Scans. PNG ist verlustfrei und oft besser für Diagramme, scharfen Text oder Transparenz, kann aber deutlich größer sein.",
        searchTerms: ["PDF zu Bild", "PDF zu JPG", "PDF zu PNG"],
      },
      "image-to-pdf": {
        title: "Bild zu PDF",
        description:
          "Führen Sie JPG-, PNG- oder WebP-Bilder in der gewünschten Reihenfolge zu einer PDF zusammen.",
        guide:
          "Fügen Sie Bilder hinzu, ordnen Sie sie an, wählen Sie das Seitenlayout und erstellen Sie die PDF zum Herunterladen.",
        faqQuestion: "Werden meine Bilder beschnitten oder vergrößert?",
        faqAnswer:
          "Nein. Bilder sind zentriert und werden nur bei Bedarf verkleinert. Der Anpassungsmodus verwendet die eigenen Proportionen jedes Bildes für die PDF-Seite.",
        searchTerms: ["Bild zu PDF", "JPG zu PDF", "PNG zu PDF"],
      },
    },
  },
  ja: {
    ui: {
      ariaLabel: "PDF ツール",
      choosePdf: "PDF を選択",
      choosePdfs: "PDF を選択",
      chooseImages: "画像を選択",
      addFiles: "ファイルを追加",
      replaceFile: "ファイルを置き換え",
      dropPdf: "またはここに PDF をドロップ",
      dropPdfs: "またはここに PDF をドロップ",
      dropImages: "またはここに画像をドロップ",
      pdfTypes: "PDF · このブラウザーセッションで最大200 MiB",
      imageTypes: "JPG、PNG、またはWebP · 合計最大200 MiB",
      selectedFiles: "選択されたファイル",
      options: "オプション",
      result: "結果",
      remove: "削除",
      moveUp: "上に移動",
      moveDown: "下に移動",
      pages: "ページ",
      page: "ページ",
      size: "サイズ",
      dimensions: "寸法",
      progress: "進行状況",
      cancel: "キャンセル",
      complete: "PDF タスク完了",
      compress: "PDF を圧縮",
      merge: "PDF を結合",
      split: "PDF を分割",
      convertToImages: "画像に変換",
      createPdf: "PDF を作成",
      downloadPdf: "PDF をダウンロード",
      downloadZip: "ZIP をダウンロード",
      downloadImage: "画像をダウンロード",
      originalSize: "元のサイズ",
      resultSize: "結果のサイズ",
      smallerBy: "小さくする量",
      largerBy: "大きくする量",
      compressionLevel: "圧縮レベル",
      preserveDocument: "ドキュメントを保持",
      preserveDocumentHint:
        "選択可能なテキストとドキュメント機能を保持します。サイズはわずかに変わる場合があります。",
      balanced: "バランス型・推奨",
      balancedHint:
        "スキャンや画像が多いPDF向けに、144 DPI とバランスの取れたJPEG品質。",
      smallerFile: "ファイルサイズを小さく",
      smallerFileHint: "110 DPI とより強力な画像圧縮。",
      rasterWarningTitle: "ページが画像になります",
      rasterWarningBody:
        "バランスおよび小サイズモードは見た目を保持しますが、テキスト選択、検索、リンク、フォーム、注釈、レイヤー、アクセシビリティ構造は削除されます。",
      extractPages: "ページを抽出",
      splitDocument: "文書を分割",
      pageSelection: "ページ",
      pageSelectionHint: "例: 1、3-5",
      everyPages: "Nページごと",
      customRanges: "カスタム範囲",
      pagesPerFile: "PDFごとのページ",
      customRangesHint: "カンマで区切られた各範囲が1つのPDFになります。",
      selectAll: "すべて選択",
      clearSelection: "選択をクリア",
      outputFormat: "画像形式",
      resolution: "解像度",
      quality: "JPG 品質",
      pageSize: "ページサイズ",
      fitImage: "画像に合わせる",
      orientation: "方向",
      automatic: "自動",
      portrait: "縦",
      landscape: "横",
      margin: "余白",
      noMargin: "余白なし",
      smallMargin: "小",
      largeMargin: "大",
      resultFiles: "結果ファイル",
      noReduction:
        "結果は小さくなっていません。別のプリセットを試すか、元のままにしてください。",
      fileTooLarge:
        "選択したファイルは 200 MiB のローカル処理制限を超えています。",
      tooManyPages: "この PDF は 500ページのコピー制限を超えています。",
      tooManyRasterPages:
        "最大120ページを選択し、レンダリングされた出力を240メガピクセル以下にしてください。",
      invalidPdf: "有効で読み取り可能なPDFファイルを選択してください。",
      encryptedPdf:
        "パスワード保護されたPDFはまだサポートされていません。まずファイルのロックを解除してから再試行してください。",
      invalidImage:
        "1つの画像を読み取れませんでした。有効なJPG、PNG、またはWebPファイルを試してください。",
      unsupportedImage: "JPG、PNG、またはWebP画像を選択してください。",
      minimumMergeFiles:
        "マージするには、少なくとも2つのPDFを選択してください。",
      emptySelection: "少なくとも1ページを選択してください。",
      invalidRange:
        "ページ指定を確認してください。値は1、3-5のように入力してください。",
      rangeOutOfBounds:
        "選択されたページは、このドキュメントのページ数の範囲外です。",
      reversedRange: "ページ範囲は、終了より前に開始する必要があります。",
      renderFailed:
        "ページをレンダリングできませんでした。より小さい範囲または低い解像度を試してください。",
      workerFailed:
        "このブラウザーでは PDF を処理できませんでした。ファイルを確認して、もう一度試してください。",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "{title} の使い方",
    safetyTitle: "ファイルはこのブラウザ内にとどまります",
    safetyBody:
      "選択したファイルと結果は、このブラウザタブ内でのみ処理されます。アップロード、保存、URLへの追加、または第三者への送信は行われません。",
    privacyQuestion: "ファイルはアップロードされますか？",
    privacyAnswer:
      "いいえ。ファイルの読み取り、PDF の処理、レンダリング、ZIP の作成はこのブラウザタブ内でローカルに行われます。",
    limitQuestion: "なぜページとファイルの制限があるのですか？",
    limitAnswer:
      "PDF のレンダリングはピクセルごとに数バイトのメモリを使用する場合があります。この制限は、大きなジョブがブラウザのタブをフリーズさせたり閉じたりするのを防ぎます。",
    pages: {
      "compress-pdf": {
        title: "PDF を圧縮する",
        description:
          "文書機能を残すか選びながら、PDF のファイルサイズを小さくします。",
        guide:
          "PDF と圧縮設定を選び、結果をダウンロードします。テキスト選択やリンクが必要な場合は、文書を保持する設定を使ってください。",
        faqQuestion: "圧縮で選択可能なテキストやリンクは保持されますか？",
        faqAnswer:
          "ドキュメントを保持はページ内容を保持します。バランスと小サイズモードではページが画像に変換されるため、選択、検索、リンク、フォーム、注釈、レイヤー、アクセシビリティ構造は削除されます。",
        searchTerms: [
          "PDF を圧縮する",
          "PDF のサイズを縮小",
          "PDF コンプレッサー",
        ],
      },
      "merge-pdf": {
        title: "PDF を結合",
        description: "複数の PDF を好きな順番で 1 つのファイルにまとめます。",
        guide:
          "PDF を 2 つ以上追加し、希望の順番に並べてから結合したファイルをダウンロードします。",
        faqQuestion: "1 つの PDF 内でページの順序を変更できますか？",
        faqAnswer:
          "この最初のバージョンでは、ファイル全体の順序を付けます。個別のページで異なる順序が必要な場合は、最初にソース PDF を分割または並べ替えてください。",
        searchTerms: ["PDF を結合", "PDFを結合", "PDFの統合"],
      },
      "split-pdf": {
        title: "PDFを分割",
        description:
          "必要なページを抽出するか、PDF を複数のファイルに分割します。",
        guide:
          "PDF を選び、ページを抽出するか、ページ数または範囲で分割します。複数の結果は ZIP でダウンロードされます。",
        faqQuestion: "分割するとページの品質は低下しますか？",
        faqAnswer:
          "分割ではラスタライズは使用されません。既存のPDFページは新しいファイルにコピーされます。ただし、高度なドキュメント全体の機能は継承されない場合があります。",
        searchTerms: ["PDFを分割", "PDF のページを抽出", "PDF 分割ツール"],
      },
      "pdf-to-image": {
        title: "PDF を画像に変換",
        description: "選択した PDF ページを JPG または PNG 画像に変換します。",
        guide:
          "PDF と必要なページ、画像形式、解像度を選んで変換します。複数ページは ZIP でダウンロードされます。",
        faqQuestion: "JPG と PNG のどちらを選ぶべきですか？",
        faqAnswer:
          "写真やスキャンには通常 JPG の方が小さくなります。PNG は可逆圧縮で、図、鮮明なテキスト、透過部分に適していますが、サイズが非常に大きくなることがあります。",
        searchTerms: [
          "PDF から画像へ",
          "PDF を JPG に変換",
          "PDF を PNG に変換",
        ],
      },
      "image-to-pdf": {
        title: "画像を PDF に変換",
        description:
          "JPG、PNG、WebP 画像を好きな順番で 1 つの PDF にまとめます。",
        guide:
          "画像を追加して順番を整え、ページレイアウトを選んで PDF を作成・ダウンロードします。",
        faqQuestion: "画像は切り取られたり拡大されたりしますか？",
        faqAnswer:
          "いいえ。画像は中央に配置され、必要な場合のみ縮小されます。フィットモードでは、各画像の比率を使って PDF ページに合わせます。",
        searchTerms: ["画像を PDF に変換", "JPG を PDF に", "PNG を PDF に"],
      },
    },
  },
  fr: {
    ui: {
      ariaLabel: "outils PDF",
      choosePdf: "Choisir PDF",
      choosePdfs: "Choisir des PDF",
      chooseImages: "Choisir des images",
      addFiles: "Ajouter des fichiers",
      replaceFile: "Remplacer le fichier",
      dropPdf: "ou déposer un PDF ici",
      dropPdfs: "ou déposer des PDF ici",
      dropImages: "ou déposer des images ici",
      pdfTypes: "PDF · jusqu'à 200 MiB dans cette session de navigateur",
      imageTypes: "JPG, PNG ou WebP · jusqu'à 200 MiB au total",
      selectedFiles: "Fichiers sélectionnés",
      options: "Options",
      result: "Résultat",
      remove: "Supprimer",
      moveUp: "Monter",
      moveDown: "Descendre",
      pages: "pages",
      page: "page",
      size: "Taille",
      dimensions: "Dimensions",
      progress: "Progression",
      cancel: "Annuler",
      complete: "Tâche PDF terminée",
      compress: "Compresser PDF",
      merge: "Fusionner les PDF",
      split: "Diviser PDF",
      convertToImages: "Convertir en images",
      createPdf: "Créer PDF",
      downloadPdf: "Télécharger PDF",
      downloadZip: "Télécharger ZIP",
      downloadImage: "Télécharger l'image",
      originalSize: "Taille originale",
      resultSize: "Taille du résultat",
      smallerBy: "Plus petit de",
      largerBy: "Plus grand de",
      compressionLevel: "Niveau de compression",
      preserveDocument: "Conserver le document",
      preserveDocumentHint:
        "Conserve le texte sélectionnable et les fonctionnalités du document ; la taille peut changer légèrement.",
      balanced: "Équilibré · recommandé",
      balancedHint:
        "144 DPI et qualité JPEG équilibrée pour les numérisations et les PDF riches en images.",
      smallerFile: "Fichier plus petit",
      smallerFileHint: "110 DPI et compression d'image plus forte.",
      rasterWarningTitle: "Les pages deviennent des images",
      rasterWarningBody:
        "Les modes équilibré et plus petit conservent l'apparence, mais suppriment la sélection de texte, la recherche, les liens, les formulaires, les annotations, les calques et la structure d'accessibilité.",
      extractPages: "Extraire des pages",
      splitDocument: "Diviser le document",
      pageSelection: "Pages",
      pageSelectionHint: "Exemple : 1, 3-5",
      everyPages: "Toutes les N pages",
      customRanges: "Plages personnalisées",
      pagesPerFile: "Pages par PDF",
      customRangesHint: "Chaque plage séparée par des virgules devient un PDF.",
      selectAll: "Tout sélectionner",
      clearSelection: "Effacer la sélection",
      outputFormat: "Format d'image",
      resolution: "Résolution",
      quality: "qualité JPG",
      pageSize: "Taille de page",
      fitImage: "Adapter l'image",
      orientation: "Orientation",
      automatic: "Automatique",
      portrait: "Portrait",
      landscape: "Paysage",
      margin: "Marge",
      noMargin: "Aucune marge",
      smallMargin: "Petite",
      largeMargin: "Grande",
      resultFiles: "Fichiers résultats",
      noReduction:
        "Le résultat n'est pas plus petit. Essayez un autre préréglage ou gardez l'original.",
      fileTooLarge:
        "Les fichiers sélectionnés dépassent la limite de traitement local de 200 MiB.",
      tooManyPages: "Ce PDF dépasse la limite de 500 pages pour la copie.",
      tooManyRasterPages:
        "Sélectionnez au maximum 120 pages et maintenez la sortie rendue en dessous de 240 mégapixels.",
      invalidPdf: "Choisissez un fichier PDF valide et lisible.",
      encryptedPdf:
        "Les PDF protégés par mot de passe ne sont pas encore pris en charge. Déverrouillez d'abord le fichier et réessayez.",
      invalidImage:
        "Une image n'a pas pu être lue. Essayez un fichier JPG, PNG ou WebP valide.",
      unsupportedImage: "Choisissez des images JPG, PNG ou WebP.",
      minimumMergeFiles: "Choisissez au moins deux PDF à fusionner.",
      emptySelection: "Sélectionnez au moins une page.",
      invalidRange:
        "Vérifiez l'expression de la page. Utilisez des valeurs telles que 1, 3-5.",
      rangeOutOfBounds:
        "Une page sélectionnée est en dehors du nombre de pages de ce document.",
      reversedRange: "Une plage de pages doit commencer avant de se terminer.",
      renderFailed:
        "Une page n'a pas pu être rendue. Essayez une plage plus petite ou une résolution plus faible.",
      workerFailed:
        "Le PDF n'a pas pu être traité dans ce navigateur. Vérifiez le fichier et réessayez.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Comment utiliser {title}",
    safetyTitle: "Les fichiers restent dans ce navigateur",
    safetyBody:
      "Les fichiers sélectionnés et les résultats sont traités uniquement dans cet onglet de navigateur. Ils ne sont pas téléchargés, stockés, ajoutés à une URL ou envoyés à un tiers.",
    privacyQuestion: "Mes fichiers sont-ils téléchargés ?",
    privacyAnswer:
      "Non. La lecture des fichiers, le traitement PDF, le rendu et la création ZIP se font localement dans cet onglet de navigateur.",
    limitQuestion: "Pourquoi y a-t-il des limites de pages et de fichiers ?",
    limitAnswer:
      "Le rendu de PDF peut utiliser plusieurs octets de mémoire par pixel. Les limites empêchent les gros travaux de faire planter ou de fermer l'onglet du navigateur.",
    pages: {
      "compress-pdf": {
        title: "Compresser PDF",
        description:
          "Réduisez la taille d’un PDF en choisissant de conserver ou non les fonctions du document.",
        guide:
          "Choisissez un PDF et un niveau de compression, puis téléchargez le résultat. Utilisez Préserver le document si le texte sélectionnable et les liens sont importants.",
        faqQuestion:
          "La compression conserve-t-elle le texte et les liens sélectionnables ?",
        faqAnswer:
          "Préserver le document conserve le contenu de la page. Les modes équilibré et plus petit transforment les pages en images, donc la sélection, la recherche, les liens, les formulaires, les annotations, les calques et la structure d'accessibilité sont supprimés.",
        searchTerms: [
          "compresser PDF",
          "réduire la taille de PDF",
          "compresseur de PDF",
        ],
      },
      "merge-pdf": {
        title: "Fusionner PDF",
        description:
          "Fusionnez plusieurs PDF en un seul fichier dans l’ordre de votre choix.",
        guide:
          "Ajoutez au moins deux PDF, placez-les dans l’ordre souhaité, puis téléchargez le fichier fusionné.",
        faqQuestion:
          "Puis-je changer l'ordre des pages à l'intérieur d'un PDF ?",
        faqAnswer:
          "Cette première version organise les fichiers entiers. Séparez ou réorganisez d'abord le PDF source lorsque des pages individuelles nécessitent un ordre différent.",
        searchTerms: ["fusionner PDF", "combiner des PDF", "fusion de PDF"],
      },
      "split-pdf": {
        title: "Diviser PDF",
        description:
          "Extrayez les pages voulues ou divisez un PDF en plusieurs fichiers.",
        guide:
          "Choisissez un PDF, puis extrayez des pages ou divisez-le par nombre de pages ou par plages. Plusieurs résultats sont téléchargés dans un ZIP.",
        faqQuestion: "La division réduit-elle la qualité des pages ?",
        faqAnswer:
          "Aucune rasterisation n'est utilisée pour la division. Les pages existantes d'un PDF sont copiées dans de nouveaux fichiers, bien que les fonctionnalités avancées sur l'ensemble du document puissent ne pas être conservées.",
        searchTerms: [
          "diviser PDF",
          "extraire les pages de PDF",
          "séparateur de PDF",
        ],
      },
      "pdf-to-image": {
        title: "PDF en image",
        description:
          "Convertissez les pages sélectionnées d’un PDF en images JPG ou PNG.",
        guide:
          "Choisissez un PDF ainsi que les pages, le format d’image et la résolution. Plusieurs pages sont téléchargées dans un ZIP.",
        faqQuestion: "Dois-je choisir JPG ou PNG ?",
        faqAnswer:
          "JPG est généralement plus petit pour les photos et les scans. PNG est sans perte et souvent meilleur pour les diagrammes, le texte net ou la transparence, mais peut être beaucoup plus volumineux.",
        searchTerms: ["PDF en image", "PDF en JPG", "PDF en PNG"],
      },
      "image-to-pdf": {
        title: "Image en PDF",
        description:
          "Réunissez des images JPG, PNG ou WebP dans un PDF, dans l’ordre de votre choix.",
        guide:
          "Ajoutez et ordonnez les images, choisissez la mise en page, puis créez et téléchargez le PDF.",
        faqQuestion: "Mes images sont-elles recadrées ou agrandies ?",
        faqAnswer:
          "Non. Les images sont centrées et réduites uniquement si nécessaire. Le mode Ajuster utilise les proportions propres à chaque image pour la page PDF.",
        searchTerms: ["image en PDF", "JPG en PDF", "PNG en PDF"],
      },
    },
  },
  "pt-BR": {
    ui: {
      ariaLabel: "ferramentas PDF",
      choosePdf: "Escolher PDF",
      choosePdfs: "Escolher PDFs",
      chooseImages: "Escolher imagens",
      addFiles: "Adicionar arquivos",
      replaceFile: "Substituir arquivo",
      dropPdf: "ou solte um PDF aqui",
      dropPdfs: "ou solte PDFs aqui",
      dropImages: "ou arraste imagens aqui",
      pdfTypes: "PDF · até 200 MiB nesta sessão do navegador",
      imageTypes: "JPG, PNG ou WebP · até 200 MiB no total",
      selectedFiles: "Arquivos selecionados",
      options: "Opções",
      result: "Resultado",
      remove: "Remover",
      moveUp: "Mover para cima",
      moveDown: "Mover para baixo",
      pages: "páginas",
      page: "página",
      size: "Tamanho",
      dimensions: "Dimensões",
      progress: "Progresso",
      cancel: "Cancelar",
      complete: "PDF tarefa concluída",
      compress: "Comprimir PDF",
      merge: "Mesclar PDFs",
      split: "Dividir PDF",
      convertToImages: "Converter em imagens",
      createPdf: "Criar PDF",
      downloadPdf: "Baixar PDF",
      downloadZip: "Baixar ZIP",
      downloadImage: "Baixar imagem",
      originalSize: "Tamanho original",
      resultSize: "Tamanho do resultado",
      smallerBy: "Menor por",
      largerBy: "Maior por",
      compressionLevel: "Nível de compressão",
      preserveDocument: "Preservar documento",
      preserveDocumentHint:
        "Mantém texto selecionável e recursos do documento; o tamanho pode mudar pouco.",
      balanced: "Equilibrado · recomendado",
      balancedHint:
        "144 DPI e qualidade de JPEG equilibrada para digitalizações e PDFs com muitas imagens.",
      smallerFile: "Arquivo menor",
      smallerFileHint: "110 DPI e compressão de imagem mais forte.",
      rasterWarningTitle: "As páginas se tornam imagens",
      rasterWarningBody:
        "Modos equilibrados e menores preservam a aparência, mas removem a seleção de texto, pesquisa, links, formulários, anotações, camadas e estrutura de acessibilidade.",
      extractPages: "Extrair páginas",
      splitDocument: "Dividir documento",
      pageSelection: "Páginas",
      pageSelectionHint: "Exemplo: 1, 3-5",
      everyPages: "A cada N páginas",
      customRanges: "Intervalos personalizados",
      pagesPerFile: "Páginas por PDF",
      customRangesHint: "Cada intervalo separado por vírgula se torna um PDF.",
      selectAll: "Selecionar tudo",
      clearSelection: "Limpar seleção",
      outputFormat: "Formato da imagem",
      resolution: "Resolução",
      quality: "JPG qualidade",
      pageSize: "Tamanho da página",
      fitImage: "Ajustar imagem",
      orientation: "Orientação",
      automatic: "Automático",
      portrait: "Retrato",
      landscape: "Paisagem",
      margin: "Margem",
      noMargin: "Sem margem",
      smallMargin: "Pequena",
      largeMargin: "Grande",
      resultFiles: "Arquivos de resultado",
      noReduction:
        "O resultado não é menor. Tente outro modelo ou mantenha o original.",
      fileTooLarge:
        "Os arquivos selecionados excedem o limite de 200 MiB para processamento local.",
      tooManyPages: "Este PDF excede o limite de 500 páginas por cópia.",
      tooManyRasterPages:
        "Selecione no máximo 120 páginas e mantenha a saída renderizada abaixo de 240 megapixels.",
      invalidPdf: "Escolha um arquivo PDF válido e legível.",
      encryptedPdf:
        "PDFs com senha não são suportados ainda. Desbloqueie o arquivo primeiro e tente novamente.",
      invalidImage:
        "Uma imagem não pôde ser lida. Tente um arquivo JPG, PNG ou WebP válido.",
      unsupportedImage: "Escolha imagens JPG, PNG ou WebP.",
      minimumMergeFiles: "Escolha pelo menos dois PDFs para mesclar.",
      emptySelection: "Selecione pelo menos uma página.",
      invalidRange: "Verifique a expressão da página. Use valores como 1, 3-5.",
      rangeOutOfBounds:
        "Uma página selecionada está fora da contagem de páginas deste documento.",
      reversedRange: "Um intervalo de páginas deve começar antes de terminar.",
      renderFailed:
        "Não foi possível renderizar uma página. Tente um intervalo menor ou resolução mais baixa.",
      workerFailed:
        "O PDF não pôde ser processado neste navegador. Verifique o arquivo e tente novamente.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Como usar {title}",
    safetyTitle: "Os arquivos permanecem neste navegador",
    safetyBody:
      "Os arquivos selecionados e os resultados são processados apenas nesta aba do navegador. Eles não são enviados, armazenados, adicionados a uma URL ou enviados a terceiros.",
    privacyQuestion: "Meus arquivos são enviados?",
    privacyAnswer:
      "Não. A leitura de arquivos, o processamento de PDF, a renderização e a criação de ZIP acontecem localmente nesta aba do navegador.",
    limitQuestion: "Por que existem limites de página e arquivo?",
    limitAnswer:
      "A renderização de PDF pode usar vários bytes de memória por pixel. Os limites impedem que trabalhos grandes congelem ou fechem a aba do navegador.",
    pages: {
      "compress-pdf": {
        title: "Comprimir PDF",
        description:
          "Reduza o tamanho de um PDF e escolha se deseja preservar os recursos do documento.",
        guide:
          "Escolha um PDF e um nível de compressão e baixe o resultado. Use Preservar documento se precisar manter texto selecionável e links.",
        faqQuestion: "A compressão manterá o texto e os links selecionáveis?",
        faqAnswer:
          "Preservar documento mantém o conteúdo da página. Os modos equilibrado e menor transformam as páginas em imagens, então a seleção, pesquisa, links, formulários, anotações, camadas e estrutura de acessibilidade são removidos.",
        searchTerms: [
          "comprimir PDF",
          "reduzir o tamanho do PDF",
          "compressor de PDF",
        ],
      },
      "merge-pdf": {
        title: "Mesclar PDF",
        description:
          "Junte vários PDFs em um único arquivo na ordem que você escolher.",
        guide:
          "Adicione pelo menos dois PDFs, organize-os como preferir e baixe o arquivo mesclado.",
        faqQuestion: "Posso mudar a ordem das páginas dentro de um PDF?",
        faqAnswer:
          "Esta primeira versão organiza arquivos completos. Divida ou reorganize o PDF de origem primeiro quando páginas individuais precisarem de uma ordem diferente.",
        searchTerms: ["mesclar PDF", "combinar PDFs", "fusão de PDF"],
      },
      "split-pdf": {
        title: "Dividir PDF",
        description:
          "Extraia as páginas desejadas ou divida um PDF em vários arquivos.",
        guide:
          "Escolha um PDF e extraia páginas ou divida-o por quantidade de páginas ou intervalos. Vários resultados são baixados em um ZIP.",
        faqQuestion: "Dividir reduz a qualidade das páginas?",
        faqAnswer:
          "Nenhuma rasterização é usada para divisão. As páginas existentes do PDF são copiadas para novos arquivos, embora recursos avançados de todo o documento possam não ser mantidos.",
        searchTerms: [
          "dividir PDF",
          "extrair páginas do PDF",
          "divisor de PDF",
        ],
      },
      "pdf-to-image": {
        title: "PDF para Imagem",
        description:
          "Converta as páginas selecionadas de um PDF em imagens JPG ou PNG.",
        guide:
          "Escolha um PDF, as páginas, o formato de imagem e a resolução. Várias páginas são baixadas em um ZIP.",
        faqQuestion: "Devo escolher JPG ou PNG?",
        faqAnswer:
          "JPG geralmente é menor para fotos e digitalizações. PNG é sem perda e muitas vezes melhor para diagramas, texto nítido ou transparência, mas pode ser muito maior.",
        searchTerms: ["PDF para imagem", "PDF para JPG", "PDF para PNG"],
      },
      "image-to-pdf": {
        title: "Imagem para PDF",
        description:
          "Junte imagens JPG, PNG ou WebP em um PDF na ordem que você escolher.",
        guide:
          "Adicione e organize as imagens, escolha o layout da página e crie o PDF para baixar.",
        faqQuestion: "Minhas imagens são cortadas ou ampliadas?",
        faqAnswer:
          "Não. As imagens são centralizadas e reduzidas apenas quando necessário. O modo ajustar usa as proporções próprias de cada imagem para a página do PDF.",
        searchTerms: ["imagem para PDF", "JPG para PDF", "PNG para PDF"],
      },
    },
  },
  it: {
    ui: {
      ariaLabel: "strumenti PDF",
      choosePdf: "Scegli PDF",
      choosePdfs: "Scegli PDF",
      chooseImages: "Scegli immagini",
      addFiles: "Aggiungi file",
      replaceFile: "Sostituisci file",
      dropPdf: "o trascina qui un PDF",
      dropPdfs: "o trascina qui i PDF",
      dropImages: "o trascina le immagini qui",
      pdfTypes: "PDF · fino a 200 MiB in questa sessione del browser",
      imageTypes: "JPG, PNG, o WebP · fino a 200 MiB totali",
      selectedFiles: "File selezionati",
      options: "Opzioni",
      result: "Risultato",
      remove: "Rimuovi",
      moveUp: "Sposta su",
      moveDown: "Scendi",
      pages: "pagine",
      page: "pagina",
      size: "Dimensione",
      dimensions: "Dimensioni",
      progress: "Progresso",
      cancel: "Annulla",
      complete: "PDF compito completato",
      compress: "Comprimi PDF",
      merge: "Unisci PDF",
      split: "Dividi PDF",
      convertToImages: "Converti in immagini",
      createPdf: "Crea PDF",
      downloadPdf: "Scarica PDF",
      downloadZip: "Scarica ZIP",
      downloadImage: "Scarica immagine",
      originalSize: "Dimensione originale",
      resultSize: "Dimensione risultato",
      smallerBy: "Più piccolo di",
      largerBy: "Più grande di",
      compressionLevel: "Livello di compressione",
      preserveDocument: "Conserva documento",
      preserveDocumentHint:
        "Mantiene testo selezionabile e caratteristiche del documento; la dimensione potrebbe cambiare poco.",
      balanced: "Bilanciato · consigliato",
      balancedHint:
        "144 DPI e qualità JPEG bilanciata per scansioni e PDF ricchi di immagini.",
      smallerFile: "File più piccolo",
      smallerFileHint: "110 DPI e compressione delle immagini più forte.",
      rasterWarningTitle: "Le pagine diventano immagini",
      rasterWarningBody:
        "I modi bilanciato e più piccolo preservano l'aspetto, ma rimuovono la selezione del testo, la ricerca, i collegamenti, i moduli, le annotazioni, i livelli e la struttura di accessibilità.",
      extractPages: "Estrai pagine",
      splitDocument: "Dividi documento",
      pageSelection: "Pagine",
      pageSelectionHint: "Esempio: 1, 3-5",
      everyPages: "Ogni N pagine",
      customRanges: "Intervalli personalizzati",
      pagesPerFile: "Pagine per PDF",
      customRangesHint: "Ogni intervallo separato da virgole diventa un PDF.",
      selectAll: "Seleziona tutto",
      clearSelection: "Cancella selezione",
      outputFormat: "Formato immagine",
      resolution: "Risoluzione",
      quality: "Qualità JPG",
      pageSize: "Dimensione pagina",
      fitImage: "Adatta immagine",
      orientation: "Orientamento",
      automatic: "Automatico",
      portrait: "Ritratto",
      landscape: "Paesaggio",
      margin: "Margine",
      noMargin: "Senza margine",
      smallMargin: "Piccolo",
      largeMargin: "Grande",
      resultFiles: "File dei risultati",
      noReduction:
        "Il risultato non è più piccolo. Prova un altro preset o mantieni l'originale.",
      fileTooLarge:
        "I file selezionati superano il limite di elaborazione locale di 200 MiB.",
      tooManyPages: "Questo PDF supera il limite di copia di 500 pagine.",
      tooManyRasterPages:
        "Seleziona al massimo 120 pagine e mantieni l'output renderizzato sotto i 240 megapixel.",
      invalidPdf: "Scegli un file PDF valido e leggibile.",
      encryptedPdf:
        "I PDF protetti da password non sono ancora supportati. Sblocca prima il file e riprova.",
      invalidImage:
        "Non è stata possibile leggere un'immagine. Prova con un file JPG, PNG o WebP valido.",
      unsupportedImage: "Scegli immagini JPG, PNG o WebP.",
      minimumMergeFiles: "Scegli almeno due PDF da unire.",
      emptySelection: "Seleziona almeno una pagina.",
      invalidRange:
        "Controlla l'espressione della pagina. Usa valori come 1, 3-5.",
      rangeOutOfBounds:
        "Una pagina selezionata è al di fuori del numero di pagine di questo documento.",
      reversedRange: "Un intervallo di pagine deve iniziare prima di finire.",
      renderFailed:
        "Una pagina non può essere visualizzata. Prova un intervallo più piccolo o una risoluzione più bassa.",
      workerFailed:
        "Il PDF non può essere elaborato in questo browser. Controlla il file e riprova.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Come usare {title}",
    safetyTitle: "I file rimangono in questo browser",
    safetyBody:
      "I file selezionati e i risultati vengono elaborati solo in questa scheda del browser. Non vengono caricati, memorizzati, aggiunti a un URL o inviati a terzi.",
    privacyQuestion: "I miei file vengono caricati?",
    privacyAnswer:
      "No. La lettura dei file, l'elaborazione di PDF, il rendering e la creazione di ZIP avvengono localmente in questa scheda del browser.",
    limitQuestion: "Perché ci sono limiti di pagine e file?",
    limitAnswer:
      "La resa di PDF può usare diversi byte di memoria per pixel. I limiti impediscono che lavori grandi blocchino o chiudano la scheda del browser.",
    pages: {
      "compress-pdf": {
        title: "Comprimi PDF",
        description:
          "Riduci le dimensioni di un PDF scegliendo se mantenere le funzioni del documento.",
        guide:
          "Scegli un PDF e un livello di compressione, quindi scarica il risultato. Usa Conserva documento se vuoi mantenere testo selezionabile e link.",
        faqQuestion:
          "La compressione manterrà il testo e i link selezionabili?",
        faqAnswer:
          "'Preserva documento' mantiene il contenuto della pagina. Le modalità 'Bilanciata' e 'Piccola' trasformano le pagine in immagini, quindi selezione, ricerca, link, moduli, annotazioni, livelli e struttura di accessibilità vengono rimossi.",
        searchTerms: [
          "comprimi PDF",
          "riduci la dimensione di PDF",
          "compressore PDF",
        ],
      },
      "merge-pdf": {
        title: "Unisci PDF",
        description:
          "Unisci più PDF in un solo file nell’ordine che preferisci.",
        guide:
          "Aggiungi almeno due PDF, disponili nell’ordine desiderato e scarica il file unito.",
        faqQuestion:
          "Posso cambiare l'ordine delle pagine all'interno di un PDF?",
        faqAnswer:
          "Questa prima versione ordina file interi. Dividi o riorganizza prima il PDF sorgente quando le singole pagine devono avere un ordine diverso.",
        searchTerms: ["unisci PDF", "combina PDF", "fusione di PDF"],
      },
      "split-pdf": {
        title: "Dividi PDF",
        description:
          "Estrai le pagine che ti servono o dividi un PDF in più file.",
        guide:
          "Scegli un PDF, quindi estrai le pagine o dividilo per numero di pagine o intervalli. Più risultati vengono scaricati in uno ZIP.",
        faqQuestion: "La divisione riduce la qualità delle pagine?",
        faqAnswer:
          "Non viene utilizzata rasterizzazione per la divisione. Le pagine esistenti del PDF vengono copiate nei nuovi file, anche se alcune funzionalità avanzate del documento potrebbero non essere trasferite.",
        searchTerms: [
          "dividi PDF",
          "estrai pagine da PDF",
          "separatore di PDF",
        ],
      },
      "pdf-to-image": {
        title: "PDF in immagine",
        description:
          "Converti le pagine selezionate di un PDF in immagini JPG o PNG.",
        guide:
          "Scegli un PDF, le pagine, il formato immagine e la risoluzione. Più pagine vengono scaricate in uno ZIP.",
        faqQuestion: "Dovrei scegliere JPG o PNG?",
        faqAnswer:
          "JPG è di solito più piccolo per foto e scansioni. PNG è senza perdita e spesso migliore per diagrammi, testo nitido o trasparenza, ma può essere molto più grande.",
        searchTerms: ["PDF in immagine", "PDF in JPG", "PDF in PNG"],
      },
      "image-to-pdf": {
        title: "Immagine in PDF",
        description:
          "Unisci immagini JPG, PNG o WebP in un PDF nell’ordine che preferisci.",
        guide:
          "Aggiungi e ordina le immagini, scegli il layout della pagina, quindi crea e scarica il PDF.",
        faqQuestion: "Le mie immagini vengono ritagliate o ingrandite?",
        faqAnswer:
          "No. Le immagini sono centrate e ridotte solo quando necessario. La modalità adatta usa le proporzioni proprie di ciascuna immagine per la pagina PDF.",
        searchTerms: ["immagine in PDF", "JPG in PDF", "PNG in PDF"],
      },
    },
  },
  nl: {
    ui: {
      ariaLabel: "PDF hulpmiddelen",
      choosePdf: "Kies PDF",
      choosePdfs: "Kies PDF's",
      chooseImages: "Kies afbeeldingen",
      addFiles: "Voeg bestanden toe",
      replaceFile: "Vervang bestand",
      dropPdf: "of sleep hier een PDF",
      dropPdfs: "of sleep hier PDF's",
      dropImages: "of sleep hier afbeeldingen naartoe",
      pdfTypes: "PDF · tot 200 MiB in deze browsersessie",
      imageTypes: "JPG, PNG, of WebP · maximaal 200 MiB totaal",
      selectedFiles: "Geselecteerde bestanden",
      options: "Opties",
      result: "Resultaat",
      remove: "Verwijderen",
      moveUp: "Omhoog verplaatsen",
      moveDown: "Naar beneden bewegen",
      pages: "pagina's",
      page: "pagina",
      size: "Grootte",
      dimensions: "Afmetingen",
      progress: "Vooruitgang",
      cancel: "Annuleren",
      complete: "PDF taak voltooid",
      compress: "Comprimeer PDF",
      merge: "Voeg PDF's samen",
      split: "Splits PDF",
      convertToImages: "Converteer naar afbeeldingen",
      createPdf: "Maak PDF",
      downloadPdf: "Download PDF",
      downloadZip: "Download ZIP",
      downloadImage: "Download afbeelding",
      originalSize: "Oorspronkelijke grootte",
      resultSize: "Resultaatgrootte",
      smallerBy: "Kleiner met",
      largerBy: "Groter met",
      compressionLevel: "Compressieniveau",
      preserveDocument: "Document behouden",
      preserveDocumentHint:
        "Behoudt selecteerbare tekst en documentfuncties; grootte kan weinig veranderen.",
      balanced: "Gebalanceerd · aanbevolen",
      balancedHint:
        "144 DPI en uitgebalanceerde JPEG-kwaliteit voor scans en afbeeldingsrijke PDF's.",
      smallerFile: "Kleiner bestand",
      smallerFileHint: "110 DPI en sterkere beeldcompressie.",
      rasterWarningTitle: "Pagina's worden afbeeldingen",
      rasterWarningBody:
        "Uitgebalanceerde en kleinere modi behouden het uiterlijk, maar verwijderen tekstselectie, zoeken, links, formulieren, annotaties, lagen en toegankelijkheidsstructuur.",
      extractPages: "Pagina's extraheren",
      splitDocument: "Document splitsen",
      pageSelection: "Pagina's",
      pageSelectionHint: "Voorbeeld: 1, 3-5",
      everyPages: "Elke N pagina's",
      customRanges: "Aangepaste bereik",
      pagesPerFile: "Pagina's per PDF",
      customRangesHint: "Elk door komma gescheiden bereik wordt één PDF.",
      selectAll: "Alles selecteren",
      clearSelection: "Selectie wissen",
      outputFormat: "Afbeeldingsformaat",
      resolution: "Resolutie",
      quality: "JPG kwaliteit",
      pageSize: "Paginagrootte",
      fitImage: "Afbeelding aanpassen",
      orientation: "Oriëntatie",
      automatic: "Automatisch",
      portrait: "Staand",
      landscape: "Liggend",
      margin: "Marge",
      noMargin: "Geen marge",
      smallMargin: "Klein",
      largeMargin: "Groot",
      resultFiles: "Resultaatbestanden",
      noReduction:
        "Het resultaat is niet kleiner. Probeer een andere preset of behoud het origineel.",
      fileTooLarge:
        "De geselecteerde bestanden overschrijden de limiet van 200 MiB voor lokale verwerking.",
      tooManyPages: "Deze PDF overschrijdt de kopieerlimiet van 500 pagina's.",
      tooManyRasterPages:
        "Selecteer maximaal 120 pagina's en houd de weergegeven uitvoer onder 240 megapixels.",
      invalidPdf: "Kies een geldig, leesbaar PDF-bestand.",
      encryptedPdf:
        "Wachtwoordbeveiligde PDF's worden nog niet ondersteund. Ontgrendel het bestand eerst en probeer het opnieuw.",
      invalidImage:
        "Eén afbeelding kon niet worden gelezen. Probeer een geldig JPG, PNG of WebP-bestand.",
      unsupportedImage: "Kies JPG, PNG of WebP-afbeeldingen.",
      minimumMergeFiles: "Kies minstens twee PDF's om samen te voegen.",
      emptySelection: "Selecteer minstens één pagina.",
      invalidRange:
        "Controleer de pagina-expressie. Gebruik waarden zoals 1, 3-5.",
      rangeOutOfBounds:
        "Een geselecteerde pagina valt buiten het aantal pagina's van dit document.",
      reversedRange: "Een paginareeks moet starten voordat deze eindigt.",
      renderFailed:
        "Een pagina kon niet worden weergegeven. Probeer een kleinere reeks of een lagere resolutie.",
      workerFailed:
        "De PDF kon niet worden verwerkt in deze browser. Controleer het bestand en probeer het opnieuw.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Hoe {title} te gebruiken",
    safetyTitle: "Bestanden blijven in deze browser",
    safetyBody:
      "De geselecteerde bestanden en resultaten worden alleen in dit browsertabblad verwerkt. Ze worden niet geüpload, opgeslagen, toegevoegd aan een URL of naar een derde partij verzonden.",
    privacyQuestion: "Worden mijn bestanden geüpload?",
    privacyAnswer:
      "Nee. Bestandslezen, PDF verwerking, rendering en ZIP aanmaak gebeuren lokaal in dit browsertabblad.",
    limitQuestion: "Waarom zijn er pagina- en bestandslimieten?",
    limitAnswer:
      "PDF rendering kan meerdere bytes geheugen per pixel gebruiken. De limieten voorkomen dat grote taken de browser vast laten lopen of het tabblad sluiten.",
    pages: {
      "compress-pdf": {
        title: "Comprimeer PDF",
        description:
          "Maak een PDF kleiner en kies of documentfuncties behouden moeten blijven.",
        guide:
          "Kies een PDF en een compressieniveau en download het resultaat. Gebruik Document behouden als selecteerbare tekst en links belangrijk zijn.",
        faqQuestion: "Zal compressie selecteerbare tekst en links behouden?",
        faqAnswer:
          "Document behouden houdt paginainhoud vast. Gebalanceerde en kleinere modi zetten pagina’s om in afbeeldingen, waardoor selectie, zoeken, links, formulieren, annotaties, lagen en toegankelijkheidsstructuur worden verwijderd.",
        searchTerms: [
          "comprimeer PDF",
          "verklein PDF bestand",
          "PDF compressor",
        ],
      },
      "merge-pdf": {
        title: "Voeg PDF samen",
        description:
          "Voeg meerdere PDF’s in de gewenste volgorde samen tot één bestand.",
        guide:
          "Voeg minstens twee PDF’s toe, zet ze in de gewenste volgorde en download het samengevoegde bestand.",
        faqQuestion: "Kan ik de pagina volgorde binnen één PDF veranderen?",
        faqAnswer:
          "Deze eerste versie rangschikt hele bestanden. Splits of herschik de bron PDF eerst als individuele pagina's een andere volgorde nodig hebben.",
        searchTerms: ["voeg PDF samen", "combineer PDF's", "PDF fusie"],
      },
      "split-pdf": {
        title: "Split PDF",
        description:
          "Haal de gewenste pagina’s uit een PDF of splits deze in meerdere bestanden.",
        guide:
          "Kies een PDF en haal pagina’s eruit of splits deze op aantal pagina’s of bereiken. Meerdere resultaten worden als ZIP gedownload.",
        faqQuestion: "Vermindert splitsen de pagina kwaliteit?",
        faqAnswer:
          "Voor splitsen wordt geen rasterisatie gebruikt. Bestaande PDF-pagina's worden in nieuwe bestanden gekopieerd, hoewel geavanceerde document-brede functies mogelijk niet worden overgenomen.",
        searchTerms: ["split PDF", "extraheer PDF pagina's", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF naar Afbeelding",
        description:
          "Zet geselecteerde PDF-pagina’s om in JPG- of PNG-afbeeldingen.",
        guide:
          "Kies een PDF en de gewenste pagina’s, het afbeeldingsformaat en de resolutie. Meerdere pagina’s worden als ZIP gedownload.",
        faqQuestion: "Moet ik JPG of PNG kiezen?",
        faqAnswer:
          "JPG is meestal kleiner voor foto's en scans. PNG is verliesvrij en vaak beter voor diagrammen, scherpe tekst of transparantie, maar kan veel groter zijn.",
        searchTerms: ["PDF naar afbeelding", "PDF naar JPG", "PDF naar PNG"],
      },
      "image-to-pdf": {
        title: "Afbeelding naar PDF",
        description:
          "Voeg JPG-, PNG- of WebP-afbeeldingen in de gewenste volgorde samen tot één PDF.",
        guide:
          "Voeg afbeeldingen toe, zet ze in de juiste volgorde, kies de pagina-indeling en maak de PDF om te downloaden.",
        faqQuestion: "Worden mijn afbeeldingen bijgesneden of vergroot?",
        faqAnswer:
          "Nee. Afbeeldingen worden gecentreerd en alleen verkleind indien nodig. Fit-modus gebruikt de eigen verhoudingen van elke afbeelding voor de PDF-pagina.",
        searchTerms: ["afbeelding naar PDF", "JPG naar PDF", "PNG naar PDF"],
      },
    },
  },
  sv: {
    ui: {
      ariaLabel: "PDF-verktyg",
      choosePdf: "Välj PDF",
      choosePdfs: "Välj PDF-filer",
      chooseImages: "Välj bilder",
      addFiles: "Lägg till filer",
      replaceFile: "Byt fil",
      dropPdf: "eller släpp en PDF här",
      dropPdfs: "eller släpp PDF-filer här",
      dropImages: "eller släpp bilder här",
      pdfTypes: "PDF · upp till 200 MiB i denna webbläsarsession",
      imageTypes: "JPG, PNG eller WebP · upp till 200 MiB totalt",
      selectedFiles: "Valda filer",
      options: "Alternativ",
      result: "Resultat",
      remove: "Ta bort",
      moveUp: "Flytta upp",
      moveDown: "Flytta ner",
      pages: "sidor",
      page: "sida",
      size: "Storlek",
      dimensions: "Mått",
      progress: "Framsteg",
      cancel: "Avbryt",
      complete: "PDF uppgift slutförd",
      compress: "Komprimera PDF",
      merge: "Slå samman PDF",
      split: "Dela upp PDF",
      convertToImages: "Konvertera till bilder",
      createPdf: "Skapa PDF",
      downloadPdf: "Ladda ner PDF",
      downloadZip: "Ladda ner ZIP",
      downloadImage: "Ladda ner bild",
      originalSize: "Ursprunglig storlek",
      resultSize: "Resultatstorlek",
      smallerBy: "Mindre med",
      largerBy: "Större med",
      compressionLevel: "Komprimeringsnivå",
      preserveDocument: "Bevara dokument",
      preserveDocumentHint:
        "Behåller markerbar text och dokumentfunktioner; storleken kan förändras lite.",
      balanced: "Balanserad · rekommenderas",
      balancedHint:
        "144 DPI och balanserad JPEG-kvalitet för skanningar och bildtunga PDFs.",
      smallerFile: "Mindre fil",
      smallerFileHint: "110 DPI och starkare bildkomprimering.",
      rasterWarningTitle: "Sidor blir bilder",
      rasterWarningBody:
        "Balanserade och mindre lägen bevarar utseendet, men tar bort textval, sökning, länkar, formulär, anteckningar, lager och tillgänglighetsstruktur.",
      extractPages: "Extrahera sidor",
      splitDocument: "Dela dokument",
      pageSelection: "Sidor",
      pageSelectionHint: "Exempel: 1, 3-5",
      everyPages: "Varje N sidor",
      customRanges: "Anpassade intervall",
      pagesPerFile: "Sidor per PDF",
      customRangesHint: "Varje kommaavgränsat intervall blir ett PDF.",
      selectAll: "Markera alla",
      clearSelection: "Rensa markering",
      outputFormat: "Bildformat",
      resolution: "Upplösning",
      quality: "JPG kvalitet",
      pageSize: "Sidstorlek",
      fitImage: "Anpassa bild",
      orientation: "Orientering",
      automatic: "Automatisk",
      portrait: "Stående",
      landscape: "Liggande",
      margin: "Marginal",
      noMargin: "Ingen marginal",
      smallMargin: "Liten",
      largeMargin: "Stor",
      resultFiles: "Resultatfiler",
      noReduction:
        "Resultatet är inte mindre. Försök med en annan förinställning eller behåll originalet.",
      fileTooLarge:
        "De valda filerna överskrider den lokala bearbetningsgränsen på 200 MiB.",
      tooManyPages: "Detta PDF överskrider kopieringsgränsen på 500 sidor.",
      tooManyRasterPages:
        "Välj högst 120 sidor och håll det renderade resultatet under 240 megapixlar.",
      invalidPdf: "Välj en giltig, läsbar PDF-fil.",
      encryptedPdf:
        "Lösenordsskyddade PDF:er stöds ännu inte. Lås först upp filen och försök igen.",
      invalidImage:
        "En bild kunde inte läsas. Försök med en giltig JPG, PNG eller WebP-fil.",
      unsupportedImage: "Välj JPG, PNG eller WebP-bilder.",
      minimumMergeFiles: "Välj minst två PDF:er att slå ihop.",
      emptySelection: "Markera minst en sida.",
      invalidRange: "Kontrollera siduttrycket. Använd värden som 1, 3-5.",
      rangeOutOfBounds: "En markerad sida är utanför detta dokuments sidantal.",
      reversedRange: "Ett sidintervall måste börja före det slutar.",
      renderFailed:
        "En sida kunde inte renderas. Försök med ett mindre intervall eller lägre upplösning.",
      workerFailed:
        "PDF kunde inte bearbetas i denna webbläsare. Kontrollera filen och försök igen.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Hur du använder {title}",
    safetyTitle: "Filer stannar i den här webbläsaren",
    safetyBody:
      "De valda filerna och resultaten bearbetas endast i den här fliken i webbläsaren. De laddas inte upp, lagras, läggs till i en URL eller skickas till en tredje part.",
    privacyQuestion: "Laddas mina filer upp?",
    privacyAnswer:
      "Nej. Filinläsning, PDF-bearbetning, rendering och ZIP-skapande sker lokalt i den här fliken i webbläsaren.",
    limitQuestion: "Varför finns det sid- och filgränser?",
    limitAnswer:
      "PDF rendering kan använda flera byte minne per pixel. Begränsningarna hindrar stora jobb från att frysa eller stänga webbläsarfliken.",
    pages: {
      "compress-pdf": {
        title: "Komprimera PDF",
        description:
          "Minska storleken på en PDF och välj om dokumentfunktionerna ska bevaras.",
        guide:
          "Välj en PDF och en komprimeringsnivå och ladda sedan ner resultatet. Använd Bevara dokument om markerbar text och länkar är viktiga.",
        faqQuestion: "Kommer komprimering att behålla valbar text och länkar?",
        faqAnswer:
          "Bevara-dokumentet behåller sidinnehållet. Balanserade och mindre läge förvandlar sidor till bilder, så urval, sökning, länkar, formulär, anteckningar, lager och tillgänglighetsstruktur tas bort.",
        searchTerms: ["komprimera PDF", "minska PDF storlek", "PDF kompressor"],
      },
      "merge-pdf": {
        title: "Slå ihop PDF",
        description:
          "Slå ihop flera PDF-filer till en fil i den ordning du väljer.",
        guide:
          "Lägg till minst två PDF-filer, ordna dem som du vill och ladda ner den sammanslagna filen.",
        faqQuestion: "Kan jag ändra sidordningen i en PDF?",
        faqAnswer:
          "Den första versionen ordnar hela filer. Dela eller omarrangera käll-PDF först när enskilda sidor behöver en annan ordning.",
        searchTerms: ["slå ihop PDF", "kombinera PDFs", "PDF sammanslagning"],
      },
      "split-pdf": {
        title: "Dela PDF",
        description: "Hämta ut valda sidor eller dela en PDF i flera filer.",
        guide:
          "Välj en PDF och hämta ut sidor eller dela den efter antal sidor eller intervall. Flera resultat laddas ner som en ZIP-fil.",
        faqQuestion: "Minskar delningen sidkvaliteten?",
        faqAnswer:
          "Ingen rasterisering används vid delning. Befintliga PDF-sidor kopieras till nya filer, även om avancerade dokumentomfattande funktioner kanske inte följs med.",
        searchTerms: ["dela PDF", "extrahera PDF sidor", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF till bild",
        description: "Konvertera valda PDF-sidor till JPG- eller PNG-bilder.",
        guide:
          "Välj en PDF samt önskade sidor, bildformat och upplösning. Flera sidor laddas ner som en ZIP-fil.",
        faqQuestion: "Ska jag välja JPG eller PNG?",
        faqAnswer:
          "JPG är vanligtvis mindre för foton och skanningar. PNG är förlustfritt och ofta bättre för diagram, skarp text eller transparens, men kan vara mycket större.",
        searchTerms: ["PDF till bild", "PDF till JPG", "PDF till PNG"],
      },
      "image-to-pdf": {
        title: "Bild till PDF",
        description:
          "Samla JPG-, PNG- eller WebP-bilder i en PDF i den ordning du väljer.",
        guide:
          "Lägg till och ordna bilderna, välj sidlayout och skapa PDF-filen för nedladdning.",
        faqQuestion: "Är mina bilder beskurna eller förstora?",
        faqAnswer:
          "Nej. Bilderna centreras och skalas endast ner vid behov. Passa-läget använder varje bilds egna proportioner för PDF sidan.",
        searchTerms: ["bild till PDF", "JPG till PDF", "PNG till PDF"],
      },
    },
  },
  cs: {
    ui: {
      ariaLabel: "PDF nástroje",
      choosePdf: "Vyberte PDF",
      choosePdfs: "Vyberte PDFs",
      chooseImages: "Vyberte obrázky",
      addFiles: "Přidat soubory",
      replaceFile: "Nahraďte soubor",
      dropPdf: "nebo sem přetáhněte jeden PDF",
      dropPdfs: "nebo sem přetáhněte PDFs",
      dropImages: "nebo sem přetáhněte obrázky",
      pdfTypes: "PDF · až 200 MiB v této relaci prohlížeče",
      imageTypes: "JPG, PNG nebo WebP · celkem až 200 MiB",
      selectedFiles: "Vybrané soubory",
      options: "Možnosti",
      result: "Výsledek",
      remove: "Odstranit",
      moveUp: "Posunout nahoru",
      moveDown: "Posunout dolů",
      pages: "stránky",
      page: "stránka",
      size: "Velikost",
      dimensions: "Rozměry",
      progress: "Pokrok",
      cancel: "Zrušit",
      complete: "Úkol PDF dokončen",
      compress: "Komprimovat PDF",
      merge: "Sloučit PDFy",
      split: "Rozdělit PDF",
      convertToImages: "Převést na obrázky",
      createPdf: "Vytvořit PDF",
      downloadPdf: "Stáhnout PDF",
      downloadZip: "Stáhnout ZIP",
      downloadImage: "Stáhnout obrázek",
      originalSize: "Původní velikost",
      resultSize: "Velikost výsledku",
      smallerBy: "Menší o",
      largerBy: "Větší o",
      compressionLevel: "Úroveň komprese",
      preserveDocument: "Zachovat dokument",
      preserveDocumentHint:
        "Zachovává vybíratelný text a vlastnosti dokumentu; velikost se může mírně změnit.",
      balanced: "Vyvážené · doporučeno",
      balancedHint:
        "144 DPI a vyvážená kvalita JPEG pro skeny a obrázky bohaté PDFs.",
      smallerFile: "Menší soubor",
      smallerFileHint: "110 DPI a silnější komprese obrázků.",
      rasterWarningTitle: "Stránky se stanou obrázky",
      rasterWarningBody:
        "Režimy vyvážený a menší zachovávají vzhled, ale odstraňují možnost výběru textu, vyhledávání, odkazy, formuláře, anotace, vrstvy a strukturu přístupnosti.",
      extractPages: "Extrahovat stránky",
      splitDocument: "Rozdělit dokument",
      pageSelection: "Stránky",
      pageSelectionHint: "Příklad: 1, 3-5",
      everyPages: "Každá N. stránka",
      customRanges: "Vlastní rozsahy",
      pagesPerFile: "Stránky na PDF",
      customRangesHint: "Každý čárkou oddělený rozsah se stane jedním PDF.",
      selectAll: "Vybrat vše",
      clearSelection: "Zrušit výběr",
      outputFormat: "Formát obrázku",
      resolution: "Rozlišení",
      quality: "JPG kvalita",
      pageSize: "Velikost stránky",
      fitImage: "Přizpůsobit obrázek",
      orientation: "Orientace",
      automatic: "Automaticky",
      portrait: "Na výšku",
      landscape: "Na šířku",
      margin: "Okraj",
      noMargin: "Bez okraje",
      smallMargin: "Malý",
      largeMargin: "Velký",
      resultFiles: "Výsledné soubory",
      noReduction:
        "Výsledek není menší. Zkuste jiný přednastavený režim nebo zachovejte původní.",
      fileTooLarge:
        "Vybrané soubory překračují limit 200 MiB pro místní zpracování.",
      tooManyPages: "Tento PDF překračuje limit 500 kopií na stránku.",
      tooManyRasterPages:
        "Vyberte nejvýše 120 stránek a udržte vykreslený výstup pod 240 megapixely.",
      invalidPdf: "Vyberte platný, čitelný soubor PDF.",
      encryptedPdf:
        "PDF soubory chráněné heslem zatím nejsou podporovány. Nejprve soubor odemkněte a zkuste to znovu.",
      invalidImage:
        "Jeden obrázek nelze načíst. Zkuste platný soubor JPG, PNG nebo WebP.",
      unsupportedImage: "Vyberte obrázky JPG, PNG nebo WebP.",
      minimumMergeFiles: "Vyberte alespoň dva soubory PDF k sloučení.",
      emptySelection: "Vyberte alespoň jednu stránku.",
      invalidRange:
        "Zkontrolujte výraz stránky. Použijte hodnoty, například 1, 3-5.",
      rangeOutOfBounds:
        "Vybraná stránka je mimo rozsah počtu stránek tohoto dokumentu.",
      reversedRange: "Rozsah stránek musí začínat dříve, než končí.",
      renderFailed:
        "Stránku se nepodařilo vykreslit. Zkuste menší rozsah nebo nižší rozlišení.",
      workerFailed:
        "PDF nelze v tomto prohlížeči zpracovat. Zkontrolujte soubor a zkuste to znovu.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Jak používat {title}",
    safetyTitle: "Soubory zůstávají v tomto prohlížeči",
    safetyBody:
      "Vybrané soubory a výsledky jsou zpracovávány pouze v této záložce prohlížeče. Nejsou nahrávány, ukládány, přidávány do URL ani odesílány třetí straně.",
    privacyQuestion: "Jsou moje soubory nahrávány?",
    privacyAnswer:
      "Ne. Čtení souborů, zpracování PDF, vykreslování a tvorba ZIP probíhají lokálně v této záložce prohlížeče.",
    limitQuestion: "Proč existují limity na stránky a soubory?",
    limitAnswer:
      "PDF vykreslování může využít několik bytů paměti na pixel. Limity zabraňují tomu, aby velké úlohy způsobily zamrznutí nebo zavření karty prohlížeče.",
    pages: {
      "compress-pdf": {
        title: "Komprimovat PDF",
        description:
          "Zmenšete PDF a zvolte, zda se mají zachovat funkce dokumentu.",
        guide:
          "Vyberte PDF a úroveň komprese a stáhněte výsledek. Pokud potřebujete zachovat označitelný text a odkazy, použijte Zachovat dokument.",
        faqQuestion: "Zachová komprese vybíratelný text a odkazy?",
        faqAnswer:
          "Zachování dokumentu uchovává obsah stránek. Režimy vyvážený a menší převádějí stránky na obrázky, takže výběr, vyhledávání, odkazy, formuláře, poznámky, vrstvy a struktura přístupnosti jsou odstraněny.",
        searchTerms: [
          "komprimovat PDF",
          "snížit velikost PDF",
          "kompresor PDF",
        ],
      },
      "merge-pdf": {
        title: "Sloučit PDF",
        description:
          "Spojte několik PDF do jednoho souboru v pořadí, které si zvolíte.",
        guide:
          "Přidejte alespoň dva soubory PDF, uspořádejte je podle potřeby a stáhněte sloučený soubor.",
        faqQuestion: "Mohu změnit pořadí stránek uvnitř jednoho PDF?",
        faqAnswer:
          "Tato první verze řadí celé soubory. Nejprve rozdělte nebo přeuspořádejte zdrojové PDF, pokud mají mít jednotlivé stránky jiné pořadí.",
        searchTerms: ["sloučit PDF", "sloučit PDFy", "sloučení PDF"],
      },
      "split-pdf": {
        title: "Rozdělit PDF",
        description:
          "Vyjměte vybrané stránky nebo rozdělte PDF do několika souborů.",
        guide:
          "Vyberte PDF a vyjměte stránky nebo je rozdělte podle počtu stránek či rozsahů. Více výsledků se stáhne jako ZIP.",
        faqQuestion: "Snížení kvality stránek při dělení?",
        faqAnswer:
          "Při dělení není použita rastrizace. Existující stránky PDF jsou zkopírovány do nových souborů, i když se pokročilé funkce dokumentu nemusí přenést.",
        searchTerms: [
          "rozdělit PDF",
          "extrahovat stránky z PDF",
          "rozdělovač PDF",
        ],
      },
      "pdf-to-image": {
        title: "PDF na obraz",
        description: "Převeďte vybrané stránky PDF na obrázky JPG nebo PNG.",
        guide:
          "Vyberte PDF, požadované stránky, formát obrázku a rozlišení. Více stránek se stáhne jako ZIP.",
        faqQuestion: "Mám zvolit JPG nebo PNG?",
        faqAnswer:
          "JPG je obvykle menší u fotografií a skenů. PNG je bezztrátový a často lepší pro diagramy, ostrý text nebo průhlednost, ale může být mnohem větší.",
        searchTerms: ["PDF na obraz", "PDF do JPG", "PDF do PNG"],
      },
      "image-to-pdf": {
        title: "Obrázek do PDF",
        description:
          "Spojte obrázky JPG, PNG nebo WebP do jednoho PDF v pořadí, které si zvolíte.",
        guide:
          "Přidejte a seřaďte obrázky, zvolte rozvržení stránky a vytvořte PDF ke stažení.",
        faqQuestion: "Jsou moje obrázky ořezané nebo zvětšené?",
        faqAnswer:
          "Ne. Obrázky jsou vycentrovány a zmenšeny pouze v případě potřeby. Režim přizpůsobení používá vlastní proporce každého obrázku pro stránku PDF.",
        searchTerms: ["obrázek do PDF", "JPG do PDF", "PNG do PDF"],
      },
    },
  },
  pl: {
    ui: {
      ariaLabel: "Narzędzia PDF",
      choosePdf: "Wybierz PDF",
      choosePdfs: "Wybierz PDFy",
      chooseImages: "Wybierz obrazy",
      addFiles: "Dodaj pliki",
      replaceFile: "Zastąp plik",
      dropPdf: "lub upuść tutaj jeden PDF",
      dropPdfs: "lub upuść tutaj PDFy",
      dropImages: "lub upuść tutaj obrazy",
      pdfTypes: "PDF · do 200 MiB w tej sesji przeglądarki",
      imageTypes: "JPG, PNG lub WebP · łącznie do 200 MiB",
      selectedFiles: "Wybrane pliki",
      options: "Opcje",
      result: "Wynik",
      remove: "Usuń",
      moveUp: "Przenieś w górę",
      moveDown: "Przesuń w dół",
      pages: "strony",
      page: "strona",
      size: "Rozmiar",
      dimensions: "Wymiary",
      progress: "Postęp",
      cancel: "Anuluj",
      complete: "Zadanie PDF zakończone",
      compress: "Kompresuj PDF",
      merge: "Scal PDFy",
      split: "Podziel PDF",
      convertToImages: "Konwertuj na obrazy",
      createPdf: "Utwórz PDF",
      downloadPdf: "Pobierz PDF",
      downloadZip: "Pobierz ZIP",
      downloadImage: "Pobierz obraz",
      originalSize: "Rozmiar oryginalny",
      resultSize: "Rozmiar wyniku",
      smallerBy: "Mniejszy o",
      largerBy: "Większy o",
      compressionLevel: "Poziom kompresji",
      preserveDocument: "Zachowaj dokument",
      preserveDocumentHint:
        "Zachowuje tekst możliwy do zaznaczenia i funkcje dokumentu; rozmiar może się nieznacznie zmienić.",
      balanced: "Zrównoważony · zalecany",
      balancedHint:
        "144 DPI i zrównoważona jakość JPEG dla skanów i dokumentów PDF zawierających dużo obrazów.",
      smallerFile: "Mniejszy plik",
      smallerFileHint: "110 DPI i silniejsza kompresja obrazów.",
      rasterWarningTitle: "Strony stają się obrazami",
      rasterWarningBody:
        "Tryby zrównoważone i mniejsze zachowują wygląd, ale usuwają możliwość zaznaczania tekstu, wyszukiwania, linki, formularze, adnotacje, warstwy i strukturę dostępności.",
      extractPages: "Wyodrębnij strony",
      splitDocument: "Podziel dokument",
      pageSelection: "Strony",
      pageSelectionHint: "Przykład: 1, 3-5",
      everyPages: "Co N stron",
      customRanges: "Niestandardowe zakresy",
      pagesPerFile: "Strony na PDF",
      customRangesHint:
        "Każdy zakres oddzielony przecinkiem staje się jednym PDF.",
      selectAll: "Zaznacz wszystko",
      clearSelection: "Wyczyść zaznaczenie",
      outputFormat: "Format obrazu",
      resolution: "Rozdzielczość",
      quality: "JPG jakość",
      pageSize: "Rozmiar strony",
      fitImage: "Dopasuj obraz",
      orientation: "Orientacja",
      automatic: "Automatycznie",
      portrait: "Portret",
      landscape: "Krajobraz",
      margin: "Margines",
      noMargin: "Brak marginesu",
      smallMargin: "Mały",
      largeMargin: "Duży",
      resultFiles: "Pliki wynikowe",
      noReduction:
        "Wynik nie jest mniejszy. Spróbuj innego ustawienia wstępnego lub zachowaj oryginał.",
      fileTooLarge:
        "Wybrane pliki przekraczają lokalny limit przetwarzania 200 MiB.",
      tooManyPages: "Ten PDF przekracza limit 500 stron kopiowania.",
      tooManyRasterPages:
        "Wybierz maksymalnie 120 stron i utrzymaj wyrenderowany wynik poniżej 240 megapikseli.",
      invalidPdf: "Wybierz prawidłowy, czytelny plik PDF.",
      encryptedPdf:
        "Chronione hasłem PDF nie są jeszcze obsługiwane. Najpierw odblokuj plik i spróbuj ponownie.",
      invalidImage:
        "Nie udało się odczytać jednego obrazu. Spróbuj prawidłowego pliku JPG, PNG lub WebP.",
      unsupportedImage: "Wybierz obrazy JPG, PNG lub WebP.",
      minimumMergeFiles: "Wybierz co najmniej dwa pliki PDF do scalenia.",
      emptySelection: "Wybierz przynajmniej jedną stronę.",
      invalidRange:
        "Sprawdź wyrażenie strony. Używaj wartości takich jak 1, 3-5.",
      rangeOutOfBounds:
        "Wybrana strona znajduje się poza zakresem stron tego dokumentu.",
      reversedRange: "Zakres stron musi zaczynać się wcześniej niż się kończy.",
      renderFailed:
        "Nie udało się wyrenderować strony. Spróbuj mniejszego zakresu lub niższej rozdzielczości.",
      workerFailed:
        "Nie można przetworzyć PDF w tej przeglądarce. Sprawdź plik i spróbuj ponownie.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Jak korzystać z {title}",
    safetyTitle: "Pliki pozostają w tej przeglądarce",
    safetyBody:
      "Wybrane pliki i wyniki są przetwarzane tylko w tej karcie przeglądarki. Nie są przesyłane, przechowywane, dodawane do adresu URL ani wysyłane do osób trzecich.",
    privacyQuestion: "Czy moje pliki są przesyłane?",
    privacyAnswer:
      "Nie. Odczyt plików, przetwarzanie PDF, renderowanie i tworzenie ZIP odbywa się lokalnie w tej karcie przeglądarki.",
    limitQuestion: "Dlaczego istnieją limity stron i plików?",
    limitAnswer:
      "Renderowanie PDF może używać kilku bajtów pamięci na piksel. Limity zapobiegają zawieszaniu się lub zamykaniu zakładki przeglądarki przy dużych zadaniach.",
    pages: {
      "compress-pdf": {
        title: "Skompresuj PDF",
        description:
          "Zmniejsz plik PDF i wybierz, czy zachować funkcje dokumentu.",
        guide:
          "Wybierz PDF i poziom kompresji, a następnie pobierz wynik. Użyj opcji Zachowaj dokument, jeśli ważny jest tekst do zaznaczania i linki.",
        faqQuestion: "Czy kompresja zachowa wybieralny tekst i linki?",
        faqAnswer:
          "Zachowaj dokument utrzymuje zawartość strony. Tryby Zbalansowany i Mniejszy zamieniają strony w obrazy, więc wybieranie, wyszukiwanie, linki, formularze, adnotacje, warstwy i struktura dostępności są usuwane.",
        searchTerms: [
          "skompresuj PDF",
          "zmniejsz rozmiar PDF",
          "kompresor PDF",
        ],
      },
      "merge-pdf": {
        title: "Połącz PDF",
        description: "Połącz kilka plików PDF w jeden w wybranej kolejności.",
        guide:
          "Dodaj co najmniej dwa pliki PDF, ułóż je w odpowiedniej kolejności i pobierz połączony plik.",
        faqQuestion: "Czy mogę zmienić kolejność stron w jednym PDF?",
        faqAnswer:
          "Ta pierwsza wersja porządkuje całe pliki. Najpierw podziel lub przemieść źródłowy PDF, jeśli poszczególne strony muszą mieć inną kolejność.",
        searchTerms: ["połącz PDF", "łącz PDFy", "fuzja PDF"],
      },
      "split-pdf": {
        title: "Podziel PDF",
        description:
          "Wyodrębnij wybrane strony lub podziel PDF na kilka plików.",
        guide:
          "Wybierz PDF i wyodrębnij strony albo podziel go według liczby stron lub zakresów. Kilka wyników zostanie pobranych jako ZIP.",
        faqQuestion: "Czy dzielenie zmniejsza jakość stron?",
        faqAnswer:
          "Do dzielenia nie używa się rasteryzacji. Istniejące strony PDF są kopiowane do nowych plików, choć zaawansowane funkcje dokumentu mogą nie zostać zachowane.",
        searchTerms: ["podziel PDF", "wyodrębnij strony PDF", "dzielnik PDF"],
      },
      "pdf-to-image": {
        title: "PDF na obraz",
        description: "Konwertuj wybrane strony PDF na obrazy JPG lub PNG.",
        guide:
          "Wybierz PDF, strony, format obrazu i rozdzielczość. Kilka stron zostanie pobranych jako ZIP.",
        faqQuestion: "Czy powinienem wybrać JPG czy PNG?",
        faqAnswer:
          "JPG jest zazwyczaj mniejszy dla zdjęć i skanów. PNG jest bezstratny i często lepszy dla diagramów, ostrego tekstu lub przezroczystości, ale może być znacznie większy.",
        searchTerms: ["PDF na obraz", "PDF JPG", "PDF PNG"],
      },
      "image-to-pdf": {
        title: "Obraz do PDF",
        description:
          "Połącz obrazy JPG, PNG lub WebP w jeden PDF w wybranej kolejności.",
        guide:
          "Dodaj i uporządkuj obrazy, wybierz układ strony, a następnie utwórz i pobierz PDF.",
        faqQuestion: "Czy moje zdjęcia są przycięte czy powiększone?",
        faqAnswer:
          "Nie. Obrazy są centrowane i skalowane tylko wtedy, gdy jest to potrzebne. Tryb dopasowania wykorzystuje własne proporcje każdego obrazu dla PDF strony.",
        searchTerms: ["obraz do PDF", "JPG do PDF", "PNG do PDF"],
      },
    },
  },
  da: {
    ui: {
      ariaLabel: "PDF værktøjer",
      choosePdf: "Vælg PDF",
      choosePdfs: "Vælg PDFer",
      chooseImages: "Vælg billeder",
      addFiles: "Tilføj filer",
      replaceFile: "Erstat fil",
      dropPdf: "eller slip en PDF her",
      dropPdfs: "eller slip PDFer her",
      dropImages: "eller slip billeder her",
      pdfTypes: "PDF · op til 200 MiB i denne browser-session",
      imageTypes: "JPG, PNG, eller WebP · op til 200 MiB i alt",
      selectedFiles: "Valgte filer",
      options: "Indstillinger",
      result: "Resultat",
      remove: "Fjern",
      moveUp: "Flyt op",
      moveDown: "Flyt ned",
      pages: "sider",
      page: "side",
      size: "Størrelse",
      dimensions: "Dimensioner",
      progress: "Fremskridt",
      cancel: "Annuller",
      complete: "PDF opgave fuldført",
      compress: "Komprimer PDF",
      merge: "Sammenflet PDF'er",
      split: "Del PDF",
      convertToImages: "Konverter til billeder",
      createPdf: "Opret PDF",
      downloadPdf: "Download PDF",
      downloadZip: "Download ZIP",
      downloadImage: "Download billede",
      originalSize: "Original størrelse",
      resultSize: "Resultatstørrelse",
      smallerBy: "Mindre med",
      largerBy: "Større med",
      compressionLevel: "Komprimeringsniveau",
      preserveDocument: "Bevar dokument",
      preserveDocumentHint:
        "Bevarer valgbar tekst og dokumentfunktioner; størrelsen kan ændre sig lidt.",
      balanced: "Balanseret · anbefales",
      balancedHint:
        "144 DPI og balanceret JPEG-kvalitet til scanninger og billedtunge PDF'er.",
      smallerFile: "Mindre fil",
      smallerFileHint: "110 DPI og stærkere billedkomprimering.",
      rasterWarningTitle: "Sider bliver billeder",
      rasterWarningBody:
        "Balanserede og mindre tilstande bevarer udseendet, men fjerner tekstvalg, søgning, links, formularer, annotationer, lag og tilgængelighedsstruktur.",
      extractPages: "Uddrag sider",
      splitDocument: "Opdel dokument",
      pageSelection: "Sider",
      pageSelectionHint: "Eksempel: 1, 3-5",
      everyPages: "Hver N side",
      customRanges: "Brugerdefinerede intervaller",
      pagesPerFile: "Sider pr. PDF",
      customRangesHint: "Hver kommaadskilt række bliver til én PDF.",
      selectAll: "Vælg alle",
      clearSelection: "Ryd markering",
      outputFormat: "Billedformat",
      resolution: "Opløsning",
      quality: "JPG kvalitet",
      pageSize: "Sidestørrelse",
      fitImage: "Tilpas billede",
      orientation: "Retning",
      automatic: "Automatisk",
      portrait: "Portræt",
      landscape: "Landskab",
      margin: "Margin",
      noMargin: "Ingen margen",
      smallMargin: "Lille",
      largeMargin: "Stor",
      resultFiles: "Resultatfiler",
      noReduction:
        "Resultatet er ikke mindre. Prøv en anden forindstilling eller behold originalen.",
      fileTooLarge:
        "De valgte filer overskrider 200 MiB grænsen for lokal behandling.",
      tooManyPages: "Dette PDF overskrider 500-siders kopigrænsen.",
      tooManyRasterPages:
        "Vælg maksimalt 120 sider og hold den gengivne output under 240 megapixel.",
      invalidPdf: "Vælg en gyldig, læsbar PDF fil.",
      encryptedPdf:
        "Adgangskodebeskyttede PDF-filer understøttes endnu ikke. Lås filen op først og prøv igen.",
      invalidImage:
        "Én billedfil kunne ikke læses. Prøv en gyldig JPG, PNG eller WebP fil.",
      unsupportedImage: "Vælg JPG, PNG eller WebP billeder.",
      minimumMergeFiles: "Vælg mindst to PDF-filer for at flette.",
      emptySelection: "Vælg mindst én side.",
      invalidRange: "Tjek sidesyntaksen. Brug værdier såsom 1, 3-5.",
      rangeOutOfBounds: "En valgt side er uden for dette dokuments sidetal.",
      reversedRange: "Et sidesegment skal starte, før det slutter.",
      renderFailed:
        "En side kunne ikke gengives. Prøv et mindre område eller lavere opløsning.",
      workerFailed:
        "PDF kunne ikke behandles i denne browser. Tjek filen og prøv igen.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Sådan bruger du {title}",
    safetyTitle: "Filer forbliver i denne browser",
    safetyBody:
      "De valgte filer og resultater behandles kun i denne browsertab. De bliver ikke uploadet, gemt, tilføjet til en URL eller sendt til en tredjepart.",
    privacyQuestion: "Bliver mine filer uploadet?",
    privacyAnswer:
      "Nej. Fil-læsning, PDF behandling, gengivelse og ZIP oprettelse sker lokalt i denne browsertab.",
    limitQuestion: "Hvorfor er der sides- og fillimits?",
    limitAnswer:
      "PDF gengivelse kan bruge flere byte hukommelse pr. pixel. Limits forhindrer store opgaver i at fryse eller lukke browserfanen.",
    pages: {
      "compress-pdf": {
        title: "Komprimer PDF",
        description:
          "Gør en PDF mindre, og vælg, om dokumentfunktionerne skal bevares.",
        guide:
          "Vælg en PDF og et komprimeringsniveau, og download resultatet. Brug Bevar dokument, hvis markerbar tekst og links er vigtige.",
        faqQuestion: "Vil komprimering bevare valgbar tekst og links?",
        faqAnswer:
          "Bevar dokument bevarer sideindhold. Balanseret og mindre tilstande omdanner sider til billeder, så valg, søgning, links, formularer, annotationer, lag og tilgængelighedsstruktur fjernes.",
        searchTerms: [
          "komprimer PDF",
          "reducer PDF størrelse",
          "PDF kompressor",
        ],
      },
      "merge-pdf": {
        title: "Sammenflet PDF",
        description:
          "Sammenflet flere PDF-filer til én fil i den rækkefølge, du vælger.",
        guide:
          "Tilføj mindst to PDF-filer, arranger dem som ønsket, og download den sammenflettede fil.",
        faqQuestion: "Kan jeg ændre siderekkefølgen inde i én PDF?",
        faqAnswer:
          "Denne første version ordner hele filer. Del eller rearranger kildens PDF først, når individuelle sider skal have en anden rækkefølge.",
        searchTerms: ["sammenflet PDF", "kombiner PDFer", "PDF fusion"],
      },
      "split-pdf": {
        title: "Opdel PDF",
        description: "Udtræk valgte sider, eller opdel en PDF i flere filer.",
        guide:
          "Vælg en PDF, og udtræk sider eller opdel den efter sidetal eller intervaller. Flere resultater downloades som en ZIP-fil.",
        faqQuestion: "Reducerer opdeling sidekvaliteten?",
        faqAnswer:
          "Der bruges ingen rasterisering ved opdeling. Eksisterende PDF-sider kopieres til nye filer, selvom avancerede funktioner på dokumentniveau muligvis ikke overføres.",
        searchTerms: ["opdel PDF", "udtræk PDF sider", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF til billede",
        description: "Konvertér valgte PDF-sider til JPG- eller PNG-billeder.",
        guide:
          "Vælg en PDF samt de ønskede sider, billedformat og opløsning. Flere sider downloades som en ZIP-fil.",
        faqQuestion: "Skal jeg vælge JPG eller PNG?",
        faqAnswer:
          "JPG er normalt mindre for fotos og scanninger. PNG er tabsfri og ofte bedre til diagrammer, skarp tekst eller gennemsigtighed, men kan være meget større.",
        searchTerms: ["PDF til billede", "PDF til JPG", "PDF til PNG"],
      },
      "image-to-pdf": {
        title: "Billede til PDF",
        description:
          "Saml JPG-, PNG- eller WebP-billeder i én PDF i den rækkefølge, du vælger.",
        guide:
          "Tilføj og arranger billederne, vælg sidelayout, og opret PDF-filen til download.",
        faqQuestion: "Bliver mine billeder beskåret eller forstørret?",
        faqAnswer:
          "Nej. Billederne er centrerede og skaleres kun ned, når det er nødvendigt. Tilpas-tilstand bruger hvert billedes egne proportioner til PDF-siden.",
        searchTerms: ["billede til PDF", "JPG til PDF", "PNG til PDF"],
      },
    },
  },
  no: {
    ui: {
      ariaLabel: "PDF verktøy",
      choosePdf: "Velg PDF",
      choosePdfs: "Velg PDFer",
      chooseImages: "Velg bilder",
      addFiles: "Legg til filer",
      replaceFile: "Erstatt fil",
      dropPdf: "eller slipp en PDF her",
      dropPdfs: "eller slipp PDFer her",
      dropImages: "eller slipp bilder her",
      pdfTypes: "PDF · opptil 200 MiB i denne nettleserøkten",
      imageTypes: "JPG, PNG eller WebP · opptil 200 MiB totalt",
      selectedFiles: "Valgte filer",
      options: "Alternativer",
      result: "Resultat",
      remove: "Fjern",
      moveUp: "Flytt opp",
      moveDown: "Flytt ned",
      pages: "sider",
      page: "side",
      size: "Størrelse",
      dimensions: "Dimensjoner",
      progress: "Fremgang",
      cancel: "Avbryt",
      complete: "PDF oppgaven fullført",
      compress: "Komprimer PDF",
      merge: "Slå sammen PDFer",
      split: "Del PDF",
      convertToImages: "Konverter til bilder",
      createPdf: "Opprett PDF",
      downloadPdf: "Last ned PDF",
      downloadZip: "Last ned ZIP",
      downloadImage: "Last ned bilde",
      originalSize: "Opprinnelig størrelse",
      resultSize: "Resultatstørrelse",
      smallerBy: "Mindre med",
      largerBy: "Større med",
      compressionLevel: "Komprimeringsnivå",
      preserveDocument: "Bevar dokument",
      preserveDocumentHint:
        "Bevarer valgbar tekst og dokumentfunksjoner; størrelsen kan endres litt.",
      balanced: "Balansert · anbefalt",
      balancedHint:
        "144 DPI og balansert JPEG-kvalitet for skanninger og bildefylte PDF-er.",
      smallerFile: "Mindre fil",
      smallerFileHint: "110 DPI og sterkere bildekomprimering.",
      rasterWarningTitle: "Sider blir bilder",
      rasterWarningBody:
        "Balanserte og mindre moduser bevarer utseendet, men fjerner tekstvalg, søk, lenker, skjemaer, annotasjoner, lag og tilgjengelighetsstruktur.",
      extractPages: "Ekstraher sider",
      splitDocument: "Del dokument",
      pageSelection: "Sider",
      pageSelectionHint: "Eksempel: 1, 3-5",
      everyPages: "Hver N side",
      customRanges: "Egendefinerte områder",
      pagesPerFile: "Sider per PDF",
      customRangesHint: "Hvert område adskilt med komma blir én PDF.",
      selectAll: "Velg alle",
      clearSelection: "Fjern valg",
      outputFormat: "Bildeformat",
      resolution: "Oppløsning",
      quality: "JPG kvalitet",
      pageSize: "Sidestørrelse",
      fitImage: "Tilpass bilde",
      orientation: "Retning",
      automatic: "Automatisk",
      portrait: "Portrett",
      landscape: "Landskap",
      margin: "Margin",
      noMargin: "Ingen margin",
      smallMargin: "Liten",
      largeMargin: "Stor",
      resultFiles: "Resultatfiler",
      noReduction:
        "Resultatet er ikke mindre. Prøv en annen forhåndsinnstilling eller behold originalen.",
      fileTooLarge:
        "De valgte filene overskrider 200 MiB grensen for lokal behandling.",
      tooManyPages: "Denne PDF overskrider 500-siders kopigrensen.",
      tooManyRasterPages:
        "Velg maksimalt 120 sider og hold det gjengitte resultatet under 240 megapiksler.",
      invalidPdf: "Velg en gyldig, lesbar PDF-fil.",
      encryptedPdf:
        "Passordbeskyttede PDF-filer støttes ennå ikke. Lås opp filen først og prøv igjen.",
      invalidImage:
        "Én bilde kunne ikke leses. Prøv en gyldig JPG, PNG eller WebP-fil.",
      unsupportedImage: "Velg JPG, PNG eller WebP-bilder.",
      minimumMergeFiles: "Velg minst to PDF-filer for å slå sammen.",
      emptySelection: "Velg minst én side.",
      invalidRange: "Sjekk sidespesifikasjonen. Bruk verdier som 1, 3-5.",
      rangeOutOfBounds: "En valgt side er utenfor dokumentets sidetall.",
      reversedRange: "Et sideområde må starte før det slutter.",
      renderFailed:
        "En side kunne ikke gjengis. Prøv et mindre område eller lavere oppløsning.",
      workerFailed:
        "PDF kunne ikke behandles i denne nettleseren. Sjekk filen og prøv igjen.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "Hvordan du bruker {title}",
    safetyTitle: "Filene blir i denne nettleseren",
    safetyBody:
      "De valgte filene og resultatene behandles kun i denne nettleserfanen. De blir ikke lastet opp, lagret, lagt til en URL, eller sendt til en tredjepart.",
    privacyQuestion: "Blir filene mine lastet opp?",
    privacyAnswer:
      "Nei. Fillelesing, PDF-behandling, gjengivelse, og ZIP-opprettelse skjer lokalt i denne nettleserfanen.",
    limitQuestion: "Hvorfor finnes det sides- og filgrenser?",
    limitAnswer:
      "PDF-gjengivelse kan bruke flere byte med minne per piksel. Grensene hindrer at store jobber fryser eller lukker nettleserfanen.",
    pages: {
      "compress-pdf": {
        title: "Komprimer PDF",
        description:
          "Gjør en PDF mindre, og velg om dokumentfunksjonene skal beholdes.",
        guide:
          "Velg en PDF og et komprimeringsnivå, og last ned resultatet. Bruk Bevar dokument hvis markerbar tekst og lenker er viktige.",
        faqQuestion: "Vil komprimering bevare valgbart tekst og lenker?",
        faqAnswer:
          "Bevar dokument beholder sideinnhold. Balansert og mindre moduser gjør sider om til bilder, så valg, søk, lenker, skjemaer, merknader, lag og tilgjengelighetsstruktur fjernes.",
        searchTerms: [
          "komprimer PDF",
          "reduser PDF størrelse",
          "PDF kompressor",
        ],
      },
      "merge-pdf": {
        title: "Slå sammen PDF",
        description:
          "Slå sammen flere PDF-filer til én fil i den rekkefølgen du velger.",
        guide:
          "Legg til minst to PDF-filer, ordne dem som ønsket, og last ned den sammenslåtte filen.",
        faqQuestion: "Kan jeg endre sideordren inne i en PDF?",
        faqAnswer:
          "Denne første versjonen ordner hele filer. Del eller omorganiser kildens PDF først når individuelle sider trenger en annen rekkefølge.",
        searchTerms: ["slå sammen PDF", "kombiner PDFer", "PDF sammenslåing"],
      },
      "split-pdf": {
        title: "Del PDF",
        description: "Hent ut valgte sider, eller del en PDF i flere filer.",
        guide:
          "Velg en PDF, og hent ut sider eller del den etter antall sider eller intervaller. Flere resultater lastes ned som en ZIP-fil.",
        faqQuestion: "Reduserer deling sidens kvalitet?",
        faqAnswer:
          "Ingen rasterisering brukes ved deling. Eksisterende PDF-sider kopieres til nye filer, selv om avanserte dokumentomfattende funksjoner kanskje ikke videreføres.",
        searchTerms: ["del PDF", "hent ut PDF sider", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF til bilde",
        description: "Konverter valgte PDF-sider til JPG- eller PNG-bilder.",
        guide:
          "Velg en PDF samt ønskede sider, bildeformat og oppløsning. Flere sider lastes ned som en ZIP-fil.",
        faqQuestion: "Skal jeg velge JPG eller PNG?",
        faqAnswer:
          "JPG er vanligvis mindre for bilder og skanninger. PNG er tapsfri og ofte bedre for diagrammer, skarp tekst eller gjennomsiktighet, men kan være mye større.",
        searchTerms: ["PDF til bilde", "PDF til JPG", "PDF til PNG"],
      },
      "image-to-pdf": {
        title: "Bilde til PDF",
        description:
          "Samle JPG-, PNG- eller WebP-bilder i én PDF i den rekkefølgen du velger.",
        guide:
          "Legg til og ordne bildene, velg sideoppsett, og opprett PDF-filen for nedlasting.",
        faqQuestion: "Blir bildene mine beskjært eller forstørret?",
        faqAnswer:
          "Nei. Bilder er sentrert og skaleres ned kun når det er nødvendig. Tilpass-modus bruker hvert bildeforholds egne proporsjoner for PDF-siden.",
        searchTerms: ["bilde til PDF", "JPG til PDF", "PNG til PDF"],
      },
    },
  },
  ar: {
    ui: {
      ariaLabel: "أدوات PDF",
      choosePdf: "اختر PDF",
      choosePdfs: "اختر PDFs",
      chooseImages: "اختر الصور",
      addFiles: "أضف الملفات",
      replaceFile: "استبدل الملف",
      dropPdf: "أو اسقط PDF هنا",
      dropPdfs: "أو اسقط PDFs هنا",
      dropImages: "أو اسحب الصور هنا",
      pdfTypes: "PDF · حتى 200 MiB في هذه الجلسة من المتصفح",
      imageTypes: "JPG، PNG، أو WebP · حتى 200 MiB إجمالاً",
      selectedFiles: "الملفات المحددة",
      options: "الخيارات",
      result: "النتيجة",
      remove: "إزالة",
      moveUp: "نقل للأعلى",
      moveDown: "النزول",
      pages: "صفحات",
      page: "صفحة",
      size: "الحجم",
      dimensions: "الأبعاد",
      progress: "التقدم",
      cancel: "إلغاء",
      complete: "PDF اكتملت المهمة",
      compress: "ضغط PDF",
      merge: "دمج PDFs",
      split: "تقسيم PDF",
      convertToImages: "التحويل إلى صور",
      createPdf: "إنشاء PDF",
      downloadPdf: "تحميل PDF",
      downloadZip: "تحميل ZIP",
      downloadImage: "تحميل الصورة",
      originalSize: "الحجم الأصلي",
      resultSize: "حجم النتيجة",
      smallerBy: "أصغر بمقدار",
      largerBy: "أكبر بمقدار",
      compressionLevel: "مستوى الضغط",
      preserveDocument: "الاحتفاظ بالمستند",
      preserveDocumentHint:
        "يحافظ على النص القابل للاختيار وميزات المستند؛ قد يتغير الحجم قليلاً.",
      balanced: "متوازن · موصى به",
      balancedHint:
        "144 DPI وجودة JPEG متوازنة للمسح الضوئي وملفات PDF التي تحتوي على الكثير من الصور.",
      smallerFile: "ملف أصغر",
      smallerFileHint: "110 DPI وضغط أقوى للصورة.",
      rasterWarningTitle: "تصبح الصفحات صورًا",
      rasterWarningBody:
        "يحافظ الوضع المتوازن والأصغر على المظهر، لكنه يزيل اختيار النص، البحث، الروابط، النماذج، التعليقات التوضيحية، الطبقات، وهيكلية الوصول.",
      extractPages: "استخراج الصفحات",
      splitDocument: "تقسيم المستند",
      pageSelection: "الصفحات",
      pageSelectionHint: "مثال: 1، 3-5",
      everyPages: "كل N صفحة",
      customRanges: "نطاقات مخصصة",
      pagesPerFile: "الصفحات لكل PDF",
      customRangesHint: "كل نطاق مفصول بفاصلة يصبح PDF واحدًا.",
      selectAll: "تحديد الكل",
      clearSelection: "مسح التحديد",
      outputFormat: "تنسيق الصورة",
      resolution: "الدقة",
      quality: "جودة JPG",
      pageSize: "حجم الصفحة",
      fitImage: "ملاءمة الصورة",
      orientation: "الاتجاه",
      automatic: "تلقائي",
      portrait: "عمودي",
      landscape: "أفقي",
      margin: "الهامش",
      noMargin: "بدون هامش",
      smallMargin: "صغير",
      largeMargin: "كبير",
      resultFiles: "ملفات النتائج",
      noReduction: "النتيجة ليست أصغر. جرب إعدادًا مسبقًا آخر أو احتفظ بالأصل.",
      fileTooLarge:
        "الملفات المحددة تتجاوز الحد المحلي للمعالجة البالغ 200 MiB.",
      tooManyPages: "هذا PDF يتجاوز حد النسخ البالغ 500 صفحة.",
      tooManyRasterPages:
        "اختر ما لا يزيد عن 120 صفحة وحافظ على أن يكون الإخراج المرسوم أقل من 240 ميغابيكسل.",
      invalidPdf: "اختر ملف PDF صالح وقابل للقراءة.",
      encryptedPdf:
        "ملفات PDF المحمية بكلمة مرور غير مدعومة بعد. قم بإلغاء قفل الملف أولاً ثم حاول مرة أخرى.",
      invalidImage:
        "لم يتمكن من قراءة صورة واحدة. جرب ملف JPG أو PNG أو WebP صالح.",
      unsupportedImage: "اختر صور JPG أو PNG أو WebP.",
      minimumMergeFiles: "اختر على الأقل ملفي PDF للدمج.",
      emptySelection: "اختر صفحة واحدة على الأقل.",
      invalidRange: "تحقق من تعبير الصفحة. استخدم قيم مثل 1، 3-5.",
      rangeOutOfBounds: "الصفحة المختارة خارج عدد صفحات هذا المستند.",
      reversedRange: "يجب أن يبدأ نطاق الصفحات قبل أن ينتهي.",
      renderFailed: "تعذر عرض الصفحة. حاول نطاقًا أصغر أو دقة أقل.",
      workerFailed:
        "تعذر معالجة PDF في هذا المتصفح. تحقق من الملف وحاول مرة أخرى.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "كيفية استخدام {title}",
    safetyTitle: "تبقى الملفات في هذا المتصفح",
    safetyBody:
      "الملفات والنتائج المحددة تتم معالجتها فقط في علامة تبويب هذا المتصفح. لا يتم رفعها أو تخزينها أو إضافتها إلى عنوان ويب أو إرسالها إلى طرف ثالث.",
    privacyQuestion: "هل يتم رفع ملفاتي؟",
    privacyAnswer:
      "لا. يتم قراءة الملفات، ومعالجة PDF، وعرضها، وإنشاء ZIP محليًا في علامة تبويب هذا المتصفح.",
    limitQuestion: "لماذا توجد حدود للصفحات والملفات؟",
    limitAnswer:
      "يمكن أن يستخدم عرض PDF عدة بايتات من الذاكرة لكل بكسل. الحدود تمنع المهام الكبيرة من التجميد أو إغلاق تبويب المتصفح.",
    pages: {
      "compress-pdf": {
        title: "ضغط PDF",
        description:
          "قلّل حجم ملف PDF واختر ما إذا كنت تريد الحفاظ على خصائص المستند.",
        guide:
          "اختر ملف PDF ومستوى الضغط، ثم نزّل النتيجة. استخدم خيار الحفاظ على المستند إذا كان تحديد النص والروابط مهمًا لك.",
        faqQuestion: "هل ستحتفظ عملية الضغط بالنصوص والروابط القابلة للاختيار؟",
        faqAnswer:
          "خيار الحفاظ على المستند يحتفظ بمحتوى الصفحة. الوضع المتوازن والوضع الأصغر يحول الصفحات إلى صور، لذا يتم إزالة التحديد، البحث، الروابط، النماذج، التعليقات، الطبقات، وبنية الوصول.",
        searchTerms: ["ضغط PDF", "تقليل حجم PDF", "ضاغط PDF"],
      },
      "merge-pdf": {
        title: "دمج PDF",
        description: "ادمج عدة ملفات PDF في ملف واحد بالترتيب الذي تختاره.",
        guide:
          "أضف ملفي PDF على الأقل، ورتّبهما كما تريد، ثم نزّل الملف المدمج.",
        faqQuestion: "هل يمكنني تغيير ترتيب الصفحات داخل PDF واحد؟",
        faqAnswer:
          "هذا الإصدار الأول يرتب الملفات بالكامل. قم بتقسيم أو إعادة ترتيب PDF المصدر أولاً عندما تحتاج الصفحات الفردية إلى ترتيب مختلف.",
        searchTerms: ["دمج PDF", "دمج PDFs", "دمج PDF"],
      },
      "split-pdf": {
        title: "تقسيم PDF",
        description:
          "استخرج الصفحات التي تريدها أو قسّم ملف PDF إلى عدة ملفات.",
        guide:
          "اختر ملف PDF، ثم استخرج الصفحات أو قسّمه حسب عدد الصفحات أو النطاقات. تُنزّل النتائج المتعددة في ملف ZIP.",
        faqQuestion: "هل يقلل التقسيم من جودة الصفحات؟",
        faqAnswer:
          "لا يتم استخدام الترصيع (Rasterization) أثناء التقسيم. تُنسخ صفحات PDF الحالية إلى ملفات جديدة، على الرغم من أن الميزات المتقدمة على مستوى المستند قد لا تنتقل.",
        searchTerms: ["تقسيم PDF", "استخراج صفحات PDF", "قسم PDF"],
      },
      "pdf-to-image": {
        title: "تحويل PDF إلى صورة",
        description: "حوّل صفحات PDF المحددة إلى صور JPG أو PNG.",
        guide:
          "اختر ملف PDF والصفحات المطلوبة وتنسيق الصورة ودقتها. تُنزّل الصفحات المتعددة في ملف ZIP.",
        faqQuestion: "هل يجب أن أختار JPG أم PNG؟",
        faqAnswer:
          "عادةً ما يكون JPG أصغر للصور الفوتوغرافية أو المسح الضوئي. PNG بدون فقد، وغالبًا أفضل للرسوم البيانية، النصوص الحادة، أو الشفافية، لكنه قد يكون أكبر بكثير.",
        searchTerms: ["تحويل PDF إلى صورة", "PDF إلى JPG", "PDF إلى PNG"],
      },
      "image-to-pdf": {
        title: "صورة إلى PDF",
        description:
          "اجمع صور JPG أو PNG أو WebP في ملف PDF واحد بالترتيب الذي تختاره.",
        guide: "أضف الصور ورتّبها، واختر تخطيط الصفحة، ثم أنشئ ملف PDF ونزّله.",
        faqQuestion: "هل يتم قص أو تكبير صوري؟",
        faqAnswer:
          "لا. الصور تكون في المنتصف وتتم تصغيرها فقط عند الحاجة. وضع الملاءمة يستخدم نسب الصورة الأصلية لصفحة PDF.",
        searchTerms: ["صورة إلى PDF", "JPG إلى PDF", "PNG إلى PDF"],
      },
    },
  },
  "zh-TW": {
    ui: {
      ariaLabel: "PDF 工具",
      choosePdf: "選擇 PDF",
      choosePdfs: "選擇 PDFs",
      chooseImages: "選擇圖片",
      addFiles: "新增檔案",
      replaceFile: "替換檔案",
      dropPdf: "或將一個 PDF 拖到這裡",
      dropPdfs: "或將 PDFs 拖到這裡",
      dropImages: "或將圖片拖到此處",
      pdfTypes: "PDF · 在此瀏覽器會話中最多 200 MiB",
      imageTypes: "JPG、PNG 或 WebP · 總共最多 200 MiB",
      selectedFiles: "選擇的檔案",
      options: "選項",
      result: "結果",
      remove: "移除",
      moveUp: "上移",
      moveDown: "向下移動",
      pages: "頁",
      page: "頁",
      size: "大小",
      dimensions: "尺寸",
      progress: "進度",
      cancel: "取消",
      complete: "PDF 任務完成",
      compress: "壓縮 PDF",
      merge: "合併 PDFs",
      split: "拆分 PDF",
      convertToImages: "轉換為圖片",
      createPdf: "創建 PDF",
      downloadPdf: "下載 PDF",
      downloadZip: "下載 ZIP",
      downloadImage: "下載圖片",
      originalSize: "原始大小",
      resultSize: "結果大小",
      smallerBy: "減少",
      largerBy: "增加",
      compressionLevel: "壓縮等級",
      preserveDocument: "保留文件",
      preserveDocumentHint: "保留可選文字和文件功能；大小可能略有變化。",
      balanced: "平衡 · 推薦",
      balancedHint:
        "144 DPI 並且對掃描件及以圖片為主的 PDF 採用平衡的 JPEG 品質。",
      smallerFile: "檔案較小",
      smallerFileHint: "110 DPI 並且採用更強的圖片壓縮。",
      rasterWarningTitle: "頁面變成圖片",
      rasterWarningBody:
        "平衡與較小模式可保留外觀，但會移除文字選擇、搜尋、連結、表單、註解、圖層及可存取性結構。",
      extractPages: "提取頁面",
      splitDocument: "拆分文件",
      pageSelection: "頁面",
      pageSelectionHint: "範例：1, 3-5",
      everyPages: "每 N 頁",
      customRanges: "自訂範圍",
      pagesPerFile: "每個 PDF 的頁數",
      customRangesHint: "每個以逗號分隔的範圍會變成一個 PDF。",
      selectAll: "全選",
      clearSelection: "清除選擇",
      outputFormat: "圖片格式",
      resolution: "解析度",
      quality: "JPG 品質",
      pageSize: "頁面大小",
      fitImage: "適合影像",
      orientation: "方向",
      automatic: "自動",
      portrait: "直向",
      landscape: "橫向",
      margin: "邊距",
      noMargin: "無邊距",
      smallMargin: "小",
      largeMargin: "大",
      resultFiles: "結果檔案",
      noReduction: "結果沒有變小。請嘗試其他預設值或保留原始檔案。",
      fileTooLarge: "選取的檔案超過 200 MiB 的本地處理限制。",
      tooManyPages: "此 PDF 超過 500 頁的複製限制。",
      tooManyRasterPages: "選擇最多 120 頁，並保持渲染輸出低於 240 百萬像素。",
      invalidPdf: "選擇有效且可讀的 PDF 檔案。",
      encryptedPdf: "暫不支援受密碼保護的 PDF。請先解鎖檔案，然後再試一次。",
      invalidImage: "無法讀取一張圖片。請嘗試有效的 JPG、PNG 或 WebP 檔案。",
      unsupportedImage: "選擇 JPG、PNG 或 WebP 圖片。",
      minimumMergeFiles: "至少選擇兩個 PDF 以合併。",
      emptySelection: "至少選擇一頁。",
      invalidRange: "檢查頁面表達式。請使用類似 1、3-5 的值。",
      rangeOutOfBounds: "所選頁面超出此文件的頁數範圍。",
      reversedRange: "頁面範圍必須從前面的頁開始到後面的頁結束。",
      renderFailed: "無法呈現頁面。請嘗試選擇較小的範圍或較低的解析度。",
      workerFailed: "無法在此瀏覽器中處理 PDF。請檢查檔案並重試。",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "如何使用 {title}",
    safetyTitle: "檔案保持在此瀏覽器中",
    safetyBody:
      "選取的檔案和結果僅在此瀏覽器分頁中處理。它們不會被上傳、儲存、加入至 URL，或傳送給第三方。",
    privacyQuestion: "我的檔案會被上傳嗎？",
    privacyAnswer:
      "不會。檔案讀取、PDF 處理、渲染以及 ZIP 建立都發生在此瀏覽器分頁的本地。",
    limitQuestion: "為什麼會有頁數和檔案限制？",
    limitAnswer:
      "PDF 渲染每個像素可能會使用數位位元組的記憶體。這些限制可以避免大型工作造成瀏覽器分頁凍結或關閉。",
    pages: {
      "compress-pdf": {
        title: "壓縮 PDF",
        description: "縮小 PDF 檔案，並選擇是否保留文件功能。",
        guide:
          "選擇 PDF 與壓縮程度後下載結果。若需要保留可選取的文字與連結，請使用保留文件。",
        faqQuestion: "壓縮會保留可選取的文字和連結嗎？",
        faqAnswer:
          "保留文件會保留頁面內容。平衡模式和小尺寸模式會將頁面轉為影像，因此選取、搜尋、連結、表單、註解、圖層和可存取性結構都會被移除。",
        searchTerms: ["壓縮 PDF", "減少 PDF 大小", "PDF 壓縮器"],
      },
      "merge-pdf": {
        title: "合併 PDF",
        description: "依照你選擇的順序，將多個 PDF 合併成一個檔案。",
        guide: "加入至少兩個 PDF，排成想要的順序，再合併並下載結果。",
        faqQuestion: "我可以改變單個 PDF 中的頁面順序嗎？",
        faqAnswer:
          "此第一版本是對整個文件進行排序。當單個頁面需要不同順序時，請先分割或重新排列源 PDF。",
        searchTerms: ["合併 PDF", "合併 PDF", "PDF 合併"],
      },
      "split-pdf": {
        title: "分割 PDF",
        description: "擷取需要的頁面，或將一個 PDF 分割成多個檔案。",
        guide: "選擇 PDF，擷取頁面或依頁數、範圍分割。多個結果會以 ZIP 下載。",
        faqQuestion: "分割是否會降低頁面品質？",
        faqAnswer:
          "分割過程不使用光柵化。現有的 PDF 頁面會被複製到新檔案中，但進階的整份文件功能可能無法保留。",
        searchTerms: ["分割 PDF", "擷取 PDF 頁面", "PDF 分割器"],
      },
      "pdf-to-image": {
        title: "PDF 轉圖片",
        description: "將選取的 PDF 頁面轉換成 JPG 或 PNG 圖片。",
        guide:
          "選擇 PDF、需要的頁面、圖片格式與解析度。多頁結果會以 ZIP 下載。",
        faqQuestion: "我應該選 JPG 還是 PNG？",
        faqAnswer:
          "JPG 通常對照片和掃描件較小。PNG 是無損的，通常對圖表、清晰文字或透明背景更好，但檔案可能會大很多。",
        searchTerms: ["PDF 轉圖片", "PDF 轉換為 JPG", "PDF 轉換為 PNG"],
      },
      "image-to-pdf": {
        title: "圖像轉 PDF",
        description: "依照你選擇的順序，將 JPG、PNG 或 WebP 圖片合成一個 PDF。",
        guide: "加入並排列圖片，選擇頁面配置，再建立並下載 PDF。",
        faqQuestion: "我的圖像會被裁剪或放大嗎？",
        faqAnswer:
          "不。圖像會置中，僅在需要時縮小。適應模式使用每個圖像自身比例來填充 PDF 頁面。",
        searchTerms: ["圖像轉 PDF", "JPG 轉成 PDF", "PNG 轉成 PDF"],
      },
    },
  },
  tr: {
    ui: {
      ariaLabel: "PDF araçları",
      choosePdf: "PDF seç",
      choosePdfs: "PDF'leri seç",
      chooseImages: "Görselleri seç",
      addFiles: "Dosya ekle",
      replaceFile: "Dosyayı değiştir",
      dropPdf: "veya bir PDF'i buraya bırak",
      dropPdfs: "veya PDF'leri buraya bırak",
      dropImages: "veya resimleri buraya bırakın",
      pdfTypes: "PDF · bu tarayıcı oturumunda 200 MiB'a kadar",
      imageTypes: "JPG, PNG, veya WebP · toplam 200 MiB'a kadar",
      selectedFiles: "Seçilen dosyalar",
      options: "Seçenekler",
      result: "Sonuç",
      remove: "Kaldır",
      moveUp: "Yukarı taşı",
      moveDown: "Aşağı taşı",
      pages: "sayfalar",
      page: "sayfa",
      size: "Boyut",
      dimensions: "Ölçüler",
      progress: "İlerleme",
      cancel: "İptal",
      complete: "PDF görevi tamamlandı",
      compress: "PDF'yi Sıkıştır",
      merge: "PDF'leri Birleştir",
      split: "PDF'yi Böl",
      convertToImages: "Görüntülere Dönüştür",
      createPdf: "PDF Oluştur",
      downloadPdf: "PDF'yi İndir",
      downloadZip: "ZIP'i İndir",
      downloadImage: "Görüntüyü İndir",
      originalSize: "Orijinal boyut",
      resultSize: "Sonuç boyutu",
      smallerBy: "Kadar daha küçük",
      largerBy: "Kadar daha büyük",
      compressionLevel: "Sıkıştırma seviyesi",
      preserveDocument: "Belgeyi koru",
      preserveDocumentHint:
        "Seçilebilir metin ve belge özelliklerini korur; boyut biraz değişebilir.",
      balanced: "Dengeli · önerilen",
      balancedHint:
        "Tarama ve görsel ağırlıklı PDF'ler için 144 DPI ve dengeli JPEG kalitesi.",
      smallerFile: "Daha küçük dosya",
      smallerFileHint: "110 DPI ve daha güçlü görüntü sıkıştırma.",
      rasterWarningTitle: "Sayfalar resim olur",
      rasterWarningBody:
        "Dengeli ve daha küçük modlar görünümü korur, ancak metin seçimini, aramayı, bağlantıları, formları, notları, katmanları ve erişilebilirlik yapısını kaldırır.",
      extractPages: "Sayfaları çıkar",
      splitDocument: "Belgeyi böl",
      pageSelection: "Sayfalar",
      pageSelectionHint: "Örnek: 1, 3-5",
      everyPages: "Her N sayfa",
      customRanges: "Özel aralıklar",
      pagesPerFile: "Sayfa başına PDF",
      customRangesHint: "Virgülle ayrılmış her aralık bir PDF olur.",
      selectAll: "Tümünü seç",
      clearSelection: "Seçimi temizle",
      outputFormat: "Görüntü formatı",
      resolution: "Çözünürlük",
      quality: "JPG kalite",
      pageSize: "Sayfa boyutu",
      fitImage: "Görüntüyü sığdır",
      orientation: "Yönlendirme",
      automatic: "Otomatik",
      portrait: "Dikey",
      landscape: "Yatay",
      margin: "Kenar boşluğu",
      noMargin: "Kenar boşluğu yok",
      smallMargin: "Küçük",
      largeMargin: "Büyük",
      resultFiles: "Sonuç dosyaları",
      noReduction:
        "Sonuç daha küçük değil. Başka bir ön ayarı deneyin veya orijinali koruyun.",
      fileTooLarge: "Seçilen dosyalar 200 MiB yerel işleme sınırını aşıyor.",
      tooManyPages: "Bu PDF, 500 sayfa kopya sınırını aşıyor.",
      tooManyRasterPages:
        "En fazla 120 sayfa seçin ve işlenen çıktının 240 megapikselin altında olmasını sağlayın.",
      invalidPdf: "Geçerli, okunabilir bir PDF dosyası seçin.",
      encryptedPdf:
        "Şifre korumalı PDF dosyaları henüz desteklenmiyor. Önce dosyanın kilidini açın ve tekrar deneyin.",
      invalidImage:
        "Bir resim okunamadı. Geçerli bir JPG, PNG veya WebP dosyası deneyin.",
      unsupportedImage: "JPG, PNG veya WebP resimleri seçin.",
      minimumMergeFiles: "Birleştirmek için en az iki PDF seçin.",
      emptySelection: "En az bir sayfa seçin.",
      invalidRange:
        "Sayfa ifadesini kontrol edin. 1, 3-5 gibi değerler kullanın.",
      rangeOutOfBounds:
        "Seçilen bir sayfa, bu belgenin sayfa sayısının dışında.",
      reversedRange: "Bir sayfa aralığı, başladığı yerden önce bitmemelidir.",
      renderFailed:
        "Bir sayfa işlenemedi. Daha küçük bir aralık veya daha düşük çözünürlük deneyin.",
      workerFailed:
        "PDF bu tarayıcıda işlenemedi. Dosyayı kontrol edin ve tekrar deneyin.",
      jpg: "JPG",
      png: "PNG",
      a4: "A4",
      letter: "Letter",
      dpi96: "96 DPI",
      dpi144: "144 DPI",
      dpi200: "200 DPI",
    },
    guideTitle: "{title} nasıl kullanılır",
    safetyTitle: "Dosyalar bu tarayıcıda kalır",
    safetyBody:
      "Seçilen dosyalar ve sonuçlar yalnızca bu tarayıcı sekmesinde işlenir. Yüklenmez, saklanmaz, bir URL'ye eklenmez veya üçüncü bir tarafa gönderilmez.",
    privacyQuestion: "Dosyalarım yükleniyor mu?",
    privacyAnswer:
      "Hayır. Dosya okuma, PDF işleme, render ve ZIP oluşturma işlemleri yerel olarak bu tarayıcı sekmesinde gerçekleşir.",
    limitQuestion: "Neden sayfa ve dosya sınırları var?",
    limitAnswer:
      "PDF render işlem, piksel başına birkaç bayt bellek kullanabilir. Bu sınırlamalar, büyük işlerin donmasını veya tarayıcı sekmesini kapatmasını engeller.",
    pages: {
      "compress-pdf": {
        title: "Sıkıştır PDF",
        description:
          "Bir PDF dosyasını küçültün ve belge özelliklerinin korunup korunmayacağını seçin.",
        guide:
          "Bir PDF ve sıkıştırma düzeyi seçip sonucu indirin. Seçilebilir metin ve bağlantılar önemliyse Belgeyi koru seçeneğini kullanın.",
        faqQuestion: "Sıkıştırma metin ve bağlantıları seçebilir mi koruyacak?",
        faqAnswer:
          "Preserve belgesi sayfa içeriğini korur. Dengeli ve daha küçük modlar sayfaları görse dönüştürür, böylece seçim, arama, bağlantılar, formlar, açıklamalar, katmanlar ve erişilebilirlik yapısı kaldırılır.",
        searchTerms: [
          "sıkıştırma PDF",
          "PDF boyutunu küçült",
          "PDF sıkıştırıcı",
        ],
      },
      "merge-pdf": {
        title: "PDF birleştir",
        description:
          "Birden fazla PDF dosyasını seçtiğiniz sırayla tek dosyada birleştirin.",
        guide:
          "En az iki PDF ekleyin, istediğiniz sıraya koyun ve birleştirilen dosyayı indirin.",
        faqQuestion: "Bir PDF içindeki sayfa sırasını değiştirebilir miyim?",
        faqAnswer:
          "Bu ilk sürüm tüm dosyaları sıralar. Bireysel sayfalar farklı bir sıraya ihtiyaç duyduğunda önce kaynak PDF dosyasını bölün veya yeniden düzenleyin.",
        searchTerms: ["PDF birleştir", "PDFleri birleştir", "PDF birleştirme"],
      },
      "split-pdf": {
        title: "PDFi böl",
        description:
          "İstediğiniz sayfaları çıkarın veya bir PDF’yi birden fazla dosyaya bölün.",
        guide:
          "Bir PDF seçin; sayfaları çıkarın veya sayfa sayısına ya da aralıklara göre bölün. Birden fazla sonuç ZIP olarak indirilir.",
        faqQuestion: "Bölme sayfa kalitesini düşürür mü?",
        faqAnswer:
          "Bölme sırasında rasterleştirme kullanılmaz. Mevcut PDF sayfaları yeni dosyalara kopyalanır, ancak gelişmiş belge genel özellikleri aktarılmayabilir.",
        searchTerms: ["PDFi böl", "PDF sayfalarını çıkar", "PDF bölücü"],
      },
      "pdf-to-image": {
        title: "PDF'yi Görüntüye çevir",
        description:
          "Seçili PDF sayfalarını JPG veya PNG görüntülerine dönüştürün.",
        guide:
          "Bir PDF ile istediğiniz sayfaları, görüntü biçimini ve çözünürlüğü seçin. Birden fazla sayfa ZIP olarak indirilir.",
        faqQuestion: "JPG mi yoksa PNG mi seçmeliyim?",
        faqAnswer:
          "JPG genellikle fotoğraflar ve taramalar için daha küçüktür. PNG kayıpsızdır ve genellikle diyagramlar, keskin metin veya şeffaflık için daha iyidir, ancak çok daha büyük olabilir.",
        searchTerms: [
          "PDF'yi görüntüye çevir",
          "PDF'yi JPG'ye dönüştür",
          "PDF'yi PNG'ye dönüştür",
        ],
      },
      "image-to-pdf": {
        title: "Görüntüyü PDF'ye dönüştür",
        description:
          "JPG, PNG veya WebP görüntülerini seçtiğiniz sırayla tek bir PDF’de birleştirin.",
        guide:
          "Görüntüleri ekleyip sıralayın, sayfa düzenini seçin ve PDF’yi oluşturup indirin.",
        faqQuestion: "Görüntülerim kırpılıyor ya da büyütülüyor mu?",
        faqAnswer:
          "Hayır. Görüntüler merkezlenir ve yalnızca gerektiğinde küçültülür. Sığdırma modu, PDF sayfası için her görüntünün kendi oranlarını kullanır.",
        searchTerms: ["görüntüyü PDF'ye dönüştür", "JPG to PDF", "PNG to PDF"],
      },
    },
  },
} as const;
