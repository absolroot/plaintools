import type { ImageCropCopy } from "../../../features/image-crop/contract";
import type { Locale } from "../../site";

type Pack = {
  copy: ImageCropCopy;
  page: {
    title: string;
    description: string;
    mobileDescription: string;
    guide: string;
    terms: readonly string[];
  };
};
const en: Pack = {
  copy: {
    ariaLabel: "Image crop editor",
    chooseImage: "Choose image",
    replaceImage: "Replace image",
    dropImage: "Drop an image here",
    pasteHint: "Choose, drop, or paste an image",
    formats: "PNG, JPG, WebP, GIF, or AVIF up to 50 MB",
    crop: "Crop",
    transform: "Transform",
    cropArea: "Crop area",
    ratio: "Aspect ratio",
    free: "Free",
    square: "Square",
    landscape: "Landscape",
    portrait: "Portrait",
    rotateLeft: "Rotate left",
    rotateRight: "Rotate right",
    flipHorizontal: "Flip horizontal",
    flipVertical: "Flip vertical",
    straighten: "Straighten",
    reset: "Reset edits",
    output: "Output format",
    quality: "Quality",
    smallerFile: "Smaller file",
    betterQuality: "Better quality",
    save: "Crop image",
    reading: "Reading image…",
    working: "Preparing image…",
    complete: "Your cropped image is ready.",
    resultEmpty: "Your cropped image appears here",
    invalidImage: "Choose a valid supported image.",
    fileTooLarge: "Choose an image up to 50 MB.",
    dimensionsTooLarge: "Use an image up to 40 megapixels.",
    decodeFailed: "This image could not be read in your browser.",
    encodeFailed: "The edited image could not be prepared.",
  },
  page: {
    title: "Image crop editor",
    description:
      "Crop, rotate, flip, and straighten images in your browser without uploading them.",
    mobileDescription: "Crop and straighten images on your device.",
    guide:
      "Choose, drop, or paste an image. Drag the crop area, select a useful ratio, then rotate, flip, or straighten it before downloading.",
    terms: [
      "crop image",
      "photo cropper",
      "rotate image",
      "straighten image",
      "image editor",
    ],
  },
};
const ko: Pack = {
  ...en,
  copy: {
    ...en.copy,
    ariaLabel: "이미지 자르기 편집기",
    chooseImage: "이미지 선택",
    replaceImage: "이미지 바꾸기",
    dropImage: "여기에 이미지 놓기",
    pasteHint: "이미지를 선택, 끌어놓기 또는 붙여넣기",
    crop: "자르기",
    transform: "변형",
    cropArea: "자르기 영역",
    ratio: "가로세로 비율",
    free: "자유",
    square: "정사각형",
    landscape: "가로",
    portrait: "세로",
    rotateLeft: "왼쪽 회전",
    rotateRight: "오른쪽 회전",
    flipHorizontal: "가로 반전",
    flipVertical: "세로 반전",
    straighten: "기울기 보정",
    reset: "편집 초기화",
    output: "출력 형식",
    quality: "품질",
    smallerFile: "작은 파일",
    betterQuality: "더 나은 품질",
    save: "이미지 자르기",
    reading: "이미지를 읽는 중…",
    working: "이미지를 준비하는 중…",
    complete: "자른 이미지가 준비되었습니다.",
    invalidImage: "지원되는 올바른 이미지를 선택하세요.",
    fileTooLarge: "50MB 이하의 이미지를 선택하세요.",
    dimensionsTooLarge: "4천만 픽셀 이하의 이미지를 사용하세요.",
    decodeFailed: "브라우저에서 이 이미지를 읽을 수 없습니다.",
    encodeFailed: "편집한 이미지를 만들 수 없습니다.",
  },
  page: {
    title: "이미지 자르기 편집기",
    description:
      "이미지를 업로드하지 않고 브라우저에서 자르고, 회전·반전·기울기 보정을 합니다.",
    mobileDescription: "기기에서 이미지를 자르고 기울기를 보정합니다.",
    guide:
      "이미지를 선택, 끌어놓기 또는 붙여넣으세요. 자르기 영역을 드래그하고 비율을 선택한 뒤 회전, 반전 또는 기울기 보정을 적용해 다운로드하세요.",
    terms: [
      "이미지 자르기",
      "사진 자르기",
      "이미지 회전",
      "사진 기울기 보정",
      "이미지 편집",
    ],
  },
};
export function imageCropFor(locale: Locale): Pack {
  return locale === "ko" ? ko : en;
}
