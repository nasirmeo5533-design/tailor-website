export function track(event: string, data?: Record<string, unknown>): void {
  const endpoint = process.env.ANALYTICS_ENDPOINT;
  if (!endpoint) return;
  const payload = {
    event,
    data: data ?? {},
    ts: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.pathname : "",
  };
  try {
    void fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    // Fire-and-forget analytics must never throw or log.
  }
}
