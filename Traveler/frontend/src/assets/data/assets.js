// data/index.js
// Tertata per-kelompok + tetap mengekspor per-entity untuk kompatibilitas.

//
// ===============================
// TRANSPORTATION (AIR/RAIL/ROAD/SEA/RENTAL)
// ===============================
export const airlines = [
  {
    id: 'AL-GIA',
    name: 'Garuda Indonesia',
    code: 'GA',
    logo: '/assets/images/airlines/garuda.png',
    country: 'ID',
    rating: 4.7,
    amenities: ['meal', 'baggage', 'wifi', 'entertainment'],
    status: 'active',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'AL-LNI',
    name: 'Lion Air',
    code: 'JT',
    logo: '/assets/images/airlines/lion.png',
    country: 'ID',
    rating: 3.9,
    amenities: ['baggage'],
    status: 'active',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'AL-BTK',
    name: 'Batik Air',
    code: 'ID',
    logo: '/assets/images/airlines/batik.png',
    country: 'ID',
    rating: 4.2,
    amenities: ['meal', 'baggage', 'wifi'],
    status: 'active',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'AL-AAX',
    name: 'AirAsia',
    code: 'AK',
    logo: '/assets/images/airlines/airasia.png',
    country: 'MY',
    rating: 4.0,
    amenities: ['baggage'],
    status: 'active',
    updatedAt: '2025-01-01T00:00:00Z'
  }
];

export const flights = [
  {
    id: 'FL-001',
    airlineId: 'AL-GIA',
    flightNumber: 'GA402',
    origin: 'CGK',
    destination: 'DPS',
    departureTime: '2025-10-05T07:30:00+07:00',
    arrivalTime: '2025-10-05T10:15:00+08:00',
    durationMinutes: 165,
    aircraft: 'Boeing 737-800',
    seatClasses: [
      { class: 'economy', seats: 120, price: 1550000, baggageKg: 20 },
      { class: 'business', seats: 16, price: 4350000, baggageKg: 30 }
    ],
    status: 'scheduled'
  },
  {
    id: 'FL-002',
    airlineId: 'AL-LNI',
    flightNumber: 'JT760',
    origin: 'CGK',
    destination: 'JOG',
    departureTime: '2025-10-05T14:20:00+07:00',
    arrivalTime: '2025-10-05T15:35:00+07:00',
    durationMinutes: 75,
    aircraft: 'Boeing 737-900ER',
    seatClasses: [
      { class: 'economy', seats: 189, price: 850000, baggageKg: 20 }
    ],
    status: 'scheduled'
  },
  {
    id: 'FL-003',
    airlineId: 'AL-BTK',
    flightNumber: 'ID6140',
    origin: 'CGK',
    destination: 'BDO',
    departureTime: '2025-10-05T16:45:00+07:00',
    arrivalTime: '2025-10-05T18:10:00+07:00',
    durationMinutes: 85,
    aircraft: 'Airbus A320',
    seatClasses: [
      { class: 'economy', seats: 150, price: 980000, baggageKg: 20 }
    ],
    status: 'scheduled'
  }
];

export const trains = [
  {
    id: 'TR-KAI-ARGO_PARAHYANGAN',
    operator: 'KAI',
    name: 'Argo Parahyangan',
    classes: ['executive', 'premium'],
    amenities: ['ac', 'power-port', 'wifi', 'meal'],
    status: 'active'
  },
  {
    id: 'TR-KAI-GAJAYANA',
    operator: 'KAI',
    name: 'Gajayana',
    classes: ['executive', 'business'],
    amenities: ['ac', 'power-port', 'wifi'],
    status: 'active'
  },
  {
    id: 'TR-WHOOSH-001',
    operator: 'Whoosh',
    name: 'Whoosh High Speed Rail',
    classes: ['premium', 'first'],
    amenities: ['ac', 'power-port', 'wifi', 'meal', 'entertainment'],
    status: 'active'
  }
];

export const trainTrips = [
  {
    id: 'TT-001',
    trainId: 'TR-KAI-ARGO_PARAHYANGAN',
    tripNumber: 'AP-56',
    origin: 'GMR',
    destination: 'BD',
    departureTime: '2025-10-05T08:00:00+07:00',
    arrivalTime: '2025-10-05T11:05:00+07:00',
    durationMinutes: 185,
    seatClasses: [
      { class: 'executive', seats: 200, price: 420000 },
      { class: 'premium', seats: 250, price: 285000 }
    ],
    status: 'scheduled'
  },
  {
    id: 'TT-002',
    trainId: 'TR-KAI-GAJAYANA',
    tripNumber: 'GY-1',
    origin: 'GMR',
    destination: 'ML',
    departureTime: '2025-10-05T19:30:00+07:00',
    arrivalTime: '2025-10-06T06:45:00+07:00',
    durationMinutes: 675,
    seatClasses: [
      { class: 'executive', seats: 120, price: 550000 },
      { class: 'business', seats: 180, price: 390000 }
    ],
    status: 'scheduled'
  },
  {
    id: 'TT-003',
    trainId: 'TR-WHOOSH-001',
    tripNumber: 'WH-101',
    origin: 'GMR',
    destination: 'BD',
    departureTime: '2025-10-05T09:15:00+07:00',
    arrivalTime: '2025-10-05T10:00:00+07:00',
    durationMinutes: 45,
    seatClasses: [
      { class: 'premium', seats: 300, price: 350000 },
      { class: 'first', seats: 100, price: 500000 }
    ],
    status: 'scheduled'
  }
];

export const buses = [
  {
    id: 'BS-SINARJAYA-001',
    operator: 'Sinar Jaya',
    category: 'AKAP',
    facilities: ['ac', 'reclining-seat', 'toilet', 'wifi'],
    rating: 4.2,
    status: 'active'
  },
  {
    id: 'BS-LORENA-001',
    operator: 'Lorena',
    category: 'AKAP',
    facilities: ['ac', 'reclining-seat', 'entertainment'],
    rating: 4.0,
    status: 'active'
  },
  {
    id: 'BS-PAHALA-001',
    operator: 'Pahala Kencana',
    category: 'AKAP',
    facilities: ['ac', 'reclining-seat', 'meal', 'toilet'],
    rating: 4.3,
    status: 'active'
  }
];

export const busTrips = [
  {
    id: 'BT-001',
    busId: 'BS-SINARJAYA-001',
    routeCode: 'JKT-BDG',
    origin: 'PULO_GEBANG',
    destination: 'BDG_CICAHEUM',
    departureTime: '2025-10-05T09:00:00+07:00',
    arrivalTime: '2025-10-05T13:30:00+07:00',
    price: 185000,
    seatsTotal: 32,
    seatsAvailable: 18,
    status: 'scheduled'
  },
  {
    id: 'BT-002',
    busId: 'BS-LORENA-001',
    routeCode: 'JKT-SBY',
    origin: 'KAMPUNG_RAMBUTAN',
    destination: 'SBY_PURABAYA',
    departureTime: '2025-10-05T20:00:00+07:00',
    arrivalTime: '2025-10-06T08:30:00+07:00',
    price: 320000,
    seatsTotal: 28,
    seatsAvailable: 12,
    status: 'scheduled'
  },
  {
    id: 'BT-003',
    busId: 'BS-PAHALA-001',
    routeCode: 'JKT-YK',
    origin: 'LEBAK_BULUS',
    destination: 'YK_GIWANGAN',
    departureTime: '2025-10-05T21:30:00+07:00',
    arrivalTime: '2025-10-06T05:00:00+07:00',
    price: 275000,
    seatsTotal: 30,
    seatsAvailable: 22,
    status: 'scheduled'
  }
];

export const ships = [
  {
    id: 'SH-ASDP-001',
    operator: 'ASDP',
    name: 'KMP Nusa Bakti',
    type: 'ferry',
    capacityPassengers: 400,
    capacityVehicles: 60,
    facilities: ['ac-cabin', 'cafeteria', 'prayer-room'],
    status: 'active'
  },
  {
    id: 'SH-PELNI-001',
    operator: 'Pelni',
    name: 'KM Bukit Raya',
    type: 'passenger',
    capacityPassengers: 1200,
    capacityVehicles: 0,
    facilities: ['cabin', 'restaurant', 'clinic', 'mosque'],
    status: 'active'
  },
  {
    id: 'SH-ASDP-002',
    operator: 'ASDP',
    name: 'KMP Dharma Kartika',
    type: 'ferry',
    capacityPassengers: 350,
    capacityVehicles: 45,
    facilities: ['ac-cabin', 'cafeteria'],
    status: 'active'
  }
];

export const shipTrips = [
  {
    id: 'SP-001',
    shipId: 'SH-ASDP-001',
    routeCode: 'KETAPANG-GILIMANUK',
    origin: 'KTG',
    destination: 'GLM',
    departureTime: '2025-10-05T10:00:00+07:00',
    arrivalTime: '2025-10-05T11:15:00+08:00',
    passengerPrice: 75000,
    vehiclePrices: [
      { type: 'motorcycle', price: 95000 },
      { type: 'car', price: 350000 },
      { type: 'truck', price: 650000 }
    ],
    status: 'boarding'
  },
  {
    id: 'SP-002',
    shipId: 'SH-PELNI-001',
    routeCode: 'TJP-MKS',
    origin: 'TJP',
    destination: 'MKS',
    departureTime: '2025-10-05T16:00:00+07:00',
    arrivalTime: '2025-10-07T08:00:00+08:00',
    passengerPrice: 280000,
    cabinPrices: [
      { class: 'economy', price: 450000 },
      { class: 'business', price: 680000 },
      { class: 'first', price: 950000 }
    ],
    status: 'scheduled'
  }
];

export const rentals = [
  {
    id: 'RT-TRAC-AVANZA-001',
    provider: 'Trac',
    vehicle: 'Toyota Avanza',
    transmission: 'automatic',
    seats: 7,
    withDriver: true,
    pricePerDay: 550000,
    city: 'Jakarta',
    features: ['ac', 'gps', 'insurance'],
    status: 'available'
  },
  {
    id: 'RT-HERTZ-INNOVA-001',
    provider: 'Hertz',
    vehicle: 'Toyota Innova Reborn',
    transmission: 'automatic',
    seats: 8,
    withDriver: true,
    pricePerDay: 750000,
    city: 'Bali',
    features: ['ac', 'gps', 'insurance', 'wifi'],
    status: 'available'
  },
  {
    id: 'RT-TRAC-XENIA-001',
    provider: 'Trac',
    vehicle: 'Daihatsu Xenia',
    transmission: 'manual',
    seats: 7,
    withDriver: false,
    pricePerDay: 350000,
    city: 'Bandung',
    features: ['ac', 'insurance'],
    status: 'available'
  }
];

export const routes = [
  // Air Routes
  { code: 'CGK-DPS', origin: 'CGK', destination: 'DPS', distanceKm: 983, type: 'air' },
  { code: 'CGK-JOG', origin: 'CGK', destination: 'JOG', distanceKm: 435, type: 'air' },
  { code: 'CGK-BDO', origin: 'CGK', destination: 'BDO', distanceKm: 542, type: 'air' },

  // Rail Routes
  { code: 'GMR-BD', origin: 'GMR', destination: 'BD', distanceKm: 150, type: 'rail' },
  { code: 'GMR-ML', origin: 'GMR', destination: 'ML', distanceKm: 800, type: 'rail' },

  // Road Routes
  { code: 'JKT-BDG', origin: 'JKT', destination: 'BDG', distanceKm: 150, type: 'road' },
  { code: 'JKT-SBY', origin: 'JKT', destination: 'SBY', distanceKm: 750, type: 'road' },
  { code: 'JKT-YK', origin: 'JKT', destination: 'YK', distanceKm: 560, type: 'road' },

  // Sea Routes
  { code: 'KETAPANG-GILIMANUK', origin: 'KTG', destination: 'GLM', distanceKm: 3, type: 'sea' },
  { code: 'TJP-MKS', origin: 'TJP', destination: 'MKS', distanceKm: 1200, type: 'sea' }
];

// ---------- Grouping Transportation ----------
export const transportation = {
  airlines,
  flights,
  trains,
  trainTrips,
  buses,
  busTrips,
  ships,
  shipTrips,
  rentals,
  routes
};


//
// ===============================
// DESTINATIONS
// ===============================
export const destinationCategories = [
  { id: 'CAT-BEACH', name: 'Pantai', icon: '🏖️', color: '#3B82F6' },
  { id: 'CAT-CULTURE', name: 'Budaya', icon: '🏯', color: '#8B5CF6' },
  { id: 'CAT-NATURE', name: 'Alam', icon: '⛰️', color: '#10B981' },
  { id: 'CAT-URBAN', name: 'Kota', icon: '🏙️', color: '#F59E0B' },
  { id: 'CAT-ADVENTURE', name: 'Petualangan', icon: '🏔️', color: '#EF4444' },
  { id: 'CAT-CULINARY', name: 'Kuliner', icon: '🍜', color: '#EC4899' }
];

export const destinations = [
  {
    id: 'DST-BALI-001',
    name: 'Pantai Kuta',
    categoryId: 'CAT-BEACH',
    city: 'Badung',
    province: 'Bali',
    rating: 4.6,
    priceRange: '50000-200000',
    tags: ['surf', 'sunset', 'shopping'],
    images: ['/assets/images/destinations/kuta1.jpg', '/assets/images/destinations/kuta2.jpg'],
    description: 'Pantai dengan ombak yang cocok untuk surfing dan sunset yang menawan',
    status: 'active'
  },
  {
    id: 'DST-JOGJA-001',
    name: 'Candi Prambanan',
    categoryId: 'CAT-CULTURE',
    city: 'Sleman',
    province: 'DI Yogyakarta',
    rating: 4.8,
    priceRange: '30000-50000',
    tags: ['heritage', 'UNESCO', 'hindu'],
    images: ['/assets/images/destinations/prambanan.jpg'],
    description: 'Kompleks candi Hindu terbesar di Indonesia yang merupakan Situs Warisan Dunia UNESCO',
    status: 'active'
  },
  {
    id: 'DST-BANDUNG-001',
    name: 'Tangkuban Perahu',
    categoryId: 'CAT-NATURE',
    city: 'Subang',
    province: 'Jawa Barat',
    rating: 4.4,
    priceRange: '25000-40000',
    tags: ['volcano', 'crater', 'mountain'],
    images: ['/assets/images/destinations/tangkuban.jpg'],
    description: 'Gunung berapi aktif dengan kawah yang dapat dikunjungi wisatawan',
    status: 'active'
  },
  {
    id: 'DST-FLORES-001',
    name: 'Pulau Komodo',
    categoryId: 'CAT-ADVENTURE',
    city: 'Manggarai Barat',
    province: 'Nusa Tenggara Timur',
    rating: 4.9,
    priceRange: '500000-1500000',
    tags: ['komodo-dragon', 'UNESCO', 'diving', 'trekking'],
    images: ['/assets/images/destinations/komodo.jpg'],
    description: 'Habitat asli komodo dragon dan spot diving terbaik dunia',
    status: 'active'
  },
  {
    id: 'DST-ACEH-001',
    name: 'Masjid Raya Baiturrahman',
    categoryId: 'CAT-CULTURE',
    city: 'Banda Aceh',
    province: 'Aceh',
    rating: 4.7,
    priceRange: '0-10000',
    tags: ['islamic', 'heritage', 'architecture'],
    images: ['/assets/images/destinations/baiturrahman.jpg'],
    description: 'Masjid bersejarah dengan arsitektur yang memukau di pusat kota Banda Aceh',
    status: 'active'
  }
];

// ---------- Grouping Destinations ----------
export const destinationData = {
  categories: destinationCategories,
  list: destinations
};


//
// ===============================
// COMMERCE (PROMO, COMBO, PRICING RULES)
// ===============================
export const promos = [
  {
    id: 'PR-OKT25-01',
    code: 'OKTOBERHEMAT',
    title: 'Diskon Oktober 15%',
    description: 'Hemat hingga 15% untuk semua pemesanan transportasi',
    type: 'percentage',
    value: 15,
    maxDiscount: 150000,
    minSpend: 500000,
    appliesTo: ['flight', 'train'],
    startDate: '2025-10-01',
    endDate: '2025-10-31',
    quota: 1000,
    used: 120,
    status: 'active',
    image: '/assets/images/promos/oktober-hemat.jpg'
  },
  {
    id: 'PR-COMBO-01',
    code: 'COMBODEAL',
    title: 'Combo Package 20% OFF',
    description: 'Diskon khusus untuk paket combo transportasi + destinasi',
    type: 'percentage',
    value: 20,
    maxDiscount: 300000,
    minSpend: 1000000,
    appliesTo: ['combo'],
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    quota: 500,
    used: 45,
    status: 'active',
    image: '/assets/images/promos/combo-deal.jpg'
  },
  {
    id: 'PR-NEWUSER-01',
    code: 'WELCOME50',
    title: 'Welcome Bonus Rp 50.000',
    description: 'Bonus untuk pengguna baru',
    type: 'fixed',
    value: 50000,
    maxDiscount: 50000,
    minSpend: 200000,
    appliesTo: ['flight', 'train', 'bus', 'ship'],
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    quota: 2000,
    used: 234,
    status: 'active',
    image: '/assets/images/promos/welcome.jpg'
  }
];

export const comboPackages = [
  {
    id: 'CB-BALI-FLIGHT-BEACH-001',
    name: 'Bali Paradise Package',
    description: 'Penerbangan Jakarta-Bali + Tour Pantai Kuta',
    components: [
      { type: 'flight', refId: 'FL-001', quantity: 1 },
      { type: 'destination', refId: 'DST-BALI-001', quantity: 1 }
    ],
    basePrice: 2450000,
    discountPercent: 10,
    finalPrice: 2205000,
    duration: '3D2N',
    includes: ['Round trip flight', 'Airport transfer', 'Beach tour', 'Hotel breakfast'],
    image: '/assets/images/combos/bali-paradise.jpg',
    status: 'active'
  },
  {
    id: 'CB-JOGJA-TRAIN-CULTURE-001',
    name: 'Yogyakarta Cultural Experience',
    description: 'Kereta Jakarta-Yogya + Wisata Budaya Prambanan',
    components: [
      { type: 'train', refId: 'TT-001', quantity: 1 },
      { type: 'destination', refId: 'DST-JOGJA-001', quantity: 1 }
    ],
    basePrice: 1200000,
    discountPercent: 15,
    finalPrice: 1020000,
    duration: '2D1N',
    includes: ['Train ticket', 'Station transfer', 'Temple tour', 'Local guide'],
    image: '/assets/images/combos/jogja-culture.jpg',
    status: 'active'
  },
  {
    id: 'CB-BANDUNG-BUS-NATURE-001',
    name: 'Bandung Highland Adventure',
    description: 'Bus Jakarta-Bandung + Tour Tangkuban Perahu',
    components: [
      { type: 'bus', refId: 'BT-001', quantity: 1 },
      { type: 'destination', refId: 'DST-BANDUNG-001', quantity: 1 }
    ],
    basePrice: 450000,
    discountPercent: 12,
    finalPrice: 396000,
    duration: '2D1N',
    includes: ['Bus ticket', 'Mountain tour', 'Hot spring visit', 'Local snacks'],
    image: '/assets/images/combos/bandung-highland.jpg',
    status: 'active'
  },
  {
    id: 'CB-FLORES-FLIGHT-KOMODO-001',
    name: 'Labuan Bajo Komodo Adventure',
    description: 'Flight + Komodo Island Tour Package',
    components: [
      { type: 'flight', refId: 'FL-003', quantity: 1 },
      { type: 'destination', refId: 'DST-FLORES-001', quantity: 1 }
    ],
    basePrice: 4500000,
    discountPercent: 8,
    finalPrice: 4140000,
    duration: '4D3N',
    includes: ['Round trip flight', 'Boat tour', 'Komodo trekking', 'Snorkeling', 'Full board meals'],
    image: '/assets/images/combos/komodo-adventure.jpg',
    status: 'active'
  }
];

export const pricingRules = [
  {
    id: 'PRULE-PEAK-1',
    name: 'Peak Season Surcharge',
    appliesTo: 'flight',
    dateRange: { start: '2025-12-15', end: '2026-01-05' },
    adjustmentType: 'percent',
    adjustmentValue: 20,
    description: 'Surcharge untuk musim liburan akhir tahun'
  },
  {
    id: 'PRULE-EARLY-BIRD',
    name: 'Early Bird Discount',
    appliesTo: 'all',
    bookingAdvanceDays: 30,
    adjustmentType: 'percent',
    adjustmentValue: -10,
    description: 'Diskon untuk pemesanan 30 hari sebelumnya'
  },
  {
    id: 'PRULE-WEEKEND-TRAIN',
    name: 'Weekend Train Premium',
    appliesTo: 'train',
    dayOfWeek: ['friday', 'saturday', 'sunday'],
    adjustmentType: 'percent',
    adjustmentValue: 15,
    description: 'Premium untuk perjalanan kereta di akhir pekan'
  }
];

// ---------- Grouping Commerce ----------
export const commerce = {
  promos,
  comboPackages,
  pricingRules
};


//
// ===============================
// USERS & SOCIAL (USERS/REVIEWS/BOOKINGS)
// ===============================
export const users = [
  {
    id: 'USR-001',
    name: 'Demo User',
    email: 'demo@example.com',
    phone: '+628111111111',
    role: 'customer',
    profilePhoto: '/assets/images/profiles/demo-user.jpg',
    verified: true,
    preferences: {
      notifications: true,
      newsletter: true,
      currency: 'IDR',
      language: 'id'
    },
    createdAt: '2025-01-01T00:00:00Z',
    status: 'active'
  },
  {
    id: 'USR-002',
    name: 'Admin User',
    email: 'admin@traveler.com',
    phone: '+628222222222',
    role: 'admin',
    profilePhoto: '/assets/images/profiles/admin-user.jpg',
    verified: true,
    createdAt: '2025-01-01T00:00:00Z',
    status: 'active'
  }
];

export const reviews = [
  {
    id: 'RV-001',
    userId: 'USR-001',
    targetType: 'destination',
    targetId: 'DST-BALI-001',
    rating: 5,
    title: 'Pantai yang menakjubkan!',
    comment: 'Sangat indah dan bersih! Sunset di Pantai Kuta benar-benar tak terlupakan.',
    images: ['/assets/images/reviews/kuta-review1.jpg'],
    helpful: 23,
    createdAt: '2025-09-20T10:00:00Z',
    verified: true
  },
  {
    id: 'RV-002',
    userId: 'USR-001',
    targetType: 'airline',
    targetId: 'AL-GIA',
    rating: 5,
    title: 'Pelayanan excellent',
    comment: 'Garuda Indonesia selalu memberikan pelayanan terbaik. Makanan enak, kursi nyaman.',
    helpful: 18,
    createdAt: '2025-09-18T15:30:00Z',
    verified: true
  },
  {
    id: 'RV-003',
    userId: 'USR-001',
    targetType: 'destination',
    targetId: 'DST-JOGJA-001',
    rating: 5,
    title: 'Warisan budaya yang luar biasa',
    comment: 'Candi Prambanan sangat memukau. Guide lokal sangat informatif tentang sejarahnya.',
    helpful: 15,
    createdAt: '2025-09-15T08:45:00Z',
    verified: true
  }
];

export const bookings = [
  {
    id: 'BK-001',
    userId: 'USR-001',
    type: 'combo',
    referenceId: 'CB-BALI-FLIGHT-BEACH-001',
    bookingDate: '2025-09-25T10:00:00Z',
    travelDate: '2025-10-15T07:30:00Z',
    passengers: [
      {
        name: 'Demo User',
        title: 'Mr',
        idNumber: '1234567890123456',
        phone: '+628111111111',
        email: 'demo@example.com',
        type: 'adult'
      }
    ],
    totalAmount: 2205000,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    promoCode: 'COMBODEAL',
    discountAmount: 245000,
    paymentMethod: 'credit_card'
  },
  {
    id: 'BK-002',
    userId: 'USR-001',
    type: 'flight',
    referenceId: 'FL-002',
    bookingDate: '2025-09-20T14:30:00Z',
    travelDate: '2025-10-10T14:20:00Z',
    passengers: [
      {
        name: 'Demo User',
        title: 'Mr',
        idNumber: '1234567890123456',
        phone: '+628111111111',
        email: 'demo@example.com',
        type: 'adult'
      }
    ],
    seatClass: 'economy',
    totalAmount: 850000,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    paymentMethod: 'bank_transfer'
  }
];

// ---------- Grouping Users ----------
export const userData = {
  users,
  reviews,
  bookings
};


//
// ===============================
// MISC / CONFIG / CONTENT
// ===============================
export const faq = [
  {
    id: 'FAQ-001',
    category: 'booking',
    question: 'Bagaimana cara melakukan refund?',
    answer: 'Untuk melakukan refund, silakan hubungi customer service kami melalui email atau telepon. Syarat dan ketentuan refund berbeda tergantung jenis tiket dan waktu pembatalan.'
  },
  {
    id: 'FAQ-002',
    category: 'booking',
    question: 'Apakah bisa reschedule tiket?',
    answer: 'Reschedule tiket tergantung pada syarat dan ketentuan dari masing-masing operator transportasi dan ketersediaan kursi pada jadwal yang diinginkan.'
  },
  {
    id: 'FAQ-003',
    category: 'payment',
    question: 'Metode pembayaran apa saja yang tersedia?',
    answer: 'Kami menerima pembayaran melalui transfer bank, kartu kredit, e-wallet (OVO, GoPay, Dana), dan virtual account dari berbagai bank.'
  },
  {
    id: 'FAQ-004',
    category: 'combo',
    question: 'Apa keuntungan dari combo package?',
    answer: 'Combo package memberikan kemudahan booking sekaligus dan diskon khusus dibanding booking terpisah. Anda juga mendapat itinerary yang sudah tersusun dengan baik.'
  },
  {
    id: 'FAQ-005',
    category: 'general',
    question: 'Bagaimana cara menghubungi customer service?',
    answer: 'Customer service kami dapat dihubungi melalui email support@traveler.com, telepon 021-12345678, atau live chat di website ini (tersedia 24/7).'
  }
];

export const settings = {
  app: {
    name: 'Traveler',
    version: '1.0.0',
    description: 'Platform booking transportasi dan destinasi wisata terpercaya'
  },
  locale: {
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
    dateFormat: 'DD-MM-YYYY',
    language: 'id'
  },
  contact: {
    supportEmail: 'support@traveler.com',
    supportPhone: '+62-21-12345678',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat 10110',
    socialMedia: {
      facebook: 'https://facebook.com/traveler.id',
      instagram: 'https://instagram.com/traveler.id',
      twitter: 'https://twitter.com/traveler_id'
    }
  },
  business: {
    operatingHours: '24/7',
    customerServiceHours: '08:00 - 22:00 WIB',
    headquarters: 'Jakarta, Indonesia'
  },
  features: {
    liveChat: true,
    multiLanguage: false,
    darkMode: true,
    notifications: true,
    geolocation: true
  }
};

export const navbarLinks = [
  { label: 'Home', path: '/', icon: 'home', description: 'Halaman utama' },
  { label: 'Promo', path: '/promo', icon: 'percent', description: 'Penawaran dan diskon menarik' },
  { label: 'Destinasi', path: '/combo', icon: 'map-pin', description: 'Paket wisata dan destinasi' },
  { label: 'Transportasi', path: '/transportation', icon: 'truck', description: 'Booking transportasi' },
  { label: 'Bantuan', path: '/help', icon: 'help-circle', description: 'FAQ dan customer service' }
];

export const locations = [
  // Airports
  { code: 'CGK', name: 'Soekarno-Hatta International Airport', city: 'Jakarta', type: 'airport' },
  { code: 'DPS', name: 'Ngurah Rai International Airport', city: 'Denpasar', type: 'airport' },
  { code: 'JOG', name: 'Yogyakarta International Airport', city: 'Yogyakarta', type: 'airport' },
  { code: 'BDO', name: 'Husein Sastranegara Airport', city: 'Bandung', type: 'airport' },

  // Train Stations
  { code: 'GMR', name: 'Stasiun Gambir', city: 'Jakarta', type: 'train_station' },
  { code: 'BD', name: 'Stasiun Bandung', city: 'Bandung', type: 'train_station' },
  { code: 'ML', name: 'Stasiun Malang', city: 'Malang', type: 'train_station' },

  // Bus Terminals
  { code: 'PULO_GEBANG', name: 'Terminal Pulo Gebang', city: 'Jakarta', type: 'bus_terminal' },
  { code: 'BDG_CICAHEUM', name: 'Terminal Cicaheum', city: 'Bandung', type: 'bus_terminal' },
  { code: 'KAMPUNG_RAMBUTAN', name: 'Terminal Kampung Rambutan', city: 'Jakarta', type: 'bus_terminal' },
  { code: 'SBY_PURABAYA', name: 'Terminal Purabaya', city: 'Surabaya', type: 'bus_terminal' },
  { code: 'LEBAK_BULUS', name: 'Terminal Lebak Bulus', city: 'Jakarta', type: 'bus_terminal' },
  { code: 'YK_GIWANGAN', name: 'Terminal Giwangan', city: 'Yogyakarta', type: 'bus_terminal' },

  // Ports
  { code: 'KTG', name: 'Pelabuhan Ketapang', city: 'Banyuwangi', type: 'port' },
  { code: 'GLM', name: 'Pelabuhan Gilimanuk', city: 'Jembrana', type: 'port' },
  { code: 'TJP', name: 'Pelabuhan Tanjung Priok', city: 'Jakarta', type: 'port' },
  { code: 'MKS', name: 'Pelabuhan Makassar', city: 'Makassar', type: 'port' }
];

// ---------- Grouping Misc ----------
export const misc = {
  faq,
  settings,
  navbarLinks,
  locations
};


//
// ===============================
// AGGREGATED NAMESPACE (opsional)
// ===============================
export const dataset = {
  transportation,
  destination: destinationData,
  commerce,
  users: userData,
  misc
};
