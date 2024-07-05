import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const milestoneSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});

const previousInvestmentSchema = new mongoose.Schema({
  startUpName: String,
  amount: Number,
  date: Date,
});

const activityFeedSchema = new mongoose.Schema({
  type: String, // "comment", "post", "like", etc.
  content: String,
  date: { type: Date, default: Date.now },
});

const eventReferenceSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  role: {
    type: String,
    enum: ["creator", "participant"],
    required: true,
  },
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    likedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
    comments: [commentSchema],
    role: {
      type: String,
      enum: ["founder", "investor", "both"],
    },
    profile: {
      bio: String,
      avatar: String,
      location: String,
      website: String,
      socialLinks: {
        linkedin: String,
        twitter: String,
        github: String,
      },
    },
    founderDetails: {
      startUpName: String,
      startUpVision: String,
      pitchDeck: String,
      milestones: [milestoneSchema],
    },
    investorDetails: {
      investmentInterests: [String],
      previousInvestments: [previousInvestmentSchema],
      networkingInterests: [String],
    },
    activityFeed: [activityFeedSchema],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
    events: [eventReferenceSchema], // Update here
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
