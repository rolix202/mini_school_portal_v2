import { Router } from "express";
import { create_class, view_class } from "../controllers/classController.js";

const router = Router()

router.route("/")
    .get(view_class)
    .post(create_class)

export default router