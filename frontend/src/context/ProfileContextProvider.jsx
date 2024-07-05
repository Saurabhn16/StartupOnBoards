import React, { createContext, useContext, useState } from "react";

export const ProfileContext = createContext();

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    bio: "",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
    github: ""
  });

  const updateProfile = (newProfileData) => {
    // Implement your logic to update the profile data
    setProfile(newProfileData);
    // Example: You might want to save this data to localStorage or make an API call
    localStorage.setItem("profileData", JSON.stringify(newProfileData));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
