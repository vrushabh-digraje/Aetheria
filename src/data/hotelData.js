export const hotelsData = [
  {
    id: "h1",
    name: "Aetheria Maldives Overwater Resort",
    tagline: "Paradise Suspended Over Turquoise Waters",
    description: "Experience the ultimate in private luxury at Aetheria Maldives. Nestled in a secluded lagoon, our overwater villas offer direct access to crystal-clear waters and vibrant coral reefs. Indulge in personal butler service, fine dining under the stars, and signature spa treatments that harmonize with the ocean breeze. A sanctuary where the horizon meets your dreams.",
    city: "Maldives",
    country: "Maldives",
    rating: 4.9,
    reviewsCount: 382,
    price: 850,
    featured: true,
    amenities: ["Free Wifi", "Infinity Pool", "Spa & Wellness", "Fine Dining", "Fitness Center", "Ocean View", "24/7 Butler", "Private Beach"],
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h1-r1",
        name: "Ocean Sunrise Overwater Villa",
        price: 850,
        capacity: 2,
        beds: "1 King Bed",
        size: "95 m²",
        description: "Wake up to unobstructed sunrise views. Features a private plunge pool, outdoor rain shower, and glass floor panels to view marine life.",
        amenities: ["Plunge Pool", "Ocean View", "Private Deck", "Espresso Machine", "Mini Bar", "Home Theater System"],
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h1-r2",
        name: "Sunset Haven Retreat (with Slide)",
        price: 1250,
        capacity: 4,
        beds: "2 King Beds",
        size: "160 m²",
        description: "An expansive two-story retreat featuring a waterslide that leads straight into the ocean lagoon, along with a spacious outdoor dining pavilion.",
        amenities: ["Waterslide", "Private Pool", "Hammock", "Butler Service", "Kitchenette", "Premium Wine Cooler"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Evelyn Carter", rating: 5, date: "May 12, 2026", comment: "Absolutely breathtaking. The butler service was flawless and waking up to the ocean breeze was unforgettable." },
      { author: "Marcus Vance", rating: 5, date: "April 28, 2026", comment: "The waterslide on the villa was incredible! Super private, amazing service, and the underwater restaurant is a must-visit." }
    ]
  },
  {
    id: "h2",
    name: "L'Opera Palace Paris",
    tagline: "Timeless Parisian Elegance and Grandeur",
    description: "Steeped in history and refined culture, L'Opera Palace Paris welcomes you to a grand boutique experience. Steps from the Louvre and Palais Garnier, our rooms blend classic 19th-century French architecture with modern premium technology. Enjoy gourmet afternoon tea in our glass atrium and Michelin-starred dining in the evening.",
    city: "Paris",
    country: "France",
    rating: 4.8,
    reviewsCount: 245,
    price: 490,
    featured: true,
    amenities: ["Free Wifi", "Indoor Pool", "Michelin Dining", "Fitness Center", "Concierge Service", "Pets Welcome", "Valet Parking"],
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h2-r1",
        name: "Classic Parisian Room",
        price: 490,
        capacity: 2,
        beds: "1 Queen Bed",
        size: "35 m²",
        description: "Charming room styled with French moldings and silk wall coverings. Looks out over a quiet courtyard.",
        amenities: ["Courtyard View", "Marble Bathroom", "Espresso Machine", "Robes & Slippers", "Safe"],
        images: ["https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h2-r2",
        name: "Eiffel View Suite",
        price: 890,
        capacity: 3,
        beds: "1 King Bed, 1 Daybed",
        size: "75 m²",
        description: "An elegant suite showcasing a private wrought-iron balcony with direct views of the Eiffel Tower.",
        amenities: ["Eiffel View", "Private Balcony", "Living Area", "Chilled Champagne on arrival", "Luxury Toiletries"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Sophie Dubois", rating: 5, date: "June 02, 2026", comment: "Spectacular location and the room details are drop-dead gorgeous. Watching the Eiffel Tower sparkle from our balcony was magic." },
      { author: "Jonathan Ray", rating: 4.5, date: "May 20, 2026", comment: "High-end luxury service. The breakfast pastries were the best I've ever had in Paris. Bed was incredibly comfortable." }
    ]
  },
  {
    id: "h3",
    name: "Hanami Ryokan & Spa Kyoto",
    tagline: "Serenity and Tradition in the Heart of Kyoto",
    description: "Immerse yourself in Zen-like tranquillity. Hanami Ryokan captures the elegant beauty of traditional Japanese hospitality. Featuring tatami flooring, premium cypress soaking baths, and a lush bamboo garden pathway. Relish our exquisite multi-course Kaiseki cuisine, handcrafted using seasonal local ingredients.",
    city: "Kyoto",
    country: "Japan",
    rating: 4.95,
    reviewsCount: 194,
    price: 380,
    featured: true,
    amenities: ["Free Wifi", "Onsen / Hot Springs", "Zen Garden", "Traditional Dining", "Tea Ceremony", "Spa Treatments", "Quiet Zones"],
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h3-r1",
        name: "Standard Tatami Room",
        price: 380,
        capacity: 2,
        beds: "2 Traditional Futons",
        size: "42 m²",
        description: "Classic ryokan design featuring paper sliding screens (Shoji), tatami mats, and garden views.",
        amenities: ["Garden View", "Yukata Robes", "Cypress Tub", "Premium Matcha Kit", "Air Purifier"],
        images: ["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h3-r2",
        name: "Imperial Garden Pavilion",
        price: 680,
        capacity: 4,
        beds: "4 Traditional Futons",
        size: "90 m²",
        description: "A premium independent pavilion overlooking our private koi pond. Includes an outdoor stone Onsen hot tub.",
        amenities: ["Private Stone Hot Tub", "Koi Pond View", "Living Area", "Private Tea Master Demonstration", "Premium Sake Bar"],
        images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Kenji Sato", rating: 5, date: "May 30, 2026", comment: "The most peaceful experience of my life. The Kaiseki dinner was like art, and the hot springs cured all my jet lag." },
      { author: "Emma Watson", rating: 5, date: "May 15, 2026", comment: "Stunning gardens and outstanding customer care. Perfect mix of ancient tradition and luxurious comfort." }
    ]
  },
  {
    id: "h4",
    name: "The Vertex Chalet Zermatt",
    tagline: "Alpine Luxury Beneath the Matterhorn",
    description: "Located high in the Swiss Alps, The Vertex Chalet combines rustic mountain warmth with opulent design. Perfect for ski enthusiasts and luxury seekers alike, we offer ski-in/ski-out access, a heated outdoor pool with direct views of the Matterhorn, and cozy fireplaces in every suite. Return from the slopes to a Michelin-rated gourmet fondue experience.",
    city: "Zermatt",
    country: "Switzerland",
    rating: 4.85,
    reviewsCount: 156,
    price: 620,
    featured: true,
    amenities: ["Free Wifi", "Heated Outdoor Pool", "Ski-in/Ski-out", "Fireplace", "Spa & Sauna", "Fine Dining", "Airport Shuttle"],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h4-r1",
        name: "Deluxe Alpine Room",
        price: 620,
        capacity: 2,
        beds: "1 King Bed",
        size: "48 m²",
        description: "Styled in pine wood and soft cashmere. Features a private fireplace and floor-to-ceiling windows looking out to the forest.",
        amenities: ["Fireplace", "Balcony", "Soaking Tub", "Espresso Station", "Heated Floors"],
        images: ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h4-r2",
        name: "Matterhorn Summit Suite",
        price: 1050,
        capacity: 4,
        beds: "2 King Beds",
        size: "110 m²",
        description: "Our crown jewel suite. Watch the sunrise paint the Matterhorn peak pink from your private hot tub on the terrace.",
        amenities: ["Matterhorn View", "Terrace Hot Tub", "Grand Fireplace", "Personal Ski Valet", "Private Dining Area"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Lucas Keller", rating: 5, date: "March 10, 2026", comment: "Ski-in ski-out was incredibly convenient. Sitting in the heated pool while it was snowing was an unforgettable highlight." },
      { author: "Audrey Hepburn", rating: 4.8, date: "February 22, 2026", comment: "Exquisite interior design. The staff treats you like royalty, and the views are unmatched." }
    ]
  },
  {
    id: "h5",
    name: "Colosseum Grand Imperial Rome",
    tagline: "Relive the Majesty of Imperial Rome",
    description: "Overlooking the legendary Roman forum and situated in a classic historic palazzo, the Colosseum Grand Imperial brings Roman heritage to life. Adorned with authentic frescoes, exquisite Italian marble, and luxurious furnishings, this hotel offers a majestic gateway to the Eternal City. Dine on our rooftop terrace overlooking the illuminated Colosseum.",
    city: "Rome",
    country: "Italy",
    rating: 4.75,
    reviewsCount: 312,
    price: 340,
    featured: false,
    amenities: ["Free Wifi", "Rooftop Terrace", "Historic Lounge", "Fitness Center", "Bar & Bistro", "Tour Desk", "Bike Rentals"],
    images: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1529260830199-44582981db36?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h5-r1",
        name: "Prestige Heritage Room",
        price: 340,
        capacity: 2,
        beds: "1 Double Bed",
        size: "38 m²",
        description: "Features restored ceiling frescoes and classic antique furniture with modern bathroom updates.",
        amenities: ["City Ruins View", "Marble Bath", "Smart TV", "Italian Linen", "Mini Bar"],
        images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h5-r2",
        name: "Forum Executive Suite",
        price: 580,
        capacity: 3,
        beds: "1 King Bed, 1 Sofa Bed",
        size: "70 m²",
        description: "A spacious suite featuring high arched windows and a direct, panoramic view of the Roman Forum ruins.",
        amenities: ["Roman Forum View", "Espresso Bar", "Bespoke Bath Amenities", "Soaking Tub", "Complimentary Lounge Access"],
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Giovanni Rossi", rating: 5, date: "June 05, 2026", comment: "The rooftop views are worth every single penny. Eating breakfast while staring at the Roman forum is majestic." },
      { author: "Sarah Jenkins", rating: 4, date: "May 25, 2026", comment: "Excellent service and comfortable rooms. The hotel is close to everything, which made walking around Rome very easy." }
    ]
  },
  {
    id: "h6",
    name: "The Manhattan Skyline Hotel",
    tagline: "Vibrant City Living in Luxury High-Rise",
    description: "Soaring above Manhattan, this architectural masterpiece offers stunning panoramic views of Central Park and the NYC skyline. With ultra-modern design, state-of-the-art room automation, and a rooftop cocktail bar, it encapsulates the high-energy luxury of New York City. Experience premium dining, a massive luxury spa, and immediate access to Broadway.",
    city: "New York",
    country: "USA",
    rating: 4.7,
    reviewsCount: 412,
    price: 410,
    featured: false,
    amenities: ["Free Wifi", "Rooftop Bar", "Indoor Pool", "24/7 Room Service", "Luxury Spa", "Pet Friendly", "Business Center"],
    images: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h6-r1",
        name: "Skyline Deluxe Room",
        price: 410,
        capacity: 2,
        beds: "1 King Bed",
        size: "36 m²",
        description: "Located on floors 30 and above. Features wall-to-wall windows looking out over the midtown skyline.",
        amenities: ["City Skyline View", "Tablet Room Controls", "Rain Shower", "Work Desk", "Espresso Machine"],
        images: ["https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h6-r2",
        name: "Central Park Vista Suite",
        price: 790,
        capacity: 4,
        beds: "2 Queen Beds",
        size: "72 m²",
        description: "Stunning corner suite with expansive views over Central Park. Features a separate designer living room.",
        amenities: ["Central Park View", "Corner Room", "Living Room Suite", "Luxury Bathrobes", "Premium Audio System"],
        images: ["https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Liam O'Connor", rating: 5, date: "June 10, 2026", comment: "The views from the 45th floor were insane. Highly recommend the rooftop cocktails, and the bed felt like sleeping on a cloud." },
      { author: "Diana Prince", rating: 4, date: "May 29, 2026", comment: "Perfect hotel for a business trip or holiday. Central location, ultra-modern tech in the rooms, and very fast room service." }
    ]
  },
  {
    id: "h7",
    name: "Oia Cliffside Villas Santorini",
    tagline: "Chiseled Elegance Facing the Caldera Volcanic Bay",
    description: "Perched on the volcanic cliffs of Santorini, Oia Cliffside Villas offers iconic white-washed architecture overlooking the sapphire Aegean Sea. Relax in your personal infinity pool that merges seamlessly with the sea and sky, dine on fresh Mediterranean seafood on your private terrace, and witness the world's most photographed sunset in perfect tranquility.",
    city: "Santorini",
    country: "Greece",
    rating: 4.9,
    reviewsCount: 204,
    price: 720,
    featured: false,
    amenities: ["Free Wifi", "Private Infinity Pool", "Aegean View", "Sunset Terraces", "Luxury Spa", "Free Breakfast", "Airport Shuttle"],
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h7-r1",
        name: "Cliffside Cave Villa",
        price: 720,
        capacity: 2,
        beds: "1 King Bed",
        size: "55 m²",
        description: "Styled in the traditional cave-house style with smooth white plaster. Features a heated indoor plunge pool and sea-view balcony.",
        amenities: ["Indoor Plunge Pool", "Sea View", "Traditional Cave Design", "Luxury Bedding", "Espresso Maker"],
        images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h7-r2",
        name: "Grand Caldera Infinity Suite",
        price: 1180,
        capacity: 3,
        beds: "1 King Bed, 1 Daybed",
        size: "95 m²",
        description: "Features a massive cliffside terrace, private outdoor infinity pool, outdoor lounge, and direct sunset views over the Caldera.",
        amenities: ["Private Infinity Pool", "Caldera Sunset View", "Private Terrace Bar", "Pre-stocked Wine Cave", "24/7 VIP Concierge"],
        images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Helena Pappas", rating: 5, date: "June 08, 2026", comment: "Stunning. The cave room was so cool, and the private infinity pool made us never want to leave the suite." },
      { author: "Michael Chang", rating: 4.8, date: "June 01, 2026", comment: "Outstanding service. The breakfast spread served on our private terrace was incredible. Perfect honeymoon spot." }
    ]
  },
  {
    id: "h8",
    name: "Ubud Rainforest Sanctuary Bali",
    tagline: "Eco-Luxe Spiritual Sanctuary in the Jungle Canopy",
    description: "Nestled in the lush tropical rainforest of Ubud, this sanctuary is designed to reconnect your soul with nature. Constructed with sustainable bamboo and local volcanic stones, the resort features an multi-tiered infinity pool overlooking the river valley, open-air yoga shalas, and a holistic wellness center offering Ayurvedic treatments.",
    city: "Bali",
    country: "Indonesia",
    rating: 4.92,
    reviewsCount: 228,
    price: 290,
    featured: false,
    amenities: ["Free Wifi", "Multi-tier Pool", "Yoga Shala", "Holistic Spa", "Organic Dining", "Nature Excursions", "Quiet Zones"],
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1537953773315-08114d614e6e?auto=format&fit=crop&w=1200&q=85"
    ],
    rooms: [
      {
        id: "h8-r1",
        name: "Rainforest Canopy Suite",
        price: 290,
        capacity: 2,
        beds: "1 Canopy King Bed",
        size: "60 m²",
        description: "Open-concept suite styled with local teakwood. Features an outdoor stone bath surrounded by tropical ferns.",
        amenities: ["Forest View", "Outdoor Bath", "Private Balcony", "Organic Toiletries", "Yoga Mat Included"],
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85"]
      },
      {
        id: "h8-r2",
        name: "Valley Edge Villa with Private Pool",
        price: 520,
        capacity: 4,
        beds: "2 Canopy King Beds",
        size: "120 m²",
        description: "Perched directly over the edge of the river valley. Includes a private infinity pool, massive outdoor deck, and outdoor rain showers.",
        amenities: ["Private Pool", "River Valley View", "Outdoor Lounge", "Private Chef Dining option", "Ayurvedic Massage in Villa"],
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=85"]
      }
    ],
    reviews: [
      { author: "Clara Oswald", rating: 5, date: "May 29, 2026", comment: "Pure magic. Waking up to the sounds of the jungle and the river was spiritual. The staff was warm and so kind." },
      { author: "David Tennant", rating: 4.8, date: "May 10, 2026", comment: "The valley views are breathtaking. Outdoor stone bath was a treat. Fantastic yoga classes every morning." }
    ]
  }
];
