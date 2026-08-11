import { z, type ZodError } from "zod";

export const phoneSchema = z
  .string()
  .min(10, "Enter a valid phone number")
  .max(15, "Enter a valid phone number")
  .regex(/^[+]?[\d\s-]{10,15}$/, "Enter a valid phone number");

export const FORM_MIN_SECONDS = 3;

export const bookingSchema = z.object({
  serviceSlug: z.string().min(1, "Please select a service"),
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: phoneSchema,
  email: z.email("Enter a valid email").or(z.literal("")).optional().default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a preferred date"),
  time: z.string().min(1, "Select a preferred time"),
  address: z.string().trim().max(500).optional().default(""),
  notes: z.string().trim().max(1000).optional().default(""),
  contactMethod: z.enum(["whatsapp", "call", "email"]),
  website: z.string().max(0).optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: phoneSchema,
  email: z.email("Enter a valid email").or(z.literal("")).optional().default(""),
  subject: z.string().min(1, "Please choose a subject"),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(2000),
  website: z.string().max(0).optional().default(""),
});

export const scheduleCallSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: phoneSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Select a preferred date"),
  time: z.string().min(1, "Select a preferred time"),
  topic: z.string().trim().max(300).optional().default(""),
  contactMethod: z.enum(["whatsapp", "call"]),
  website: z.string().max(0).optional().default(""),
});

export type BookingData = z.output<typeof bookingSchema>;
export type ContactData = z.output<typeof contactSchema>;
export type ScheduleCallData = z.output<typeof scheduleCallSchema>;

export function parseFormErrors(result: ZodError): { fieldErrors: Record<string, string>; message: string } {
  const flat = z.flattenError(result);
  const fieldErrors: Record<string, string> = {};
  for (const [key, errors] of Object.entries(flat.fieldErrors)) {
    if (!errors) continue;
    const [first] = errors as unknown as string[];
    if (first) fieldErrors[key] = first;
  }
  const message = flat.formErrors[0] ?? "Please check the highlighted fields and try again.";
  return { fieldErrors, message };
}
