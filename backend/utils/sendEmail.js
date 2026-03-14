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

    const gmail = google.gmail({
      version: "v1",
      auth: oAuth2Client
    });

    const message = [
      `From: Campus Air <${process.env.EMAIL_USER}>`,
      `To: ${recipients.join(",")}`,
      "Content-Type: text/html; charset=utf-8",
      `Subject: ${subject}`,
      "",
      html || text
    ].join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage
      }
    });

    console.log("✅ Email sent successfully:", response.data.id);

    return response.data;

  } catch (error) {

    console.error("❌ Gmail API send failed:", error);
    throw error;

  }

};

module.exports = sendEmail;