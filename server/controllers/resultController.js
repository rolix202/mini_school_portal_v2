import asyncHandler from "express-async-handler"
import Result from "../models/resultModel.js"
import Student from "../models/studentModel.js"


export const view_result = asyncHandler(async (req, res, next) => {

    const { term, session } = req.query
    
    const stud_result = await Result.find({student: req.params.id, term: term, session: session }).populate("subject")
    
    res.status(200).json({
        status: "success",
        data: stud_result
    })
})

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

export const update_single_result = asyncHandler(async(req, res, next) => {
    const { id } = req.params
    const { firstCA, secondCA } = req.body

    const result = await Result.findByIdAndUpdate(id, {
        $set: {
            "assessments.firstCA": firstCA,
            "assessments.secondCA": secondCA
        }
    }, { new: true })

    if (!result){
        return res.status(404).json({
            status: "fail",
            message: "Result not found!"
        })
    }

    result.midTermTotal = (firstCA || 0) + (secondCA || 0);
    result.finalTermTotal = result.midTermTotal + (result.assessments.thirdCA || 0) + (result.assessments.exam || 0);
    
    await result.save();

    res.status(200).json({
        status: "success",
        message: "Result updated!",
        data: {
            result
        }
    })
    
})