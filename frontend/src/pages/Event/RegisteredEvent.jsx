import React, { useState, useEffect } from "react";
import useEvents from "../../hooks/useEvents";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import EventModal from "./EventModal";
import "./RegisteredEvents.css";

const RegisteredEvents = () => {
  const { loading, getEventsByUserId, getEventById } = useEvents();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { authUser } = useAuthContext();

  const fetchEventsByUserId = async () => {
    try {
      const eventIds = await getEventsByUserId(authUser._id);
      const eventDetailsPromises = eventIds.map(event =>
        getEventById(event.eventId)
      );
      const eventDetails = await Promise.all(eventDetailsPromises);
      setEvents(eventDetails || []);
    } catch (error) {
      console.error("Error fetching events by user:", error.message);
      toast.error("Failed to fetch events by user");
      setEvents([]);
    }
  };

  useEffect(() => {
    if (authUser && authUser._id) {
      fetchEventsByUserId();
    }
  }, [authUser]);

  const handleViewMore = (event) => {
    setSelectedEvent(event);
  };

  const handleViewLess = () => {
    setSelectedEvent(null);
  };

  const formatDateTime = (date) => {
    const eventDate = new Date(date);
    const time = eventDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateString = eventDate.toLocaleDateString();
    return `${time} - ${dateString}`;
  };

  return (
    <div className="registered-events-container">

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="Container">
          <div className="registered">
          <h2>Registered Events</h2>
          </div>
       
        <div className="events-section">
          {events.map((event) => (
            <div key={event._id} className="event-detail">
              <div className="event-info" onClick={() => handleViewMore(event)}>
                <img
                  src={event.imageLink}
                  alt={event.title}
                  className="event-image"
                />
                <h3>
                  <b>Title: </b>
                  {event.title}
                </h3>
                <p>
                  <b>Date: </b> {formatDateTime(event.date)}
                </p>
                <p>
                  <b>Venue: </b>
                  {event.venue}
                </p>
                <p>
                      
                      <b> Registered :</b> {event.registeredUsers.length}
                    </p>
                <p>
                  <b>Paid: </b>
                  {event.isPaid ? `Price: $${event.price}` : "Free"}
                </p>
               
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
     
      {selectedEvent && (
        <EventModal
          isOpen={!!selectedEvent}
          onRequestClose={handleViewLess}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default RegisteredEvents;
