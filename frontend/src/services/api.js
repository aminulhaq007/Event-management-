import axios from 'axios';

const api = axios.create({
  // Point this directly to the base backend port
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add the '/api' prefix directly to the endpoint requests:
export const fetchEvents = () => api.get('/api/events');
export const fetchEventDetails = (id) => api.get(`/api/events/${id}`);
export const createEvent = (eventData) => api.post('/api/events', eventData);
export const updateEvent = (id, eventData) => api.put(`/api/events/${id}`, eventData);
export const deleteEvent = (id) => api.delete(`/api/events/${id}`);

export const fetchRegistrations = () => api.get('/api/registrations');
export const createRegistration = (regData) => api.post('/api/registrations', regData);
export const registerForEvent = (regData) => api.post('/api/registrations', regData);
export const cancelRegistration = (id) => api.delete(`/api/registrations/${id}`);

export default api;