import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";

const readyMade = [
  "Fixed design",
  "Fixed sizing",
  "Limited customization",
  "Limited fabric choices",
];

const customMade = [
  "Your preferred design",
  "Your measurements",
  "Your fabric",
  "Your color",
  "Your modifications",
  "Your personal requirements",
];

export function WhyCustom() {
  return (
    <section id="why-custom" className="section-anchor bg-cream py-16 lg:py-24" aria-labelledby="why-custom-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Why custom tailoring"
          title="Because Your Outfit Shouldn't Be One-Size-Fits-All."
          description="Off-the-rack is designed for no one in particular. Custom tailoring is designed for you — your taste, your body, your fabric."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 bg-white p-7 opacity-90 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink-mute">Ready-Made</h3>
            <ul className="mt-5 space-y-3">
              {readyMade.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                  <ServiceIcon name="close" className="size-4 shrink-0 text-ink-mute" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative rounded-3xl border border-pine-600/30 bg-pine-50 p-7 shadow-soft sm:p-8">
            <span className="absolute -top-3.5 left-7 rounded-full bg-pine-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              Custom Made
            </span>
            <h3 className="font-display text-lg font-semibold text-pine-800">Custom Made</h3>
            <ul className="mt-5 space-y-3">
              {customMade.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink">
                  <ServiceIcon name="check" className="size-4 shrink-0 text-pine-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
