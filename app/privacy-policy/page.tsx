import type { Metadata } from "next";

import { PolicyPage } from "@/components/policy-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Abid Ali Tailors collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" updatedAt="August 2026">
      <h2 className="font-display text-xl text-ink">What we collect</h2>
      <p className="leading-relaxed text-ink-soft">
        When you use our booking, contact or schedule-a-call forms, we collect the details you
        choose to share — typically your name, phone number, WhatsApp number and email address,
        along with the message you send us.
      </p>
      <h2 className="font-display text-xl text-ink">How we use your information</h2>
      <p className="leading-relaxed text-ink-soft">
        We use your details to respond to enquiries, confirm bookings and orders, arrange pickup
        and delivery, and keep you updated on the progress of your order. We do not sell your
        personal information to anyone.
      </p>
      <h2 className="font-display text-xl text-ink">WhatsApp & communications</h2>
      <p className="leading-relaxed text-ink-soft">
        Conversations about orders may take place on WhatsApp. WhatsApp is operated by a third
        party (Meta), and messages sent through it are also subject to WhatsApp&apos;s own privacy
        terms.
      </p>
      <h2 className="font-display text-xl text-ink">Data retention</h2>
      <p className="leading-relaxed text-ink-soft">
        We keep order-related details only for as long as needed to complete your order and answer
        follow-up questions, after which they are deleted or anonymised.
      </p>
      <h2 className="font-display text-xl text-ink">Your rights</h2>
      <p className="leading-relaxed text-ink-soft">
        You can ask us to show you the information we hold about you, or to delete it, at any time
        by contacting us through the details on our contact page.
      </p>
      <p className="leading-relaxed text-ink-soft">
        This is a placeholder policy. Please have it reviewed by a legal professional before
        launch.
      </p>
    </PolicyPage>
  );
}
