import { Router } from "express";
import { create_class, view_class } from "../controllers/classController.js";
import { validate_class_details } from "../middlewares/validationMiddleware.js";

const router = Router()

router.route("/")
    .get(view_class)
    .post(validate_class_details, create_class)

export default router