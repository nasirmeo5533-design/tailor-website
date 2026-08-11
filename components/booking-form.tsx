"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/lib/services";
import { business } from "@/lib/site";
import { bookingSchema, parseFormErrors } from "@/lib/validation";
import { StatusMessage } from "./status-message";
import { WhatsAppButton } from "./whatsapp-button";

const TIME_SLOTS = ["Morning (10am–1pm)", "Afternoon (1pm–5pm)", "Evening (5pm–8pm)"];

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; reference?: string }
  | { kind: "error"; message: string };

type BookingResponse = {
  ok: boolean;
  reference?: string;
  delivered?: boolean;
  fieldErrors?: Record<string, string>;
  message?: string;
};

function todayISO(): string {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

function Spinner() {
  return <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />;
}

type TextInputProps = {
  id: string;
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  min?: string;
  className?: string;
};

function TextInput({ id, label, name, error, required, type = "text", placeholder, autoComplete, min, className }: TextInputProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="input-label">
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        required={required}
        className="input-field"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="input-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  rows?: number;
  className?: string;
};

function TextArea({ id, label, name, error, required, rows = 3, className }: TextAreaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="input-label">
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        className="input-field resize-y"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="input-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

function Select({ id, label, name, value, onChange, error, required, className, children }: SelectProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="input-label">
        {label}
        {required ? <span className="text-red-700"> *</span> : null}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-field"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      >
        {children}
      </select>
      {error ? (
        <p id={`${id}-error`} className="input-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type RadioOption = { value: string; label: string };

type RadioGroupProps = {
  id: string;
  name: string;
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
};

function RadioGroup({ id, name, label, options, value, onChange, error, className }: RadioGroupProps) {
  return (
    <div className={className} role="radiogroup" aria-labelledby={`${id}-label`}>
      <span id={`${id}-label`} className="input-label">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                checked
                  ? "border-pine-600 bg-pine-50 text-pine-700"
                  : "border-ink/15 bg-white text-ink-soft hover:border-pine-600/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 accent-pine-600"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={`${id}-error`} className="input-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Honeypot({ id }: { id: string }) {
  return (
    <div className="hidden" aria-hidden="true">
      <label htmlFor={id} className="sr-only">
        Website
      </label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" className="sr-only" />
    </div>
  );
}

export function BookingForm() {
  const [serviceSlug, setServiceSlug] = useState("");
  const [time, setTime] = useState("");
  const [contactMethod, setContactMethod] = useState("whatsapp");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedAt, setSubmittedAt] = useState(0);
  const [today, setToday] = useState("");
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  useEffect(() => {
    setSubmittedAt(Date.now());
    setToday(todayISO());
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && services.some((s) => s.slug === slug)) {
      setServiceSlug(slug);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "loading") return;
    setStatus({ kind: "loading" });
    setFieldErrors({});

    const raw: Record<string, string> = {};
    new FormData(event.currentTarget).forEach((value, key) => {
      if (typeof value === "string") raw[key] = value;
    });

    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) {
      setFieldErrors(parseFormErrors(parsed.error).fieldErrors);
      setStatus({ kind: "idle" });
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submittedAt }),
      });
      const json = (await res.json().catch(() => null)) as BookingResponse | null;
      if (res.ok && json?.ok) {
        setStatus({ kind: "success", reference: json.reference });
      } else {
        if (json?.fieldErrors) setFieldErrors(json.fieldErrors);
        setStatus({ kind: "error", message: json?.message ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Please check your connection and try again." });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="card mx-auto w-full max-w-2xl p-6 sm:p-8">
        <StatusMessage variant="success">
          <h3 className="font-display text-xl font-semibold">Your booking request has been received.</h3>
          {status.reference ? (
            <p>
              Reference: <strong>{status.reference}</strong>
            </p>
          ) : null}
          <p>
            We usually confirm within business hours ({business.hours[0].days}, {business.hours[0].time}).
          </p>
        </StatusMessage>
        <div className="mt-6">
          <h4 className="font-display text-base font-semibold text-ink">What happens next</h4>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
            <li>We confirm your time on WhatsApp or a call within business hours.</li>
            <li>You share your measurements and design on WhatsApp.</li>
            <li>We confirm the price and timeline.</li>
            <li>Your garment is stitched and ready for pickup or delivery.</li>
          </ol>
        </div>
        <div className="mt-6">
          <WhatsAppButton
            message={`Hello! I just booked a tailoring service on the website. My reference is ${
              status.reference ?? "—"
            }. I'd like to share my measurements.`}
            size="md"
          >
            Share my measurements on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="card mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Book a tailoring service</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Tell us what you need and we&apos;ll confirm your slot within business hours.
      </p>

      {status.kind === "error" ? (
        <div className="mt-6">
          <StatusMessage variant="error">{status.message}</StatusMessage>
          <button
            type="button"
            className="btn btn-outline btn-sm mt-3"
            onClick={() => setStatus({ kind: "idle" })}
          >
            Retry
          </button>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
        <Select
          id="booking-service"
          name="serviceSlug"
          label="Service"
          required
          value={serviceSlug}
          onChange={setServiceSlug}
          error={fieldErrors.serviceSlug}
          className="sm:col-span-2"
        >
          <option value="">Choose a service…</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </Select>

        <TextInput
          id="booking-name"
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={fieldErrors.name}
        />
        <TextInput
          id="booking-phone"
          name="phone"
          label="Phone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="0300 1234567"
          error={fieldErrors.phone}
        />
        <TextInput
          id="booking-email"
          name="email"
          label="Email (optional)"
          type="email"
          autoComplete="email"
          error={fieldErrors.email}
          className="sm:col-span-2"
        />
        <TextInput
          id="booking-date"
          name="date"
          label="Preferred date"
          required
          type="date"
          min={today || undefined}
          error={fieldErrors.date}
        />
        <Select
          id="booking-time"
          name="time"
          label="Preferred time"
          required
          value={time}
          onChange={setTime}
          error={fieldErrors.time}
        >
          <option value="">Choose a time…</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </Select>
        <TextArea
          id="booking-address"
          name="address"
          label="Area / address (for pickup)"
          rows={2}
          error={fieldErrors.address}
          className="sm:col-span-2"
        />
        <TextArea
          id="booking-notes"
          name="notes"
          label="Additional notes"
          rows={3}
          error={fieldErrors.notes}
          className="sm:col-span-2"
        />
        <RadioGroup
          id="booking-contact-method"
          name="contactMethod"
          label="How should we confirm?"
          options={[
            { value: "whatsapp", label: "WhatsApp" },
            { value: "call", label: "Call" },
            { value: "email", label: "Email" },
          ]}
          value={contactMethod}
          onChange={setContactMethod}
          className="sm:col-span-2"
        />

        <Honeypot id="booking-website" />
        <input type="hidden" name="submittedAt" value={submittedAt} />

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status.kind === "loading"}
            className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.kind === "loading" ? (
              <>
                <Spinner />
                Submitting…
              </>
            ) : (
              "Request booking"
            )}
          </button>
          <p className="mt-3 text-center text-xs text-ink-mute">
            We&apos;ll reply within business hours. Your details stay private.
          </p>
        </div>
      </form>
    </div>
  );
}
