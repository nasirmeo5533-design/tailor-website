"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ServiceIcon } from "@/components/service-icon";

type FaqAccordionProps = {
  items: { question: string; answer: string }[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white px-4 shadow-card sm:px-6">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              id={`faq-button-${i}`}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-2 py-5 text-left font-medium text-ink"
            >
              {item.question}
              <ServiceIcon
                name="arrow-right"
                className={cn(
                  "size-4 shrink-0 text-brass-600 transition-transform duration-300",
                  open ? "-rotate-90" : "rotate-90",
                )}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!open}
            >
              <p className="px-2 pb-5 text-sm leading-relaxed text-ink-soft">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
