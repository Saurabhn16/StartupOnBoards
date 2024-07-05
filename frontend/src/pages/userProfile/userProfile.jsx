import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import useUserprofile from "../../hooks/useUserprofile";

const UserProfile = () => {
  const { id } = useParams();
  const { userProfile, loading, error, fetchUserProfile } = useUserprofile();

  const stableFetchUserProfile = useCallback(fetchUserProfile, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await stableFetchUserProfile(id);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
        toast.error("Failed to fetch user profile");
      }

    };

    fetchUser();
  }, [id, stableFetchUserProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center">
        <img
            className="h-24 w-24 rounded-full mr-4"
            src={userProfile?.profilePic }
            alt="Profile"
          />
          <div>
            <h2 className="text-xl font-semibold">{userProfile?.fullName || "No Name"}</h2>
            <p className="text-gray-500">{userProfile?.role || "No Role"}</p>
            <p className="text-sm text-gray-600 mt-2">
              {userProfile?.bio || "No bio available"}
            </p>
            <div className="flex mt-4">
              {userProfile?.profile?.socialLinks?.linkedin && (
                <a
                  href={userProfile.profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <FaLinkedin className="text-gray-700 hover:text-blue-500" />
                </a>
              )}
              {userProfile?.profile?.socialLinks?.twitter && (
                <a
                  href={userProfile.profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-2"
                >
                  <FaTwitter className="text-gray-700 hover:text-blue-500" />
                </a>
              )}
              {userProfile?.profile?.socialLinks?.github && (
                <a
                  href={userProfile.profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-gray-700 hover:text-blue-500" />
                </a>
              )}
            </div>
          </div>
        </div>
        {userProfile?.founderDetails && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Founder Details</h3>
            <div className="ml-2">
              <p className="mb-2">
                Startup Name: {userProfile?.founderDetails.startUpName}
              </p>
              <p className="mb-2">
                Startup Vision: {userProfile?.founderDetails.startUpVision}
              </p>
            </div>
          </div>
        )}
        {userProfile?.investorDetails && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Investor Details</h3>
            <p>
              Investment Interests:{" "}
              {userProfile?.investorDetails.investmentInterests.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
