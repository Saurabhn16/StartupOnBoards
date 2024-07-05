// events.routes.js

import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  createEvent,
  updateEvent,
  registerUserForEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  getEventsByUserId, // Import the new controller function
} from "../controllers/events.controller.js";

const router = express.Router();

router.post("/", protectRoute, createEvent);
router.put("/:id", protectRoute, updateEvent);
router.post("/:id/register", protectRoute, registerUserForEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.get("/user/:id", getEventsByUserId);

router.delete("/:id", protectRoute, deleteEvent);

// New route to get events by user ID

export default router;
