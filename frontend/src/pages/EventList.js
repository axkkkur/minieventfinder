import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents } from '../api';
import EventCard from '../components/EventCard';
import '../styles/EventList.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [filterDistance, setFilterDistance] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getEvents(params);
      setEvents(response.data);
    } catch (err) {
      setError('Failed to fetch events. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = {};
    if (searchLocation) params.location = searchLocation;

    if (filterDistance) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          params.lat = position.coords.latitude;
          params.lng = position.coords.longitude;
          params.maxDistance = filterDistance;
          fetchEvents(params);
        },
        () => {
          alert('Unable to get your location. Searching by location name instead.');
          fetchEvents(params);
        }
      );
    } else {
      fetchEvents(params);
    }
  };

  const handleReset = () => {
    setSearchLocation('');
    setFilterDistance('');
    fetchEvents();
  };

  return (
    <div className="event-list-container">
      <h1>🎉 Discover Events Near You</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by location..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Max distance (km)"
          value={filterDistance}
          onChange={(e) => setFilterDistance(e.target.value)}
          className="search-input"
          min="0"
        />
        <button type="submit" className="search-btn">Search</button>
        <button type="button" className="reset-btn" onClick={handleReset}>Reset</button>
      </form>

      {loading && <div className="loading">⏳ Loading events...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && events.length === 0 && (
        <div className="no-events">No events found. Try adjusting your filters!</div>
      )}

      <div className="events-grid">
        {events.map(event => (
          <div key={event.id} onClick={() => navigate(`/event/${event.id}`)}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
