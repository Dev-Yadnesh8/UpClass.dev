import { Router } from "express";
import { createCourse, getAllCourses } from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import videoRouter from "../routes/video.route.js";
const router = Router();

router.route('/create').post(upload.single('thumbnail'),createCourse);
router.route('/').get(getAllCourses);

// Nested route
router.use('/:courseId/videos',videoRouter);

export default router;