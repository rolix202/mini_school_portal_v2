import asyncHanler from "express-async-handler"
import Subject from "../models/subjectModel.js"

export const create_subject = asyncHanler(async(req, res, next) => {

    const subject = await Subject.create(req.body)

    if (!subject) {
        return res.status(400).json({
          status: 'fail',
          message: "Couldn't create subject!",
        });
      }

    res.status(201).json({
        status: "success",
        data: {
            subject
        }
    })
}) 