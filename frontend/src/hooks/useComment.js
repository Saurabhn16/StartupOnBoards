import { useState } from "react";
import toast from "react-hot-toast";

const useComment = () => {
  const [loading, setLoading] = useState(false);

  const commentBlog = async (blogId, content) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
          
      const data = await res.json();

      if (res.ok) {
        toast.success("Comment added");
      } else {
        throw new Error(data.error || "Failed to add comment");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return { commentBlog, loading };
};

export default useComment;
