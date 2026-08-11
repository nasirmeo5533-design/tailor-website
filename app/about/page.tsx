import type { Metadata } from "next";
import Image from "next/image";

import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "About our ladies tailoring workshop in Karachi — craftsmanship, honest timelines and clean finishing.",
  path: "/about",
});

const values = [
  {
    icon: "shield",
    title: "Craftsmanship & quality",
    text: "Clean seams, even piko and finishing that holds up to wear and washing.",
  },
  {
    icon: "clock",
    title: "Honest pricing & timelines",
    text: "We confirm price and delivery date before work starts, and stick to it.",
  },
  {
    icon: "chat",
    title: "Clear communication",
    text: "You always know where your order stands — on WhatsApp, in plain language.",
  },
] as const;

const story = [
  "We are a family-run ladies tailoring workshop in Karachi. No middlemen, no outsourcing — your clothes are handled in-house by people who have spent years at the machine.",
  "From daily lawn suits to wedding outfits, our work is built on careful measurements, straight seams and finishing that looks as good inside as it does outside.",
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand py-14 lg:py-20" aria-label="About our workshop">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our story"
            title="A workshop built on good stitching"
            description="We are a family-run ladies tailoring workshop in Karachi. No middlemen, no outsourcing — your clothes are handled in-house."
          />
        </div>
      </section>
      <section className="bg-cream py-14 lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="/images/hero/seamstress.jpg"
                alt="Seamstress at work in our tailoring workshop"
                width={1600}
                height={1067}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-soft sm:mt-12">
              <Image
                src="/images/hero/workshop.jpg"
                alt="Inside our tailoring workshop in Karachi"
                width={1800}
                height={2700}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              Your clothes never leave our workshop
            </h2>
            <div className="mt-6 space-y-4 text-ink-soft">
              {story.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <h3 className="mt-10 font-display text-xl text-ink">What we stand for</h3>
            <div className="mt-6 space-y-6">
              {values.map((value) => (
                <div key={value.title} className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                    <ServiceIcon name={value.icon} className="size-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">{value.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{value.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
