import { Button } from "@/components/button";
import { CraftSection } from "@/components/craft-section";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { LocationSection } from "@/components/location-section";
import { SectionHeading } from "@/components/section-heading";
import { ServiceGrid } from "@/components/service-grid";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrustSection } from "@/components/trust-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSection />
      <section className="bg-cream py-16 lg:py-24" aria-label="Our services">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our services"
            title="Tailoring, alterations & finishing, done properly"
            description="Stitching, alterations, piko and repairs — handled by experienced hands at our Karachi workshop."
          />
          <div className="mt-12">
            <ServiceGrid limit={6} />
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" href="/services">
              View all services
            </Button>
          </div>
        </div>
      </section>
      <HowItWorks />
      <CraftSection />
      <TestimonialsSection />
      <CtaBanner />
      <LocationSection />
      <FaqSection />
    </>
  );
}
