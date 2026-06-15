import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to the Aetheria Newsletter!");
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary border-opacity-25" style={{ backgroundColor: '#0a1118 !important' }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="display-font text-warning mb-3 fw-bold" style={{ letterSpacing: '0.1em' }}>AETHERIA</h5>
            <p className="text-white-50 small pe-lg-4">
              Curating rare and exceptional travel experiences worldwide. From overwater paradise villas to historic urban palaces, discover unmatched service and refined luxury designed just for you.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white-50 hover-gold fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white-50 hover-gold fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white-50 hover-gold fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-white-50 hover-gold fs-5"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="display-font text-white mb-3 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Destinations</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/hotels" className="text-white-50 text-decoration-none hover-gold">Maldives</Link></li>
              <li className="mb-2"><Link to="/hotels" className="text-white-50 text-decoration-none hover-gold">Paris, France</Link></li>
              <li className="mb-2"><Link to="/hotels" className="text-white-50 text-decoration-none hover-gold">Kyoto, Japan</Link></li>
              <li className="mb-2"><Link to="/hotels" className="text-white-50 text-decoration-none hover-gold">Zermatt, Alps</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="display-font text-white mb-3 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Luxury Services</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-gold">24/7 Butler Service</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-gold">Private Spa & Wellness</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-gold">Michelin Star Dining</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none hover-gold">Helicopter Transfers</a></li>
            </ul>
          </div>
          
          <div className="col-lg-4 col-md-6">
            <h6 className="display-font text-white mb-3 text-uppercase fw-semibold" style={{ letterSpacing: '0.05em' }}>Aetheria Club Newsletter</h6>
            <p className="text-white-50 small mb-3">
              Subscribe to unlock private offers, luxury travel guidebooks, and seasonal retreat catalogs.
            </p>
            <form onSubmit={handleSubmit} className="input-group">
              <input 
                type="email" 
                className="form-control bg-transparent border-secondary text-white small" 
                placeholder="Enter your email" 
                required 
                style={{ fontSize: '0.85rem' }}
              />
              <button className="btn btn-gold px-3" type="submit" style={{ padding: '0.375rem 0.75rem' }}>
                Join
              </button>
            </form>
          </div>
        </div>
        
        <hr className="my-4 border-secondary border-opacity-25" />
        
        <div className="row small align-items-center">
          <div className="col-md-6 text-center text-md-start text-white-50">
            &copy; {new Date().getFullYear()} Aetheria Luxury Hotels & Resorts. All rights reserved.
          </div>
          <div className="col-md-6 text-center text-md-end mt-2 mt-md-0 text-white-50">
            <a href="#" className="text-white-50 text-decoration-none me-3 hover-gold">Privacy Policy</a>
            <a href="#" className="text-white-50 text-decoration-none hover-gold">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <style>{`
        .hover-gold:hover {
          color: var(--luxury-gold-500) !important;
          transition: var(--transition-fast);
        }
      `}</style>
    </footer>
  );
}
