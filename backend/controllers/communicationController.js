import Communication from "../models/communication.js";
import MessageTemplate from "../models/messageTemplate.js";
import User from "../models/user.js";
import TrainerProfile from "../models/trainerProfile.js";
import Admin from "../models/admin.js";
import asyncHandler from "../middleware/asyncMiddlewire.js";
import { sendEmail } from "../services/emailService.js";
import { sendWhatsApp } from "../services/whatsappService.js";

const SEARCH_LIMIT = 100;

/* ── Recipients ─────────────────────────────────────────────── */

export const getRecipients = asyncHandler(async (req, res) => {
  const { search = "", type = "all" } = req.query;
  const query = search
    ? { $regex: search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" }
    : null;

  let users = [];
  let trainers = [];

  const fetchUsers = async () => {
    const filter = query
      ? { $or: [{ firstName: query }, { lastName: query }, { email: query }] }
      : {};
    return User.find(filter)
      .limit(SEARCH_LIMIT)
      .select("firstName lastName email phoneNumber status");
  };

  const fetchTrainers = async () => {
    const filter = query
      ? {
          $or: [
            { fullName: query },
            { email: query },
            { "contactInfo.phone": query },
            { "contactInfo.whatsapp": query },
          ],
        }
      : {};
    return TrainerProfile.find(filter)
      .limit(SEARCH_LIMIT)
      .select("fullName email contactInfo status");
  };

  if (type === "all" || type === "user") {
    users = await fetchUsers();
  }
  if (type === "all" || type === "trainer") {
    trainers = await fetchTrainers();
  }

  res.status(200).json({
    success: true,
    recipients: [
      ...users.map((u) => ({
        id: u._id,
        type: "user",
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unnamed User",
        email: u.email || "",
        phone: u.phoneNumber ? String(u.phoneNumber) : "",
      })),
      ...trainers.map((t) => ({
        id: t._id,
        type: "trainer",
        name: t.fullName || "Unnamed Trainer",
        email: t.email || t.contactInfo?.email || "",
        phone:
          t.contactInfo?.whatsapp ||
          t.contactInfo?.phone ||
          "",
      })),
    ],
  });
});

/* ── Sending ────────────────────────────────────────────────── */

async function resolveRecipients({ audience, recipients }) {
  if (audience === "all_users") {
    const users = await User.find().select("firstName lastName email phoneNumber");
    return users
      .filter((u) => u.email)
      .map((u) => ({
        recipientType: "user",
        recipientId: u._id,
        name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unnamed User",
        email: u.email,
        phone: u.phoneNumber ? String(u.phoneNumber) : "",
      }));
  }

  if (audience === "all_trainers") {
    const trainers = await TrainerProfile.find().select("fullName email contactInfo");
    return trainers
      .filter((t) => t.email)
      .map((t) => ({
        recipientType: "trainer",
        recipientId: t._id,
        name: t.fullName || "Unnamed Trainer",
        email: t.email || t.contactInfo?.email || "",
        phone: t.contactInfo?.whatsapp || t.contactInfo?.phone || "",
      }));
  }

  if (audience === "all") {
    const [users, trainers] = await Promise.all([
      User.find().select("firstName lastName email phoneNumber"),
      TrainerProfile.find().select("fullName email contactInfo"),
    ]);

    return [
      ...users
        .filter((u) => u.email)
        .map((u) => ({
          recipientType: "user",
          recipientId: u._id,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unnamed User",
          email: u.email,
          phone: u.phoneNumber ? String(u.phoneNumber) : "",
        })),
      ...trainers
        .filter((t) => t.email)
        .map((t) => ({
          recipientType: "trainer",
          recipientId: t._id,
          name: t.fullName || "Unnamed Trainer",
          email: t.email || t.contactInfo?.email || "",
          phone: t.contactInfo?.whatsapp || t.contactInfo?.phone || "",
        })),
    ];
  }

  // "selected"
  return (recipients || [])
    .map((r) => ({
      recipientType: r.type === "trainer" ? "trainer" : "user",
      recipientId: r.id,
      name: r.name || "",
      email: r.email || "",
      phone: r.phone ? String(r.phone) : "",
    }))
    .filter((r) => r.recipientId || r.email || r.phone);
}

async function sendToRecipient(recipient, channels, { subject, htmlBody, whatsappMessage }) {
  const results = { email: null, whatsapp: null };

  if (channels.includes("email") && recipient.email) {
    results.email = await sendEmail({
      to: recipient.email,
      subject,
      html: htmlBody,
    });
  } else if (channels.includes("email")) {
    results.email = { ok: false, error: "No email address" };
  }

  if (channels.includes("whatsapp") && recipient.phone) {
    results.whatsapp = await sendWhatsApp({
      to: recipient.phone,
      message: whatsappMessage,
    });
  } else if (channels.includes("whatsapp")) {
    results.whatsapp = { ok: false, error: "No phone number" };
  }

  const anyOk = Object.values(results).some((r) => r && r.ok);
  const anyAttempted = Object.values(results).some((r) => r !== null);

  return {
    ok: anyAttempted ? anyOk : false,
    status: anyAttempted ? (anyOk ? "sent" : "failed") : "pending",
    error: Object.values(results)
      .filter((r) => r && !r.ok)
      .map((r) => r.error)
      .filter(Boolean)
      .join("; "),
    results,
  };
}

function buildStats(recipients, channels) {
  const stats = {
    emailSent: 0,
    emailDelivered: 0,
    emailOpened: 0,
    emailClicked: 0,
    emailFailed: 0,
    whatsappSent: 0,
    whatsappDelivered: 0,
    whatsappFailed: 0,
    pending: 0,
  };

  for (const r of recipients) {
    if (r.status === "pending") stats.pending += 1;

    if (channels.includes("email")) {
      if (r.status === "sent") stats.emailSent += 1;
      else if (r.status === "failed") stats.emailFailed += 1;
    }

    if (channels.includes("whatsapp")) {
      if (r.status === "sent") stats.whatsappSent += 1;
      else if (r.status === "failed") stats.whatsappFailed += 1;
    }
  }

  return stats;
}

export const sendCommunication = asyncHandler(async (req, res) => {
  const {
    channels = [],
    audience = "all",
    recipients = [],
    subject = "",
    htmlBody = "",
    whatsappMessage = "",
    scheduledAt = null,
    sendTest = false,
    testEmail = "",
    testPhone = "",
  } = req.body;

  if (!Array.isArray(channels) || channels.length === 0) {
    return res.status(400).json({ success: false, message: "Select at least one channel (email / whatsapp)" });
  }

  // ── Test message ────────────────────────────────────────────
  if (sendTest) {
    const admin = await Admin.findById(req.admin?._id).select("name email");
    const toEmail = testEmail || admin?.email || "";
    const toPhone = testPhone || "";

    if (channels.includes("email") && !toEmail) {
      return res.status(400).json({ success: false, message: "Test email requires a valid email address" });
    }

    const results = {};
    if (channels.includes("email")) {
      results.email = await sendEmail({ to: toEmail, subject, html: htmlBody });
    }
    if (channels.includes("whatsapp") && toPhone) {
      results.whatsapp = await sendWhatsApp({ to: toPhone, message: whatsappMessage });
    } else if (channels.includes("whatsapp")) {
      results.whatsapp = { ok: false, error: "Provide a phone number for the WhatsApp test" };
    }

    const ok = Object.values(results).every((r) => r && r.ok);
    const record = await Communication.create({
      channels,
      audience: "test",
      subject,
      htmlBody,
      whatsappMessage,
      status: ok ? "sent" : "failed",
      isTest: true,
      sentAt: new Date(),
      recipients: [
        {
          recipientType: "user",
          recipientId: req.admin?._id,
          name: admin?.name || "Admin",
          email: toEmail,
          phone: toPhone,
          status: ok ? "sent" : "failed",
          error: Object.values(results)
            .filter((r) => r && !r.ok)
            .map((r) => r.error)
            .join("; "),
        },
      ],
      createdBy: req.admin?._id,
    });

    return res.status(200).json({ success: true, message: ok ? "Test message sent" : "Test message failed", data: record });
  }

  // ── Scheduled send ──────────────────────────────────────────
  if (scheduledAt) {
    const at = new Date(scheduledAt);
    if (Number.isNaN(at.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid schedule time" });
    }

    const resolved = await resolveRecipients({ audience, recipients });
    const record = await Communication.create({
      channels,
      audience,
      subject,
      htmlBody,
      whatsappMessage,
      status: "scheduled",
      scheduledAt: at,
      recipients: resolved.map((r) => ({ ...r, status: "pending" })),
      stats: buildStats([], channels),
      createdBy: req.admin?._id,
    });

    return res.status(201).json({
      success: true,
      message: `Message scheduled for ${at.toISOString()}`,
      data: record,
    });
  }

  // ── Send now ────────────────────────────────────────────────
  const resolved = await resolveRecipients({ audience, recipients });

  if (resolved.length === 0) {
    return res.status(400).json({ success: false, message: "No recipients matched" });
  }

  const updatedRecipients = [];
  for (const recipient of resolved) {
    const outcome = await sendToRecipient(recipient, channels, { subject, htmlBody, whatsappMessage });
    updatedRecipients.push({
      ...recipient,
      status: outcome.status,
      error: outcome.error,
    });
  }

  const stats = buildStats(updatedRecipients, channels);
  const failedCount = updatedRecipients.filter((r) => r.status === "failed").length;

  const record = await Communication.create({
    channels,
    audience,
    subject,
    htmlBody,
    whatsappMessage,
    status: failedCount === updatedRecipients.length && updatedRecipients.length > 0 ? "failed" : failedCount > 0 ? "partial" : "sent",
    sentAt: new Date(),
    recipients: updatedRecipients,
    stats,
    createdBy: req.admin?._id,
  });

  res.status(201).json({
    success: true,
    message: `Message sent to ${updatedRecipients.length} recipient${updatedRecipients.length === 1 ? "" : "s"}`,
    data: record,
  });
});

/* ── Scheduled-job executor ─────────────────────────────────── */

export async function flushDueCommunications() {
  const due = await Communication.find({
    status: "scheduled",
    scheduledAt: { $lte: new Date() },
  });

  for (const record of due) {
    const channels = record.channels;
    const updatedRecipients = [];

    for (const recipient of record.recipients) {
      const outcome = await sendToRecipient(recipient, channels, {
        subject: record.subject,
        htmlBody: record.htmlBody,
        whatsappMessage: record.whatsappMessage,
      });
      updatedRecipients.push({
        ...recipient,
        status: outcome.status,
        error: outcome.error,
      });
    }

    const stats = buildStats(updatedRecipients, channels);
    const failedCount = updatedRecipients.filter((r) => r.status === "failed").length;

    record.recipients = updatedRecipients;
    record.stats = stats;
    record.status =
      failedCount === updatedRecipients.length && updatedRecipients.length > 0
        ? "failed"
        : failedCount > 0
        ? "partial"
        : "sent";
    record.sentAt = new Date();
    await record.save();
  }

  return due.length;
}

let schedulerStarted = false;

export function startCommunicationScheduler(intervalMs = 30000) {
  if (schedulerStarted) return;
  schedulerStarted = true;
  setInterval(() => {
    flushDueCommunications().catch((err) =>
      console.error("[communication:scheduler]", err.message)
    );
  }, intervalMs);
}

/* ── History ────────────────────────────────────────────────── */

export const getCommunicationHistory = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const [total, communications] = await Promise.all([
    Communication.countDocuments(),
    Communication.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email")
      .lean(),
  ]);

  const enriched = communications.map((c) => {
    const sent = c.recipients.filter((r) => r.status === "sent").length;
    const failed = c.recipients.filter((r) => r.status === "failed").length;
    const pending = c.recipients.filter((r) => r.status === "pending").length;
    return { ...c, counts: { sent, failed, pending }, totalRecipients: c.recipients.length };
  });

  res.status(200).json({
    success: true,
    total,
    page,
    pages: Math.ceil(total / limit),
    communications: enriched,
  });
});

/* ── Analytics ──────────────────────────────────────────────── */

export const getCommunicationAnalytics = asyncHandler(async (req, res) => {
  const communications = await Communication.find({ status: { $in: ["sent", "partial"] } })
    .select("channels stats isTest createdAt")
    .lean();

  let totalEmailsSent = 0;
  let totalWhatsAppSent = 0;
  let totalEmailDelivered = 0;
  let totalEmailOpened = 0;
  let totalEmailClicked = 0;
  let totalRecipients = 0;
  let totalDelivered = 0;

  for (const c of communications) {
    if (c.isTest) continue;
    totalEmailsSent += c.stats?.emailSent || 0;
    totalWhatsAppSent += c.stats?.whatsappSent || 0;
    totalEmailDelivered += c.stats?.emailDelivered || 0;
    totalEmailOpened += c.stats?.emailOpened || 0;
    totalEmailClicked += c.stats?.emailClicked || 0;
    totalRecipients += c.recipients?.length || 0;
    totalDelivered += (c.stats?.emailSent || 0) + (c.stats?.whatsappSent || 0);
  }

  const recentCampaigns = await Communication.find()
    .sort({ createdAt: -1 })
    .limit(6)
    .select("subject whatsappMessage channels status createdAt stats audience isTest")
    .lean();

  const totalSent = totalEmailsSent + totalWhatsAppSent;

  res.status(200).json({
    success: true,
    data: {
      totalEmailsSent,
      totalWhatsAppSent,
      totalSent,
      deliveryRate: totalSent > 0 ? Math.round((totalDelivered / totalSent) * 100) : 0,
      openRate: totalEmailsSent > 0 ? Math.round((totalEmailOpened / totalEmailsSent) * 100) : 0,
      clickRate: totalEmailsSent > 0 ? Math.round((totalEmailClicked / totalEmailsSent) * 100) : 0,
      recentCampaigns,
    },
  });
});

/* ── Templates ──────────────────────────────────────────────── */

export const createTemplate = asyncHandler(async (req, res) => {
  const { name, category, subject, htmlBody, whatsappMessage } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Template name is required" });
  }

  const template = await MessageTemplate.create({
    name,
    category: category || "Custom Messages",
    subject,
    htmlBody,
    whatsappMessage,
    createdBy: req.admin?._id,
  });

  res.status(201).json({ success: true, message: "Template saved", template });
});

export const listTemplates = asyncHandler(async (req, res) => {
  const templates = await MessageTemplate.find()
    .sort({ updatedAt: -1 })
    .select("name category subject htmlBody whatsappMessage createdAt updatedAt");
  res.status(200).json({ success: true, templates });
});

export const updateTemplate = asyncHandler(async (req, res) => {
  const { name, category, subject, htmlBody, whatsappMessage } = req.body;
  const template = await MessageTemplate.findByIdAndUpdate(
    req.params.id,
    { name, category, subject, htmlBody, whatsappMessage },
    { new: true, runValidators: true }
  );

  if (!template) {
    return res.status(404).json({ success: false, message: "Template not found" });
  }

  res.status(200).json({ success: true, message: "Template updated", template });
});

export const deleteTemplate = asyncHandler(async (req, res) => {
  const template = await MessageTemplate.findById(req.params.id);
  if (!template) {
    return res.status(404).json({ success: false, message: "Template not found" });
  }
  await template.deleteOne();
  res.status(200).json({ success: true, message: "Template deleted" });
});
