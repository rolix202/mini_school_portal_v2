import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";
import mongoose from "mongoose";

export const view_staff = asyncHandler(async (req, res, next) => {
    const staff = await Staff.find()

    if (!staff){
        return res.status(404).json({
            status: "fail",
            message: "No Record found!"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            staff
        }
    })
})

export const create_staff = asyncHandler(async(req, res, next) => {
    const staff = await Staff.create(req.body)

    if (!staff){
        return res.status(400).json({
            status: "fail",
            message: "Couldn't create staff!"
        })
    }

    res.status(201).json({
        status: "success",
        message: "Staff created successfully!"
    })
})

export const get_a_staff = asyncHandler(async (req, res, next) => {
    const id = req.params.id

    if (!mongoose.isValidObjectId(id)){
        return res.status(400).json({
            status: "fail",
            message: "Invalid staff ID"
        })
    }

    const staff = await Staff.findById(id)

    if (!staff){
        return res.status(404).json({
            status: "fail",
            message: "No staff found!"
        })
    }

    res.status(200).json({
        status: "success",
        message: "Staff member retrieved successfully",
        data: {
            staff
        }
    })
})
export const get_staffs_with_first_last_name = asyncHandler(async (req, res, next) => {
    const staffs = await Staff.find({}, "firstName lastName")

    if (!staffs){
        return res.status(404).json({
            status: "fail",
            message: "No staff record found!"
        })
    }

    res.status(200).json({
        status: "success",
        data: staffs
    })
})