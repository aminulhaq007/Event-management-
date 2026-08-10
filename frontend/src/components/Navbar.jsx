import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          Campus<span className="logo-accent">Events</span>
        </Link>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/events" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={() => setIsOpen(false)}>Events</NavLink>
        <NavLink to="/my-registrations" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} onClick={() => setIsOpen(false)}>My Registrations</NavLink>
        <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-item admin-btn active' : 'nav-item admin-btn'} onClick={() => setIsOpen(false)}>Admin Panel</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;