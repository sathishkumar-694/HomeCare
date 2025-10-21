import EmailNotification from "../models/EmailNotification.js";
import { sendBulkEmail } from "../utils/emailService.js";

// POST /api/email/send-notification
export const sendNotification = async (req, res) => {
  try {
    const { recipients, subject, message, type } = req.body;

    // Validate required fields
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: "Recipients array is required" });
    }

    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required" });
    }

    // Create email notification record
    const emailNotification = new EmailNotification({
      recipients,
      subject,
      message,
      type: type || 'general',
      sentBy: req.user.id, // Assuming user is authenticated
      status: 'pending'
    });

    await emailNotification.save();

    // Send emails
    const results = await sendBulkEmail(recipients, subject, message, generateHTML(message));

    // Update notification status
    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    emailNotification.status = failedCount === 0 ? 'sent' : 'failed';
    emailNotification.sentAt = new Date();
    await emailNotification.save();

    res.json({
      message: "Email notification processed",
      notificationId: emailNotification._id,
      results: {
        total: recipients.length,
        sent: successCount,
        failed: failedCount
      },
      details: results
    });
  } catch (err) {
    console.error("Send notification error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/email/notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await EmailNotification.find()
      .populate('sentBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Helper function to generate HTML from message
const generateHTML = (message) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">HomeCare</h1>
        <p style="color: white; margin: 5px 0 0 0;">Your trusted home service partner</p>
      </div>
      <div style="padding: 30px; background: #f8f9fa;">
        <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-top: 0;">Important Notification</h2>
          <div style="line-height: 1.6; color: #555;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #888; font-size: 14px; margin: 0;">
            This is an automated message from HomeCare. Please do not reply to this email.
          </p>
        </div>
      </div>
    </div>
  `;
};
