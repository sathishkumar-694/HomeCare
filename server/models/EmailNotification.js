import mongoose from "mongoose";

const emailNotificationSchema = new mongoose.Schema({
  recipients: [{
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['user', 'vendor'],
      required: true
    }
  }],
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'warning', 'suspension'],
    default: 'general'
  },
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  sentAt: {
    type: Date
  }
}, { timestamps: true });

export default mongoose.model("EmailNotification", emailNotificationSchema);
