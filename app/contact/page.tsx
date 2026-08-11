import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { buildMetadata } from "@/lib/seo";
import { business } from "@/lib/site";
import { waLink } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact our ladies tailoring workshop in Karachi — WhatsApp, call, email or visit the shop.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-sand py-14 lg:py-20" aria-label="Contact us">
        <div className="container-site">
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact us"
            description="WhatsApp, call, email, or visit our workshop in Karachi."
          />
        </div>
      </section>
      <section className="bg-cream py-12 lg:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <aside className="space-y-6 lg:col-span-2">
            <div className="card p-6">
              <h2 className="font-display text-xl text-ink">Contact details</h2>
              <ul className="mt-4 space-y-4 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <ServiceIcon name="pin" className="mt-0.5 size-4 shrink-0 text-pine-600" />
                  <span>
                    {business.address}
                    <a
                      href={business.mapLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 block font-medium text-pine-700 hover:text-pine-800"
                    >
                      Get directions
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <ServiceIcon name="phone" className="mt-0.5 size-4 shrink-0 text-pine-600" />
                  <a
                    href={`tel:${business.phone}`}
                    className="font-medium text-pine-700 hover:text-pine-800"
                  >
                    {business.phoneDisplay}
                  </a>
                </li>
                <li className="flex gap-3">
                  <ServiceIcon name="chat" className="mt-0.5 size-4 shrink-0 text-pine-600" />
                  <a
                    href={waLink(business.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-pine-700 hover:text-pine-800"
                  >
                    WhatsApp us
                  </a>
                </li>
                <li className="flex gap-3">
                  <ServiceIcon name="mail" className="mt-0.5 size-4 shrink-0 text-pine-600" />
                  <a
                    href={`mailto:${business.email}`}
                    className="font-medium text-pine-700 hover:text-pine-800"
                  >
                    {business.email}
                  </a>
                </li>
              </ul>
              <h3 className="mt-6 font-display text-lg text-ink">Opening hours</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {business.hours.map((slot) => (
                  <li key={slot.days} className="flex justify-between gap-4">
                    <span>{slot.days}</span>
                    <span className="text-ink">{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-soft">
              <iframe
                src={business.mapEmbed}
                loading="lazy"
                title="Map to our tailoring workshop"
                className="h-full min-h-[280px] w-full border-0"
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
