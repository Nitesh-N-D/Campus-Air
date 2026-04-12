export const annaUniversityEmailRegex = /^[0-9]+@student\.annauniv\.edu$/;
export const courseRegex = /^[A-Za-z ]+$/;
export const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const developmentAllowedEmails = (import.meta.env.VITE_DEV_ALLOWED_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAnnaUniversityEmail(email = "") {
  const normalizedEmail = email.trim().toLowerCase();

  return (
    validEmailRegex.test(normalizedEmail) ||
    (import.meta.env.DEV && developmentAllowedEmails.includes(normalizedEmail))
  );
}

export function isValidCourse(course = "") {
  return courseRegex.test(course.trim());
}

export function getAuthEmailValidationMessage() {
  return "Please enter a valid email address.";
}
