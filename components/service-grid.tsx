import { services, servicesByCategory } from "@/lib/services";
import { ServiceCard } from "@/components/service-card";

type ServiceGridProps = {
  categorySlug?: string;
  limit?: number;
  className?: string;
};

export function ServiceGrid({ categorySlug, limit, className }: ServiceGridProps) {
  const source = categorySlug ? servicesByCategory(categorySlug) : services;
  const list = limit ? source.slice(0, limit) : source;

  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
