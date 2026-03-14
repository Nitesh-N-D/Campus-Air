const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 90000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

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

  if (recipients.length === 0) {
    throw new Error("No valid email recipients provided");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    subject,
    text
  };

  if (html) {
    mailOptions.html = html;
  }

  if (recipients.length === 1) {
    mailOptions.to = recipients[0];
  } else {
    mailOptions.to = process.env.EMAIL_USER;
    mailOptions.bcc = recipients;
  }

  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent: ${info.response}`);
  return info;
};

module.exports = sendEmail;
