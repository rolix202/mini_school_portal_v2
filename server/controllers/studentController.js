import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";


export const view_students = asyncHandler(async (req, res, next) => {
    const students = await Student.find()
        .populate("subjects", "name")
        .populate("class", "name")
        .populate({
            path: "results",
            select: "subject term session assessments totalScore",
            populate: {
                path: "subject",
                select: "name"
            }
        })
        .exec();

    res.status(200).json({
        status: "success",
        data: {
            students
        }
    });
});

export const create_student = asyncHandler(async(req, res, next) => {
    const student = await Student.create(req.body)

    if (!student){
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

export const get_student = asyncHandler(async(req, res, next) => {
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

    if (!student){
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

export const update_student = asyncHandler(async(req, res, next) => {
    const student = await Student.findById(req.params.id)

    res.send(student)
})

export const delete_student = asyncHandler(async(req, res, next) => {
    res.send(req.params)
})