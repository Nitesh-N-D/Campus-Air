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

  console.log("Using Resend email service");

  const recipients = normalizeRecipients(to);

  if (!recipients.length) {
    throw new Error("No valid email recipients provided");
  }

  try {

    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: recipients,
      subject,
      text,
      html
    });

    console.log("Email sent successfully:", response);

    return response;

  } catch (error) {

    console.error("Resend email failed:", error);
    throw error;

  }

};

module.exports = sendEmail;