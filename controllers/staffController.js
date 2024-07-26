import asyncHandler from "express-async-handler";
import Staff from "../models/staffModel.js";

export const view_staff = (req, res, next) => {
    res.send("howdy roland")
}

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
        data: {
            staff
        }
    })
})