import express from "express";
import {
  getBlog,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getComment,
  createComment,
  deleteComment,
} from "../controllers/blog_post.js";
import { registerUser, signInUser } from "../controllers/users.js";

const router = express.Router();
router.get("/blogs", getBlog);
router.get("/blogs/:blog_id", getBlogById);
router.post("/blogs", createBlog);
router.put("/blogs/:blog_id", updateBlog);
router.delete("/blogs/:blog_id", deleteBlog);
router.post("/register", registerUser);
router.post("/sign-in", signInUser);
router.get("/blogs/comments", getComment);
router.put("/comment/:blog_id", createComment);
router.delete("/comments/:blog_id", deleteComment);

export default router;
