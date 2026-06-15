import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useContext(BookingContext);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top navbar-custom ${scrolled ? 'scrolled' : ''}`}>
      <div className="container py-2">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fs-3 fw-bold display-font text-white" style={{ letterSpacing: '0.15em' }}>
            AETHERIA
          </span>
          <span className="ms-2 px-2 py-0.5 border border-warning text-warning rounded-0 fs-7" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            LUXURY
          </span>
        </Link>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
          aria-controls="navbarContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/hotels">
                Find Hotels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/my-bookings">
                My Bookings
              </NavLink>
            </li>
          </ul>
          
          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-sm-block">
              <div className="text-white-50 small" style={{ fontSize: '0.75rem' }}>Welcome back,</div>
              <div className="text-warning fw-semibold small" style={{ fontSize: '0.85rem' }}>{user.name}</div>
            </div>
            <Link to="/my-bookings">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="rounded-circle border border-warning"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
