import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { waMessages } from "@/lib/site";

const options = [
  {
    icon: "sparkle",
    title: "Option 1 — We Source It",
    text: "Tell us what type of fabric you want and we&apos;ll help source the right material for your design, color and budget.",
    points: ["Lawn, cotton, chiffon, silk & more", "Guidance on the best fabric for your design", "We handle sourcing end to end"],
  },
  {
    icon: "fabric",
    title: "Option 2 — You Provide It",
    text: "Already have your own fabric? Send it to us and we&apos;ll create your selected design using your fabric.",
    points: ["Works with most fabrics", "We advise on quantity needed", "Carefully handled and cut"],
  },
];

export function FabricSection() {
  return (
    <section id="fabric" className="section-anchor bg-sand py-16 lg:py-24" aria-labelledby="fabric-heading">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            eyebrow="Fabric flexibility"
            title="Your Fabric. Our Craft."
            description="The right fabric makes the outfit. Work with what you already own, or let our team source the perfect material for your design."
          />
          <div className="mt-8">
            <WhatsAppButton size="lg" message={waMessages.fabric}>
              Discuss Fabric Options
            </WhatsAppButton>
          </div>
          <div className="relative mt-8 hidden overflow-hidden rounded-3xl lg:block">
            <Image
              src="/images/services/fabric.jpg"
              alt="Premium fabric being prepared for custom tailoring"
              width={1200}
              height={800}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft"
            />
          </div>
        </div>
        <div className="grid gap-6 lg:col-span-7">
          {options.map((option) => (
            <div key={option.title} className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-5 sm:p-7">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                <ServiceIcon name={option.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{option.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{option.text}</p>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {option.points.map((point) => (
                    <li key={point} className="flex items-center gap-1.5 text-sm text-ink">
                      <ServiceIcon name="check" className="size-4 text-pine-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
