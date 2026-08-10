import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Campus<span className="logo-accent">Events</span></h3>
          <p>The definitive centralized system for university event scheduling, registration tracking, and engagement management metrics.</p>
        </div>
        <div className="footer-nav">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home Dashboard</Link></li>
            <li><Link to="/events">All Events List</Link></li>
            <li><Link to="/my-registrations">Student Hub</Link></li>
            <li><Link to="/admin">Management Panel</Link></li>
          </ul>
        </div>
        <div className="footer-team">
          <h4>Development Group</h4>
          <p>Designed and built by: <strong>Amin, Yaseen, Hoorain & Noor</strong></p>
          <p className="project-tag">BSCS Semester 4 Project Submission</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Campus Event Management Framework. Portfolio Capstone Release Ready.</p>
      </div>
    </footer>
  );
};

export default Footer;