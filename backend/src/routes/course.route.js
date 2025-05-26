import { Router } from "express";
import { createCourse } from "../controllers/course.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route('/create').post(upload.single('thumbnail'),createCourse)

export default router;