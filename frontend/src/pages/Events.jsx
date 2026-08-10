import React, { useState, useEffect } from 'react';
import { fetchEvents } from '../services/api.js';
import EventCard from '../components/EventCard.jsx';
import '../styles/events.css';

const Events = () => {
  const [eventsList, setEventsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEventsData = async () => {
      try {
        const response = await fetchEvents();
        setEventsList(response.data);
        setFilteredEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('System data extraction logic exception triggered:', error);
        setLoading(false);
      }
    };
    getEventsData();
  }, []);

  useEffect(() => {
    const results = eventsList.filter(event =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchQuery, eventsList]);

  return (
    <div className="events-directory-view">
      <div className="directory-header-banner">
        <h1>Institutional Events Hub</h1>
        <p>Browse through the complete academic calendar and secure your attendance seats instantly.</p>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by event title, venue, or keyword descriptors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input-field"
          />
        </div>
      </div>

      <div className="directory-results-section">
        {loading ? (
          <div className="loading-state-wrapper">
            <div className="loading-spinner"></div>
            <p>Processing active directory queries...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="events-grid-layout">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state-notice">
            <h3>No Matching Events Discovered</h3>
            <p>Your lookup criteria did not match any files within the database schema registry. Try updating your keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;