/**
 * Enquiry submission — clean integration point.
 *
 * The form component never touches API keys or providers directly; it only
 * calls `submitEnquiry`. To go live, pick ONE provider and wire it up here:
 *
 * ── Resend (server route recommended) ───────────────────────────────
 *   1. Create `app/api/enquiry/route.ts` that POSTs your Resend API key
 *      (server-only env var: `RESEND_API_KEY`).
 *   2. Point `fetch("/api/enquiry", ...)` at it below.
 *
 * ── EmailJS / Formspree (no backend) ─────────────────────────────────
 *   - EmailJS: `emailjs.send(serviceId, templateId, payload, publicKey)`.
 *   - Formspree: `fetch("https://formspree.io/f/<formId>", { method: "POST",
 *     headers: { "Content-Type": "application/json" }, body: ..., })`.
 *   (These use public IDs, so they are safe in the client — a private
 *    API key must never be.
 *
 * ── Custom backend API ───────────────────────────────────────────────
 *   Replace the fetch below with your own endpoint, e.g.
 *   `fetch("https://api.yourdomain.com/enquiry", { method: "POST", body })`.
 */

export interface EnquiryPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
}

export interface EnquiryResult {
  ok: boolean;
  message?: string;
}

/** Currently simulates a successful send so the UX is wired end-to-end. */
export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<EnquiryResult> {
  // TODO(integration): connect to Resend / EmailJS / Formspree / backend here.
  // Do NOT expose a private API key in client-side code — use a server route.

  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Simulated hand-off — the payload is ready for a provider to consume.
  void payload;
  return { ok: true };
}
