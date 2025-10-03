-- ==============================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- ==============================================

-- Update operator rating ketika ada review baru
DELIMITER $$
CREATE TRIGGER update_operator_rating
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    IF NEW.target_type = 'operator' AND NEW.status = 'approved' THEN
        UPDATE transportation_operators 
        SET 
            rating = (
                SELECT AVG(rating) 
                FROM reviews 
                WHERE target_type = 'operator' 
                AND target_id = NEW.target_id 
                AND status = 'approved'
            ),
            total_reviews = (
                SELECT COUNT(*) 
                FROM reviews 
                WHERE target_type = 'operator' 
                AND target_id = NEW.target_id 
                AND status = 'approved'
            )
        WHERE id = NEW.target_id;
    END IF;
END$$
DELIMITER ;

-- Update destination rating ketika ada review baru
DELIMITER $$
CREATE TRIGGER update_destination_rating
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    IF NEW.target_type = 'destination' AND NEW.status = 'approved' THEN
        UPDATE destinations 
        SET 
            rating = (
                SELECT AVG(rating) 
                FROM reviews 
                WHERE target_type = 'destination' 
                AND target_id = NEW.target_id 
                AND status = 'approved'
            ),
            total_reviews = (
                SELECT COUNT(*) 
                FROM reviews 
                WHERE target_type = 'destination' 
                AND target_id = NEW.target_id 
                AND status = 'approved'
            )
        WHERE id = NEW.target_id;
    END IF;
END$$
DELIMITER ;

-- Update combo package rating ketika ada review baru
DELIMITER $$
CREATE TRIGGER update_combo_rating
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    IF NEW.target_type = 'combo' AND NEW.status = 'approved' THEN
        UPDATE combo_packages 
        SET 
            rating = (
                SELECT AVG(rating) 
                FROM reviews 
                WHERE target_type = 'combo' 
                AND target_id = NEW.target_id 
                AND status = 'approved'
            ),
            total_reviews = (
                SELECT COUNT(*) 
                FROM reviews 
                WHERE target_type = 'combo' 
                AND target_id = NEW.target_id 
                AND status = 'approved'
            )
        WHERE id = NEW.target_id;
    END IF;
END$$
DELIMITER ;

-- Auto-generate booking number
DELIMITER $$
CREATE TRIGGER generate_booking_number
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
    DECLARE booking_count INT;
    SELECT COUNT(*) + 1 INTO booking_count FROM bookings 
    WHERE DATE(booking_date) = DATE(NEW.booking_date);
    
    SET NEW.booking_number = CONCAT(
        'TRV',
        DATE_FORMAT(NEW.booking_date, '%Y%m%d'),
        LPAD(booking_count, 4, '0')
    );
END$$
DELIMITER ;

-- Auto-generate user ID
DELIMITER $$
CREATE TRIGGER generate_user_id
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = CONCAT('USR-', UNIX_TIMESTAMP(), '-', SUBSTRING(MD5(NEW.email), 1, 8));
    END IF;
END$$
DELIMITER ;

-- Auto-update promotion status when expired
DELIMITER $$
CREATE TRIGGER update_promotion_status
BEFORE UPDATE ON promotions
FOR EACH ROW
BEGIN
    IF NEW.end_date < CURDATE() AND NEW.status = 'active' THEN
        SET NEW.status = 'expired';
    END IF;
    
    IF NEW.used_count >= NEW.quota AND NEW.status = 'active' THEN
        SET NEW.status = 'expired';
    END IF;
END$$
DELIMITER ;

-- Log activity for important changes
DELIMITER $$
CREATE TRIGGER log_booking_changes
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF OLD.booking_status != NEW.booking_status OR OLD.payment_status != NEW.payment_status THEN
        INSERT INTO activity_logs (
            id,
            user_id,
            action,
            entity_type,
            entity_id,
            old_data,
            new_data,
            created_at
        ) VALUES (
            CONCAT('LOG-', UNIX_TIMESTAMP(), '-', SUBSTRING(MD5(CONCAT(NEW.id, NOW())), 1, 8)),
            NEW.user_id,
            'booking_status_change',
            'booking',
            NEW.id,
            JSON_OBJECT('booking_status', OLD.booking_status, 'payment_status', OLD.payment_status),
            JSON_OBJECT('booking_status', NEW.booking_status, 'payment_status', NEW.payment_status),
            NOW()
        );
    END IF;
END$$
DELIMITER ;

-- Update seat availability after booking confirmation
DELIMITER $$
CREATE TRIGGER update_seat_availability
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    DECLARE passenger_count INT;
    
    -- If booking status changed to confirmed
    IF OLD.booking_status != 'confirmed' AND NEW.booking_status = 'confirmed' AND NEW.booking_type = 'schedule' THEN
        SELECT COUNT(*) INTO passenger_count FROM booking_passengers WHERE booking_id = NEW.id;
        
        UPDATE schedules 
        SET seat_availability = JSON_SET(
            seat_availability, 
            '$.economy', 
            GREATEST(0, JSON_EXTRACT(seat_availability, '$.economy') - passenger_count)
        )
        WHERE id = NEW.reference_id;
    END IF;
    
    -- If booking status changed from confirmed to cancelled
    IF OLD.booking_status = 'confirmed' AND NEW.booking_status = 'cancelled' AND NEW.booking_type = 'schedule' THEN
        SELECT COUNT(*) INTO passenger_count FROM booking_passengers WHERE booking_id = NEW.id;
        
        UPDATE schedules 
        SET seat_availability = JSON_SET(
            seat_availability, 
            '$.economy', 
            JSON_EXTRACT(seat_availability, '$.economy') + passenger_count
        )
        WHERE id = NEW.reference_id;
    END IF;
END$$
DELIMITER ;

-- Auto-create notification after booking confirmation
DELIMITER $$
CREATE TRIGGER create_booking_notification
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    IF OLD.booking_status != 'confirmed' AND NEW.booking_status = 'confirmed' THEN
        INSERT INTO notifications (
            id,
            user_id,
            type,
            title,
            message,
            data,
            priority,
            created_at
        ) VALUES (
            CONCAT('NOTIF-', UNIX_TIMESTAMP(), '-', SUBSTRING(MD5(CONCAT(NEW.id, NOW())), 1, 8)),
            NEW.user_id,
            'booking_confirmation',
            'Booking Confirmed',
            CONCAT('Your booking ', NEW.booking_number, ' has been confirmed.'),
            JSON_OBJECT('booking_id', NEW.id, 'booking_number', NEW.booking_number),
            'high',
            NOW()
        );
    END IF;
END$$
DELIMITER ;

-- Auto-create notification after payment success
DELIMITER $$
CREATE TRIGGER create_payment_notification
AFTER UPDATE ON payments
FOR EACH ROW
BEGIN
    DECLARE booking_number VARCHAR(50);
    
    IF OLD.payment_status != 'success' AND NEW.payment_status = 'success' THEN
        SELECT b.booking_number INTO booking_number 
        FROM bookings b 
        WHERE b.id = NEW.booking_id;
        
        INSERT INTO notifications (
            id,
            user_id,
            type,
            title,
            message,
            data,
            priority,
            created_at
        ) VALUES (
            CONCAT('NOTIF-', UNIX_TIMESTAMP(), '-', SUBSTRING(MD5(CONCAT(NEW.id, NOW())), 1, 8)),
            (SELECT user_id FROM bookings WHERE id = NEW.booking_id),
            'payment_success',
            'Payment Successful',
            CONCAT('Payment for booking ', booking_number, ' has been processed successfully.'),
            JSON_OBJECT('booking_id', NEW.booking_id, 'payment_id', NEW.id, 'amount', NEW.amount),
            'high',
            NOW()
        );
    END IF;
END$$
DELIMITER ;