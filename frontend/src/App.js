import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <a href="/" className="nav-logo">
              🎯 Event Finder
            </a>
            <ul className="nav-menu">
              <li><a href="/" className="nav-link">Browse Events</a></li>
              <li><a href="/create" className="nav-link">Create Event</a></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create" element={<CreateEvent />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Event Finder. Find and create amazing events!</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
