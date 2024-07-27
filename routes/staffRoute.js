import { Router } from "express";
import { create_staff, view_staff } from "../controllers/staffController.js";
import { validate_staff_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.route("/")
    .get(view_staff)
    .post(validate_staff_details, create_staff)


export default router