import type { ToolPageCopy } from "../../lib/locale-data/bundle";
import type { LocaleCatalogToolCopy } from "../../lib/tool-catalog";
import type { PdfToolkitCopy } from "./contract";
import { generatedPdfLocaleTexts } from "./i18n.generated";
import { pdfToolIds, type PdfToolId } from "./modes";

export type PdfToolkitLocale =
  | "en"
  | "ko"
  | "es"
  | "de"
  | "ja"
  | "fr"
  | "pt-BR"
  | "it"
  | "nl"
  | "sv"
  | "cs"
  | "pl"
  | "da"
  | "no"
  | "ar"
  | "zh-TW"
  | "tr";

type PdfPageSeed = {
  title: string;
  description: string;
  guide: string;
  faqQuestion: string;
  faqAnswer: string;
  searchTerms: readonly string[];
};

type PdfLocaleText = {
  ui: PdfToolkitCopy;
  guideTitle: string;
  safetyTitle: string;
  safetyBody: string;
  privacyQuestion: string;
  privacyAnswer: string;
  limitQuestion: string;
  limitAnswer: string;
  pages: Record<PdfToolId, PdfPageSeed>;
};

const technical = {
  jpg: "JPG",
  png: "PNG",
  a4: "A4",
  letter: "Letter",
  dpi96: "96 DPI",
  dpi144: "144 DPI",
  dpi200: "200 DPI",
} as const;

type TechnicalKey = keyof typeof technical;

function ui(localized: Omit<PdfToolkitCopy, TechnicalKey>): PdfToolkitCopy {
  return { ...localized, ...technical };
}

const texts: Record<PdfToolkitLocale, PdfLocaleText> = {
  en: {
    ui: ui({
      ariaLabel: "PDF tools",
      choosePdf: "Choose PDF",
      choosePdfs: "Choose PDFs",
      chooseImages: "Choose images",
      addFiles: "Add files",
      replaceFile: "Replace file",
      dropPdf: "or drop one PDF here",
      dropPdfs: "or drop PDFs here",
      dropImages: "or drop images here",
      pdfTypes: "PDF · up to 200 MiB in this browser session",
      imageTypes: "JPG, PNG, or WebP · up to 200 MiB total",
      selectedFiles: "Selected files",
      options: "Options",
      result: "Result",
      remove: "Remove",
      moveUp: "Move up",
      moveDown: "Move down",
      pages: "pages",
      page: "page",
      size: "Size",
      dimensions: "Dimensions",
      progress: "Progress",
      cancel: "Cancel",
      complete: "PDF task complete",
      compress: "Compress PDF",
      merge: "Merge PDFs",
      split: "Split PDF",
      convertToImages: "Convert to images",
      createPdf: "Create PDF",
      downloadPdf: "Download PDF",
      downloadZip: "Download ZIP",
      downloadImage: "Download image",
      originalSize: "Original size",
      resultSize: "Result size",
      smallerBy: "Smaller by",
      largerBy: "Larger by",
      compressionLevel: "Compression level",
      preserveDocument: "Preserve document",
      preserveDocumentHint:
        "Keeps selectable text and document features; size may change little.",
      balanced: "Balanced · recommended",
      balancedHint:
        "144 DPI and balanced JPEG quality for scans and image-heavy PDFs.",
      smallerFile: "Smaller file",
      smallerFileHint: "110 DPI and stronger image compression.",
      rasterWarningTitle: "Pages become images",
      rasterWarningBody:
        "Balanced and smaller modes preserve appearance, but remove text selection, search, links, forms, annotations, layers, and accessibility structure.",
      extractPages: "Extract pages",
      splitDocument: "Split document",
      pageSelection: "Pages",
      pageSelectionHint: "Example: 1, 3-5",
      everyPages: "Every N pages",
      customRanges: "Custom ranges",
      pagesPerFile: "Pages per PDF",
      customRangesHint: "Each comma-separated range becomes one PDF.",
      selectAll: "Select all",
      clearSelection: "Clear selection",
      outputFormat: "Image format",
      resolution: "Resolution",
      quality: "JPG quality",
      pageSize: "Page size",
      fitImage: "Fit image",
      orientation: "Orientation",
      automatic: "Automatic",
      portrait: "Portrait",
      landscape: "Landscape",
      margin: "Margin",
      noMargin: "No margin",
      smallMargin: "Small",
      largeMargin: "Large",
      resultFiles: "Result files",
      noReduction:
        "The result is not smaller. Try another preset or keep the original.",
      fileTooLarge:
        "The selected files exceed the 200 MiB local-processing limit.",
      tooManyPages: "This PDF exceeds the 500-page copy limit.",
      tooManyRasterPages:
        "Select at most 120 pages and keep the rendered output below 240 megapixels.",
      invalidPdf: "Choose a valid, readable PDF file.",
      encryptedPdf:
        "Password-protected PDFs are not supported yet. Unlock the file first and try again.",
      invalidImage:
        "One image could not be read. Try a valid JPG, PNG, or WebP file.",
      unsupportedImage: "Choose JPG, PNG, or WebP images.",
      minimumMergeFiles: "Choose at least two PDFs to merge.",
      emptySelection: "Select at least one page.",
      invalidRange: "Check the page expression. Use values such as 1, 3-5.",
      rangeOutOfBounds:
        "A selected page is outside this document's page count.",
      reversedRange: "A page range must start before it ends.",
      renderFailed:
        "A page could not be rendered. Try a smaller range or lower resolution.",
      workerFailed:
        "The PDF could not be processed in this browser. Check the file and try again.",
    }),
    guideTitle: "How to use {title}",
    safetyTitle: "Files stay in this browser",
    safetyBody:
      "The selected files and results are processed only in this browser tab. They are not uploaded, stored, added to a URL, or sent to a third party.",
    privacyQuestion: "Are my files uploaded?",
    privacyAnswer:
      "No. File reading, PDF processing, rendering, and ZIP creation happen locally in this browser tab.",
    limitQuestion: "Why are there page and file limits?",
    limitAnswer:
      "PDF rendering can use several bytes of memory per pixel. The limits keep large jobs from freezing or closing the browser tab.",
    pages: {
      "compress-pdf": {
        title: "Compress PDF",
        description:
          "Reduce a PDF locally with a document-preserving option or clear image-quality presets.",
        guide:
          "Choose a PDF, compare the three presets, and compress. Preserve document keeps selectable content but may save little; the other presets rebuild each page as an image for larger reductions on scanned or image-heavy files.",
        faqQuestion: "Will compression keep selectable text and links?",
        faqAnswer:
          "Preserve document keeps page content. Balanced and smaller modes turn pages into images, so selection, search, links, forms, annotations, layers, and accessibility structure are removed.",
        searchTerms: ["compress PDF", "reduce PDF size", "PDF compressor"],
      },
      "merge-pdf": {
        title: "Merge PDF",
        description:
          "Order several PDF files and combine their pages into one PDF in your browser.",
        guide:
          "Add two or more PDFs, drag them into order or use the move buttons, then merge. The output follows the file order shown in the list.",
        faqQuestion: "Can I change the page order inside one PDF?",
        faqAnswer:
          "This first version orders whole files. Split or rearrange the source PDF first when individual pages need a different order.",
        searchTerms: ["merge PDF", "combine PDFs", "PDF merger"],
      },
      "split-pdf": {
        title: "Split PDF",
        description:
          "Extract selected pages into one PDF or divide a PDF into separate files by size or custom ranges.",
        guide:
          "Choose Extract pages for one new PDF, or Split document for several outputs. Use a page expression such as 1, 3-5; multiple results are bundled into one ZIP.",
        faqQuestion: "Does splitting reduce page quality?",
        faqAnswer:
          "No rasterization is used for splitting. Existing PDF pages are copied into new files, although advanced document-wide features may not carry over.",
        searchTerms: ["split PDF", "extract PDF pages", "PDF splitter"],
      },
      "pdf-to-image": {
        title: "PDF to Image",
        description:
          "Render selected PDF pages as JPG or PNG images with practical resolution and quality controls.",
        guide:
          "Choose a PDF, select pages, format, and resolution, then convert. One page downloads directly; several pages are collected into a ZIP with numbered filenames.",
        faqQuestion: "Should I choose JPG or PNG?",
        faqAnswer:
          "JPG is usually smaller for photos and scans. PNG is lossless and often better for diagrams, sharp text, or transparency, but can be much larger.",
        searchTerms: ["PDF to image", "PDF to JPG", "PDF to PNG"],
      },
      "image-to-pdf": {
        title: "Image to PDF",
        description:
          "Arrange JPG, PNG, or WebP images and place them into one PDF with page size, orientation, and margin controls.",
        guide:
          "Add images, drag or move them into order, then choose fit, A4, or Letter pages. Fixed pages scale images down to fit without cropping or enlarging them.",
        faqQuestion: "Are my images cropped or enlarged?",
        faqAnswer:
          "No. Images are centered and scaled down only when needed. Fit mode uses each image's own proportions for the PDF page.",
        searchTerms: ["image to PDF", "JPG to PDF", "PNG to PDF"],
      },
    },
  },
  ko: {
    ui: ui({
      ariaLabel: "PDF 도구",
      choosePdf: "PDF 선택",
      choosePdfs: "PDF 여러 개 선택",
      chooseImages: "이미지 선택",
      addFiles: "파일 추가",
      replaceFile: "파일 바꾸기",
      dropPdf: "또는 PDF를 여기에 놓으세요",
      dropPdfs: "또는 PDF 여러 개를 여기에 놓으세요",
      dropImages: "또는 이미지를 여기에 놓으세요",
      pdfTypes: "PDF · 이 브라우저 탭에서 최대 200 MiB",
      imageTypes: "JPG, PNG, WebP · 합계 최대 200 MiB",
      selectedFiles: "선택한 파일",
      options: "옵션",
      result: "결과",
      remove: "삭제",
      moveUp: "위로 이동",
      moveDown: "아래로 이동",
      pages: "페이지",
      page: "페이지",
      size: "크기",
      dimensions: "크기",
      progress: "진행",
      cancel: "취소",
      complete: "PDF 작업 완료",
      compress: "PDF 압축",
      merge: "PDF 병합",
      split: "PDF 분할",
      convertToImages: "이미지로 변환",
      createPdf: "PDF 만들기",
      downloadPdf: "PDF 다운로드",
      downloadZip: "ZIP 다운로드",
      downloadImage: "이미지 다운로드",
      originalSize: "원본 크기",
      resultSize: "결과 크기",
      smallerBy: "감소율",
      largerBy: "증가율",
      compressionLevel: "압축 수준",
      preserveDocument: "문서 기능 유지",
      preserveDocumentHint:
        "텍스트 선택과 문서 기능을 유지하지만 용량이 거의 줄지 않을 수 있습니다.",
      balanced: "균형 · 권장",
      balancedHint: "스캔·이미지 중심 PDF에 적합한 144 DPI와 균형 화질입니다.",
      smallerFile: "더 작은 파일",
      smallerFileHint: "110 DPI와 더 강한 이미지 압축을 사용합니다.",
      rasterWarningTitle: "페이지가 이미지로 바뀝니다",
      rasterWarningBody:
        "균형 및 더 작은 파일 모드는 화면 모양을 유지하지만 텍스트 선택·검색, 링크, 양식, 주석, 레이어, 접근성 구조를 제거합니다.",
      extractPages: "페이지 추출",
      splitDocument: "문서 분할",
      pageSelection: "페이지",
      pageSelectionHint: "예: 1, 3-5",
      everyPages: "N페이지마다",
      customRanges: "사용자 지정 범위",
      pagesPerFile: "PDF당 페이지 수",
      customRangesHint: "쉼표로 나눈 각 범위가 하나의 PDF가 됩니다.",
      selectAll: "전체 선택",
      clearSelection: "선택 해제",
      outputFormat: "이미지 형식",
      resolution: "해상도",
      quality: "JPG 화질",
      pageSize: "페이지 크기",
      fitImage: "이미지에 맞춤",
      orientation: "방향",
      automatic: "자동",
      portrait: "세로",
      landscape: "가로",
      margin: "여백",
      noMargin: "여백 없음",
      smallMargin: "좁게",
      largeMargin: "넓게",
      resultFiles: "결과 파일",
      noReduction:
        "결과가 더 작지 않습니다. 다른 설정을 쓰거나 원본을 유지하세요.",
      fileTooLarge: "선택한 파일이 로컬 처리 한도 200 MiB를 넘습니다.",
      tooManyPages: "이 PDF는 복사 처리 한도인 500페이지를 넘습니다.",
      tooManyRasterPages:
        "최대 120페이지를 선택하고 렌더링 결과를 2억 4천만 픽셀 이하로 유지하세요.",
      invalidPdf: "열 수 있는 올바른 PDF 파일을 선택하세요.",
      encryptedPdf:
        "암호로 보호된 PDF는 아직 지원하지 않습니다. 먼저 잠금을 해제한 뒤 다시 시도하세요.",
      invalidImage:
        "이미지 하나를 읽지 못했습니다. 올바른 JPG, PNG 또는 WebP를 사용하세요.",
      unsupportedImage: "JPG, PNG 또는 WebP 이미지를 선택하세요.",
      minimumMergeFiles: "병합할 PDF를 두 개 이상 선택하세요.",
      emptySelection: "페이지를 한 개 이상 선택하세요.",
      invalidRange: "페이지 입력을 확인하세요. 1, 3-5처럼 입력할 수 있습니다.",
      rangeOutOfBounds: "문서의 전체 페이지 수를 벗어난 페이지가 있습니다.",
      reversedRange: "페이지 범위는 작은 번호부터 입력하세요.",
      renderFailed:
        "페이지를 이미지로 만들지 못했습니다. 범위를 줄이거나 해상도를 낮춰 보세요.",
      workerFailed:
        "이 브라우저에서 PDF를 처리하지 못했습니다. 파일을 확인하고 다시 시도하세요.",
    }),
    guideTitle: "{title} 사용 방법",
    safetyTitle: "파일은 이 브라우저 안에만 있습니다",
    safetyBody:
      "선택한 파일과 결과는 현재 브라우저 탭에서만 처리됩니다. 서버에 업로드·저장되거나 URL 및 제3자 요청에 포함되지 않습니다.",
    privacyQuestion: "파일이 서버로 업로드되나요?",
    privacyAnswer:
      "아니요. 파일 읽기, PDF 처리, 페이지 렌더링, ZIP 생성이 모두 현재 브라우저 탭에서 이루어집니다.",
    limitQuestion: "파일과 페이지 수에 제한이 있는 이유는 무엇인가요?",
    limitAnswer:
      "PDF 페이지를 이미지로 만들 때 픽셀마다 메모리가 필요합니다. 제한은 큰 작업 때문에 브라우저 탭이 멈추거나 종료되는 일을 줄입니다.",
    pages: {
      "compress-pdf": {
        title: "PDF 압축",
        description:
          "문서 기능을 유지하거나 명확한 화질 설정을 선택해 PDF 용량을 브라우저에서 줄입니다.",
        guide:
          "PDF를 선택하고 세 가지 설정을 비교해 압축하세요. 문서 기능 유지는 용량이 거의 줄지 않을 수 있고, 다른 두 설정은 스캔·이미지 중심 문서의 각 페이지를 이미지로 다시 만듭니다.",
        faqQuestion: "압축 후에도 텍스트 선택과 링크가 유지되나요?",
        faqAnswer:
          "문서 기능 유지에서는 페이지 내용을 유지합니다. 균형과 더 작은 파일은 페이지를 이미지로 바꾸므로 선택·검색, 링크, 양식, 주석, 레이어, 접근성 구조가 제거됩니다.",
        searchTerms: ["PDF 압축", "PDF 용량 줄이기", "PDF compressor"],
      },
      "merge-pdf": {
        title: "PDF 병합",
        description:
          "여러 PDF의 순서를 정하고 모든 페이지를 하나의 PDF로 합칩니다.",
        guide:
          "PDF를 두 개 이상 추가하고 끌기 또는 이동 버튼으로 순서를 정한 뒤 병합하세요. 결과는 목록에 보이는 파일 순서를 따릅니다.",
        faqQuestion: "PDF 안쪽의 개별 페이지 순서도 바꿀 수 있나요?",
        faqAnswer:
          "첫 버전은 파일 전체의 순서를 바꿉니다. 개별 페이지 순서가 필요하면 원본 PDF를 먼저 분할해 다시 병합하세요.",
        searchTerms: ["PDF 병합", "PDF 합치기", "PDF merge"],
      },
      "split-pdf": {
        title: "PDF 분할",
        description:
          "선택한 페이지를 하나의 PDF로 추출하거나 범위별 여러 파일로 나눕니다.",
        guide:
          "하나의 새 PDF가 필요하면 페이지 추출을, 여러 결과가 필요하면 문서 분할을 선택하세요. 1, 3-5처럼 입력할 수 있으며 여러 결과는 ZIP으로 묶입니다.",
        faqQuestion: "분할하면 페이지 화질이 낮아지나요?",
        faqAnswer:
          "분할에는 이미지 변환을 사용하지 않고 기존 PDF 페이지를 새 파일로 복사합니다. 다만 일부 문서 전체 기능은 이어지지 않을 수 있습니다.",
        searchTerms: ["PDF 분할", "PDF 페이지 추출", "PDF 나누기"],
      },
      "pdf-to-image": {
        title: "PDF 이미지 변환",
        description: "선택한 PDF 페이지를 JPG 또는 PNG 이미지로 변환합니다.",
        guide:
          "PDF와 페이지, 형식, 해상도를 선택해 변환하세요. 한 페이지는 바로 다운로드하고 여러 페이지는 번호가 붙은 파일로 ZIP에 묶습니다.",
        faqQuestion: "JPG와 PNG 중 무엇을 선택해야 하나요?",
        faqAnswer:
          "사진과 스캔은 보통 JPG가 더 작습니다. 도표나 선명한 글자는 PNG가 유리할 수 있지만 파일이 훨씬 커질 수 있습니다.",
        searchTerms: ["PDF 이미지 변환", "PDF JPG 변환", "PDF PNG 변환"],
      },
      "image-to-pdf": {
        title: "이미지 PDF 변환",
        description: "JPG, PNG, WebP 이미지 순서를 정해 하나의 PDF로 만듭니다.",
        guide:
          "이미지를 추가하고 순서를 정한 뒤 이미지 맞춤, A4 또는 Letter를 선택하세요. 고정 페이지에서는 자르거나 확대하지 않고 필요할 때만 축소합니다.",
        faqQuestion: "이미지가 잘리거나 확대되나요?",
        faqAnswer:
          "아니요. 이미지는 가운데 배치되고 필요할 때만 축소됩니다. 이미지 맞춤은 각 이미지 비율대로 PDF 페이지를 만듭니다.",
        searchTerms: ["이미지 PDF 변환", "JPG PDF 변환", "PNG PDF 변환"],
      },
    },
  },
  es: generatedPdfLocaleTexts.es,
  de: generatedPdfLocaleTexts.de,
  ja: generatedPdfLocaleTexts.ja,
  fr: generatedPdfLocaleTexts.fr,
  "pt-BR": generatedPdfLocaleTexts["pt-BR"],
  it: generatedPdfLocaleTexts.it,
  nl: generatedPdfLocaleTexts.nl,
  sv: generatedPdfLocaleTexts.sv,
  cs: generatedPdfLocaleTexts.cs,
  pl: generatedPdfLocaleTexts.pl,
  da: generatedPdfLocaleTexts.da,
  no: generatedPdfLocaleTexts.no,
  ar: generatedPdfLocaleTexts.ar,
  "zh-TW": generatedPdfLocaleTexts["zh-TW"],
  tr: generatedPdfLocaleTexts.tr,
};

function fill(template: string, title: string): string {
  return template.replaceAll("{title}", title);
}

export const pdfToolkitLocales = Object.fromEntries(
  Object.entries(texts).map(([locale, text]) => {
    const tools = Object.fromEntries(
      pdfToolIds.map((id) => {
        const page = text.pages[id];
        return [
          id,
          {
            title: page.title,
            description: page.description,
            mobileDescription: page.description,
            guideTitle: fill(text.guideTitle, page.title),
            guideBody: page.guide,
            safetyTitle: text.safetyTitle,
            safetyBody: text.safetyBody,
            faqs: [
              { q: page.faqQuestion, a: page.faqAnswer },
              { q: text.privacyQuestion, a: text.privacyAnswer },
              { q: text.limitQuestion, a: text.limitAnswer },
            ],
            feature: text.ui,
          },
        ];
      }),
    ) as Record<PdfToolId, ToolPageCopy<PdfToolkitCopy>>;
    const catalog = Object.fromEntries(
      pdfToolIds.map((id) => [
        id,
        {
          name: text.pages[id].title,
          summary: text.pages[id].description,
          searchTerms: text.pages[id].searchTerms,
        },
      ]),
    ) as Record<PdfToolId, LocaleCatalogToolCopy>;
    return [locale, { tools, catalog }];
  }),
) as Record<
  PdfToolkitLocale,
  {
    tools: Record<PdfToolId, ToolPageCopy<PdfToolkitCopy>>;
    catalog: Record<PdfToolId, LocaleCatalogToolCopy>;
  }
>;
