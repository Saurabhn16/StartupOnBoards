import Blogs from "../models/blog.model.js";
import User from "../models/user.model.js";

// Controller function to fetch all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Blogs.find()
      .sort({ createdAt: -1 })
      .populate("userId", "fullName username");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getPosts controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, author, imgLink } = req.body;
    const userId = req.user._id;

    const newPost = new Blogs({
      userId,
      title,
      content,
      author,
      imgLink, // Add the imgLink here
    });

    await newPost.save();
    console.log(newPost);
    // Add post ID to the user's blogs array
    const user = await User.findById(userId);
    user.blogs.push(newPost._id);
    await user.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to like/unlike a post
export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Blogs.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = await User.findById(userId);

    // Check if the user has already liked the post
    const alreadyLiked = post.likes.includes(userId);

    if (!alreadyLiked) {
      // Add user to likes
      post.likes.push(userId);
      user.likedPosts.push(postId);
    } else {
      // Remove user from likes
      post.likes = post.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
      user.likedPosts = user.likedPosts.filter(
        (likedPost) => likedPost.toString() !== postId.toString()
      );
    }

    await post.save();
    await user.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in likePost controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to add a comment to a post
export const commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.user._id;

    const post = await Blogs.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = {
      userId,
      content,
    };

    post.comments.push(comment);

    await post.save();

    // Add comment ID to the user's comments array
    const user = await User.findById(userId);
    user.comments.push({
      postId:postId, // Add the postId to the user's comments
      content: content,
    });

    await user.save();

    res.status(201).json(post);
  } catch (error) {
    console.error("Error in commentPost controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
