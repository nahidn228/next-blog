import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await PostService.createPost(data);
    console.log("Post created:", result);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating post:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: (error as Error).message,
    });
  }
};

export const PostController = {
  createPost,
};
