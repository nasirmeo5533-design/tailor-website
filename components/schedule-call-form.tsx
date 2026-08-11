"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { business } from "@/lib/site";
import { waLink } from "@/lib/utils";
import { scheduleCallSchema, parseFormErrors } from "@/lib/validation";
import { StatusMessage } from "./status-message";
import { WhatsAppButton } from "./whatsapp-button";

const TIME_SLOTS = ["Morning (10am–1pm)", "Afternoon (1pm–5pm)", "Evening (5pm–8pm)"];

type CallDetails = {
  date: string;
  time: string;
  topic: string;
  contactMethod: string;
};

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; reference?: string; message: string; details: CallDetails }
  | { kind: "error"; message: string };

type ScheduleCallResponse = {
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

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

export function ScheduleCallForm() {
  const [time, setTime] = useState("");
  const [contactMethod, setContactMethod] = useState("whatsapp");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedAt, setSubmittedAt] = useState(0);
  const [today, setToday] = useState("");
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  useEffect(() => {
    setSubmittedAt(Date.now());
    setToday(todayISO());
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

    const parsed = scheduleCallSchema.safeParse(raw);
    if (!parsed.success) {
      setFieldErrors(parseFormErrors(parsed.error).fieldErrors);
      setStatus({ kind: "idle" });
      return;
    }

    const topic = parsed.data.topic.trim() || "General consultation";
    const waMessage = `Hello ${parsed.data.name}! I would like to schedule a call on ${formatDate(
      parsed.data.date
    )} at ${parsed.data.time}. My topic: ${topic}.`;
    const details: CallDetails = {
      date: formatDate(parsed.data.date),
      time: parsed.data.time,
      topic,
      contactMethod,
    };
    window.open(waLink(business.whatsapp, waMessage), "_blank");

    try {
      const res = await fetch("/api/schedule-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submittedAt }),
      });
      const json = (await res.json().catch(() => null)) as ScheduleCallResponse | null;
      if (res.ok && json?.ok) {
        setStatus({ kind: "success", reference: json.reference, message: waMessage, details });
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
          <h3 className="font-display text-xl font-semibold">Your call request has been sent.</h3>
          {status.reference ? (
            <p>
              Reference: <strong>{status.reference}</strong>
            </p>
          ) : null}
          <p>Confirm your slot on WhatsApp and we&apos;ll call you.</p>
        </StatusMessage>
        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-xl bg-sand p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Date</dt>
            <dd className="mt-1 font-medium text-ink">{status.details.date}</dd>
          </div>
          <div className="rounded-xl bg-sand p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Time</dt>
            <dd className="mt-1 font-medium text-ink">{status.details.time}</dd>
          </div>
          <div className="rounded-xl bg-sand p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Topic</dt>
            <dd className="mt-1 font-medium text-ink">{status.details.topic}</dd>
          </div>
          <div className="rounded-xl bg-sand p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-mute">We&apos;ll reach you</dt>
            <dd className="mt-1 font-medium text-ink">
              {status.details.contactMethod === "call" ? "Phone call" : "WhatsApp call"}
            </dd>
          </div>
        </dl>
        <div className="mt-6">
          <WhatsAppButton message={status.message} size="md">
            Open WhatsApp chat
          </WhatsAppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="card mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Schedule a call</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Pick a slot and we&apos;ll confirm on WhatsApp before calling you.
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
        <TextInput
          id="schedule-name"
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={fieldErrors.name}
        />
        <TextInput
          id="schedule-phone"
          name="phone"
          label="Phone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="0300 1234567"
          error={fieldErrors.phone}
        />
        <TextInput
          id="schedule-date"
          name="date"
          label="Preferred date"
          required
          type="date"
          min={today || undefined}
          error={fieldErrors.date}
        />
        <Select
          id="schedule-time"
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
        <TextInput
          id="schedule-topic"
          name="topic"
          label="Topic (optional)"
          placeholder="e.g. Consultation for wedding outfit"
          error={fieldErrors.topic}
          className="sm:col-span-2"
        />
        <RadioGroup
          id="schedule-contact-method"
          name="contactMethod"
          label="How should we call you?"
          options={[
            { value: "whatsapp", label: "WhatsApp call" },
            { value: "call", label: "Phone call" },
          ]}
          value={contactMethod}
          onChange={setContactMethod}
          className="sm:col-span-2"
        />

        <Honeypot id="schedule-website" />
        <input type="hidden" name="submittedAt" value={submittedAt} />

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status.kind === "loading"}
            className="btn btn-whatsapp btn-lg w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status.kind === "loading" ? (
              <>
                <Spinner />
                Submitting…
              </>
            ) : (
              "Schedule via WhatsApp"
            )}
          </button>
          <p className="mt-3 text-center text-xs text-ink-mute">
            We&apos;ll open WhatsApp with your slot details — just hit send.
          </p>
        </div>
      </form>
    </div>
  );
}
