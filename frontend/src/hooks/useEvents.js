import { useState } from "react";
import toast from "react-hot-toast";

const useEvents = () => {
  const [loading, setLoading] = useState(false);

  const createEvent = async ({
    title,
    description,
    date,
    venue,
    imageLink,
    registrationLink,
    isPaid,
    price,
  }) => {
    const success = handleInputErrors({ title, description, date, venue });
    if (!success) return;
    console.log(
      title,
      description,
      date,
      venue,
      imageLink,
      registrationLink,
      isPaid,
      price
    );
    setLoading(true);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date,
          venue,
          imageLink,
          registrationLink,
          isPaid,
          price,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Event created successfully");
      } else {
        throw new Error(data.message || "Failed to create event");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async ({
    id,
    title,
    description,
    date,
    venue,
    imageLink,
    registrationLink,
    isPaid,
    price,
  }) => {
    const success = handleInputErrors({ title, description, date, venue });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          date,
          venue,
          imageLink,
          registrationLink,
          isPaid,
          price,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Event updated successfully");
      } else {
        throw new Error(data.message || "Failed to update event");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (eventId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Event deleted successfully");
      } else {
        throw new Error(data.message || "Failed to delete event");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registered for the event");
      } else {
        throw new Error(data.message || "Failed to register for the event");
      }
    } catch (error) {
      toast.error(error.message || "Failed to register for the event");
    }
  };

  const getEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to fetch events");
    }
  };

  const getEventById = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch event details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to fetch event details");
    }
  };

  const getEventsByUserId = async (userId) => {
    console.log(userId);
    try {
      
      const response = await fetch(`/api/events/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events by user");
      }
      const data = await response.json();
      
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to fetch events by user");
    }
  };

  const handleInputErrors = ({ title, description, date, venue }) => {
    if (!title || !description || !date || !venue) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };
 

  return {
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getEvents,getEventsByUserId,
    getEventById,
    loading,
  };
};

export default useEvents;
