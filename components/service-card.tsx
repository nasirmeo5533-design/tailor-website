import Link from "next/link";
import Image from "next/image";

import type { Service } from "@/lib/services";
import { getCategory } from "@/lib/services";
import { cn, formatPrice } from "@/lib/utils";
import { ServiceIcon } from "@/components/service-icon";

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  const category = getCategory(service.categorySlug);

  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={service.name}
      className={cn(
        "card group block overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-soft",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pine-700 backdrop-blur">
            {category.name}
          </span>
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg text-ink transition group-hover:text-pine-700">
          {service.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{service.summary}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-pine-700">
            {formatPrice(service.startingPrice)}
          </span>
          <span className="flex items-center gap-1 text-sm text-brass-600">
            View details
            <ServiceIcon name="arrow-right" className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
