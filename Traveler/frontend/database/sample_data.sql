-- ==============================================
-- SAMPLE DATA FOR TRAVELER DATABASE
-- ==============================================

-- Locations (Bandara, Stasiun, Terminal, Pelabuhan)
INSERT INTO locations (id, name, code, type, address, city, province, country, coordinates, facilities, is_active) VALUES
-- Bandara
('LOC-CGKAIRPORT', 'Soekarno-Hatta International Airport', 'CGK', 'airport', 'Pajang, Benda, Tangerang City', 'Tangerang', 'Banten', 'Indonesia', '{"lat": -6.1275, "lng": 106.6537}', '["wifi", "lounge", "food_court", "atm", "parking"]', TRUE),
('LOC-JOGAIRPORT', 'Yogyakarta International Airport', 'YIA', 'airport', 'Jl. Raya Palagan Tentara Pelajar', 'Yogyakarta', 'DI Yogyakarta', 'Indonesia', '{"lat": -7.9004, "lng": 110.0537}', '["wifi", "lounge", "food_court", "car_rental"]', TRUE),
('LOC-DPSAIRPORT', 'Ngurah Rai International Airport', 'DPS', 'airport', 'Jl. Raya Gusti Ngurah Rai', 'Denpasar', 'Bali', 'Indonesia', '{"lat": -8.7467, "lng": 115.1669}', '["wifi", "lounge", "duty_free", "spa"]', TRUE),
('LOC-MLGAIRPORT', 'Abdul Rachman Saleh Airport', 'MLG', 'airport', 'Jl. Raya Malang-Kepanjen', 'Malang', 'Jawa Timur', 'Indonesia', '{"lat": -7.9266, "lng": 112.7145}', '["wifi", "parking", "food_court"]', TRUE),

-- Stasiun Kereta
('LOC-GMRSTATION', 'Stasiun Gambir', 'GMR', 'train_station', 'Jl. Medan Merdeka Timur No.1', 'Jakarta Pusat', 'DKI Jakarta', 'Indonesia', '{"lat": -6.1744, "lng": 106.8294}', '["wifi", "waiting_room", "food_court", "atm"]', TRUE),
('LOC-YOGSTATION', 'Stasiun Yogyakarta', 'YK', 'train_station', 'Jl. Pasar Kembang No.1', 'Yogyakarta', 'DI Yogyakarta', 'Indonesia', '{"lat": -7.7891, "lng": 110.3641}', '["wifi", "waiting_room", "parking"]', TRUE),
('LOC-MLGSTATION', 'Stasiun Malang', 'ML', 'train_station', 'Jl. Stasiun No.1', 'Malang', 'Jawa Timur', 'Indonesia', '{"lat": -7.9778, "lng": 112.6304}', '["waiting_room", "parking", "food_court"]', TRUE),
('LOC-SBYSTATION', 'Stasiun Surabaya Gubeng', 'SGU', 'train_station', 'Jl. Gubeng Pojok No.1', 'Surabaya', 'Jawa Timur', 'Indonesia', '{"lat": -7.2648, "lng": 112.7519}', '["wifi", "waiting_room", "atm"]', TRUE),

-- Terminal Bus
('LOC-JKTTERMINAL', 'Terminal Kampung Rambutan', 'KMR', 'bus_terminal', 'Jl. Raya Bogor KM.20', 'Jakarta Timur', 'DKI Jakarta', 'Indonesia', '{"lat": -6.3028, "lng": 106.8756}', '["waiting_room", "food_court", "parking", "atm"]', TRUE),
('LOC-YOGTERMINAL', 'Terminal Giwangan', 'GWG', 'bus_terminal', 'Jl. Imogiri Timur KM.4', 'Yogyakarta', 'DI Yogyakarta', 'Indonesia', '{"lat": -7.8326, "lng": 110.3914}', '["waiting_room", "parking", "food_court"]', TRUE),
('LOC-MLGTERMINAL', 'Terminal Arjosari', 'AJS', 'bus_terminal', 'Jl. Raya Kepanjen No.518', 'Malang', 'Jawa Timur', 'Indonesia', '{"lat": -7.9344, "lng": 112.6789}', '["waiting_room", "parking"]', TRUE),
('LOC-SBYTERMINAL', 'Terminal Bungurasih', 'BGR', 'bus_terminal', 'Jl. Raya Waru', 'Surabaya', 'Jawa Timur', 'Indonesia', '{"lat": -7.3387, "lng": 112.7317}', '["waiting_room", "food_court", "atm"]', TRUE),

-- Pelabuhan
('LOC-JKTPORT', 'Pelabuhan Tanjung Priok', 'TPR', 'port', 'Jl. Tanjung Priok', 'Jakarta Utara', 'DKI Jakarta', 'Indonesia', '{"lat": -6.1067, "lng": 106.8806}', '["waiting_room", "parking", "customs"]', TRUE),
('LOC-BALIPORT', 'Pelabuhan Gilimanuk', 'GLM', 'port', 'Jl. Raya Gilimanuk', 'Jembrana', 'Bali', 'Indonesia', '{"lat": -8.1644, "lng": 114.4425}', '["waiting_room", "parking"]', TRUE),
('LOC-LOMBOKPORT', 'Pelabuhan Lembar', 'LMB', 'port', 'Jl. Raya Lembar', 'Lombok Barat', 'Nusa Tenggara Barat', 'Indonesia', '{"lat": -8.7167, "lng": 116.0833}', '["waiting_room", "parking"]', TRUE);

-- Transportation Operators
INSERT INTO transportation_operators (id, name, type, description, logo_url, contact_info, rating, total_reviews, is_active) VALUES
-- Airlines
('OP-GARUDA001', 'Garuda Indonesia', 'pesawat', 'Maskapai penerbangan nasional Indonesia dengan layanan premium', 'https://example.com/garuda-logo.png', '{"phone": "0804-1-807-807", "email": "reservations@garuda-indonesia.com", "website": "https://garuda-indonesia.com"}', 4.5, 15420, TRUE),
('OP-LIONAIR001', 'Lion Air', 'pesawat', 'Maskapai penerbangan low-cost carrier terbesar di Indonesia', 'https://example.com/lionair-logo.png', '{"phone": "0804-1-778-899", "email": "callcenter@lionair.co.id", "website": "https://lionair.co.id"}', 4.2, 8930, TRUE),
('OP-AIRASIA001', 'AirAsia', 'pesawat', 'Maskapai penerbangan low-cost carrier Asia', 'https://example.com/airasia-logo.png', '{"phone": "021-2927-0999", "email": "support@airasia.com", "website": "https://airasia.com"}', 4.3, 6750, TRUE),
('OP-CITILINK001', 'Citilink', 'pesawat', 'Maskapai penerbangan anak perusahaan Garuda Indonesia', 'https://example.com/citilink-logo.png', '{"phone": "0804-1-080-808", "email": "callcenter@citilink.co.id", "website": "https://citilink.co.id"}', 4.1, 4320, TRUE),

-- Train Operators
('OP-KAI001', 'PT Kereta Api Indonesia', 'kereta', 'Perusahaan kereta api nasional Indonesia', 'https://example.com/kai-logo.png', '{"phone": "121", "email": "halo@kai.id", "website": "https://kai.id"}', 4.4, 12500, TRUE),

-- Bus Operators
('OP-PRIMAJASA001', 'PO Primajasa', 'bus', 'Perusahaan otobus terpercaya dengan layanan antar kota', 'https://example.com/primajasa-logo.png', '{"phone": "0251-8324567", "email": "info@primajasa.co.id", "website": "https://primajasa.co.id"}', 4.2, 3420, TRUE),
('OP-HARAPANJAYA001', 'PO Harapan Jaya', 'bus', 'Operator bus dengan armada modern dan nyaman', 'https://example.com/harapanjaya-logo.png', '{"phone": "0341-491234", "email": "info@harapanjaya.co.id", "website": "https://harapanjaya.co.id"}', 4.0, 2180, TRUE),
('OP-AGEMASARI001', 'PO Agra Mas', 'bus', 'Perusahaan otobus dengan rute Jawa-Bali', 'https://example.com/agramas-logo.png', '{"phone": "0274-563456", "email": "reservasi@agramas.co.id", "website": "https://agramas.co.id"}', 4.1, 1890, TRUE),

-- Ship Operators
('OP-PELNI001', 'PT Pelni', 'kapal', 'Perusahaan pelayaran nasional Indonesia', 'https://example.com/pelni-logo.png', '{"phone": "021-633-1962", "email": "cs@pelni.co.id", "website": "https://pelni.co.id"}', 4.0, 5680, TRUE),
('OP-ASDP001', 'ASDP Indonesia Ferry', 'kapal', 'Operator ferry untuk penyeberangan antar pulau', 'https://example.com/asdp-logo.png', '{"phone": "021-191", "email": "info@indonesiaferry.co.id", "website": "https://indonesiaferry.co.id"}', 3.9, 4320, TRUE),

-- Car Rental
('OP-TRAC001', 'Trac Astra Rent a Car', 'mobil', 'Layanan rental mobil terpercaya dengan armada lengkap', 'https://example.com/trac-logo.png', '{"phone": "0804-1-872-872", "email": "cs@trac.astra.co.id", "website": "https://trac.astra.co.id"}', 4.3, 7890, TRUE),
('OP-BLUEBIRDRENT001', 'Blue Bird Rent a Car', 'mobil', 'Layanan rental mobil dari Blue Bird Group', 'https://example.com/bluebird-logo.png', '{"phone": "021-7917-1234", "email": "rentcar@bluebirdgroup.com", "website": "https://bluebirdgroup.com"}', 4.2, 5430, TRUE);

-- Vehicles
INSERT INTO vehicles (id, operator_id, name, type, capacity, features, specifications, is_active) VALUES
-- Pesawat
('VEH-GARUDA-B738-001', 'OP-GARUDA001', 'Boeing 737-800', 'Boeing 737-800', 189, '["wifi", "entertainment", "meal_service", "priority_boarding"]', '{"wingspan": "35.8m", "length": "39.5m", "cruise_speed": "842 km/h", "range": "5765 km"}', TRUE),
('VEH-GARUDA-A330-001', 'OP-GARUDA001', 'Airbus A330-300', 'Airbus A330-300', 275, '["wifi", "entertainment", "meal_service", "lie_flat_seats", "lounge_access"]', '{"wingspan": "60.3m", "length": "63.7m", "cruise_speed": "871 km/h", "range": "11750 km"}', TRUE),
('VEH-LION-B739-001', 'OP-LIONAIR001', 'Boeing 737-900ER', 'Boeing 737-900ER', 215, '["wifi", "entertainment"]', '{"wingspan": "35.8m", "length": "42.1m", "cruise_speed": "842 km/h", "range": "6045 km"}', TRUE),
('VEH-AIRASIA-A320-001', 'OP-AIRASIA001', 'Airbus A320', 'Airbus A320', 180, '["wifi", "entertainment"]', '{"wingspan": "35.8m", "length": "37.6m", "cruise_speed": "833 km/h", "range": "6100 km"}', TRUE),

-- Kereta
('VEH-KAI-ARGO-001', 'OP-KAI001', 'Kereta Argo Bromo Anggrek', 'Kereta Eksekutif', 300, '["ac", "reclining_seats", "meal_service", "wifi", "power_outlet"]', '{"cars": 8, "max_speed": "120 km/h", "facilities": ["restaurant_car", "business_class"]}', TRUE),
('VEH-KAI-TAKSAKA-001', 'OP-KAI001', 'Kereta Taksaka', 'Kereta Eksekutif', 344, '["ac", "reclining_seats", "meal_service", "power_outlet"]', '{"cars": 9, "max_speed": "120 km/h", "facilities": ["restaurant_car"]}', TRUE),
('VEH-KAI-EKONOMI-001', 'OP-KAI001', 'Kereta Ekonomi AC', 'Kereta Ekonomi', 450, '["ac", "standard_seats"]', '{"cars": 12, "max_speed": "90 km/h"}', TRUE),

-- Bus
('VEH-PRIMAJASA-SCANIA-001', 'OP-PRIMAJASA001', 'Scania K360IB', 'Bus Executive', 42, '["ac", "reclining_seats", "wifi", "entertainment", "blanket"]', '{"engine": "DC13 113 360hp", "transmission": "Manual", "facilities": ["toilet", "music_system"]}', TRUE),
('VEH-HARAPANJAYA-HINO-001', 'OP-HARAPANJAYA001', 'Hino RK8', 'Bus Ekonomi AC', 48, '["ac", "standard_seats", "music_system"]', '{"engine": "J08E-VB 240hp", "transmission": "Manual"}', TRUE),
('VEH-AGRAMAS-MERCEDES-001', 'OP-AGEMASARI001', 'Mercedes-Benz OH1626', 'Bus Executive', 40, '["ac", "reclining_seats", "entertainment", "wifi"]', '{"engine": "OM906LA 260hp", "transmission": "Manual", "facilities": ["toilet"]}', TRUE),

-- Kapal
('VEH-PELNI-KM-LAWIT-001', 'OP-PELNI001', 'KM Lawit', 'Kapal Penumpang', 1500, '["restaurant", "cabin_ac", "cabin_economy", "deck_class"]', '{"length": "117m", "width": "17m", "speed": "16 knots", "facilities": ["clinic", "mosque"]}', TRUE),
('VEH-ASDP-KMP-DHARMA-001', 'OP-ASDP001', 'KMP Dharma Rucitra III', 'Ferry', 800, '["vehicle_deck", "passenger_deck", "cafeteria"]', '{"length": "94m", "width": "16m", "speed": "12 knots", "vehicle_capacity": "54 units"}', TRUE),

-- Mobil Rental
('VEH-TRAC-AVANZA-001', 'OP-TRAC001', 'Toyota Avanza 2023', 'MPV', 7, '["ac", "power_steering", "central_lock", "audio_system"]', '{"fuel_type": "Gasoline", "transmission": "Manual", "engine": "1.3L", "fuel_consumption": "13.5 km/l"}', TRUE),
('VEH-TRAC-INNOVA-001', 'OP-TRAC001', 'Toyota Innova Reborn 2023', 'MPV', 7, '["ac", "power_steering", "central_lock", "audio_system", "airbags"]', '{"fuel_type": "Gasoline", "transmission": "Automatic", "engine": "2.0L", "fuel_consumption": "11.8 km/l"}', TRUE),
('VEH-BLUEBIRD-XENIA-001', 'OP-BLUEBIRDRENT001', 'Daihatsu Xenia 2023', 'MPV', 7, '["ac", "power_steering", "central_lock", "audio_system"]', '{"fuel_type": "Gasoline", "transmission": "Manual", "engine": "1.3L", "fuel_consumption": "14.2 km/l"}', TRUE);

-- Routes
INSERT INTO routes (id, origin_id, destination_id, distance, estimated_duration, route_type, is_active) VALUES
-- Flight Routes
('ROUTE-CGK-YIA-001', 'LOC-CGKAIRPORT', 'LOC-JOGAIRPORT', 435, '01:15:00', 'flight', TRUE),
('ROUTE-CGK-DPS-001', 'LOC-CGKAIRPORT', 'LOC-DPSAIRPORT', 1150, '02:15:00', 'flight', TRUE),
('ROUTE-YIA-DPS-001', 'LOC-JOGAIRPORT', 'LOC-DPSAIRPORT', 715, '01:30:00', 'flight', TRUE),
('ROUTE-CGK-MLG-001', 'LOC-CGKAIRPORT', 'LOC-MLGAIRPORT', 725, '01:45:00', 'flight', TRUE),

-- Train Routes
('ROUTE-GMR-YK-001', 'LOC-GMRSTATION', 'LOC-YOGSTATION', 561, '07:45:00', 'train', TRUE),
('ROUTE-GMR-ML-001', 'LOC-GMRSTATION', 'LOC-MLGSTATION', 725, '09:30:00', 'train', TRUE),
('ROUTE-YK-ML-001', 'LOC-YOGSTATION', 'LOC-MLGSTATION', 312, '04:15:00', 'train', TRUE),
('ROUTE-ML-SGU-001', 'LOC-MLGSTATION', 'LOC-SBYSTATION', 90, '02:00:00', 'train', TRUE),

-- Bus Routes
('ROUTE-KMR-GWG-001', 'LOC-JKTTERMINAL', 'LOC-YOGTERMINAL', 561, '10:00:00', 'bus', TRUE),
('ROUTE-GWG-AJS-001', 'LOC-YOGTERMINAL', 'LOC-MLGTERMINAL', 312, '06:00:00', 'bus', TRUE),
('ROUTE-AJS-BGR-001', 'LOC-MLGTERMINAL', 'LOC-SBYTERMINAL', 90, '02:30:00', 'bus', TRUE),
('ROUTE-KMR-BGR-001', 'LOC-JKTTERMINAL', 'LOC-SBYTERMINAL', 825, '14:00:00', 'bus', TRUE),

-- Ferry Routes
('ROUTE-GLM-LMB-001', 'LOC-BALIPORT', 'LOC-LOMBOKPORT', 35, '04:00:00', 'ferry', TRUE);

-- Schedules
INSERT INTO schedules (id, operator_id, vehicle_id, route_id, departure_time, arrival_time, base_price, seat_availability, features, is_active) VALUES
-- Flight Schedules
('SCH-GARUDA-CGK-YIA-001', 'OP-GARUDA001', 'VEH-GARUDA-B738-001', 'ROUTE-CGK-YIA-001', '2024-01-15 06:00:00', '2024-01-15 07:15:00', 850000, '{"economy": 160, "business": 29}', '["meal", "baggage_20kg", "seat_selection"]', TRUE),
('SCH-GARUDA-CGK-YIA-002', 'OP-GARUDA001', 'VEH-GARUDA-B738-001', 'ROUTE-CGK-YIA-001', '2024-01-15 14:30:00', '2024-01-15 15:45:00', 950000, '{"economy": 160, "business": 29}', '["meal", "baggage_20kg", "seat_selection"]', TRUE),
('SCH-LION-CGK-YIA-001', 'OP-LIONAIR001', 'VEH-LION-B739-001', 'ROUTE-CGK-YIA-001', '2024-01-15 08:15:00', '2024-01-15 09:30:00', 650000, '{"economy": 215}', '["baggage_20kg"]', TRUE),
('SCH-GARUDA-CGK-DPS-001', 'OP-GARUDA001', 'VEH-GARUDA-A330-001', 'ROUTE-CGK-DPS-001', '2024-01-15 10:00:00', '2024-01-15 12:15:00', 1250000, '{"economy": 230, "business": 45}', '["meal", "entertainment", "baggage_30kg"]', TRUE),
('SCH-AIRASIA-YIA-DPS-001', 'OP-AIRASIA001', 'VEH-AIRASIA-A320-001', 'ROUTE-YIA-DPS-001', '2024-01-15 13:00:00', '2024-01-15 14:30:00', 720000, '{"economy": 180}', '["baggage_20kg"]', TRUE),

-- Train Schedules
('SCH-KAI-ARGO-GMR-YK-001', 'OP-KAI001', 'VEH-KAI-ARGO-001', 'ROUTE-GMR-YK-001', '2024-01-15 06:00:00', '2024-01-15 13:45:00', 350000, '{"eksekutif": 300}', '["meal", "power_outlet", "wifi"]', TRUE),
('SCH-KAI-TAKSAKA-GMR-ML-001', 'OP-KAI001', 'VEH-KAI-TAKSAKA-001', 'ROUTE-GMR-ML-001', '2024-01-15 07:30:00', '2024-01-15 17:00:00', 420000, '{"eksekutif": 344}', '["meal", "power_outlet"]', TRUE),
('SCH-KAI-EKONOMI-YK-ML-001', 'OP-KAI001', 'VEH-KAI-EKONOMI-001', 'ROUTE-YK-ML-001', '2024-01-15 14:00:00', '2024-01-15 18:15:00', 85000, '{"ekonomi": 450}', '["ac"]', TRUE),

-- Bus Schedules
('SCH-PRIMAJASA-KMR-GWG-001', 'OP-PRIMAJASA001', 'VEH-PRIMAJASA-SCANIA-001', 'ROUTE-KMR-GWG-001', '2024-01-15 20:00:00', '2024-01-16 06:00:00', 120000, '{"executive": 42}', '["meal", "blanket", "wifi"]', TRUE),
('SCH-HARAPANJAYA-GWG-AJS-001', 'OP-HARAPANJAYA001', 'VEH-HARAPANJAYA-HINO-001', 'ROUTE-GWG-AJS-001', '2024-01-15 22:30:00', '2024-01-16 04:30:00', 75000, '{"ekonomi": 48}', '["ac", "music"]', TRUE),
('SCH-AGRAMAS-AJS-BGR-001', 'OP-AGEMASARI001', 'VEH-AGRAMAS-MERCEDES-001', 'ROUTE-AJS-BGR-001', '2024-01-15 16:00:00', '2024-01-15 18:30:00', 45000, '{"executive": 40}', '["ac", "entertainment"]', TRUE),

-- Ferry Schedules
('SCH-ASDP-GLM-LMB-001', 'OP-ASDP001', 'VEH-ASDP-KMP-DHARMA-001', 'ROUTE-GLM-LMB-001', '2024-01-15 08:00:00', '2024-01-15 12:00:00', 25000, '{"deck": 600, "cabin": 200}', '["vehicle_transport", "cafeteria"]', TRUE),
('SCH-ASDP-GLM-LMB-002', 'OP-ASDP001', 'VEH-ASDP-KMP-DHARMA-001', 'ROUTE-GLM-LMB-001', '2024-01-15 14:00:00', '2024-01-15 18:00:00', 25000, '{"deck": 600, "cabin": 200}', '["vehicle_transport", "cafeteria"]', TRUE);

-- Users
INSERT INTO users (id, email, phone, full_name, date_of_birth, gender, address, user_type, is_verified, preferences) VALUES
('USR-001-ADMIN', 'admin@traveler.com', '081234567890', 'Administrator Traveler', '1990-01-01', 'male', '{"street": "Jl. Admin No.1", "city": "Jakarta", "province": "DKI Jakarta", "postal_code": "10110", "country": "Indonesia"}', 'admin', TRUE, '{}'),
('USR-002-JOHN', 'john.doe@email.com', '081234567891', 'John Doe', '1985-03-15', 'male', '{"street": "Jl. Sudirman No.123", "city": "Jakarta", "province": "DKI Jakarta", "postal_code": "12190", "country": "Indonesia"}', 'customer', TRUE, '{"transport_preference": ["pesawat", "kereta"], "class_preference": "business"}'),
('USR-003-JANE', 'jane.smith@email.com', '081234567892', 'Jane Smith', '1992-07-22', 'female', '{"street": "Jl. Malioboro No.45", "city": "Yogyakarta", "province": "DI Yogyakarta", "postal_code": "55213", "country": "Indonesia"}', 'customer', TRUE, '{"transport_preference": ["bus", "kereta"], "class_preference": "economy"}'),
('USR-004-AHMAD', 'ahmad.budi@email.com', '081234567893', 'Ahmad Budi Santoso', '1988-12-10', 'male', '{"street": "Jl. Ijen No.67", "city": "Malang", "province": "Jawa Timur", "postal_code": "65119", "country": "Indonesia"}', 'customer', TRUE, '{"transport_preference": ["kereta", "bus"], "notification_email": true}'),
('USR-005-SARAH', 'sarah.wilson@email.com', '081234567894', 'Sarah Wilson', '1995-05-18', 'female', '{"street": "Jl. Sunset Road No.88", "city": "Denpasar", "province": "Bali", "postal_code": "80361", "country": "Indonesia"}', 'customer', TRUE, '{"transport_preference": ["pesawat", "kapal"], "class_preference": "premium"}');

-- Destinations
INSERT INTO destinations (id, name, location, description, category, price_range, rating, total_reviews, image_url, features, includes, excludes, terms_conditions, is_active) VALUES
('DEST-BOROBUDUR', 'Candi Borobudur', 'Magelang, Jawa Tengah', 'Candi Buddha terbesar di dunia dan situs warisan dunia UNESCO', 'cultural', '{"min": 50000, "max": 200000}', 4.7, 8420, 'https://example.com/borobudur.jpg', '["sunrise_tour", "guided_tour", "photo_spots", "cultural_heritage"]', '["entrance_ticket", "local_guide", "transport_from_parking"]', '["personal_expenses", "meals", "accommodation"]', 'Tiket berlaku untuk 1 hari. Anak di bawah 3 tahun gratis.', TRUE),
('DEST-BROMO', 'Gunung Bromo', 'Probolinggo, Jawa Timur', 'Gunung berapi aktif dengan pemandangan sunrise yang spektakuler', 'nature', '{"min": 150000, "max": 500000}', 4.6, 12350, 'https://example.com/bromo.jpg', '["sunrise_tour", "jeep_tour", "horse_riding", "photography"]', '["jeep_transport", "entrance_ticket", "sunrise_viewpoint"]', '["meals", "accommodation", "personal_guide"]', 'Tour dimulai dini hari pukul 03:00. Bawa jaket tebal.', TRUE),
('DEST-BALIBEACH', 'Pantai Kuta Bali', 'Badung, Bali', 'Pantai terkenal dengan ombak yang cocok untuk surfing dan sunset yang indah', 'beach', '{"min": 0, "max": 300000}', 4.4, 15680, 'https://example.com/kuta-beach.jpg', '["surfing", "sunset_view", "beach_clubs", "water_sports"]', '["beach_access", "parking_area", "basic_facilities"]', '["surf_board_rental", "food_drinks", "locker_rental"]', 'Pantai gratis diakses. Hati-hati dengan arus laut.', TRUE),
('DEST-RAJAAMPAT', 'Raja Ampat', 'Raja Ampat, Papua Barat', 'Surga diving dengan keanekaragaman hayati laut terkaya di dunia', 'marine', '{"min": 2000000, "max": 8000000}', 4.9, 3240, 'https://example.com/rajaampat.jpg', '["diving", "snorkeling", "island_hopping", "marine_biodiversity"]', '["diving_guide", "equipment_rental", "boat_transport", "permits"]', '["accommodation", "meals", "diving_certification", "flights"]', 'Diperlukan sertifikat diving minimal Open Water. Musim terbaik Mar-Okt.', TRUE),
('DEST-TANAHLOT', 'Tanah Lot', 'Tabanan, Bali', 'Pura Hindu di atas batu karang dengan pemandangan sunset yang memukau', 'cultural', '{"min": 60000, "max": 150000}', 4.5, 9870, 'https://example.com/tanahlot.jpg', '["sunset_view", "cultural_site", "photography", "traditional_market"]', '["entrance_ticket", "parking", "cultural_guide"]', '["meals", "transportation", "souvenir_shopping"]', 'Waktu terbaik sore hari menjelang sunset. Hormati adat setempat.', TRUE),
('DEST-JOGJA', 'Wisata Budaya Yogyakarta', 'Yogyakarta, DI Yogyakarta', 'Paket wisata budaya komprehensif meliputi keraton, taman sari, dan malioboro', 'cultural', '{"min": 300000, "max": 800000}', 4.6, 6540, 'https://example.com/jogja-culture.jpg', '["cultural_tour", "historical_sites", "traditional_food", "shopping"]', '["guided_tour", "entrance_tickets", "traditional_lunch", "transportation"]', '["accommodation", "personal_expenses", "souvenir_shopping"]', 'Paket tersedia setiap hari. Durasi 8-10 jam.', TRUE);

-- Combo Packages
INSERT INTO combo_packages (id, name, description, duration_days, original_price, discounted_price, max_participants, rating, total_reviews, image_url, itinerary, includes, excludes, terms_conditions, is_active) VALUES
('COMBO-JAWABALI-001', 'Paket Wisata Jawa-Bali 7 Hari', 'Paket lengkap wisata Jawa-Bali mengunjungi Yogyakarta, Malang, Bromo, dan Bali', 7, 4500000, 3600000, 20, 4.5, 180, 'https://example.com/combo-jawabali.jpg', 
'[
  {"day": 1, "activities": ["Tiba di Yogyakarta", "City tour Yogyakarta", "Check-in hotel"], "location": "Yogyakarta"},
  {"day": 2, "activities": ["Wisata Borobudur", "Wisata Prambanan", "Belanja di Malioboro"], "location": "Yogyakarta"},
  {"day": 3, "activities": ["Perjalanan ke Malang", "Wisata Batu", "Check-in hotel"], "location": "Malang"},
  {"day": 4, "activities": ["Tour Bromo sunrise", "Wisata Savanna Bromo", "Perjalanan ke Bali"], "location": "Bromo-Bali"},
  {"day": 5, "activities": ["Wisata Tanah Lot", "Wisata Uluwatu", "Dinner di Jimbaran"], "location": "Bali"},
  {"day": 6, "activities": ["Wisata Ubud", "Aktivitas bebas", "Shopping"], "location": "Bali"},
  {"day": 7, "activities": ["Check-out", "Transfer ke bandara", "Kembali ke kota asal"], "location": "Bali"}
]',
'["Accommodation 6 nights", "All transportation", "Entrance tickets", "Professional guide", "Some meals", "Airport transfers"]',
'["International flights", "Personal expenses", "Travel insurance", "Tips for guide/driver", "Lunch & dinner on day 6"]',
'Minimum 2 orang. Harga per orang. Include hotel 3-4 star. Dapat dibatalkan H-7 dengan penalti 25%.', TRUE),

('COMBO-BALIKOMODO-001', 'Paket Bali-Komodo Adventure 5 Hari', 'Kombinasi wisata Bali dan petualangan ke Pulau Komodo dengan pesawat dan kapal', 5, 6200000, 5100000, 15, 4.7, 95, 'https://example.com/combo-balikomodo.jpg',
'[
  {"day": 1, "activities": ["Tiba di Bali", "Wisata Tanah Lot", "Check-in hotel"], "location": "Bali"},
  {"day": 2, "activities": ["Penerbangan ke Labuan Bajo", "Boat trip ke Pulau Komodo", "Snorkeling"], "location": "Komodo"},
  {"day": 3, "activities": ["Island hopping", "Pink Beach", "Komodo trekking"], "location": "Komodo"},
  {"day": 4, "activities": ["Kembali ke Bali", "Wisata Ubud", "Spa treatment"], "location": "Bali"},
  {"day": 5, "activities": ["Free time", "Transfer ke bandara", "Departure"], "location": "Bali"}
]',
'["Accommodation 4 nights", "Domestic flights", "Boat charter", "All entrance tickets", "Professional guide", "Some meals"]',
'["International flights", "Travel insurance", "Personal expenses", "Komodo trekking gear rental", "Spa treatments"]',
'Minimum 4 orang. Include hotel 4 star. Boat sharing dengan grup lain. Weather dependent.', TRUE),

('COMBO-JAKARTA-WEEKEND', 'Jakarta Weekend Gateway 3 Hari', 'Paket singkat eksplorasi Jakarta modern dan historis untuk weekend', 3, 1800000, 1350000, 25, 4.2, 210, 'https://example.com/combo-jakarta.jpg',
'[
  {"day": 1, "activities": ["City tour Jakarta", "Kota Tua exploration", "Check-in hotel"], "location": "Jakarta"},
  {"day": 2, "activities": ["Ancol", "Shopping di mall", "Kuliner malam"], "location": "Jakarta"},
  {"day": 3, "activities": ["Museum tour", "Check-out", "Transfer"], "location": "Jakarta"}
]',
'["Accommodation 2 nights", "City transportation", "Entrance tickets", "Local guide", "Welcome dinner"]',
'["Transportation to Jakarta", "Personal expenses", "Lunch day 2-3", "Shopping expenses", "Tips"]',
'Cocok untuk weekend. Hotel bintang 3. Grup minimal 6 orang untuk harga ini.', TRUE);

-- Promotions
INSERT INTO promotions (id, code, name, description, type, value, min_purchase, max_discount, start_date, end_date, quota, used_count, applicable_to, terms_conditions, image_url, status) VALUES
('PROMO-NEWYEAR2024', 'NEWYEAR25', 'Promo Tahun Baru 2025', 'Diskon spesial untuk perjalanan di awal tahun 2025', 'percentage', 25, 500000, 300000, '2024-12-25', '2025-01-31', 1000, 45, 'all', 'Berlaku untuk semua jenis transportasi. Tidak dapat digabung dengan promo lain. Valid untuk booking hingga 31 Januari 2025.', 'https://example.com/newyear-promo.jpg', 'active'),
('PROMO-EARLYBIRD', 'EARLYBIRD50', 'Early Bird Flight Deals', 'Diskon untuk pemesanan tiket pesawat 30 hari sebelum keberangkatan', 'fixed', 150000, 1000000, 150000, '2024-01-01', '2024-12-31', 2000, 234, 'pesawat', 'Khusus untuk penerbangan domestik. Pemesanan minimal 30 hari sebelum keberangkatan. Berlaku untuk kelas ekonomi.', 'https://example.com/earlybird-promo.jpg', 'active'),
('PROMO-TRAINWEEK', 'KERETA20', 'Minggu Kereta Indonesia', 'Diskon 20% untuk semua perjalanan kereta api', 'percentage', 20, 100000, 100000, '2024-09-01', '2024-09-30', 500, 389, 'kereta', 'Berlaku untuk semua kelas kereta. Valid selama September 2024. Maksimal 2 tiket per user.', 'https://example.com/train-promo.jpg', 'expired'),
('PROMO-STUDENT', 'STUDENT15', 'Diskon Pelajar', 'Diskon khusus untuk pelajar dan mahasiswa', 'percentage', 15, 200000, 200000, '2024-01-01', '2024-12-31', 10000, 1250, 'all', 'Wajib menunjukkan kartu pelajar/mahasiswa yang masih berlaku. Berlaku untuk semua jenis transportasi kecuali pesawat business class.', 'https://example.com/student-promo.jpg', 'active'),
('PROMO-COMBO50', 'PAKET50', 'Diskon Paket Wisata', 'Diskon Rp 500.000 untuk paket wisata combo', 'fixed', 500000, 3000000, 500000, '2024-06-01', '2024-08-31', 200, 67, 'combo', 'Khusus untuk paket wisata dengan durasi minimal 5 hari. Tidak dapat digabung dengan promo lain.', 'https://example.com/combo-promo.jpg', 'active'),
('PROMO-WEEKEND', 'WEEKEND30', 'Weekend Special', 'Diskon untuk perjalanan weekend', 'percentage', 30, 300000, 250000, '2024-01-01', '2024-12-31', 1500, 890, 'bus', 'Berlaku untuk keberangkatan Jumat-Minggu. Khusus bus kelas executive. Booking minimal H-3.', 'https://example.com/weekend-promo.jpg', 'active');

-- Sample Bookings
INSERT INTO bookings (id, booking_number, user_id, booking_type, reference_id, booking_status, payment_status, total_passengers, total_amount, booking_date, special_requests) VALUES
('BOOK-001', 'TRV2024010100001', 'USR-002-JOHN', 'schedule', 'SCH-GARUDA-CGK-YIA-001', 'confirmed', 'success', 2, 1700000, '2024-01-10 14:30:00', 'Window seat preference'),
('BOOK-002', 'TRV2024010100002', 'USR-003-JANE', 'schedule', 'SCH-KAI-ARGO-GMR-YK-001', 'confirmed', 'success', 1, 350000, '2024-01-10 16:15:00', 'Vegetarian meal'),
('BOOK-003', 'TRV2024010100003', 'USR-004-AHMAD', 'combo', 'COMBO-JAWABALI-001', 'pending', 'pending', 4, 14400000, '2024-01-11 09:20:00', 'Family with 2 children'),
('BOOK-004', 'TRV2024010100004', 'USR-005-SARAH', 'destination', 'DEST-RAJAAMPAT', 'confirmed', 'success', 2, 12000000, '2024-01-09 11:45:00', 'Advanced diving certification required'),
('BOOK-005', 'TRV2024010100005', 'USR-002-JOHN', 'schedule', 'SCH-PRIMAJASA-KMR-GWG-001', 'cancelled', 'refunded', 1, 120000, '2024-01-08 20:30:00', 'Cancelled due to emergency');

-- Booking Passengers
INSERT INTO booking_passengers (id, booking_id, full_name, id_number, date_of_birth, nationality, phone, email, seat_number, meal_preference, special_needs) VALUES
('PASS-001-1', 'BOOK-001', 'John Doe', '3201234567890001', '1985-03-15', 'Indonesian', '081234567891', 'john.doe@email.com', '12A', 'regular', NULL),
('PASS-001-2', 'BOOK-001', 'Jane Doe', '3201234567890002', '1987-08-22', 'Indonesian', '081234567899', 'jane.doe@email.com', '12B', 'regular', NULL),
('PASS-002-1', 'BOOK-002', 'Jane Smith', '3301234567890003', '1992-07-22', 'Indonesian', '081234567892', 'jane.smith@email.com', 'A1', 'vegetarian', NULL),
('PASS-004-1', 'BOOK-004', 'Sarah Wilson', '5101234567890004', '1995-05-18', 'Indonesian', '081234567894', 'sarah.wilson@email.com', NULL, 'regular', NULL),
('PASS-004-2', 'BOOK-004', 'Michael Wilson', '5101234567890005', '1993-12-03', 'Indonesian', '081234567895', 'michael.wilson@email.com', NULL, 'regular', NULL);

-- Payments
INSERT INTO payments (id, booking_id, payment_method, amount, payment_status, transaction_id, gateway_response, paid_at) VALUES
('PAY-001', 'BOOK-001', 'credit_card', 1700000, 'success', 'TXN-CC-20240110-001', '{"gateway": "midtrans", "transaction_id": "MT-001", "card_type": "visa", "bank": "BCA"}', '2024-01-10 14:35:00'),
('PAY-002', 'BOOK-002', 'bank_transfer', 350000, 'success', 'TXN-BT-20240110-002', '{"gateway": "midtrans", "bank": "BNI", "va_number": "8001234567890"}', '2024-01-10 16:20:00'),
('PAY-003', 'BOOK-003', 'e_wallet', 14400000, 'pending', 'TXN-EW-20240111-003', '{"gateway": "ovo", "phone": "081234567893", "status": "pending"}', NULL),
('PAY-004', 'BOOK-004', 'credit_card', 12000000, 'success', 'TXN-CC-20240109-004', '{"gateway": "midtrans", "transaction_id": "MT-004", "card_type": "mastercard", "bank": "Mandiri"}', '2024-01-09 11:50:00'),
('PAY-005', 'BOOK-005', 'bank_transfer', 120000, 'refunded', 'TXN-BT-20240108-005', '{"gateway": "midtrans", "bank": "BRI", "va_number": "8001234567891", "refund_id": "RF-001"}', '2024-01-08 21:00:00');

-- Reviews
INSERT INTO reviews (id, user_id, target_type, target_id, rating, title, comment, images, status, helpful_count, created_at, approved_at) VALUES
('REV-001', 'USR-002-JOHN', 'operator', 'OP-GARUDA001', 5, 'Excellent Service', 'Pelayanan sangat baik, pesawat tepat waktu, makanan enak. Pramugari sangat ramah dan profesional.', '["https://example.com/review1-1.jpg", "https://example.com/review1-2.jpg"]', 'approved', 12, '2024-01-11 10:30:00', '2024-01-11 12:00:00'),
('REV-002', 'USR-003-JANE', 'operator', 'OP-KAI001', 4, 'Comfortable Train Journey', 'Perjalanan dengan kereta sangat nyaman. Kursi bisa direbahkan, ada colokan listrik. Cuma makanannya biasa saja.', '["https://example.com/review2-1.jpg"]', 'approved', 8, '2024-01-12 08:15:00', '2024-01-12 09:30:00'),
('REV-003', 'USR-005-SARAH', 'destination', 'DEST-RAJAAMPAT', 5, 'Paradise for Divers', 'Raja Ampat benar-benar surga bagi penyelam! Keanekaragaman hayati laut yang luar biasa. Guide yang berpengalaman dan ramah.', '["https://example.com/review3-1.jpg", "https://example.com/review3-2.jpg", "https://example.com/review3-3.jpg"]', 'approved', 25, '2024-01-13 14:20:00', '2024-01-13 15:00:00'),
('REV-004', 'USR-004-AHMAD', 'operator', 'OP-PRIMAJASA001', 4, 'Good Bus Service', 'Bus executive lumayan nyaman untuk perjalanan malam. Seat bisa direbahkan, ada selimut. Toilet bersih.', '["https://example.com/review4-1.jpg"]', 'approved', 6, '2024-01-14 09:45:00', '2024-01-14 10:15:00'),
('REV-005', 'USR-002-JOHN', 'destination', 'DEST-BOROBUDUR', 5, 'Amazing Historical Site', 'Candi Borobudur sangat menakjubkan. Sunrise tour sangat recommended. Guide berpengetahuan luas tentang sejarah.', '["https://example.com/review5-1.jpg", "https://example.com/review5-2.jpg"]', 'approved', 18, '2024-01-15 07:30:00', '2024-01-15 08:00:00');

-- Notifications
INSERT INTO notifications (id, user_id, type, title, message, data, priority, is_read, created_at) VALUES
('NOTIF-001', 'USR-002-JOHN', 'booking_confirmation', 'Booking Confirmed', 'Your booking TRV2024010100001 has been confirmed.', '{"booking_id": "BOOK-001", "booking_number": "TRV2024010100001"}', 'high', TRUE, '2024-01-10 14:35:00'),
('NOTIF-002', 'USR-002-JOHN', 'payment_success', 'Payment Successful', 'Payment for booking TRV2024010100001 has been processed successfully.', '{"booking_id": "BOOK-001", "payment_id": "PAY-001", "amount": 1700000}', 'high', TRUE, '2024-01-10 14:36:00'),
('NOTIF-003', 'USR-003-JANE', 'booking_confirmation', 'Booking Confirmed', 'Your booking TRV2024010100002 has been confirmed.', '{"booking_id": "BOOK-002", "booking_number": "TRV2024010100002"}', 'high', TRUE, '2024-01-10 16:20:00'),
('NOTIF-004', 'USR-004-AHMAD', 'booking_reminder', 'Pending Payment Reminder', 'Please complete payment for booking TRV2024010100003 within 24 hours.', '{"booking_id": "BOOK-003", "booking_number": "TRV2024010100003", "amount": 14400000}', 'medium', FALSE, '2024-01-12 09:20:00'),
('NOTIF-005', 'USR-005-SARAH', 'travel_reminder', 'Travel Reminder', 'Your trip to Raja Ampat is coming up tomorrow. Have a great journey!', '{"booking_id": "BOOK-004", "destination": "Raja Ampat"}', 'medium', FALSE, '2024-01-14 10:00:00'),
('NOTIF-006', 'USR-002-JOHN', 'promotion', 'Special Promotion', 'New Year promotion is now live! Get up to 25% off on all bookings.', '{"promo_code": "NEWYEAR25", "discount": "25%"}', 'low', FALSE, '2024-01-01 00:00:00');

-- System Settings
INSERT INTO system_settings (setting_key, setting_value, description, updated_at) VALUES
('booking_expiry_hours', '24', 'Jam batas pembayaran booking sebelum otomatis dibatalkan', NOW()),
('max_passengers_per_booking', '9', 'Maksimal penumpang per booking', NOW()),
('currency', 'IDR', 'Mata uang default sistem', NOW()),
('timezone', 'Asia/Jakarta', 'Timezone default sistem', NOW()),
('booking_fee_percentage', '2.5', 'Persentase biaya admin booking', NOW()),
('refund_processing_days', '7', 'Hari kerja pemrosesan refund', NOW()),
('promo_max_usage_per_user', '5', 'Maksimal penggunaan promo per user per bulan', NOW()),
('review_auto_approve', 'false', 'Auto approve review tanpa moderasi', NOW()),
('notification_retention_days', '90', 'Hari penyimpanan notifikasi', NOW()),
('session_timeout_minutes', '30', 'Timeout sesi login dalam menit', NOW());

-- Activity Logs
INSERT INTO activity_logs (id, user_id, action, entity_type, entity_id, old_data, new_data, ip_address, user_agent, created_at) VALUES
('LOG-001', 'USR-002-JOHN', 'booking_created', 'booking', 'BOOK-001', NULL, '{"booking_number": "TRV2024010100001", "total_amount": 1700000, "status": "pending"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-10 14:30:00'),
('LOG-002', 'USR-002-JOHN', 'payment_completed', 'payment', 'PAY-001', '{"status": "pending"}', '{"status": "success", "amount": 1700000}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-10 14:35:00'),
('LOG-003', 'USR-003-JANE', 'booking_created', 'booking', 'BOOK-002', NULL, '{"booking_number": "TRV2024010100002", "total_amount": 350000, "status": "pending"}', '192.168.1.200', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', '2024-01-10 16:15:00'),
('LOG-004', 'USR-005-SARAH', 'review_submitted', 'review', 'REV-003', NULL, '{"rating": 5, "target_type": "destination", "target_id": "DEST-RAJAAMPAT"}', '192.168.1.300', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '2024-01-13 14:20:00'),
('LOG-005', 'USR-002-JOHN', 'booking_cancelled', 'booking', 'BOOK-005', '{"status": "confirmed"}', '{"status": "cancelled", "reason": "emergency"}', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-01-08 20:30:00');