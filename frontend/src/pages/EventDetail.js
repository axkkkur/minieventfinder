import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, joinEvent } from '../api';
import '../styles/EventDetail.css';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await getEventById(id);
      setEvent(response.data);
    } catch (err) {
      setError('Failed to fetch event details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = async () => {
    try {
      const response = await joinEvent(id);
      setEvent(response.data);
      setJoined(true);
      setTimeout(() => setJoined(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join event.');
    }
  };

  if (loading) return <div className="loading">⏳ Loading event details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!event) return <div className="error">Event not found</div>;

  const isFull = event.currentParticipants >= event.maxParticipants;
  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="event-detail-container">
      <button className="back-btn" onClick={() => navigate('/')}>← Back to Events</button>

      <div className="event-detail-card">
        <div className="event-header">
          <h1>{event.title}</h1>
          <span className={`event-status ${isFull ? 'full' : 'open'}`}>
            {isFull ? '❌ Full' : '✅ Open'}
          </span>
        </div>

        <div className="event-info">
          <div className="info-row">
            <span className="label">📍 Location:</span>
            <span className="value">{event.location}</span>
          </div>
          <div className="info-row">
            <span className="label">📅 Date:</span>
            <span className="value">{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="info-row">
            <span className="label">👥 Participants:</span>
            <span className="value">{event.currentParticipants} / {event.maxParticipants}</span>
          </div>
        </div>

        <div className="participation-bar">
          <div className="progress" style={{ width: `${participationPercentage}%` }}></div>
        </div>

        <div className="event-description">
          <h3>📝 About this event</h3>
          <p>{event.description}</p>
        </div>

        <div className="event-actions">
          <button
            className="join-btn"
            onClick={handleJoinEvent}
            disabled={isFull}
          >
            {isFull ? 'Event is Full' : 'Join Event'}
          </button>
        </div>

        {joined && <div className="success-message">✅ Successfully joined the event!</div>}
      </div>
    </div>
  );
}

export default EventDetail;
