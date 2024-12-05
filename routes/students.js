const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/index");

router.get("/", StudentController.getAllStudents);

router.get("/:id", StudentController.getSingleStudent);

router.post("/", StudentController.createStudent);

router.put('/:id', StudentController.updateStudent)

router.delete("/:id", StudentController.deleteStudent)



module.exports = router;