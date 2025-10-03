-- ==============================================
-- VIEWS FOR COMMON DATA ACCESS
-- ==============================================

-- View untuk schedule detail dengan informasi lengkap
CREATE VIEW schedule_details_view AS
SELECT 
    s.id,
    s.operator_id,
    o.name as operator_name,
    o.type as transport_type,
    o.logo_url as operator_logo,
    o.rating as operator_rating,
    s.vehicle_id,
    v.name as vehicle_name,
    v.type as vehicle_type,
    v.capacity as vehicle_capacity,
    s.route_id,
    r.origin_id,
    r.destination_id,
    r.distance,
    r.estimated_duration,
    origin.name as origin_name,
    origin.code as origin_code,
    origin.type as origin_type,
    dest.name as destination_name,
    dest.code as destination_code,
    dest.type as destination_type,
    s.departure_time,
    s.arrival_time,
    s.base_price,
    s.seat_availability,
    s.features,
    s.is_active,
    DATE(s.departure_time) as travel_date,
    TIME(s.departure_time) as departure_time_only,
    TIME(s.arrival_time) as arrival_time_only,
    s.created_at,
    s.updated_at
FROM schedules s
JOIN transportation_operators o ON s.operator_id = o.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN routes r ON s.route_id = r.id
JOIN locations origin ON r.origin_id = origin.id
JOIN locations dest ON r.destination_id = dest.id;

-- View untuk booking detail dengan informasi lengkap
CREATE VIEW booking_details_view AS
SELECT 
    b.id,
    b.booking_number,
    b.user_id,
    u.full_name as customer_name,
    u.email as customer_email,
    u.phone as customer_phone,
    b.booking_type,
    b.reference_id,
    b.booking_status,
    b.payment_status,
    b.total_passengers,
    b.total_amount,
    b.booking_date,
    b.special_requests,
    
    -- Schedule details (if booking_type = 'schedule')
    CASE 
        WHEN b.booking_type = 'schedule' THEN sd.operator_name
        ELSE NULL
    END as operator_name,
    CASE 
        WHEN b.booking_type = 'schedule' THEN sd.transport_type
        ELSE NULL
    END as transport_type,
    CASE 
        WHEN b.booking_type = 'schedule' THEN sd.origin_name
        ELSE NULL
    END as origin_name,
    CASE 
        WHEN b.booking_type = 'schedule' THEN sd.destination_name
        ELSE NULL
    END as destination_name,
    CASE 
        WHEN b.booking_type = 'schedule' THEN sd.departure_time
        ELSE NULL
    END as departure_time,
    CASE 
        WHEN b.booking_type = 'schedule' THEN sd.arrival_time
        ELSE NULL
    END as arrival_time,
    
    -- Combo details (if booking_type = 'combo')
    CASE 
        WHEN b.booking_type = 'combo' THEN cp.name
        ELSE NULL
    END as combo_name,
    CASE 
        WHEN b.booking_type = 'combo' THEN cp.description
        ELSE NULL
    END as combo_description,
    
    -- Destination details (if booking_type = 'destination')
    CASE 
        WHEN b.booking_type = 'destination' THEN d.name
        ELSE NULL
    END as destination_name_booking,
    CASE 
        WHEN b.booking_type = 'destination' THEN d.location
        ELSE NULL
    END as destination_location,
    
    b.created_at,
    b.updated_at
FROM bookings b
JOIN users u ON b.user_id = u.id
LEFT JOIN schedule_details_view sd ON b.booking_type = 'schedule' AND b.reference_id = sd.id
LEFT JOIN combo_packages cp ON b.booking_type = 'combo' AND b.reference_id = cp.id
LEFT JOIN destinations d ON b.booking_type = 'destination' AND b.reference_id = d.id;

-- View untuk promotion active
CREATE VIEW active_promotions_view AS
SELECT 
    p.id,
    p.code,
    p.name,
    p.description,
    p.type,
    p.value,
    p.min_purchase,
    p.max_discount,
    p.start_date,
    p.end_date,
    p.quota,
    p.used_count,
    (p.quota - p.used_count) as remaining_quota,
    p.applicable_to,
    p.terms_conditions,
    p.image_url,
    p.created_at
FROM promotions p
WHERE p.status = 'active' 
AND p.start_date <= CURDATE() 
AND p.end_date >= CURDATE()
AND p.used_count < p.quota;

-- View untuk operator performance
CREATE VIEW operator_performance_view AS
SELECT 
    o.id,
    o.name,
    o.type,
    o.rating,
    o.total_reviews,
    COUNT(s.id) as total_schedules,
    COUNT(CASE WHEN s.is_active = TRUE THEN 1 END) as active_schedules,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COUNT(CASE WHEN b.booking_status = 'cancelled' THEN 1 END) as cancelled_bookings,
    COALESCE(SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount END), 0) as total_revenue,
    COALESCE(AVG(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount END), 0) as avg_booking_value,
    ROUND(
        (COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) * 100.0 / 
         NULLIF(COUNT(b.id), 0)), 2
    ) as booking_success_rate
FROM transportation_operators o
LEFT JOIN schedules s ON o.id = s.operator_id
LEFT JOIN bookings b ON s.id = b.reference_id AND b.booking_type = 'schedule'
GROUP BY o.id, o.name, o.type, o.rating, o.total_reviews;

-- View untuk destination popular
CREATE VIEW popular_destinations_view AS
SELECT 
    d.id,
    d.name,
    d.location,
    d.description,
    d.category,
    d.price_range,
    d.rating,
    d.total_reviews,
    d.image_url,
    d.features,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COALESCE(SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount END), 0) as total_revenue,
    RANK() OVER (ORDER BY COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) DESC) as popularity_rank
FROM destinations d
LEFT JOIN bookings b ON d.id = b.reference_id AND b.booking_type = 'destination'
WHERE d.is_active = TRUE
GROUP BY d.id, d.name, d.location, d.description, d.category, d.price_range, d.rating, d.total_reviews, d.image_url, d.features
ORDER BY confirmed_bookings DESC;

-- View untuk route popular
CREATE VIEW popular_routes_view AS
SELECT 
    r.id,
    r.origin_id,
    r.destination_id,
    origin.name as origin_name,
    origin.code as origin_code,
    dest.name as destination_name,
    dest.code as destination_code,
    r.distance,
    r.estimated_duration,
    COUNT(s.id) as total_schedules,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COALESCE(AVG(s.base_price), 0) as avg_price,
    COALESCE(MIN(s.base_price), 0) as min_price,
    COALESCE(MAX(s.base_price), 0) as max_price,
    RANK() OVER (ORDER BY COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) DESC) as popularity_rank
FROM routes r
JOIN locations origin ON r.origin_id = origin.id
JOIN locations dest ON r.destination_id = dest.id
LEFT JOIN schedules s ON r.id = s.route_id AND s.is_active = TRUE
LEFT JOIN bookings b ON s.id = b.reference_id AND b.booking_type = 'schedule'
GROUP BY r.id, r.origin_id, r.destination_id, origin.name, origin.code, dest.name, dest.code, r.distance, r.estimated_duration
ORDER BY confirmed_bookings DESC;

-- View untuk user statistics
CREATE VIEW user_statistics_view AS
SELECT 
    u.id,
    u.full_name,
    u.email,
    u.user_type,
    u.is_verified,
    u.created_at,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COUNT(CASE WHEN b.booking_status = 'cancelled' THEN 1 END) as cancelled_bookings,
    COALESCE(SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount END), 0) as total_spent,
    COALESCE(AVG(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount END), 0) as avg_booking_value,
    COUNT(r.id) as total_reviews,
    COALESCE(AVG(r.rating), 0) as avg_review_rating,
    MAX(b.created_at) as last_booking_date,
    DATEDIFF(CURDATE(), MAX(b.created_at)) as days_since_last_booking
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id
LEFT JOIN reviews r ON u.id = r.user_id AND r.status = 'approved'
GROUP BY u.id, u.full_name, u.email, u.user_type, u.is_verified, u.created_at;

-- View untuk combo package details
CREATE VIEW combo_package_details_view AS
SELECT 
    cp.id,
    cp.name,
    cp.description,
    cp.duration_days,
    cp.original_price,
    cp.discounted_price,
    (cp.original_price - cp.discounted_price) as savings_amount,
    ROUND(((cp.original_price - cp.discounted_price) / cp.original_price * 100), 2) as savings_percentage,
    cp.max_participants,
    cp.rating,
    cp.total_reviews,
    cp.image_url,
    cp.itinerary,
    cp.includes,
    cp.excludes,
    cp.terms_conditions,
    cp.is_active,
    COUNT(b.id) as total_bookings,
    COUNT(CASE WHEN b.booking_status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COALESCE(SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount END), 0) as total_revenue
FROM combo_packages cp
LEFT JOIN bookings b ON cp.id = b.reference_id AND b.booking_type = 'combo'
GROUP BY cp.id, cp.name, cp.description, cp.duration_days, cp.original_price, cp.discounted_price, 
         cp.max_participants, cp.rating, cp.total_reviews, cp.image_url, cp.itinerary, 
         cp.includes, cp.excludes, cp.terms_conditions, cp.is_active;

-- View untuk payment summary
CREATE VIEW payment_summary_view AS
SELECT 
    DATE(p.created_at) as payment_date,
    COUNT(p.id) as total_transactions,
    COUNT(CASE WHEN p.payment_status = 'success' THEN 1 END) as successful_transactions,
    COUNT(CASE WHEN p.payment_status = 'failed' THEN 1 END) as failed_transactions,
    COUNT(CASE WHEN p.payment_status = 'pending' THEN 1 END) as pending_transactions,
    COALESCE(SUM(CASE WHEN p.payment_status = 'success' THEN p.amount END), 0) as total_revenue,
    COALESCE(AVG(CASE WHEN p.payment_status = 'success' THEN p.amount END), 0) as avg_transaction_value,
    ROUND(
        (COUNT(CASE WHEN p.payment_status = 'success' THEN 1 END) * 100.0 / 
         NULLIF(COUNT(p.id), 0)), 2
    ) as success_rate
FROM payments p
GROUP BY DATE(p.created_at)
ORDER BY payment_date DESC;