/**
 * WhatsApp sending service.
 *
 * Uses the Meta WhatsApp Cloud API when configured via env:
 *   WHATSAPP_TOKEN       – permanent/system access token
 *   WHATSAPP_PHONE_ID    – sender phone number id
 *   WHATSAPP_API_URL     – default https://graph.facebook.com/v19.0
 *
 * When credentials are missing it runs in dev mode: messages are logged and
 * treated as delivered, so the whole feature stays testable end to end.
 */

const DEFAULT_API_URL = "https://graph.facebook.com/v19.0";

function toE164(phone) {
  if (!phone) return "";
  let p = String(phone).replace(/[^\d]/g, "");
  if (p.length === 10) return `91${p}`;
  if (p.length > 10 && !p.startsWith("00")) return p;
  if (p.startsWith("00")) return p.slice(2);
  return p;
}

/**
 * Send a single WhatsApp text message.
 * Returns { ok, error? }.
 */
export async function sendWhatsApp({ to, message }) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const number = toE164(to);

  if (!token || !phoneId) {
    console.log(`[whatsapp:dev] To: ${number || to} | ${message || ""}`);
    return { ok: true, error: null };
  }

  if (!number) {
    return { ok: false, error: "Recipient has no valid phone number" };
  }

  try {
    const base = process.env.WHATSAPP_API_URL || DEFAULT_API_URL;
    const res = await fetch(`${base}/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: number,
        type: "text",
        text: { body: message || "" },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `WhatsApp API ${res.status}: ${text.slice(0, 200)}` };
    }

    return { ok: true, error: null };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}
