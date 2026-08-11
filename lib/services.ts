/**
 * Service catalogue.
 *
 * Categories group related services. Each service drives its own detail page
 * (/services/[slug]) and the cards shown on the home and services pages.
 *
 * Prices are placeholders — replace `startingPrice` with real numbers or set to
 * `null` to show "Quote on request".
 */

export type ServiceCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Icon key rendered by <ServiceIcon />. */
  icon: string;
};

export type Service = {
  slug: string;
  name: string;
  categorySlug: string;
  tagline: string;
  summary: string;
  /** Description paragraphs for the detail page. */
  body: string[];
  /** Short selling points shown on the detail page. */
  highlights: string[];
  /** Starting price in PKR, or null for "quote on request". */
  startingPrice: number | null;
  /** Typical turnaround, free text (can be null). */
  turnaround: string | null;
  image: string;
  alt: string;
  popular?: boolean;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "stitching",
    name: "Stitching",
    tagline: "Custom garments made to your measurements",
    description:
      "From daily suits to formal wear, our stitching service builds garments from scratch around your body and fabric.",
    icon: "scissors",
  },
  {
    slug: "alterations",
    name: "Alterations",
    tagline: "Perfect fits for ready-made and old garments",
    description:
      "Length, waist, sleeves or full resizing — we adjust your clothes so they fit like they were made for you.",
    icon: "ruler",
  },
  {
    slug: "finishing",
    name: "Finishing",
    tagline: "Overlock, piko, dupatta piko and clean edges",
    description:
      "Professional finishing that makes the difference between home stitching and workshop quality.",
    icon: "hem",
  },
  {
    slug: "repairs",
    name: "Repairs",
    tagline: "Zip, buttons, seams and minor fixes",
    description:
      "Quick, reliable repairs that give your favourite clothes a longer life.",
    icon: "thread",
  },
];

export const services: Service[] = [
  {
    slug: "ladies-suit-stitching",
    name: "Ladies Suit Stitching",
    categorySlug: "stitching",
    tagline: "Complete three-piece suits stitched around your measurements",
    summary:
      "Shalwar kameez, trousers and dupatta stitched as a set with clean seams and professional finishing.",
    body: [
      "Get a complete women's suit — kameez, trousers and dupatta — stitched around your exact measurements. We handle cotton, lawn, chiffon and heavier winter fabrics with the right needles and tension for each.",
      "Choose your own cutting pattern or follow the design you share with us. Our stitchers keep seams straight, collars crisp and finishing clean, so the garment looks as good inside as it does outside.",
    ],
    highlights: [
      "Shalwar kameez, trouser and dupatta stitching",
      "Works with lawn, cotton, chiffon and winter fabrics",
      "Clean overlocking and professional fall finishing",
      "Made to your measurements or a design you share",
    ],
    startingPrice: 2500,
    turnaround: "3–5 days",
    image: "/images/services/machine.jpg",
    alt: "Professional sewing machine stitching a ladies suit in a tailoring workshop",
    popular: true,
  },
  {
    slug: "kurti-stitching",
    name: "Kurti Stitching",
    categorySlug: "stitching",
    tagline: "Kurtis with clean lines, neat slits and a perfect drape",
    summary:
      "Single and straight-cut kurtis stitched to your size with tidy plackets, collars and finishing.",
    body: [
      "We stitch kurtis in single or straight cuts for lawn, cotton and chiffon. Plackets, collars, sleeves and side slits are finished with care so the kurti hangs well and survives repeated washing.",
      "Share the design reference or measurements through WhatsApp and we'll take care of cutting, stitching and finishing.",
    ],
    highlights: [
      "Single and straight cut kurtis",
      "Neat plackets, collars and side slits",
      "Suitable for lawn, cotton and chiffon",
      "Stitched to your measurements",
    ],
    startingPrice: 1500,
    turnaround: "2–4 days",
    image: "/images/services/needle.jpg",
    alt: "Hand sewing a kurti with needle and thread",
  },
  {
    slug: "shalwar-trouser-stitching",
    name: "Shalwar & Trouser Stitching",
    categorySlug: "stitching",
    tagline: "Well-fitted bottoms with a comfortable rise",
    summary:
      "Shalwars and trousers cut and stitched for a comfortable fit and clean finish.",
    body: [
      "Whether you need a baggy shalwar or a straight-cut trouser, we stitch bottoms with the correct rise, seat and length for your body. Elastic or drawstring options are both handled.",
      "Bring your fabric and measurements, or send them on WhatsApp, and we'll complete the rest.",
    ],
    highlights: [
      "Shalwar, trouser and palazzo options",
      "Correct rise, seat and length fitting",
      "Elastic and drawstring finishes",
      "Quick turnaround for simple cuts",
    ],
    startingPrice: 1000,
    turnaround: "2–3 days",
    image: "/images/services/fabric.jpg",
    alt: "Fabric being cut and measured for trouser stitching",
  },
  {
    slug: "custom-tailoring",
    name: "Custom Tailoring",
    categorySlug: "stitching",
    tagline: "Any design, made from scratch for you",
    summary:
      "Festive, formal or everyday outfits built around a design you choose, from cutting to final finishing.",
    body: [
      "For outfits that don't fit a standard pattern, our custom tailoring service builds the garment from scratch around your chosen design. We discuss the look, take the measurements, and handle cutting, stitching and finishing in-house.",
      "This is the right option for bridal support wear, formal outfits, and any design you've seen that needs an experienced pair of hands to bring to life.",
    ],
    highlights: [
      "Made-to-order garments from your design reference",
      "In-house cutting, stitching and finishing",
      "Suited to formal and festive outfits",
      "Personal guidance on fabric and finishing",
    ],
    startingPrice: 3500,
    turnaround: "4–7 days",
    image: "/images/services/industrial.jpg",
    alt: "Tailor working on a custom garment at an industrial sewing machine",
    popular: true,
  },
  {
    slug: "length-alteration",
    name: "Length Alteration",
    categorySlug: "alterations",
    tagline: "Trousers, sleeves and kameez adjusted to your length",
    summary:
      "Shorten or let out length on trousers, kameez, sleeves and shalwars without losing the original finish.",
    body: [
      "Ready-made clothes rarely fit perfectly. We adjust length on trousers, kameez, sleeves and shalwars while preserving the original hem and finishing as much as possible.",
      "In most cases the work is completed the same day — ideal for wedding outfits and important events.",
    ],
    highlights: [
      "Trouser, shalwar, kameez and sleeve length",
      "Original hem preserved where possible",
      "Most work completed same day",
      "Affordable fixed-rate pricing",
    ],
    startingPrice: 400,
    turnaround: "Same day",
    image: "/images/services/machine.jpg",
    alt: "Measuring tape used for length alteration on a garment",
  },
  {
    slug: "waist-size-adjustment",
    name: "Waist & Size Adjustment",
    categorySlug: "alterations",
    tagline: "Take in or let out to fit your body",
    summary:
      "Waistbands and side seams adjusted so trousers, skirts and shalwars sit comfortably.",
    body: [
      "We adjust waistbands and side seams on trousers, skirts and shalwars so they fit properly around the waist and hips. The work is done cleanly so no pulling or puckering is left behind.",
      "Bring the garment in or send it for pickup, and we'll have it fitting correctly within a day or two.",
    ],
    highlights: [
      "Waist take-in and let-out",
      "Side seam and hip adjustments",
      "Clean, unpuckered stitching",
      "Quick turnaround",
    ],
    startingPrice: 500,
    turnaround: "1–2 days",
    image: "/images/services/fabric.jpg",
    alt: "Waistband adjustment on trousers in a tailoring workshop",
  },
  {
    slug: "sleeve-adjustment",
    name: "Sleeve Adjustment",
    categorySlug: "alterations",
    tagline: "Sleeves shortened, taken in or re-fitted",
    summary:
      "Sleeve length and fit corrected for shirts, kameez, coats and kurtis.",
    body: [
      "Whether sleeves are too long, too wide, or need a completely new fit, we adjust them while keeping the cuff and armhole looking natural. Works on shirts, kameez, kurtis and coats.",
    ],
    highlights: [
      "Shortening and lengthening sleeves",
      "Sleeve width and armhole fitting",
      "Neat cuffs and finishes",
    ],
    startingPrice: 400,
    turnaround: "1–2 days",
    image: "/images/services/needle.jpg",
    alt: "Sleeve adjustment on a garment being sewn",
  },
  {
    slug: "fitting-adjustment",
    name: "Fitting Adjustment",
    categorySlug: "alterations",
    tagline: "Full-garment resizing for a perfect fit",
    summary:
      "Complete fitting corrections across a garment so it follows your body comfortably.",
    body: [
      "When a garment needs more than a single fix, our fitting adjustment service resizes it properly — waist, hips, bust, shoulders and length all corrected together.",
      "We assess the garment, explain what can be changed and do the work in stages so the proportions stay balanced.",
    ],
    highlights: [
      "Multi-point resizing in one service",
      "Waist, hips, bust, shoulders and length",
      "Balanced, proportional results",
      "Free fit assessment before work starts",
    ],
    startingPrice: 800,
    turnaround: "2–3 days",
    image: "/images/services/blue.jpg",
    alt: "Garment pinned and marked for fitting adjustment",
    popular: true,
  },
  {
    slug: "overlocking",
    name: "Overlock & Seam Finishing",
    categorySlug: "finishing",
    tagline: "Ragged edges finished so nothing frays",
    summary:
      "Professional overlocking on seams and edges that keeps fabric from fraying and garments looking tidy inside.",
    body: [
      "Overlocking binds raw fabric edges so seams stay strong and fabric doesn't fray. It's the finishing step that separates home stitching from professional work.",
      "We overlock new garments, raw-cut fabric edges, and can refresh existing garments where seams have started to open.",
    ],
    highlights: [
      "All seam types and fabric edges",
      "Strong, fray-resistant seams",
      "Also freshens existing garments",
      "Fast, inexpensive service",
    ],
    startingPrice: 300,
    turnaround: "Same day",
    image: "/images/services/industrial.jpg",
    alt: "Overlock machine finishing a fabric seam",
  },
  {
    slug: "piko",
    name: "Piko / Fall Stitching",
    categorySlug: "finishing",
    tagline: "The classic piko edge done properly",
    summary:
      "Piko and fall finishing on kameez, dupattas and trousers — the traditional Karachi finishing people ask for.",
    body: [
      "Piko is the fine, looped edge finish used on shalwar kameez and dupattas. We stitch it evenly and tightly so the edge holds through repeated washing.",
      "We also do fall stitching (adding and hemming the fall) for trouser and kameez bottoms, keeping lines straight and secure.",
    ],
    highlights: [
      "Even, tight piko edges",
      "Fall stitching on bottoms",
      "Holds up through washing",
      "Suitable for lawn, cotton and silk",
    ],
    startingPrice: 300,
    turnaround: "Same day",
    image: "/images/services/needle.jpg",
    alt: "Piko edge finishing on a dupatta",
    popular: true,
  },
  {
    slug: "dupatta-piko",
    name: "Dupatta Piko",
    categorySlug: "finishing",
    tagline: "Dupattas finished with a clean, even edge",
    summary:
      "Dupatta edges finished with piko so they hang cleanly and don't fray.",
    body: [
      "A well-finished dupatta completes a suit. We stitch piko along the edges of your dupatta so it hangs straight, doesn't fray and looks neat on both sides.",
      "Bring the dupatta along with your stitching order, or send it separately.",
    ],
    highlights: [
      "Clean even piko on all four edges",
      "Prevents fraying and curling",
      "Pairs perfectly with new stitching orders",
    ],
    startingPrice: 500,
    turnaround: "1–2 days",
    image: "/images/services/blue.jpg",
    alt: "Dupatta with a clean piko finished edge",
  },
  {
    slug: "garment-finishing",
    name: "Garment Finishing",
    categorySlug: "finishing",
    tagline: "Belt lines, hooks, labels and final details",
    summary:
      "Final details — belt lines, hooks and eyes, thread cleaning and label fixing — for a polished result.",
    body: [
      "Finishing is about the details other people don't see but you can feel. We add belt lines, hooks and eyes, fix labels, clean loose threads and press the garment so it's ready to wear.",
      "Often combined with a new stitching order, but available on its own for ready-made clothes too.",
    ],
    highlights: [
      "Belt lines, hooks, eyes and labels",
      "Loose thread cleaning",
      "Final pressing",
      "Ready-to-wear results",
    ],
    startingPrice: 400,
    turnaround: "Same day",
    image: "/images/services/machine.jpg",
    alt: "Finished garment detail being completed at a sewing machine",
  },
  {
    slug: "zip-repair",
    name: "Zip Repair & Replacement",
    categorySlug: "repairs",
    tagline: "Stuck or broken zips fixed fast",
    summary:
      "Broken sliders, stuck zips and open seams around zips repaired or replaced cleanly.",
    body: [
      "A stuck or broken zip doesn't mean the end of the garment. We repair sliders, re-stitch zip openings and replace zips where needed, matching the length and colour as closely as possible.",
    ],
    highlights: [
      "Slider repair and zip replacement",
      "Re-stitching of zip openings",
      "Length and colour matching",
    ],
    startingPrice: 300,
    turnaround: "Same day",
    image: "/images/services/needle.jpg",
    alt: "Replacing a zip on a garment",
  },
  {
    slug: "button-replacement",
    name: "Button & Hook Replacement",
    categorySlug: "repairs",
    tagline: "Missing buttons and hooks replaced",
    summary:
      "Buttons, hooks, press studs and belt buckles replaced or repositioned neatly.",
    body: [
      "Losing a button shouldn't mean losing the outfit. We replace buttons, hooks, press studs and belt buckles, and can reposition them where they've shifted.",
    ],
    highlights: [
      "Button, hook and press stud replacement",
      "Neat, secure stitching",
      "Repositioning where needed",
    ],
    startingPrice: 150,
    turnaround: "Same day",
    image: "/images/services/fabric.jpg",
    alt: "Replacing a button on a garment",
  },
  {
    slug: "seam-repair",
    name: "Seam & Tear Repair",
    categorySlug: "repairs",
    tagline: "Opened seams and small tears invisibly repaired",
    summary:
      "Opened seams and small tears stitched back so they look and hold like new.",
    body: [
      "We repair opened seams and small tears on all kinds of garments. Where possible the repair is done so the stitch blends with the original.",
    ],
    highlights: [
      "Opened seam re-stitching",
      "Small tear repairs",
      "Repairs done to blend with original stitching",
    ],
    startingPrice: 300,
    turnaround: "Same day",
    image: "/images/services/machine.jpg",
    alt: "Repairing an opened seam at a sewing machine",
  },
  {
    slug: "minor-repairs",
    name: "Minor Clothing Repairs",
    categorySlug: "repairs",
    tagline: "Everyday fixes for everyday wear",
    summary:
      "Loose hems, hooks, belt loops and other small repairs done quickly and affordably.",
    body: [
      "Loose hems, dropped belt loops, missing hooks — the small issues that make clothes unwearable. We fix them quickly and affordably so your wardrobe stays in rotation.",
    ],
    highlights: [
      "Hems, belt loops and hook fixes",
      "Affordable flat-rate repairs",
      "Usually ready the same day",
    ],
    startingPrice: 200,
    turnaround: "Same day",
    image: "/images/services/blue.jpg",
    alt: "Small clothing repair being stitched by hand",
  },
];

export function getCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByCategory(categorySlug: string): Service[] {
  return services.filter((s) => s.categorySlug === categorySlug);
}
