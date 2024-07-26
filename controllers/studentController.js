import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";


export const view_student = async(req, res, next) => {
    const students = await Student.find().populate("subjects", "name").populate("class", "name").exec()

    res.status(200).json({
        status: "success",
        data: {
            students
        }
    })
}

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