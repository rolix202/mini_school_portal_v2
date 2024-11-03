import asyncHandler from "express-async-handler";
import Class from "../models/classModel.js";

export const get_class_name_arm = asyncHandler(async (req, res, next) => {
    const classDetails = await Class.find().select("name class_arm")

    if (!classDetails){
        return res.status(404).json({
            status: "fail",
            message: "No record found"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Successfully fetched Class and Arm.",
        data: classDetails
    })
    
})

export const view_class = asyncHandler(async(req, res, next) => {

    const classes = await Class.find()

    if (!classes){
        return res.status(404).json({
            status: "fail",
            message: "No class found!"
        })
    }

    res.status(200).json({
        status: "success",
        data: classes
    })
})

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
        message: "Class created!"
    })
})
