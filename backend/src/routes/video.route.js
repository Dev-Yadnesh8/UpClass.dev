import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteVideo, editVideo, getVideoById, getVideoSummary, markVideoAsWatch, postVideo } from "../controllers/video.controller.js";
import { checkIsAdmin } from "../middlewares/auth.middleware.js";
const router = Router({ mergeParams: true }); // important for nested params



router.route("/").post(checkIsAdmin,upload.single('videoFile'),postVideo);
router.route("/:videoId").delete(checkIsAdmin,deleteVideo);
router.route("/:videoId").patch(checkIsAdmin,editVideo);
router.route("/markWatch/:videoId").patch(markVideoAsWatch);
router.route("/").get(getVideoSummary);
router.route("/:videoId").get(getVideoById);

export default router;