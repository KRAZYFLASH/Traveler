import React, { useEffect, useState, useMemo, useContext } from "react";
import {
   Plane,
  Train,
  Bus,
  Ship,
  Percent,
  Calendar,
} from "lucide-react";

import { AppContext } from "../../../context/AppContext";

/* Format helper */
const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
const transportIcon = {
  flight: <Plane className="w-4 h-4" />,
  train: <Train className="w-4 h-4" />,
  bus: <Bus className="w-4 h-4" />,
  ship: <Ship className="w-4 h-4" />,
};

/* Component */
export default function PromoPage() {

  const { promos } = useContext(AppContext)

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("best");
  const [data, setData] = useState([]);

  useEffect(() => {
    setTimeout(() => setData(promos || []), 300); // Simulasi loading
  }, [promos]);

  const filtered = useMemo(() => {
    let arr = [...data];

    if (filter !== "all") arr = arr.filter((p) => p.appliesTo && p.appliesTo.includes(filter));

    if (sort === "price-asc") arr.sort((a, b) => a.minSpend - b.minSpend);
    if (sort === "price-desc") arr.sort((a, b) => b.minSpend - a.minSpend);
    if (sort === "soonest")
      arr.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    if (sort === "best")
      arr.sort((a, b) => b.value - a.value);

    return arr;
  }, [data, filter, sort]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Promo Perjalanan Terbaik</h1>
          <p className="text-gray-600">
            Nikmati diskon menarik untuk perjalanan Anda
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center justify-between mb-8">
          <div className="flex gap-2 flex-wrap">
            {["all", "flight", "train", "bus", "ship"].map((key) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-full border text-sm ${filter === key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                {key === "all"
                  ? "Semua"
                  : key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-1 rounded-lg text-sm"
            >
              <option value="best">Terbaik</option>
              <option value="price-asc">Harga Termurah</option>
              <option value="price-desc">Harga Termahal</option>
              <option value="soonest">Segera Berakhir</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500">
            Tidak ada promo ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col"
              >
                {/* Gambar */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-cover"
                />

                {/* Isi Card */}
                <div className="p-4 flex flex-col flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 flex items-center gap-1">
                      <Percent className="w-4 h-4" /> {p.appliesTo?.[0] || 'all'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-green-600 text-white">
                      {p.type === 'percentage' ? `${p.value}% OFF` : `Rp ${p.value.toLocaleString('id-ID')}`}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-500">{p.description}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Hingga {new Date(p.endDate).toLocaleDateString("id-ID")}
                  </p>

                  {/* Bagian harga & tombol selalu rata bawah */}
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <p className="text-blue-700 font-bold">
                      Min. {formatIDR(p.minSpend)}
                    </p>
                    <button
                      onClick={() => alert(`Detail promo: ${p.title}`)}
                      className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
