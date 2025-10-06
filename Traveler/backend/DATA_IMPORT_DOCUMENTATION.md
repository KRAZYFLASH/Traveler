# Data Import SQL ke MongoDB - Traveler Project

## Overview

Dokumentasi ini menjelaskan proses konversi dan import data dari struktur SQL ke MongoDB untuk proyek Traveler. Data telah berhasil diimpor ke dalam database MongoDB dengan total **15 dokumen** yang terdiri dari users, locations, transportation operators, dan promotions.

## ✅ Status Import

- **Users**: 3 dokumen (1 admin, 2 customers)
- **Locations**: 5 dokumen (airports & train stations)
- **Transportation Operators**: 4 dokumen (airlines, trains, buses)
- **Promotions**: 3 dokumen (various discount types)

## 📊 Struktur Data yang Diimpor

### 1. Users (3 dokumen)

```javascript
{
  email: String (unique),
  phone: String,
  name: String,
  password: String (hashed),
  role: 'admin' | 'customer',
  verified: Boolean,
  status: 'active' | 'inactive' | 'suspended'
}
```

**Data Sample:**

- `admin@traveler.com` - Administrator Traveler (role: admin)
- `john.doe@email.com` - John Doe (role: customer)
- `jane.smith@email.com` - Jane Smith (role: customer)

### 2. Locations (5 dokumen)

```javascript
{
  code: String (unique), // CGK, YIA, DPS, GMR, YK
  name: String,
  type: 'airport' | 'train_station' | 'bus_terminal' | 'port' | 'city',
  city: String,
  province: String,
  country: String,
  coordinates: { lat: Number, lng: Number },
  facilities: [String],
  status: 'active' | 'inactive' | 'maintenance'
}
```

**Data Sample:**

- **CGK** - Soekarno-Hatta International Airport (Tangerang, Banten)
- **YIA** - Yogyakarta International Airport (Yogyakarta, DI Yogyakarta)
- **DPS** - Ngurah Rai International Airport (Denpasar, Bali)
- **GMR** - Stasiun Gambir (Jakarta Pusat, DKI Jakarta)
- **YK** - Stasiun Yogyakarta (Yogyakarta, DI Yogyakarta)

### 3. Transportation Operators (4 dokumen)

```javascript
{
  name: String,
  code: String (unique), // GA, JT, KAI, PJ
  type: 'airline' | 'train' | 'bus' | 'ship' | 'rental',
  description: String,
  logo: String,
  country: String,
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  rating: Number,
  totalReviews: Number,
  status: 'active' | 'inactive' | 'suspended'
}
```

**Data Sample:**

- **GA** - Garuda Indonesia (airline) - Rating: 4.5
- **JT** - Lion Air (airline) - Rating: 4.2
- **KAI** - PT Kereta Api Indonesia (train) - Rating: 4.4
- **PJ** - PO Primajasa (bus) - Rating: 4.2

### 4. Promotions (3 dokumen)

```javascript
{
  code: String (unique),
  title: String,
  description: String,
  type: 'percentage' | 'fixed' | 'buy_one_get_one',
  value: Number,
  maxDiscount: Number,
  minSpend: Number,
  appliesTo: [String],
  validPeriod: {
    startDate: Date,
    endDate: Date
  },
  usage: {
    quota: Number,
    usedCount: Number,
    userLimit: Number
  },
  termsConditions: String,
  status: 'active' | 'inactive' | 'expired'
}
```

**Data Sample:**

- **NEWYEAR25** - Promo Tahun Baru 2025 (25% discount, max 300k)
- **EARLYBIRD50** - Early Bird Flight Deals (150k fixed discount)
- **STUDENT15** - Diskon Pelajar (15% discount, max 200k)

## 🛠️ Files yang Dibuat

### 1. Script Import

- **`backend/scripts/finalImport.js`** - Script utama untuk import data
- **`backend/scripts/basicImport.js`** - Script sederhana untuk testing
- **`backend/scripts/simpleImport.js`** - Script alternatif
- **`backend/scripts/importDataComplete.js`** - Script lengkap (untuk referensi)

### 2. Model Additions

- **`backend/models/bookingModelsNew.js`** - Model booking dengan passenger support

## 📝 Cara Menjalankan Import

### Prerequisites

1. MongoDB server running di `localhost:27017`
2. Database name: `traveler`
3. Node.js dan npm terinstall

### Command

```bash
cd backend
node scripts/finalImport.js
```

### Output yang Diharapkan

```
🚀 Starting SQL to MongoDB data import...
✅ Connected to MongoDB
🗑️  Clearing existing data...
📥 Starting data import...
👤 Importing users... ✅ Imported 3 users
📍 Importing locations... ✅ Imported 5 locations
🚌 Importing transportation operators... ✅ Imported 4 operators
🎫 Importing promotions... ✅ Imported 3 promotions
🎉 All data imported successfully!
📊 Total documents imported: 15
```

## 🔧 Konfigurasi Database

### MongoDB Connection

```javascript
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/traveler";
```

### Environment Variables (.env)

```
MONGODB_URI=mongodb://localhost:27017/traveler
```

## 🧪 Testing Queries

Script secara otomatis melakukan verifikasi dengan query berikut:

```javascript
// Test user
const sampleUser = await User.findOne({ email: "john.doe@email.com" });

// Test location
const sampleLocation = await Location.findOne({ code: "CGK" });

// Test operator
const sampleOperator = await TransportationOperator.findOne({ code: "GA" });

// Test promotion
const samplePromotion = await Promotion.findOne({ code: "NEWYEAR25" });
```

## 🚀 Next Steps

### 1. Admin Panel Integration

Data ini siap digunakan untuk admin panel dengan endpoints:

- `GET /api/users` - List users
- `GET /api/locations` - List locations
- `GET /api/operators` - List transportation operators
- `GET /api/promotions` - List promotions

### 2. Tambahan Data

Untuk melengkapi sistem, bisa ditambahkan:

- **Routes** - Rute perjalanan antar lokasi
- **Vehicles** - Kendaraan dari operator
- **Schedules** - Jadwal keberangkatan
- **Destinations** - Destinasi wisata
- **Combo Packages** - Paket wisata
- **Bookings** - Data pemesanan

### 3. API Endpoints

Buat controller dan routes untuk:

```javascript
// User management
router.get("/users", getUserList);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Location management
router.get("/locations", getLocationList);
router.post("/locations", createLocation);

// Operator management
router.get("/operators", getOperatorList);
router.post("/operators", createOperator);

// Promotion management
router.get("/promotions", getPromotionList);
router.post("/promotions", createPromotion);
```

## ⚠️ Catatan Penting

1. **Password**: Semua user menggunakan password hash contoh. Untuk produksi, gunakan bcrypt untuk hash password yang sesungguhnya.

2. **Custom IDs**: Saat ini menggunakan MongoDB ObjectId auto-generated. Jika butuh custom ID seperti di SQL, perlu modifikasi schema.

3. **Relationships**: Beberapa model menggunakan referensi ObjectId. Pastikan referensi benar saat menambah data baru.

4. **Indexes**: Warning duplicate index muncul karena ada index ganda. Ini normal dan tidak mempengaruhi fungsionalitas.

## 🎯 Kesimpulan

✅ **BERHASIL!** Data SQL telah berhasil dikonversi dan diimpor ke MongoDB dengan struktur yang sesuai dengan kebutuhan aplikasi Traveler. Database siap digunakan untuk development dan testing admin panel.

**Total Data Imported: 15 documents**

- 3 Users (1 admin, 2 customers)
- 5 Locations (airports & train stations)
- 4 Transportation Operators (airlines, trains, buses)
- 3 Promotions (discounts & deals)

Admin panel sekarang dapat menggunakan data ini untuk menampilkan dashboard, mengelola users, locations, operators, dan promotions! 🚀
