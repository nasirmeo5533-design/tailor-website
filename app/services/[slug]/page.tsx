import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/button";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceIcon } from "@/components/service-icon";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo";
import {
  getCategory,
  getService,
  services,
  servicesByCategory,
} from "@/lib/services";
import { formatPrice } from "@/lib/utils";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.name,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = getCategory(service.categorySlug);
  const related = servicesByCategory(service.categorySlug).filter(
    (item) => item.slug !== service.slug,
  );

  return (
    <>
      <div className="bg-sand py-10 lg:py-14">
        <div className="container-site">
          <Breadcrumbs
            items={[
              { label: "Services", href: "/services" },
              { label: service.name },
            ]}
          />
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              {service.popular ? (
                <span className="absolute left-4 top-4 rounded-full bg-brass-500 px-3 py-1 text-xs font-semibold text-pine-900">
                  Popular
                </span>
              ) : null}
            </div>
            <div>
              {category ? <p className="eyebrow">{category.name}</p> : null}
              <h1 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {service.name}
              </h1>
              <p className="mt-4 text-lg text-ink-soft">{service.tagline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="text-lg font-semibold text-pine-700">
                  {formatPrice(service.startingPrice)}
                </span>
                {service.turnaround ? (
                  <span className="rounded-full bg-pine-50 px-3 py-1 text-sm text-pine-800">
                    Typically {service.turnaround}
                  </span>
                ) : null}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <WhatsAppButton
                  message={`Hello! I'm interested in the ${service.name} service.`}
                />
                <Button href="/book">Book this service</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-cream py-12 lg:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <div>
            {service.body.map((paragraph) => (
              <p key={paragraph} className="first:mt-0 mt-4 leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card">
            <h2 className="font-display text-xl text-ink">What&apos;s included</h2>
            <ul className="mt-4 space-y-3">
              {service.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm text-ink-soft">
                  <ServiceIcon name="check" className="mt-0.5 size-4 shrink-0 text-pine-600" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {related.length > 0 ? (
        <section className="bg-sand py-12 lg:py-16" aria-label="Related services">
          <div className="container-site">
            <SectionHeading eyebrow="More services" title="You may also need" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ServiceCard key={item.slug} service={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <CtaBanner />
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
    </>
  );
}
