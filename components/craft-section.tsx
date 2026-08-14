import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/button";

const crafts = [
  { icon: "scissors", label: "Precision cutting" },
  { icon: "machine", label: "Skilled stitching" },
  { icon: "ruler", label: "True measurements" },
  { icon: "sparkle", label: "Detail & embroidery" },
  { icon: "hem", label: "Clean finishing" },
];

export function CraftSection() {
  return (
    <section id="craft" className="section-anchor bg-sand py-16 lg:py-24" aria-labelledby="craft-heading">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Image
            src="/images/services/needle.jpg"
            alt="Hand stitching a custom garment with needle and thread"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="w-full rounded-3xl object-cover shadow-soft"
          />
          <Image
            src="/images/services/industrial.jpg"
            alt="Tailor finishing a custom-made outfit at an industrial sewing machine"
            width={900}
            height={700}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="absolute -bottom-8 -right-4 hidden w-1/2 rounded-2xl border-4 border-sand object-cover shadow-soft sm:block"
          />
        </div>
        <div>
          <SectionHeading
            align="left"
            eyebrow="The craftsmanship"
            title="Made By Hands. Finished With Precision."
          />
          <div className="mt-4 space-y-4 text-ink-soft">
            <p className="leading-relaxed">
              Every piece is made with attention to detail — not mass-produced.
              From cutting to final pressing, your outfit passes through
              experienced hands that treat the fabric, the seams and the
              finishing with care.
            </p>
            <p className="leading-relaxed">
              You choose the design and the details. Our tailors handle the
              craft, so the result looks every bit as considered as the idea
              you started with.
            </p>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-ink sm:grid-cols-2">
            {crafts.map((craft) => (
              <li key={craft.label} className="flex items-center gap-2">
                <ServiceIcon name={craft.icon} className="size-5 text-pine-600" />
                {craft.label}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button variant="primary" href="/custom-order">
              Get This Design Made
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
