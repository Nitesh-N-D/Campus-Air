const User = require("../models/User");
const fs = require("fs");
const csv = require("csv-parser");

/* Upload CSV Students */

exports.uploadStudents = async (req, res) => {

  const students = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {

      students.push({
        name: row.name,
        email: row.email,
        department: row.department,
        year: row.year,
        role: "student"
      });

    })
    .on("end", async () => {

      await User.insertMany(students);

      res.json({ message: "Students uploaded successfully" });

    });

};

/* Get Students */

exports.getStudents = async (req, res) => {

  const students = await User.find({ role: "student" });

  res.json(students);

};

/* Add Student */

exports.addStudent = async (req, res) => {

  const { name, email, department, year } = req.body;

  const student = new User({
    name,
    email,
    department,
    year,
    role: "student"
  });

  await student.save();

  res.json(student);

};

/* Update Student */

exports.updateStudent = async (req, res) => {

  const { id } = req.params;

  const student = await User.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );

  res.json(student);

};

/* Delete Student */

exports.deleteStudent = async (req, res) => {

  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.json({ message: "Student deleted" });

};