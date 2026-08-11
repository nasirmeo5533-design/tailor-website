import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";

const tiles = [
  {
    icon: "machine",
    title: "Professional machines & tailors",
    text: "Modern machines and experienced stitchers handle every order with the care your fabric deserves.",
  },
  {
    icon: "sparkle",
    title: "Clean finishing",
    text: "Piko, overlock and fall finishing done properly, so garments look as good inside as outside.",
  },
  {
    icon: "shield",
    title: "Careful with your clothes",
    text: "We handle your garments with respect — clean, careful work and no shortcuts.",
  },
  {
    icon: "clock",
    title: "On-time delivery",
    text: "Honest timelines confirmed up front, and most simple alterations ready within a day or two.",
  },
  {
    icon: "truck",
    title: "Pickup & delivery in Karachi",
    text: "Send your clothes through WhatsApp and we'll arrange doorstep pickup and delivery.",
  },
  {
    icon: "chat",
    title: "WhatsApp support",
    text: "Quick replies on WhatsApp for quotes, measurements and order updates — no phone tag.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby="trust-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why women choose us"
          title="A workshop you can trust"
          description="Real craftsmanship from a physical tailoring workshop in Karachi — clear pricing, honest timelines and clean finishing."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <div key={tile.title} className="card p-6">
              <div className="flex size-11 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                <ServiceIcon name={tile.icon} className="size-6" />
              </div>
              <h3 className="mt-4 font-display text-lg text-ink">{tile.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{tile.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
