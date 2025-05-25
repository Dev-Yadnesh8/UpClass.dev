import { Router } from "express";
import { logoutUser, signIn, signUp } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)
router.route("/logout").post(verifyJWT,logoutUser)

export default router;