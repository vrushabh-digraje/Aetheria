import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';

export default function MyBookings() {
  const { bookings, cancelBooking, deleteBookingRecord, user } = useContext(BookingContext);
  const navigate = useNavigate();

  const handleCancel = (id, hotelName) => {
    if (window.confirm(`Are you sure you want to cancel your luxury reservation at ${hotelName}?`)) {
      cancelBooking(id);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this booking record from your dashboard history?")) {
      deleteBookingRecord(id);
    }
  };

  return (
    <div className="py-5" style={{ marginTop: '80px' }}>
      <div className="container">
        
        {/* Dashboard Title */}
        <div className="mb-5 text-center text-md-start">
          <span className="text-warning text-uppercase fw-bold small" style={{ letterSpacing: '0.15em' }}>Membership Portal</span>
          <h1 className="display-font fw-bold mt-1">Guest Dashboard</h1>
        </div>

        <div className="row g-4">
          
          {/* Left Column: User Profile info card */}
          <div className="col-lg-4 col-md-12">
            <div className="filter-card text-center">
              <div className="position-relative mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="rounded-circle border border-warning p-1"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <span 
                  className="position-absolute bottom-0 start-50 translate-middle-x badge bg-warning text-dark px-3 py-1 fw-bold rounded-pill text-uppercase border"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.05em', transform: 'translate(-50%, 10px) !important' }}
                >
                  {user.tier}
                </span>
              </div>
              
              <h4 className="display-font fw-bold mt-3 mb-1">{user.name}</h4>
              <p className="text-muted small mb-4">{user.email}</p>
              
              <div className="border-top pt-4 text-start small">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Membership ID:</span>
                  <span className="fw-semibold text-dark">#AE-99238</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Aetheria Club Points:</span>
                  <span className="fw-semibold text-warning">14,250 pts</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Preferred Perks:</span>
                  <span className="fw-semibold text-dark">Late Checkout, Spa Credits</span>
                </div>
              </div>
              
              <div className="alert alert-warning small py-3 mt-4 mb-0 text-center border-warning border-opacity-25">
                <i className="bi bi-gift me-2 fs-5"></i>
                You have an unused <strong>$150 Resort Spa Credit</strong>!
              </div>
            </div>
          </div>

          {/* Right Column: Bookings list */}
          <div className="col-lg-8 col-md-12">
            <h3 className="display-font fw-bold mb-4">Your Reservations</h3>
            
            {bookings.length > 0 ? (
              <div className="d-flex flex-column gap-4">
                {bookings.map((booking) => {
                  const isConfirmed = booking.status === 'Confirmed';
                  const isCompleted = booking.status === 'Completed';
                  const isCancelled = booking.status === 'Cancelled';
                  
                  return (
                    <div key={booking.id} className="booking-item-card p-4">
                      <div className="row g-3 align-items-center">
                        
                        {/* Hotel Thumbnail */}
                        <div className="col-md-3 col-sm-12 text-center text-md-start">
                          <img 
                            src={booking.hotelImage} 
                            alt={booking.hotelName} 
                            className="rounded img-fluid"
                            style={{ width: '100%', maxHeight: '110px', objectFit: 'cover' }}
                          />
                        </div>

                        {/* Booking Details */}
                        <div className="col-md-6 col-sm-12">
                          <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                            <span className={`status-badge ${booking.status.toLowerCase()}`}>
                              {booking.status}
                            </span>
                            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                              Ref: <strong>{booking.id}</strong>
                            </span>
                          </div>

                          <h5 className="display-font fw-bold fs-6 text-dark mb-1">{booking.hotelName}</h5>
                          <div className="text-warning small mb-3">{booking.roomName}</div>
                          
                          <div className="row g-2 small text-muted">
                            <div className="col-6">
                              <span className="d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Check In</span>
                              <span className="fw-medium text-dark">{booking.checkIn}</span>
                            </div>
                            <div className="col-6">
                              <span className="d-block" style={{ fontSize: '0.65rem', textTransform: 'uppercase' }}>Check Out</span>
                              <span className="fw-medium text-dark">{booking.checkOut}</span>
                            </div>
                          </div>
                        </div>

                        {/* Pricing & Actions */}
                        <div className="col-md-3 col-sm-12 text-center text-md-end border-start-md">
                          <div className="mb-3">
                            <span className="text-muted small d-block" style={{ fontSize: '0.75rem' }}>Total Cost</span>
                            <span className="fw-bold fs-4 text-dark">${booking.totalCost}</span>
                            <span className="text-muted small d-block" style={{ fontSize: '0.7rem' }}>({booking.totalDays} nights)</span>
                          </div>

                          <div className="d-flex flex-md-column justify-content-center justify-content-md-end gap-2">
                            {isConfirmed && (
                              <button 
                                onClick={() => handleCancel(booking.id, booking.hotelName)}
                                className="btn btn-outline-danger btn-sm w-100 py-2"
                                style={{ fontSize: '0.75rem' }}
                              >
                                Cancel Booking
                              </button>
                            )}
                            {(isCancelled || isCompleted) && (
                              <button 
                                onClick={() => handleDelete(booking.id)}
                                className="btn btn-outline-secondary btn-sm w-100 py-2"
                                style={{ fontSize: '0.75rem' }}
                              >
                                Remove Record
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Empty Bookings Dashboard State
              <div className="text-center py-5 bg-white border rounded shadow-sm">
                <i className="bi bi-journal-x text-warning" style={{ fontSize: '3.5rem' }}></i>
                <h3 className="display-font mt-3 fw-bold">No Bookings Found</h3>
                <p className="text-muted small max-width-sm mx-auto mt-2" style={{ maxWidth: '380px' }}>
                  You do not have any registered resort reservations. Plan your next escape and book one of our beautiful hotels!
                </p>
                <button onClick={() => navigate('/hotels')} className="btn btn-gold mt-4">
                  Browse Escape Locations
                </button>
              </div>
            )}
          </div>
          
        </div>
      </div>
      
      <style>{`
        @media(min-width: 768px) {
          .border-start-md {
            border-left: 1px solid var(--neutral-200);
          }
        }
      `}</style>
    </div>
  );
}
