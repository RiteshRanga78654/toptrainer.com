import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
  {
    recipientType: {
      type: String,
      enum: ["user", "trainer"],
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientType",
    },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["sent", "failed", "pending"],
      default: "pending",
    },
    error: { type: String, default: "" },
    openedAt: { type: Date },
    clickedAt: { type: Date },
  },
  { _id: false }
);

const communicationSchema = new mongoose.Schema(
  {
    channels: {
      type: [String],
      enum: ["email", "whatsapp"],
      default: [],
    },
    audience: {
      type: String,
      enum: ["all_users", "all_trainers", "all", "selected"],
      default: "all",
    },
    subject: { type: String, default: "" },
    htmlBody: { type: String, default: "" },
    whatsappMessage: { type: String, default: "" },
    status: {
      type: String,
      enum: ["sent", "scheduled", "failed", "partial"],
      default: "sent",
    },
    scheduledAt: { type: Date },
    sentAt: { type: Date },
    isTest: { type: Boolean, default: false },
    recipients: [recipientSchema],
    stats: {
      emailSent: { type: Number, default: 0 },
      emailDelivered: { type: Number, default: 0 },
      emailOpened: { type: Number, default: 0 },
      emailClicked: { type: Number, default: 0 },
      emailFailed: { type: Number, default: 0 },
      whatsappSent: { type: Number, default: 0 },
      whatsappDelivered: { type: Number, default: 0 },
      whatsappFailed: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const Communication =
  mongoose.models.Communication ||
  mongoose.model("Communication", communicationSchema);

export default Communication;
