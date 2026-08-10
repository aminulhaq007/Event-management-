import React, { useState, useEffect } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent, fetchRegistrations } from '../services/api.js';
import '../styles/dashboard.css';

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [loading, setLoading] = useState(true);

  const [formMode, setFormMode] = useState('create'); 
  const [targetId, setTargetId] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
    image: ''
  });

  const [alert, setAlert] = useState({ type: '', text: '' });

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const eventsRes = await fetchEvents();
      const regsRes = await fetchRegistrations();
      setEvents(eventsRes.data);
      setRegistrations(regsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data streams:', error);
      triggerAlert('error', 'Failed to refresh admin operational data storage elements.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const triggerAlert = (type, text) => {
    setAlert({ type, text });
    setTimeout(() => setAlert({ type: '', text: '' }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearForm = () => {
    setEventFormData({ title: '', description: '', date: '', venue: '', image: '' });
    setFormMode('create');
    setTargetId(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === 'create') {
        await createEvent(eventFormData);
        triggerAlert('success', 'New institutional event created successfully.');
      } else {
        await updateEvent(targetId, eventFormData);
        triggerAlert('success', 'Target event changes saved successfully.');
      }
      clearForm();
      loadDashboardData();
    } catch (error) {
      console.error('Form execution processing runtime failure:', error);
      triggerAlert('error', 'Error executing operational processing requirements on database target collections.');
    }
  };

  const handleEditClick = (event) => {
    setFormMode('edit');
    setTargetId(event._id);
    const formattedDate = event.date ? new Date(event.date).toISOString().split('T')[0] : '';
    setEventFormData({
      title: event.title,
      description: event.description,
      date: formattedDate,
      venue: event.venue,
      image: event.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you certain you want to permanently delete this event record?')) {
      try {
        await deleteEvent(id);
        triggerAlert('success', 'Event identity entry unlinked and purged.');
        loadDashboardData();
      } catch (error) {
        console.error('Delete flow failure:', error);
        triggerAlert('error', 'Purge workflow blocked by systemic transactional failures.');
      }
    }
  };

  return (
    <div className="admin-dashboard-view">
      <div className="dashboard-top-hero">
        <h1>Administrative Management Console</h1>
        <p>Manage campus event listings, view analytical aggregates, and audit student registrations.</p>
      </div>

      <div className="metrics-summary-row">
        <div className="metric-card">
          <div className="metric-value">{events.length}</div>
          <div className="metric-label">Total Active Events</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">{registrations.length}</div>
          <div className="metric-label">Total Registrations</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">4</div>
          <div className="metric-label">Systems Team Members</div>
        </div>
      </div>

      {alert.text && (
        <div className={`dashboard-alert-banner ${alert.type}`}>
          {alert.text}
        </div>
      )}

      <div className="dashboard-workspace-grid">
        <div className="dashboard-form-panel">
          <div className="panel-header">
            <h3>{formMode === 'create' ? 'Create New Event Listing' : 'Modify Existing Event Details'}</h3>
          </div>
          <form onSubmit={handleFormSubmit} className="admin-editor-form">
            <div className="form-group">
              <label>Event Title *</label>
              <input type="text" name="title" required value={eventFormData.title} onChange={handleInputChange} placeholder="e.g., National Tech Hackathon 2026" />
            </div>
            <div className="form-group">
              <label>Venue Location *</label>
              <input type="text" name="venue" required value={eventFormData.venue} onChange={handleInputChange} placeholder="e.g., Main Auditorium Hall Complex" />
            </div>
            <div className="form-group">
              <label>Calendar Date *</label>
              <input type="date" name="date" required value={eventFormData.date} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Cover Image URL</label>
              <input type="url" name="image" value={eventFormData.image} onChange={handleInputChange} placeholder="https://example.com/banner-image.jpg" />
            </div>
            <div className="form-group">
              <label>Event Description Context *</label>
              <textarea name="description" rows="5" required value={eventFormData.description} onChange={handleInputChange} placeholder="Provide extensive contextual tracking breakdown criteria of the event schedule here..."></textarea>
            </div>
            <div className="form-actions-row">
              {formMode === 'edit' && (
                <button type="button" onClick={clearForm} className="btn btn-secondary-outline">Discard Changes</button>
              )}
              <button type="submit" className="btn btn-primary">
                {formMode === 'create' ? 'Publish Event Entry' : 'Save Modifications'}
              </button>
            </div>
          </form>
        </div>

        <div className="dashboard-data-panel">
          <div className="data-panel-tabs">
            <button className={`tab-link ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>System Events Catalog</button>
            <button className={`tab-link ${activeTab === 'registrations' ? 'active' : ''}`} onClick={() => setActiveTab('registrations')}>Active Seat Registrations</button>
          </div>

          {loading ? (
            <div className="panel-loader">
              <div className="loading-spinner"></div>
              <p>Refreshing administrative data indexes...</p>
            </div>
          ) : activeTab === 'events' ? (
            <div className="table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Event Context</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length > 0 ? (
                    events.map(ev => (
                      <tr key={ev._id}>
                        <td><strong>{ev.title}</strong></td>
                        <td>{new Date(ev.date).toLocaleDateString()}</td>
                        <td>{ev.venue}</td>
                        <td>
                          <div className="table-actions">
                            <button onClick={() => handleEditClick(ev)} className="table-btn edit-btn">Edit</button>
                            <button onClick={() => handleDeleteClick(ev._id)} className="table-btn delete-btn">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No events published yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Contact Email</th>
                    <th>Dept / Sem</th>
                    <th>Target Event</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length > 0 ? (
                    registrations.map(reg => (
                      <tr key={reg._id}>
                        <td><strong>{reg.studentName}</strong></td>
                        <td>{reg.email}</td>
                        <td>{reg.department} (S-{reg.semester})</td>
                        <td>{reg.eventId?.title || <span style={{ color: '#EF4444', fontStyle: 'italic' }}>Event Unlinked</span>}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No active registrations located in data pool.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;