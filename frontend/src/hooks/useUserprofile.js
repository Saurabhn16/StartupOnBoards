import { useState } from "react";
import toast from "react-hot-toast";

const useUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Function to fetch user profile
  const fetchUserProfile = async (userId) => {
    setLoading(true);
    
    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await res.json();
      setUserProfile(data); // Update local profile state with fetched data
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      toast.error("Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

 
  return { userProfile, loading, fetchUserProfile};
};

export default useUserProfile;
