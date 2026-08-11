import { faqs } from "@/lib/faqs";
import { SectionHeading } from "@/components/section-heading";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";

export function FaqSection() {
  return (
    <section className="bg-sand py-16 lg:py-24" aria-labelledby="faq-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
          description="Quick answers about ordering, pricing, timing and pickup."
        />
        <FaqAccordion items={faqs} />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
    </section>
  );
}
