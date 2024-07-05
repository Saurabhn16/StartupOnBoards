import { useState } from "react";
import toast from "react-hot-toast";

const useLike = () => {
  const [loading, setLoading] = useState(false);

  const likeBlog = async (blogId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog liked");
      } else {
        throw new Error(data.error || "Failed to like the blog");
      }
    } catch (error) {
      toast.error(error.message || "Failed to like the blog");
    } finally {
      setLoading(false);
    }
  };

  return { likeBlog, loading };
};

export default useLike;
