import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, postVideo } from "../controllers/video.controller.js";
const router = Router({ mergeParams: true }); // important for nested params



router.route("/").post(upload.single('videoFile'),postVideo);
router.route("/:videoId").delete(deleteVideo);

export default router;