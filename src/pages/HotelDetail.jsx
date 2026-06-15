import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { hotelsData } from '../data/hotelData';

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useContext(BookingContext);

  // Find Hotel
  const hotel = hotelsData.find(h => h.id === id);

  if (!hotel) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: '3rem' }}></i>
        <h2 className="display-font mt-3 fw-bold">Hotel Not Found</h2>
        <p className="text-muted">The property you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/hotels')} className="btn btn-gold mt-3">Back to Hotels</button>
      </div>
    );
  }

  // Local States
  const [activeImage, setActiveImage] = useState(hotel.images[0]);
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0]);
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || '');
  const [guests, setGuests] = useState(searchParams.guests || 1);
  const [reviews, setReviews] = useState(hotel.reviews || []);
  
  // Review form states
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Update active image if hotel changes
  useEffect(() => {
    if (hotel) {
      setActiveImage(hotel.images[0]);
      setSelectedRoom(hotel.rooms[0]);
    }
  }, [hotel]);

  // Calculate nights
  const nightsCount = useEffect(() => {}, []); // empty dummy for lint/formatting
  
  const calculatedNights = React.useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = checkOutDate - checkInDate;
    if (diffTime <= 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, [checkIn, checkOut]);

  // Pricing calculations
  const baseTotal = calculatedNights * (selectedRoom ? selectedRoom.price : hotel.price);
  const luxuryTax = Math.round(baseTotal * 0.08); // 8% luxury resort levy
  const serviceCharge = Math.round(baseTotal * 0.05); // 5% service charge
  const grandTotal = baseTotal + luxuryTax + serviceCharge;

  // Handle room selection
  const selectRoom = (room) => {
    setSelectedRoom(room);
  };

  // Handle Review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newReview = {
      author: reviewName,
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      comment: reviewComment
    };

    setReviews([newReview, ...reviews]);
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
  };

  // Map icons to amenities
  const getAmenityIcon = (amenity) => {
    const term = amenity.toLowerCase();
    if (term.includes('wifi')) return 'bi-wifi';
    if (term.includes('pool')) return 'bi-water';
    if (term.includes('spa') || term.includes('wellness')) return 'bi-heartpulse';
    if (term.includes('dine') || term.includes('dining')) return 'bi-egg-fried';
    if (term.includes('gym') || term.includes('fitness')) return 'bi-activity';
    if (term.includes('butler') || term.includes('concierge')) return 'bi-person-badge';
    if (term.includes('view') || term.includes('sunrise') || term.includes('sunset')) return 'bi-eye';
    if (term.includes('beach')) return 'bi-sun';
    if (term.includes('ski')) return 'bi-snow';
    if (term.includes('fireplace')) return 'bi-fire';
    if (term.includes('shuttle') || term.includes('transfer')) return 'bi-car-front';
    if (term.includes('hot tub') || term.includes('onsen')) return 'bi-water';
    if (term.includes('bar')) return 'bi-cup-straw';
    return 'bi-check-circle';
  };

  // Handle Checkout routing
  const handleProceedBooking = () => {
    if (!checkIn || !checkOut) {
      alert("Please specify Check-in and Check-out dates in the booking panel.");
      return;
    }
    if (calculatedNights <= 0) {
      alert("Invalid dates. Check-out must be after Check-in.");
      return;
    }
    
    // Set parameters in global context
    setSearchParams({ destination: hotel.city, checkIn, checkOut, guests });

    // Navigate to checkout and pass details in state
    navigate('/checkout', {
      state: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.images[0],
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        checkIn,
        checkOut,
        guests,
        nights: calculatedNights,
        roomPrice: selectedRoom.price,
        taxes: luxuryTax,
        serviceCharge,
        totalCost: grandTotal
      }
    });
  };

  return (
    <div className="py-5" style={{ marginTop: '80px' }}>
      <div className="container">
        
        {/* Header Block */}
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-dark text-warning border border-secondary border-opacity-50 small text-uppercase" style={{ letterSpacing: '0.05em' }}>
              {hotel.city}, {hotel.country}
            </span>
            <span className="star-rating ms-2">
              <i className="bi bi-star-fill"></i> {hotel.rating} <span className="text-muted small">({hotel.reviewsCount} guest reviews)</span>
            </span>
          </div>
          <h1 className="display-font fw-bold display-6">{hotel.name}</h1>
          <p className="text-warning text-uppercase small fw-semibold tracking-wide mb-0" style={{ letterSpacing: '0.08em' }}>
            "{hotel.tagline}"
          </p>
        </div>

        {/* Dynamic Image Gallery */}
        <div className="gallery-grid">
          <div className="gallery-main">
            <img src={activeImage} alt={hotel.name} className="w-100 h-100 object-fit-cover" style={{ objectFit: 'cover' }} />
          </div>
          <div className="gallery-thumbs">
            {hotel.images.map((img, index) => (
              <div 
                key={index} 
                className={`gallery-thumb-item ${activeImage === img ? 'border border-warning border-2' : ''}`}
                onClick={() => setActiveImage(img)}
              >
                <img src={img} alt={`${hotel.name} view ${index + 1}`} className="gallery-img" />
              </div>
            ))}
          </div>
        </div>

        <div className="row g-5">
          
          {/* Main Description and Rooms */}
          <div className="col-lg-8 col-md-12">
            
            {/* Overview */}
            <div className="mb-5 bg-white p-4 border rounded shadow-sm">
              <h3 className="display-font fw-bold mb-3">Overview</h3>
              <p className="text-muted" style={{ lineHeight: '1.7' }}>{hotel.description}</p>
              
              <h5 className="display-font fw-bold mt-4 mb-3">Retreat Features & Services</h5>
              <div className="row g-3">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="col-md-4 col-sm-6 col-12">
                    <span className="amenity-badge w-100 d-flex justify-content-start align-items-center">
                      <i className={`bi ${getAmenityIcon(amenity)} text-warning fs-5`}></i>
                      <span className="ms-2 small text-dark fw-medium">{amenity}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Selector Section */}
            <div className="mb-5">
              <h3 className="display-font fw-bold mb-4">Choose Your Sanctuary</h3>
              
              <div className="d-flex flex-column gap-4">
                {hotel.rooms.map((room) => {
                  const isSelected = selectedRoom.id === room.id;
                  return (
                    <div 
                      key={room.id} 
                      className={`luxury-card flex-md-row p-3 ${isSelected ? 'border border-warning shadow-md' : ''}`}
                      style={{ transition: 'all 0.3s ease' }}
                    >
                      <div className="card-img-container rounded-start" style={{ width: '100%', maxWidth: '280px', height: '180px' }}>
                        <img src={room.images[0]} alt={room.name} className="card-img-zoom h-100 rounded-start" />
                      </div>
                      
                      <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <h4 className="fs-5 fw-bold text-dark display-font mb-0">{room.name}</h4>
                            <span className="text-warning fw-bold fs-5">${room.price} <span className="text-muted small" style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>/ night</span></span>
                          </div>
                          <div className="d-flex gap-3 text-muted small mb-2">
                            <span><i className="bi bi-arrows-angle-expand me-1 text-warning"></i>{room.size}</span>
                            <span><i className="bi bi-people me-1 text-warning"></i>Max {room.capacity} Guests</span>
                            <span><i className="bi bi-hdd me-1 text-warning"></i>{room.beds}</span>
                          </div>
                          <p className="text-muted small mb-3">{room.description}</p>
                          <div className="d-flex flex-wrap gap-1">
                            {room.amenities.map((a, idx) => (
                              <span key={idx} className="badge bg-light text-muted border small" style={{ fontSize: '0.65rem' }}>{a}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-end mt-3 mt-md-0">
                          <button 
                            onClick={() => selectRoom(room)} 
                            className={`btn ${isSelected ? 'btn-gold px-4' : 'btn-outline-gold px-4'} py-2`}
                            style={{ fontSize: '0.8rem' }}
                          >
                            {isSelected ? 'Selected' : 'Select Room'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guest Reviews Diaries */}
            <div className="bg-white p-4 border rounded shadow-sm mb-5">
              <h3 className="display-font fw-bold mb-4">The Guest Diaries ({reviews.length})</h3>
              
              {/* Review Input form */}
              <form onSubmit={handleReviewSubmit} className="mb-5 p-3 border rounded bg-light">
                <h6 className="display-font fw-bold text-uppercase text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.05rem' }}>Write an Entry</h6>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input 
                      type="text" 
                      className="form-control form-control-sm"
                      placeholder="Your Name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <div className="input-group input-group-sm">
                      <label className="input-group-text small" style={{ fontSize: '0.75rem' }}>Rating</label>
                      <select 
                        className="form-select form-select-sm"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(parseInt(e.target.value))}
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <textarea 
                      className="form-control form-control-sm"
                      rows="3"
                      placeholder="Share details of your escape at Aetheria..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="btn btn-gold btn-sm px-4 py-2">
                      Sign Diary
                    </button>
                  </div>
                </div>
              </form>

              {/* Reviews list */}
              <div className="d-flex flex-column gap-4">
                {reviews.map((rev, index) => (
                  <div key={index} className="pb-4 border-bottom last-border-0">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="fw-bold text-dark">{rev.author}</div>
                      <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{rev.date}</div>
                    </div>
                    <div className="star-rating mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <i key={i} className={`bi ${i < rev.rating ? 'bi-star-fill' : 'bi-star'}`}></i>
                      ))}
                    </div>
                    <p className="text-muted small mb-0">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Booking Widget Sidebar */}
          <div className="col-lg-4 col-md-12">
            <div className="card sticky-top filter-card" style={{ top: '100px' }}>
              <div className="pb-2 border-bottom mb-3 text-center">
                <span className="text-muted small text-uppercase">Selected Retreat Option</span>
                <h5 className="display-font fw-bold text-dark mb-0 mt-1">{selectedRoom.name}</h5>
              </div>

              {/* Date & Guest Inputs */}
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="search-input-group">
                  <label><i className="bi bi-calendar-check text-warning me-1"></i> Check In</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                
                <div className="search-input-group">
                  <label><i className="bi bi-calendar-x text-warning me-1"></i> Check Out</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>

                <div className="search-input-group">
                  <label><i className="bi bi-people text-warning me-1"></i> Guests</label>
                  <select 
                    value={guests} 
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation details */}
              {calculatedNights > 0 ? (
                <div className="checkout-summary-card mb-4">
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-muted">${selectedRoom.price} x {calculatedNights} nights</span>
                    <span className="fw-semibold text-dark">${baseTotal}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-muted">Luxury Levy (8%)</span>
                    <span className="fw-semibold text-dark">${luxuryTax}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3 pb-2 border-bottom small">
                    <span className="text-muted">Resort Service Fee (5%)</span>
                    <span className="fw-semibold text-dark">${serviceCharge}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-dark display-font">Grand Total</span>
                    <span className="fw-bold text-warning fs-4">${grandTotal}</span>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning small py-3 mb-4 text-center">
                  <i className="bi bi-info-circle me-1"></i>
                  Please configure check-in and check-out dates to calculate pricing.
                </div>
              )}

              {/* CTA Booking Button */}
              <button 
                onClick={handleProceedBooking}
                disabled={calculatedNights <= 0}
                className="btn btn-gold w-100 py-3 text-center"
              >
                Proceed to Checkout
              </button>
              
              <div className="text-center mt-3 text-muted" style={{ fontSize: '0.75rem' }}>
                <i className="bi bi-shield-lock-fill me-1"></i> Secure Luxury Reservation System.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
