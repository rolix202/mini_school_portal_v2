import asyncHandler from "express-async-handler";
import Class from "../models/classModel.js";

export const view_class = (req, res, next) => {
    res.send("Counting in dollars")
}

export const create_class = asyncHandler(async(req, res, next) => {
    const student_class = await Class.create(req.body)

    if (!student_class){
        return res.status(400).json({
            status: "fail",
            message: "Couldn't create class!"
        })
    }

    res.status(201).json({
        status: "success",
        data: {
            student_class
        }
    })
})