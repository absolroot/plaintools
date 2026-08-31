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
          "Reduce un PDF localmente con una opción que preserva el documento o ajusta las preconfiguraciones de calidad de imagen.",
        guide:
          "Elige un PDF, compara las tres preconfiguraciones y comprime. Preservar documento mantiene el contenido seleccionable pero puede ahorrar poco; las otras preconfiguraciones reconstruyen cada página como imagen para reducciones mayores en archivos escaneados o con muchas imágenes.",
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
          "Ordena varios archivos PDF y combina sus páginas en un solo PDF en tu navegador.",
        guide:
          "Agrega dos o más PDF, arrástralos para ordenarlos o usa los botones de mover, luego combínalos. La salida sigue el orden de archivos mostrado en la lista.",
        faqQuestion: "¿Puedo cambiar el orden de las páginas dentro de un PDF?",
        faqAnswer:
          "Esta primera versión ordena archivos completos. Divide o reorganiza el PDF de origen primero cuando las páginas individuales necesiten un orden diferente.",
        searchTerms: ["combinar PDF", "combinar PDFs", "fusión de PDF"],
      },
      "split-pdf": {
        title: "Dividir PDF",
        description:
          "Extraer páginas seleccionadas en un solo PDF o dividir un PDF en archivos separados por tamaño o rangos personalizados.",
        guide:
          "Elija Extraer páginas para un nuevo PDF, o Dividir documento para varios resultados. Use una expresión de páginas como 1, 3-5; múltiples resultados se agrupan en un solo ZIP.",
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
          "Renderizar páginas seleccionadas de PDF como imágenes JPG o PNG con controles prácticos de resolución y calidad.",
        guide:
          "Elija un PDF, seleccione páginas, formato y resolución, luego convierta. Una página se descarga directamente; varias páginas se recopilan en un ZIP con nombres de archivo numerados.",
        faqQuestion: "¿Debería elegir JPG o PNG?",
        faqAnswer:
          "JPG suele ser más pequeño para fotos y escaneos. PNG es sin pérdida y a menudo mejor para diagramas, texto nítido o transparencia, pero puede ser mucho más grande.",
        searchTerms: ["PDF a imagen", "PDF a JPG", "PDF a PNG"],
      },
      "image-to-pdf": {
        title: "Imagen a PDF",
        description:
          "Organiza imágenes JPG, PNG o WebP y colócalas en un solo PDF con controles de tamaño de página, orientación y márgenes.",
        guide:
          "Agrega imágenes, arrástralas o muévelas en orden, luego elige ajustar, A4 o páginas Letter. Las páginas fijas reducen el tamaño de las imágenes para que quepan sin recortarlas ni ampliarlas.",
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
          "Reduzieren Sie ein PDF lokal mit einer dokumenterhaltenden Option oder klar abgestuften Bildqualitätsvorgaben.",
        guide:
          "Wählen Sie ein PDF, vergleichen Sie die drei Vorgaben und komprimieren Sie. Dokument beibehalten erhält auswählbare Inhalte, kann aber wenig einsparen; die anderen Vorgaben erstellen jede Seite als Bild neu für größere Reduzierungen bei gescannten oder bildlastigen Dateien.",
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
          "Ordne mehrere PDF Dateien und kombiniere ihre Seiten in einem PDF in deinem Browser.",
        guide:
          "Füge zwei oder mehr PDFs hinzu, ziehe sie in die gewünschte Reihenfolge oder benutze die Schaltflächen zum Verschieben, dann zusammenführen. Die Ausgabe folgt der in der Liste gezeigten Dateireihenfolge.",
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
          "Ausgewählte Seiten in eine PDF extrahieren oder eine PDF nach Größe oder benutzerdefinierten Bereichen in separate Dateien aufteilen.",
        guide:
          "Wählen Sie Seiten extrahieren für eine neue PDF oder Dokument teilen für mehrere Ausgaben. Verwenden Sie einen Seitenausdruck wie 1, 3-5; mehrere Ergebnisse werden in eine ZIP gebündelt.",
        faqQuestion: "Führt das Teilen zu Qualitätsverlusten bei den Seiten?",
        faqAnswer:
          "Für das Teilen wird keine Rasterisierung verwendet. Bestehende PDF-Seiten werden in neue Dateien kopiert, obwohl erweiterte dokumentweite Funktionen möglicherweise nicht übernommen werden.",
        searchTerms: ["PDF teilen", "PDF Seiten extrahieren", "PDF-Teiler"],
      },
      "pdf-to-image": {
        title: "PDF zu Bild",
        description:
          "Ausgewählte PDF-Seiten als JPG- oder PNG-Bilder mit praktischer Auflösung und Qualitätskontrolle rendern.",
        guide:
          "Wählen Sie ein PDF, wählen Sie Seiten, Format und Auflösung, und konvertieren Sie dann. Eine Seite wird direkt heruntergeladen; mehrere Seiten werden in einer ZIP mit nummerierten Dateinamen gesammelt.",
        faqQuestion: "Soll ich JPG oder PNG wählen?",
        faqAnswer:
          "JPG ist normalerweise kleiner für Fotos und Scans. PNG ist verlustfrei und oft besser für Diagramme, scharfen Text oder Transparenz, kann aber deutlich größer sein.",
        searchTerms: ["PDF zu Bild", "PDF zu JPG", "PDF zu PNG"],
      },
      "image-to-pdf": {
        title: "Bild zu PDF",
        description:
          "Ordne JPG-, PNG- oder WebP-Bilder an und füge sie zu einer PDF mit Seitenformat-, Ausrichtungs- und Randkontrollen zusammen.",
        guide:
          "Füge Bilder hinzu, ziehe oder verschiebe sie in die gewünschte Reihenfolge und wähle dann anpassen, A4 oder Letter Seiten. Feste Seiten skalieren Bilder herunter, um sie einzupassen, ohne sie zu beschneiden oder zu vergrößern.",
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
          "ドキュメント保持オプションまたは分かりやすい画質プリセットで、PDF をローカルに軽量化します。",
        guide:
          "PDF を選択し、3つのプリセットを比較して圧縮します。ドキュメントを保持は選択可能な内容を保持しますが、節約量は少ない場合があります。他のプリセットは各ページを画像として再構築するため、スキャンしたファイルや画像が多いファイルで大幅に縮小できます。",
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
        description:
          "複数の PDF ファイルを順序付けして、ブラウザで 1 つの PDF にページをまとめます。",
        guide:
          "2 つ以上の PDF を追加し、順序をドラッグするか、移動ボタンを使用してから結合します。出力はリストに表示されているファイルの順序に従います。",
        faqQuestion: "1 つの PDF 内でページの順序を変更できますか？",
        faqAnswer:
          "この最初のバージョンでは、ファイル全体の順序を付けます。個別のページで異なる順序が必要な場合は、最初にソース PDF を分割または並べ替えてください。",
        searchTerms: ["PDF を結合", "PDFを結合", "PDFの統合"],
      },
      "split-pdf": {
        title: "PDFを分割",
        description:
          "選択したページを1つのPDFに抽出するか、PDFをサイズやカスタム範囲ごとに別々のファイルに分割します。",
        guide:
          "1つの新しいPDF用には「ページを抽出」を選択し、複数の出力が必要な場合は「ドキュメントの分割」を選択します。ページ式（例：1, 3-5）を使用してください。複数の結果は1つのZIPにまとめられます。",
        faqQuestion: "分割するとページの品質は低下しますか？",
        faqAnswer:
          "分割ではラスタライズは使用されません。既存のPDFページは新しいファイルにコピーされます。ただし、高度なドキュメント全体の機能は継承されない場合があります。",
        searchTerms: ["PDFを分割", "PDF のページを抽出", "PDF 分割ツール"],
      },
      "pdf-to-image": {
        title: "PDF を画像に変換",
        description:
          "選択した PDF のページを、実用的な解像度と画質で JPG または PNG 画像としてレンダリングします。",
        guide:
          "PDF を選択し、ページ、フォーマット、解像度を選んでから変換します。1ページの場合は直接ダウンロードされます。複数ページの場合は、番号付きファイル名で ZIP にまとめられます。",
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
          "JPG、PNG、または WebP 画像を整理して、ページサイズ、向き、余白の設定ができる 1 つの PDF に配置します。",
        guide:
          "画像を追加し、ドラッグまたは移動して順番を決め、フィット、A4、または Letter ページを選択します。固定ページは、切り取りや拡大をせずに収まるように画像を縮小します。",
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
          "Réduire un PDF localement avec une option de préservation du document ou nettoyer les paramètres de qualité d'image.",
        guide:
          "Choisissez un PDF, comparez les trois préréglages et compressez. Préserver le document conserve le contenu sélectionnable mais peut peu économiser ; les autres préréglages reconstruisent chaque page comme une image pour des réductions plus importantes sur les fichiers scannés ou riches en images.",
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
          "Organisez plusieurs fichiers PDF et combinez leurs pages en un seul PDF dans votre navigateur.",
        guide:
          "Ajoutez deux PDF ou plus, faites-les glisser pour les ordonner ou utilisez les boutons de déplacement, puis fusionnez. Le résultat suit l'ordre des fichiers affiché dans la liste.",
        faqQuestion:
          "Puis-je changer l'ordre des pages à l'intérieur d'un PDF ?",
        faqAnswer:
          "Cette première version organise les fichiers entiers. Séparez ou réorganisez d'abord le PDF source lorsque des pages individuelles nécessitent un ordre différent.",
        searchTerms: ["fusionner PDF", "combiner des PDF", "fusion de PDF"],
      },
      "split-pdf": {
        title: "Diviser PDF",
        description:
          "Extraire les pages sélectionnées dans un PDF ou diviser un PDF en fichiers séparés par taille ou par plages personnalisées.",
        guide:
          "Choisissez Extraire des pages pour un nouveau PDF, ou Diviser le document pour plusieurs résultats. Utilisez une expression de pages telle que 1, 3-5 ; plusieurs résultats sont regroupés dans un ZIP.",
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
          "Rendre les pages sélectionnées de PDF en images JPG ou PNG avec des contrôles pratiques de résolution et de qualité.",
        guide:
          "Choisissez un PDF, sélectionnez les pages, le format et la résolution, puis convertissez. Une page est téléchargée directement ; plusieurs pages sont regroupées dans un ZIP avec des noms de fichiers numérotés.",
        faqQuestion: "Dois-je choisir JPG ou PNG ?",
        faqAnswer:
          "JPG est généralement plus petit pour les photos et les scans. PNG est sans perte et souvent meilleur pour les diagrammes, le texte net ou la transparence, mais peut être beaucoup plus volumineux.",
        searchTerms: ["PDF en image", "PDF en JPG", "PDF en PNG"],
      },
      "image-to-pdf": {
        title: "Image en PDF",
        description:
          "Organisez les images JPG, PNG ou WebP et placez-les dans un seul PDF avec des contrôles de taille de page, d'orientation et de marge.",
        guide:
          "Ajoutez des images, faites-les glisser ou déplacez-les dans l'ordre, puis choisissez ajuster, A4 ou Letter pour les pages. Les pages fixes réduisent les images pour les faire tenir sans les recadrer ni les agrandir.",
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
          "Reduza um PDF localmente com uma opção que preserve o documento ou pressione as configurações predefinidas de qualidade de imagem.",
        guide:
          "Escolha um PDF, compare as três predefinições e comprima. Preservar documento mantém o conteúdo selecionável, mas pode salvar pouco; as outras predefinições recriam cada página como uma imagem para reduções maiores em arquivos digitalizados ou com muitas imagens.",
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
          "Organize vários arquivos PDF e combine suas páginas em um PDF no seu navegador.",
        guide:
          "Adicione dois ou mais PDFs, arraste-os para ordenar ou use os botões de mover, depois mescle. O resultado segue a ordem de arquivos mostrada na lista.",
        faqQuestion: "Posso mudar a ordem das páginas dentro de um PDF?",
        faqAnswer:
          "Esta primeira versão organiza arquivos completos. Divida ou reorganize o PDF de origem primeiro quando páginas individuais precisarem de uma ordem diferente.",
        searchTerms: ["mesclar PDF", "combinar PDFs", "fusão de PDF"],
      },
      "split-pdf": {
        title: "Dividir PDF",
        description:
          "Extrair páginas selecionadas em um PDF ou dividir um PDF em arquivos separados por tamanho ou intervalos personalizados.",
        guide:
          "Escolha Extrair páginas para um novo PDF, ou Dividir documento para várias saídas. Use uma expressão de página como 1, 3-5; múltiplos resultados são agrupados em um único ZIP.",
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
          "Renderizar páginas selecionadas do PDF como imagens JPG ou PNG com controles práticos de resolução e qualidade.",
        guide:
          "Escolha um PDF, selecione páginas, formato e resolução, e então converta. Uma página é baixada diretamente; várias páginas são coletadas em um ZIP com nomes de arquivos numerados.",
        faqQuestion: "Devo escolher JPG ou PNG?",
        faqAnswer:
          "JPG geralmente é menor para fotos e digitalizações. PNG é sem perda e muitas vezes melhor para diagramas, texto nítido ou transparência, mas pode ser muito maior.",
        searchTerms: ["PDF para imagem", "PDF para JPG", "PDF para PNG"],
      },
      "image-to-pdf": {
        title: "Imagem para PDF",
        description:
          "Organize imagens JPG, PNG ou WebP e coloque-as em um único PDF com controle de tamanho de página, orientação e margens.",
        guide:
          "Adicione imagens, arraste ou mova-as para ordenar, depois escolha ajustar, A4 ou Letter. Páginas fixas reduzem o tamanho das imagens para caber, sem cortar ou ampliar.",
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
          "Riduci un PDF localmente con un'opzione che preserva il documento o usa preset di qualità dell'immagine minore.",
        guide:
          "Scegli un PDF, confronta i tre preset e comprimi. 'Preserva documento' mantiene il contenuto selezionabile ma potrebbe salvare poco; gli altri preset ricostruiscono ogni pagina come immagine per riduzioni maggiori su file scansionati o ricchi di immagini.",
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
          "Ordina diversi file PDF e combina le loro pagine in un unico PDF nel tuo browser.",
        guide:
          "Aggiungi due o più PDF, trascinali nell'ordine desiderato o usa i pulsanti di spostamento, poi unisci. L'output segue l'ordine dei file mostrato nella lista.",
        faqQuestion:
          "Posso cambiare l'ordine delle pagine all'interno di un PDF?",
        faqAnswer:
          "Questa prima versione ordina file interi. Dividi o riorganizza prima il PDF sorgente quando le singole pagine devono avere un ordine diverso.",
        searchTerms: ["unisci PDF", "combina PDF", "fusione di PDF"],
      },
      "split-pdf": {
        title: "Dividi PDF",
        description:
          "Estrai le pagine selezionate in un unico PDF o dividi un PDF in file separati in base alla dimensione o a intervalli personalizzati.",
        guide:
          "Scegli Estrai pagine per un nuovo PDF, o Dividi documento per più output. Usa un'espressione per le pagine come 1, 3-5; i risultati multipli vengono raggruppati in un unico ZIP.",
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
          "Rendi le pagine selezionate di PDF come immagini JPG o PNG con controllo pratico di risoluzione e qualità.",
        guide:
          "Scegli un PDF, seleziona pagine, formato e risoluzione, quindi converti. Una pagina viene scaricata direttamente; più pagine vengono raccolte in un ZIP con nomi di file numerati.",
        faqQuestion: "Dovrei scegliere JPG o PNG?",
        faqAnswer:
          "JPG è di solito più piccolo per foto e scansioni. PNG è senza perdita e spesso migliore per diagrammi, testo nitido o trasparenza, ma può essere molto più grande.",
        searchTerms: ["PDF in immagine", "PDF in JPG", "PDF in PNG"],
      },
      "image-to-pdf": {
        title: "Immagine in PDF",
        description:
          "Organizza immagini JPG, PNG o WebP e inseriscile in un unico PDF con controllo delle dimensioni delle pagine, dell'orientamento e dei margini.",
        guide:
          "Aggiungi immagini, trascinale o spostale nell'ordine desiderato, quindi scegli adatta, A4 o Letter come pagine. Le pagine fisse ridimensionano le immagini per adattarle senza ritagliarle o ingrandirle.",
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
          "Verminder een PDF lokaal met een document-behoudende optie of verwijder vooraf ingestelde beeldkwaliteit.",
        guide:
          "Kies een PDF, vergelijk de drie vooraf ingestelde opties, en comprimeer. Document behouden houdt selecteerbare inhoud, maar kan weinig besparen; de andere vooraf ingestelde opties bouwen elke pagina opnieuw als afbeelding voor grotere reducties bij gescande of beeldrijke bestanden.",
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
          "Rangschik meerdere PDF bestanden en combineer hun pagina's tot één PDF in je browser.",
        guide:
          "Voeg twee of meer PDFs toe, sleep ze in de gewenste volgorde of gebruik de verplaatsknoppen, en voeg ze dan samen. De uitvoer volgt de bestandsvolgorde zoals weergegeven in de lijst.",
        faqQuestion: "Kan ik de pagina volgorde binnen één PDF veranderen?",
        faqAnswer:
          "Deze eerste versie rangschikt hele bestanden. Splits of herschik de bron PDF eerst als individuele pagina's een andere volgorde nodig hebben.",
        searchTerms: ["voeg PDF samen", "combineer PDF's", "PDF fusie"],
      },
      "split-pdf": {
        title: "Split PDF",
        description:
          "Selecteer pagina's om in één PDF te extraheren of verdeel een PDF in afzonderlijke bestanden op grootte of aangepaste bereiken.",
        guide:
          "Kies Pagina's extraheren voor één nieuwe PDF, of Document splitsen voor meerdere uitvoerbestanden. Gebruik een pagina-expressie zoals 1, 3-5; meerdere resultaten worden gebundeld in één ZIP.",
        faqQuestion: "Vermindert splitsen de pagina kwaliteit?",
        faqAnswer:
          "Voor splitsen wordt geen rasterisatie gebruikt. Bestaande PDF-pagina's worden in nieuwe bestanden gekopieerd, hoewel geavanceerde document-brede functies mogelijk niet worden overgenomen.",
        searchTerms: ["split PDF", "extraheer PDF pagina's", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF naar Afbeelding",
        description:
          "Geef geselecteerde PDF pagina's weer als JPG of PNG afbeeldingen met praktische resolutie- en kwaliteitsinstellingen.",
        guide:
          "Kies een PDF, selecteer pagina's, formaat en resolutie en converteer vervolgens. Eén pagina wordt direct gedownload; meerdere pagina's worden verzameld in een ZIP met genummerde bestandsnamen.",
        faqQuestion: "Moet ik JPG of PNG kiezen?",
        faqAnswer:
          "JPG is meestal kleiner voor foto's en scans. PNG is verliesvrij en vaak beter voor diagrammen, scherpe tekst of transparantie, maar kan veel groter zijn.",
        searchTerms: ["PDF naar afbeelding", "PDF naar JPG", "PDF naar PNG"],
      },
      "image-to-pdf": {
        title: "Afbeelding naar PDF",
        description:
          "Rangschik JPG-, PNG- of WebP-afbeeldingen en plaats ze in één PDF met beheersing van paginagrootte, oriëntatie en marges.",
        guide:
          "Voeg afbeeldingen toe, sleep of verplaats ze in de gewenste volgorde, en kies vervolgens fit, A4 of Letter pagina's. Vaste pagina's schalen afbeeldingen omlaag om ze te laten passen zonder bij te snijden of te vergroten.",
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
          "Minska en PDF lokalt med ett dokumentbevarande alternativ eller förinställningar för tydlig bildkvalitet.",
        guide:
          "Välj en PDF, jämför de tre förinställningarna och komprimera. Bevara dokumentet behåller valbart innehåll men kan spara lite; de andra förinställningarna bygger om varje sida som en bild för större reduktioner på skannade eller bildtunga filer.",
        faqQuestion: "Kommer komprimering att behålla valbar text och länkar?",
        faqAnswer:
          "Bevara-dokumentet behåller sidinnehållet. Balanserade och mindre läge förvandlar sidor till bilder, så urval, sökning, länkar, formulär, anteckningar, lager och tillgänglighetsstruktur tas bort.",
        searchTerms: ["komprimera PDF", "minska PDF storlek", "PDF kompressor"],
      },
      "merge-pdf": {
        title: "Slå ihop PDF",
        description:
          "Ordna flera PDF filer och kombinera deras sidor till en PDF i din webbläsare.",
        guide:
          "Lägg till två eller fler PDFs, dra dem i ordning eller använd flyttaknappen, och slå sedan ihop. Resultatet följer filordningen som visas i listan.",
        faqQuestion: "Kan jag ändra sidordningen i en PDF?",
        faqAnswer:
          "Den första versionen ordnar hela filer. Dela eller omarrangera käll-PDF först när enskilda sidor behöver en annan ordning.",
        searchTerms: ["slå ihop PDF", "kombinera PDFs", "PDF sammanslagning"],
      },
      "split-pdf": {
        title: "Dela PDF",
        description:
          "Extrahera valda sidor till en PDF eller dela upp en PDF i separata filer efter storlek eller egna intervall.",
        guide:
          "Välj Extrahera sidor för en ny PDF, eller Dela dokument för flera utdata. Använd ett siduttryck som 1, 3-5; flera resultat packas tillsammans i en ZIP.",
        faqQuestion: "Minskar delningen sidkvaliteten?",
        faqAnswer:
          "Ingen rasterisering används vid delning. Befintliga PDF-sidor kopieras till nya filer, även om avancerade dokumentomfattande funktioner kanske inte följs med.",
        searchTerms: ["dela PDF", "extrahera PDF sidor", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF till bild",
        description:
          "Rendera valda PDF sidor som JPG eller PNG bilder med praktiska upplösnings- och kvalitetsjusteringar.",
        guide:
          "Välj en PDF, välj sidor, format och upplösning, och konvertera sedan. En sida laddas ner direkt; flera sidor samlas i en ZIP med numrerade filnamn.",
        faqQuestion: "Ska jag välja JPG eller PNG?",
        faqAnswer:
          "JPG är vanligtvis mindre för foton och skanningar. PNG är förlustfritt och ofta bättre för diagram, skarp text eller transparens, men kan vara mycket större.",
        searchTerms: ["PDF till bild", "PDF till JPG", "PDF till PNG"],
      },
      "image-to-pdf": {
        title: "Bild till PDF",
        description:
          "Ordna JPG, PNG eller WebP bilder och placera dem i en PDF med kontroll över sidstorlek, orientering och marginaler.",
        guide:
          "Lägg till bilder, dra eller flytta dem i ordning, och välj sedan passa, A4 eller Letter sidor. Fast sida skalar ner bilder för att passa utan att beskära eller förstora dem.",
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
          "Snižte velikost PDF lokálně pomocí možnosti zachování dokumentu nebo vymazáním přednastavených kvalit obrázků.",
        guide:
          "Vyberte PDF, porovnejte tři přednastavení a komprimujte. Zachování dokumentu uchovává vybíratelný obsah, ale může ušetřit málo; ostatní přednastavení převedou každou stránku na obrázek pro větší zmenšení u skenovaných nebo obrázky bohatých souborů.",
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
          "Seřaďte několik souborů PDF a spojte jejich stránky do jednoho PDF ve svém prohlížeči.",
        guide:
          "Přidejte dva nebo více PDF, přetáhněte je do požadovaného pořadí nebo použijte tlačítka pro přesun, a poté sloučte. Výstup odpovídá pořadí souborů zobrazenému v seznamu.",
        faqQuestion: "Mohu změnit pořadí stránek uvnitř jednoho PDF?",
        faqAnswer:
          "Tato první verze řadí celé soubory. Nejprve rozdělte nebo přeuspořádejte zdrojové PDF, pokud mají mít jednotlivé stránky jiné pořadí.",
        searchTerms: ["sloučit PDF", "sloučit PDFy", "sloučení PDF"],
      },
      "split-pdf": {
        title: "Rozdělit PDF",
        description:
          "Extrahujte vybrané stránky do jednoho PDF nebo rozdělte PDF do samostatných souborů podle velikosti nebo vlastních rozsahů.",
        guide:
          "Zvolte Extrahovat stránky pro jeden nový PDF nebo Rozdělit dokument pro několik výstupů. Použijte výraz stránek, například 1, 3-5; více výsledků je spojeno do jednoho ZIP.",
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
        description:
          "Vykreslete vybrané stránky PDF jako obrázky JPG nebo PNG s praktickým nastavením rozlišení a kvality.",
        guide:
          "Vyberte PDF, stránky, formát a rozlišení a poté převádějte. Jedna stránka se stáhne přímo; několik stránek je shromažďováno do ZIP se číslovanými názvy souborů.",
        faqQuestion: "Mám zvolit JPG nebo PNG?",
        faqAnswer:
          "JPG je obvykle menší u fotografií a skenů. PNG je bezztrátový a často lepší pro diagramy, ostrý text nebo průhlednost, ale může být mnohem větší.",
        searchTerms: ["PDF na obraz", "PDF do JPG", "PDF do PNG"],
      },
      "image-to-pdf": {
        title: "Obrázek do PDF",
        description:
          "Uspořádejte JPG, PNG nebo WebP obrázky a vložte je do jednoho PDF s možnostmi nastavení velikosti stránky, orientace a okrajů.",
        guide:
          "Přidejte obrázky, přetahujte je nebo měňte jejich pořadí, poté vyberte přizpůsobení, A4 nebo Letter stránky. Fixní stránky zmenší obrázky tak, aby se vešly, aniž by se ořezávaly nebo zvětšovaly.",
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
          "Zmniejsz rozmiar PDF lokalnie, używając opcji zachowującej dokument lub usuń ustawienia jakości obrazu.",
        guide:
          "Wybierz PDF, porównaj trzy ustawienia wstępne i skompresuj. Zachowaj dokument utrzymuje wybieralną zawartość, ale może zaoszczędzić niewiele miejsca; pozostałe ustawienia wstępne przekształcają każdą stronę w obraz, co pozwala na większe zmniejszenie rozmiaru w przypadku plików skanowanych lub bogatych w obrazy.",
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
        description:
          "Zamów kilka plików PDF i połącz ich strony w jeden PDF w przeglądarce.",
        guide:
          "Dodaj dwa lub więcej PDF, przeciągnij je w odpowiedniej kolejności lub użyj przycisków przesuwania, a następnie połącz. Wynik będzie zgodny z kolejnością plików pokazanych na liście.",
        faqQuestion: "Czy mogę zmienić kolejność stron w jednym PDF?",
        faqAnswer:
          "Ta pierwsza wersja porządkuje całe pliki. Najpierw podziel lub przemieść źródłowy PDF, jeśli poszczególne strony muszą mieć inną kolejność.",
        searchTerms: ["połącz PDF", "łącz PDFy", "fuzja PDF"],
      },
      "split-pdf": {
        title: "Podziel PDF",
        description:
          "Wyodrębnij wybrane strony do jednego PDF lub podziel PDF na osobne pliki według rozmiaru lub niestandardowych zakresów.",
        guide:
          "Wybierz Wyodrębnij strony dla jednego nowego PDF, lub Podziel dokument dla kilku wyników. Użyj wyrażenia stronic, np. 1, 3-5; wiele wyników jest pakowane do jednego ZIP.",
        faqQuestion: "Czy dzielenie zmniejsza jakość stron?",
        faqAnswer:
          "Do dzielenia nie używa się rasteryzacji. Istniejące strony PDF są kopiowane do nowych plików, choć zaawansowane funkcje dokumentu mogą nie zostać zachowane.",
        searchTerms: ["podziel PDF", "wyodrębnij strony PDF", "dzielnik PDF"],
      },
      "pdf-to-image": {
        title: "PDF na obraz",
        description:
          "Renderuj wybrane strony PDF jako obrazy JPG lub PNG z praktyczną kontrolą rozdzielczości i jakości.",
        guide:
          "Wybierz PDF, zaznacz strony, format i rozdzielczość, a następnie konwertuj. Jedna strona pobierana jest bezpośrednio; kilka stron zbieranych jest do pliku ZIP z numerowanymi nazwami.",
        faqQuestion: "Czy powinienem wybrać JPG czy PNG?",
        faqAnswer:
          "JPG jest zazwyczaj mniejszy dla zdjęć i skanów. PNG jest bezstratny i często lepszy dla diagramów, ostrego tekstu lub przezroczystości, ale może być znacznie większy.",
        searchTerms: ["PDF na obraz", "PDF JPG", "PDF PNG"],
      },
      "image-to-pdf": {
        title: "Obraz do PDF",
        description:
          "Ułóż JPG, PNG lub WebP obrazy i umieść je w jednym PDF z kontrolką rozmiaru strony, orientacji i marginesów.",
        guide:
          "Dodaj obrazy, przeciągnij lub przesuń je w kolejności, a następnie wybierz dopasowanie, A4 lub Letter strony. Strony stałe skalują obrazy do dopasowania bez ich przycinania czy powiększania.",
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
          "Reducer en PDF lokalt med en dokument-bevarende mulighed eller ryd billedkvalitetspresets.",
        guide:
          "Vælg en PDF, sammenlign de tre presets, og komprimer. Bevar dokument bevarer valgt indhold, men kan kun give lidt besparelse; de andre presets bygger hver side som et billede for større reduktioner på scannede eller billede-tunge filer.",
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
          "Bestil flere PDF filer og kombiner deres sider til én PDF i din browser.",
        guide:
          "Tilføj to eller flere PDFs, træk dem i rækkefølge eller brug flyt-knapperne, og sammenflet derefter. Outputtet følger filrækkefølgen vist på listen.",
        faqQuestion: "Kan jeg ændre siderekkefølgen inde i én PDF?",
        faqAnswer:
          "Denne første version ordner hele filer. Del eller rearranger kildens PDF først, når individuelle sider skal have en anden rækkefølge.",
        searchTerms: ["sammenflet PDF", "kombiner PDFer", "PDF fusion"],
      },
      "split-pdf": {
        title: "Opdel PDF",
        description:
          "Udtræk valgte sider til én PDF eller del en PDF op i separate filer efter størrelse eller brugerdefinerede intervaller.",
        guide:
          "Vælg Udtræk sider for én ny PDF, eller Opdel dokument til flere output. Brug et sideudtryk såsom 1, 3-5; flere resultater samles i én ZIP.",
        faqQuestion: "Reducerer opdeling sidekvaliteten?",
        faqAnswer:
          "Der bruges ingen rasterisering ved opdeling. Eksisterende PDF-sider kopieres til nye filer, selvom avancerede funktioner på dokumentniveau muligvis ikke overføres.",
        searchTerms: ["opdel PDF", "udtræk PDF sider", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF til billede",
        description:
          "Gengiv valgte PDF sider som JPG eller PNG billeder med praktisk opløsning og kvalitetskontrol.",
        guide:
          "Vælg en PDF, vælg sider, format og opløsning, og konverter derefter. Én side downloades direkte; flere sider samles i en ZIP med nummererede filnavne.",
        faqQuestion: "Skal jeg vælge JPG eller PNG?",
        faqAnswer:
          "JPG er normalt mindre for fotos og scanninger. PNG er tabsfri og ofte bedre til diagrammer, skarp tekst eller gennemsigtighed, men kan være meget større.",
        searchTerms: ["PDF til billede", "PDF til JPG", "PDF til PNG"],
      },
      "image-to-pdf": {
        title: "Billede til PDF",
        description:
          "Arranger JPG, PNG eller WebP billeder og placer dem i én PDF med kontrol over sidestørrelse, orientering og margener.",
        guide:
          "Tilføj billeder, træk eller flyt dem i rækkefølge, og vælg derefter tilpas, A4 eller Letter sider. Fast side skalerer billeder ned for at passe uden at beskære eller forstørre dem.",
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
          "Reduser en PDF lokalt med et dokumentbevarende alternativ eller fjern bildekvalitetspresets.",
        guide:
          "Velg en PDF, sammenlign de tre presetsene, og komprimer. Bevar dokument beholder valgbart innhold, men kan gi liten besparelse; de andre presetsene bygger hver side på nytt som et bilde for større reduksjoner på skannede eller bilde-tunge filer.",
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
          "Bestill flere PDF-filer og kombiner sidene deres til én PDF i nettleseren din.",
        guide:
          "Legg til to eller flere PDF-er, dra dem i rekkefølge eller bruk flytteknappene, og slå dem deretter sammen. Output følger filrekkefølgen som vises i listen.",
        faqQuestion: "Kan jeg endre sideordren inne i en PDF?",
        faqAnswer:
          "Denne første versjonen ordner hele filer. Del eller omorganiser kildens PDF først når individuelle sider trenger en annen rekkefølge.",
        searchTerms: ["slå sammen PDF", "kombiner PDFer", "PDF sammenslåing"],
      },
      "split-pdf": {
        title: "Del PDF",
        description:
          "Ekstraher valgte sider til én PDF eller del en PDF i separate filer etter størrelse eller egendefinerte intervaller.",
        guide:
          "Velg Ekstraher sider for én ny PDF, eller Del dokument for flere utdata. Bruk et sideuttrykk som 1, 3-5; flere resultater pakkes i én ZIP.",
        faqQuestion: "Reduserer deling sidens kvalitet?",
        faqAnswer:
          "Ingen rasterisering brukes ved deling. Eksisterende PDF-sider kopieres til nye filer, selv om avanserte dokumentomfattende funksjoner kanskje ikke videreføres.",
        searchTerms: ["del PDF", "hent ut PDF sider", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF til bilde",
        description:
          "Gjengi valgte PDF sider som JPG eller PNG bilder med praktisk oppløsning og kvalitetskontroller.",
        guide:
          "Velg en PDF, velg sider, format og oppløsning, og konverter deretter. Én side lastes ned direkte; flere sider samles i en ZIP med nummererte filnavn.",
        faqQuestion: "Skal jeg velge JPG eller PNG?",
        faqAnswer:
          "JPG er vanligvis mindre for bilder og skanninger. PNG er tapsfri og ofte bedre for diagrammer, skarp tekst eller gjennomsiktighet, men kan være mye større.",
        searchTerms: ["PDF til bilde", "PDF til JPG", "PDF til PNG"],
      },
      "image-to-pdf": {
        title: "Bilde til PDF",
        description:
          "Ordne JPG, PNG eller WebP bilder og plasser dem i én PDF med kontroll over sidestørrelse, orientering og marger.",
        guide:
          "Legg til bilder, dra eller flytt dem i ønsket rekkefølge, og velg deretter tilpass, A4 eller Letter sider. Faste sider skalerer bilder ned for å passe uten å beskjære eller forstørre dem.",
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
          "قلل حجم PDF محليًا باستخدام خيار يحافظ على المستند أو إعدادات واضحة لجودة الصورة.",
        guide:
          "اختر PDF، وقارن بين الإعدادات الثلاثة، واضغط الملف. خيار الحفاظ على المستند يحتفظ بالمحتوى القابل للتحديد ولكنه قد يوفر القليل؛ الإعدادات الأخرى تعيد إنشاء كل صفحة كصورة لتحقيق تقليل أكبر للملفات الممسوحة ضوئيًا أو الثقيلة بالصور.",
        faqQuestion: "هل ستحتفظ عملية الضغط بالنصوص والروابط القابلة للاختيار؟",
        faqAnswer:
          "خيار الحفاظ على المستند يحتفظ بمحتوى الصفحة. الوضع المتوازن والوضع الأصغر يحول الصفحات إلى صور، لذا يتم إزالة التحديد، البحث، الروابط، النماذج، التعليقات، الطبقات، وبنية الوصول.",
        searchTerms: ["ضغط PDF", "تقليل حجم PDF", "ضاغط PDF"],
      },
      "merge-pdf": {
        title: "دمج PDF",
        description:
          "قم بترتيب عدة ملفات PDF ودمج صفحاتها في PDF واحد في متصفحك.",
        guide:
          "أضف اثنين أو أكثر من PDF، اسحبها لترتيبها أو استخدم أزرار التحريك، ثم دمج. الناتج يتبع ترتيب الملفات المعروض في القائمة.",
        faqQuestion: "هل يمكنني تغيير ترتيب الصفحات داخل PDF واحد؟",
        faqAnswer:
          "هذا الإصدار الأول يرتب الملفات بالكامل. قم بتقسيم أو إعادة ترتيب PDF المصدر أولاً عندما تحتاج الصفحات الفردية إلى ترتيب مختلف.",
        searchTerms: ["دمج PDF", "دمج PDFs", "دمج PDF"],
      },
      "split-pdf": {
        title: "تقسيم PDF",
        description:
          "استخراج الصفحات المحددة إلى PDF واحد أو تقسيم PDF إلى ملفات منفصلة حسب الحجم أو النطاقات المخصصة.",
        guide:
          "اختر استخراج الصفحات لإنشاء PDF جديد واحد، أو تقسيم المستند لعدة مخرجات. استخدم تعبير الصفحة مثل 1, 3-5؛ تُجمع النتائج المتعددة في ZIP واحد.",
        faqQuestion: "هل يقلل التقسيم من جودة الصفحات؟",
        faqAnswer:
          "لا يتم استخدام الترصيع (Rasterization) أثناء التقسيم. تُنسخ صفحات PDF الحالية إلى ملفات جديدة، على الرغم من أن الميزات المتقدمة على مستوى المستند قد لا تنتقل.",
        searchTerms: ["تقسيم PDF", "استخراج صفحات PDF", "قسم PDF"],
      },
      "pdf-to-image": {
        title: "تحويل PDF إلى صورة",
        description: "عرض صفحات PDF المختارة كصور JPG أو PNG بدقة وجودة عملية.",
        guide:
          "اختر PDF، وحدد الصفحات، التنسيق والدقة، ثم قم بالتحويل. يتم تحميل صفحة واحدة مباشرة؛ أما عدة صفحات فهي تُجمع في ZIP بأسماء ملفات مرقمة.",
        faqQuestion: "هل يجب أن أختار JPG أم PNG؟",
        faqAnswer:
          "عادةً ما يكون JPG أصغر للصور الفوتوغرافية أو المسح الضوئي. PNG بدون فقد، وغالبًا أفضل للرسوم البيانية، النصوص الحادة، أو الشفافية، لكنه قد يكون أكبر بكثير.",
        searchTerms: ["تحويل PDF إلى صورة", "PDF إلى JPG", "PDF إلى PNG"],
      },
      "image-to-pdf": {
        title: "صورة إلى PDF",
        description:
          "رتب صور JPG أو PNG أو WebP وضعها في PDF واحد مع التحكم بحجم الصفحة وتوجهها وهوامشها.",
        guide:
          "أضف الصور، واسحبها أو حركها بالترتيب، ثم اختر الملاءمة، A4، أو صفحات Letter. الصفحات الثابتة تقلل حجم الصور لتناسبها دون قص أو تكبير.",
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
        description:
          "使用保留文件功能或清除影像品質預設來在本地減少 PDF 的大小。",
        guide:
          "選擇一個 PDF，比較三種預設選項，然後壓縮。保留文件可保留可選取的內容，但可能減少有限；其他預設選項會將每頁重建為影像，以對掃描或含大量影像的檔案達到更大幅度的減少。",
        faqQuestion: "壓縮會保留可選取的文字和連結嗎？",
        faqAnswer:
          "保留文件會保留頁面內容。平衡模式和小尺寸模式會將頁面轉為影像，因此選取、搜尋、連結、表單、註解、圖層和可存取性結構都會被移除。",
        searchTerms: ["壓縮 PDF", "減少 PDF 大小", "PDF 壓縮器"],
      },
      "merge-pdf": {
        title: "合併 PDF",
        description:
          "在瀏覽器中對多個 PDF 文件進行排序並將其頁面合併成一個 PDF。",
        guide:
          "添加兩個或更多 PDF，拖動它們以排列順序或使用移動按鈕，然後合併。輸出將按照列表中顯示的文件順序。",
        faqQuestion: "我可以改變單個 PDF 中的頁面順序嗎？",
        faqAnswer:
          "此第一版本是對整個文件進行排序。當單個頁面需要不同順序時，請先分割或重新排列源 PDF。",
        searchTerms: ["合併 PDF", "合併 PDF", "PDF 合併"],
      },
      "split-pdf": {
        title: "分割 PDF",
        description:
          "將選取的頁面提取成一個 PDF，或按大小或自訂範圍將 PDF 分割成獨立檔案。",
        guide:
          "選擇「提取頁面」以生成一個新的 PDF，或選擇「拆分文件」以獲得多個輸出。使用頁面表達式，例如 1, 3-5；多個結果會打包成一個 ZIP。",
        faqQuestion: "分割是否會降低頁面品質？",
        faqAnswer:
          "分割過程不使用光柵化。現有的 PDF 頁面會被複製到新檔案中，但進階的整份文件功能可能無法保留。",
        searchTerms: ["分割 PDF", "擷取 PDF 頁面", "PDF 分割器"],
      },
      "pdf-to-image": {
        title: "PDF 轉圖片",
        description:
          "將選定的 PDF 頁面渲染為 JPG 或 PNG 圖片，並提供實用的解析度和品質控制。",
        guide:
          "選擇一個 PDF，選取頁面、格式和解析度，然後轉換。一頁會直接下載；多頁將收集到一個帶編號檔名的 ZIP 中。",
        faqQuestion: "我應該選 JPG 還是 PNG？",
        faqAnswer:
          "JPG 通常對照片和掃描件較小。PNG 是無損的，通常對圖表、清晰文字或透明背景更好，但檔案可能會大很多。",
        searchTerms: ["PDF 轉圖片", "PDF 轉換為 JPG", "PDF 轉換為 PNG"],
      },
      "image-to-pdf": {
        title: "圖像轉 PDF",
        description:
          "排列 JPG、PNG 或 WebP 圖像，並將它們放入一個 PDF，可控制頁面大小、方向和邊距。",
        guide:
          "新增圖像，拖曳或移動它們以調整順序，然後選擇適應、A4 或 Letter 頁面。固定頁面會縮小圖像以適應，而不裁剪或放大它們。",
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
          "Yerel olarak bir PDF küçültün; belge koruma seçeneği veya net görüntü kalitesi ön ayarları ile kullanın.",
        guide:
          "Bir PDF seçin, üç ön ayarı karşılaştırın ve sıkıştırın. Belgeyi korumak, seçilebilir içeriği korur ancak çok az tasarruf edebilir; diğer ön ayarlar, taranan veya görüntü ağırlıklı dosyalarda daha büyük küçümlemeler için her sayfayı bir görüntü olarak yeniden oluşturur.",
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
          "Birkaç PDF dosyasını sıralayın ve sayfalarını tarayıcınızda tek bir PDF dosyasında birleştirin.",
        guide:
          "İki veya daha fazla PDF ekleyin, sıralamak için sürükleyin veya taşımayı kullanın düğmeleri ardından birleştirin. Çıktı, listedeki dosya sırasını takip eder.",
        faqQuestion: "Bir PDF içindeki sayfa sırasını değiştirebilir miyim?",
        faqAnswer:
          "Bu ilk sürüm tüm dosyaları sıralar. Bireysel sayfalar farklı bir sıraya ihtiyaç duyduğunda önce kaynak PDF dosyasını bölün veya yeniden düzenleyin.",
        searchTerms: ["PDF birleştir", "PDFleri birleştir", "PDF birleştirme"],
      },
      "split-pdf": {
        title: "PDFi böl",
        description:
          "Seçili sayfaları tek bir PDF dosyasına çıkarın veya bir PDF dosyasını boyut veya özel aralıklarla ayrı dosyalara ayırın.",
        guide:
          "Tek bir yeni PDF için Sayfaları çıkar seçin veya birden fazla çıktı için Belgeyi böl seçin. 1, 3-5 gibi bir sayfa ifadesi kullanın; birden fazla sonuç tek bir ZIP içine paketlenir.",
        faqQuestion: "Bölme sayfa kalitesini düşürür mü?",
        faqAnswer:
          "Bölme sırasında rasterleştirme kullanılmaz. Mevcut PDF sayfaları yeni dosyalara kopyalanır, ancak gelişmiş belge genel özellikleri aktarılmayabilir.",
        searchTerms: ["PDFi böl", "PDF sayfalarını çıkar", "PDF bölücü"],
      },
      "pdf-to-image": {
        title: "PDF'yi Görüntüye çevir",
        description:
          "Seçili PDF sayfalarını pratik çözünürlük ve kalite kontrolleri ile JPG veya PNG görüntüleri olarak oluşturun.",
        guide:
          "Bir PDF seçin, sayfaları, formatı ve çözünürlüğü seçin, sonra dönüştürün. Tek sayfa doğrudan indirilir; birden fazla sayfa numaralandırılmış dosya adlarıyla bir ZIP içine toplanır.",
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
          "JPG, PNG veya WebP görüntülerini düzenleyin ve bunları sayfa boyutu, yönlendirme ve kenar boşluğu kontrolleri ile tek bir PDF dosyasına yerleştirin.",
        guide:
          "Görüntüleri ekleyin, sürükleyin veya sıraya koyun, ardından sığdır, A4 veya Letter sayfalarını seçin. Sabit sayfalar, görüntüleri kırpmadan veya büyütmeden sığacak şekilde ölçekler.",
        faqQuestion: "Görüntülerim kırpılıyor ya da büyütülüyor mu?",
        faqAnswer:
          "Hayır. Görüntüler merkezlenir ve yalnızca gerektiğinde küçültülür. Sığdırma modu, PDF sayfası için her görüntünün kendi oranlarını kullanır.",
        searchTerms: ["görüntüyü PDF'ye dönüştür", "JPG to PDF", "PNG to PDF"],
      },
    },
  },
} as const;
