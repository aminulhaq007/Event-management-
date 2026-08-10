import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchEventDetails, registerForEvent } from '../services/api.js';
import '../styles/register.css';

const Register = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    department: '',
    semester: '1'
  });

  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const getContextData = async () => {
      try {
        const response = await fetchEventDetails(eventId);
        setEventData(response.data);
        setLoadingEvent(false);
      } catch (error) {
        console.error('Failure mapping structural target components tracking identifiers:', error);
        setStatusMessage({ type: 'error', text: 'Unable to locate structural operational target dataset specifications' });
        setLoadingEvent(false);
      }
    };
    getContextData();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setStatusMessage({ type: '', text: '' });

    const payload = { ...formData, eventId };

    try {
      await registerForEvent(payload);
      setStatusMessage({ type: 'success', text: 'Registration confirmed. Redirecting to student profile records...' });
      setSubmitLoading(false);
      setTimeout(() => {
        navigate('/my-registrations');
      }, 2500);
    } catch (error) {
      setSubmitLoading(false);
      const msg = error.response?.data?.message || 'Transaction handling structural processing network error.';
      setStatusMessage({ type: 'error', text: msg });
    }
  };

  if (loadingEvent) {
    return (
      <div className="loading-state-wrapper" style={{ padding: '80px 0' }}>
        <div className="loading-spinner"></div>
        <p>Form processing infrastructure initializing...</p>
      </div>
    );
  }

  return (
    <div className="registration-view-container">
      <div className="registration-card-box">
        <div className="registration-header-meta">
          <h2>Event Attendance Registration</h2>
          {eventData && (
            <div className="target-event-summary-badge">
              <p>Registering for: <strong>{eventData.title}</strong></p>
              <p className="sub-meta-text">Location Focus: {eventData.venue}</p>
            </div>
          )}
        </div>

        {statusMessage.text && (
          <div className={`form-status-alert-box ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        {!eventData ? (
          <div className="error-fallback-link">
            <Link to="/events" className="btn btn-secondary">Return to Main List</Link>
          </div>
        ) : (
          <form className="student-registration-form" onSubmit={handleFormSubmission}>
            <div className="form-input-group">
              <label htmlFor="studentName">Full Name</label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                required
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="email">University Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="username@student.university.edu"
              />
            </div>

            <div className="form-row-grid">
              <div className="form-input-group">
                <label htmlFor="department">Academic Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="semester">Current Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                >
                  {['1', '2', '3', '4', '5', '6', '7', '8'].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-action-buttons-wrapper">
              <Link to={`/events/${eventId}`} className="btn btn-secondary-outline">Cancel</Link>
              <button 
                type="submit" 
                className="btn btn-primary btn-submit" 
                disabled={submitLoading}
              >
                {submitLoading ? 'Transmitting Data Registry...' : 'Confirm Seat Registration'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;