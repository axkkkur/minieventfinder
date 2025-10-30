import React from 'react';
import '../styles/EventCard.css';

function EventCard({ event }) {
  const isFull = event.currentParticipants >= event.maxParticipants;
  const participationPercentage = (event.currentParticipants / event.maxParticipants) * 100;

  return (
    <div className="event-card">
      <div className="card-header">
        <h3>{event.title}</h3>
        <span className={`badge ${isFull ? 'full' : 'available'}`}>
          {isFull ? 'Full' : 'Available'}
        </span>
      </div>

      <p className="card-location">📍 {event.location}</p>
      <p className="card-date">📅 {new Date(event.date).toLocaleDateString()}</p>
      <p className="card-description">{event.description.substring(0, 80)}...</p>

      <div className="participation-info">
        <span>{event.currentParticipants}/{event.maxParticipants} joined</span>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${participationPercentage}%` }}></div>
        </div>
      </div>

      <div className="card-footer">
        <span className="click-hint">Click to view details →</span>
      </div>
    </div>
  );
}

export default EventCard;
