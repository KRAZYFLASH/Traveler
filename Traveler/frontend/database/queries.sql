-- ==============================================
-- QUERY COLLECTION FOR TRAVELER API ENDPOINTS
-- ==============================================

-- ================== AUTHENTICATION & USER QUERIES ==================

-- Get user by email for login
SELECT 
    id, email, password_hash, full_name, user_type, is_verified, 
    preferences, created_at, last_login_at
FROM users 
WHERE email = ? AND is_active = TRUE;

-- Update user last login
UPDATE users 
SET last_login_at = NOW() 
WHERE id = ?;

-- Get user profile details
SELECT 
    id, email, phone, full_name, date_of_birth, gender, 
    address, user_type, is_verified, preferences, created_at
FROM users 
WHERE id = ?;

-- Update user profile
UPDATE users 
SET full_name = ?, phone = ?, date_of_birth = ?, gender = ?, 
    address = ?, preferences = ?, updated_at = NOW() 
WHERE id = ?;

-- ================== SEARCH & SCHEDULE QUERIES ==================

-- Search flights
SELECT 
    s.id, s.departure_time, s.arrival_time, s.base_price,
    s.seat_availability, s.features,
    o.name as operator_name, o.type as transport_type, o.logo_url, o.rating,
    v.name as vehicle_name, v.type as vehicle_type,
    origin.name as origin_name, origin.code as origin_code,
    dest.name as destination_name, dest.code as destination_code,
    r.distance, r.estimated_duration
FROM schedules s
JOIN transportation_operators o ON s.operator_id = o.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN routes r ON s.route_id = r.id
JOIN locations origin ON r.origin_id = origin.id
JOIN locations dest ON r.destination_id = dest.id
WHERE origin.code = ? 
AND dest.code = ? 
AND DATE(s.departure_time) = ?
AND o.type = 'pesawat'
AND s.is_active = TRUE
ORDER BY s.departure_time ASC;

-- Search trains
SELECT 
    s.id, s.departure_time, s.arrival_time, s.base_price,
    s.seat_availability, s.features,
    o.name as operator_name, o.type as transport_type, o.logo_url, o.rating,
    v.name as vehicle_name, v.type as vehicle_type,
    origin.name as origin_name, origin.code as origin_code,
    dest.name as destination_name, dest.code as destination_code,
    r.distance, r.estimated_duration
FROM schedules s
JOIN transportation_operators o ON s.operator_id = o.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN routes r ON s.route_id = r.id
JOIN locations origin ON r.origin_id = origin.id
JOIN locations dest ON r.destination_id = dest.id
WHERE origin.code = ? 
AND dest.code = ? 
AND DATE(s.departure_time) = ?
AND o.type = 'kereta'
AND s.is_active = TRUE
ORDER BY s.departure_time ASC;

-- Search buses
SELECT 
    s.id, s.departure_time, s.arrival_time, s.base_price,
    s.seat_availability, s.features,
    o.name as operator_name, o.type as transport_type, o.logo_url, o.rating,
    v.name as vehicle_name, v.type as vehicle_type,
    origin.name as origin_name, origin.code as origin_code,
    dest.name as destination_name, dest.code as destination_code,
    r.distance, r.estimated_duration
FROM schedules s
JOIN transportation_operators o ON s.operator_id = o.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN routes r ON s.route_id = r.id
JOIN locations origin ON r.origin_id = origin.id
JOIN locations dest ON r.destination_id = dest.id
WHERE origin.code = ? 
AND dest.code = ? 
AND DATE(s.departure_time) = ?
AND o.type = 'bus'
AND s.is_active = TRUE
ORDER BY s.departure_time ASC;

-- Search ships/ferries
SELECT 
    s.id, s.departure_time, s.arrival_time, s.base_price,
    s.seat_availability, s.features,
    o.name as operator_name, o.type as transport_type, o.logo_url, o.rating,
    v.name as vehicle_name, v.type as vehicle_type,
    origin.name as origin_name, origin.code as origin_code,
    dest.name as destination_name, dest.code as destination_code,
    r.distance, r.estimated_duration
FROM schedules s
JOIN transportation_operators o ON s.operator_id = o.id
JOIN vehicles v ON s.vehicle_id = v.id
JOIN routes r ON s.route_id = r.id
JOIN locations origin ON r.origin_id = origin.id
JOIN locations dest ON r.destination_id = dest.id
WHERE origin.code = ? 
AND dest.code = ? 
AND DATE(s.departure_time) = ?
AND o.type = 'kapal'
AND s.is_active = TRUE
ORDER BY s.departure_time ASC;

-- Get schedule details by ID
SELECT * FROM schedule_details_view WHERE id = ?;

-- Get popular routes
SELECT * FROM popular_routes_view LIMIT 10;

-- Search locations by name or code
SELECT id, name, code, type, city, province 
FROM locations 
WHERE (name LIKE ? OR code LIKE ?) 
AND type = ? 
AND is_active = TRUE 
ORDER BY name ASC;

-- ================== DESTINATION QUERIES ==================

-- Get all destinations with pagination
SELECT 
    id, name, location, description, category, price_range, 
    rating, total_reviews, image_url, features
FROM destinations 
WHERE is_active = TRUE 
ORDER BY rating DESC, total_reviews DESC 
LIMIT ? OFFSET ?;

-- Get destinations by category
SELECT 
    id, name, location, description, category, price_range, 
    rating, total_reviews, image_url, features
FROM destinations 
WHERE category = ? AND is_active = TRUE 
ORDER BY rating DESC 
LIMIT ? OFFSET ?;

-- Get destination details
SELECT 
    id, name, location, description, category, price_range, 
    rating, total_reviews, image_url, features, includes, 
    excludes, terms_conditions
FROM destinations 
WHERE id = ? AND is_active = TRUE;

-- Get popular destinations
SELECT * FROM popular_destinations_view LIMIT 10;

-- Search destinations
SELECT 
    id, name, location, description, category, price_range, 
    rating, total_reviews, image_url
FROM destinations 
WHERE (name LIKE ? OR location LIKE ? OR description LIKE ?) 
AND is_active = TRUE 
ORDER BY rating DESC;

-- ================== COMBO PACKAGE QUERIES ==================

-- Get all combo packages
SELECT * FROM combo_package_details_view 
WHERE is_active = TRUE 
ORDER BY rating DESC, total_bookings DESC;

-- Get combo package details
SELECT * FROM combo_package_details_view 
WHERE id = ? AND is_active = TRUE;

-- Search combo packages
SELECT 
    id, name, description, duration_days, original_price, 
    discounted_price, max_participants, rating, total_reviews, image_url
FROM combo_packages 
WHERE (name LIKE ? OR description LIKE ?) 
AND is_active = TRUE 
ORDER BY rating DESC;

-- Get combo packages by duration
SELECT * FROM combo_package_details_view 
WHERE duration_days BETWEEN ? AND ? 
AND is_active = TRUE 
ORDER BY discounted_price ASC;

-- ================== PROMOTION QUERIES ==================

-- Get active promotions
SELECT * FROM active_promotions_view 
ORDER BY value DESC;

-- Get promotion by code
SELECT 
    id, code, name, description, type, value, min_purchase, 
    max_discount, start_date, end_date, applicable_to, terms_conditions
FROM promotions 
WHERE code = ? 
AND status = 'active' 
AND start_date <= CURDATE() 
AND end_date >= CURDATE() 
AND used_count < quota;

-- Validate promotion for booking
SELECT 
    id, type, value, min_purchase, max_discount, applicable_to,
    (quota - used_count) as remaining_uses
FROM promotions 
WHERE code = ? 
AND status = 'active' 
AND start_date <= CURDATE() 
AND end_date >= CURDATE() 
AND used_count < quota;

-- Get promotions by type
SELECT * FROM active_promotions_view 
WHERE applicable_to = ? OR applicable_to = 'all' 
ORDER BY value DESC;

-- ================== BOOKING QUERIES ==================

-- Create new booking
INSERT INTO bookings (
    id, user_id, booking_type, reference_id, booking_status, 
    payment_status, total_passengers, total_amount, booking_date, special_requests
) VALUES (?, ?, ?, ?, 'pending', 'pending', ?, ?, NOW(), ?);

-- Get booking details
SELECT * FROM booking_details_view WHERE id = ?;

-- Get user bookings
SELECT * FROM booking_details_view 
WHERE user_id = ? 
ORDER BY booking_date DESC 
LIMIT ? OFFSET ?;

-- Get bookings by status
SELECT * FROM booking_details_view 
WHERE user_id = ? AND booking_status = ? 
ORDER BY booking_date DESC;

-- Update booking status
UPDATE bookings 
SET booking_status = ?, updated_at = NOW() 
WHERE id = ?;

-- Update payment status
UPDATE bookings 
SET payment_status = ?, updated_at = NOW() 
WHERE id = ?;

-- Cancel booking
UPDATE bookings 
SET booking_status = 'cancelled', updated_at = NOW() 
WHERE id = ? AND user_id = ?;

-- Add booking passengers
INSERT INTO booking_passengers (
    id, booking_id, full_name, id_number, date_of_birth, 
    nationality, phone, email, seat_number, meal_preference, special_needs
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Get booking passengers
SELECT 
    id, full_name, id_number, date_of_birth, nationality, 
    phone, email, seat_number, meal_preference, special_needs
FROM booking_passengers 
WHERE booking_id = ?;

-- ================== PAYMENT QUERIES ==================

-- Create payment record
INSERT INTO payments (
    id, booking_id, payment_method, amount, payment_status, 
    transaction_id, gateway_response, created_at
) VALUES (?, ?, ?, ?, 'pending', ?, ?, NOW());

-- Update payment status
UPDATE payments 
SET payment_status = ?, gateway_response = ?, paid_at = NOW(), updated_at = NOW() 
WHERE id = ?;

-- Get payment details
SELECT 
    id, booking_id, payment_method, amount, payment_status, 
    transaction_id, gateway_response, paid_at, created_at
FROM payments 
WHERE id = ?;

-- Get payments by booking
SELECT 
    id, payment_method, amount, payment_status, 
    transaction_id, paid_at, created_at
FROM payments 
WHERE booking_id = ? 
ORDER BY created_at DESC;

-- Get payment summary
SELECT * FROM payment_summary_view 
WHERE payment_date BETWEEN ? AND ? 
ORDER BY payment_date DESC;

-- ================== REVIEW QUERIES ==================

-- Get reviews by target
SELECT 
    r.id, r.rating, r.title, r.comment, r.images, r.helpful_count, r.created_at,
    u.full_name as reviewer_name
FROM reviews r
JOIN users u ON r.user_id = u.id
WHERE r.target_type = ? AND r.target_id = ? AND r.status = 'approved'
ORDER BY r.created_at DESC 
LIMIT ? OFFSET ?;

-- Create review
INSERT INTO reviews (
    id, user_id, target_type, target_id, rating, title, 
    comment, images, status, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW());

-- Get user reviews
SELECT 
    r.id, r.target_type, r.target_id, r.rating, r.title, r.comment, 
    r.status, r.helpful_count, r.created_at
FROM reviews r
WHERE r.user_id = ? 
ORDER BY r.created_at DESC;

-- Update review helpful count
UPDATE reviews 
SET helpful_count = helpful_count + 1 
WHERE id = ?;

-- ================== NOTIFICATION QUERIES ==================

-- Get user notifications
SELECT 
    id, type, title, message, data, priority, is_read, created_at
FROM notifications 
WHERE user_id = ? 
ORDER BY created_at DESC 
LIMIT ? OFFSET ?;

-- Get unread notifications count
SELECT COUNT(*) as unread_count 
FROM notifications 
WHERE user_id = ? AND is_read = FALSE;

-- Mark notification as read
UPDATE notifications 
SET is_read = TRUE, updated_at = NOW() 
WHERE id = ? AND user_id = ?;

-- Mark all notifications as read
UPDATE notifications 
SET is_read = TRUE, updated_at = NOW() 
WHERE user_id = ?;

-- Create notification
INSERT INTO notifications (
    id, user_id, type, title, message, data, priority, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, NOW());

-- ================== STATISTICS & ANALYTICS QUERIES ==================

-- Get operator performance
SELECT * FROM operator_performance_view 
ORDER BY total_revenue DESC;

-- Get booking statistics by date range
SELECT 
    DATE(booking_date) as booking_date,
    COUNT(*) as total_bookings,
    COUNT(CASE WHEN booking_status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COUNT(CASE WHEN booking_status = 'cancelled' THEN 1 END) as cancelled_bookings,
    SUM(CASE WHEN booking_status = 'confirmed' THEN total_amount ELSE 0 END) as total_revenue
FROM bookings 
WHERE booking_date BETWEEN ? AND ? 
GROUP BY DATE(booking_date) 
ORDER BY booking_date DESC;

-- Get user statistics
SELECT * FROM user_statistics_view 
WHERE id = ?;

-- Get top destinations by bookings
SELECT 
    d.name, d.location, d.category,
    COUNT(b.id) as total_bookings,
    SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount ELSE 0 END) as revenue
FROM destinations d
LEFT JOIN bookings b ON d.id = b.reference_id AND b.booking_type = 'destination'
WHERE d.is_active = TRUE
GROUP BY d.id, d.name, d.location, d.category
ORDER BY total_bookings DESC
LIMIT 10;

-- Get revenue by transport type
SELECT 
    o.type as transport_type,
    COUNT(b.id) as total_bookings,
    SUM(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount ELSE 0 END) as total_revenue,
    AVG(CASE WHEN b.booking_status = 'confirmed' THEN b.total_amount ELSE 0 END) as avg_booking_value
FROM bookings b
JOIN schedules s ON b.reference_id = s.id AND b.booking_type = 'schedule'
JOIN transportation_operators o ON s.operator_id = o.id
WHERE b.booking_date BETWEEN ? AND ?
GROUP BY o.type
ORDER BY total_revenue DESC;

-- ================== ADMIN QUERIES ==================

-- Get all bookings for admin
SELECT 
    b.*, u.full_name as customer_name, u.email as customer_email
FROM bookings b
JOIN users u ON b.user_id = u.id
ORDER BY b.booking_date DESC 
LIMIT ? OFFSET ?;

-- Get bookings by status for admin
SELECT 
    b.*, u.full_name as customer_name, u.email as customer_email
FROM bookings b
JOIN users u ON b.user_id = u.id
WHERE b.booking_status = ?
ORDER BY b.booking_date DESC;

-- Get pending reviews for approval
SELECT 
    r.*, u.full_name as reviewer_name
FROM reviews r
JOIN users u ON r.user_id = u.id
WHERE r.status = 'pending'
ORDER BY r.created_at ASC;

-- Approve review
UPDATE reviews 
SET status = 'approved', approved_at = NOW() 
WHERE id = ?;

-- Get system activity logs
SELECT 
    al.*, u.full_name as user_name
FROM activity_logs al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.created_at DESC 
LIMIT ? OFFSET ?;

-- ================== UTILITY QUERIES ==================

-- Check seat availability
SELECT 
    s.seat_availability,
    JSON_EXTRACT(s.seat_availability, '$.economy') as economy_seats,
    JSON_EXTRACT(s.seat_availability, '$.business') as business_seats,
    JSON_EXTRACT(s.seat_availability, '$.first') as first_seats
FROM schedules s 
WHERE s.id = ?;

-- Update seat availability
UPDATE schedules 
SET seat_availability = JSON_SET(
    seat_availability, 
    '$.economy', 
    GREATEST(0, JSON_EXTRACT(seat_availability, '$.economy') - ?)
)
WHERE id = ?;

-- Get system settings
SELECT setting_key, setting_value, description 
FROM system_settings 
WHERE setting_key = ?;

-- Update system setting
UPDATE system_settings 
SET setting_value = ?, updated_at = NOW() 
WHERE setting_key = ?;

-- Log user activity
INSERT INTO activity_logs (
    id, user_id, action, entity_type, entity_id, 
    old_data, new_data, ip_address, user_agent, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW());