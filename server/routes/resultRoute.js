import { Router } from "express";
import { create_result, update_single_result, view_result } from "../controllers/resultController.js";

const router = Router()

router.route("/")
    .post(create_result)
router.route("/:id")
    .get(view_result)
    .patch(update_single_result)


export default router