import React, { useState, useMemo } from "react";
import {
  User, Mail, Phone, MapPin, Calendar,
  Camera, Settings, Shield, Bell, Gift, LogOut, CheckCircle2
} from "lucide-react";

// Mock data (ganti dengan API)
const MOCK_USER = {
  name: "Fakhri",
  email: "fakhri@example.com",
  phone: "+62 812-3456-7890",
  location: "Bandar Lampung, Indonesia",
  joinedAt: "2024-05-12",
  avatar: "https://i.pravatar.cc/240?img=12",
  cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
};

export default function ProfileSettingsPage() {
  const [form, setForm] = useState({
    name: MOCK_USER.name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    location: MOCK_USER.location,
    newsletter: true,
    promoPush: true,
    twoFA: false,
  });

  const completed = useMemo(() => {
    const fields = ["name", "email", "phone", "location"];
    const done = fields.filter((f) => String(form[f] || "").trim().length > 0).length;
    return Math.round((done / fields.length) * 100);
  }, [form]);

  const onChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      {/* Cover */}
      <div className="relative h-48 w-full">
        <img src={MOCK_USER.cover} alt="cover" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-white/20" />
      </div>

      {/* Profile Card */}
      <section className="max-w-5xl mx-auto px-6 -mt-16">
        <div className="rounded-2xl border bg-white/80 backdrop-blur shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="relative w-28 h-28 shrink-0">
              <img
                src={MOCK_USER.avatar}
                alt={MOCK_USER.name}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-white shadow"
              />
              <button
                className="absolute -bottom-2 -right-2 inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg bg-slate-900 text-white hover:bg-black"
                onClick={() => alert("Ganti foto (demo)")}
              >
                <Camera className="w-3.5 h-3.5" /> Ubah
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{MOCK_USER.name}</h1>
              <div className="mt-1 text-sm text-slate-600 space-y-1">
                <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {MOCK_USER.email}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> {MOCK_USER.phone}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {MOCK_USER.location}</p>
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Bergabung {new Date(MOCK_USER.joinedAt).toLocaleDateString("id-ID")}</p>
              </div>
              <div className="mt-3 text-sm text-slate-500">Kelengkapan Profil: <span className="font-semibold">{completed}%</span></div>
            </div>

            {/* Action */}
            <div className="flex gap-2">
              <button
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-slate-50"
                onClick={() => alert("Pengaturan akun (demo)")}
              >
                <Settings className="w-4 h-4" /> Pengaturan
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-3 py-2 hover:bg-black"
                onClick={() => alert("Keluar (demo)")}
              >
                <LogOut className="w-4 h-4" /> Keluar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Settings Form */}
      <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Data Profil */}
        <div className="lg:col-span-7 rounded-2xl border bg-white/80 backdrop-blur p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><User className="w-5 h-5" /> Data Profil</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500">Nama Lengkap</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border"
                value={form.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Lokasi</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border"
                value={form.location}
                onChange={(e) => onChange("location", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 rounded-lg border"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">Nomor Telepon</label>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border"
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-black"
              onClick={() => alert("Disimpan (demo)")}
            >
              Simpan
            </button>
            <button
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
              onClick={() => alert("Batal (demo)")}
            >
              Batal
            </button>
          </div>
        </div>

        {/* Setting Preferensi & Keamanan */}
        <div className="lg:col-span-5 rounded-2xl border bg-white/80 backdrop-blur p-6 space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Settings className="w-5 h-5" /> Pengaturan</h2>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between">
              <span className="flex items-center gap-2"><Bell className="w-4 h-4" /> Email Newsletter</span>
              <input
                type="checkbox"
                checked={form.newsletter}
                onChange={(e) => onChange("newsletter", e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between">
              <span className="flex items-center gap-2"><Gift className="w-4 h-4" /> Notifikasi Promo</span>
              <input
                type="checkbox"
                checked={form.promoPush}
                onChange={(e) => onChange("promoPush", e.target.checked)}
              />
            </label>
          </div>

          <h2 className="text-lg font-semibold mt-4 flex items-center gap-2"><Shield className="w-5 h-5" /> Keamanan</h2>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between">
              <span className="flex items-center gap-2">Aktifkan 2FA</span>
              <input
                type="checkbox"
                checked={form.twoFA}
                onChange={(e) => onChange("twoFA", e.target.checked)}
              />
            </label>
            <button
              className="w-full mt-2 rounded-xl border px-4 py-2 hover:bg-slate-50"
              onClick={() => alert("Kirim reset password (demo)")}
            >
              Ganti Kata Sandi
            </button>
            <button
              className="w-full rounded-xl border px-4 py-2 hover:bg-slate-50"
              onClick={() => alert("Kelola perangkat (demo)")}
            >
              Kelola Perangkat Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
