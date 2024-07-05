import Event from "../models/event.model.js";
import User from "../models/user.model.js";
import { updateProfile } from "./profile.controller.js";

// Create an event
export const createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    venue,
    imageLink,
    registrationLink,
    isPaid,
    price,
  } = req.body;
  const createdBy = req.user._id; // Assuming user ID is stored in req.user
  console.log(title);
  try {
    const event = new Event({
      title,
      description,
      date,
      venue,
      imageLink,
      registrationLink,
      isPaid,
      price,
      createdBy,
    });

    await event.save();

    // Update user's created events
    await User.findByIdAndUpdate(createdBy, {
      $push: { events: { eventId: event._id, role: "creator" } },
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    date,
    venue,
    imageLink,
    registrationLink,
    isPaid,
    price,
  } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is authorized to update the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.venue = venue;
    event.imageLink = imageLink;
    event.registrationLink = registrationLink;
    event.isPaid = isPaid;
    event.price = price;

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Register user for an event
export const registerUserForEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id; // Assuming user ID is stored in req.user

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is already registered for the event
    const alreadyRegistered = event.registeredUsers.some(
      (user) => user.user.toString() === userId.toString()
    );
    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "User is already registered for this event" });
    }

    // Register user as a participant
    event.registeredUsers.push({ user: userId, role: "participant" });
    await event.save();

    // Update user's registered events
    await User.findByIdAndUpdate(userId, {
      $push: { events: { eventId: event._id, role: "participant" } },
    });

    res.json({ message: "User registered successfully for the event", event });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "username"); // Populate createdBy field with username

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id)
      .populate("createdBy", "username")
      .populate("registeredUsers.user", "username");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if user is authorized to delete the event
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await event.remove();

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getEventsByUserId = async (req, res) => {
  const { id: userId } = req.params; // Extract userId from req.params
  console.log(userId); // Log userId to verify

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const eventIds = user.events; // Assuming events array in user model stores event IDs
console.log(eventIds);
 
    res.json(eventIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
