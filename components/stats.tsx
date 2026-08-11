import { cn } from "@/lib/utils";

type StatsProps = {
  items: { value: string; label: string }[];
  className?: string;
};

export function Stats({ items, className }: StatsProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-x-12 gap-y-6", className)}>
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <p className="font-display text-3xl text-pine-700 sm:text-4xl">{item.value}</p>
          <p className="mt-1 text-sm text-ink-soft">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
