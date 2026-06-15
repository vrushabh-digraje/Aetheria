import React from 'react';
import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  // Generate rating stars
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    const hasHalf = rating - floor >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      } else if (i === floor + 1 && hasHalf) {
        stars.push(<i key={i} className="bi bi-star-half"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="luxury-card h-100">
      <div className="card-img-container">
        <img 
          src={hotel.images[0]} 
          alt={hotel.name} 
          className="card-img-zoom"
          loading="lazy"
        />
        <span className="card-badge">{hotel.city}</span>
        <div className="card-price-tag">
          From <span>${hotel.price}</span>/nt
        </div>
      </div>
      
      <div className="p-4 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="star-rating">
            {renderStars(hotel.rating)}
            <span className="ms-2 text-muted small" style={{ fontSize: '0.8rem' }}>({hotel.reviewsCount})</span>
          </div>
          <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
            <i className="bi bi-geo-alt-fill text-warning me-1"></i>
            {hotel.country}
          </span>
        </div>
        
        <h4 className="fs-5 fw-bold text-dark display-font mb-2">{hotel.name}</h4>
        
        <p className="text-muted small mb-3 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {hotel.description}
        </p>
        
        <div className="d-flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <span key={idx} className="badge bg-light text-dark border small fw-medium" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="badge bg-light text-muted border small" style={{ fontSize: '0.7rem', padding: '0.3rem 0.6rem' }}>
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <Link to={`/hotel/${hotel.id}`} className="btn btn-outline-gold w-100 text-center py-2" style={{ fontSize: '0.85rem' }}>
          Explore Property
        </Link>
      </div>
    </div>
  );
}
