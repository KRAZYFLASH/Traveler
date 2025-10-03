import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Plane, Train, Bus, Ship } from "lucide-react";

const MOCK = [
  {
    id: "p1",
    title: "Diskon 25% Pesawat ke Bali",
    subtitle: "Periode 1–31 Okt",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop",
    transport: "flight",
    discountPct: 25,
    priceFrom: 750000,
    validUntil: "2025-10-13",
  },
  {
    id: "p2",
    title: "Kereta Cepat Jakarta–Bandung mulai Rp 150rb",
    subtitle: "Weekend Deal",
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop",
    transport: "train",
    discountPct: 10,
    priceFrom: 150000,
    validUntil: "2025-10-08",
  },
];

const ICONS = {
  flight: Plane,
  train: Train,
  bus: Bus,
  ship: Ship,
};

const PromoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const promo = MOCK.find((p) => p.id === id);

  if (!promo) return <p>Promo tidak ditemukan.</p>;

  const Icon = ICONS[promo.transport];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Gambar Utama */}
      <img
        src={promo.image}
        alt={promo.title}
        className="w-full h-72 object-cover rounded-2xl shadow-md"
      />

      {/* Info Utama */}
      <div className="mt-6 space-y-3">
        <h1 className="text-2xl font-bold">{promo.title}</h1>
        <p className="text-gray-600">{promo.subtitle}</p>
        
        <div className="flex items-center gap-3 text-gray-700">
          <Icon className="w-5 h-5 text-blue-500" />
          <span className="capitalize">{promo.transport}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-500" />
          <span>Berlaku hingga {promo.validUntil}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
            {promo.discountPct}%
          </span>
          <span className="text-lg font-bold text-blue-600">
            Rp {promo.priceFrom.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Kembali
        </button>
        <button
          onClick={() => alert(`Pesanan ${promo.title} berhasil ditambahkan`)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Pesan Sekarang
        </button>
      </div>
    </div>
  );
};

export default PromoDetail;
