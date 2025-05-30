import { Router } from "express";
import { getPurchasedCourse, purchaseCourse } from "../controllers/purchase.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/:courseId").post(verifyJWT,purchaseCourse);
router.route("/").get(verifyJWT,getPurchasedCourse);

export default router;