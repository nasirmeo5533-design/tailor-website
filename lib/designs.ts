/**
 * Design showcase catalogue.
 *
 * Every design on the site can be customized — color, fabric, fit and details.
 * The point is not to sell a finished garment but to start a conversation:
 * "I want this design, made specifically for me."
 */

export type DesignCustomization = {
  label: string;
  text: string;
};

export type Design = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  fabricSuggestion: string;
  customizations: DesignCustomization[];
  image: string;
  alt: string;
};

export const designs: Design[] = [
  {
    slug: "ayesha-kameez-suit",
    name: "The Ayesha",
    category: "Formal",
    tagline: "A timeless three-piece kameez suit, tailored to you.",
    description:
      "The Ayesha is our most-loved silhouette — a gracefully fitted kameez with clean lines, matching trousers and a flowing dupatta. Keep it understated or add embroidery; it is cut and finished around your measurements so it drapes exactly how you want.",
    fabricSuggestion: "Cotton lawn, raw silk or chiffon — we will help you choose.",
    customizations: [
      { label: "Color", text: "Choose any shade, print or combination — or send a color reference." },
      { label: "Fabric", text: "We source it for you, or stitch with the fabric you provide." },
      { label: "Fit", text: "Made to your exact measurements and fitting preferences." },
      { label: "Details", text: "Adjust sleeves, neckline, length and finishing." },
      { label: "Embroidery", text: "Add or remove embroidery, laces and embellishments." },
    ],
    image: "/images/hero/workshop.jpg",
    alt: "The Ayesha — a formal kameez suit tailored to the customer's measurements",
  },
  {
    slug: "noor-festive-formal",
    name: "The Noor",
    category: "Festive",
    tagline: "An occasion-ready formal with a touch of drama.",
    description:
      "Designed for weddings and celebrations, The Noor pairs structured lines with rich fabric. You choose the shade, the embroidery and the level of detail — our tailors finish every seam so it feels as premium as it looks.",
    fabricSuggestion: "Silk, jamawar or heavier formal fabrics.",
    customizations: [
      { label: "Color", text: "Pick any festive shade — or share a color swatch you love." },
      { label: "Fabric", text: "We source the right formal fabric, or use your own." },
      { label: "Fit", text: "Stitched to your measurements for a perfect drape." },
      { label: "Embroidery", text: "Add hand embroidery, gota or embellishments." },
      { label: "Personal requests", text: "Tell our tailor exactly what you want changed." },
    ],
    image: "/images/services/blue.jpg",
    alt: "The Noor — a festive formal outfit made to order for an occasion",
  },
  {
    slug: "zara-chiffon-fusion",
    name: "The Zara",
    category: "Fusion",
    tagline: "A modern chiffon silhouette for the fashion-forward.",
    description:
      "The Zara blends contemporary cuts with classic finishing. Flowing, elegant and effortlessly stylish — change the sleeves, play with the neckline, or add your own twist and we will bring it to life.",
    fabricSuggestion: "Chiffon, georgette or crepe.",
    customizations: [
      { label: "Color", text: "Choose your shade or share a print reference." },
      { label: "Fabric", text: "We source it, or stitch with fabric you provide." },
      { label: "Fit", text: "Your measurements, your rise, your length." },
      { label: "Details", text: "Sleeves, neckline and drape can all be adjusted." },
      { label: "Personal requests", text: "Send any reference or sketch — we will work it out." },
    ],
    image: "/images/hero/seamstress.jpg",
    alt: "The Zara — a modern chiffon fusion outfit custom stitched",
  },
  {
    slug: "hira-lawn-suit",
    name: "The Hira",
    category: "Casual",
    tagline: "Everyday elegance in breathable lawn.",
    description:
      "Light, comfortable and made for daily wear. The Hira is stitched in breathable lawn with neat finishing that survives repeated washing — pick your favourite print and we will cut it around your measurements.",
    fabricSuggestion: "Printed cotton lawn or cambric.",
    customizations: [
      { label: "Color / print", text: "Any print or solid you like — new season or your own fabric." },
      { label: "Fabric", text: "Bring your lawn, or let us source it for you." },
      { label: "Fit", text: "Cut to your measurements with clean seams." },
      { label: "Finishing", text: "Piko, fall and overlock finishes done properly." },
      { label: "Details", text: "Sleeve length, neckline and kameez length all adjustable." },
    ],
    image: "/images/services/machine.jpg",
    alt: "The Hira — a casual lawn suit stitched to the customer's measurements",
  },
  {
    slug: "fatima-embroidered-kurti",
    name: "The Fatima",
    category: "Kurti",
    tagline: "A refined kurti with hand-finished details.",
    description:
      "The Fatima is a single-cut kurti with clean plackets, a neat collar and details that set it apart. Choose your length, sleeves and embroidery — or keep it minimal and let the fabric do the talking.",
    fabricSuggestion: "Cotton, chiffon or silk depending on the occasion.",
    customizations: [
      { label: "Color", text: "Your shade, or match an existing suit or dupatta." },
      { label: "Fabric", text: "We source it, or use fabric you already own." },
      { label: "Fit", text: "Single or straight cut, sized to your body." },
      { label: "Details", text: "Collar, placket, slits, sleeves and length." },
      { label: "Embroidery", text: "Add subtle detailing if you want it." },
    ],
    image: "/images/services/needle.jpg",
    alt: "The Fatima — an embroidered kurti with hand-finished detailing",
  },
  {
    slug: "mariam-trouser-suit",
    name: "The Mariam",
    category: "Contemporary",
    tagline: "A sharply tailored trouser suit for any day.",
    description:
      "The Mariam is tailored, contemporary and endlessly versatile. Structured trousers and a fitted top, cut precisely to your body — modify the rise, the fit and the details until it feels like yours.",
    fabricSuggestion: "Cotton, linen or a structured blend.",
    customizations: [
      { label: "Color", text: "Choose a solid or subtle tone that suits you." },
      { label: "Fabric", text: "We source a structured fabric, or use your own." },
      { label: "Fit", text: "Trouser rise, seat and length adjusted to you." },
      { label: "Details", text: "Cuffs, pockets, pleats and top styling." },
      { label: "Personal requests", text: "Tell us the exact look you are going for." },
    ],
    image: "/images/services/industrial.jpg",
    alt: "The Mariam — a contemporary tailored trouser suit made to measure",
  },
];

export function getDesign(slug: string): Design | undefined {
  return designs.find((design) => design.slug === slug);
}
