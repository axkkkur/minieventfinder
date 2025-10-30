import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for events
let events = [
  {
    id: 1,
    title: 'Tech Meetup 2025',
    description: 'Meet local tech enthusiasts and developers',
    location: 'Bangalore, Karnataka',
    date: '2025-11-15',
    maxParticipants: 50,
    currentParticipants: 23,
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    description: 'Learn full-stack development with MERN',
    location: 'Delhi, Delhi',
    date: '2025-11-20',
    maxParticipants: 30,
    currentParticipants: 15,
    lat: 28.7041,
    lng: 77.1025
  },
  {
    id: 3,
    title: 'AI & ML Conference',
    description: 'Explore latest AI and Machine Learning trends',
    location: 'Mumbai, Maharashtra',
    date: '2025-11-25',
    maxParticipants: 100,
    currentParticipants: 67,
    lat: 19.0760,
    lng: 72.8777
  }
];

let nextId = 4;

// Helper function to calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Routes

// GET /api/events - List all events with optional location filter
app.get('/api/events', (req, res) => {
  try {
    const { location, lat, lng, maxDistance } = req.query;
    let filteredEvents = [...events];

    // Filter by location name
    if (location) {
      filteredEvents = filteredEvents.filter(event =>
        event.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Filter by distance from user's location
    if (lat && lng && maxDistance) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      const maxDist = parseFloat(maxDistance);

      filteredEvents = filteredEvents.map(event => ({
        ...event,
        distance: calculateDistance(userLat, userLng, event.lat, event.lng)
      })).filter(event => event.distance <= maxDist);
    }

    res.json(filteredEvents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// GET /api/events/:id - Get event details
app.get('/api/events/:id', (req, res) => {
  try {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// POST /api/events - Create an event
app.post('/api/events', (req, res) => {
  try {
    const { title, description, location, date, maxParticipants, lat, lng } = req.body;

    // Validation
    if (!title || !description || !location || !date || !maxParticipants) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEvent = {
      id: nextId++,
      title,
      description,
      location,
      date,
      maxParticipants: parseInt(maxParticipants),
      currentParticipants: 0,
      lat: lat || 0,
      lng: lng || 0
    };

    events.push(newEvent);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

// PUT /api/events/:id/join - Join an event
app.put('/api/events/:id/join', (req, res) => {
  try {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.currentParticipants++;
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error joining event', error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
