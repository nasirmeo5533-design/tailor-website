import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms that apply when you use our website and order services from our tailoring workshop.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PolicyPage title="Terms of Service" updatedAt="August 2026">
      <h2 className="font-display text-xl text-ink">Our services</h2>
      <p className="leading-relaxed text-ink-soft">
        We provide women&apos;s tailoring, alterations, finishing and repair services from our
        physical workshop in Karachi, as described on this website. Service availability may change
        without notice.
      </p>
      <h2 className="font-display text-xl text-ink">Orders & confirmations</h2>
      <p className="leading-relaxed text-ink-soft">
        An order is confirmed when we agree on the service, price and timeline — in person or on
        WhatsApp. Prices shown on this site are starting prices and may change after we review
        your fabric, measurements or design.
      </p>
      <h2 className="font-display text-xl text-ink">Timelines</h2>
      <p className="leading-relaxed text-ink-soft">
        Turnaround times are estimates confirmed at the time of booking. They may be affected by
        fabric type, workload or additional work discovered during stitching.
      </p>
      <h2 className="font-display text-xl text-ink">Garment care & collection</h2>
      <p className="leading-relaxed text-ink-soft">
        Your garments are handled with care while in our workshop. Please inspect your finished
        garments at collection or delivery, as we may not be able to address issues raised later.
      </p>
      <h2 className="font-display text-xl text-ink">Payments</h2>
      <p className="leading-relaxed text-ink-soft">
        Payment terms — deposit, partial or full payment — are confirmed with you at booking. Rates
        are in Pakistani Rupees (PKR) unless otherwise stated.
      </p>
      <p className="leading-relaxed text-ink-soft">
        This is a placeholder policy. Please have it reviewed by a legal professional before
        launch.
      </p>
    </PolicyPage>
  );
}
