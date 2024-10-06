import { Router } from "express";
import { create_result, view_result } from "../controllers/resultController.js";

const router = Router()

router.route("/")
    .get(view_result)
    .post(create_result)


export default router