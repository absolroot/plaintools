import type { ToolPageCopy } from "../../lib/locale-data/bundle";
import type { Locale } from "../../lib/site";
import type { RegexTesterCopy } from "./contract";

type SharedActions = Pick<
  RegexTesterCopy,
  "clear" | "copy" | "copied" | "copyFailed"
>;

type RegexLocaleText = {
  title: string;
  description: string;
  guideTitle: string;
  guideBody: string;
  safetyTitle: string;
  safetyBody: string;
  faqs: Array<{ q: string; a: string }>;
  feature: Omit<RegexTesterCopy, keyof SharedActions>;
};

const texts = {
  en: {
    title: "Regex Tester",
    description:
      "Test JavaScript regular expressions against text and replace matches in your browser.",
    guideTitle: "How to use the Regex Tester",
    guideBody:
      "Enter a JavaScript regular expression, choose the flags you need, and paste test text. Matches and capture groups update after you stop typing. Add a replacement template only when you want to create replacement output.",
    safetyTitle: "Runs locally with time and size limits",
    safetyBody:
      "Your pattern and text stay in this browser tab. Evaluation runs in a disposable worker and stops if a pattern takes too long. This tester uses JavaScript syntax, not PCRE, .NET, Java, or another regex engine.",
    faqs: [
      {
        q: "Which regular-expression engine is used?",
        a: "The tester uses the JavaScript RegExp engine built into your browser.",
      },
      {
        q: "What does the g flag change?",
        a: "With g selected, the tester lists successive matches. Without it, only the first match is shown. Replace all still replaces every eligible match.",
      },
      {
        q: "Is my pattern or text uploaded?",
        a: "No. Matching and replacement happen only in this browser tab and are not stored by the tool.",
      },
    ],
    feature: {
      expressionLabel: "Regular expression",
      expressionPlaceholder: "Enter a JavaScript regular expression",
      flagsLabel: "Flags",
      testTextLabel: "Test text",
      testTextPlaceholder: "Paste or type text to test",
      replacementLabel: "Replacement template",
      replacementPlaceholder: "For example: [$1]",
      replacementOutputLabel: "Replacement output",
      replacementOutputPlaceholder: "Replacement output appears here",
      replaceAction: "Replace all",
      resultsLabel: "Match results",
      ready: "Ready",
      enterExpression: "Enter a regular expression to begin.",
      evaluating: "Testing the regular expression…",
      noMatches: "No matches",
      matchSummary: "{count} matches",
      matchAt: "Match at {index}",
      group: "Group {index}: {value}",
      invalid: "The regular expression is invalid.",
      tooManyMatches: "Showing the first 500 matches",
      inputTooLarge:
        "The expression or test text is too large for this browser tool.",
      replacementTooLarge:
        "The replacement is too large or would affect more than 500 matches.",
      processingFailed: "The pattern took too long or could not be evaluated.",
      replacementResult: "Replacement output updated",
      loadSample: "Load sample",
      localNote: "Processed only in this browser",
    },
  },
  ko: {
    title: "정규식 테스터",
    description:
      "브라우저에서 JavaScript 정규식을 텍스트에 적용해 일치 항목을 확인하고 바꿉니다.",
    guideTitle: "정규식 테스터 사용 방법",
    guideBody:
      "JavaScript 정규식을 입력하고 필요한 플래그를 선택한 뒤 테스트할 텍스트를 붙여넣으세요. 입력을 멈추면 일치 항목과 캡처 그룹이 갱신됩니다. 바꿀 결과가 필요할 때만 치환식을 입력하세요.",
    safetyTitle: "시간과 크기를 제한해 브라우저에서 처리",
    safetyBody:
      "정규식과 텍스트는 이 브라우저 탭 밖으로 전송되지 않습니다. 평가는 별도 워커에서 실행되며 너무 오래 걸리면 중단됩니다. PCRE, .NET, Java가 아닌 JavaScript 정규식 문법을 사용합니다.",
    faqs: [
      {
        q: "어떤 정규식 엔진을 사용하나요?",
        a: "브라우저에 내장된 JavaScript RegExp 엔진을 사용합니다.",
      },
      {
        q: "g 플래그는 무엇을 바꾸나요?",
        a: "g를 선택하면 이어지는 모든 일치 항목을 표시하고, 끄면 첫 번째 일치 항목만 표시합니다. 모두 바꾸기는 가능한 모든 항목을 바꿉니다.",
      },
      {
        q: "정규식이나 텍스트가 업로드되나요?",
        a: "아니요. 일치 확인과 바꾸기는 이 브라우저 탭에서만 이루어지며 도구가 내용을 저장하지 않습니다.",
      },
    ],
    feature: {
      expressionLabel: "정규식",
      expressionPlaceholder: "JavaScript 정규식을 입력하세요",
      flagsLabel: "플래그",
      testTextLabel: "테스트할 텍스트",
      testTextPlaceholder: "테스트할 텍스트를 입력하거나 붙여넣으세요",
      replacementLabel: "치환식",
      replacementPlaceholder: "예: [$1]",
      replacementOutputLabel: "바꾼 결과",
      replacementOutputPlaceholder: "바꾼 결과가 여기에 표시됩니다",
      replaceAction: "모두 바꾸기",
      resultsLabel: "일치 결과",
      ready: "준비됨",
      enterExpression: "시작하려면 정규식을 입력하세요.",
      evaluating: "정규식을 확인하는 중…",
      noMatches: "일치 항목 없음",
      matchSummary: "일치 항목 {count}개",
      matchAt: "{index} 위치에서 일치",
      group: "그룹 {index}: {value}",
      invalid: "올바르지 않은 정규식입니다.",
      tooManyMatches: "처음 500개만 표시합니다",
      inputTooLarge:
        "정규식이나 테스트할 텍스트가 이 브라우저 도구의 처리 범위를 넘습니다.",
      replacementTooLarge: "치환식이 너무 길거나 바꿀 항목이 500개를 넘습니다.",
      processingFailed: "정규식 처리 시간이 너무 길거나 평가할 수 없습니다.",
      replacementResult: "바꾼 결과를 갱신했습니다",
      loadSample: "예제 불러오기",
      localNote: "이 브라우저에서만 처리됩니다",
    },
  },
  es: {
    title: "Probador de expresiones regulares",
    description:
      "Prueba expresiones regulares de JavaScript con texto y reemplaza coincidencias en el navegador.",
    guideTitle: "Cómo usar el probador de expresiones regulares",
    guideBody:
      "Escribe una expresión regular de JavaScript, elige las banderas y pega el texto de prueba. Las coincidencias y los grupos de captura se actualizan al dejar de escribir. Añade una plantilla solo si quieres generar un reemplazo.",
    safetyTitle: "Procesamiento local con límites de tiempo y tamaño",
    safetyBody:
      "El patrón y el texto no salen de esta pestaña. La evaluación se ejecuta en un proceso aislado y se detiene si tarda demasiado. Se usa la sintaxis de JavaScript, no la de PCRE, .NET o Java.",
    faqs: [
      {
        q: "¿Qué motor se utiliza?",
        a: "Se utiliza el motor RegExp de JavaScript incluido en el navegador.",
      },
      {
        q: "¿Qué cambia la bandera g?",
        a: "Con g se muestran las coincidencias sucesivas; sin ella, solo la primera. Reemplazar todo sigue afectando a todas las coincidencias válidas.",
      },
      {
        q: "¿Se suben el patrón o el texto?",
        a: "No. La búsqueda y el reemplazo se realizan en esta pestaña y la herramienta no guarda el contenido.",
      },
    ],
    feature: {
      expressionLabel: "Expresión regular",
      expressionPlaceholder: "Escribe una expresión regular de JavaScript",
      flagsLabel: "Banderas",
      testTextLabel: "Texto de prueba",
      testTextPlaceholder: "Escribe o pega el texto que quieres probar",
      replacementLabel: "Plantilla de reemplazo",
      replacementPlaceholder: "Por ejemplo: [$1]",
      replacementOutputLabel: "Resultado del reemplazo",
      replacementOutputPlaceholder: "El resultado aparecerá aquí",
      replaceAction: "Reemplazar todo",
      resultsLabel: "Resultados",
      ready: "Listo",
      enterExpression: "Escribe una expresión regular para empezar.",
      evaluating: "Probando la expresión regular…",
      noMatches: "No hay coincidencias",
      matchSummary: "{count} coincidencias",
      matchAt: "Coincidencia en {index}",
      group: "Grupo {index}: {value}",
      invalid: "La expresión regular no es válida.",
      tooManyMatches: "Se muestran las primeras 500 coincidencias",
      inputTooLarge:
        "La expresión o el texto supera el límite de esta herramienta.",
      replacementTooLarge:
        "El reemplazo es demasiado largo o afectaría a más de 500 coincidencias.",
      processingFailed: "El patrón tardó demasiado o no pudo evaluarse.",
      replacementResult: "Resultado del reemplazo actualizado",
      loadSample: "Cargar ejemplo",
      localNote: "Se procesa solo en este navegador",
    },
  },
  de: {
    title: "RegEx-Tester",
    description:
      "Teste JavaScript-RegEx im Browser mit Text und ersetze Treffer.",
    guideTitle: "RegEx-Tester verwenden",
    guideBody:
      "Gib einen JavaScript-RegEx ein, wähle die benötigten Flags und füge Testtext ein. Treffer und Gruppen werden nach der Eingabepause aktualisiert. Eine Ersetzungsvorlage brauchst du nur für eine Ersetzungsausgabe.",
    safetyTitle: "Lokale Verarbeitung mit Zeit- und Größenlimit",
    safetyBody:
      "Muster und Text bleiben in diesem Browsertab. Die Auswertung läuft in einem getrennten Worker und wird bei zu langer Laufzeit beendet. Verwendet wird JavaScript-Syntax, nicht PCRE, .NET oder Java.",
    faqs: [
      {
        q: "Welche RegEx-Engine wird verwendet?",
        a: "Der Tester nutzt die im Browser integrierte JavaScript-RegExp-Engine.",
      },
      {
        q: "Was ändert das g-Flag?",
        a: "Mit g werden aufeinanderfolgende Treffer angezeigt, ohne g nur der erste. Alle ersetzen ersetzt weiterhin alle passenden Stellen.",
      },
      {
        q: "Werden Muster oder Text hochgeladen?",
        a: "Nein. Suche und Ersetzung finden nur in diesem Browsertab statt; die Inhalte werden nicht gespeichert.",
      },
    ],
    feature: {
      expressionLabel: "Regulärer Ausdruck",
      expressionPlaceholder: "JavaScript-RegEx eingeben",
      flagsLabel: "Flags",
      testTextLabel: "Testtext",
      testTextPlaceholder: "Testtext eingeben oder einfügen",
      replacementLabel: "Ersetzungsvorlage",
      replacementPlaceholder: "Zum Beispiel: [$1]",
      replacementOutputLabel: "Ersetzungsausgabe",
      replacementOutputPlaceholder: "Die Ersetzungsausgabe erscheint hier",
      replaceAction: "Alle ersetzen",
      resultsLabel: "Treffer",
      ready: "Bereit",
      enterExpression: "Gib zum Start einen regulären Ausdruck ein.",
      evaluating: "Regulärer Ausdruck wird getestet…",
      noMatches: "Keine Treffer",
      matchSummary: "{count} Treffer",
      matchAt: "Treffer bei {index}",
      group: "Gruppe {index}: {value}",
      invalid: "Der reguläre Ausdruck ist ungültig.",
      tooManyMatches: "Die ersten 500 Treffer werden angezeigt",
      inputTooLarge:
        "Ausdruck oder Testtext überschreiten das Limit dieses Browsertools.",
      replacementTooLarge:
        "Die Ersetzung ist zu lang oder würde mehr als 500 Treffer betreffen.",
      processingFailed:
        "Das Muster dauerte zu lange oder konnte nicht ausgewertet werden.",
      replacementResult: "Ersetzungsausgabe aktualisiert",
      loadSample: "Beispiel laden",
      localNote: "Wird nur in diesem Browser verarbeitet",
    },
  },
  ja: {
    title: "正規表現テスター",
    description:
      "JavaScript 正規表現をテキストで試し、ブラウザ内で一致箇所を置換します。",
    guideTitle: "正規表現テスターの使い方",
    guideBody:
      "JavaScript 正規表現を入力し、必要なフラグを選んでテスト文字列を貼り付けます。入力が止まると一致箇所とキャプチャグループが更新されます。置換結果が必要な場合だけ置換テンプレートを入力してください。",
    safetyTitle: "時間とサイズを制限したローカル処理",
    safetyBody:
      "パターンとテキストはこのブラウザタブの外に送信されません。評価は分離されたワーカーで行い、時間がかかりすぎる場合は停止します。PCRE、.NET、Java ではなく JavaScript の構文を使用します。",
    faqs: [
      {
        q: "どの正規表現エンジンを使いますか？",
        a: "ブラウザに組み込まれた JavaScript RegExp エンジンを使います。",
      },
      {
        q: "g フラグを付けると何が変わりますか？",
        a: "g を付けると連続する一致を表示し、外すと最初の一致だけを表示します。「すべて置換」は対象となる一致をすべて置換します。",
      },
      {
        q: "パターンやテキストはアップロードされますか？",
        a: "いいえ。照合と置換はこのタブ内だけで行われ、ツールが内容を保存することもありません。",
      },
    ],
    feature: {
      expressionLabel: "正規表現",
      expressionPlaceholder: "JavaScript 正規表現を入力",
      flagsLabel: "フラグ",
      testTextLabel: "テスト文字列",
      testTextPlaceholder: "テストする文字列を入力または貼り付け",
      replacementLabel: "置換テンプレート",
      replacementPlaceholder: "例：[$1]",
      replacementOutputLabel: "置換結果",
      replacementOutputPlaceholder: "置換結果がここに表示されます",
      replaceAction: "すべて置換",
      resultsLabel: "一致結果",
      ready: "準備完了",
      enterExpression: "正規表現を入力してください。",
      evaluating: "正規表現をテストしています…",
      noMatches: "一致なし",
      matchSummary: "{count} 件一致",
      matchAt: "位置 {index} で一致",
      group: "グループ {index}：{value}",
      invalid: "正規表現が正しくありません。",
      tooManyMatches: "最初の 500 件を表示しています",
      inputTooLarge:
        "正規表現またはテスト文字列がこのツールの上限を超えています。",
      replacementTooLarge:
        "置換文字列が長すぎるか、対象が 500 件を超えています。",
      processingFailed:
        "処理に時間がかかりすぎたか、正規表現を評価できませんでした。",
      replacementResult: "置換結果を更新しました",
      loadSample: "例を読み込む",
      localNote: "このブラウザ内だけで処理されます",
    },
  },
  fr: {
    title: "Testeur d’expressions régulières",
    description:
      "Testez des expressions régulières JavaScript sur du texte et remplacez les correspondances dans le navigateur.",
    guideTitle: "Utiliser le testeur d’expressions régulières",
    guideBody:
      "Saisissez une expression régulière JavaScript, choisissez les indicateurs et collez le texte à tester. Les correspondances et groupes de capture se mettent à jour après la saisie. Ajoutez un modèle uniquement pour produire un texte de remplacement.",
    safetyTitle: "Traitement local avec limites de durée et de taille",
    safetyBody:
      "Le motif et le texte restent dans cet onglet. L’évaluation s’exécute dans un worker isolé et s’arrête si elle dure trop longtemps. La syntaxe utilisée est celle de JavaScript, pas celle de PCRE, .NET ou Java.",
    faqs: [
      {
        q: "Quel moteur est utilisé ?",
        a: "Le testeur utilise le moteur JavaScript RegExp intégré au navigateur.",
      },
      {
        q: "Que change l’indicateur g ?",
        a: "Avec g, les correspondances successives sont affichées ; sans g, seule la première l’est. Tout remplacer agit toujours sur toutes les correspondances admissibles.",
      },
      {
        q: "Le motif ou le texte sont-ils envoyés ?",
        a: "Non. La recherche et le remplacement restent dans cet onglet et l’outil n’enregistre pas le contenu.",
      },
    ],
    feature: {
      expressionLabel: "Expression régulière",
      expressionPlaceholder: "Saisissez une expression régulière JavaScript",
      flagsLabel: "Indicateurs",
      testTextLabel: "Texte de test",
      testTextPlaceholder: "Saisissez ou collez le texte à tester",
      replacementLabel: "Modèle de remplacement",
      replacementPlaceholder: "Par exemple : [$1]",
      replacementOutputLabel: "Résultat du remplacement",
      replacementOutputPlaceholder: "Le résultat s’affichera ici",
      replaceAction: "Tout remplacer",
      resultsLabel: "Correspondances",
      ready: "Prêt",
      enterExpression: "Saisissez une expression régulière pour commencer.",
      evaluating: "Test de l’expression régulière…",
      noMatches: "Aucune correspondance",
      matchSummary: "{count} correspondances",
      matchAt: "Correspondance à {index}",
      group: "Groupe {index} : {value}",
      invalid: "L’expression régulière n’est pas valide.",
      tooManyMatches: "Affichage des 500 premières correspondances",
      inputTooLarge: "L’expression ou le texte dépasse la limite de cet outil.",
      replacementTooLarge:
        "Le remplacement est trop long ou concernerait plus de 500 correspondances.",
      processingFailed:
        "Le motif a pris trop de temps ou n’a pas pu être évalué.",
      replacementResult: "Résultat du remplacement mis à jour",
      loadSample: "Charger un exemple",
      localNote: "Traitement effectué uniquement dans ce navigateur",
    },
  },
  "pt-BR": {
    title: "Testador de expressões regulares",
    description:
      "Teste expressões regulares JavaScript em textos e substitua ocorrências no navegador.",
    guideTitle: "Como usar o testador de expressões regulares",
    guideBody:
      "Digite uma expressão regular JavaScript, escolha as flags e cole o texto de teste. As ocorrências e os grupos de captura são atualizados após a digitação. Adicione um modelo somente quando quiser gerar uma substituição.",
    safetyTitle: "Processamento local com limites de tempo e tamanho",
    safetyBody:
      "O padrão e o texto permanecem nesta aba. A avaliação é executada em um worker isolado e interrompida se demorar demais. A sintaxe é a do JavaScript, não a do PCRE, .NET ou Java.",
    faqs: [
      {
        q: "Qual mecanismo de expressão regular é usado?",
        a: "O testador usa o mecanismo JavaScript RegExp integrado ao navegador.",
      },
      {
        q: "O que a flag g muda?",
        a: "Com g, as ocorrências seguintes são exibidas; sem ela, apenas a primeira. Substituir tudo continua substituindo todas as ocorrências elegíveis.",
      },
      {
        q: "O padrão ou o texto são enviados?",
        a: "Não. A busca e a substituição acontecem apenas nesta aba e a ferramenta não armazena o conteúdo.",
      },
    ],
    feature: {
      expressionLabel: "Expressão regular",
      expressionPlaceholder: "Digite uma expressão regular JavaScript",
      flagsLabel: "Flags",
      testTextLabel: "Texto de teste",
      testTextPlaceholder: "Digite ou cole o texto para testar",
      replacementLabel: "Modelo de substituição",
      replacementPlaceholder: "Por exemplo: [$1]",
      replacementOutputLabel: "Resultado da substituição",
      replacementOutputPlaceholder: "O resultado aparecerá aqui",
      replaceAction: "Substituir tudo",
      resultsLabel: "Ocorrências",
      ready: "Pronto",
      enterExpression: "Digite uma expressão regular para começar.",
      evaluating: "Testando a expressão regular…",
      noMatches: "Nenhuma ocorrência",
      matchSummary: "{count} ocorrências",
      matchAt: "Ocorrência em {index}",
      group: "Grupo {index}: {value}",
      invalid: "A expressão regular é inválida.",
      tooManyMatches: "Exibindo as primeiras 500 ocorrências",
      inputTooLarge:
        "A expressão ou o texto ultrapassa o limite desta ferramenta.",
      replacementTooLarge:
        "A substituição é grande demais ou afetaria mais de 500 ocorrências.",
      processingFailed: "O padrão demorou demais ou não pôde ser avaliado.",
      replacementResult: "Resultado da substituição atualizado",
      loadSample: "Carregar exemplo",
      localNote: "Processado somente neste navegador",
    },
  },
  it: {
    title: "Tester di espressioni regolari",
    description:
      "Prova espressioni regolari JavaScript sul testo e sostituisci le corrispondenze nel browser.",
    guideTitle: "Come usare il tester di espressioni regolari",
    guideBody:
      "Inserisci un’espressione regolare JavaScript, scegli i flag e incolla il testo di prova. Corrispondenze e gruppi di cattura si aggiornano dopo la digitazione. Aggiungi un modello solo se vuoi creare un risultato sostituito.",
    safetyTitle: "Elaborazione locale con limiti di tempo e dimensione",
    safetyBody:
      "Il modello e il testo restano in questa scheda. La valutazione avviene in un worker isolato e viene interrotta se dura troppo. La sintassi è quella JavaScript, non PCRE, .NET o Java.",
    faqs: [
      {
        q: "Quale motore viene usato?",
        a: "Il tester usa il motore JavaScript RegExp integrato nel browser.",
      },
      {
        q: "Cosa cambia con il flag g?",
        a: "Con g vengono mostrate le corrispondenze successive; senza, solo la prima. Sostituisci tutto agisce comunque su tutte le corrispondenze valide.",
      },
      {
        q: "Il modello o il testo vengono caricati?",
        a: "No. Ricerca e sostituzione avvengono solo in questa scheda e lo strumento non salva il contenuto.",
      },
    ],
    feature: {
      expressionLabel: "Espressione regolare",
      expressionPlaceholder: "Inserisci un’espressione regolare JavaScript",
      flagsLabel: "Flag",
      testTextLabel: "Testo di prova",
      testTextPlaceholder: "Digita o incolla il testo da provare",
      replacementLabel: "Modello di sostituzione",
      replacementPlaceholder: "Ad esempio: [$1]",
      replacementOutputLabel: "Risultato della sostituzione",
      replacementOutputPlaceholder: "Il risultato apparirà qui",
      replaceAction: "Sostituisci tutto",
      resultsLabel: "Corrispondenze",
      ready: "Pronto",
      enterExpression: "Inserisci un’espressione regolare per iniziare.",
      evaluating: "Verifica dell’espressione regolare…",
      noMatches: "Nessuna corrispondenza",
      matchSummary: "{count} corrispondenze",
      matchAt: "Corrispondenza a {index}",
      group: "Gruppo {index}: {value}",
      invalid: "L’espressione regolare non è valida.",
      tooManyMatches: "Sono mostrate le prime 500 corrispondenze",
      inputTooLarge:
        "L’espressione o il testo supera il limite dello strumento.",
      replacementTooLarge:
        "La sostituzione è troppo lunga o riguarderebbe più di 500 corrispondenze.",
      processingFailed:
        "Il modello ha impiegato troppo tempo o non è stato valutato.",
      replacementResult: "Risultato della sostituzione aggiornato",
      loadSample: "Carica esempio",
      localNote: "Elaborato solo in questo browser",
    },
  },
  nl: {
    title: "Reguliere-expressietester",
    description:
      "Test JavaScript-reguliere expressies op tekst en vervang overeenkomsten in de browser.",
    guideTitle: "De reguliere-expressietester gebruiken",
    guideBody:
      "Voer een JavaScript-reguliere expressie in, kies de vlaggen en plak testtekst. Overeenkomsten en vanggroepen worden na het typen bijgewerkt. Voeg alleen een vervangingssjabloon toe als je vervangingsuitvoer wilt maken.",
    safetyTitle: "Lokale verwerking met tijd- en groottelimieten",
    safetyBody:
      "Patroon en tekst blijven in dit browsertabblad. De evaluatie draait in een aparte worker en stopt als die te lang duurt. Deze tester gebruikt JavaScript-syntaxis, niet PCRE, .NET of Java.",
    faqs: [
      {
        q: "Welke regex-engine wordt gebruikt?",
        a: "De tester gebruikt de JavaScript RegExp-engine van de browser.",
      },
      {
        q: "Wat verandert de vlag g?",
        a: "Met g worden opeenvolgende overeenkomsten getoond; zonder g alleen de eerste. Alles vervangen vervangt nog steeds alle geschikte overeenkomsten.",
      },
      {
        q: "Worden patroon of tekst geüpload?",
        a: "Nee. Zoeken en vervangen gebeurt alleen in dit tabblad en de tool slaat de inhoud niet op.",
      },
    ],
    feature: {
      expressionLabel: "Reguliere expressie",
      expressionPlaceholder: "Voer een JavaScript-reguliere expressie in",
      flagsLabel: "Vlaggen",
      testTextLabel: "Testtekst",
      testTextPlaceholder: "Typ of plak de te testen tekst",
      replacementLabel: "Vervangingssjabloon",
      replacementPlaceholder: "Bijvoorbeeld: [$1]",
      replacementOutputLabel: "Vervangingsuitvoer",
      replacementOutputPlaceholder: "De vervangingsuitvoer verschijnt hier",
      replaceAction: "Alles vervangen",
      resultsLabel: "Overeenkomsten",
      ready: "Gereed",
      enterExpression: "Voer een reguliere expressie in om te beginnen.",
      evaluating: "Reguliere expressie wordt getest…",
      noMatches: "Geen overeenkomsten",
      matchSummary: "{count} overeenkomsten",
      matchAt: "Overeenkomst op {index}",
      group: "Groep {index}: {value}",
      invalid: "De reguliere expressie is ongeldig.",
      tooManyMatches: "De eerste 500 overeenkomsten worden getoond",
      inputTooLarge:
        "De expressie of testtekst overschrijdt de limiet van deze tool.",
      replacementTooLarge:
        "De vervanging is te lang of zou meer dan 500 overeenkomsten raken.",
      processingFailed:
        "Het patroon duurde te lang of kon niet worden geëvalueerd.",
      replacementResult: "Vervangingsuitvoer bijgewerkt",
      loadSample: "Voorbeeld laden",
      localNote: "Wordt alleen in deze browser verwerkt",
    },
  },
  sv: {
    title: "Testverktyg för reguljära uttryck",
    description:
      "Testa reguljära JavaScript-uttryck mot text och ersätt träffar i webbläsaren.",
    guideTitle: "Så använder du testverktyget",
    guideBody:
      "Ange ett reguljärt JavaScript-uttryck, välj flaggor och klistra in testtext. Träffar och fångstgrupper uppdateras efter att du slutat skriva. Lägg bara till en ersättningsmall när du vill skapa ett ersatt resultat.",
    safetyTitle: "Lokal bearbetning med tids- och storleksgränser",
    safetyBody:
      "Mönstret och texten lämnar inte den här fliken. Utvärderingen körs i en separat worker och stoppas om den tar för lång tid. Verktyget använder JavaScript-syntax, inte PCRE, .NET eller Java.",
    faqs: [
      {
        q: "Vilken regexmotor används?",
        a: "Verktyget använder webbläsarens inbyggda JavaScript RegExp-motor.",
      },
      {
        q: "Vad ändrar flaggan g?",
        a: "Med g visas efterföljande träffar, utan g endast den första. Ersätt alla ersätter fortfarande alla tillämpliga träffar.",
      },
      {
        q: "Laddas mönstret eller texten upp?",
        a: "Nej. Sökning och ersättning sker bara i den här fliken och innehållet sparas inte.",
      },
    ],
    feature: {
      expressionLabel: "Reguljärt uttryck",
      expressionPlaceholder: "Ange ett reguljärt JavaScript-uttryck",
      flagsLabel: "Flaggor",
      testTextLabel: "Testtext",
      testTextPlaceholder: "Skriv eller klistra in text att testa",
      replacementLabel: "Ersättningsmall",
      replacementPlaceholder: "Till exempel: [$1]",
      replacementOutputLabel: "Ersatt resultat",
      replacementOutputPlaceholder: "Det ersatta resultatet visas här",
      replaceAction: "Ersätt alla",
      resultsLabel: "Träffar",
      ready: "Klar",
      enterExpression: "Ange ett reguljärt uttryck för att börja.",
      evaluating: "Testar det reguljära uttrycket…",
      noMatches: "Inga träffar",
      matchSummary: "{count} träffar",
      matchAt: "Träff vid {index}",
      group: "Grupp {index}: {value}",
      invalid: "Det reguljära uttrycket är ogiltigt.",
      tooManyMatches: "De första 500 träffarna visas",
      inputTooLarge: "Uttrycket eller testtexten överskrider verktygets gräns.",
      replacementTooLarge:
        "Ersättningen är för lång eller skulle påverka fler än 500 träffar.",
      processingFailed:
        "Mönstret tog för lång tid eller kunde inte utvärderas.",
      replacementResult: "Det ersatta resultatet har uppdaterats",
      loadSample: "Läs in exempel",
      localNote: "Bearbetas endast i den här webbläsaren",
    },
  },
  cs: {
    title: "Tester regulárních výrazů",
    description:
      "Testujte regulární výrazy JavaScriptu na textu a nahrazujte shody v prohlížeči.",
    guideTitle: "Jak používat tester regulárních výrazů",
    guideBody:
      "Zadejte regulární výraz JavaScriptu, vyberte příznaky a vložte testovací text. Shody a zachycené skupiny se po dopsání aktualizují. Šablonu náhrady přidejte jen tehdy, když chcete vytvořit nahrazený výstup.",
    safetyTitle: "Místní zpracování s časovým a velikostním limitem",
    safetyBody:
      "Vzor a text neopouštějí tuto kartu. Vyhodnocení běží v odděleném workeru a při příliš dlouhém běhu se zastaví. Používá se syntaxe JavaScriptu, nikoli PCRE, .NET nebo Java.",
    faqs: [
      {
        q: "Jaký modul regulárních výrazů se používá?",
        a: "Tester používá modul JavaScript RegExp zabudovaný v prohlížeči.",
      },
      {
        q: "Co mění příznak g?",
        a: "S příznakem g se zobrazí postupné shody, bez něj pouze první. Nahradit vše stále nahradí všechny použitelné shody.",
      },
      {
        q: "Nahrává se vzor nebo text?",
        a: "Ne. Hledání i nahrazování probíhá pouze na této kartě a nástroj obsah neukládá.",
      },
    ],
    feature: {
      expressionLabel: "Regulární výraz",
      expressionPlaceholder: "Zadejte regulární výraz JavaScriptu",
      flagsLabel: "Příznaky",
      testTextLabel: "Testovací text",
      testTextPlaceholder: "Napište nebo vložte text k otestování",
      replacementLabel: "Šablona náhrady",
      replacementPlaceholder: "Například: [$1]",
      replacementOutputLabel: "Výsledek náhrady",
      replacementOutputPlaceholder: "Výsledek náhrady se zobrazí zde",
      replaceAction: "Nahradit vše",
      resultsLabel: "Shody",
      ready: "Připraveno",
      enterExpression: "Nejprve zadejte regulární výraz.",
      evaluating: "Testuje se regulární výraz…",
      noMatches: "Žádné shody",
      matchSummary: "Počet shod: {count}",
      matchAt: "Shoda na pozici {index}",
      group: "Skupina {index}: {value}",
      invalid: "Regulární výraz není platný.",
      tooManyMatches: "Zobrazuje se prvních 500 shod",
      inputTooLarge:
        "Výraz nebo testovací text překračuje limit tohoto nástroje.",
      replacementTooLarge:
        "Náhrada je příliš dlouhá nebo by ovlivnila více než 500 shod.",
      processingFailed:
        "Vyhodnocení vzoru trvalo příliš dlouho nebo se nezdařilo.",
      replacementResult: "Výsledek náhrady byl aktualizován",
      loadSample: "Načíst příklad",
      localNote: "Zpracování probíhá pouze v tomto prohlížeči",
    },
  },
  pl: {
    title: "Tester wyrażeń regularnych",
    description:
      "Testuj wyrażenia regularne JavaScript na tekście i zastępuj dopasowania w przeglądarce.",
    guideTitle: "Jak używać testera wyrażeń regularnych",
    guideBody:
      "Wpisz wyrażenie regularne JavaScript, wybierz flagi i wklej tekst testowy. Dopasowania i grupy przechwytujące zaktualizują się po zakończeniu pisania. Szablon zamiany dodaj tylko wtedy, gdy chcesz utworzyć zmieniony wynik.",
    safetyTitle: "Przetwarzanie lokalne z limitem czasu i rozmiaru",
    safetyBody:
      "Wzorzec i tekst nie opuszczają tej karty. Ocena działa w osobnym workerze i zostaje przerwana, gdy trwa zbyt długo. Tester używa składni JavaScript, a nie PCRE, .NET ani Java.",
    faqs: [
      {
        q: "Jaki silnik wyrażeń regularnych jest używany?",
        a: "Tester korzysta z silnika JavaScript RegExp wbudowanego w przeglądarkę.",
      },
      {
        q: "Co zmienia flaga g?",
        a: "Z flagą g wyświetlane są kolejne dopasowania, bez niej tylko pierwsze. Zamień wszystkie nadal zastępuje wszystkie odpowiednie dopasowania.",
      },
      {
        q: "Czy wzorzec lub tekst są wysyłane?",
        a: "Nie. Wyszukiwanie i zamiana odbywają się tylko na tej karcie, a narzędzie nie zapisuje treści.",
      },
    ],
    feature: {
      expressionLabel: "Wyrażenie regularne",
      expressionPlaceholder: "Wpisz wyrażenie regularne JavaScript",
      flagsLabel: "Flagi",
      testTextLabel: "Tekst testowy",
      testTextPlaceholder: "Wpisz lub wklej tekst do sprawdzenia",
      replacementLabel: "Szablon zamiany",
      replacementPlaceholder: "Na przykład: [$1]",
      replacementOutputLabel: "Wynik zamiany",
      replacementOutputPlaceholder: "Wynik zamiany pojawi się tutaj",
      replaceAction: "Zamień wszystkie",
      resultsLabel: "Dopasowania",
      ready: "Gotowe",
      enterExpression: "Wpisz wyrażenie regularne, aby rozpocząć.",
      evaluating: "Testowanie wyrażenia regularnego…",
      noMatches: "Brak dopasowań",
      matchSummary: "Dopasowania: {count}",
      matchAt: "Dopasowanie na pozycji {index}",
      group: "Grupa {index}: {value}",
      invalid: "Wyrażenie regularne jest nieprawidłowe.",
      tooManyMatches: "Wyświetlono pierwsze 500 dopasowań",
      inputTooLarge: "Wyrażenie lub tekst przekracza limit tego narzędzia.",
      replacementTooLarge:
        "Zamiana jest zbyt długa lub objęłaby ponad 500 dopasowań.",
      processingFailed: "Ocena wzorca trwała zbyt długo lub nie powiodła się.",
      replacementResult: "Wynik zamiany został zaktualizowany",
      loadSample: "Wczytaj przykład",
      localNote: "Przetwarzanie odbywa się tylko w tej przeglądarce",
    },
  },
  da: {
    title: "Testværktøj til regulære udtryk",
    description:
      "Test regulære JavaScript-udtryk mod tekst, og erstat fund i browseren.",
    guideTitle: "Sådan bruger du testværktøjet",
    guideBody:
      "Indtast et regulært JavaScript-udtryk, vælg flag, og indsæt testtekst. Fund og fangstgrupper opdateres, når du stopper med at skrive. Tilføj kun en erstatningsskabelon, når du vil oprette et erstattet resultat.",
    safetyTitle: "Lokal behandling med tids- og størrelsesgrænser",
    safetyBody:
      "Mønster og tekst forlader ikke denne fane. Evalueringen kører i en separat worker og stoppes, hvis den tager for lang tid. Værktøjet bruger JavaScript-syntaks, ikke PCRE, .NET eller Java.",
    faqs: [
      {
        q: "Hvilken regexmotor bruges?",
        a: "Værktøjet bruger browserens indbyggede JavaScript RegExp-motor.",
      },
      {
        q: "Hvad ændrer flaget g?",
        a: "Med g vises efterfølgende fund; uden g vises kun det første. Erstat alle erstatter stadig alle relevante fund.",
      },
      {
        q: "Uploades mønsteret eller teksten?",
        a: "Nej. Søgning og erstatning sker kun i denne fane, og værktøjet gemmer ikke indholdet.",
      },
    ],
    feature: {
      expressionLabel: "Regulært udtryk",
      expressionPlaceholder: "Indtast et regulært JavaScript-udtryk",
      flagsLabel: "Flag",
      testTextLabel: "Testtekst",
      testTextPlaceholder: "Skriv eller indsæt tekst, der skal testes",
      replacementLabel: "Erstatningsskabelon",
      replacementPlaceholder: "For eksempel: [$1]",
      replacementOutputLabel: "Erstattet resultat",
      replacementOutputPlaceholder: "Det erstattede resultat vises her",
      replaceAction: "Erstat alle",
      resultsLabel: "Fund",
      ready: "Klar",
      enterExpression: "Indtast et regulært udtryk for at begynde.",
      evaluating: "Tester det regulære udtryk…",
      noMatches: "Ingen fund",
      matchSummary: "{count} fund",
      matchAt: "Fund ved {index}",
      group: "Gruppe {index}: {value}",
      invalid: "Det regulære udtryk er ugyldigt.",
      tooManyMatches: "De første 500 fund vises",
      inputTooLarge:
        "Udtrykket eller testteksten overskrider værktøjets grænse.",
      replacementTooLarge:
        "Erstatningen er for lang eller ville påvirke mere end 500 fund.",
      processingFailed:
        "Mønsteret tog for lang tid eller kunne ikke evalueres.",
      replacementResult: "Det erstattede resultat er opdateret",
      loadSample: "Indlæs eksempel",
      localNote: "Behandles kun i denne browser",
    },
  },
  no: {
    title: "Tester for regulære uttrykk",
    description:
      "Test regulære JavaScript-uttrykk mot tekst, og erstatt treff i nettleseren.",
    guideTitle: "Slik bruker du testeren",
    guideBody:
      "Skriv inn et regulært JavaScript-uttrykk, velg flagg og lim inn testtekst. Treff og fangstgrupper oppdateres når du slutter å skrive. Legg bare til en erstatningsmal når du vil lage et erstattet resultat.",
    safetyTitle: "Lokal behandling med tids- og størrelsesgrenser",
    safetyBody:
      "Mønsteret og teksten forlater ikke denne fanen. Evalueringen kjører i en separat worker og stoppes hvis den tar for lang tid. Verktøyet bruker JavaScript-syntaks, ikke PCRE, .NET eller Java.",
    faqs: [
      {
        q: "Hvilken regexmotor brukes?",
        a: "Testeren bruker nettleserens innebygde JavaScript RegExp-motor.",
      },
      {
        q: "Hva endrer flagget g?",
        a: "Med g vises påfølgende treff; uten g vises bare det første. Erstatt alle erstatter fortsatt alle aktuelle treff.",
      },
      {
        q: "Lastes mønsteret eller teksten opp?",
        a: "Nei. Søk og erstatning skjer bare i denne fanen, og verktøyet lagrer ikke innholdet.",
      },
    ],
    feature: {
      expressionLabel: "Regulært uttrykk",
      expressionPlaceholder: "Skriv inn et regulært JavaScript-uttrykk",
      flagsLabel: "Flagg",
      testTextLabel: "Testtekst",
      testTextPlaceholder: "Skriv eller lim inn teksten som skal testes",
      replacementLabel: "Erstatningsmal",
      replacementPlaceholder: "For eksempel: [$1]",
      replacementOutputLabel: "Erstattet resultat",
      replacementOutputPlaceholder: "Det erstattede resultatet vises her",
      replaceAction: "Erstatt alle",
      resultsLabel: "Treff",
      ready: "Klar",
      enterExpression: "Skriv inn et regulært uttrykk for å begynne.",
      evaluating: "Tester det regulære uttrykket…",
      noMatches: "Ingen treff",
      matchSummary: "{count} treff",
      matchAt: "Treff ved {index}",
      group: "Gruppe {index}: {value}",
      invalid: "Det regulære uttrykket er ugyldig.",
      tooManyMatches: "De første 500 treffene vises",
      inputTooLarge:
        "Uttrykket eller testteksten overskrider grensen for verktøyet.",
      replacementTooLarge:
        "Erstatningen er for lang eller ville påvirke mer enn 500 treff.",
      processingFailed:
        "Mønsteret tok for lang tid eller kunne ikke evalueres.",
      replacementResult: "Det erstattede resultatet er oppdatert",
      loadSample: "Last inn eksempel",
      localNote: "Behandles bare i denne nettleseren",
    },
  },
  ar: {
    title: "مختبر التعبيرات النمطية",
    description:
      "اختبر تعبيرات JavaScript النمطية على النص واستبدل التطابقات داخل المتصفح.",
    guideTitle: "طريقة استخدام مختبر التعبيرات النمطية",
    guideBody:
      "أدخل تعبير JavaScript نمطيًا، واختر العلامات المطلوبة، ثم الصق نص الاختبار. تتحدث التطابقات ومجموعات الالتقاط بعد التوقف عن الكتابة. أضف قالب الاستبدال فقط عند الحاجة إلى إنشاء نص بديل.",
    safetyTitle: "معالجة محلية بحدود للوقت والحجم",
    safetyBody:
      "لا يغادر النمط أو النص علامة تبويب المتصفح هذه. يجري التقييم في عامل منفصل ويتوقف إذا استغرق وقتًا طويلًا. تستخدم الأداة صياغة JavaScript لا PCRE أو ‎.NET أو Java.",
    faqs: [
      {
        q: "ما محرك التعبيرات النمطية المستخدم؟",
        a: "تستخدم الأداة محرك JavaScript RegExp المدمج في المتصفح.",
      },
      {
        q: "ماذا تغير العلامة g؟",
        a: "تعرض العلامة g التطابقات المتتابعة، ومن دونها يظهر التطابق الأول فقط. يظل زر استبدال الكل مستبدلًا لجميع التطابقات المناسبة.",
      },
      {
        q: "هل يُرفع النمط أو النص؟",
        a: "لا. تتم المطابقة والاستبدال داخل علامة التبويب هذه فقط، ولا تحفظ الأداة المحتوى.",
      },
    ],
    feature: {
      expressionLabel: "التعبير النمطي",
      expressionPlaceholder: "أدخل تعبير JavaScript نمطيًا",
      flagsLabel: "العلامات",
      testTextLabel: "نص الاختبار",
      testTextPlaceholder: "اكتب النص المراد اختباره أو الصقه",
      replacementLabel: "قالب الاستبدال",
      replacementPlaceholder: "مثال: [$1]",
      replacementOutputLabel: "ناتج الاستبدال",
      replacementOutputPlaceholder: "سيظهر ناتج الاستبدال هنا",
      replaceAction: "استبدال الكل",
      resultsLabel: "نتائج التطابق",
      ready: "جاهز",
      enterExpression: "أدخل تعبيرًا نمطيًا للبدء.",
      evaluating: "جارٍ اختبار التعبير النمطي…",
      noMatches: "لا توجد تطابقات",
      matchSummary: "عدد التطابقات: {count}",
      matchAt: "تطابق عند {index}",
      group: "المجموعة {index}: {value}",
      invalid: "التعبير النمطي غير صالح.",
      tooManyMatches: "تُعرض أول 500 مطابقة",
      inputTooLarge: "يتجاوز التعبير أو نص الاختبار حد هذه الأداة.",
      replacementTooLarge: "الاستبدال طويل جدًا أو سيؤثر في أكثر من 500 تطابق.",
      processingFailed: "استغرق النمط وقتًا طويلًا أو تعذر تقييمه.",
      replacementResult: "تم تحديث ناتج الاستبدال",
      loadSample: "تحميل مثال",
      localNote: "تتم المعالجة في هذا المتصفح فقط",
    },
  },
  "zh-TW": {
    title: "正規表示式測試器",
    description: "在瀏覽器中用文字測試 JavaScript 正規表示式並取代相符內容。",
    guideTitle: "如何使用正規表示式測試器",
    guideBody:
      "輸入 JavaScript 正規表示式、選擇需要的旗標，再貼上測試文字。停止輸入後，相符項目與擷取群組會自動更新。只有需要產生取代結果時，才要填寫取代範本。",
    safetyTitle: "在本機處理並限制時間與大小",
    safetyBody:
      "表示式與文字不會離開這個瀏覽器分頁。評估會在獨立 Worker 中執行，耗時過久時便會停止。本工具使用 JavaScript 語法，不是 PCRE、.NET 或 Java 語法。",
    faqs: [
      {
        q: "使用哪一種正規表示式引擎？",
        a: "使用瀏覽器內建的 JavaScript RegExp 引擎。",
      },
      {
        q: "g 旗標會改變什麼？",
        a: "選取 g 時會列出後續相符項目；未選取時只顯示第一個。「全部取代」仍會取代所有符合條件的項目。",
      },
      {
        q: "表示式或文字會上傳嗎？",
        a: "不會。比對與取代只在這個分頁中進行，本工具不會儲存內容。",
      },
    ],
    feature: {
      expressionLabel: "正規表示式",
      expressionPlaceholder: "輸入 JavaScript 正規表示式",
      flagsLabel: "旗標",
      testTextLabel: "測試文字",
      testTextPlaceholder: "輸入或貼上要測試的文字",
      replacementLabel: "取代範本",
      replacementPlaceholder: "例如：[$1]",
      replacementOutputLabel: "取代結果",
      replacementOutputPlaceholder: "取代結果會顯示在這裡",
      replaceAction: "全部取代",
      resultsLabel: "相符結果",
      ready: "準備完成",
      enterExpression: "請輸入正規表示式以開始測試。",
      evaluating: "正在測試正規表示式…",
      noMatches: "沒有相符項目",
      matchSummary: "相符項目：{count}",
      matchAt: "在 {index} 處相符",
      group: "群組 {index}：{value}",
      invalid: "正規表示式無效。",
      tooManyMatches: "僅顯示前 500 個相符項目",
      inputTooLarge: "正規表示式或測試文字超過本工具的處理上限。",
      replacementTooLarge: "取代內容過長，或會影響超過 500 個相符項目。",
      processingFailed: "表示式耗時過久或無法評估。",
      replacementResult: "取代結果已更新",
      loadSample: "載入範例",
      localNote: "只在這個瀏覽器中處理",
    },
  },
  tr: {
    title: "Düzenli İfade Test Aracı",
    description:
      "JavaScript düzenli ifadelerini metin üzerinde test edin ve eşleşmeleri tarayıcıda değiştirin.",
    guideTitle: "Düzenli ifade test aracı nasıl kullanılır?",
    guideBody:
      "Bir JavaScript düzenli ifadesi girin, gerekli bayrakları seçin ve test metnini yapıştırın. Yazmayı bıraktığınızda eşleşmeler ile yakalama grupları güncellenir. Yalnızca değiştirilmiş çıktı gerektiğinde bir değiştirme şablonu ekleyin.",
    safetyTitle: "Süre ve boyut sınırlarıyla yerel işleme",
    safetyBody:
      "Desen ve metin bu tarayıcı sekmesinden çıkmaz. Değerlendirme ayrı bir worker içinde çalışır ve fazla uzun sürerse durdurulur. Araç PCRE, .NET veya Java değil, JavaScript söz dizimini kullanır.",
    faqs: [
      {
        q: "Hangi düzenli ifade motoru kullanılır?",
        a: "Araç, tarayıcıdaki yerleşik JavaScript RegExp motorunu kullanır.",
      },
      {
        q: "g bayrağı neyi değiştirir?",
        a: "g seçiliyken art arda gelen eşleşmeler, seçili değilken yalnızca ilk eşleşme gösterilir. Tümünü değiştir yine tüm uygun eşleşmeleri değiştirir.",
      },
      {
        q: "Desen veya metin yüklenir mi?",
        a: "Hayır. Eşleştirme ve değiştirme yalnızca bu sekmede yapılır; araç içeriği kaydetmez.",
      },
    ],
    feature: {
      expressionLabel: "Düzenli ifade",
      expressionPlaceholder: "Bir JavaScript düzenli ifadesi girin",
      flagsLabel: "Bayraklar",
      testTextLabel: "Test metni",
      testTextPlaceholder: "Test edilecek metni yazın veya yapıştırın",
      replacementLabel: "Değiştirme şablonu",
      replacementPlaceholder: "Örneğin: [$1]",
      replacementOutputLabel: "Değiştirme çıktısı",
      replacementOutputPlaceholder: "Değiştirme çıktısı burada görünür",
      replaceAction: "Tümünü değiştir",
      resultsLabel: "Eşleşmeler",
      ready: "Hazır",
      enterExpression: "Başlamak için bir düzenli ifade girin.",
      evaluating: "Düzenli ifade test ediliyor…",
      noMatches: "Eşleşme yok",
      matchSummary: "{count} eşleşme",
      matchAt: "{index} konumunda eşleşme",
      group: "Grup {index}: {value}",
      invalid: "Düzenli ifade geçersiz.",
      tooManyMatches: "İlk 500 eşleşme gösteriliyor",
      inputTooLarge: "İfade veya test metni bu aracın sınırını aşıyor.",
      replacementTooLarge:
        "Değiştirme çok uzun veya 500’den fazla eşleşmeyi etkileyecek.",
      processingFailed: "Desen çok uzun sürdü veya değerlendirilemedi.",
      replacementResult: "Değiştirme çıktısı güncellendi",
      loadSample: "Örnek yükle",
      localNote: "Yalnızca bu tarayıcıda işlenir",
    },
  },
} satisfies Record<Locale, RegexLocaleText>;

export function regexTesterFor(
  locale: Locale,
  actions: SharedActions,
): ToolPageCopy<RegexTesterCopy> {
  const text = texts[locale];
  return {
    title: text.title,
    heading: text.title,
    description: text.description,
    mobileDescription: text.description,
    guideTitle: text.guideTitle,
    guideBody: text.guideBody,
    safetyTitle: text.safetyTitle,
    safetyBody: text.safetyBody,
    faqs: text.faqs,
    feature: { ...text.feature, ...actions },
  };
}

export function regexSearchTermsFor(locale: Locale): readonly string[] {
  return [texts[locale].title, "regex", "regexp", "JavaScript regex"];
}
