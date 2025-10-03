-- ==============================================
-- TRAVELER WEBSITE - RELATIONAL DATABASE SCHEMA
-- ==============================================

-- 1. USERS & AUTHENTICATION
-- ==============================================

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(500),
    role ENUM('customer', 'admin', 'operator') DEFAULT 'customer',
    verified BOOLEAN DEFAULT FALSE,
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

CREATE TABLE user_sessions (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
);

-- 2. LOCATIONS & ROUTES
-- ==============================================

CREATE TABLE locations (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Indonesia',
    type ENUM('airport', 'train_station', 'bus_terminal', 'port', 'city') NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone VARCHAR(50) DEFAULT 'Asia/Jakarta',
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    
    INDEX idx_city (city),
    INDEX idx_type (type),
    INDEX idx_status (status)
);

CREATE TABLE routes (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    origin_code VARCHAR(10) NOT NULL,
    destination_code VARCHAR(10) NOT NULL,
    distance_km INT,
    transport_type ENUM('air', 'rail', 'road', 'sea') NOT NULL,
    estimated_duration_minutes INT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (origin_code) REFERENCES locations(code),
    FOREIGN KEY (destination_code) REFERENCES locations(code),
    INDEX idx_origin (origin_code),
    INDEX idx_destination (destination_code),
    INDEX idx_transport_type (transport_type)
);

-- 3. TRANSPORTATION OPERATORS
-- ==============================================

CREATE TABLE transportation_operators (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE,
    type ENUM('airline', 'train', 'bus', 'ship', 'rental') NOT NULL,
    logo VARCHAR(500),
    country VARCHAR(100) DEFAULT 'Indonesia',
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    website VARCHAR(255),
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    amenities JSON,
    policies JSON,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_rating (rating)
);

-- 4. VEHICLES & TRANSPORTATION
-- ==============================================

CREATE TABLE vehicles (
    id VARCHAR(50) PRIMARY KEY,
    operator_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type ENUM('aircraft', 'train', 'bus', 'ship', 'car') NOT NULL,
    model VARCHAR(255),
    registration_number VARCHAR(50),
    capacity_passengers INT NOT NULL,
    capacity_vehicles INT DEFAULT 0,
    facilities JSON,
    seat_classes JSON,
    status ENUM('active', 'maintenance', 'retired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (operator_id) REFERENCES transportation_operators(id) ON DELETE CASCADE,
    INDEX idx_operator (operator_id),
    INDEX idx_type (type),
    INDEX idx_status (status)
);

-- 5. SCHEDULES & TRIPS
-- ==============================================

CREATE TABLE schedules (
    id VARCHAR(50) PRIMARY KEY,
    vehicle_id VARCHAR(50) NOT NULL,
    route_id VARCHAR(50) NOT NULL,
    schedule_number VARCHAR(50) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    duration_minutes INT NOT NULL,
    frequency_type ENUM('daily', 'weekly', 'monthly', 'one_time') DEFAULT 'daily',
    frequency_pattern VARCHAR(20), -- e.g., 'mon,wed,fri' for weekly
    valid_from DATE NOT NULL,
    valid_until DATE,
    base_price DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    seat_availability JSON,
    status ENUM('scheduled', 'cancelled', 'completed', 'delayed') DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    INDEX idx_vehicle (vehicle_id),
    INDEX idx_route (route_id),
    INDEX idx_departure (departure_time),
    INDEX idx_status (status),
    UNIQUE KEY unique_schedule (vehicle_id, departure_time)
);

-- 6. DESTINATIONS & TOURISM
-- ==============================================

CREATE TABLE destination_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(10),
    color VARCHAR(7),
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    
    INDEX idx_status (status)
);

CREATE TABLE destinations (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'Indonesia',
    description TEXT,
    price_range VARCHAR(50),
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    tags JSON,
    images JSON,
    facilities JSON,
    opening_hours JSON,
    contact_info JSON,
    status ENUM('active', 'inactive', 'maintenance') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES destination_categories(id),
    INDEX idx_category (category_id),
    INDEX idx_city (city),
    INDEX idx_province (province),
    INDEX idx_rating (rating),
    INDEX idx_status (status)
);

-- 7. PROMOTIONS & PRICING
-- ==============================================

CREATE TABLE promotions (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    type ENUM('percentage', 'fixed', 'buy_one_get_one') NOT NULL,
    value DECIMAL(12,2) NOT NULL,
    max_discount DECIMAL(12,2),
    min_spend DECIMAL(12,2),
    applies_to JSON, -- ['flight', 'train', 'combo', etc.]
    target_operators JSON, -- specific operator IDs
    target_routes JSON, -- specific route IDs
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    quota INT,
    used_count INT DEFAULT 0,
    user_limit INT DEFAULT 1,
    terms_conditions TEXT,
    status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_code (code),
    INDEX idx_dates (start_date, end_date),
    INDEX idx_status (status)
);

CREATE TABLE pricing_rules (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    applies_to ENUM('flight', 'train', 'bus', 'ship', 'rental', 'destination', 'all') NOT NULL,
    condition_type ENUM('date_range', 'day_of_week', 'advance_booking', 'seat_class', 'route') NOT NULL,
    condition_value JSON,
    adjustment_type ENUM('percent', 'fixed') NOT NULL,
    adjustment_value DECIMAL(12,2) NOT NULL,
    priority INT DEFAULT 0,
    description TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_applies_to (applies_to),
    INDEX idx_condition_type (condition_type),
    INDEX idx_priority (priority),
    INDEX idx_status (status)
);

-- 8. COMBO PACKAGES
-- ==============================================

CREATE TABLE combo_packages (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    duration VARCHAR(20), -- e.g., '3D2N'
    base_price DECIMAL(12,2) NOT NULL,
    discount_percent DECIMAL(5,2) DEFAULT 0.00,
    final_price DECIMAL(12,2) NOT NULL,
    includes JSON, -- Array of included services
    excludes JSON, -- Array of excluded services
    itinerary JSON, -- Day-by-day itinerary
    terms_conditions TEXT,
    min_participants INT DEFAULT 1,
    max_participants INT,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    status ENUM('active', 'inactive', 'sold_out') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_price (final_price),
    INDEX idx_rating (rating),
    INDEX idx_status (status)
);

CREATE TABLE combo_components (
    id VARCHAR(50) PRIMARY KEY,
    combo_id VARCHAR(50) NOT NULL,
    component_type ENUM('schedule', 'destination', 'hotel', 'meal', 'activity') NOT NULL,
    reference_id VARCHAR(50) NOT NULL,
    component_order INT NOT NULL,
    quantity INT DEFAULT 1,
    optional BOOLEAN DEFAULT FALSE,
    additional_price DECIMAL(12,2) DEFAULT 0.00,
    notes TEXT,
    
    FOREIGN KEY (combo_id) REFERENCES combo_packages(id) ON DELETE CASCADE,
    INDEX idx_combo (combo_id),
    INDEX idx_type (component_type),
    INDEX idx_order (component_order)
);

-- 9. BOOKINGS & ORDERS
-- ==============================================

CREATE TABLE bookings (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    booking_type ENUM('schedule', 'combo', 'destination') NOT NULL,
    reference_id VARCHAR(50) NOT NULL, -- schedule_id, combo_id, or destination_id
    booking_number VARCHAR(50) UNIQUE NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date DATETIME,
    return_date DATETIME,
    total_amount DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    final_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    promo_code VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded', 'partial_refund') DEFAULT 'pending',
    booking_status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show') DEFAULT 'pending',
    cancellation_reason TEXT,
    special_requests TEXT,
    contact_info JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (promo_code) REFERENCES promotions(code),
    INDEX idx_user (user_id),
    INDEX idx_booking_number (booking_number),
    INDEX idx_reference (reference_id),
    INDEX idx_travel_date (travel_date),
    INDEX idx_payment_status (payment_status),
    INDEX idx_booking_status (booking_status)
);

CREATE TABLE booking_passengers (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    title ENUM('Mr', 'Mrs', 'Ms', 'Dr') NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    full_name VARCHAR(255) GENERATED ALWAYS AS (CONCAT(first_name, ' ', IFNULL(last_name, ''))) STORED,
    id_type ENUM('ktp', 'passport', 'sim') NOT NULL,
    id_number VARCHAR(50) NOT NULL,
    birth_date DATE,
    nationality VARCHAR(100) DEFAULT 'Indonesia',
    phone VARCHAR(20),
    email VARCHAR(255),
    passenger_type ENUM('adult', 'child', 'infant') NOT NULL,
    seat_preference VARCHAR(50),
    meal_preference VARCHAR(50),
    special_needs TEXT,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking (booking_id),
    INDEX idx_id_number (id_number),
    INDEX idx_passenger_type (passenger_type)
);

-- 10. PAYMENTS
-- ==============================================

CREATE TABLE payments (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'bank_transfer', 'e_wallet', 'virtual_account', 'cash') NOT NULL,
    payment_provider VARCHAR(100), -- e.g., 'midtrans', 'xendit', 'gopay'
    provider_transaction_id VARCHAR(255),
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'IDR',
    exchange_rate DECIMAL(10,4) DEFAULT 1.0000,
    payment_date DATETIME,
    payment_status ENUM('pending', 'processing', 'success', 'failed', 'cancelled', 'expired') DEFAULT 'pending',
    payment_details JSON, -- Gateway response, card info, etc.
    failure_reason TEXT,
    refund_amount DECIMAL(12,2) DEFAULT 0.00,
    refund_date DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking (booking_id),
    INDEX idx_provider_transaction (provider_transaction_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_payment_date (payment_date)
);

-- 11. REVIEWS & RATINGS
-- ==============================================

CREATE TABLE reviews (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    booking_id VARCHAR(50),
    target_type ENUM('operator', 'vehicle', 'destination', 'combo', 'schedule') NOT NULL,
    target_id VARCHAR(50) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    images JSON,
    helpful_count INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    reply_text TEXT,
    reply_date DATETIME,
    status ENUM('pending', 'approved', 'rejected', 'hidden') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    INDEX idx_user (user_id),
    INDEX idx_target (target_type, target_id),
    INDEX idx_rating (rating),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- 12. NOTIFICATIONS & COMMUNICATIONS
-- ==============================================

CREATE TABLE notifications (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    type ENUM('booking_confirmation', 'payment_success', 'payment_failed', 'booking_reminder', 'promo_alert', 'review_request', 'general') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSON, -- Additional data like booking_id, etc.
    read_at DATETIME,
    action_url VARCHAR(500),
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_type (type),
    INDEX idx_read (read_at),
    INDEX idx_priority (priority),
    INDEX idx_created (created_at)
);

-- 13. SYSTEM SETTINGS & CONFIGURATION
-- ==============================================

CREATE TABLE system_settings (
    key_name VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    data_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    category VARCHAR(50) DEFAULT 'general',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_public (is_public)
);

CREATE TABLE faq (
    id VARCHAR(50) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INT DEFAULT 0,
    helpful_count INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_category (category),
    INDEX idx_order (order_index),
    INDEX idx_status (status)
);

-- 14. AUDIT & LOGGING
-- ==============================================

CREATE TABLE activity_logs (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(50),
    old_data JSON,
    new_data JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created (created_at)
);

-- ==============================================
-- VIEWS FOR COMMON QUERIES
-- ==============================================

-- View untuk schedule dengan detail operator dan route
CREATE VIEW schedule_details AS
SELECT 
    s.id,
    s.schedule_number,
    s.departure_time,
    s.arrival_time,
    s.duration_minutes,
    s.base_price,
    s.seat_availability,
    s.status,
    v.name as vehicle_name,
    v.type as vehicle_type,
    v.facilities as vehicle_facilities,
    o.name as operator_name,
    o.code as operator_code,
    o.logo as operator_logo,
    o.rating as operator_rating,
    r.code as route_code,
    orig.name as origin_name,
    orig.city as origin_city,
    dest.name as destination_name,
    dest.city as destination_city
FROM schedules s
JOIN vehicles v ON s.vehicle_id = v.id
JOIN transportation_operators o ON v.operator_id = o.id
JOIN routes r ON s.route_id = r.id
JOIN locations orig ON r.origin_code = orig.code
JOIN locations dest ON r.destination_code = dest.code;

-- View untuk booking dengan detail lengkap
CREATE VIEW booking_details AS
SELECT 
    b.id,
    b.booking_number,
    b.booking_type,
    b.reference_id,
    b.booking_date,
    b.travel_date,
    b.final_amount,
    b.payment_status,
    b.booking_status,
    u.name as user_name,
    u.email as user_email,
    u.phone as user_phone,
    COUNT(bp.id) as passenger_count
FROM bookings b
JOIN users u ON b.user_id = u.id
LEFT JOIN booking_passengers bp ON b.id = bp.booking_id
GROUP BY b.id, u.name, u.email, u.phone;