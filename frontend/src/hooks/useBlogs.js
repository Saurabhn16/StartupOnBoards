import { useState } from "react";
import toast from "react-hot-toast";

const useBlogs = () => {
  const [loading, setLoading] = useState(false);

  const blogs = async ({ title, imgLink, content, author }) => {
    const success = handleInputErrors({ title, imgLink, content, author });
    if (!success) return;
    console.log(success, title, content, imgLink,author);
    setLoading(true);
    try {
      const res = await fetch("/api/blogs/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, imgLink, content, author }),
      });

      const data = await res.json();
      console.log("data", data);
      if (res.ok) {
        toast.success("Blog is posted");
      } else {
        throw new Error(data.error || "Blog post failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to post blog");
    } finally {
      setLoading(false);
    }
  };

  return { blogs, loading };
};

function handleInputErrors({ title, content, author }) {
  if (!title || !content || !author) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (author.length < 3) {
    toast.error("Author name must be at least 3 characters");
    return false;
  }

  return true;
}

export default useBlogs;
