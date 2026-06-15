import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking, user } = useContext(BookingContext);

  // Get booking details from navigation state
  const bookingDetails = location.state;

  if (!bookingDetails) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <i className="bi bi-cart-x text-warning" style={{ fontSize: '3.5rem' }}></i>
        <h3 className="display-font mt-3 fw-bold">No Reservation in Progress</h3>
        <p className="text-muted small">Please select a hotel and room category first.</p>
        <button onClick={() => navigate('/hotels')} className="btn btn-gold mt-3">Find Hotels</button>
      </div>
    );
  }

  // Personal info state
  const [guestName, setGuestName] = useState(user.name);
  const [guestEmail, setGuestEmail] = useState(user.email);
  const [guestPhone, setGuestPhone] = useState('+1 (555) 234-5678');
  const [specialRequests, setSpecialRequests] = useState('');

  // Credit Card States
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // Modal / Success state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  // Formatting Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    const matches = value.match(/.{1,4}/g);
    const formatted = matches ? matches.join(' ') : '';
    setCardNumber(formatted);
  };

  // Formatting Expiry Date (MM/YY)
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  // Form submission
  const handleSubmitBooking = (e) => {
    e.preventDefault();

    // Compile booking payload
    const bookingPayload = {
      hotelId: bookingDetails.hotelId,
      hotelName: bookingDetails.hotelName,
      hotelImage: bookingDetails.hotelImage,
      roomId: bookingDetails.roomId,
      roomName: bookingDetails.roomName,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      totalDays: bookingDetails.nights,
      totalCost: bookingDetails.totalCost,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests
    };

    // Add to Context (and thus LocalStorage)
    const confirmed = addBooking(bookingPayload);
    setConfirmedBookingId(confirmed.id);
    setShowSuccessModal(true);
  };

  const closeSuccessAndRedirect = () => {
    setShowSuccessModal(false);
    navigate('/my-bookings');
  };

  return (
    <div className="py-5" style={{ marginTop: '80px' }}>
      <div className="container">
        
        {/* Intro */}
        <div className="mb-4 text-center text-md-start">
          <span className="text-warning text-uppercase fw-bold small" style={{ letterSpacing: '0.1em' }}>Secure Booking</span>
          <h1 className="display-font fw-bold mt-1">Complete Reservation</h1>
        </div>

        <div className="row g-5">
          
          {/* Guest and payment details */}
          <div className="col-lg-7 col-md-12">
            <form onSubmit={handleSubmitBooking}>
              
              {/* Guest Details */}
              <div className="bg-white p-4 border rounded shadow-sm mb-4">
                <h4 className="display-font fw-bold mb-3"><i className="bi bi-person-check text-warning me-2"></i> Guest Credentials</h4>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Full Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      value={guestName} 
                      onChange={(e) => setGuestName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Email Address</label>
                    <input 
                      type="email" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      value={guestEmail} 
                      onChange={(e) => setGuestEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Contact Phone</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      value={guestPhone} 
                      onChange={(e) => setGuestPhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Special Requests (Dietary, transfers, etc.)</label>
                    <textarea 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      rows="3" 
                      placeholder="e.g. Early check-in requested, gluten-free breakfast, helicopter pick-up details..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Payment Details + Virtual Credit Card */}
              <div className="bg-white p-4 border rounded shadow-sm mb-4">
                <h4 className="display-font fw-bold mb-4"><i className="bi bi-credit-card-2-front text-warning me-2"></i> Luxury Billing</h4>

                {/* Virtual Credit Card Container */}
                <div className="credit-card-wrapper">
                  <div className={`credit-card-body ${isFlipped ? 'flipped' : ''}`}>
                    
                    {/* Front of Card */}
                    <div className="credit-card-front">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="card-logo">AETHERIA</span>
                        <i className="bi bi-wifi fs-4 text-warning"></i>
                      </div>
                      
                      <div className="card-number-display">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="card-holder-display">
                          <span className="text-white-50 d-block" style={{ fontSize: '0.55rem' }}>CARDHOLDER</span>
                          {cardName || 'ALEX MERCER'}
                        </div>
                        <div className="card-expiry-display text-end">
                          <span className="text-white-50 d-block" style={{ fontSize: '0.55rem' }}>EXPIRES</span>
                          {cardExpiry || 'MM/YY'}
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="credit-card-back">
                      <div className="credit-card-magnetic-strip"></div>
                      <div className="mt-2">
                        <span className="text-white-50 d-block" style={{ fontSize: '0.55rem' }}>AUTHORIZED SIGNATURE</span>
                        <div className="credit-card-signature-area">
                          {cardCvv || '•••'}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-3 text-white-50" style={{ fontSize: '0.6rem' }}>
                        <span>Aetheria Club Elite card.</span>
                        <i className="bi bi-shield-lock-fill"></i>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Credit Card Inputs */}
                <div className="row g-3">
                  <div className="col-md-12">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Cardholder Name</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      placeholder="e.g. Alex Mercer"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Card Number</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      placeholder="1234 5678 1234 5678"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Expiration Date</label>
                    <input 
                      type="text" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>CVV (Security Code)</label>
                    <input 
                      type="password" 
                      className="form-control form-control-sm text-dark bg-light border-0 py-2" 
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      maxLength="4"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button type="submit" className="btn btn-gold w-100 py-3 text-center mb-5" style={{ fontSize: '1rem' }}>
                Confirm & Guarantee Booking
              </button>

            </form>
          </div>

          {/* Booking recap */}
          <div className="col-lg-5 col-md-12">
            <div className="sticky-top filter-card" style={{ top: '100px' }}>
              <h4 className="display-font fw-bold mb-3 border-bottom pb-2">Booking Summary</h4>
              
              <div className="d-flex gap-3 mb-4">
                <img 
                  src={bookingDetails.hotelImage} 
                  alt={bookingDetails.hotelName} 
                  className="rounded" 
                  style={{ width: '90px', height: '90px', objectFit: 'cover' }} 
                />
                <div>
                  <h5 className="display-font fw-bold fs-6 mb-1">{bookingDetails.hotelName}</h5>
                  <div className="text-warning small mb-1">{bookingDetails.roomName}</div>
                  <div className="text-muted small"><i className="bi bi-people-fill me-1"></i>{bookingDetails.guests} Guest{bookingDetails.guests > 1 ? 's' : ''}</div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 border-bottom pb-3 mb-3 small">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Check In</span>
                  <span className="fw-semibold text-dark">{bookingDetails.checkIn}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Check Out</span>
                  <span className="fw-semibold text-dark">{bookingDetails.checkOut}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Nights</span>
                  <span className="fw-semibold text-dark">{bookingDetails.nights} Night{bookingDetails.nights > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div className="d-flex flex-column gap-2 small mb-3">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Room rate total</span>
                  <span className="fw-semibold text-dark">${bookingDetails.roomPrice * bookingDetails.nights}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Luxury tax</span>
                  <span className="fw-semibold text-dark">${bookingDetails.taxes}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Resort services</span>
                  <span className="fw-semibold text-dark">${bookingDetails.serviceCharge}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <span className="fw-bold text-dark display-font">Total Amount Charged</span>
                <span className="fw-bold text-warning fs-3">${bookingDetails.totalCost}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Confirmation Success Modal Layer (Simulated Overlay) */}
      {showSuccessModal && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
          style={{ backgroundColor: 'rgba(10, 17, 24, 0.9)', zIndex: 9999, backdropFilter: 'blur(8px)' }}
        >
          <div className="bg-white p-5 rounded shadow-lg text-center max-width-md mx-3 animate-fade-in" style={{ maxWidth: '500px', border: '1px solid var(--luxury-gold-500)' }}>
            <div className="mb-4">
              <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 text-success" style={{ width: '80px', height: '80px', border: '2px solid #198754' }}>
                <i className="bi bi-journal-check fs-1"></i>
              </span>
            </div>
            
            <h2 className="display-font fw-bold text-dark mb-2">Reservation Secured</h2>
            <p className="text-muted small mb-4">
              Your escape has been successfully registered. A luxury dossier containing transport arrangements, butler details, and checking guidelines has been sent to your email.
            </p>
            
            <div className="bg-light p-3 rounded mb-4 text-start small border">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Booking Reference:</span>
                <span className="fw-bold text-dark">{confirmedBookingId}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Retreat:</span>
                <span className="fw-semibold text-dark text-truncate" style={{ maxWidth: '200px' }}>{bookingDetails.hotelName}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Grand Total:</span>
                <span className="fw-bold text-warning">${bookingDetails.totalCost}</span>
              </div>
            </div>

            <button 
              onClick={closeSuccessAndRedirect} 
              className="btn btn-gold w-100 py-3"
            >
              Go to My Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
