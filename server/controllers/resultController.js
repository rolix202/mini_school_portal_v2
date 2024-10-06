import asyncHandler from "express-async-handler"
import Result from "../models/resultModel.js"
import Student from "../models/studentModel.js"


export const view_result = (req, res, next) => {
    res.send("Howdy Roland")
}

export const create_result = asyncHandler(async(req, res, next) => {
    const result = await Result.create(req.body)

    if (!result){
        return res.status(400).json({
            status: "fail",
            message: "Couldn't create result!"
        })
    }

    await Student.findByIdAndUpdate(
        result.student,
        {$push: {results: result._id}},
        {new: true, useFindAndModify: false}
    )

    res.status(201).json({
        status: "success",
        data: {
            result
        }
    })
})