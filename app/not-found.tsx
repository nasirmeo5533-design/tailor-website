import type { Metadata } from "next";

import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="container-site py-24 text-center">
      <h1 className="font-display text-6xl text-pine-700">404</h1>
      <h2 className="mt-4 font-display text-2xl text-ink">Page not found</h2>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button href="/">Back to home</Button>
        <Button variant="outline" href="/contact">
          Contact us
        </Button>
      </div>
    </section>
  );
}
