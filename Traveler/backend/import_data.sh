# CURL COMMANDS untuk Import Data Dummy ke MongoDB
# Pastikan server backend sudah running di port 3001

# ==============================================
# INFORMASI SERVER
# ==============================================
echo "🚀 Traveler Data Import Commands"
echo "=================================="
echo "Server: http://localhost:3001"
echo "MongoDB: MongoDB Atlas (from .env)"
echo "=================================="

# ==============================================
# 1. CEK STATUS SERVER & DATABASE
# ==============================================
echo "📋 1. Cek Status Server & Database"
curl -X GET http://localhost:3001/health

echo -e "\n📋 2. Info Import Endpoints"
curl -X GET http://localhost:3001/api/import/

# ==============================================
# 3. IMPORT SEMUA DATA SEKALIGUS (RECOMMENDED)
# ==============================================
echo -e "\n🚀 3. Import SEMUA Data Dummy Sekaligus"
curl -X POST http://localhost:3001/api/import/all \
  -H "Content-Type: application/json"

# ==============================================
# ATAU IMPORT SATU PER SATU
# ==============================================

echo -e "\n👤 4. Import Users (3 users: 1 admin, 2 customers)"
curl -X POST http://localhost:3001/api/import/users \
  -H "Content-Type: application/json"

echo -e "\n📍 5. Import Locations (4 airports & train stations)"
curl -X POST http://localhost:3001/api/import/locations \
  -H "Content-Type: application/json"

echo -e "\n🚌 6. Import Transportation Operators (airlines, trains)"
curl -X POST http://localhost:3001/api/import/operators \
  -H "Content-Type: application/json"

echo -e "\n🎫 7. Import Promotions (discount codes)"
curl -X POST http://localhost:3001/api/import/promotions \
  -H "Content-Type: application/json"

echo -e "\n🏛️ 8. Import Destinations (tourist attractions)"
curl -X POST http://localhost:3001/api/import/destinations \
  -H "Content-Type: application/json"

# ==============================================
# CEK HASIL IMPORT
# ==============================================
echo -e "\n📊 9. Cek Jumlah Data yang Sudah Diimport"
curl -X GET http://localhost:3001/api/import/count

echo -e "\n✅ Import completed! Check your MongoDB database."