import Image from "next/image";

import { Button } from "@/components/button";
import { ServiceIcon } from "@/components/service-icon";

const flow = [
  { label: "Your reference", icon: "pencil", text: "A photo, sketch, screenshot or idea" },
  { label: "We understand", icon: "chat", text: "We clarify your requirements" },
  { label: "We make it", icon: "machine", text: "Cut, stitched and finished for you" },
];

export function OwnDesign() {
  return (
    <section
      id="own-design"
      className="section-anchor relative overflow-hidden bg-pine-900 py-16 text-cream lg:py-24"
      aria-labelledby="own-design-heading"
    >
      <div
        className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-pine-600/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-brass-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow text-brass-300">Not just our collection</span>
          <h2
            id="own-design-heading"
            className="mt-4 font-display text-3xl tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            Have Your Own Design?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-pine-100/90">
            Send us your reference, inspiration, sketch, screenshot or idea.
            We&apos;ll understand your requirements and create it for you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="brass" size="lg" href="/custom-order">
              Send Your Design
            </Button>
            <Button variant="white" size="lg" href="/#designs">
              Or Browse Our Designs
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-pine-200/80">
            <ServiceIcon name="check" className="size-4 text-brass-400" />
            No design selected yet? That&apos;s fine — tell us your idea and we&apos;ll suggest options.
          </p>
        </div>

        <div>
          <div className="grid gap-4">
            {flow.map((step, index) => (
              <div
                key={step.label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brass-500 text-pine-900">
                  <ServiceIcon name={step.icon} className="size-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-white">
                    {String(index + 1).padStart(2, "0")} · {step.label}
                  </p>
                  <p className="text-sm text-pine-100/80">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Image
            src="/images/services/fabric.jpg"
            alt="Fabric being measured and cut for a custom-made outfit"
            width={1200}
            height={800}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="mt-4 h-40 w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
