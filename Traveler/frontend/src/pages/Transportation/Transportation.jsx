import React, { useEffect, useMemo, useState } from "react";
import {
  Plane, Train, Bus, Ship, Search, MapPin, Calendar, Clock, Star,
  Wifi, Utensils, Luggage, ArrowUpDown, Wallet
} from "lucide-react";

/* =========================
   MOCK DATA
   ========================= */
const TRANSPORTS = [
  { key: "flight", label: "Pesawat", icon: Plane },
  { key: "train",  label: "Kereta",  icon: Train },
  { key: "bus",    label: "Bus",     icon: Bus },
  { key: "ship",   label: "Kapal",   icon: Ship },
];

const MOCK_TRIPS = [
  {
    id: "F1", type: "flight", operator: "Garuda", from: "Jakarta", to: "Bali", date: "2025-10-05",
    depart: "09:00", arrive: "11:10", durationMin: 130, priceFrom: 1200000, rating: 4.7,
    amenities: { wifi: true, meal: true, baggage: true },
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600"
  },
  {
    id: "T1", type: "train", operator: "Whoosh", from: "Jakarta", to: "Bandung", date: "2025-10-03",
    depart: "07:00", arrive: "07:50", durationMin: 50, priceFrom: 180000, rating: 4.5,
    amenities: { wifi: true, meal: false, baggage: true },
    image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600"
  },
  {
    id: "B1", type: "bus", operator: "Sinar Jaya", from: "Jakarta", to: "Semarang", date: "2025-10-04",
    depart: "20:00", arrive: "05:00", durationMin: 540, priceFrom: 230000, rating: 4.2,
    amenities: { wifi: true, meal: true, baggage: true },
    image: "https://images.unsplash.com/photo-1602407294553-6b1eafb0db07?q=80&w=1600"
  },
  {
    id: "S1", type: "ship", operator: "ASDP", from: "Labuan Bajo", to: "Bali", date: "2025-10-07",
    depart: "08:00", arrive: "16:30", durationMin: 510, priceFrom: 480000, rating: 4.0,
    amenities: { wifi: false, meal: true, baggage: true },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600"
  },
];

/* =========================
   UTIL
   ========================= */
const formatIDR = (n) => `Rp ${Number(n).toLocaleString("id-ID")}`;
const minToStr = (m) => `${Math.floor(m / 60)}j ${m % 60}m`;

const IconByType = ({ type, className = "w-4 h-4" }) =>
  type === "flight" ? <Plane className={className}/> :
  type === "train"  ? <Train className={className}/> :
  type === "bus"    ? <Bus className={className}/>   :
  type === "ship"   ? <Ship className={className}/>  : null;

/* =========================
   UI
   ========================= */
export default function TransportationExplore() {
  const [mode, setMode] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("best");
  const [budget, setBudget] = useState(2000000);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    setTimeout(() => setTrips(MOCK_TRIPS), 300);
  }, []);

  const filtered = useMemo(() => {
    let arr = [...trips];

    if (mode !== "all") arr = arr.filter((t) => t.type === mode);
    if (from.trim()) arr = arr.filter((t) => t.from.toLowerCase().includes(from.toLowerCase()));
    if (to.trim()) arr = arr.filter((t) => t.to.toLowerCase().includes(to.toLowerCase()));
    if (date) arr = arr.filter((t) => t.date === date);
    if (q.trim()) arr = arr.filter((t) => t.operator.toLowerCase().includes(q.toLowerCase()));
    arr = arr.filter((t) => t.priceFrom <= budget);

    if (sort === "price-asc") arr.sort((a, b) => a.priceFrom - b.priceFrom);
    if (sort === "price-desc") arr.sort((a, b) => b.priceFrom - a.priceFrom);
    if (sort === "duration-asc") arr.sort((a, b) => a.durationMin - b.durationMin);
    if (sort === "rating-desc") arr.sort((a, b) => b.rating - a.rating);
    if (sort === "best") arr.sort((a, b) => b.rating - a.rating || a.durationMin - b.durationMin);

    return arr;
  }, [mode, from, to, date, q, sort, budget, trips]);

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-10 max-w-7xl mx-auto">
      {/* Header Search Bar */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Temukan Transportasi</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Dari..." className="px-3 py-2 border rounded-md" />
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Ke..." className="px-3 py-2 border rounded-md" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 border rounded-md" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari operator..." className="px-3 py-2 border rounded-md" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex gap-2">
            {["all", ...TRANSPORTS.map(t => t.key)].map((k) => (
              <button key={k} onClick={() => setMode(k)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  mode === k ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100"
                }`}>
                {k === "all" ? "Semua" : TRANSPORTS.find(t => t.key === k)?.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <ArrowUpDown className="w-4 h-4 text-gray-500" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-sm border px-2 py-1 rounded-md">
              <option value="best">Rekomendasi</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
              <option value="duration-asc">Tercepat</option>
              <option value="rating-desc">Rating Tertinggi</option>
            </select>
            <Wallet className="w-4 h-4 text-gray-500" />
            <input type="range" min={100000} max={5000000} step={50000} value={budget}
              onChange={(e) => setBudget(Number(e.target.value))} className="accent-blue-600 w-32" />
            <span className="text-sm">{formatIDR(budget)}</span>
          </div>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">Tidak ada hasil ditemukan.</div>
        ) : (
          filtered.map(t => (
            <div key={t.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={t.image} alt={t.operator} className="h-40 w-full object-cover" />
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span className="flex items-center gap-1"><IconByType type={t.type} /> {t.operator}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {t.rating}</span>
                </div>
                <h2 className="font-semibold text-lg">{t.from} → {t.to}</h2>
                <p className="text-sm text-gray-600">{t.depart} - {t.arrive} • {minToStr(t.durationMin)}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {t.amenities.wifi && <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1"><Wifi className="w-3 h-3" /> WiFi</span>}
                  {t.amenities.meal && <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1"><Utensils className="w-3 h-3" /> Makan</span>}
                  {t.amenities.baggage && <span className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1"><Luggage className="w-3 h-3" /> Bagasi</span>}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-blue-600 font-bold">{formatIDR(t.priceFrom)}</span>
                  <a href="#" className="text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700">Pilih</a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
