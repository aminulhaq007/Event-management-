import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-card">
      <div className="card-image-wrapper">
        <img src={event.image} alt={event.title} className="card-image" />
        <div className="card-badge">{event.venue}</div>
      </div>
      <div className="card-body">
        <span className="card-date">{formatDate(event.date)}</span>
        <h3 className="card-title">{event.title}</h3>
        <p className="card-excerpt">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...` 
            : event.description}
        </p>
        <div className="card-footer-actions">
          <Link to={`/events/${event._id}`} className="btn btn-secondary-outline">Details</Link>
          <Link to={`/register/${event._id}`} className="btn btn-primary">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;