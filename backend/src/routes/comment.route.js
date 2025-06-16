import {Router} from "express";
import { addComment, deleteComment, editComment, fetchAllComments } from "../controllers/comment.controller";
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router();
 
router.route("/:videoId").post(verifyJWT,addComment);
router.route("/:videoId").patch(verifyJWT,editComment);
router.route("/:videoId").get(verifyJWT,fetchAllComments);
router.route("/:videoId").delete(verifyJWT,deleteComment);

export default router;