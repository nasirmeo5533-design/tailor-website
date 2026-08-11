import type { Metadata } from "next";

import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import { ServiceGrid } from "@/components/service-grid";
import { ServiceIcon } from "@/components/service-icon";
import { serviceCategories } from "@/lib/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Women's stitching, alterations, piko, overlocking and repairs in Karachi — all services from our tailoring workshop.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-sand py-14 lg:py-20" aria-label="All services">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our services"
            title="Everything your clothes need"
            description="From new stitching to perfect fitting and finishing — every service handled at our Karachi workshop."
          />
        </div>
      </section>
      {serviceCategories.map((category) => (
        <section
          key={category.slug}
          className="border-t border-ink/5 bg-cream py-12 lg:py-16"
          aria-label={category.name}
        >
          <div className="container-site">
            <div className="flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
                <ServiceIcon name={category.icon} className="size-6" />
              </div>
              <SectionHeading
                align="left"
                eyebrow={category.tagline}
                title={category.name}
                description={category.description}
              />
            </div>
            <div className="mt-8">
              <ServiceGrid categorySlug={category.slug} />
            </div>
          </div>
        </section>
      ))}
      <CtaBanner />
    </>
  );
}
