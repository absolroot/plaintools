import type { ImageConversionRouteFacts } from "./types";

export const koRouteFacts = {
  "svg-rasterized":
    "{from} 파일은 벡터 형태로 유지되지 않으며, {to}로 변환될 때 픽셀 이미지로 렌더링됩니다.",
  "gif-still":
    "애니메이션 {from} 파일을 {to}로 변환하면 움직임은 유지되지 않고 한 장의 정지 이미지가 만들어집니다.",
  "jpg-white-background":
    "{from} 이미지에 투명한 부분이 있으면 {to}로 변환할 때 흰색 배경으로 채워집니다.",
  "gif-palette":
    "{from} 이미지를 {to}로 변환하면 사용할 수 있는 색상이 제한되고 투명도도 단순하게 처리됩니다.",
  "bmp-uncompressed":
    "{from} 이미지를 {to}로 변환하면 추가 손실 압축을 적용하지 않으므로 파일 크기가 더 커질 수 있습니다.",
  "png-no-further-loss":
    "{from} 이미지를 {to}로 변환하면 추가 손실 압축을 적용하지 않으므로 파일 크기가 더 커질 수 있습니다.",
  "quality-profile":
    "{from}에서 {to}로 변환할 때 품질 설정은 파일 크기와 이미지 선명도 사이의 균형을 조절합니다.",
} satisfies ImageConversionRouteFacts;
