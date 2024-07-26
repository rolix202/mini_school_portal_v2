import { Router } from "express";
import { create_subject } from "../controllers/subjectController.js";

const router = Router()

router.route("/")
    .get()
    .post(create_subject)


export default router