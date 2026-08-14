import Image from "next/image";

import { Button } from "@/components/button";
import { ServiceIcon } from "@/components/service-icon";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-pine-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brass-200/40 blur-3xl" />
      </div>

      <div className="container-site relative grid items-center gap-12 py-14 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-6">
          <span className="eyebrow">Custom Tailoring Studio</span>
          <h1
            id="hero-heading"
            className="mt-5 font-display text-[2.6rem] leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]"
          >
            Your Design.
            <br />
            <em className="font-display italic text-pine-600">Tailored</em> Your
            Way.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Choose a design you love, tell us how you want it, and we&apos;ll
            create it specifically for you — from fabric selection to final
            stitching.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href="/custom-order">
              Get This Design Made
            </Button>
            <Button variant="outline" size="lg" href="/#designs">
              Explore Designs
            </Button>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium tracking-wide text-ink-mute">
            <span className="inline-flex items-center gap-1.5">
              <ServiceIcon name="check" className="size-4 text-pine-600" />
              Custom Made
            </span>
            <span className="text-brass-500" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ServiceIcon name="check" className="size-4 text-pine-600" />
              Made to Measure
            </span>
            <span className="text-brass-500" aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <ServiceIcon name="check" className="size-4 text-pine-600" />
              Delivered to You
            </span>
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <Image
              src="/images/hero/seamstress.jpg"
              alt="A tailored outfit being finished by hand in our custom tailoring studio"
              width={1800}
              height={2700}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-soft"
              priority
            />
            <div className="animate-float-soft absolute -bottom-6 left-6 hidden items-center gap-3 rounded-2xl border border-ink/8 bg-white/95 p-4 shadow-soft backdrop-blur sm:flex">
              <span className="flex size-11 items-center justify-center rounded-full bg-pine-50 text-pine-700">
                <ServiceIcon name="fabric" className="size-6" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Your fabric or ours</p>
                <p className="text-xs text-ink-mute">We source it, or use yours</p>
              </div>
            </div>
            <div className="absolute -top-5 right-6 rounded-full bg-pine-600 px-4 py-2 text-sm font-medium text-white shadow-soft">
              Made for you, not off the rack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
