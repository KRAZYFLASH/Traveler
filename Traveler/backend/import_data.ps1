# CURL COMMANDS untuk Import Data Dummy ke MongoDB
# Untuk Windows PowerShell

# ==============================================
# INFORMASI SERVER
# ==============================================
Write-Host "🚀 Traveler Data Import Commands" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Server: http://localhost:3001" -ForegroundColor Yellow
Write-Host "MongoDB: MongoDB Atlas (from .env)" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan

# ==============================================
# 1. CEK STATUS SERVER & DATABASE
# ==============================================
Write-Host "`n📋 1. Cek Status Server & Database" -ForegroundColor Green
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get

Write-Host "`n📋 2. Info Import Endpoints" -ForegroundColor Green
Invoke-RestMethod -Uri "http://localhost:3001/api/import/" -Method Get

# ==============================================
# 3. IMPORT SEMUA DATA SEKALIGUS (RECOMMENDED)
# ==============================================
Write-Host "`n🚀 3. Import SEMUA Data Dummy Sekaligus" -ForegroundColor Magenta
Invoke-RestMethod -Uri "http://localhost:3001/api/import/all" -Method Post -ContentType "application/json"

# ==============================================
# ATAU IMPORT SATU PER SATU
# ==============================================

Write-Host "`n👤 4. Import Users (3 users: 1 admin, 2 customers)" -ForegroundColor Blue
Invoke-RestMethod -Uri "http://localhost:3001/api/import/users" -Method Post -ContentType "application/json"

Write-Host "`n📍 5. Import Locations (4 airports & train stations)" -ForegroundColor Blue
Invoke-RestMethod -Uri "http://localhost:3001/api/import/locations" -Method Post -ContentType "application/json"

Write-Host "`n🚌 6. Import Transportation Operators (airlines, trains)" -ForegroundColor Blue
Invoke-RestMethod -Uri "http://localhost:3001/api/import/operators" -Method Post -ContentType "application/json"

Write-Host "`n🎫 7. Import Promotions (discount codes)" -ForegroundColor Blue
Invoke-RestMethod -Uri "http://localhost:3001/api/import/promotions" -Method Post -ContentType "application/json"

Write-Host "`n🏛️ 8. Import Destinations (tourist attractions)" -ForegroundColor Blue
Invoke-RestMethod -Uri "http://localhost:3001/api/import/destinations" -Method Post -ContentType "application/json"

# ==============================================
# CEK HASIL IMPORT
# ==============================================
Write-Host "`n📊 9. Cek Jumlah Data yang Sudah Diimport" -ForegroundColor Yellow
Invoke-RestMethod -Uri "http://localhost:3001/api/import/count" -Method Get

Write-Host "`n✅ Import completed! Check your MongoDB database." -ForegroundColor Green