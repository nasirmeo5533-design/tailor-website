import { waMessages } from "@/lib/site";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Button } from "@/components/button";

export function CtaBanner() {
  return (
    <section className="py-16 lg:py-24" aria-labelledby="cta-heading">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-pine-700 px-6 py-14 text-center sm:py-16">
          <div
            className="absolute -top-24 -right-24 size-72 rounded-full bg-pine-600 opacity-40"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-16 size-80 rounded-full bg-brass-500/20 opacity-30"
            aria-hidden="true"
          />
          <h2
            id="cta-heading"
            className="relative font-display text-3xl text-white sm:text-4xl"
          >
            Ready to get your outfit stitched?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-pine-100/90">
            Message us on WhatsApp for a quick quote, or book your service
            online.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton size="lg" message={waMessages.general} />
            <Button variant="white" size="lg" href="/book">
              Book Online
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
