import { Router } from "express";
import { changePassword, currentUser, forgetPassword, logoutUser, refreshAccessToken, signIn, signUp, verifyEmail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)
router.route("/verify-email").post(verifyEmail)
router.route("/password/forget").post(forgetPassword)
router.route("/password/change/:token").post(changePassword)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/token/refresh").post(refreshAccessToken)
router.route("/me").get(verifyJWT,currentUser)

export default router;