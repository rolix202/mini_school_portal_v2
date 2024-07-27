import { Router } from "express";
import { create_subject } from "../controllers/subjectController.js";
import { validate_subject_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.route("/")
    .get()
    .post(validate_subject_details, create_subject)


export default router