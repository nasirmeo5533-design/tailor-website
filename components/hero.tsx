import Image from "next/image";

import { waMessages } from "@/lib/site";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/button";
import { ServiceIcon } from "@/components/service-icon";

const trustChips = ["Physical shop in Karachi", "Same-day alterations", "Pickup & delivery"];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 60% at 15% 10%, rgba(14, 92, 70, 0.06), transparent), linear-gradient(to bottom, #faf7f2, #f3ede1)",
      }}
    >
      <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="eyebrow">Ladies Tailoring · Karachi</span>
          <h1
            id="hero-heading"
            className="mt-4 font-display text-4xl tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Stitched by{" "}
            <em className="font-display italic text-pine-600">hand</em>, finished
            with care
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
            Professional women&rsquo;s tailoring and alterations from a real
            workshop in Gulshan-e-Iqbal, Karachi. Order on WhatsApp, drop by the
            shop for a fitting, or use our pickup and delivery service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton size="lg" message={waMessages.general} />
            <Button variant="outline" size="lg" href="/schedule-call">
              Schedule a Call
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            {trustChips.map((chip) => (
              <li key={chip} className="flex items-center gap-1.5">
                <ServiceIcon name="check" className="size-4 text-pine-600" />
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Image
            src="/images/hero/workshop.jpg"
            alt="Tailor working in our ladies tailoring workshop in Gulshan-e-Iqbal, Karachi"
            width={1800}
            height={2700}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-3xl object-cover shadow-soft"
            priority
          />
          <div className="card absolute -bottom-6 -left-6 hidden items-center gap-3 p-4 shadow-soft sm:flex">
            <div className="flex text-brass-500" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((star) => (
                <ServiceIcon key={star} name="star" className="size-4 fill-current" />
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Trusted local workshop</p>
              <p className="text-xs text-ink-mute">Gulshan-e-Iqbal, Karachi</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 hidden rounded-full bg-pine-600 px-4 py-2 text-sm text-white shadow-soft md:block">
            WhatsApp ordering
          </div>
        </div>
      </div>
    </section>
  );
}
