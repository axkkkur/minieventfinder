# 🎯 Mini Event Finder - Full Stack Application

A simplified event discovery app built with **MERN Stack** demonstrating REST API design, frontend-backend integration, and state management.

## 🎯 Features

- ✅ **Event Discovery** - Browse and search events by location
- ✅ **Event Details** - View comprehensive event information
- ✅ **Create Events** - Add new events with details
- ✅ **Join Events** - Participate in events with availability tracking
- ✅ **Distance Filtering** - Find events near your location (with geolocation)
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile
- ✅ **Error Handling** - Comprehensive error messages and loading states

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all events with optional filters |
| GET | `/api/events/:id` | Get event details by ID |
| POST | `/api/events` | Create a new event |
| PUT | `/api/events/:id/join` | Join an event |

## 🏗️ Project Structure

```
mini-event-finder/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── styles/
    │   ├── api.js
    │   └── App.js
    ├── package.json
    ├── .env
    └── .gitignore
```

## 🎯 What This Tests

✅ API design and REST principles  
✅ Frontend-backend integration  
✅ State management  
✅ Code organization  
✅ Problem-solving with AI tools  
✅ Ability to ship fast

---


