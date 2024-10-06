import { Router } from "express";
import { create_staff, get_a_staff, view_staff } from "../controllers/staffController.js";
import { validate_staff_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.route("/:id")
    .get(get_a_staff)

router.route("/")
    .get(view_staff)
    .post(validate_staff_details, create_staff)


export default router