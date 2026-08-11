export type Testimonial = {
  name: string;
  area: string;
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
    rating: 5,
    text: "Got my lawn suits stitched for summer. The piko and finishing are exactly how I asked. Pickup from my door made it so easy.",
  },
  {
    name: "Ayesha K.",
    area: "Federal B. Area",
    rating: 5,
    text: "They adjusted my wedding kameez in two days and it fit perfectly. Very professional and honest about timelines.",
  },
  {
    name: "Fatima M.",
    area: "Gulberg",
    rating: 5,
    text: "The dupatta piko is the cleanest I've had done. You can tell real experience behind the work. Will definitely order again.",
  },
];
