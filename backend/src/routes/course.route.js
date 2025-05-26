import { Router } from "express";
import { createCourse, getAllCourses } from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/create').post(upload.single('thumbnail'),createCourse);
router.route('/').get(getAllCourses);

export default router;