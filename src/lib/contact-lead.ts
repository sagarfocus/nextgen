// Shared client helper for posting contact-lead forms.
// Used by Contact/InquiryForm.tsx and Contact/QuoteWizard.tsx — POSTs to
// /api/contact-lead (proxied to the backend in dev via vite.config.ts).

export interface ContactLeadInput {
  name: string;
  email: string;
  phone?: string;
  businessType?: string;
  budget?: string;
  message?: string;
  source: string;
}

export type ContactLeadResult =
  | { ok: true; leadId: number }
  | { ok: false; message: string };

export async function submitContactLead(input: ContactLeadInput): Promise<ContactLeadResult> {
  try {
    const res = await fetch('/api/contact-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = (await res.json().catch(() => ({}))) as { lead?: { id: number }; error?: string };
    if (!res.ok) {
      return { ok: false, message: data.error || 'Submission failed. Please try again.' };
    }
    return { ok: true, leadId: data.lead?.id ?? 0 };
  } catch {
    return { ok: false, message: 'Network error. Please try again.' };
  }
}
