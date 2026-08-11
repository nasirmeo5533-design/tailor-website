import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Booking & Service Policy",
  description:
    "How bookings, rescheduling, measurements, pricing and timelines work at our tailoring workshop.",
  path: "/booking-policy",
});

export default function BookingPolicyPage() {
  return (
    <PolicyPage title="Booking & Service Policy" updatedAt="August 2026">
      <h2 className="font-display text-xl text-ink">Confirming your booking</h2>
      <p className="leading-relaxed text-ink-soft">
        A booking is confirmed once we respond on WhatsApp or by phone and agree on the service,
        price and expected timeline. Until then, a slot is not reserved.
      </p>
      <h2 className="font-display text-xl text-ink">Rescheduling & cancellations</h2>
      <p className="leading-relaxed text-ink-soft">
        Need to change or cancel your appointment? Let us know on WhatsApp as early as possible and
        we&apos;ll reschedule you without fuss. For stitching orders already in progress,
        cancellation is possible before cutting begins.
      </p>
      <h2 className="font-display text-xl text-ink">Measurements</h2>
      <p className="leading-relaxed text-ink-soft">
        You can share measurements on WhatsApp in text or photos, or visit the workshop for a full
        measurement. We work from the measurements you provide, so please make sure they are
        accurate.
      </p>
      <h2 className="font-display text-xl text-ink">Pricing</h2>
      <p className="leading-relaxed text-ink-soft">
        Starting prices on the website are a guide. The final price depends on the garment, fabric,
        design and finishing required, and is confirmed before work starts.
      </p>
      <h2 className="font-display text-xl text-ink">Turnaround times</h2>
      <p className="leading-relaxed text-ink-soft">
        We confirm a delivery date when your order is booked. Simple alterations are usually ready
        within 1–2 days and many repairs the same day; new stitching takes longer. We&apos;ll keep
        you updated if anything changes.
      </p>
      <p className="leading-relaxed text-ink-soft">
        This is a placeholder policy. Please have it reviewed by a legal professional before
        launch.
      </p>
    </PolicyPage>
  );
}
