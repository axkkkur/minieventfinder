# 📋 Setup Guide

## Quick Start (10 minutes)

### Terminal 1 - Backend

```bash
cd backend
npm install
npm run dev
```

Expected: `Server running on http://localhost:5000`

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm start
```

Expected: Browser opens to `http://localhost:3000`

## Testing

1. Visit http://localhost:3000
2. Browse events
3. Search by location
4. View event details
5. Join an event
6. Create a new event

## API Testing

```bash
# Get all events
curl http://localhost:5000/api/events

# Get specific event
curl http://localhost:5000/api/events/1

# Create event
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"New Event","description":"Description","location":"City","date":"2025-12-01","maxParticipants":50}'
```

## Troubleshooting

**Port 5000 already in use:**
```bash
lsof -i :5000
kill -9 <PID>
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**CORS Error:**
- Ensure backend is running on http://localhost:5000
- Check frontend .env has correct API URL

---

**Setup Complete! 🎉**
