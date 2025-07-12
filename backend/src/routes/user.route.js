import { Router } from "express";
import { changePassword, currentUser, logoutUser, refreshAccessToken, signIn, signUp, verifyEmail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)
router.route("/verify-email").post(verifyEmail)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/token/refresh").post(refreshAccessToken)
router.route("/password/change").post(verifyJWT,changePassword)
router.route("/me").get(verifyJWT,currentUser)

export default router;