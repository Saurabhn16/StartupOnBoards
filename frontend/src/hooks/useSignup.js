import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
    if (!success) return;
              console.log(success);
			  console.log(fullName,gender);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

      console.log("Response status:", res.status); // Check response status

      const data = await res.json();
      console.log("Response data:", data); // Log response data

      if (res.ok) {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
        toast.success("Signup successful");
      } else {
        throw new Error(data.error || "Signup failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to signup");
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

export default useSignup;
