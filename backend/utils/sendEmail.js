const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

function normalizeRecipients(to) {
  const recipients = Array.isArray(to) ? to : [to];

  return [...new Set(
    recipients
      .flatMap((recipient) => `${recipient}`.split(","))
      .map((recipient) => recipient.trim())
      .filter(Boolean)
  )];
}

const sendEmail = async (to, subject, text, html) => {

  const recipients = normalizeRecipients(to);

  console.log("📧 Email recipients:", recipients);

  if (!recipients.length) {
    throw new Error("No valid email recipients provided");
  }

  try {

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token
      }
    });

    const mailOptions = {
      from: `Campus Air <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sender receives a copy
      bcc: recipients,            // send to all students safely
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);

  } catch (error) {

    console.error("❌ Gmail API send failed:", error);
    throw error;

  }

};

module.exports = sendEmail;