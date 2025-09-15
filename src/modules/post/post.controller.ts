import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const result = await PostService.createPost(data);

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

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";

    //sorting
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;

    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await PostService.getAllPosts({
      page,
      limit,
      search,
      isFeatured,
      tags
    });

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: (err as Error).message,
    });

    // res.status(500).json({ error: "Failed to fetch posts", details: err });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await PostService.getPostById(Number(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: (error as Error).message,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await PostService.updatePost(Number(req.params.id), req.body);
    res.status(201).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    await PostService.deletePost(Number(req.params.id));
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: (error as Error).message,
    });
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
