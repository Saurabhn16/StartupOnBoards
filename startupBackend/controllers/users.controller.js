import User from "../models/user.model.js";

export const getSearch = async (req, res) => {
  try {
    let query = {};

    if (req.query.role && req.query.role !== "All") {
      query.role = req.query.role;
    }

    if (req.query.fullName) {
      query.fullName = { $regex: new RegExp(req.query.fullName, "i") };
    }

    const users = await User.find(query).select("-password");
   
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};