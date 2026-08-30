import { createNewToolLocale, type NewToolLocaleSeed } from "./factory";
import { formatterSubnetFor } from "./formatter-subnet";
import { backgroundRemoverFor } from "./background-remover";

const backgroundRemover = backgroundRemoverFor("pt-BR");

const seed = {
  formatterSubnet: formatterSubnetFor("pt-BR"),
  background: backgroundRemover.copy,
  ui: {
    clear: "Limpar",
    copy: "Copiar",
    download: "Baixar",
    openFile: "Abrir arquivo",
    chooseImage: "Escolher imagem",
    dropFile: "Solte uma imagem aqui.",
    ready: "Pronto",
    working: "Processando…",
    complete: "Concluído",
    unchanged: "Nenhuma alteração necessária",
    outdated: "O resultado está desatualizado",
    copied: "Copiado",
    copyFailed: "Não foi possível copiar",
    tooLarge: "A entrada é grande demais para ser processada com segurança.",
    failed: "Falha no processamento. Verifique a entrada e tente novamente.",
    resultHere: "O resultado aparecerá aqui.",
    localTitle: "Processamento somente neste navegador",
    localBody:
      "Sua entrada e os resultados não são enviados nem armazenados. Eles permanecem nesta aba do navegador.",
    guideTitle: "Como usar {name}",
    safetyTitle: "Processamento local e privado",
    faqWhat: "Para que serve a ferramenta “{name}”?",
    faqPrivacy: "Meus dados são enviados?",
    faqCheck: "O que devo verificar ao usar a ferramenta “{name}”?",
  },
  ai: {
    input: "Texto original",
    output: "Texto limpo",
    placeholder: "Cole um texto que possa conter caracteres Unicode ocultos.",
    run: "Remover caracteres ocultos",
    report: "Relatório de remoção",
    removed: "Caracteres removidos",
    normalized: "Espaços normalizados",
    noChanges: "Nenhum dos caracteres ocultos selecionados foi encontrado.",
    count: "{count} removido(s)",
    advanced: "Opções avançadas de Unicode",
    advancedWarning:
      "Estas opções podem alterar a grafia, os emojis ou a forma da escrita. Ative-as somente se você conhecer a estrutura do texto original.",
    joinControls: "Remover ZWJ e ZWNJ",
    joinWarning:
      "Pode quebrar sequências de emojis e a ligação de caracteres em árabe, persa ou escritas indianas.",
    variationSelectors: "Remover seletores de variação",
    variationWarning: "Pode alterar a aparência de emojis ou glifos CJK.",
    combiningMarks: "Remover marcas combinantes",
    combiningWarning:
      "Pode remover acentos, sinais vocálicos e outras marcas com significado.",
    noBreakSpaces: "Normalizar espaços inseparáveis",
    noBreakNote: "Converte espaços do tipo NBSP em espaços comuns.",
    kinds: [
      "Espaço de largura zero",
      "Conector de palavras",
      "Marca de ordem de bytes",
      "Hífen condicional",
      "Controle bidirecional",
      "Separador invisível",
      "Controle de junção",
      "Seletor de variação",
      "Marca combinante",
      "Espaço inseparável ou numérico",
      "Espaço estreito inseparável",
    ],
  },
  url: {
    mode: "Modo de conversão de URL",
    encode: "Codificar",
    decode: "Decodificar",
    encodeInput: "Texto ou URL para codificar",
    decodeInput: "Valor de URL codificado",
    encodeOutput: "Resultado codificado",
    decodeOutput: "Resultado decodificado",
    encodePlaceholder: "Exemplo: https://example.com/search?q=olá mundo",
    decodePlaceholder: "Exemplo: ol%C3%A1%20mundo%3Fpagina%3D1",
    scope: "Escopo da codificação",
    component: "Componente da URL",
    uri: "URI completa",
    formSpace: "Usar + para espaços em dados de formulário",
    recursive: "Decodificar repetidamente",
    passLimit: "Máximo de passagens",
    encoded: "Codificação de URL concluída",
    decoded: "Decodificação de URL concluída",
    passCount: "Decodificado em {count} passagem(ns)",
    limitReached: "Ainda há camadas codificadas após o limite de passagens.",
    errors: [
      "Insira um valor primeiro.",
      "Uma sequência de escape percentual está incompleta ou é inválida.",
      "Os bytes decodificados não formam um UTF-8 válido.",
      "Escolha um limite de 1 a 10 passagens.",
    ],
  },
  hash: {
    input: "Texto ou arquivo",
    placeholder:
      "Digite um texto para calcular os hashes SHA-256, SHA-512, SHA-1 e MD5.",
    results: "Valores de hash",
    resultLabel: "Valor de hash {algorithm}",
    copyLabel: "Copiar hash {algorithm}",
    fileSelected: "Selecionado: {name} ({size})",
    drop: "Solte um arquivo aqui para calcular o hash localmente.",
    textTooLarge: "O texto é grande demais para esta sessão do navegador.",
    fileTooLarge:
      "O arquivo excede o limite de segurança do processamento local.",
    legacyWarning:
      "MD5 e SHA-1 estão disponíveis para verificações de compatibilidade, não para armazenar senhas nem criar novos projetos de segurança.",
    expectedChecksum: "Checksum esperado",
    checksumMatch: "Corresponde",
    checksumMismatch: "Não corresponde",
    checksumInvalid: "Digite um checksum hexadecimal compatível.",
    empty: "Digite um texto ou escolha um arquivo primeiro.",
    unavailable:
      "Este navegador não consegue calcular um dos hashes solicitados.",
  },
  jwt: {
    input: "Token JWT",
    placeholder: "Cole um JWT de três partes: header.payload.signature",
    header: "Cabeçalho",
    payload: "Payload",
    signature: "Assinatura",
    copyHeader: "Copiar cabeçalho JWT decodificado",
    copyPayload: "Copiar payload JWT decodificado",
    copySignature: "Copiar bytes da assinatura JWT",
    signatureBytes: "{count} bytes",
    timestamps: "Claims de tempo",
    expires: "Expira em (exp)",
    notBefore: "Válido a partir de (nbf)",
    issuedAt: "Emitido em (iat)",
    invalidTimestamp: "Este claim não contém um timestamp numérico válido.",
    noTimestamps: "Nenhum claim exp, nbf ou iat foi encontrado.",
    noVerifyTitle: "Assinatura não verificada",
    noVerifyBody:
      "A decodificação apenas revela o conteúdo do token. Ela não comprova quem o emitiu nem se a assinatura é válida.",
    errors: [
      "Cole um JWT primeiro.",
      "Um JWT deve conter exatamente três partes separadas por pontos.",
      "O cabeçalho JWT está vazio.",
      "O payload JWT está vazio.",
      "Um segmento não é um Base64URL válido.",
      "Um segmento não é um UTF-8 válido.",
      "O cabeçalho não é um JSON válido.",
      "O payload não é um JSON válido.",
      "O cabeçalho deve ser um objeto JSON.",
      "O payload deve ser um objeto JSON.",
    ],
  },
  qr: {
    input: "Texto ou URL",
    placeholder: "Insira o texto ou a URL que será incluído no código QR.",
    preview: "Prévia do código QR",
    previewEmpty: "Insira um conteúdo para gerar um código QR.",
    options: "Opções do código QR",
    correction: "Correção de erros",
    correctionLevels: ["Baixa (L)", "Média (M)", "Quartil (Q)", "Alta (H)"],
    quietZone: "Margem livre",
    quietZones: [
      "Nenhuma",
      "2 módulos",
      "4 módulos (recomendado)",
      "8 módulos",
    ],
    generate: "Gerar código QR",
    png: "Baixar PNG",
    svg: "Baixar SVG",
    empty: "Insira um texto ou uma URL primeiro.",
    tooLong: "O conteúdo é longo demais para este nível de correção de erros.",
    generationFailed: "Não foi possível gerar o código QR.",
    downloadFailed: "Não foi possível preparar a imagem para download.",
    upload: "Imagem do código QR",
    formats: "PNG, JPEG, WebP, GIF ou BMP de até 10 MB",
    camera: "Leitor pela câmera",
    cameraHint:
      "Permita o acesso à câmera para fazer a leitura contínua. As URLs decodificadas nunca são abertas automaticamente.",
    startCamera: "Iniciar câmera",
    stopCamera: "Parar câmera",
    scanResult: "Conteúdo decodificado",
    scanPlaceholder: "O texto lido aparecerá aqui.",
    urlDetected: "URL detectada",
    reading: "Lendo a imagem…",
    starting: "Iniciando a câmera…",
    scanning: "Procurando um código QR…",
    invalidImage: "Escolha uma imagem válida em um formato compatível.",
    noCode: "Nenhum código QR legível foi encontrado nesta imagem.",
    unsupported: "Este navegador não oferece leitura pela câmera.",
    denied: "A permissão da câmera foi negada.",
    unavailable: "Nenhuma câmera adequada está disponível.",
    scanFailed: "Não foi possível ler o código QR.",
  },
  data: {
    convert: "Converter",
    inputPlaceholder: "Cole os dados de origem aqui.",
    outputPlaceholder: "O resultado convertido aparecerá aqui.",
    drop: "Solte um arquivo de texto compatível aqui.",
    readFailed: "Não foi possível ler o arquivo.",
    errorAt: "{message} Linha {line}, coluna {column}.",
    delimiter: "Delimitador CSV",
    auto: "Detectar automaticamente",
    comma: "Vírgula (,)",
    semicolon: "Ponto e vírgula (;)",
    tab: "Tabulação",
    pipe: "Barra vertical (|)",
    firstHeader: "Usar a primeira linha como cabeçalho",
    pretty: "Formatar JSON com recuo",
    errors: [
      "O CSV contém aspas não fechadas ou um campo malformado.",
      "Nenhuma tabela Markdown com uma linha separadora foi encontrada.",
      "A tabela Markdown está malformada.",
      "A entrada não é um JSON válido.",
      "O JSON deve ser uma matriz de objetos.",
      "Um cabeçalho CSV está vazio.",
      "Os cabeçalhos CSV devem ser exclusivos.",
    ],
  },
  pages: {
    "background-remover": backgroundRemover.page,
    "ai-watermark-remover": {
      title: "Removedor de marca-d’água de IA e caracteres ocultos",
      description:
        "Encontra e remove artefatos Unicode realmente ocultos, muitas vezes copiados do GPT, Claude, PDFs ou páginas da web. Esta ferramenta não detecta se um texto foi escrito por IA.",
      guide:
        "Cole o texto e confira primeiro o resultado limpo; depois, verifique os nomes exatos, as quantidades e os pontos de código U+ removidos. As opções que podem alterar a escrita ficam desativadas por padrão.",
      terms: [
        "remover marca d’água IA",
        "caracteres ocultos GPT",
        "caracteres ocultos Claude",
        "remover espaço largura zero",
        "limpar texto Unicode",
      ],
    },
    "url-encode": {
      title: "Codificador de URL",
      description:
        "Aplica codificação percentual a textos, valores de consulta ou URIs completas conforme o padrão correto do navegador.",
      guide:
        "Escolha componente da URL para um único valor de consulta ou URI completa para preservar os separadores do endereço. Use o sinal de mais para espaços somente em dados de formulário.",
      terms: [
        "codificar URL",
        "codificação percentual",
        "encodeURIComponent",
        "string de consulta",
      ],
    },
    "url-decode": {
      title: "Decodificador de URL",
      description:
        "Decodifica URLs e valores de consulta com codificação percentual, com um modo opcional de múltiplas passagens limitadas.",
      guide:
        "Cole o valor codificado, escolha o escopo e só use a decodificação repetida se souber que a origem contém codificação aninhada.",
      terms: [
        "decodificar URL",
        "decodificação percentual",
        "decodeURIComponent",
        "string de consulta",
      ],
    },
    "hash-generator": {
      title: "Gerador de hash",
      description:
        "Calcula localmente os checksums SHA-256, SHA-512, SHA-1 e MD5 de textos ou arquivos.",
      guide:
        "Digite um texto ou escolha um arquivo e compare exatamente o algoritmo necessário. Hashes verificam igualdade; sozinhos, não criptografam dados nem armazenam senhas com segurança.",
      terms: ["SHA-256", "SHA-512", "MD5", "checksum", "hash de arquivo"],
    },
    "jwt-decoder": {
      title: "Decodificador de JWT",
      description:
        "Decodifica cabeçalho, payload, bytes da assinatura e claims de tempo de um JWT sem enviar o token.",
      guide:
        "Confira o JSON e os timestamps decodificados, mas verifique a assinatura e os claims no sistema que controla a chave de assinatura. A decodificação por si só não estabelece confiança.",
      terms: [
        "decodificador JWT",
        "JSON Web Token",
        "payload JWT",
        "cabeçalho JWT",
      ],
    },
    "qr-code-generator": {
      title: "Gerador de código QR",
      description:
        "Cria um código QR estático compatível com o padrão para um texto ou uma URL e permite baixá-lo em PNG ou SVG.",
      guide:
        "Insira o conteúdo exato, mantenha uma margem livre de quatro módulos para uma leitura confiável e aumente a correção de erros se o código puder ficar parcialmente encoberto.",
      terms: ["gerador de código QR", "QR PNG", "QR SVG", "QR estático"],
    },
    "qr-code-scanner": {
      title: "Leitor de código QR",
      description:
        "Lê localmente um código QR de uma imagem ou da câmera sem abrir automaticamente os links decodificados.",
      guide:
        "Use uma imagem nítida e bem iluminada, com toda a margem livre visível. Confira e copie o valor decodificado antes de decidir se uma URL é segura.",
      terms: [
        "ler código QR",
        "ler QR de imagem",
        "leitor QR câmera",
        "decodificar QR",
      ],
    },
    "csv-to-markdown": {
      title: "Conversor de CSV para Markdown",
      description:
        "Transforma linhas CSV em uma tabela Markdown limpa, com detecção de delimitador e escape das células.",
      guide:
        "Confira o delimitador e se a primeira linha é um cabeçalho. Células com várias linhas viram quebras compatíveis com tabelas, e as barras verticais são escapadas.",
      inputLabel: "Entrada CSV",
      outputLabel: "Tabela Markdown",
      inputPlaceholder: "nome,pontuação\nAna,92",
      terms: ["CSV para Markdown", "tabela Markdown", "conversor CSV"],
    },
    "markdown-to-csv": {
      title: "Conversor de Markdown para CSV",
      description:
        "Converte uma tabela Markdown em CSV compatível com planilhas e ferramentas de dados.",
      guide:
        "Inclua uma linha de cabeçalho e uma linha separadora na tabela Markdown e escolha o delimitador exigido pelo aplicativo de destino.",
      inputLabel: "Tabela Markdown",
      outputLabel: "Saída CSV",
      inputPlaceholder: "| nome | pontuação |\n| --- | --- |\n| Ana | 92 |",
      terms: ["Markdown para CSV", "tabela para CSV", "conversor Markdown"],
    },
    "json-to-csv": {
      title: "Conversor de JSON para CSV",
      description:
        "Converte uma matriz de objetos JSON em CSV usando uma união estável das chaves dos objetos.",
      guide:
        "Use uma matriz de objetos no nível superior. Valores aninhados são preservados como strings JSON compactas; confira como a planilha de destino deve tratá-los.",
      inputLabel: "Matriz JSON",
      outputLabel: "Saída CSV",
      inputPlaceholder: '[{"nome":"Ana","pontuação":92}]',
      terms: ["JSON para CSV", "matriz JSON para CSV", "conversor de dados"],
    },
    "csv-to-json": {
      title: "Conversor de CSV para JSON",
      description:
        "Converte CSV em uma matriz de objetos JSON usando a primeira linha como nomes dos campos.",
      guide:
        "Todos os cabeçalhos devem estar preenchidos e ser exclusivos. Confira a detecção do delimitador antes de converter dados com vírgulas, aspas ou células com várias linhas.",
      inputLabel: "Entrada CSV",
      outputLabel: "Matriz JSON",
      inputPlaceholder: "nome,pontuação\nAna,92",
      terms: ["CSV para JSON", "analisador CSV", "matriz JSON"],
    },
    "html-to-markdown": {
      title: "Conversor de HTML para Markdown",
      description:
        "Converte a estrutura HTML em Markdown legível, incluindo títulos, links, listas, código e tabelas.",
      guide:
        "Cole o fragmento HTML que você deseja converter. Confira layouts complexos e conteúdo incorporado, pois o Markdown não consegue representar todos os comportamentos do HTML.",
      inputLabel: "Entrada HTML",
      outputLabel: "Saída Markdown",
      inputPlaceholder: "<h1>Título</h1><p>Olá, <strong>mundo</strong>.</p>",
      terms: ["HTML para Markdown", "conversor HTML", "Turndown"],
    },
    "markdown-to-html": {
      title: "Conversor de Markdown para HTML",
      description:
        "Renderiza Markdown como HTML com tabelas GFM, listas, links e blocos de código cercados comuns.",
      guide:
        "Converta apenas o Markdown que pretende usar e higienize o HTML novamente antes de inserir uma saída não confiável em uma página da web.",
      inputLabel: "Entrada Markdown",
      outputLabel: "Saída HTML",
      inputPlaceholder: "# Título\n\nOlá, **mundo**.",
      terms: ["Markdown para HTML", "renderizador Markdown", "GFM"],
    },
  },
} satisfies NewToolLocaleSeed;

export const { tools, catalog } = createNewToolLocale(seed);
