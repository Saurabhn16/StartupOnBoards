import { useState } from "react";
import toast from "react-hot-toast";

const useProfile = () => {

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState( null);

  // Function to fetch user profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      setProfile(data); // Update local profile state with fetched data

    } catch (error) {
      console.error("Error fetching profile:", error.message);
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  // Function to update user profile
  const updateProfile = async (updatedProfile) => {
    setLoading(true);
    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      const data = await res.json();
      console.log("updateProfile",updatedProfile);
      console.log("data",data);

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setProfile(data); // Update local profile state with updated data
      toast.success("Profile updated successfully!",);

      console.log("Updated profile", data);
  

 // Log the updated authUser state
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, fetchProfile, updateProfile };
};

export default useProfile;
