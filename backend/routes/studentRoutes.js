const router = require("express").Router();
const multer = require("multer");

const {
  uploadStudents,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadStudents);

router.get("/", getStudents);

router.post("/add", addStudent);

router.put("/update/:id", updateStudent);

router.delete("/delete/:id", deleteStudent);

module.exports = router;