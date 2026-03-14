const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

function normalizeRecipients(to) {
  const recipients = Array.isArray(to) ? to : [to];

  return [...new Set(
    recipients
      .flatMap((recipient) => `${recipient}`.split(","))
      .map((recipient) => recipient.trim().toLowerCase())
      .filter(Boolean)
  )];
}

const sendEmail = async (to, subject, text, html) => {

  const recipients = normalizeRecipients(to);

  if (!recipients.length) {
    throw new Error("No valid email recipients provided");
  }

  try {

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: recipients,
      subject: subject,
      text: text,
      html: html
    });

    console.log("Email sent:", response);

    return response;

  } catch (error) {

    console.error("Email send failed:", error);
    throw error;

  }

};

module.exports = sendEmail;