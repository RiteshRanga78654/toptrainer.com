import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // No SMTP configured → dev mode. Messages are logged, never actually sent.
  if (!host || !user || !pass) return null;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

function defaultFrom() {
  return process.env.MAIL_FROM || `"TopTrainer" <${process.env.SMTP_USER || "no-reply@toptrainer.com"}>`;
}

/**
 * Send a single HTML email.
 * Returns { ok, error? }.
 */
export async function sendEmail({ to, subject, html }) {
  const transport = getTransporter();

  if (!transport) {
    console.log(`[email:dev] To: ${to} | Subject: ${subject}\n${html || ""}`);
    return { ok: true, error: null };
  }

  try {
    await transport.sendMail({
      from: defaultFrom(),
      to,
      subject: subject || "(no subject)",
      html: html || "",
    });
    return { ok: true, error: null };
  } catch (error) {
    console.error("[email:error]", error.message);
    return { ok: false, error: error.message };
  }
}
