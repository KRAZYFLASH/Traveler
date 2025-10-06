# QUICK CURL COMMANDS - Copy & Paste Individual Commands

## SETUP: Pastikan server backend running di port 3001

# 1. CHECK SERVER STATUS

curl -X GET http://localhost:3001/health

# 2. IMPORT ALL DATA (RECOMMENDED - ONE COMMAND)

curl -X POST http://localhost:3001/api/import/all -H "Content-Type: application/json"

# 3. CHECK IMPORTED DATA COUNT

curl -X GET http://localhost:3001/api/import/count

# ===============================================

# IMPORT INDIVIDUAL ENTITIES (OPTIONAL)

# ===============================================

# Import Users (1 admin, 2 customers)

curl -X POST http://localhost:3001/api/import/users -H "Content-Type: application/json"

# Import Locations (airports, train stations)

curl -X POST http://localhost:3001/api/import/locations -H "Content-Type: application/json"

# Import Transportation Operators (airlines, trains)

curl -X POST http://localhost:3001/api/import/operators -H "Content-Type: application/json"

# Import Promotions (discount codes)

curl -X POST http://localhost:3001/api/import/promotions -H "Content-Type: application/json"

# Import Destinations (tourist attractions)

curl -X POST http://localhost:3001/api/import/destinations -H "Content-Type: application/json"

# ===============================================

# AUTHENTICATION EXAMPLE (if needed)

# ===============================================

# Login as admin first (get token)

curl -X POST http://localhost:3001/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@traveler.com","password":"admin123"}'

# Use token for authenticated requests (replace <TOKEN> with actual token)

curl -X POST http://localhost:3001/api/import/all \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer <TOKEN>"

# ===============================================

# CLEANUP (if needed to reset data)

# ===============================================

# Delete all users

curl -X DELETE http://localhost:3001/api/import/users

# Delete all locations

curl -X DELETE http://localhost:3001/api/import/locations

# Delete all operators

curl -X DELETE http://localhost:3001/api/import/operators

# Delete all promotions

curl -X DELETE http://localhost:3001/api/import/promotions

# Delete all destinations

curl -X DELETE http://localhost:3001/api/import/destinations
