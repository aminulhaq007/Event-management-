import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchEventDetails } from '../services/api.js';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadTargetDetails = async () => {
      try {
        const response = await fetchEventDetails(id);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event data details:', err);
        setError(true);
        setLoading(false);
      }
    };
    loadTargetDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-state-wrapper" style={{ minHeight: '60vh', padding: '100px 0' }}>
        <div className="loading-spinner"></div>
        <p>Constructing detailed context metrics profiles...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlignment: 'center' }}>
        <div className="empty-state-notice">
          <h2>Data Resolution Failure</h2>
          <p>The requested unique data record index parameters could not be found or processed correctly.</p>
          <Link to="/events" className="btn btn-primary" style={{ marginTop: '20px' }}>Return to Directory</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-view" style={{ background: 'var(--color-bg)', paddingBottom: '60px' }}>
      <div className="details-hero-banner" style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={event.image} 
          alt={event.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} 
        />
        <div className="details-hero-overlay-text" style={{ position: 'absolute', bottom: '40px', left: '5%', right: '5%', color: '#fff' }}>
          <span className="details-badge" style={{ background: 'var(--color-primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
            {event.venue}
          </span>
          <h1 style={{ fontSize: '2.5rem', margin: '15px 0 10px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{event.title}</h1>
          <p style={{ color: 'var(--color-accent)', fontSize: '1.1rem', fontWeight: '500' }}>{formatDate(event.date)}</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '900px', margin: '40px auto 0 auto', padding: '0 20px' }}>
        <div className="details-card-wrapper" style={{ background: '#fff', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
          <div className="details-meta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #E2E8F0' }}>
            <div>
              <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '5px' }}>Date and Schedule</h4>
              <p style={{ fontWeight: '500', color: '#475569' }}>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Onwards</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '5px' }}>Location / Venue</h4>
              <p style={{ fontWeight: '500', color: '#475569' }}>{event.venue}</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '5px' }}>Registration Status</h4>
              <p style={{ fontWeight: '600', color: '#16A34A' }}>Open to All Batches</p>
            </div>
          </div>

          <div className="details-description-block">
            <h3 style={{ marginBottom: '15px', color: 'var(--color-secondary)' }}>About the Event</h3>
            <p style={{ lineHeight: '1.7', color: '#475569', whiteSpace: 'pre-line' }}>{event.description}</p>
          </div>

          <div className="details-action-bar" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <Link to="/events" className="btn btn-secondary-outline" style={{ display: 'inline-flex', alignItems: 'center' }}>
              &larr; Back to Directory List
            </Link>
            <Link to={`/register/${event._id}`} className="btn btn-primary" style={{ padding: '12px 35px', fontSize: '1.05rem', fontWeight: '600' }}>
              Secure Ticket Registration &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;