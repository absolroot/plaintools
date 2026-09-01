import type { ImageConversionRouteFacts } from "./types";

export const trRouteFacts = {
  "svg-rasterized":
    "{from} vektör olarak korunmaz; {to} formatına dönüştürülürken piksel görüntüsü olarak işlenir.",
  "gif-still":
    "Hareketli bir {from} dosyasını {to} formatına dönüştürdüğünüzde hareket korunmaz ve tek bir sabit görüntü oluşturulur.",
  "jpg-white-background":
    "{from} görselinde saydam alanlar varsa, {to} formatına dönüştürülürken bu alanlar beyaz arka planla doldurulur.",
  "gif-palette":
    "{from} görselini {to} formatına dönüştürürken kullanılabilecek renkler sınırlanır ve saydamlık daha basit işlenir.",
  "bmp-uncompressed":
    "{from} görselini {to} formatına dönüştürürken ek kayıplı sıkıştırma uygulanmaz; bu nedenle dosya daha büyük olabilir.",
  "png-no-further-loss":
    "{from} görselini {to} formatına dönüştürürken ek kayıplı sıkıştırma uygulanmaz; bu nedenle dosya daha büyük olabilir.",
  "quality-profile":
    "{from} formatından {to} formatına dönüştürürken kalite ayarı, dosya boyutu ile görüntü netliği arasındaki dengeyi belirler.",
} satisfies ImageConversionRouteFacts;
