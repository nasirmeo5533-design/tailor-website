"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { business, waMessages } from "@/lib/site";
import { contactSchema, parseFormErrors } from "@/lib/validation";
import { StatusMessage } from "./status-message";
import { WhatsAppButton } from "./whatsapp-button";

const SUBJECTS = ["General inquiry", "Pricing", "Pickup & delivery", "Feedback", "Other"];

type SubmitStatus =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; reference?: string }
  | { kind: "error"; message: string };

type ContactResponse = {
  ok: boolean;
  reference?: string;
  delivered?: boolean;
  fieldErrors?: Record<string, string>;
  message?: string;
};

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
  className?: string;
};

function TextInput({ id, label, name, error, required, type = "text", placeholder, autoComplete, className }: TextInputProps) {
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
  rows?: number;
  className?: string;
};

function TextArea({ id, label, name, error, rows = 5, className }: TextAreaProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
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

export function ContactForm() {
  const [subject, setSubject] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedAt, setSubmittedAt] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>({ kind: "idle" });

  useEffect(() => {
    setSubmittedAt(Date.now());
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

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      setFieldErrors(parseFormErrors(parsed.error).fieldErrors);
      setStatus({ kind: "idle" });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, submittedAt }),
      });
      const json = (await res.json().catch(() => null)) as ContactResponse | null;
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
          <h3 className="font-display text-xl font-semibold">Thanks for your message.</h3>
          {status.reference ? (
            <p>
              Reference: <strong>{status.reference}</strong>
            </p>
          ) : null}
          <p>We usually reply within business hours.</p>
        </StatusMessage>
        <div className="mt-6">
          <WhatsAppButton message={waMessages.general} size="md">
            Message us on WhatsApp instead
          </WhatsAppButton>
        </div>
      </div>
    );
  }

  return (
    <div className="card mx-auto w-full max-w-2xl p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Get in touch</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Questions, pricing or feedback — we&apos;d love to hear from you.
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
          id="contact-name"
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={fieldErrors.name}
        />
        <TextInput
          id="contact-phone"
          name="phone"
          label="Phone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="0300 1234567"
          error={fieldErrors.phone}
        />
        <TextInput
          id="contact-email"
          name="email"
          label="Email (optional)"
          type="email"
          autoComplete="email"
          error={fieldErrors.email}
          className="sm:col-span-2"
        />
        <Select
          id="contact-subject"
          name="subject"
          label="Subject"
          required
          value={subject}
          onChange={setSubject}
          error={fieldErrors.subject}
          className="sm:col-span-2"
        >
          <option value="">Choose a subject…</option>
          {SUBJECTS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <TextArea
          id="contact-message"
          name="message"
          label="Message"
          rows={5}
          error={fieldErrors.message}
          className="sm:col-span-2"
        />

        <Honeypot id="contact-website" />
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
              "Send message"
            )}
          </button>
          <p className="mt-3 text-center text-xs text-ink-mute">
            {business.name} · {business.area}
          </p>
        </div>
      </form>
    </div>
  );
}
