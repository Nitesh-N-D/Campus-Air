const { annaUniversityEmailRegex, isAllowedAuthEmail } = require("../config/authConfig");
const courseRegex = /^[A-Za-z ]+$/;

function isAnnaUniversityEmail(email = "") {
  return isAllowedAuthEmail(email);
}

function isValidCourse(course = "") {
  return courseRegex.test(course);
}

module.exports = {
  annaUniversityEmailRegex,
  courseRegex,
  isAnnaUniversityEmail,
  isValidCourse,
};
