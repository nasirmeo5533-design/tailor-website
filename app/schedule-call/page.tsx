import type { Metadata } from "next";

import { ScheduleCallForm } from "@/components/schedule-call-form";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { buildMetadata } from "@/lib/seo";
import { business, waMessages } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Schedule a Call",
  description:
    "Schedule a consultation call with our tailoring team — pick a date and time and confirm on WhatsApp.",
  path: "/schedule-call",
});

export default function ScheduleCallPage() {
  return (
    <>
      <section className="bg-sand py-14 lg:py-20" aria-label="Schedule a call">
        <div className="container-site">
          <SectionHeading
            eyebrow="Talk to us"
            title="Schedule a call"
            description="Pick a date and time that suits you. Confirm your slot on WhatsApp and we'll call you during business hours."
          />
        </div>
      </section>
      <section className="bg-cream py-12 lg:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ScheduleCallForm />
          </div>
          <aside className="card h-fit space-y-4 p-6">
            <h2 className="font-display text-xl text-ink">Before you call</h2>
            <p className="text-sm text-ink-soft">
              Have your garment details, fabric or design reference ready. It helps us give you a
              faster quote.
            </p>
            <p className="text-sm text-ink-soft">
              Calls happen within business hours ({business.hours[0].days}{" "}
              {business.hours[0].time}).
            </p>
            <WhatsAppButton message={waMessages.scheduleCall} />
          </aside>
        </div>
      </section>
    </>
  );
}
