# 📋 PANDUAN IMPORT DATA DUMMY KE MONGODB

## 🚀 Persiapan

### 1. Pastikan Server Backend Running

```bash
cd backend
npm run dev
# atau
node server.js
```

### 2. Cek Status Server & Database

```bash
curl -X GET http://localhost:3001/health
```

**Response yang diharapkan:**

```json
{
  "status": "OK",
  "message": "Traveler API is running",
  "database": "Connected",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 📦 Data Dummy yang Akan Diimport

### 👤 Users (3 users)

- **Admin**: admin@traveler.com (password: admin123)
- **Customer 1**: john.doe@gmail.com (password: password123)
- **Customer 2**: jane.smith@gmail.com (password: password123)

### 📍 Locations (4 locations)

- **Soekarno-Hatta Airport** (Jakarta)
- **Ngurah Rai Airport** (Bali)
- **Gambir Station** (Jakarta)
- **Yogyakarta Station** (Yogyakarta)

### 🚌 Transportation Operators (3 operators)

- **Garuda Indonesia** (Airline)
- **Lion Air** (Airline)
- **PT KAI** (Train)

### 🎫 Promotions (2 promotions)

- **WELCOME50** (50% off, new users)
- **HOLIDAY20** (20% off, all users)

### 🏛️ Destinations (2 destinations)

- **Borobudur Temple** (Yogyakarta)
- **Tanah Lot** (Bali)

---

## 🎯 Quick Import (Recommended)

### Import Semua Data Sekaligus

```bash
curl -X POST http://localhost:3001/api/import/all -H "Content-Type: application/json"
```

**Response sukses:**

```json
{
  "success": true,
  "message": "All data imported successfully",
  "data": {
    "users": 3,
    "locations": 4,
    "operators": 3,
    "promotions": 2,
    "destinations": 2
  }
}
```

### Cek Hasil Import

```bash
curl -X GET http://localhost:3001/api/import/count
```

---

## 📊 Import Individual (Opsional)

### Import Users

```bash
curl -X POST http://localhost:3001/api/import/users -H "Content-Type: application/json"
```

### Import Locations

```bash
curl -X POST http://localhost:3001/api/import/locations -H "Content-Type: application/json"
```

### Import Transportation Operators

```bash
curl -X POST http://localhost:3001/api/import/operators -H "Content-Type: application/json"
```

### Import Promotions

```bash
curl -X POST http://localhost:3001/api/import/promotions -H "Content-Type: application/json"
```

### Import Destinations

```bash
curl -X POST http://localhost:3001/api/import/destinations -H "Content-Type: application/json"
```

---

## 🔑 Login ke Admin Panel

### 1. Login Admin

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@traveler.com","password":"admin123"}'
```

### 2. Akses Admin Panel

```
URL: http://localhost:5178/admin
Email: admin@traveler.com
Password: admin123
```

---

## 🗑️ Cleanup Data (Jika Perlu Reset)

### Delete All Data

```bash
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
```

---

## 🛠️ PowerShell Commands (Windows)

### Import All Data

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/import/all" -Method Post -ContentType "application/json"
```

### Check Status

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get
```

### Check Data Count

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/import/count" -Method Get
```

---

## 🚨 Troubleshooting

### Error: Connection Refused

- Pastikan server backend running di port 3001
- Cek file .env ada MONGODB_URI yang valid

### Error: Database Disconnected

- Cek koneksi internet
- Pastikan MongoDB Atlas cluster aktif
- Verifikasi MONGODB_URI di .env

### Error: Route Not Found

- Pastikan menggunakan endpoint yang benar
- Cek server.js sudah include importRouter

### Error: Data Already Exists

- Data dummy menggunakan unique identifiers
- Gunakan DELETE endpoints untuk cleanup terlebih dahulu

---

## 📝 File Import Scripts

1. **import_data.sh** - Bash script lengkap
2. **import_data.ps1** - PowerShell script
3. **CURL_COMMANDS.md** - Copy-paste commands
4. **IMPORT_GUIDE.md** - Dokumentasi lengkap (file ini)

---

## ✅ Verifikasi Import Berhasil

Setelah import, cek di:

1. **MongoDB Atlas Dashboard** - Lihat collections bertambah
2. **Admin Panel** - Login dan cek data di dashboard
3. **API Response** - Endpoint `/api/import/count` menunjukkan jumlah data

**Happy Coding! 🎉**
