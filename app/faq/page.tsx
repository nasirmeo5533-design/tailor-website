import type { Metadata } from "next";

import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about our tailoring services, ordering, pricing and pickup in Karachi.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqSection />
      <CtaBanner />
    </>
  );
}
