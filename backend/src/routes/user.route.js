import { Router } from "express";
import { signUp } from "../controllers/user.controller.js";
const router = Router();

router.route("/sign-up").post(signUp)

export default router;