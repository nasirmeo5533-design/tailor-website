import type { Metadata } from "next";

import { BookingForm } from "@/components/booking-form";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { buildMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Book a Service",
  description:
    "Book a women's tailoring, alteration or finishing service online — we confirm your slot on WhatsApp or a call.",
  path: "/book",
});

const nextSteps = [
  "We confirm your time within business hours.",
  "You share measurements/design on WhatsApp.",
  "We confirm price & timeline.",
  "Garment is stitched & ready for pickup or delivery.",
];

export default function BookPage() {
  return (
    <>
      <section className="bg-sand py-14 lg:py-20" aria-label="Book a tailoring service">
        <div className="container-site">
          <SectionHeading
            eyebrow="Book online"
            title="Book a tailoring service"
            description="Select your service and preferred time. We'll confirm your slot on WhatsApp or a call."
          />
        </div>
      </section>
      <section className="bg-cream py-12 lg:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
          <aside className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-xl text-ink">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-ink-soft">
                {nextSteps.map((step) => (
                  <li key={step} className="flex gap-3">
                    <ServiceIcon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-pine-600"
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card p-6">
              <h2 className="font-display text-xl text-ink">Questions?</h2>
              <p className="mt-2 text-sm text-ink-soft">Reach us directly:</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={waLink(business.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-pine-700 hover:text-pine-800"
                  >
                    WhatsApp us
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${business.phone}`}
                    className="font-medium text-pine-700 hover:text-pine-800"
                  >
                    {business.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="font-medium text-pine-700 hover:text-pine-800"
                  >
                    {business.email}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
