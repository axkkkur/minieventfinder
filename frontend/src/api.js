import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Events API calls
export const getEvents = (params = {}) => {
  return apiClient.get('/events', { params });
};

export const getEventById = (id) => {
  return apiClient.get(`/events/${id}`);
};

export const createEvent = (eventData) => {
  return apiClient.post('/events', eventData);
};

export const joinEvent = (eventId) => {
  return apiClient.put(`/events/${eventId}/join`);
};

export const getHealth = () => {
  return apiClient.get('/health');
};
