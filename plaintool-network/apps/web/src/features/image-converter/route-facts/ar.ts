import type { ImageConversionRouteFacts } from "./types";

export const arRouteFacts = {
  "svg-rasterized":
    "لا يبقى {from} رسماً متجهاً؛ فعند تحويله إلى {to} يُرسم كصورة نقطية.",
  "gif-still":
    "عند تحويل ملف {from} متحرك إلى {to}، لا تُحفظ الحركة وتُنشأ صورة ثابتة واحدة.",
  "jpg-white-background":
    "إذا احتوت صورة {from} على مناطق شفافة، فستُملأ بخلفية بيضاء عند تحويلها إلى {to}.",
  "gif-palette":
    "عند تحويل صورة {from} إلى {to}، يكون عدد الألوان المتاحة محدوداً وتُعالَج الشفافية بصورة أبسط.",
  "bmp-uncompressed":
    "عند تحويل صورة {from} إلى {to}، لا يُطبّق ضغط إضافي مع فقدان للبيانات، لذلك قد يكبر حجم الملف.",
  "png-no-further-loss":
    "عند تحويل صورة {from} إلى {to}، لا يُطبّق ضغط إضافي مع فقدان للبيانات، لذلك قد يكبر حجم الملف.",
  "quality-profile":
    "عند التحويل من {from} إلى {to}، يضبط إعداد الجودة التوازن بين حجم الملف ووضوح الصورة.",
} satisfies ImageConversionRouteFacts;
