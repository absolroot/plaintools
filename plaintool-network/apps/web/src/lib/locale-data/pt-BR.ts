import type { LocaleBundle } from "./bundle";

export const ptBRBundle: LocaleBundle = {
  site: {
    languageName: "Português (Brasil)",
    metaTitle: "Decodificador e codificador Base64 — rápido, privado e online",
    metaDescription:
      "Decodifique Base64 em texto ou arquivos e codifique texto ou arquivos online. Compatível com Base64URL, preenchimento ausente, URI de dados e codificações de caracteres legadas.",
    decodeMetaTitle: "Decodificador Base64 para texto e arquivos | AbsolTools",
    encodeMetaTitle: "Codificador Base64 para texto e arquivos | AbsolTools",
    skipToContent: "Ir para o conteúdo",
    languageNavLabel: "Idioma",
    legalNavLabel: "Informações legais e contato",
    modeLabel: "Modo de conversão",
    heading: "Decodifique Base64 online.",
    subheading:
      "Cole o texto em Base64 ou abra um arquivo. Base64 padrão, Base64URL, preenchimento ausente e URI de dados são processados localmente.",
    encodeHeading: "Codifique texto ou arquivos em Base64 online.",
    encodeSubheading:
      "Digite um texto ou abra um arquivo. Converta texto UTF-8 e arquivos binários em Base64 padrão ou Base64URL sem fazer upload.",
    decode: "Decodificar",
    encode: "Codificar",
    inputLabel: "Entrada Base64",
    outputLabel: "Resultado decodificado",
    encodeInputLabel: "Texto ou arquivo de entrada",
    encodeOutputLabel: "Resultado em Base64",
    decodePlaceholder: "Exemplo: SGVsbG8sIFBsYWluVG9vbCE=",
    encodePlaceholder: "Exemplo: Olá, AbsolTools!",
    outputPlaceholder: "O resultado aparecerá aqui.",
    openFile: "Abrir arquivo",
    runDecode: "Decodificar agora",
    runEncode: "Codificar agora",
    options: "Opções",
    detected: "Detectado",
    decodeComplete: "Decodificação concluída",
    encodeComplete: "Codificação concluída",
    charset: "Codificação de caracteres",
    variant: "Formato Base64",
    auto: "Detectar automaticamente",
    standard: "Padrão",
    urlSafe: "Seguro para URL",
    strict: "Validar estritamente",
    lineByLine: "Decodificar cada linha separadamente",
    autoRepair: "Corrigir espaços e preenchimento",
    lenientRepair: "Remover outros caracteres inválidos",
    outputView: "Formato do resultado",
    text: "Texto",
    hex: "Hexadecimal",
    includePadding: "Incluir preenchimento =",
    mimeWrap: "Quebrar a cada 76 caracteres",
    dataUri: "Adicionar prefixo de URI de dados",
    dropHint:
      "Solte um arquivo de texto ou binário em qualquer lugar do conversor.",
    fileTooLarge: "O tamanho máximo da entrada é 100 MiB.",
    binaryOutput:
      "Dados binários detectados. Confira o tipo de arquivo e faça o download em vez de executá-lo diretamente.",
    executableWarning:
      "Arquivo executável detectado. Não execute arquivos decodificados de uma fonte não confiável.",
    imagePreview: "Prévia da imagem",
    errors: {
      "empty-input": "Primeiro, digite um texto ou abra um arquivo.",
      "invalid-character":
        "Este valor contém um caractere que não é válido em Base64.",
      "invalid-length":
        "O valor Base64 está truncado ou tem um comprimento impossível.",
      "decode-failed": "Não foi possível decodificar o valor.",
      "encode-failed": "Não foi possível codificar o arquivo.",
      "unsupported-charset":
        "Seu navegador não é compatível com esta codificação de caracteres.",
      "file-too-large":
        "Esta entrada ultrapassa o limite de segurança de 100 MiB.",
    },
    repairs: {
      "data-uri-removed": "Prefixo de URI de dados removido",
      "whitespace-removed": "Espaços em branco removidos",
      "url-alphabet-normalized": "Alfabeto Base64URL detectado",
      "padding-added": "Preenchimento ausente adicionado",
      "invalid-characters-removed": "Caracteres inválidos removidos",
    },
    guideTitle: "Como decodificar Base64",
    guideIntro:
      "Base64 é um formato de codificação, não uma criptografia. Qualquer pessoa que tenha o valor pode decodificá-lo.",
    guideSteps: [
      "Cole um valor Base64 ou abra um arquivo que contenha esse valor.",
      "A ferramenta detecta o formato e aplica correções comuns, como remover espaços ou restaurar o preenchimento ausente.",
      "Copie o texto legível ou baixe o resultado binário como arquivo.",
    ],
    encodeGuideTitle: "Como codificar em Base64",
    encodeGuideIntro:
      "Base64 transforma texto ou bytes binários em caracteres imprimíveis. Ele não criptografa nem protege os dados de origem.",
    encodeGuideSteps: [
      "Digite o texto ou abra o arquivo que deseja codificar.",
      "Escolha Base64 padrão ou o alfabeto seguro para URL e ajuste o preenchimento ou a quebra de linha somente se o destino exigir.",
      "Copie o resultado Base64 ou baixe-o como arquivo de texto.",
    ],
    safetyTitle: "Sua entrada não é armazenada.",
    safetyBody:
      "O site não armazena sua entrada nem os resultados e não os envia a um servidor. Tudo é processado na sessão atual do navegador e desaparece quando você recarrega ou fecha a página.",
    detailsTitle: "Padrões e tratamento da entrada",
    detailsBody:
      "Por padrão, a ferramenta segue a RFC 4648 e aceita os alfabetos padrão e seguro para URL, preenchimento opcional, espaços MIME e prefixos de URI de dados. Ative a validação estrita quando o formato exato for importante.",
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        q: "Base64 é criptografia?",
        a: "Não. Base64 transforma dados binários em texto imprimível, sem oferecer sigilo nem autenticação.",
      },
      {
        q: "Por que não consigo ler o resultado decodificado?",
        a: "O resultado pode ser um arquivo, dados compactados ou criptografados, ou texto em outra codificação de caracteres. Tente baixar o arquivo ou escolher outra codificação.",
      },
      {
        q: "Este site faz upload da minha entrada?",
        a: "Não. A conversão ocorre no navegador. Sua entrada, seus arquivos e os resultados não são enviados a um servidor.",
      },
    ],
    encodeFaqs: [
      {
        q: "Base64 é criptografia?",
        a: "Não. Base64 transforma dados binários em texto imprimível, sem oferecer sigilo nem autenticação.",
      },
      {
        q: "Devo usar Base64 padrão ou Base64URL?",
        a: "Use Base64 padrão para arquivos e dados em geral. Use Base64URL quando o valor precisar aparecer com segurança em uma URL ou nome de arquivo.",
      },
      {
        q: "Este site faz upload da minha entrada?",
        a: "Não. A conversão ocorre no navegador. Sua entrada, seus arquivos e os resultados não são enviados a um servidor.",
      },
    ],
    advertisement: "Publicidade",
    integrationState: {
      enabled: "ativados com controles de consentimento",
      disabled: "desativados",
    },
    legalNav: {
      about: "Sobre",
      privacy: "Privacidade",
      cookies: "Cookies",
      terms: "Termos",
      contact: "Contato",
    },
    legal: {
      about: {
        title: "Sobre",
        intro:
          "O AbsolTools oferece ferramentas online para tarefas de texto, dados, tempo e codificação.",
        sections: [
          {
            title: "O que criamos",
            body: [
              "Cada ferramenta realiza uma tarefa específica sem exigir uma conta. As entradas e os resultados são processados no seu navegador.",
            ],
          },
          {
            title: "Contato",
            body: [
              "Envie dúvidas, relatos de erros e solicitações de privacidade para {{email}}.",
            ],
          },
        ],
      },
      privacy: {
        title: "Política de privacidade",
        intro:
          "Esta política diferencia as entradas e os resultados das ferramentas dos dados do site, de análise e de publicidade.",
        sections: [
          {
            title: "Entradas e resultados das ferramentas",
            body: [
              "Textos, arquivos, JSON, valores de data e hora, bytes decodificados e resultados gerados são processados no navegador. As entradas e os resultados não são enviados nem armazenados em um servidor.",
            ],
          },
          {
            title: "Disponibilização do site",
            body: [
              "{{host_provider}} disponibiliza e protege este site estático e pode processar dados de conexão, como endereço IP, horário da solicitação, informações do navegador e URL solicitada. A configuração de retenção de logs informada é {{host_log_retention}}. Política do provedor: {{host_privacy_url}}.",
            ],
          },
          {
            title: "Análise e publicidade",
            body: [
              "O Google Analytics e o Google AdSense estão atualmente {{integration_state}}. Quando ativados, os detalhes sobre dispositivo, uso, cookies, consentimento, retenção e transferências internacionais serão informados aqui e gerenciados nas opções de privacidade. Por definição, entradas e resultados das ferramentas ficam fora dos eventos de análise e publicidade.",
            ],
          },
          {
            title: "Cookies e coleta automática",
            body: [
              "As ferramentas não armazenam entradas nem resultados em cookies ou no armazenamento do navegador. Se você escolher um tema, o site guarda apenas light ou dark no armazenamento local e não transmite esse valor. A tecnologia de segurança da hospedagem pode usar somente o armazenamento estritamente necessário quando isso estiver documentado pelo provedor escolhido. O armazenamento opcional de análise e publicidade permanece bloqueado enquanto essas integrações estiverem desativadas.",
            ],
          },
          {
            title: "Retenção e exclusão",
            body: [
              "O operador não retém entradas nem resultados das ferramentas. Os dados de solicitações à hospedagem seguem a retenção do provedor indicada acima. As mensagens de contato são mantidas apenas pelo tempo necessário para responder, cumprir obrigações legais ou tratar abusos; depois, são excluídas ou anonimizadas.",
            ],
          },
          {
            title: "Destinatários e transferências internacionais",
            body: [
              "O provedor de hospedagem escolhido pode processar dados de solicitação fora do seu país, nos locais e com as garantias descritas em sua política. Antes de ativar análise, publicidade, uma plataforma de consentimento ou outro destinatário, esta seção deverá identificar destinatário, países, finalidade, dados, momento, método, período de retenção e fundamento da transferência exigidos pela legislação aplicável.",
            ],
          },
          {
            title: "Seus direitos e contato",
            body: [
              "Quando aplicável, você pode solicitar acesso, correção, exclusão, restrição, oposição, portabilidade ou retirada do consentimento pelo endereço {{email}}. Poderemos solicitar uma verificação razoável antes de atender ao pedido.",
            ],
          },
          {
            title: "Crianças, segurança e alterações",
            body: [
              "Esta ferramenta de uso geral para desenvolvedores não é direcionada a crianças. Usamos uma arquitetura estática, com processamento local no navegador, e políticas restritivas do navegador para reduzir riscos, mas nenhum serviço é totalmente seguro. Alterações relevantes nesta política serão datadas nesta página. Data de vigência: {{date}}.",
            ],
          },
        ],
      },
      cookies: {
        title: "Política de cookies",
        intro:
          "As ferramentas não precisam de cookies para processar entradas.",
        sections: [
          {
            title: "Uso atual",
            body: [
              "A análise e a publicidade estão atualmente {{integration_state}}. O site não armazena entradas nem resultados em cookies ou no armazenamento local. Apenas a preferência de tema escolhida (light ou dark) é salva no armazenamento local, e esse valor não é transmitido.",
            ],
          },
          {
            title: "Se as integrações forem ativadas",
            body: [
              "Uma plataforma de consentimento controlará o armazenamento necessário de preferências, análise e publicidade. Um controle de privacidade permanente permitirá revisar ou retirar o consentimento.",
            ],
          },
        ],
      },
      terms: {
        title: "Termos de uso",
        intro: "O uso desta ferramenta gratuita está sujeito a estes termos.",
        sections: [
          {
            title: "Serviço",
            body: [
              "O serviço é fornecido no estado em que se encontra, sem garantias de precisão, disponibilidade, adequação a uma finalidade específica ou funcionamento ininterrupto. Confira resultados importantes de forma independente.",
            ],
          },
          {
            title: "Uso seguro e legal",
            body: [
              "Não use o serviço para atacar sistemas, violar a lei ou direitos de terceiros nem distribuir conteúdo nocivo. Nunca execute um arquivo decodificado de uma fonte não confiável.",
            ],
          },
          {
            title: "Responsabilidade e terceiros",
            body: [
              "Na medida permitida pelas normas obrigatórias, o operador não responde por perdas indiretas ou consequenciais. Anúncios e links de terceiros não representam endosso.",
            ],
          },
          {
            title: "Propriedade intelectual e alterações",
            body: [
              "O design do site e o conteúdo explicativo original são protegidos pela legislação aplicável. Você continua responsável pelo conteúdo que processa. Podemos alterar ou descontinuar recursos e indicaremos a data de mudanças relevantes nos termos.",
            ],
          },
          {
            title: "Lei aplicável e contato",
            body: [
              "Este serviço é operado a partir de {{region}}. Lei aplicável: {{governing_law}}. Foro: {{jurisdiction}}. As normas obrigatórias de proteção ao consumidor continuam válidas. Contato: {{email}}. Data de vigência: {{date}}.",
            ],
          },
        ],
      },
      contact: {
        title: "Contato",
        intro:
          "Recebemos dúvidas, relatos de erros, solicitações de privacidade e denúncias de abuso.",
        sections: [
          {
            title: "E-mail",
            body: [
              "Entre em contato pelo endereço {{email}}. Não inclua entradas das ferramentas, como texto confidencial, JSON, valores Base64, senhas, chaves privadas ou arquivos pessoais, na mensagem.",
            ],
          },
        ],
      },
    },
  },
  common: {
    preview: "Prévia",
    ready: "Pronto",
    working: "Processando…",
    clear: "Limpar",
    copy: "Copiar",
    copied: "Copiado",
    copyFailed: "Não foi possível copiar o resultado.",
    processingFailed: "Não foi possível processar. Tente novamente.",
    download: "Baixar",
    faqTitle: "Perguntas frequentes",
    localTitle: "O AbsolTools funciona no seu navegador.",
    localBody:
      "Sua entrada e os resultados são processados somente neste navegador. Eles não são enviados nem armazenados em um servidor.",
  },
  preview: {
    word: {
      title: "Contador de palavras e caracteres",
      description:
        "Conte palavras, caracteres, caracteres sem espaços, linhas e parágrafos sem fazer upload do texto.",
      inputLabel: "Texto",
      words: "Palavras",
      characters: "Caracteres",
      noWhitespace: "Caracteres sem espaços",
      lines: "Linhas",
      paragraphs: "Parágrafos",
      completed: "Contagem concluída",
      approximate:
        "Este navegador não oferece Intl.Segmenter; as contagens de caracteres e palavras são aproximadas.",
      tooLarge:
        "A entrada ultrapassa o limite de 1 MB. Reduza ou limpe o texto para continuar.",
      guideTitle: "O que é contado",
      guideBody:
        "Em navegadores compatíveis, os caracteres são contados como grupos de grafemas percebidos pelo usuário; por isso, um emoji ou uma letra com marcas combinantes geralmente conta como um. A contagem sem espaços ignora grafemas de espaço em branco no texto original sem unir os grafemas vizinhos. As linhas seguem as quebras de linha. Linhas visualmente vazias, inclusive as que contêm apenas espaços, separam parágrafos.",
      faqs: [
        {
          q: "Como as palavras são contadas?",
          a: "Navegadores com Intl.Segmenter usam o idioma desta página para determinar os limites das palavras e contam os segmentos semelhantes a palavras. Outros navegadores exibem uma contagem aproximada.",
        },
        {
          q: "Emoji conta como caractere?",
          a: "Em navegadores compatíveis, um emoji ou caractere combinado que aparece como um único caractere é contado uma vez.",
        },
      ],
    },
    json: {
      title: "Formatador JSON",
      description:
        "Formate JSON para facilitar a leitura, verifique erros ou minifique tudo em uma linha.",
      inputLabel: "JSON de entrada",
      outputLabel: "Resultado",
      placeholder: "Cole o JSON aqui…",
      outputPlaceholder: "O JSON formatado ou minificado aparecerá aqui.",
      openFile: "Abrir .json",
      tooLarge: "A entrada ultrapassa o limite de 10 MiB.",
      manualRequired:
        "A validação automática foi pausada para esta entrada grande. Escolha Formatar, Validar ou Minificar.",
      format: "Formatar",
      validate: "Validar",
      validateHelpLabel: "Sobre Validar",
      validateHelp:
        "Verifica se a entrada segue a sintaxe JSON da RFC 8259 e informa a posição e a causa de qualquer erro de sintaxe. O texto não é reformatado nem alterado.",
      minify: "Minificar",
      minifyHelpLabel: "Sobre Minificar",
      minifyHelp:
        "Remove espaços e quebras de linha opcionais de um JSON válido para deixá-lo compacto. O conteúdo das strings, a forma original dos números e as chaves de objeto duplicadas são preservados.",
      indent: "Indentação",
      twoSpaces: "2 espaços",
      fourSpaces: "4 espaços",
      tabs: "Tabulações",
      valid: "JSON válido",
      invalidAt: "{message} Linha {line}, coluna {column}.",
      duplicate: "Chave duplicada na linha {line}, coluna {column}",
      bom: "O BOM UTF-8 foi removido antes do processamento.",
      errorMessages: {
        InvalidSymbol: "Símbolo inválido.",
        InvalidNumberFormat: "Formato de número inválido.",
        PropertyNameExpected: "É necessário informar o nome da propriedade.",
        ValueExpected: "É necessário informar um valor.",
        ColonExpected:
          "É necessário usar dois-pontos após o nome da propriedade.",
        CommaExpected: "É necessário usar uma vírgula entre os itens.",
        CloseBraceExpected: "É necessário fechar a chave.",
        CloseBracketExpected: "É necessário fechar o colchete.",
        EndOfFileExpected: "Há conteúdo inesperado após o valor JSON.",
        InvalidCommentToken: "Comentários não são válidos em JSON.",
        UnexpectedEndOfComment: "O comentário está incompleto.",
        UnexpectedEndOfString: "A string está incompleta.",
        UnexpectedEndOfNumber: "O número está incompleto.",
        InvalidUnicode: "A sequência de escape Unicode é inválida.",
        InvalidEscapeCharacter: "A sequência de escape é inválida.",
        InvalidCharacter: "Este caractere não é válido nesta posição.",
        Unknown: "O JSON não é válido.",
      },
      guideTitle: "Regras de JSON e preservação de números",
      guideBody:
        "A validação segue a RFC 8259: comentários, vírgulas finais e aspas simples são indicados como erros. Chaves duplicadas são preservadas com um aviso, e números grandes mantêm exatamente a notação digitada.",
      faqs: [
        {
          q: "Números grandes serão alterados?",
          a: "Não. A formatação e a minificação não recalculam números; elas mantêm a notação digitada, sem arredondar números grandes.",
        },
        {
          q: "Por que as chaves duplicadas são informadas?",
          a: "Cada software pode tratar chaves duplicadas de forma diferente. O AbsolTools as preserva e mostra um aviso em vez de excluir dados silenciosamente.",
        },
        {
          q: "O formatador corrige JSON inválido?",
          a: "Não. Comentários, vírgulas finais, aspas simples e outras sintaxes inválidas são informados para que você corrija a origem de forma consciente.",
        },
      ],
    },
    time: {
      title: "Conversor de timestamp Unix",
      description:
        "Converta timestamps Unix em segundos ou milissegundos para data e hora em um fuso escolhido, e faça a conversão inversa.",
      timestampMode: "Timestamp para data e hora",
      dateMode: "Data e hora para timestamp",
      timestampLabel: "Timestamp Unix",
      dateLabel: "Data e hora",
      datePlaceholder: "AAAA-MM-DDTHH:mm",
      pickDate: "Escolher data e hora",
      unit: "Unidade",
      auto: "Detectar automaticamente",
      seconds: "Segundos",
      milliseconds: "Milissegundos",
      zoneMode: "Fuso horário",
      utc: "Deslocamento UTC",
      local: "Fuso do navegador",
      selected: "Fuso horário IANA",
      zoneLabel: "Cidade, região ou fuso horário IANA",
      zonePlaceholder: "Pesquise São Paulo, América ou America/Sao_Paulo",
      popularZones: [
        {
          value: "America/Sao_Paulo",
          label: "São Paulo, Brasil — America/Sao_Paulo",
        },
        {
          value: "America/Manaus",
          label: "Manaus, Brasil — America/Manaus",
        },
        {
          value: "America/New_York",
          label: "Nova York, Estados Unidos — America/New_York",
        },
        {
          value: "America/Los_Angeles",
          label: "Los Angeles, Estados Unidos — America/Los_Angeles",
        },
        {
          value: "Europe/London",
          label: "Londres, Reino Unido — Europe/London",
        },
        { value: "Europe/Paris", label: "Paris, França — Europe/Paris" },
        { value: "Europe/Lisbon", label: "Lisboa, Portugal — Europe/Lisbon" },
        { value: "Asia/Tokyo", label: "Tóquio, Japão — Asia/Tokyo" },
        { value: "Asia/Shanghai", label: "Xangai, China — Asia/Shanghai" },
        { value: "Asia/Singapore", label: "Singapura — Asia/Singapore" },
        { value: "Asia/Kolkata", label: "Calcutá, Índia — Asia/Kolkata" },
        {
          value: "Australia/Sydney",
          label: "Sydney, Austrália — Australia/Sydney",
        },
      ],
      offsetLabel: "Deslocamento em relação a UTC",
      disambiguation: "Horário local inexistente ou repetido",
      reject: "Mostrar um erro",
      earlier: "Usar o resultado anterior",
      later: "Usar o resultado posterior",
      now: "Agora",
      convert: "Converter",
      instant: "Data e hora em UTC",
      zoned: "Data e hora no fuso escolhido",
      unixSeconds: "Timestamp Unix (segundos)",
      unixMilliseconds: "Timestamp Unix (milissegundos)",
      invalid:
        "Digite um timestamp Unix ou uma data e hora ISO válidos e confira o fuso horário.",
      ambiguousUnit:
        "Valores com 11 ou 12 dígitos são ambíguos. Escolha segundos ou milissegundos.",
      converted: "Conversão concluída",
      nonexistentTime:
        "Esta data e hora não existem no fuso escolhido porque o relógio avança. Escolha o resultado anterior ou posterior.",
      repeatedTime:
        "Esta data e hora ocorrem duas vezes no fuso escolhido porque o relógio atrasa. Escolha o resultado anterior ou posterior.",
      y2038:
        "Este valor está fora do intervalo do tempo Unix inteiro de 32 bits com sinal.",
      guideTitle: "Como as unidades e os fusos horários são tratados",
      guideBody:
        "A detecção automática trata decimais e inteiros de 1 a 10 dígitos como segundos, inteiros de 13 dígitos como milissegundos e pede que você escolha a unidade para inteiros de 11 ou 12 dígitos. Digite a data e hora local ou use o seletor; segundos e frações de segundo são opcionais. O fuso do navegador é usado por padrão. Ao converter um timestamp, o fuso altera apenas a data e hora local exibida. Ao converter uma data e hora local, o fuso determina o valor Unix.",
      faqs: [
        {
          q: "Como funciona a detecção automática da unidade?",
          a: "Decimais e inteiros de 1 a 10 dígitos são tratados como segundos. Inteiros de 13 dígitos são tratados como milissegundos. Para valores de 11 ou 12 dígitos, escolha uma unidade.",
        },
        {
          q: "Qual formato de data e hora posso digitar?",
          a: "Digite uma data e hora local sem deslocamento UTC, como 2026-08-29T14:30. Os segundos e até nove casas decimais são opcionais; você também pode usar o seletor.",
        },
        {
          q: "Qual é a diferença entre as opções de fuso horário?",
          a: "O fuso do navegador é o padrão e segue as regras configuradas no dispositivo. Escolha Deslocamento UTC para usar um valor fixo, como +00:00 ou -03:00. Um fuso IANA, como America/Sao_Paulo, segue as regras de alteração do relógio dessa região.",
        },
        {
          q: "O horário de verão pode tornar um timestamp Unix ambíguo?",
          a: "Não. Um timestamp Unix identifica um único instante. A ambiguidade só aparece ao converter uma data e hora local em um fuso que altera o relógio: alguns horários não existem e outros ocorrem duas vezes. Por padrão, a ferramenta mostra um erro; escolha o resultado anterior ou posterior apenas se quiser resolver a ambiguidade.",
        },
      ],
    },
    textCompare: {
      title: "Comparador de textos",
      description:
        "Compare dois textos linha por linha e destaque adições, remoções e edições sem fazer upload de nenhuma versão.",
      originalLabel: "Texto original",
      changedLabel: "Texto alterado",
      originalPlaceholder: "Cole o texto original aqui…",
      changedPlaceholder: "Cole o texto alterado aqui…",
      compare: "Comparar",
      swap: "Inverter",
      results: "Resultado da comparação",
      empty: "Digite um texto em pelo menos um dos lados para comparar.",
      tooLarge: "Cada texto deve ter no máximo 1 MiB.",
      tooManyLines: "Os dois textos podem ter até 20.000 linhas no total.",
      tooComplex:
        "Esta comparação é complexa demais para ser processada com segurança. Tente usar textos menores.",
      stale:
        "O resultado abaixo pertence à comparação anterior. Compare novamente para atualizá-lo.",
      complete: "Comparação concluída",
      identical: "Os dois textos são idênticos.",
      approximate:
        "Este navegador não oferece Intl.Segmenter; o destaque de caracteres é aproximado.",
      inlineLimited:
        "Algumas linhas longas editadas são mostradas como alterações da linha inteira para manter a comparação responsiva.",
      additions: "Linhas adicionadas: {count}",
      deletions: "Linhas removidas: {count}",
      changes: "Linhas alteradas: {count}",
      previousChange: "Alteração anterior",
      nextChange: "Próxima alteração",
      expandUnchanged: "Mostrar {count} linhas sem alteração",
      whitespaceChange: "Espaços em branco alterados",
      lineEndingChange: "Fim de linha alterado",
      unchangedRow: "Linha sem alteração",
      addedRow: "Linha adicionada",
      removedRow: "Linha removida",
      changedRow: "Linha alterada",
      originalLine: "Linha original {line}",
      changedLine: "Linha alterada {line}",
      guideTitle: "Como a comparação funciona",
      guideBody:
        "A comparação alinha as linhas primeiro e depois destaca edições de caracteres dentro das linhas alteradas correspondentes. Mudanças somente em espaços ou fins de linha são identificadas. Trechos longos sem alterações ficam recolhidos até você abri-los.",
      faqs: [
        {
          q: "O AbsolTools faz upload dos textos?",
          a: "Não. Os dois textos são comparados localmente no navegador e não são enviados a um servidor.",
        },
        {
          q: "A ferramenta detecta fins de linha diferentes?",
          a: "Sim. Diferenças entre fins de linha CRLF, LF e CR são marcadas mesmo quando o texto visível da linha é igual.",
        },
      ],
    },
    caseConverter: {
      title: "Conversor de maiúsculas e minúsculas",
      description:
        "Converta texto para maiúsculas, minúsculas, formato de frase ou iniciais maiúsculas sem fazer upload.",
      inputLabel: "Texto",
      outputLabel: "Texto convertido",
      placeholder: "Digite ou cole o texto aqui…",
      outputPlaceholder: "O texto convertido aparecerá aqui.",
      modeLabel: "Conversão",
      upper: "MAIÚSCULAS",
      lower: "minúsculas",
      sentence: "Formato de frase",
      capitalizeWords: "Iniciais maiúsculas",
      converted: "Conversão concluída",
      noChange: "O texto já corresponde a esta conversão.",
      outdated: "O resultado exibido pertence à entrada anterior.",
      tooLarge: "A entrada ultrapassa o limite de 1 MB.",
      guideTitle: "Como cada conversão funciona",
      guideBody:
        "Maiúsculas e minúsculas usam os mapeamentos padrão de caixa do Unicode. Formato de frase converte o texto em minúsculas e coloca em maiúscula a primeira letra com caixa no início, após uma quebra de linha ou depois de . ! ? 。 ！ ？. Iniciais maiúsculas coloca em maiúscula a primeira letra com caixa de cada palavra e preserva espaços, pontuação, quebras de linha, apóstrofos, hífens e sublinhados.",
      faqs: [
        {
          q: "Iniciais maiúsculas é o mesmo que capitalização de títulos?",
          a: "Não. A conversão coloca a inicial de cada palavra em maiúscula de forma mecânica e não aplica regras editoriais específicas do idioma a artigos, preposições, nomes ou abreviações.",
        },
        {
          q: "Os espaços e as quebras de linha são preservados?",
          a: "Sim. A ferramenta altera apenas maiúsculas e minúsculas e preserva os espaços, a pontuação e as quebras de linha originais.",
        },
      ],
    },
  },
  examples: {
    wordInput: "Exemplo: o AbsolTools conta palavras e caracteres online.",
    jsonInput: 'Exemplo: {"name":"AbsolTools","items":[1,2,3]}',
    timestampInput: "1704067200",
    timestampHint:
      "Exemplo: 1704067200 (segundos) ou 1704067200000 (milissegundos).",
    dateInput: "2024-01-01T00:00",
    dateHint:
      "Formato de exemplo: 2024-01-01T00:00. Os segundos são opcionais, e você também pode usar o seletor de data.",
    timeResult: "Valor convertido",
  },
  catalog: {
    "base64-decode": {
      name: "Decodificador Base64",
      summary: "Decodifique texto ou arquivos Base64 online.",
      searchTerms: [
        "decodificar",
        "decodificador",
        "Base64URL",
        "URI de dados",
        "texto",
        "arquivo",
        "binário",
      ],
    },
    "base64-encode": {
      name: "Codificador Base64",
      summary: "Codifique texto ou arquivos em Base64 online.",
      searchTerms: [
        "codificar",
        "codificador",
        "Base64URL",
        "URI de dados",
        "texto",
        "arquivo",
        "binário",
      ],
    },
    "word-counter": {
      name: "Contador de palavras e caracteres",
      summary: "Conte palavras, caracteres, linhas e parágrafos online.",
      searchTerms: [
        "contar palavras",
        "contar caracteres",
        "letras",
        "linhas",
        "parágrafos",
        "texto",
      ],
    },
    "json-formatter": {
      name: "Formatador JSON",
      summary:
        "Deixe o JSON legível, verifique erros ou minifique tudo em uma linha.",
      searchTerms: [
        "formatar JSON",
        "validar JSON",
        "minificar JSON",
        "JSON legível",
        "dados",
      ],
    },
    "unix-timestamp-converter": {
      name: "Conversor de timestamp Unix",
      summary:
        "Converta timestamps Unix em segundos ou milissegundos para data e hora, e vice-versa.",
      searchTerms: [
        "tempo Unix",
        "timestamp",
        "epoch",
        "segundos",
        "milissegundos",
        "data",
        "hora",
      ],
    },
    "text-compare": {
      name: "Comparador de textos",
      summary: "Compare dois textos linha por linha e destaque as diferenças.",
      searchTerms: ["comparar textos", "diferenças", "comparar linhas", "diff"],
    },
    "case-converter": {
      name: "Conversor de maiúsculas e minúsculas",
      summary:
        "Converta texto para maiúsculas, minúsculas, formato de frase ou iniciais maiúsculas.",
      searchTerms: [
        "maiúsculas",
        "minúsculas",
        "formato de frase",
        "capitalizar",
        "texto",
      ],
    },
  },
  network: {
    allTools: "Todas as ferramentas",
    directoryMetaTitle:
      "Ferramentas online gratuitas para texto e dados | AbsolTools",
    directoryMetaDescription:
      "Resolva tarefas de texto, dados, tempo e codificação online.",
    directoryTitle:
      "Deixamos as ferramentas que você usa com frequência mais simples e práticas",
    directoryIntro:
      "Adicione este site aos favoritos para acessá-lo diretamente na próxima vez.",
    toolPromise:
      "O AbsolTools torna as ferramentas online mais usadas mais precisas e fáceis de usar. Adicione este site aos favoritos.",
    directorySearchLabel: "Pesquisar ferramentas",
    directorySearchPlaceholder: "Pesquise por nome, descrição ou palavra-chave",
    directorySearchClear: "Limpar pesquisa",
    directorySearchNoResults: "Nenhuma ferramenta corresponde à sua pesquisa.",
    directorySearchCount: "Ferramentas encontradas: {count}",
    available: "Disponível",
    research: "Prévia",
    reserve: "Em avaliação",
    breadcrumbLabel: "Caminho de navegação",
    encodingCategory: "Codificação e decodificação",
    categories: {
      encoding: "Codificação e decodificação",
      text: "Texto",
      data: "Dados",
      time: "Tempo",
    },
    footerNote: "Recursos populares, mais fáceis de usar.",
    catalogAria: "Diretório de ferramentas",
    useLightTheme: "Usar tema claro",
    useDarkTheme: "Usar tema escuro",
  },
};

export default ptBRBundle;
