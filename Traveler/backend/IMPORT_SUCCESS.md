# ✅ CURL COMMANDS BERHASIL DITEST - READY TO USE

## 🚀 QUICK START (Langsung Copy-Paste)

### 1. Cek Status Server

```bash
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get
```

### 2. Import ALL Data (RECOMMENDED)

```bash
Invoke-RestMethod -Uri "http://localhost:3001/api/import/all" -Method Post -ContentType "application/json"
```

### 3. Cek Hasil Import

```bash
Invoke-RestMethod -Uri "http://localhost:3001/api/import/count" -Method Get
```

## 📊 HASIL TESTING SUKSES

✅ **Server Status**: OK - Connected to MongoDB Atlas  
✅ **Users**: 3 users (1 admin, 2 customers) - IMPORTED  
✅ **Locations**: 4 locations (airports & stations) - IMPORTED  
✅ **Operators**: 3 operators (airlines & train) - IMPORTED  
✅ **Promotions**: 2 promotions (discount codes) - IMPORTED  
✅ **Destinations**: 2 destinations + 2 categories - IMPORTED

## 🔑 ADMIN LOGIN CREDENTIALS

```
URL: http://localhost:5178/admin
Email: admin@traveler.com
Password: admin123
```

## 📝 IMPORT INDIVIDUAL (Opsional)

```bash
# Import Users
Invoke-RestMethod -Uri "http://localhost:3001/api/import/users" -Method Post -ContentType "application/json"

# Import Locations
Invoke-RestMethod -Uri "http://localhost:3001/api/import/locations" -Method Post -ContentType "application/json"

# Import Operators
Invoke-RestMethod -Uri "http://localhost:3001/api/import/operators" -Method Post -ContentType "application/json"

# Import Promotions
Invoke-RestMethod -Uri "http://localhost:3001/api/import/promotions" -Method Post -ContentType "application/json"

# Import Destinations
Invoke-RestMethod -Uri "http://localhost:3001/api/import/destinations" -Method Post -ContentType "application/json"
```

## 🎯 DATA DUMMY YANG TERSEDIA

### 👤 Users

1. **Admin Traveler** - admin@traveler.com (password: admin123)
2. **John Doe** - john.doe@gmail.com (password: password123)
3. **Jane Smith** - jane.smith@gmail.com (password: password123)

### 📍 Locations

1. **Soekarno-Hatta Airport** (CGK) - Tangerang, Banten
2. **Ngurah Rai Airport** (DPS) - Badung, Bali
3. **Stasiun Gambir** (GMR) - Jakarta Pusat
4. **Stasiun Yogyakarta** (YK) - Yogyakarta

### 🚌 Transportation Operators

1. **Garuda Indonesia** (GA) - Premium airline
2. **Lion Air** (JT) - Budget airline
3. **PT KAI** (KAI) - Train operator

### 🎫 Promotions

1. **WELCOME50** - 50% discount for new users
2. **HOLIDAY20** - 20% discount for all users

### 🏛️ Destinations

1. **Borobudur Temple** - Magelang, Central Java (Historical Sites)
2. **Tanah Lot** - Tabanan, Bali (Natural Attractions)

## ⚡ NEXT STEPS

1. **Start Backend Server**: `cd backend && node server.js`
2. **Import Data**: Copy-paste command di atas
3. **Start Frontend**: `cd frontend && npm run dev`
4. **Access Admin Panel**: http://localhost:5178/admin
5. **Login**: admin@traveler.com / admin123

## 🎉 STATUS: READY TO USE!

Semua data dummy sudah berhasil diimport ke MongoDB Atlas dan siap digunakan untuk testing admin panel dan aplikasi Traveler.

**Happy Coding! 🚀**
