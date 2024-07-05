import { raw } from "express";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId)
      .populate('founderDetails')
      .populate('investorDetails');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = {
      _id: user._id,
      fullName: user.fullName,
      role: user.role,
      profile: user.profile,
      profilePic: user.profilePic,
      founderDetails: user.founderDetails,
      investorDetails: user.investorDetails,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Failed to fetch user profile' });
  }
};
// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile, founderDetails, investorDetails, milestones, previousInvestments, role
// Update user profile, founderDetails, investorDetails, milestones, previousInvestments, role
export const updateProfile = async (req, res) => {
  const {
    fullName,
    gender,
    bio,
    location,
    website,
    linkedin,
    twitter,
    github,
    startUpName,
    startUpVision,
    pitchDeck,
    role,
    investmentInterests,
    previousInvestments,
    networkingInterests,
    milestones,
    previousInvestmentsDetails,
  } = req.body;

  console.log(req.body); // Log the incoming request body

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update basic user info
    if (fullName) user.fullName = fullName;
    if (gender) user.gender = gender;
    if (bio) user.profile.bio = bio;
    if (role) user.role = role;
    if (location) user.profile.location = location;
    if (website) user.profile.website = website;
    if (linkedin) user.profile.socialLinks.linkedin = linkedin;
    if (twitter) user.profile.socialLinks.twitter = twitter;
    if (github) user.profile.socialLinks.github = github;

    // Update founder details
    if (startUpName) user.founderDetails.startUpName = startUpName;
    if (startUpVision) user.founderDetails.startUpVision = startUpVision;
    if (pitchDeck) user.founderDetails.pitchDeck = pitchDeck;

    if (milestones && Array.isArray(milestones)) {
      user.founderDetails.milestones = milestones;
    }

    // Update investor details
    if (investmentInterests) {
      user.investorDetails.investmentInterests = Array.isArray(investmentInterests)
        ? investmentInterests
        : investmentInterests.split(',').map(interest => interest.trim());
    }

    if (previousInvestments) {
      user.investorDetails.previousInvestments = Array.isArray(previousInvestments)
        ? previousInvestments
        : previousInvestments.split(',').map(investment => investment.trim());
    }

    if (networkingInterests) {
      user.investorDetails.networkingInterests = Array.isArray(networkingInterests)
        ? networkingInterests
        : networkingInterests.split(',').map(interest => interest.trim());
    }

    if (previousInvestmentsDetails && Array.isArray(previousInvestmentsDetails)) {
      // Assuming `user` is already defined or retrieved
      user.investorDetails.previousInvestments = previousInvestmentsDetails.map(item => ({
        startUpName: item.startUpName,
        amount: item.amount,
        date: item.date
      }));
    } else {
      // If `previousInvestmentsDetails` is not an array or empty, set it to an empty array
      user.investorDetails.previousInvestments = [];
    }
    

    console.log(user); // Log the updated user object
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
