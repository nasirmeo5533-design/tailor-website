"use client";

import { useEffect } from "react";

import Image from "next/image";

import type { Design } from "@/lib/designs";
import { Button } from "@/components/button";
import { ServiceIcon } from "@/components/service-icon";
import { WhatsAppButton } from "@/components/whatsapp-button";

type DesignModalProps = {
  design: Design;
  onClose: () => void;
};

export function DesignModal({ design, onClose }: DesignModalProps) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${design.name} — design details`}
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close design details"
        onClick={onClose}
        className="modal-overlay absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />
      <div className="modal-panel relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-cream shadow-soft sm:rounded-3xl">
        <div className="relative shrink-0">
          <Image
            src={design.image}
            alt={design.alt}
            width={1800}
            height={2700}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[16/9] w-full object-cover sm:aspect-[21/10]"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-ink/50 text-white backdrop-blur transition-colors hover:bg-ink/70"
          >
            <ServiceIcon name="close" className="size-5" />
          </button>
          <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-6">
            <p className="eyebrow text-brass-300">{design.category}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-white sm:text-3xl">
              {design.name}
            </h3>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <p className="text-lg font-medium text-ink">{design.tagline}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">{design.description}</p>

          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brass-300/60 bg-brass-200/30 p-4">
            <ServiceIcon name="fabric" className="mt-0.5 size-5 shrink-0 text-brass-700" />
            <div>
              <p className="text-sm font-semibold text-ink">Fabric suggestion</p>
              <p className="mt-0.5 text-sm text-ink-soft">
                {design.fabricSuggestion} You can also provide your own fabric.
              </p>
            </div>
          </div>

          <h4 className="mt-6 font-display text-lg font-semibold text-ink">
            Everything below can be customized
          </h4>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {design.customizations.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <ServiceIcon name="check" className="mt-0.5 size-5 shrink-0 text-pine-600" />
                <div>
                  <p className="text-sm font-semibold text-ink">{item.label}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-6 sm:flex-row">
            <Button
              variant="primary"
              size="lg"
              href={`/custom-order?design=${design.slug}`}
              className="flex-1"
            >
              I Want This Design
            </Button>
            <WhatsAppButton
              size="lg"
              message={`Hello! I love the ${design.name} design. I'd like to get it made for me.`}
            >
              Ask About This Design
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
