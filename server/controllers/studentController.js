import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import Class from "../models/classModel.js";

export const view_students = asyncHandler(async (req, res, next) => {
    const { cname, arm, term, session } = req.query;

    if (!cname || !arm) {
        return res.status(400).json({ message: "Class name and arm are required" });
    }

    const classInfo = await Class.findOne({ name: cname, class_arm: arm });

    if (!classInfo) {
        return res.status(404).json({ message: "Class not found" });
    }

    let students;

    if (term && session) {
        students = await Student.find({ class_id: classInfo._id })
            .select(" -subjects ")
            .populate({
                path: "results",
                match: { term: term, session: session },
                select: "term session"
            })
            .populate({
                path: "class_id",
                select: "name class_arm category",
                populate: {
                    path: "class_teacher",
                    select: "firstName lastName phoneNo"
                }
            });

        const studentsWithResults = students.filter(student => student.results && student.results.length > 0);

        res.status(200).json({
            status: "success",
            data: {
                students: studentsWithResults
            }
        });
    } else {
        students = await Student.find({ class_id: classInfo._id })
            .select(" -results -subjects")
            .populate({
                path: "class_id",
                select: "name class_arm category",
                populate: {
                    path: "class_teacher",
                    select: "firstName lastName phoneNo"
                }
            });

            res.status(200).json({
                status: "success",
                data: {
                    students
                }
            });
    }
});


export const create_student = asyncHandler(async (req, res, next) => {
    const student = await Student.create(req.body)

    if (!student) {
        return res.status(400).json({
            status: "fail",
            message: "Couldn't create student!"
        })
    }

    res.status(201).json({
        status: "success",
        data: {
            student
        }
    })
})

export const get_student = asyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id)
        .populate("class", "name class_arm category")
        .populate("subjects")
        .populate({
            path: "results",
            select: "subject term session assessments totalScore",
            populate: {
                path: "subject",
                select: "name"
            }

        })

    if (!student) {
        return res.status(404).json({
            status: "fail",
            message: "Student not found!"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            student
        }
    })
})

export const update_student = asyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id)

    res.send(student)
})

export const delete_student = asyncHandler(async (req, res, next) => {
    res.send(req.params)
})