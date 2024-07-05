import express from "express";
import {getUserProfile ,updateProfile, getProfile } from "../controllers/profile.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.put("/update", protectRoute, updateProfile); // Route to update profile
router.get("/", protectRoute, getProfile);    // Route to get profile details
router.get("/:id", protectRoute, getUserProfile); 
export default router;
