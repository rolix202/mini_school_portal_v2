import { Router } from "express";
import { create_staff, get_a_staff, get_staffs_with_first_last_name, view_staff } from "../controllers/staffController.js";
import { validate_staff_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.get("/class", get_staffs_with_first_last_name)

router.route("/:id")
    .get(get_a_staff)

router.route("/")
    .get(view_staff)
    .post(validate_staff_details, create_staff)
   

export default router