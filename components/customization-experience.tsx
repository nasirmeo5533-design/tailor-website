"use client";

import { useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { cn } from "@/lib/utils";

const options = [
  {
    key: "design",
    icon: "sparkle",
    title: "Design",
    text: "Choose any design from our collection, or send us your own reference and we will work around it.",
    chips: ["Our designs", "Your reference", "Your sketch"],
  },
  {
    key: "fabric",
    icon: "fabric",
    title: "Fabric",
    text: "We source the fabric for you, or you can provide your own. Either way, we work with what suits your design best.",
    chips: ["We source it", "Your fabric"],
  },
  {
    key: "color",
    icon: "palette",
    title: "Color",
    text: "Choose your preferred color or shade — solid, print or a combination. Send a swatch if you have one.",
    chips: ["Any shade", "Print", "Match existing"],
  },
  {
    key: "fit",
    icon: "ruler",
    title: "Fit",
    text: "Tell us your measurements and fitting preferences. We cut and stitch around your body, not a standard size chart.",
    chips: ["Your measurements", "Photo reference", "Video fitting"],
  },
  {
    key: "details",
    icon: "scissors",
    title: "Details",
    text: "Modify sleeves, neckline, embroidery, length and finishing until every detail is exactly how you imagined it.",
    chips: ["Sleeves", "Neckline", "Embroidery", "Length"],
  },
  {
    key: "requests",
    icon: "chat",
    title: "Personal Requests",
    text: "Tell our tailor exactly what you want changed. No request is too specific — we listen and we deliver.",
    chips: ["Anything specific"],
  },
];

export function CustomizationExperience() {
  const [activeKey, setActiveKey] = useState(options[0].key);
  const active = options.find((option) => option.key === activeKey) ?? options[0];

  return (
    <section id="customize" className="section-anchor bg-cream py-16 lg:py-24" aria-labelledby="customize-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="The customization experience"
          title="Make It Yours"
          description="You don't pick from what's on the rack. You decide every part of your outfit — and we bring it to life."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div
            className="flex gap-3 overflow-x-auto pb-2 lg:col-span-5 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0"
            role="tablist"
            aria-label="Customization options"
          >
            {options.map((option) => {
              const isActive = option.key === activeKey;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="tab"
                  id={`customize-tab-${option.key}`}
                  aria-selected={isActive}
                  aria-controls={`customize-panel-${option.key}`}
                  onClick={() => setActiveKey(option.key)}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-200",
                    isActive
                      ? "border-pine-600 bg-pine-50 text-pine-800"
                      : "border-ink/10 bg-white text-ink-soft hover:border-pine-600/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
                      isActive ? "bg-pine-600 text-white" : "bg-sand text-ink-mute",
                    )}
                  >
                    <ServiceIcon name={option.icon} className="size-5" />
                  </span>
                  <span className="text-sm font-semibold">{option.title}</span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div
              key={active.key}
              role="tabpanel"
              id={`customize-panel-${active.key}`}
              aria-labelledby={`customize-tab-${active.key}`}
              className="card modal-panel flex h-full flex-col justify-between p-6 sm:p-8"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brass-600">
                  <ServiceIcon name={active.icon} className="size-4" />
                  Customize · {active.title}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
                  {active.text}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {active.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-pine-600/25 bg-pine-50 px-3 py-1.5 text-xs font-medium text-pine-800"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
