import { Router } from "express";
import { create_student, view_student } from "../controllers/studentController.js";

const router = Router()

router.route("/")
    .get(view_student)
    .post(create_student)

export default router