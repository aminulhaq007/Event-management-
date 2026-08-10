import React, { useState, useEffect } from 'react';
import { fetchRegistrations, cancelRegistration } from '../services/api.js';
import { Link } from 'react-router-dom';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const loadStudentRegistrations = async () => {
    try {
      const response = await fetchRegistrations();
      setRegistrations(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed reading records infrastructure data arrays:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentRegistrations();
  }, []);

  const handleCancellation = async (id) => {
    if (window.confirm('Are you sure you want to cancel this event registration?')) {
      try {
        await cancelRegistration(id);
        setActionMessage('Registration successfully cancelled.');
        loadStudentRegistrations();
        setTimeout(() => setActionMessage(''), 3000);
      } catch (error) {
        console.error('Cancellation pipeline failure:', error);
        alert('Could not process registration removal. Try again.');
      }
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '70vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: 'var(--color-secondary)', fontSize: '2rem' }}>My Registered Events</h1>
        <p style={{ color: '#64748B' }}>View and manage your active event registrations across campus.</p>
      </div>

      {actionMessage && (
        <div style={{ background: '#DCFCE7', color: '#15803D', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontWeight: '500' }}>
          {actionMessage}
        </div>
      )}

      {loading ? (
        <div className="loading-state-wrapper" style={{ padding: '40px 0' }}>
          <div className="loading-spinner"></div>
          <p>Loading your registration records...</p>
        </div>
      ) : registrations.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {registrations.map((reg) => (
            <div key={reg._id} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', background: '#EFF6FF', color: 'var(--color-primary)', padding: '4px 10px', borderRadius: '12px', fontWeight: '600', display: 'inline-block', marginBottom: '12px' }}>
                  {reg.eventId?.venue || 'Campus Venue'}
                </span>
                <h3 style={{ color: 'var(--color-secondary)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  {reg.eventId?.title || 'Unknown Event'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', marginBottom: '16px' }}>
                  Date: {reg.eventId?.date ? new Date(reg.eventId.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBD'}
                </p>
                <div style={{ background: 'var(--color-bg)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <p style={{ margin: '2px 0' }}><strong>Registrant:</strong> {reg.studentName}</p>
                  <p style={{ margin: '2px 0' }}><strong>Dept:</strong> {reg.department} (Sem {reg.semester})</p>
                </div>
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                {reg.eventId && (
                  <Link to={`/events/${reg.eventId._id}`} className="btn btn-secondary-outline" style={{ flex: 1, textAlign: 'center', fontSize: '0.85rem', padding: '8px' }}>
                    View Event
                  </Link>
                )}
                <button onClick={() => handleCancellation(reg._id)} className="btn" style={{ flex: 1, background: '#FEE2E2', color: '#991B1B', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500', fontSize: '0.85rem' }}>
                  Cancel Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state-notice" style={{ textAlign: 'center', padding: '6px 20px', background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h3>No Active Registrations</h3>
          <p style={{ color: '#64748B', margin: '10px 0 20px 0' }}>You haven't registered for any events yet. Check out the current listings to sign up.</p>
          <Link to="/events" className="btn btn-primary">Browse Events Catalog</Link>
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;