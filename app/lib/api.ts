// simple wrapper around fetch calls to your external API
// set NEXT_PUBLIC_API_BASE or API_BASE in .env.local

const BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE || "https://example.com";

export async function fetchUser(): Promise<{ name: string; advice: string; score: number }> {
  // if no real base is configured, skip the network call and return a dummy
  if (BASE === "https://example.com") {
    return { name: "", advice: "", score: 0 };
  }

  try {
    const res = await fetch(`${BASE}/user`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`failed to fetch user: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.warn("fetchUser failed", err);
    // fall back to a placeholder so the page still renders
    return { name: "", advice: "", score: 0 };
  }
}

// add other helpers here, e.g. fetchPulse(), fetchDao(), etc.

export async function sendWaveform(payload: any): Promise<any> {
  const res = await fetch(`${BASE}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`upload failed: ${res.status} ${text}`);
  }
  return res.json();
}
