import React, { useContext, useState, useMemo } from 'react';
import { BookingContext } from '../context/BookingContext';
import { hotelsData } from '../data/hotelData';
import HotelCard from '../components/HotelCard';

export default function HotelList() {
  const { searchParams, setSearchParams } = useContext(BookingContext);

  // Filter States
  const [searchTerm, setSearchTerm] = useState(searchParams.destination || '');
  const [priceRange, setPriceRange] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [sortBy, setSortBy] = useState('recommended');
  const [isGridView, setIsGridView] = useState(true);

  // All unique amenities for filters
  const allAmenities = useMemo(() => {
    const amenities = new Set();
    hotelsData.forEach(h => h.amenities.forEach(a => amenities.add(a)));
    return [...amenities];
  }, []);

  // Handle Amenity selection
  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Filter logic
  const filteredHotels = useMemo(() => {
    return hotelsData.filter(hotel => {
      // 1. Search Query (City, Country, or Hotel Name)
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        hotel.name.toLowerCase().includes(term) ||
        hotel.city.toLowerCase().includes(term) ||
        hotel.country.toLowerCase().includes(term);

      // 2. Price filter
      const matchesPrice = hotel.price <= priceRange;

      // 3. Rating filter
      const matchesRating = hotel.rating >= minRating;

      // 4. Amenities filter
      const matchesAmenities = selectedAmenities.every(a => hotel.amenities.includes(a));

      return matchesSearch && matchesPrice && matchesRating && matchesAmenities;
    });
  }, [searchTerm, priceRange, minRating, selectedAmenities]);

  // Sort logic
  const sortedHotels = useMemo(() => {
    const hotels = [...filteredHotels];
    if (sortBy === 'price-low') {
      return hotels.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      return hotels.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      return hotels.sort((a, b) => b.rating - a.rating);
    }
    // Default 'recommended' (by rating * reviewsCount weight)
    return hotels.sort((a, b) => (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount));
  }, [filteredHotels, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange(1500);
    setMinRating(0);
    setSelectedAmenities([]);
    setSortBy('recommended');
    setSearchParams({ destination: '', checkIn: '', checkOut: '', guests: 1 });
  };

  return (
    <div className="py-5" style={{ marginTop: '80px' }}>
      <div className="container">
        
        {/* Breadcrumb / Intro */}
        <div className="mb-4">
          <span className="text-warning text-uppercase fw-bold small" style={{ letterSpacing: '0.1em' }}>Aetheria Collection</span>
          <h1 className="display-font fw-bold mt-1">Discover Exceptional Properties</h1>
          <p className="text-muted small">
            Currently displaying {sortedHotels.length} luxury hotel{sortedHotels.length !== 1 ? 's' : ''} matching your search guidelines.
          </p>
        </div>

        <div className="row g-4">
          
          {/* Filters Sidebar */}
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="filter-card">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <h5 className="display-font text-uppercase fw-semibold mb-0" style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>Filters</h5>
                <button 
                  onClick={clearFilters} 
                  className="btn btn-link text-warning p-0 text-decoration-none small fw-semibold"
                  style={{ fontSize: '0.8rem' }}
                >
                  Clear All
                </button>
              </div>

              {/* Search text filter */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-dark text-uppercase" style={{ fontSize: '0.75rem' }}>Destination Search</label>
                <div className="input-group border rounded px-2 py-1 bg-light">
                  <i className="bi bi-search text-muted me-2 mt-1"></i>
                  <input 
                    type="text" 
                    className="border-0 bg-transparent w-75 small text-dark"
                    placeholder="Search city, hotel name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ outline: 'none', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Price slider filter */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label small fw-bold text-dark text-uppercase mb-0" style={{ fontSize: '0.75rem' }}>Max Price / Night</label>
                  <span className="text-warning fw-bold small">${priceRange}</span>
                </div>
                <input 
                  type="range" 
                  className="form-range form-range-custom" 
                  min="200" 
                  max="1500" 
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                />
                <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.7rem' }}>
                  <span>$200</span>
                  <span>$1500</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-dark text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Minimum Guest Rating</label>
                <div className="d-flex flex-column gap-2">
                  {[0, 4.7, 4.8, 4.9].map((ratingVal) => (
                    <label key={ratingVal} className="d-flex align-items-center small cursor-pointer" style={{ cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="rating-filter"
                        className="form-check-input me-2"
                        checked={minRating === ratingVal}
                        onChange={() => setMinRating(ratingVal)}
                      />
                      <span>
                        {ratingVal === 0 ? 'Any Rating' : `${ratingVal}+ Stars`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="form-label small fw-bold text-dark text-uppercase mb-2" style={{ fontSize: '0.75rem' }}>Amenities</label>
                <div className="d-flex flex-column gap-2">
                  {allAmenities.map((amenity) => (
                    <label key={amenity} className="d-flex align-items-center small cursor-pointer" style={{ cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        className="form-check-input me-2"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                      />
                      <span className="text-muted">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Grid/List section */}
          <div className="col-lg-9 col-md-8 col-sm-12">
            
            {/* Sort & Layout Control Panel */}
            <div className="d-flex justify-content-between align-items-center p-3 mb-4 bg-white border rounded shadow-sm">
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small">Sort by:</span>
                <select 
                  className="form-select form-select-sm border-0 bg-light fw-medium text-dark cursor-pointer" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: '160px', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                </select>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button 
                  onClick={() => setIsGridView(true)} 
                  className={`btn btn-sm ${isGridView ? 'btn-gold' : 'btn-light border'} px-2 py-1`}
                >
                  <i className="bi bi-grid-3x3-gap-fill"></i>
                </button>
                <button 
                  onClick={() => setIsGridView(false)} 
                  className={`btn btn-sm ${!isGridView ? 'btn-gold' : 'btn-light border'} px-2 py-1`}
                >
                  <i className="bi bi-list-task"></i>
                </button>
              </div>
            </div>

            {/* Hotel Cards Display */}
            {sortedHotels.length > 0 ? (
              <div className="row g-4">
                {sortedHotels.map(hotel => (
                  <div key={hotel.id} className={isGridView ? "col-lg-4 col-md-6 col-sm-12" : "col-12"}>
                    
                    {isGridView ? (
                      <HotelCard hotel={hotel} />
                    ) : (
                      // Custom list view item
                      <div className="luxury-card flex-md-row">
                        <div className="card-img-container" style={{ width: '100%', maxWidth: '300px', height: '220px' }}>
                          <img src={hotel.images[0]} alt={hotel.name} className="card-img-zoom h-100" />
                          <span className="card-badge">{hotel.city}</span>
                        </div>
                        <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                          <div>
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="star-rating">
                                <i className="bi bi-star-fill"></i> {hotel.rating} <span className="text-muted ms-1 small">({hotel.reviewsCount} reviews)</span>
                              </span>
                              <span className="text-muted small"><i className="bi bi-geo-alt-fill text-warning me-1"></i>{hotel.country}</span>
                            </div>
                            <h4 className="fs-5 fw-bold text-dark display-font mb-2">{hotel.name}</h4>
                            <p className="text-muted small mb-3">{hotel.description}</p>
                          </div>
                          
                          <div className="d-flex align-items-center justify-content-between mt-auto">
                            <div>
                              <span className="text-muted small">Price per night:</span>
                              <div className="fs-5 fw-bold text-dark"><span className="text-warning">${hotel.price}</span></div>
                            </div>
                            <a href={`/hotel/${hotel.id}`} className="btn btn-gold py-2 px-4" style={{ fontSize: '0.85rem' }}>
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                    
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="text-center py-5 bg-white border rounded shadow-sm my-4">
                <i className="bi bi-emoji-frown text-warning" style={{ fontSize: '3.5rem' }}></i>
                <h3 className="display-font mt-3 fw-bold">No Sanctuary Found</h3>
                <p className="text-muted small max-width-md mx-auto mt-2" style={{ maxWidth: '450px' }}>
                  We couldn't find any hotels matching your current filter specifications. Try adjusting your search query, sliding the price slider, or selecting fewer amenities.
                </p>
                <button onClick={clearFilters} className="btn btn-gold mt-4">
                  Reset Search Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
