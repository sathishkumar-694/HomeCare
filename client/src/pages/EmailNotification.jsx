import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { API } from "../routes/api.js";
import axios from "axios";
import { Mail, Send, X } from "lucide-react";

export default function EmailNotification() {
  const { isAdmin } = useContext(AuthContext);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [emailData, setEmailData] = useState({
    subject: "",
    message: "",
    type: "general" // general, warning, suspension
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin()) {
      fetchRecipients();
    }
  }, [isAdmin]);

  const fetchRecipients = async () => {
    try {
      setLoading(true);
      const [usersRes, vendorsRes] = await Promise.all([
        axios.get(API.USER.GET_ALL()),
        axios.get(API.VENDOR.GET_ALL())
      ]);

      const allRecipients = [
        ...usersRes.data.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          type: "user",
          role: user.role
        })),
        ...vendorsRes.data.map(vendor => ({
          id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          type: "vendor",
          role: vendor.status
        }))
      ];

      setRecipients(allRecipients);
    } catch (err) {
      console.error("Error fetching recipients:", err);
      alert("Error loading recipients");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipientToggle = (recipient) => {
    setSelectedRecipients(prev => {
      const exists = prev.find(r => r.id === recipient.id);
      if (exists) {
        return prev.filter(r => r.id !== recipient.id);
      } else {
        return [...prev, recipient];
      }
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (selectedRecipients.length === 0) {
      alert("Please select at least one recipient");
      return;
    }

    if (!emailData.subject || !emailData.message) {
      alert("Please fill in subject and message");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(API.EMAIL.SEND_NOTIFICATION(), {
        recipients: selectedRecipients,
        subject: emailData.subject,
        message: emailData.message,
        type: emailData.type
      });

      alert("Email notification sent successfully!");
      setEmailData({ subject: "", message: "", type: "general" });
      setSelectedRecipients([]);
    } catch (err) {
      console.error("Error sending email:", err);
      alert("Error sending email notification");
    } finally {
      setSubmitting(false);
    }
  };

  const getEmailTemplate = (type) => {
    switch (type) {
      case "warning":
        return {
          subject: "Important Notice - Account Warning",
          message: "This is an official warning regarding your account. Please review our terms of service and ensure compliance with our platform guidelines."
        };
      case "suspension":
        return {
          subject: "Account Suspension Notice",
          message: "Your account has been temporarily suspended due to policy violations. Please contact support for more information."
        };
      default:
        return {
          subject: "Important Update from HomeCare",
          message: "We have an important update regarding our services and platform policies."
        };
    }
  };

  const applyTemplate = (type) => {
    const template = getEmailTemplate(type);
    setEmailData(prev => ({
      ...prev,
      type,
      subject: template.subject,
      message: template.message
    }));
  };

  if (!isAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible to administrators.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recipients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            📧 Send Email Notifications
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Send notifications to users and vendors
          </p>

          <form onSubmit={handleSendEmail} className="space-y-8">
            {/* Email Type Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Email Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => applyTemplate("general")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    emailData.type === "general"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <Mail className="mx-auto mb-2" size={24} />
                  <div className="font-semibold">General</div>
                  <div className="text-sm text-gray-600">General updates</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate("warning")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    emailData.type === "warning"
                      ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                      : "border-gray-300 hover:border-yellow-500"
                  }`}
                >
                  <Mail className="mx-auto mb-2" size={24} />
                  <div className="font-semibold">Warning</div>
                  <div className="text-sm text-gray-600">Account warnings</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyTemplate("suspension")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    emailData.type === "suspension"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300 hover:border-red-500"
                  }`}
                >
                  <Mail className="mx-auto mb-2" size={24} />
                  <div className="font-semibold">Suspension</div>
                  <div className="text-sm text-gray-600">Account suspension</div>
                </button>
              </div>
            </div>

            {/* Recipients Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Select Recipients ({selectedRecipients.length} selected)
              </label>
              <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {recipients.map((recipient) => (
                    <label
                      key={recipient.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRecipients.some(r => r.id === recipient.id)}
                        onChange={() => handleRecipientToggle(recipient)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {recipient.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {recipient.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {recipient.type} • {recipient.role}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  Message *
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>

            {/* Send Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting || selectedRecipients.length === 0}
                className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  submitting || selectedRecipients.length === 0
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
                }`}
              >
                <Send size={20} />
                <span>{submitting ? "Sending..." : "Send Notification"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
