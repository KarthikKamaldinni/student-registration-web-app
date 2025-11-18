import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// Add Student
router.post("/add", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json({ message: "Student added successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// View All Students
router.get("/all", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Delete Student
router.delete("/delete/:id", async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted!" });
});

export default router;
