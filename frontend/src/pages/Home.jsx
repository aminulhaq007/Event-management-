import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../services/api.js';
import EventCard from '../components/EventCard.jsx';
import '../styles/home.css';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents();
        setFeaturedEvents(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching system catalog entries:', error);
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  return (
    <div className="home-view">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Connect, Experience, and Elevate Your Campus Life</h1>
          <p>Discover educational seminars, technical hackathons, cultural festivals, and athletic tournaments happening across campus.</p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary btn-large">Explore All Events</Link>
            <Link to="/admin" className="btn btn-secondary btn-large">Manage Institutional Activities</Link>
          </div>
        </div>
      </section>

      <section className="welcome-banner-section">
        <div className="welcome-container">
          <h2>Simplifying Campus Management</h2>
          <p>The centralized hub where students easily register for academic workshops and socio-cultural events, while department administrators manage schedules without overhead.</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Upcoming Featured Events</h2>
          <div className="accent-line"></div>
        </div>

        {loading ? (
          <div className="loading-state-wrapper">
            <div className="loading-spinner"></div>
            <p>Querying real-time transactional registry, please wait...</p>
          </div>
        ) : featuredEvents.length > 0 ? (
          <div className="events-grid-layout">
            {featuredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state-notice">
            <p>No upcoming events listed at this time. Check back later!</p>
            <Link to="/admin" className="btn btn-primary">Create First Event Listing</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;