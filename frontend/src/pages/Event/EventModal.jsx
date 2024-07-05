import React from "react";
import Modal from "react-modal";
import "./EventModal.css"; // Import CSS for EventModal

const EventModal = ({ isOpen, onRequestClose, event }) => {
  if (!event) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Event Details Modal"
      className="event-modal"
      overlayClassName="event-modal-overlay"
    >
      <div className="modal-header">
        <h2>Event Details</h2>
        <button className="modal-close-btn" onClick={onRequestClose}>
          Close
        </button>
      </div>

      <div className="modal-body">
        <div className="event-section">
            <img src={event.imageLink} alt={event.title} className="event-image" />
        
          <div className="header">
            <p>Date: {formatDate(event.date)}</p>
            <p> {event.venue}</p>
          </div>
        </div>
        <div className="event-section">
          <div className="event-info">
            <h3>Event Info</h3>
            <p>
              <b>Title:</b> {event.title}
            </p>
            <p>
              <b>Description:</b> {event.description}
            </p>
          </div>
        </div>
        <div className="event-section">
          <div className="event-description">
            <h3>
              <b>Event Description</b>
            </h3>
            <p>{event.description}</p>
            {/* Add more fields if needed */}
          </div>
        </div>
        <div className="event-section">
          <div className="who-should-attend">
            <h3><b>Who Should Attend</b></h3>
            <p>
              Founders, Innovation leaders, CTOs, Technology evangelists,
              Business leaders, data aggregators, and digital-first businesses
            </p>
          </div>
        </div>{" "}
        <div className="event-section">
          <div className="register">
            <h3>
            <b>Register :</b> {event.registeredUsers.length}
            </h3>
            <p>
              <a href={event} target="_blank" rel="noopener noreferrer">
                Registration Link
              </a>
            </p>
          </div>
          <p>
            {" "}
            <b>Paid:</b> {event.isPaid ? `Price: $${event.price}` : "Free"}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
