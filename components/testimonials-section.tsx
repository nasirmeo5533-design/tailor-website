import { testimonials } from "@/lib/testimonials";
import { SectionHeading } from "@/components/section-heading";
import { ServiceIcon } from "@/components/service-icon";

export function TestimonialsSection() {
  return (
    <section className="bg-sand py-16 lg:py-24" aria-labelledby="testimonials-heading">
      <div className="container-site">
        <SectionHeading
          eyebrow="What customers say"
          title="Made for them. Made for you next."
          description="Reviews from real clients — more to come as we grow our online presence."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="card flex flex-col gap-4 p-6">
              <div
                className="flex text-brass-500"
                aria-label={`Rated ${testimonial.rating} out of 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <ServiceIcon
                    key={i}
                    name="star"
                    className={`size-4 fill-current ${i < testimonial.rating ? "opacity-100" : "opacity-25"}`}
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-ink-soft">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <figcaption className="mt-auto">
                <p className="text-sm font-medium text-ink">{testimonial.name}</p>
                <p className="mt-0.5 text-xs text-ink-mute">
                  {testimonial.outfit} · {testimonial.area}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
