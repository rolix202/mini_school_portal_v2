import { Router } from "express";
import { create_student, view_student } from "../controllers/studentController.js";
import { validate_student_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.route("/")
    .get(view_student)
    .post(validate_student_details, create_student)

export default router