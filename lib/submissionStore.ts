// Holds form input between checkout creation and post-payment delivery.
// In-memory only — fine for early low-volume validation, not durable across
// serverless cold starts/restarts. Revisit (e.g. a real DB or Vercel KV) before
// real volume.

type Submission = {
  suspensionNotice: string;
  accountDetails: string;
  email: string;
  name: string;
  screenshotBase64: string | null;
  screenshotMediaType: string | null;
  createdAt: number;
};

const store = new Map<string, Submission>();
const TTL_MS = 60 * 60 * 1000; // 1 hour — long enough to finish a Stripe checkout

export function saveSubmission(id: string, submission: Omit<Submission, "createdAt">) {
  store.set(id, { ...submission, createdAt: Date.now() });
}

export function getSubmission(id: string): Omit<Submission, "createdAt"> | undefined {
  const entry = store.get(id);
  if (!entry) return undefined;
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(id);
    return undefined;
  }
  return entry;
}
