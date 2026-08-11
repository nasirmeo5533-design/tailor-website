import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { WhatsAppButton } from "@/components/whatsapp-button";

const steps = [
  {
    step: 1,
    icon: "chat",
    title: "Send on WhatsApp",
    text: "Share the design, fabric details and your measurements.",
  },
  {
    step: 2,
    icon: "machine",
    title: "We stitch & finish",
    text: "Cutting, stitching, overlock and finishing at our workshop.",
  },
  {
    step: 3,
    icon: "check",
    title: "Quality check",
    text: "Every seam and edge checked before it leaves us.",
  },
  {
    step: 4,
    icon: "truck",
    title: "Pickup or delivery",
    text: "Collect from the shop or get it delivered in Karachi.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-sand py-16 lg:py-24" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Simple process"
          title="How it works"
          description="From WhatsApp message to finished garment in four easy steps."
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <li key={step.step} className="relative">
              <div className="card rounded-2xl border border-ink/8 bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-pine-600 font-display text-white">
                    {step.step}
                  </span>
                  <ServiceIcon name={step.icon} className="size-5 text-brass-600" />
                </div>
                <h3 className="mt-4 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <WhatsAppButton message="Hello! I'd like to start a tailoring order." />
        </div>
      </div>
    </section>
  );
}
