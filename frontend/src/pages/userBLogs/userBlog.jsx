import React, { useState, useEffect } from "react";
import useBlogs from "../../hooks/useBlogs";
import useLike from "../../hooks/useLike";
import useComment from "../../hooks/useComment";
import "daisyui/dist/full.css"; // Import daisyUI styles
import useAllUsers from "../../hooks/useAlluser";
import { useAuthContext } from "../../context/AuthContext";
import { FaHeart, FaRegHeart, FaComment, FaUserCircle } from "react-icons/fa"; 
const UserBlogs = ({ userId }) => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    author: "",
    imgLink: "", // Add imgLink to the state
  });
  const { authUser } = useAuthContext();
  const { users } = useAllUsers();
  const [blogs, setBlogs] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [viewLikes, setViewLikes] = useState(null);
  const [viewComments, setViewComments] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { blogs: createBlog, loading: createLoading } = useBlogs();
  const { likeBlog, loading: likeLoading } = useLike();
  const { commentBlog, loading: commentLoading } = useComment();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();

      // Filter blogs based on the logged-in user's ID
      const userBlogs = data.filter((blog) => blog.authorId === userId);
      setBlogs(userBlogs);

    } catch (error) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await createBlog(inputs);

    fetchBlogs();
    setIsPreviewOpen(false);
    setIsDialogOpen(false);
  };

  const handleLike = async (blogId) => {
    await likeBlog(blogId);
    fetchBlogs();
  };

  const handleComment = async (blogId) => {
    const commentInput = commentInputs[blogId];
    if (!commentInput) {
      toast.error("Please enter a comment");
      return;
    }

    await commentBlog(blogId, commentInput);
    fetchBlogs();
    setCommentInputs({ ...commentInputs, [blogId]: "" });
  };

  const toggleLikes = (blogId) => {
    if (viewLikes === blogId) {
      setViewLikes(null);
    } else {
      setViewLikes(blogId);
    }
  };

  const toggleComments = (blogId) => {
    if (viewComments === blogId) {
      setViewComments(null);
    } else {
      setViewComments(blogId);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCommentInputChange = (e, blogId) => {
    const { value } = e.target;
    setCommentInputs({ ...commentInputs, [blogId]: value });
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsPreviewOpen(false);
  };

  const openPreview = () => {
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };  
  const hasUserLiked = (blog) => {
    const currentUser = authUser._id; // Replace with actual logic to get current user's ID or identifier
    // console.log(currentUser);
    // console.log();
    const likedByCurrentUser = blog.likes.some(
      (like) => like.toString() === currentUser.toString()
    );

    return likedByCurrentUser;
  };


  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Startup userBlogs</h1>
      <button className="btn btn-primary mb-6" onClick={openDialog}>
        New Post
      </button>
      <dialog open={isDialogOpen} className="modal">
        <form className="modal-box">
          <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Title"
            className="input mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="content"
            value={inputs.content}
            onChange={handleChange}
            placeholder="Content"
            className="textarea mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
          <input
            type="text"
            name="author"
            value={inputs.author}
            onChange={handleChange}
            placeholder="Author"
            className="input mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="imgLink"
            value={inputs.imgLink}
            onChange={handleChange}
            placeholder="Image Link (Optional)"
            className="input mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="modal-action flex justify-end">
            <button type="button" className="btn mr-2" onClick={closeDialog}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openPreview}
            >
              Preview
            </button>
          </div>
        </form>
      </dialog>

      <dialog open={isPreviewOpen} className="modal">
        <div className="modal-box">
          <h2 className="text-2xl font-bold mb-4">Preview Post</h2>
          <h3 className="text-xl font-bold mb-2">{inputs.title}</h3>
          <p className="mb-4">{inputs.content}</p>
          <p className="text-gray-600 mb-4">Author: {inputs.author}</p>
          {inputs.imgLink && (
            <img
              src={inputs.imgLink}
              alt="Blog visual"
              className="mb-4 rounded-lg shadow-lg"
            />
          )}
          <div className="modal-action flex justify-end">
            <button type="button" className="btn mr-2" onClick={closePreview}>
              Edit
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={createLoading}
            >
              {createLoading ? "Creating..." : "Post"}
            </button>
          </div>
        </div>
      </dialog>

      {blogs.map((blog) => (
        <div key={blog._id} className="bg-white shadow-md rounded-lg mb-6">
          <div className="p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex-1 text-left">
                <h2 className="text-xl font-bold">{blog.title}</h2>
              </div>
              <div className="flex-1 text-right">
                <p className="text-gray-600">Author: {blog.author}</p>
              </div>
            </div>

            {/* Content Section */}
            <div className="mb-4">
              <p className="text-gray-600 mb-4">Content: {blog.content}</p>
              {blog.imgLink && (
                <img
                  src={blog.imgLink}
                  alt="Blog visual"
                  className="mb-4 rounded-lg shadow-lg"
                />
              )}
            </div>

            {/* Action Icons */}
            <div className="w-full flex justify-around items-center mb-4">
              <div
                onClick={() => handleLike(blog._id)}
                className="cursor-pointer"
              >
                {hasUserLiked(blog) ? (
                  <FaHeart className="text-red-500 text-2xl" />
                ) : (
                  <FaRegHeart className="text-gray-500 text-2xl" />
                )}
              </div>
              <div
                onClick={() => toggleLikes(blog._id)}
                className="cursor-pointer"
              >
                <FaUserCircle className="text-gray-500 text-2xl" />
              </div>
              <div
                onClick={() => toggleComments(blog._id)}
                className="cursor-pointer"
              >
                <FaComment className="text-gray-500 text-2xl" />
              </div>
            </div>

            {viewLikes === blog._id && (
              <div>
                {blog.likes.length > 0 && (
                  <div>
                    <h3 className="font-bold mb-2">Likes:</h3>
                    <div className="flex items-center">
                      {blog.likes.map((likeId) => {
                        const user = users.find((user) => (user._id === likeId||user._id==authUser));
                        return (
                          <div key={likeId} className="flex items-center mr-2">
                            <img
                              src={
                                user?.profilePic || "/default-profile-pic.png"
                              }
                              alt={`Profile of ${user?.username || "User"}`}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>{user?.username || likeId}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

{viewComments === blog._id && (
  <div className="mt-4">
    <h3 className="font-bold mb-2">Comments:</h3>
    {blog.comments.length > 0 ? (
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index} className="mb-2">
            <div className="flex items-start">
              <img
                src={users.find(user => user._id === comment.userId)?.profilePic || "/default-profile-pic.png"}
                alt={`Profile of ${users.find(user => user._id === comment.userId)?.username || comment.userId}`}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <strong>{users.find(user => user._id === comment.userId)?.username || comment.userId}:</strong> {comment.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No comments yet.</p>
    )}
    <div className="flex flex-col items-center mt-2 w-full">
      <input
        type="text"
        value={commentInputs[blog._id] || ""}
        onChange={(e) =>
          setCommentInputs({
            ...commentInputs,
            [blog._id]: e.target.value,
          })
        }
        placeholder="Enter your comment"
        className="input mb-2 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => handleComment(blog._id)}
        className="btn btn-outline btn-sm btn-primary w-full"
        disabled={commentLoading}
      >
        {commentLoading ? "Commenting..." : "Comment"}
      </button>
    </div>
  </div>
)}

          </div>
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
