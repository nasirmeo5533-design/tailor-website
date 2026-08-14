export type Testimonial = {
  name: string;
  area: string;
  outfit: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

/**
 * Placeholder testimonials — replace with real customer reviews before launch.
 * Do not present unverified reviews as real.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Sana R.",
    area: "Gulshan-e-Iqbal",
    outfit: "The Ayesha, custom-fit lawn suit",
    rating: 5,
    text: "I showed them a reference design and asked for a few changes. They understood exactly what I wanted and the final outfit turned out beautifully.",
  },
  {
    name: "Ayesha K.",
    area: "Federal B. Area",
    outfit: "The Noor, festive formal",
    rating: 5,
    text: "Sent my own fabric and a photo of an outfit I liked. They handled everything — fitting, embroidery and delivery — and it fit me perfectly.",
  },
  {
    name: "Fatima M.",
    area: "Gulberg",
    outfit: "The Zara, chiffon fusion",
    rating: 5,
    text: "I wasn't sure what fabric to use, so they sourced the chiffon for me and guided me through every choice. Truly made to measure.",
  },
];
