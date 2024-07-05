import express from "express";
import { getPosts, createPost, likePost, commentPost } from "../controllers/blogs.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getPosts);          // Route to fetch all posts
router.post("/new", protectRoute, createPost);    // Route to create a new post
router.post("/:id/like", protectRoute, likePost); // Route to like/unlike a post
router.post("/:id/comment", protectRoute, commentPost); // Route to comment on a post

export default router;
