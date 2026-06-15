import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingContext } from '../context/BookingContext';
import { hotelsData } from '../data/hotelData';
import HotelCard from '../components/HotelCard';

export default function Home() {
  const { setSearchParams } = useContext(BookingContext);
  const navigate = useNavigate();
  
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ destination, checkIn, checkOut, guests });
    navigate('/hotels');
  };

  // Get featured hotels
  const featuredHotels = hotelsData.filter(h => h.featured);

  // Extract unique cities for the search dropdown
  const uniqueCities = [...new Set(hotelsData.map(h => h.city))];

  return (
    <div>
      {/* Hero Section */}
      <div 
        className="hero-container" 
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=85')` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-subtitle">Bespoke Luxury Escapes</span>
          <h1 className="hero-title display-font">The Art of Refined Travel</h1>
          <p className="lead text-white-50 mt-3 d-none d-md-block fs-6 fw-normal" style={{ letterSpacing: '0.05em' }}>
            Discover private sanctuaries, exquisite suites, and Michelin-star dining across the globe.
          </p>
        </div>
      </div>

      {/* Floating Search Bar */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <form onSubmit={handleSearch} className="search-card">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="search-input-group">
                    <label><i className="bi bi-geo-alt-fill text-warning me-1"></i> Destination</label>
                    <select 
                      value={destination} 
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="">Where would you like to escape?</option>
                      {uniqueCities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="col-md-2.5 col-sm-6 col-12 col-md-3">
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
                </div>

                <div className="col-md-2.5 col-sm-6 col-12 col-md-3">
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
                </div>

                <div className="col-md-2 col-sm-12 col-12 col-md-2">
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
                      <option value="6">6+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="col-12 col-md-12 text-center mt-4">
                  <button type="submit" className="btn btn-gold px-5 py-3 w-100 w-md-auto">
                    Search Sanctuaries
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <section className="py-5 mt-4">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase fw-bold small tracking-wider" style={{ letterSpacing: '0.15em' }}>Handpicked Gems</span>
            <h2 className="display-5 fw-bold mt-2 display-font">Our Iconic retreats</h2>
            <p className="text-muted max-width-md mx-auto" style={{ maxWidth: '600px' }}>
              Explore award-winning locations styled with signature aesthetics and unparalleled attention to detail.
            </p>
          </div>
          
          <div className="row g-4">
            {featuredHotels.map(hotel => (
              <div key={hotel.id} className="col-lg-3 col-md-6 col-sm-12">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Services Highlight */}
      <section className="py-5 bg-dark text-white" style={{ backgroundColor: '#0c1520' }}>
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="text-warning text-uppercase fw-bold small" style={{ letterSpacing: '0.15em' }}>The Signature Standard</span>
              <h2 className="display-6 text-white fw-bold mt-2 mb-4 display-font">Crafted Experiences, Unmatched Amenities</h2>
              <p className="text-white-50 mb-4">
                At Aetheria, we define luxury not just by place, but by experience. Every reservation includes full access to our global hospitality concierge, ensuring your stay exceeds your finest dreams.
              </p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-patch-check text-warning me-3 fs-4"></i>
                  <span>Private airport lounge and luxury vehicle transfers.</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-patch-check text-warning me-3 fs-4"></i>
                  <span>Personal Butler dedicated to your itinerary 24/7.</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <i className="bi bi-patch-check text-warning me-3 fs-4"></i>
                  <span>Flexible check-in and checkout to suit your flight times.</span>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-7">
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="p-4 border border-secondary border-opacity-25 rounded h-100" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className="bi bi-cup-hot text-warning fs-1 mb-3"></i>
                    <h5 className="display-font text-white mb-2">Michelin Dining</h5>
                    <p className="text-white-50 small mb-0">
                      Savor world-class culinary art custom-tailored to your dietary preferences by signature chefs.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 border border-secondary border-opacity-25 rounded h-100" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className="bi bi-shield-lock text-warning fs-1 mb-3"></i>
                    <h5 className="display-font text-white mb-2">Ultimate Privacy</h5>
                    <p className="text-white-50 small mb-0">
                      Secluded retreats, sound-insulated villa designs, and strict discretion policies.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 border border-secondary border-opacity-25 rounded h-100" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className="bi bi-heartpulse text-warning fs-1 mb-3"></i>
                    <h5 className="display-font text-white mb-2">Wellness Oasis</h5>
                    <p className="text-white-50 small mb-0">
                      Immersive hydro-therapies, Ayurvedic massage, yoga spaces, and holistic healing.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="p-4 border border-secondary border-opacity-25 rounded h-100" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <i className="bi bi-compass text-warning fs-1 mb-3"></i>
                    <h5 className="display-font text-white mb-2">Custom Excursions</h5>
                    <p className="text-white-50 small mb-0">
                      Private yacht charters, helicopter flights, and exclusive cultural heritage tours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="py-5 my-4">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-warning text-uppercase fw-bold small" style={{ letterSpacing: '0.15em' }}>Client Testimonials</span>
            <h2 className="display-5 fw-bold mt-2 display-font">The Aetheria Diaries</h2>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 bg-white border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                  </div>
                  <h5 className="display-font fs-6 fw-bold">"Pure heaven over the water"</h5>
                  <p className="text-muted small">
                    "Our stay at the Overwater Maldives villa was out of this world. The slide was fun, but the 24/7 personal butler was the true game-changer. We've booked our winter trip already."
                  </p>
                </div>
                <div className="d-flex align-items-center mt-3 pt-3 border-top">
                  <div className="fw-bold small text-dark">Victoria & James Sterling</div>
                  <div className="text-muted ms-auto small" style={{ fontSize: '0.75rem' }}>London, UK</div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="p-4 bg-white border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                  </div>
                  <h5 className="display-font fs-6 fw-bold">"Zen tranquility redefined"</h5>
                  <p className="text-muted small">
                    "The Kyoto ryokan gave us a deep sense of stillness. The Private Onsen hot tub overlooking the koi pond and the tea master's instruction were highlights of our year. Exquisite dining."
                  </p>
                </div>
                <div className="d-flex align-items-center mt-3 pt-3 border-top">
                  <div className="fw-bold small text-dark">Kenji Matsumoto</div>
                  <div className="text-muted ms-auto small" style={{ fontSize: '0.75rem' }}>Tokyo, Japan</div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="p-4 bg-white border rounded shadow-sm h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="text-warning mb-3">
                    <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i> <i className="bi bi-star-fill"></i>
                  </div>
                  <h5 className="display-font fs-6 fw-bold">"Views that take your breath away"</h5>
                  <p className="text-muted small">
                    "Sitting in the heated outdoor pool in Zermatt, staring directly at the snowcapped Matterhorn while sipping champagne, was dreamlike. Ski valets made hitting the slopes painless!"
                  </p>
                </div>
                <div className="d-flex align-items-center mt-3 pt-3 border-top">
                  <div className="fw-bold small text-dark">Charlotte Dubois</div>
                  <div className="text-muted ms-auto small" style={{ fontSize: '0.75rem' }}>Geneva, Switzerland</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
