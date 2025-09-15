import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/", PostController.createPost);
router.get("/:id", PostController.getPostById);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
router.get("/", PostController.getAllPosts);

export const PostRouter = router;
