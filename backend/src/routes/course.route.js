import { Router } from "express";
import {
  createCourse,
  editCourse,
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import videoRouter from "../routes/video.route.js";
import { checkIsAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { getCourseProgress } from "../controllers/progress.controller.js";
const router = Router();

router
  .route("/create")
  .post(verifyJWT, checkIsAdmin, upload.single("thumbnail"), createCourse);
router
  .route("/edit/:courseId")
  .patch(verifyJWT, checkIsAdmin, upload.single("thumbnail"), editCourse);
  router.route("/progress").get(verifyJWT, getCourseProgress);
router.route("/").get(verifyJWT, getAllCourses);
router.route("/:id").get(verifyJWT, getCourseById);

// Nested route
router.use("/:courseId/videos", verifyJWT, videoRouter);

export default router;
