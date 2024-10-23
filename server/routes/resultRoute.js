import { Router } from "express";
import { create_result, view_result } from "../controllers/resultController.js";

const router = Router()

router.route("/")
    .post(create_result)
router.route("/:id")
    .get(view_result)


export default router