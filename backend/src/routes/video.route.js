import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, editVideo, getVideos, markVideoAsWatch, postVideo } from "../controllers/video.controller.js";
const router = Router({ mergeParams: true }); // important for nested params



router.route("/").post(upload.single('videoFile'),postVideo);
router.route("/:videoId").delete(deleteVideo);
router.route("/:videoId").patch(editVideo);
router.route("/markWatch/:videoId").patch(markVideoAsWatch);
router.route("/").get(getVideos);

export default router;