import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/button";

const steps = [
  {
    step: "01",
    icon: "sparkle",
    title: "Choose Your Design",
    text: "Browse our designs or send us your own inspiration.",
  },
  {
    step: "02",
    icon: "chat",
    title: "Tell Us What You Want",
    text: "Share your fabric, color, measurements and customization requirements.",
  },
  {
    step: "03",
    icon: "machine",
    title: "We Prepare Your Outfit",
    text: "Our tailoring team cuts, designs and stitches your outfit to your requirements.",
  },
  {
    step: "04",
    icon: "check",
    title: "Quality Check",
    text: "Every finished piece is checked for stitching, fitting and finishing.",
  },
  {
    step: "05",
    icon: "truck",
    title: "We Deliver",
    text: "Your custom-made outfit is carefully prepared and delivered to you.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-anchor bg-cream py-16 lg:py-24" aria-labelledby="how-it-works-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Simple process"
          title="From your idea to a finished outfit"
          description="Five clear steps — you tell us what you want, we handle everything else."
        />
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <li key={step.step} className="card relative flex flex-col p-6">
              <span className="font-display text-4xl font-semibold text-brass-500">{step.step}</span>
              <span className="mt-5 flex size-10 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                <ServiceIcon name={step.icon} className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 text-center">
          <Button variant="primary" size="lg" href="/custom-order">
            Start Your Custom Order
          </Button>
        </div>
      </div>
    </section>
  );
}
