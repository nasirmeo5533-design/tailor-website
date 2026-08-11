type PolicyPageProps = {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
};

export function PolicyPage({ title, updatedAt, children }: PolicyPageProps) {
  return (
    <div className="container-site mx-auto max-w-3xl py-14">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-mute">Last updated: {updatedAt}</p>
      <div className="mt-8 space-y-6">{children}</div>
    </div>
  );
}
