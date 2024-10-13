import { Router } from "express";
import { create_class, get_class_name_arm, view_class } from "../controllers/classController.js";
import { validate_class_details } from "../middlewares/validationMiddleware.js";
// import { view_students } from "../controllers/studentController.js";

const router = Router()

router.route("/")
    // .get(view_students)
    .get(view_class)
    .post(validate_class_details, create_class)
    
router.route("/arm")
    .get(get_class_name_arm)

export default router