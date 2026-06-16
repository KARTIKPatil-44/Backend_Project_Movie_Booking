const axios = require("axios");
const User = require("../models/user.model");
const sendMail = async (subject, id, content) => {
  try {
    const user = await User.findById(id);
    if (!user || !user.email) {
      console.warn("[MAIL_SERVICE] User not found or email missing for id:", id);
      return;
    }
    await axios.post(
      process.env.NOTI_SERVICE + "/notiservice/api/v1/notifications",
      {
        subject: subject,
        recepientEmails: [user.email],
        content: content,
      }
    );
  } catch (err) {
    console.warn("[MAIL_SERVICE] Failed to send email via notification service:", err.message);
  }
};

module.exports = sendMail;