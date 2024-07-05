import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import useProfile from "../../hooks/useProfile";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const ProfileUpdate = () => {
  const { profile, loading, fetchProfile, updateProfile } = useProfile();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    bio: "",
    role: "founder",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
    github: "",
    startUpName: "",
    startUpVision: "",
    pitchDeck: "",
    investmentInterests: "",
    previousInvestments: "",
    networkingInterests: "",
    milestones: [],
    previousInvestmentsDetails: [],
  });
  const [selectedRoles, setSelectedRoles] = useState([]);

  const [showFounderDetails, setShowFounderDetails] = useState(false);
  const [showInvestorDetails, setShowInvestorDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        gender: profile?.gender || "",
        bio: profile.profile?.bio || "",
        role: profile?.role || "founder",
        location: profile.profile?.location || "",
        website: profile.profile?.website || "",
        linkedin: profile.profile?.socialLinks?.linkedin || "",
        twitter: profile.profile?.socialLinks?.twitter || "",
        github: profile.profile?.socialLinks?.github || "",
        startUpName: profile.founderDetails?.startUpName || "",
        startUpVision: profile.founderDetails?.startUpVision || "",
        pitchDeck: profile.founderDetails?.pitchDeck || "",
        investmentInterests:
          profile.investorDetails?.investmentInterests?.join(", ") || "",
        previousInvestments:
          profile.investorDetails?.previousInvestments?.join(", ") || "",
        networkingInterests:
          profile.investorDetails?.networkingInterests?.join(", ") || "",
        milestones: profile.founderDetails?.milestones || [],
        previousInvestmentsDetails:
          profile.investorDetails?.previousInvestments || [],
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("target",name,value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  
  const handleMilestoneChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedMilestones = [...prevData.milestones];
      updatedMilestones[index] = {
        ...updatedMilestones[index],
        [name]: value,
      };
      return { ...prevData, milestones: updatedMilestones };
    });
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    console.log("target",name,value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePreviousInvestmentChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedPreviousInvestments = [
        ...prevData.previousInvestmentsDetails,
      ];
      updatedPreviousInvestments[index] = {
        ...updatedPreviousInvestments[index],
        [name]: value,
      };
      return {
        ...prevData,
        previousInvestmentsDetails: updatedPreviousInvestments,
      };
    });
  };

  const handleAddMilestone = () => {
    setFormData((prevData) => ({
      ...prevData,
      milestones: [
        ...prevData.milestones,
        { title: "", description: "", date: "" },
      ],
    }));
  };

  const handleAddPreviousInvestment = () => {
    setFormData((prevData) => ({
      ...prevData,
      previousInvestmentsDetails: [
        ...prevData.previousInvestmentsDetails,
        { startUpName: "", amount: "", date: "" },
      ],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData",formData);
      await updateProfile(formData);
      toast.success("Profile updated successfully!");
      fetchProfile(); // Fetch updated profile data after successful update
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile");
    }
  };

  if (!profile) {
    return <p>Loading...</p>; // Handle loading state until profile is available
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="flex items-center px-4 py-5 sm:px-6">
        <img
            className="h-24 w-24 rounded-full mr-4"
            src={profile.profilePic}
            alt="Profile"
          />
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {profile.fullName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
            {profile.profile?.bio || "No bio available"}
            </p>
           
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.fullName || "N/A"}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile?.gender || "N/A"}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Bio</dt>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {profile.profile?.bio || "No bio available"}
            </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile?.role || "N/A"}
              </dd>
            </div>{" "}
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Location</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.profile?.location || "N/A"}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Website</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.profile?.website || "N/A"}
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a
                  href={profile.profile?.socialLinks?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="inline mr-2" />{" "}
                  {profile.profile?.socialLinks?.linkedin || "N/A"}
                </a>
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Twitter</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a
                  href={profile.profile?.socialLinks?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="inline mr-2" />{" "}
                  {profile.profile?.socialLinks?.twitter || "N/A"}
                </a>
              </dd>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">GitHub</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <a
                  href={profile.profile?.socialLinks?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="inline mr-2" />{" "}
                  {profile.profile?.socialLinks?.github || "N/A"}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="flex items-center px-4 py-5 sm:px-6">
          {/* <img
            className="h-24 w-24 rounded-full mr-4"
            src={profile.profile.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
          /> */}
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {profile.startUpNamee}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {profile.profile?.bio || "No bio available"}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Startup Name
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.founderDetails.startUpName || "N/A"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Startup Vision
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.founderDetails.startUpVision || "N/A"}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Pitch Deck</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.founderDetails.pitchDeck || "N/A"}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Milestones</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.founderDetails.milestones
                  .slice(0, 2)
                  .map((milestone, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-gray-700">{milestone.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(milestone.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                {profile.founderDetails.milestones.length > 2 && (
                  <button
                    onClick={() => setShowFounderDetails(!showFounderDetails)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    {showFounderDetails
                      ? "Show Less Milestones"
                      : "Show More Milestones"}
                  </button>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Investor Details */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
        <div className="mb-4">
          <button
            onClick={() => setShowInvestorDetails(!showInvestorDetails)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            {showInvestorDetails
              ? "Hide Investor Details"
              : "Show Investor Details"}
          </button>
        </div>
        {showInvestorDetails && (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-2 bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Investment Interests
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.investorDetails.investmentInterests.map(
                  (interest, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {interest}
                    </span>
                  )
                )}
              </dd>
            </div>
            <div className="col-span-2 bg-white px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Previous Investments
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.investorDetails.previousInvestments
                  .slice(0, 2)
                  .map((investment, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">{investment.startUpName}</p>
                      <p className="text-gray-700">{investment.amount}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(investment.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                {profile.investorDetails.previousInvestments.length > 2 && (
                  <button
                    onClick={() => setShowInvestorDetails(!showInvestorDetails)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    {showInvestorDetails
                      ? "Show Less Investments"
                      : "Show More Investments"}
                  </button>
                )}
              </dd>
            </div>
            <div className="col-span-2 bg-gray-50 px-4 py-5 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Networking Interests
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {profile.investorDetails.networkingInterests.map(
                  (interest, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {interest}
                    </span>
                  )
                )}
              </dd>
            </div>
          </dl>
        )}
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="btn btn-primary mb-4"
      >
        {showForm ? "Hide Update Form" : "Update Profile"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Info */}
          < div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Basic Info
            </h3>
            < div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div> <div className="flex items-center">
                        <label htmlFor="role" className="mr-2">Select Role:</label>
                        <select
                          id="role"
                          name="role"
                          value={formData.roles}
                          onChange={handleChanges}
                          className="p-2 border rounded-md"
                        >
                          <option value="">Select Role</option>
                          <option value="founder">Founder</option>
                          <option value="investor">Investor</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
              
            
              <div className="col-span-2">
                <label
                  htmlFor="bio"
                  className="block font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="textarea"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="website"
                  className="block font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block font-medium text-gray-700"
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="twitter"
                  className="block font-medium text-gray-700"
                >
                  Twitter
                </label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="input"
                />
              </div>
              <div>
                <label
                  htmlFor="github"
                  className="block font-medium text-gray-700"
                >
                  GitHub
                </label>
                <input
                  type="text"
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>
        

          {/* Founder Details */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowFounderDetails(!showFounderDetails)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                {showFounderDetails
                  ? "Hide Founder Details"
                  : "Show Founder Details"}
              </button>
            </div>
            {showFounderDetails && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Founder Details
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="startUpName"
                      className="block font-medium text-gray-700"
                    >
                      Startup Name
                    </label>
                    <input
                      type="text"
                      id="startUpName"
                      name="startUpName"
                      value={formData.startUpName}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="startUpVision"
                      className="block font-medium text-gray-700"
                    >
                      Startup Vision
                    </label>
                    <textarea
                      id="startUpVision"
                      name="startUpVision"
                      value={formData.startUpVision}
                      onChange={handleChange}
                      className="textarea"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="pitchDeck"
                      className="block font-medium text-gray-700"
                    >
                      Pitch Deck
                    </label>
                    <input
                      type="text"
                      id="pitchDeck"
                      name="pitchDeck"
                      value={formData.pitchDeck}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  {formData.milestones.map((milestone, index) => (
                    <div key={index} className="col-span-2">
                      <label className="block font-medium text-gray-700">
                        Milestone {index + 1}
                      </label>
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <input
                          type="text"
                          name="title"
                          value={milestone.title}
                          onChange={(e) => handleMilestoneChange(index, e)}
                          placeholder="Title"
                          className="input"
                        />
                        <input
                          type="text"
                          name="description"
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(index, e)}
                          placeholder="Description"
                          className="input"
                        />
                        <input
                          type="date"
                          name="date"
                          value={milestone.date}
                          onChange={(e) => handleMilestoneChange(index, e)}
                          className="input"
                        />
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="btn btn-secondary"
                    >
                      Add Milestone
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Investor Details */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 mb-6">
            <div className="mb-4">
              <button
                type="button"
                onClick={() => setShowInvestorDetails(!showInvestorDetails)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                {showInvestorDetails
                  ? "Hide Investor Details"
                  : "Show Investor Details"}
              </button>
            </div>
            {showInvestorDetails && (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Investor Details
                </h3>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="investmentInterests"
                      className="block font-medium text-gray-700"
                    >
                      Investment Interests (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="investmentInterests"
                      name="investmentInterests"
                      value={formData.investmentInterests}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  {/* <div className="col-span-2">
                    <label
                      htmlFor="previousInvestments"
                      className="block font-medium text-gray-700"
                    >
                      Previous Investments (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="previousInvestments"
                      name="previousInvestments"
                      value={formData.previousInvestments}
                      onChange={handleChange}
                      className="input"
                    />
                  </div> */}
                  <div className="col-span-2">
                    <label
                      htmlFor="networkingInterests"
                      className="block font-medium text-gray-700"
                    >
                      Networking Interests (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="networkingInterests"
                      name="networkingInterests"
                      value={formData.networkingInterests}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  {formData.previousInvestmentsDetails.map(
                    (investment, index) => (
                      <div key={index} className="col-span-2">
                        <label className="block font-medium text-gray-700">
                          Previous Investment {index + 1}
                        </label>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                          <input
                            type="text"
                            name="startUpName"
                            value={investment.startUpName}
                            onChange={(e) =>
                              handlePreviousInvestmentChange(index, e)
                            }
                            placeholder="Startup Name"
                            className="input"
                          />
                          <input
                            type="number"
                            name="amount"
                            value={investment.amount}
                            onChange={(e) =>
                              handlePreviousInvestmentChange(index, e)
                            }
                            placeholder="Amount"
                            className="input"
                          />
                          <input
                            type="date"
                            name="date"
                            value={investment.date}
                            onChange={(e) =>
                              handlePreviousInvestmentChange(index, e)
                            }
                            className="input"
                          />
                        </div>
                      </div>
                    )
                  )}
                  <div className="col-span-2">
                    <button
                      type="button"
                      onClick={handleAddPreviousInvestment}
                      className="btn btn-secondary"
                    >
                      Add Previous Investment
                    </button>
                  </div>
                  </div> 
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileUpdate;
