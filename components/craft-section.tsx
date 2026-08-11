import Image from "next/image";

import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";
import { Button } from "@/components/button";

const checklist = [
  "Straight, secure seams",
  "Clean piko & fall",
  "Fabric-appropriate needles",
  "Honest timelines & pricing",
];

export function CraftSection() {
  return (
    <section className="bg-cream py-16 lg:py-24" aria-labelledby="craft-heading">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Image
          src="/images/services/industrial.jpg"
          alt="Stitcher working at an industrial sewing machine in our Karachi workshop"
          width={1200}
          height={800}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="w-full rounded-3xl object-cover shadow-soft"
        />
        <div>
          <SectionHeading
            align="left"
            eyebrow="The workshop standard"
            title="Handled like it's our own"
          />
          <div className="mt-4 space-y-4 text-ink-soft">
            <p className="leading-relaxed">
              Experienced stitchers work on every order — straight, secure
              seams, clean piko and the right needles for your fabric, whether
              it&rsquo;s lawn, cotton, chiffon or silk.
            </p>
            <p className="leading-relaxed">
              Everything happens at our physical workshop in Gulshan-e-Iqbal,
              Karachi, so you always know exactly where your clothes are and
              who&rsquo;s working on them.
            </p>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-ink sm:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-center">
                <ServiceIcon name="check" className="mr-2 inline size-5 text-pine-600" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="outline" href="/about">
              About our workshop
            </Button>
            <Button variant="primary" href="/book">
              Book a service
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
