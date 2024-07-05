import React, { useEffect, useState } from "react";
import useEvents from "../../hooks/useEvents";
import EventModal from "./EventModal";
import "./Event.css"; // Import your CSS file here
import { useAuthContext } from "../../context/AuthContext";
import RegisteredEvents from "./RegisteredEvent"; // Corrected the import

const Event = () => {
  const {
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    unregisterFromEvent,
    getEvents,
  } = useEvents();
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    description: "",
    date: "",
    venue: "",
    imageLink: "",
    registrationLink: "",
    isPaid: false,
    price: 0,
  });
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showRegisteredEvents, setShowRegisteredEvents] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { authUser } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        const sortedEvents = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sortedEvents || []);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };
    fetchEvents();
  }, [getEvents]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventDateTime = new Date(formData.date).toISOString();
      const eventData = {
        ...formData,
        date: eventDateTime,
      };

      if (formData._id) {
        if (
          authUser &&
          formData.createdBy &&
          authUser._id === formData.createdBy._id
        ) {
          await updateEvent(formData._id, eventData);
        } else {
          console.error("You are not authorized to update this event.");
          return;
        }
      } else {
        await createEvent(eventData);
      }

      setFormData({
        _id: "",
        title: "",
        description: "",
        date: "",
        venue: "",
        imageLink: "",
        registrationLink: "",
        isPaid: false,
        price: 0,
      });

      const updatedEvents = await getEvents();
      const sortedEvents = updatedEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sortedEvents || []);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting event:", error.message);
    }
  };

  const handleEdit = async (event) => {
    if (authUser && event.createdBy && authUser._id === event.createdBy._id) {
      setFormData({
        _id: event._id,
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().slice(0, -1),
        venue: event.venue,
        imageLink: event.imageLink,
        registrationLink: event.registrationLink,
        isPaid: event.isPaid,
        price: event.price,
      });
      setShowForm(true);
    } else {
      console.error("You are not authorized to edit this event.");
    }
  };

  const handleDelete = async (eventId) => {
    await deleteEvent(eventId);
    const updatedEvents = await getEvents();
    const sortedEvents = updatedEvents.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setEvents(sortedEvents || []);
  };

  const handleRegistration = async (eventId) => {
    try {
      const event = events.find((event) => event._id === eventId);

      if (!event) {
        console.error("Event not found.");
        return;
      }

      const isRegistered = event.registeredUsers.some(
        (user) => user.user._id === authUser._id
      );

      if (isRegistered) {
        await unregisterFromEvent(eventId);
      } else {
        await registerForEvent(eventId);
      }

      const updatedEvents = await getEvents();
      const sortedEvents = updatedEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sortedEvents || []);
    } catch (error) {
      console.error("Error registering for event:", error.message);
    }
  };

  const handleToggleEvents = () => {
    setShowRegisteredEvents((prev) => !prev);
  };

  const filteredEvents = showRegisteredEvents
    ? events.filter((event) =>
        event.registeredUsers.some((user) => user.user._id === authUser._id)
      )
    : events;

  const handleEventClick = (event) => {
    setExpandedEvent(event);
    setModalIsOpen(true);
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

  const now = new Date();

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) >= now
  );
  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.date) < now
  );

  return (
    <div className="event-container">
      <div className="event-actions">
        <button className="button-23" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide Form" : "Show Form"}
        </button>
        <button
          className={`button-23 ${showRegisteredEvents ? "active" : ""}`}
          onClick={handleToggleEvents}
        >
          {showRegisteredEvents ? "View All Events" : "View Registered Events"}
        </button>
      </div>
      {showForm && (
        <div className="Forms">
          <form onSubmit={handleSubmit}>
            <div className="heading ">
              {" "}
              <h2> Event Details</h2>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Event Title"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter Event Description"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter Event Venue"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="url"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleChange}
                placeholder="Enter Image Link"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="Enter Registration Link"
                required
              />
            </div>
            <div className="form-group">
              <label>
                Paid:
                <input
                  type="checkbox"
                  name="isPaid"
                  checked={formData.isPaid}
                  onChange={handleChange}
                />
              </label>
            </div>
            {formData.isPaid && (
              <div className="form-group">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Event Price"
                  required
                />
              </div>
            )}
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>{" "}
        </div>
      )}

      {showRegisteredEvents ? (
        <RegisteredEvents />
      ) : (
        <div className="Container">
          <div className="upcoming-events">
            <h2>Upcoming Events</h2>
          </div>
          <div className="events-section">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event._id} className="event-detail">
                  <div
                    className="event-info"
                    onClick={() => handleEventClick(event)}
                  >
                    <img
                      src={event.imageLink}
                      alt={event.title}
                      className="event-image"
                    />
                    <h3>
                      <b>Title : </b>
                      {event.title}
                    </h3>
                    <p>
                      <b>Date : </b> {formatDateTime(event.date)}
                    </p>
                    <p>
                      <b>Venue : </b>
                      {event.venue}
                      
                    </p>
                    <p>
                      
                      <b> Registered :</b> {event.registeredUsers.length}
                    </p>
                    <p>
                      <b>Paid : </b>
                      {event.isPaid ? `Price: $${event.price}` : "Free"}
                    </p>
                  </div>
                  <div className="event-actions">
                    {authUser && authUser._id === event.createdBy._id && (
                      <>
                        <button
                          className="button-23"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </button>
                        <button
                          className="button-23"
                          onClick={() => handleDelete(event._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {authUser && authUser._id !== event.createdBy._id && (
                      <button
                        className="button-23"
                        onClick={() => handleRegistration(event._id)}
                      >
                        {event.registeredUsers.some(
                          (user) => user.user === authUser._id
                        )
                          ? "Registered"
                          : "Register"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No upcoming events available.</p>
            )}
          </div>
        </div>
      )}
      {pastEvents.length > 0 && (
        <div className="Container">
          <div className="upcoming-events">
            <h2>Past Events</h2>
          </div>
          <div className="events-section">
            {pastEvents.map((event) => (
              <div key={event._id} className="event-detail">
                <div
                  className="event-info"
                  onClick={() => handleEventClick(event)}
                >
                  <img
                    src={event.imageLink}
                    alt={event.title}
                    className="event-image"
                  />
                  <h3>
                    <b>Title : </b>
                    {event.title}
                  </h3>
                  <p>
                    <b>Date : </b> {formatDateTime(event.date)}
                  </p>
                  <p>
                    <b>Venue : </b>
                    {event.venue}
                  </p>
                  <p>
                    <b>Paid : </b>
                    {event.isPaid ? `Price: $${event.price}` : "Free"}
                  </p>
                </div>
                <div className="event-actions">
                  <button className="button-23">Already Happened</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {expandedEvent && (
        <EventModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          event={expandedEvent}
        />
      )}
    </div>
  );
};

export default Event;
