import React, { useEffect, useMemo, useState } from "react";
import {
  Plane, Train, Bus, Ship,
  MapPin, Calendar, Percent, Search, ArrowUpDown, Wallet
} from "lucide-react";

/* ==== DATA ==== */
const TRANSPORTS = [
  { key: "flight", label: "Pesawat", icon: Plane, baseFee: 600000 },
  { key: "train",  label: "Kereta",  icon: Train, baseFee: 250000 },
  { key: "bus",    label: "Bus",     icon: Bus,   baseFee: 150000 },
  { key: "ship",   label: "Kapal",   icon: Ship,  baseFee: 400000 },
];

const DESTINATIONS = [
  { code: "DPS", name: "Bali", category: "pantai", basePrice: 1800000, image: "https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1600" },
  { code: "JOG", name: "Yogyakarta", category: "budaya", basePrice: 900000, image: "https://images.unsplash.com/photo-1597007148923-1d3c54f70632?q=80&w=1600" },
  { code: "BND", name: "Bandung", category: "alam", basePrice: 700000, image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600" },
  { code: "LBJ", name: "Labuan Bajo", category: "bahari", basePrice: 2400000, image: "https://images.unsplash.com/photo-1546500840-ae38253aba9b?q=80&w=1600" },
  { code: "BTJ", name: "Aceh", category: "sejarah", basePrice: 1100000, image: "https://images.unsplash.com/photo-1491554150235-360c82aaf21e?q=80&w=1600" },
  { code: "PKU", name: "Pekanbaru", category: "kota", basePrice: 850000, image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600" },
];

const COMBO_RULE = {
  flight: { DPS: 25, LBJ: 12, JOG: 15 },
  train:  { BND: 18, JOG: 10 },
  bus:    { BND: 12, PKU: 8 },
  ship:   { LBJ: 14, DPS: 10 },
};

const defaultDiscount = 7;

const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

const computeCombo = ({ transportKey, destCode }) => {
  const t = TRANSPORTS.find((x) => x.key === transportKey);
  const d = DESTINATIONS.find((x) => x.code === destCode);
  if (!t || !d) return null;

  const discountPct = COMBO_RULE?.[transportKey]?.[destCode] ?? defaultDiscount;
  const base = t.baseFee + d.basePrice;
  const final = Math.max(0, Math.round(base * (1 - discountPct / 100)));

  return {
    id: `${transportKey}-${destCode}`,
    transport: transportKey,
    transportLabel: t.label,
    dest: destCode,
    destLabel: d.name,
    category: d.category,
    image: d.image,
    discountPct,
    priceBase: base,
    priceFinal: final,
    validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * (7 + Math.random() * 10)).toISOString(),
    url: "#",
    highlight: discountPct >= 20,
  };
};

const generateCombos = () => {
  const out = [];
  TRANSPORTS.forEach((t) => {
    DESTINATIONS.forEach((d) => {
      const combo = computeCombo({ transportKey: t.key, destCode: d.code });
      out.push(combo);
    });
  });
  return out;
};

/* ==== UI ==== */
export default function ExploreCombo() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [trans, setTrans] = useState("all");
  const [sort, setSort] = useState("best");
  const [budget, setBudget] = useState(5000000);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => setData(generateCombos()), 300);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(DESTINATIONS.map((d) => d.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let arr = [...data];
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((x) =>
        x.destLabel.toLowerCase().includes(s) ||
        x.transportLabel.toLowerCase().includes(s) ||
        x.category.toLowerCase().includes(s)
      );
    }
    if (cat !== "all") arr = arr.filter((x) => x.category === cat);
    if (trans !== "all") arr = arr.filter((x) => x.transport === trans);
    arr = arr.filter((x) => x.priceFinal <= budget);

    if (sort === "price-asc") arr.sort((a, b) => a.priceFinal - b.priceFinal);
    if (sort === "price-desc") arr.sort((a, b) => b.priceFinal - a.priceFinal);
    if (sort === "discount-desc") arr.sort((a, b) => b.discountPct - a.discountPct);
    if (sort === "best")
      arr.sort(
        (a, b) =>
          (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0) ||
          b.discountPct - a.discountPct
      );

    return arr;
  }, [q, cat, trans, budget, sort, data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-1">Paket Combo Travel</h1>
          <p className="text-gray-600">Diskon spesial dengan gabungan transportasi & destinasi</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <div className="flex gap-2 flex-wrap">
            {TRANSPORTS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTrans(t.key === trans ? "all" : t.key)}
                className={`px-3 py-1.5 rounded-full text-sm border flex items-center gap-1 transition ${
                  trans === t.key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari destinasi/transport..."
              className="px-3 py-1.5 border rounded-md text-sm"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border rounded-md px-3 py-1.5"
            >
              <option value="best">Terbaik</option>
              <option value="price-asc">Termurah</option>
              <option value="price-desc">Termahal</option>
              <option value="discount-desc">Diskon Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Kategori & Budget */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Kategori:</span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1 text-sm rounded-full border transition ${
                  cat === c
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Wallet className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Budget ≤ {formatIDR(budget)}</span>
            <input
              type="range"
              min={500000}
              max={6000000}
              step={500000}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="accent-blue-600 w-40"
            />
          </div>
        </div>

        {/* Combo Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-10">
              Tidak ada paket ditemukan
            </div>
          ) : (
            filtered.map((c) => {
              const Icon = TRANSPORTS.find((t) => t.key === c.transport)?.icon || Plane;
              return (
                <div key={c.id} className="rounded-xl border bg-white overflow-hidden shadow-sm hover:shadow-md transition">
                  <img src={c.image} alt={c.destLabel} className="h-44 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Icon className="w-4 h-4" /> {c.transportLabel}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-4 h-4" /> {c.destLabel}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{c.transportLabel} + {c.destLabel}</h3>
                    <p className="text-sm text-gray-600 capitalize">Kategori: {c.category}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Harga Awal</p>
                        <p className="font-medium">{formatIDR(c.priceBase)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Harga Akhir</p>
                        <p className="font-bold text-blue-600">{formatIDR(c.priceFinal)}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Hingga {new Date(c.validUntil).toLocaleDateString("id-ID")}
                    </div>
                    <a
                      href={c.url}
                      className="block w-full text-center mt-2 bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700"
                    >
                      Pilih Paket
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
