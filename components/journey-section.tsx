"use client";

import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { cn } from "@/lib/utils";

const stages = [
  { key: "inspiration", icon: "sparkle", title: "Inspiration", text: "You find a design you love, or share your own idea with us." },
  { key: "fabric", icon: "fabric", title: "Fabric", text: "We source the fabric for you, or you provide your own." },
  { key: "customization", icon: "palette", title: "Customization", text: "Color, fit, details and measurements — everything decided by you." },
  { key: "stitching", icon: "machine", title: "Stitching", text: "Our tailoring team cuts and stitches your outfit by hand." },
  { key: "quality", icon: "check", title: "Quality Check", text: "Stitching, fitting and finishing are inspected before it leaves us." },
  { key: "delivery", icon: "truck", title: "Delivery", text: "Your finished outfit is carefully prepared and delivered to you." },
];

export function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = itemRefs.current.filter((el): el is HTMLDivElement => el !== null);
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target as HTMLDivElement);
            if (index >= 0) setActiveIndex(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const active = stages[activeIndex];

  return (
    <section id="journey" className="section-anchor bg-sand py-16 lg:py-24" aria-labelledby="journey-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="What happens next"
          title="Your outfit's journey"
          description="After you send your requirements, here is exactly what happens — at every step, you stay in control."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <div className="card p-7">
                <span className="flex size-12 items-center justify-center rounded-full bg-pine-600 text-white">
                  <ServiceIcon name={active.icon} className="size-6" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brass-600">
                  Stage {String(activeIndex + 1).padStart(2, "0")} of {stages.length}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{active.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{active.text}</p>
                <div className="mt-6 flex gap-1.5">
                  {stages.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-500",
                        i <= activeIndex ? "bg-pine-600" : "bg-sand",
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative space-y-6 before:absolute before:inset-y-4 before:left-6 before:hidden before:w-px before:bg-pine-200 sm:before:block">
              {stages.map((stage, index) => {
                const isActive = index === activeIndex;
                const done = index < activeIndex;
                return (
                  <li key={stage.key}>
                    <div
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      className={cn(
                        "card flex items-start gap-5 p-6 transition-colors duration-300",
                        isActive ? "border-pine-600/40 ring-2 ring-pine-600/10" : done ? "border-pine-600/20" : "",
                      )}
                    >
                      <span
                        className={cn(
                          "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                          isActive ? "bg-pine-600 text-white" : done ? "bg-pine-100 text-pine-700" : "bg-sand text-ink-mute",
                        )}
                      >
                        <ServiceIcon name={stage.icon} className="size-6" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-brass-600">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h4 className="mt-1 font-display text-lg font-semibold text-ink">{stage.title}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{stage.text}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
