import React, { useMemo, useState } from "react";
import {
  Search, Filter, Calendar, CreditCard, CheckCircle2, XCircle, Eye, Download, Wallet, Receipt
} from "lucide-react";

/* =========================
   MOCK DATA — ganti dengan fetch API kalian
   ========================= */
const MOCK_BOOKINGS = [
  {
    id: "ORD-2025-1042",
    title: "Jakarta → Bali (CGK → DPS)",
    type: "flight",
    date: "2025-10-22",
    passengers: 2,
    amount: 3150000,
    paid: true,
    method: "Credit Card",
    createdAt: "2025-10-01 10:22",
  },
  {
    id: "ORD-2025-1031",
    title: "Jakarta → Bandung (Whoosh)",
    type: "train",
    date: "2025-10-11",
    passengers: 1,
    amount: 185000,
    paid: false,
    method: "VA BCA",
    createdAt: "2025-10-03 09:05",
  },
  {
    id: "ORD-2025-1007",
    title: "Labuan Bajo → Bali (ASDP)",
    type: "ship",
    date: "2025-10-25",
    passengers: 3,
    amount: 1440000,
    paid: true,
    method: "QRIS",
    createdAt: "2025-09-29 14:10",
  },
  {
    id: "ORD-2025-0970",
    title: "Semarang → Jakarta (Bus)",
    type: "bus",
    date: "2025-10-15",
    passengers: 1,
    amount: 230000,
    paid: false,
    method: "OVO",
    createdAt: "2025-10-02 19:40",
  },
];

/* =========================
   UTIL
   ========================= */
const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;

export default function MyBookingPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all"); // all | paid | unpaid
  const [type, setType] = useState("all"); // all | flight | train | bus | ship
  const [sort, setSort] = useState("recent"); // recent | amount-desc | amount-asc | date-asc

  const filtered = useMemo(() => {
    let arr = [...MOCK_BOOKINGS];

    // search
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(
        (b) =>
          b.id.toLowerCase().includes(s) ||
          b.title.toLowerCase().includes(s) ||
          b.method.toLowerCase().includes(s)
      );
    }

    // status filter
    if (status !== "all") {
      arr = arr.filter((b) => (status === "paid" ? b.paid : !b.paid));
    }

    // type filter
    if (type !== "all") {
      arr = arr.filter((b) => b.type === type);
    }

    // sort
    if (sort === "amount-desc") arr.sort((a, b) => b.amount - a.amount);
    if (sort === "amount-asc") arr.sort((a, b) => a.amount - b.amount);
    if (sort === "date-asc")
      arr.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sort === "recent")
      arr.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

    return arr;
  }, [q, status, type, sort]);

  const summary = useMemo(() => {
    const total = MOCK_BOOKINGS.length;
    const paidCount = MOCK_BOOKINGS.filter((b) => b.paid).length;
    const unpaidCount = total - paidCount;
    const unpaidTotal = MOCK_BOOKINGS.filter((b) => !b.paid).reduce((s, x) => s + x.amount, 0);
    return { total, paidCount, unpaidCount, unpaidTotal };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            <h1 className="text-lg font-semibold">My Booking</h1>
          </div>
          <div className="text-xs text-slate-500">Ringkasan pesanan & status pembayaran</div>
        </div>
      </header>

      {/* Summary */}
      <section className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-500">Total Pesanan</p>
          <p className="text-xl font-semibold">{summary.total}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-500">Sudah Bayar</p>
          <p className="text-xl font-semibold">{summary.paidCount}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-500">Belum Bayar</p>
          <p className="text-xl font-semibold">{summary.unpaidCount}</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <p className="text-xs text-slate-500">Total Tagihan Tertunda</p>
          <p className="text-xl font-semibold">{formatIDR(summary.unpaidTotal)}</p>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl border bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari ID/Perjalanan/Metode…"
                className="w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 rounded-xl border text-sm"
                title="Filter status"
              >
                <option value="all">Semua Status</option>
                <option value="paid">Sudah Bayar</option>
                <option value="unpaid">Belum Bayar</option>
              </select>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-3 py-2 rounded-xl border text-sm"
                title="Filter jenis"
              >
                <option value="all">Semua Jenis</option>
                <option value="flight">Pesawat</option>
                <option value="train">Kereta</option>
                <option value="bus">Bus</option>
                <option value="ship">Kapal</option>
              </select>

              <button
                onClick={() =>
                  setSort((s) =>
                    s === "recent" ? "amount-desc" :
                    s === "amount-desc" ? "amount-asc" :
                    s === "amount-asc" ? "date-asc" : "recent"
                  )
                }
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
                title="Urutkan"
              >
                <Filter className="w-4 h-4" />
                {sort === "recent" ? "Terbaru" :
                 sort === "amount-desc" ? "Nominal ↓" :
                 sort === "amount-asc" ? "Nominal ↑" :
                 "Tanggal ↑"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Table */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="rounded-2xl border overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3">Order ID</th>
                  <th className="text-left px-4 py-3">Perjalanan</th>
                  <th className="text-left px-4 py-3">Tanggal</th>
                  <th className="text-left px-4 py-3">Penumpang</th>
                  <th className="text-left px-4 py-3">Metode</th>
                  <th className="text-left px-4 py-3">Total</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id} className="border-t">
                    <td className="px-4 py-3 font-mono">{b.id}</td>
                    <td className="px-4 py-3">{b.title}</td>
                    <td className="px-4 py-3">
                      <div className="inline-flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(b.date).toLocaleDateString("id-ID")}
                      </div>
                    </td>
                    <td className="px-4 py-3">{b.passengers}</td>
                    <td className="px-4 py-3">{b.method}</td>
                    <td className="px-4 py-3 font-medium">{formatIDR(b.amount)}</td>
                    <td className="px-4 py-3">
                      {b.paid ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-600 text-white">
                          <CheckCircle2 className="w-4 h-4" /> Sudah Bayar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-rose-600 text-white">
                          <XCircle className="w-4 h-4" /> Belum Bayar
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 hover:bg-slate-50"
                          title="Lihat detail"
                        >
                          <Eye className="w-4 h-4" /> Detail
                        </a>
                        {b.paid ? (
                          <a
                            href="#"
                            className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 hover:bg-slate-50"
                            title="Unduh e-ticket"
                          >
                            <Download className="w-4 h-4" /> E-Ticket
                          </a>
                        ) : (
                          <button
                            onClick={() => alert(`Lanjutkan bayar untuk ${b.id} (demo)`)}
                            className="inline-flex items-center gap-1 rounded-lg bg-slate-900 text-white px-2 py-1 hover:bg-black"
                            title="Bayar sekarang"
                          >
                            <Wallet className="w-4 h-4" /> Bayar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-4 py-10 text-center text-slate-500">
                      Tidak ada pesanan sesuai filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer meta */}
          <div className="px-4 py-3 border-t text-xs text-slate-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Pesanan ditampilkan berdasarkan waktu dibuat (Terbaru).</span>
            </div>
            <div>Ditemukan: {filtered.length} pesanan</div>
          </div>
        </div>
      </main>
    </div>
  );
}
