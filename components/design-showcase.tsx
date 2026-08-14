"use client";

import { useState } from "react";

import Image from "next/image";

import { designs, type Design } from "@/lib/designs";
import { SectionHeading } from "@/components/section-heading";
import { DesignModal } from "@/components/design-modal";
import { Reveal } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";

type DesignShowcaseProps = {
  limit?: number;
};

function DesignCard({ design, onOpen }: { design: Design; onOpen: (design: Design) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(design)}
      className="group flex flex-col rounded-3xl bg-white text-left shadow-card transition-shadow duration-300 hover:shadow-soft"
      aria-label={`${design.name} — view details`}
    >
      <div className="overflow-hidden rounded-t-3xl">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={design.image}
            alt={design.alt}
            width={1200}
            height={1600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink backdrop-blur">
            {design.category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-ink">{design.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{design.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pine-700 transition-colors group-hover:text-pine-600">
          Get This Design Made
          <ServiceIcon
            name="arrow-right"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </button>
  );
}

export function DesignShowcase({ limit }: DesignShowcaseProps) {
  const [active, setActive] = useState<Design | null>(null);
  const visible = limit ? designs.slice(0, limit) : designs;

  return (
    <section id="designs" className="section-anchor bg-sand py-16 lg:py-24" aria-labelledby="designs-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="The collection"
          title="Find a Design You Love"
          description="Every design is a starting point — not a final product. Choose one, then tell us exactly how you want it made for you."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((design, index) => (
            <Reveal key={design.slug} delay={index % 3 === 1 ? "delay-100" : index % 3 === 2 ? "delay-200" : undefined}>
              <DesignCard design={design} onOpen={setActive} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink-mute">
          Don&apos;t see what you&apos;re looking for? We make designs from your
          own references too.
        </p>
      </div>
      {active ? <DesignModal design={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
