import { Router } from "express";
import { create_staff, view_staff } from "../controllers/staffController.js";

const router = Router()

router.route("/")
    .get(view_staff)
    .post(create_staff)


export default router