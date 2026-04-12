const isProduction = process.env.NODE_ENV === "production";
const annaUniversityEmailRegex = /^[0-9]+@student\.annauniv\.edu$/;
const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseEmailList(value) {
  return (value || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

const adminEmails = parseEmailList(process.env.ADMIN_EMAILS).length
  ? parseEmailList(process.env.ADMIN_EMAILS)
  : [
      "niteshdwaraka@gmail.com",
      "niteshnd2006@gmail.com",
    ];

const developmentAllowedEmails = parseEmailList(process.env.DEV_ALLOWED_EMAILS);

function isDevelopmentAllowedEmail(email = "") {
  return !isProduction && developmentAllowedEmails.includes(email);
}

function isAllowedAuthEmail(email = "") {
  return validEmailRegex.test(email) || isDevelopmentAllowedEmail(email);
}

function getRoleForEmail(email = "") {
  return adminEmails.includes(email) ? "admin" : "student";
}

function getAuthEmailValidationMessage() {
  return "Please enter a valid email address.";
}

module.exports = {
  adminEmails,
  annaUniversityEmailRegex,
  developmentAllowedEmails,
  getAuthEmailValidationMessage,
  getRoleForEmail,
  isAllowedAuthEmail,
  isDevelopmentAllowedEmail,
  isProduction,
  validEmailRegex,
};
