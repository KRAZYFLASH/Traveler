# Custom Toast Component - Traveler Admin Panel

## 📋 Overview

Custom toast notification system yang dibuat khusus untuk admin panel Traveler dengan styling yang sesuai tema project.

## ✨ Features

- 🎨 **5 Tipe Toast**: Success, Error, Warning, Info, Loading
- 🌈 **Gradient Design**: Menggunakan warna biru/indigo sesuai tema Traveler
- ⚡ **Smooth Animation**: Animasi masuk dan keluar yang smooth
- ⏰ **Auto Dismiss**: Otomatis hilang setelah durasi tertentu
- 👆 **Manual Close**: Bisa ditutup manual dengan tombol X
- 📱 **Responsive**: Bekerja di semua ukuran layar
- 🚀 **Portal Rendering**: Menggunakan React Portal untuk z-index optimal

## 🔧 Installation & Setup

### 1. Import ToastProvider

```jsx
// App.jsx
import { ToastProvider } from "./components/Toast";

function App() {
  return <ToastProvider>{/* Your app components */}</ToastProvider>;
}
```

### 2. Use Toast Hook

```jsx
// Any component
import { useToast } from "../components/Toast";

const MyComponent = () => {
  const toast = useToast();

  // Use toast methods...
};
```

## 🎯 Usage Examples

### Basic Toast Types

```jsx
const handleActions = () => {
  // Success toast
  toast.success("Booking berhasil dibuat! ✈️");

  // Error toast
  toast.error("Gagal menyimpan data. Silakan coba lagi.");

  // Warning toast
  toast.warning("Stok tiket terbatas untuk tanggal ini!");

  // Info toast
  toast.info("Jangan lupa check-in 2 jam sebelum keberangkatan.");

  // Loading toast (auto dismiss after 5 seconds)
  toast.loading("Sedang memproses pembayaran...", 5000);
};
```

### Advanced Usage

```jsx
// Custom duration (default: 4000ms)
toast.success("Data tersimpan!", 6000);

// Loading with custom duration
toast.loading("Uploading file...", 10000);

// Clear all toasts
toast.clear();
```

### Real-world Examples

#### Login Form

```jsx
const handleLogin = async (formData) => {
  try {
    toast.loading("Memverifikasi akun...", 8000);

    const response = await api.login(formData);

    if (response.success) {
      toast.success(`Selamat datang, ${response.user.name}! 👋`);
      navigate("/dashboard");
    }
  } catch (error) {
    if (error.status === 401) {
      toast.error("Email atau password salah!");
    } else {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    }
  }
};
```

#### Form Validation

```jsx
const handleSubmit = (data) => {
  if (!data.destination) {
    toast.warning("Pilih destinasi terlebih dahulu!");
    return;
  }

  if (!data.departureDate) {
    toast.warning("Tanggal keberangkatan wajib diisi!");
    return;
  }

  // Process form...
  toast.success("Paket wisata berhasil dibuat! 🎉");
};
```

#### File Upload

```jsx
const handleFileUpload = async (file) => {
  if (file.size > 5 * 1024 * 1024) {
    toast.error("Ukuran file maksimal 5MB!");
    return;
  }

  toast.loading("Mengupload gambar...", 15000);

  try {
    await uploadImage(file);
    toast.success("Gambar berhasil diupload! 📸");
  } catch (error) {
    toast.error("Gagal upload gambar. Coba lagi.");
  }
};
```

## 🎨 Styling & Customization

### Toast Types & Colors

- **Success**: Green gradient dengan ikon ✅
- **Error**: Red gradient dengan ikon ❌
- **Warning**: Amber gradient dengan ikon ⚠️
- **Info**: Blue gradient dengan ikon ℹ️
- **Loading**: Gray gradient dengan spinner ⏳

### Animation Duration

- **Enter**: 300ms ease-out
- **Exit**: 200ms ease-in
- **Auto-dismiss**: 4000ms (customizable)

## 📱 Responsive Design

Toast akan otomatis menyesuaikan posisi:

- **Desktop**: Fixed top-right corner
- **Mobile**: Full width di bagian atas

## 🔍 Testing

Kunjungi `/demo` untuk melihat semua tipe toast dalam aksi:

```
http://localhost:5179/demo
```

## 🚀 Best Practices

### 1. Meaningful Messages

```jsx
// ❌ Bad
toast.success("Success!");

// ✅ Good
toast.success("Booking tiket ke Bali berhasil dibuat!");
```

### 2. Context-Aware Messages

```jsx
// For travel context
toast.info("Cuaca cerah untuk perjalanan Anda! ☀️");
toast.warning("Jangan lupa bawa paspor untuk perjalanan internasional!");
```

### 3. Error Handling

```jsx
// Provide actionable feedback
toast.error("Pembayaran gagal. Periksa saldo atau coba metode lain.");
```

### 4. Loading States

```jsx
// Be specific about what's loading
toast.loading("Mencari penerbangan terbaik untuk Anda...", 6000);
```

## 🔧 Troubleshooting

### Toast Not Showing

1. Pastikan `ToastProvider` membungkus aplikasi
2. Cek apakah `useToast` dipanggil di dalam komponen yang tepat
3. Pastikan tidak ada CSS conflicts dengan z-index

### Styling Issues

1. Pastikan Tailwind CSS sudah di-setup dengan benar
2. Cek apakah ada CSS yang override styling toast

### Performance

1. Gunakan `toast.clear()` sebelum navigasi untuk membersihkan toast
2. Hindari spam toast dengan debouncing pada action yang frequent

## 📝 Changelog

### v1.0.0 (Current)

- ✅ Initial release dengan 5 tipe toast
- ✅ React Portal implementation
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Traveler theme integration
- ✅ Demo page untuk testing

## 🎯 Future Enhancements

- [ ] Toast queue system untuk multiple toasts
- [ ] Custom positioning options
- [ ] Sound notifications
- [ ] Push notification integration
- [ ] Dark mode support
