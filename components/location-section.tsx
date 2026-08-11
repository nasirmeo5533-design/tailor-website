import { business } from "@/lib/site";
import { waLink } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/button";

export function LocationSection() {
  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby="location-heading">
      <div className="container-site grid items-stretch gap-10 lg:grid-cols-2">
        <div className="card rounded-2xl border border-ink/8 p-6 shadow-card sm:p-8">
          <SectionHeading
            align="left"
            eyebrow="Visit us"
            title="Our workshop in Karachi"
            description="Drop by for measurements, fitting or to see the work in person."
          />
          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                <ServiceIcon name="pin" className="size-5" />
              </div>
              <div>
                <p className="text-sm text-ink-soft">{business.address}</p>
                <a
                  className="text-sm font-medium text-pine-700 hover:underline"
                  href={business.mapLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                <ServiceIcon name="mail" className="size-5" />
              </div>
              <a className="text-sm text-ink-soft hover:text-pine-700" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                <ServiceIcon name="phone" className="size-5" />
              </div>
              <a className="text-sm text-ink-soft hover:text-pine-700" href={`tel:${business.phone}`}>
                {business.phoneDisplay}
              </a>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                <ServiceIcon name="chat" className="size-5" />
              </div>
              <a
                className="text-sm text-ink-soft hover:text-pine-700"
                href={waLink(business.whatsapp)}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp us
              </a>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-pine-50 text-pine-700">
                <ServiceIcon name="clock" className="size-5" />
              </div>
              <div className="space-y-1 text-sm text-ink-soft">
                {business.hours.map((h) => (
                  <div key={h.days}>
                    <span className="font-medium text-ink">{h.days}</span>: {h.time}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col">
          <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-ink/10 shadow-soft">
            <iframe
              src={business.mapEmbed}
              loading="lazy"
              title="Map to our tailoring workshop"
              className="h-full min-h-[320px] w-full border-0"
            />
          </div>
          <div className="mt-4">
            <Button variant="outline" href={business.mapLink} target="_blank" rel="noreferrer">
              Open in Google Maps
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
