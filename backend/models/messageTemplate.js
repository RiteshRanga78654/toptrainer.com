import mongoose from "mongoose";

const messageTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Template name is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Workshop Notifications",
        "Event Announcements",
        "Trainer Updates",
        "Article Updates",
        "Marketing Campaigns",
        "Custom Messages",
      ],
      default: "Custom Messages",
    },
    subject: { type: String, default: "" },
    htmlBody: { type: String, default: "" },
    whatsappMessage: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

const MessageTemplate =
  mongoose.models.MessageTemplate ||
  mongoose.model("MessageTemplate", messageTemplateSchema);

export default MessageTemplate;
