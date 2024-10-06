import { Router } from "express";
import { create_student, delete_student, get_student, update_student, view_students } from "../controllers/studentController.js";
import { validate_id_param, validate_student_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.route("/:id")
    .get(validate_id_param, get_student)
    .patch(validate_id_param, update_student)
    .delete(validate_id_param, delete_student)

router.route("/")
    .get(view_students)
    .post(validate_student_details, create_student)

export default router