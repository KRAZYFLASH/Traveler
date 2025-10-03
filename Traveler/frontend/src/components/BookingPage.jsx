import React, { useMemo, useState } from "react";
import {
  Plane, Train, Bus, Ship,
  User, Users, Mail, Phone, Calendar, Clock, MapPin, Luggage, Shield,
  CreditCard, QrCode, Banknote, ChevronRight, ChevronDown, Check, X, Plus, Minus, Percent
} from "lucide-react";

/* =========================================================
   MOCK TRIP (bisa diterima dari props / router state)
   ========================================================= */
const DEFAULT_TRIP = {
  id: "F-DPS-JKT-0900",
  type: "flight", // flight | train | bus | ship
  operator: "Garuda Indonesia",
  from: { code: "CGK", label: "Jakarta (CGK)" },
  to: { code: "DPS", label: "Bali (DPS)" },
  date: "2025-10-05",
  depart: "09:00",
  arrive: "11:05",
  durationMin: 125,
  basePrice: 1250000, // per pax
  image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop",
  amenities: { baggageIncludedKg: 20 },
};

const PAYMENT_METHODS = [
  { key: "card", label: "Kartu Kredit/Debit", icon: CreditCard, fee: 0.02, note: "Visa, MasterCard" },
  { key: "qr", label: "QRIS / E-Wallet", icon: QrCode, fee: 0.005, note: "Gopay, OVO, DANA, ShopeePay" },
  { key: "va", label: "Virtual Account", icon: Banknote, fee: 0, note: "BCA/BNI/BRI/Mandiri VA" },
];

const SEAT_MAP = {
  cols: ["A", "B", "C", "D", "E", "F"],
  rows: 12,
  unavailable: new Set(["1C", "3D", "5A", "7F", "10B"]), // contoh seat terisi
  pricePerSeat: 35000,
};

const BAGGAGE_OPTIONS = [
  { kg: 10, price: 50000 },
  { kg: 20, price: 90000 },
  { kg: 30, price: 130000 },
];

const INSURANCE = {
  label: "Perlindungan Perjalanan",
  desc: "Kompensasi keterlambatan & perlindungan bagasi (maks. sesuai polis).",
  pricePerPax: 15000,
};

/* =========================================================
   UTIL
   ========================================================= */
const formatIDR = (n) => `Rp ${Number(n || 0).toLocaleString("id-ID")}`;
const minToStr = (m) => `${Math.floor(m / 60)}j ${m % 60}m`;
const IconByType = ({ type, className = "w-4 h-4" }) =>
  type === "flight" ? <Plane className={className} /> :
  type === "train"  ? <Train className={className} /> :
  type === "bus"    ? <Bus className={className} />   :
  type === "ship"   ? <Ship className={className} />  : null;

/* =========================================================
   KOMPONEN KECIL
   ========================================================= */
const Field = ({ label, children, required }) => (
  <label className="block">
    <span className="block text-sm text-gray-600 mb-1">
      {label} {required && <span className="text-red-600">*</span>}
    </span>
    {children}
  </label>
);

const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition
      ${active ? "bg-blue-600 text-white border-blue-600"
               : "bg-gray-100 text-gray-800 border-gray-200 hover:bg-white"}`}
  >
    {children}
  </button>
);

const Collapsible = ({ title, subtitle, right, children, defaultOpen=false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded-xl bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div>
          <p className="font-semibold">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          {right}
          <ChevronDown className={`w-5 h-5 text-gray-500 transition ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

/* =========================================================
   HALAMAN BOOKING
   ========================================================= */
export default function BookingPage({ selectedTrip = DEFAULT_TRIP }) {
  // Pax
  const [adults, setAdults] = useState(1);
  const [childrenPax, setChildrenPax] = useState(0);
  const [infants, setInfants] = useState(0);

  // Data penumpang & kontak (sederhana)
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  // Add-ons
  const [baggage, setBaggage] = useState({}); // { seatIndex: optionIndex } OR per pax
  const [insurance, setInsurance] = useState(false);
  const [seatSelected, setSeatSelected] = useState({}); // { "ADT-1": "3A", ... }

  // Voucher & pembayaran
  const [voucher, setVoucher] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(null); // { code, pct } | null
  const [payment, setPayment] = useState("va");

  const paxTotal = adults + childrenPax + infants;

  // Harga
  const price = useMemo(() => {
    const base = selectedTrip.basePrice;
    // Diskon bayi/anak (contoh)
    const childDiscount = 0.25; // anak 25% lebih murah
    const infantPrice = 50000;  // infant flat
    const adultSubtotal = adults * base;
    const childSubtotal = childrenPax * Math.round(base * (1 - childDiscount));
    const infantSubtotal = infants * infantPrice;

    const paxSubtotal = adultSubtotal + childSubtotal + infantSubtotal;

    // Bagasi tambahan per pax (opsional sederhana: satu pilihan untuk semua pax dewasa+anak)
    let baggageSubtotal = 0;
    Object.values(baggage).forEach((optIdx) => {
      if (optIdx != null) {
        baggageSubtotal += BAGGAGE_OPTIONS[optIdx].price;
      }
    });

    // Kursi berbayar
    const seatSubtotal = Object.values(seatSelected).filter(Boolean).length * SEAT_MAP.pricePerSeat;

    // Asuransi
    const insuranceSubtotal = insurance ? paxTotal * INSURANCE.pricePerPax : 0;

    // Subtotal
    let subtotal = paxSubtotal + baggageSubtotal + seatSubtotal + insuranceSubtotal;

    // Voucher
    let voucherCut = 0;
    if (voucherApplied?.pct) {
      voucherCut = Math.round(subtotal * voucherApplied.pct);
    }

    // Biaya payment
    const payConf = PAYMENT_METHODS.find(p => p.key === payment) || PAYMENT_METHODS[0];
    const paymentFee = Math.round((subtotal - voucherCut) * (payConf.fee || 0));

    // Pajak sederhana (PPN 11% untuk jasa tertentu — contoh, disederhanakan)
    const tax = Math.round((subtotal - voucherCut) * 0.11);

    const total = subtotal - voucherCut + paymentFee + tax;

    return {
      base, paxSubtotal, baggageSubtotal, seatSubtotal, insuranceSubtotal,
      voucherCut, paymentFee, tax, total
    };
  }, [adults, childrenPax, infants, selectedTrip, baggage, seatSelected, insurance, voucherApplied, payment, paxTotal]);

  // Validasi minimal submit
  const canSubmit = useMemo(() => {
    if (!contact.name || !contact.email || !contact.phone) return false;
    if (paxTotal < 1) return false;
    return true;
  }, [contact, paxTotal]);

  const applyVoucher = () => {
    const code = voucher.trim().toUpperCase();
    if (!code) return;
    // contoh rule: VOUCHER10 = 10% ; HEMAT5 = 5%
    const map = { "VOUCHER10": 0.10, "HEMAT5": 0.05 };
    const pct = map[code];
    if (pct) setVoucherApplied({ code, pct });
    else {
      setVoucherApplied(null);
      alert("Kode voucher tidak valid.");
    }
  };

  const clearVoucher = () => {
    setVoucher("");
    setVoucherApplied(null);
  };

  const toggleSeat = (paxKey, seatCode) => {
    // Jika seat sudah dipilih pax lain, tolak
    const isTakenByOther = Object.entries(seatSelected).some(([k, v]) => k !== paxKey && v === seatCode);
    if (isTakenByOther) return;
    setSeatSelected((prev) => ({
      ...prev,
      [paxKey]: prev[paxKey] === seatCode ? null : seatCode
    }));
  };

  const paxKeys = useMemo(() => {
    const keys = [];
    for (let i = 1; i <= adults; i++) keys.push({ key: `ADT-${i}`, label: `Dewasa ${i}` });
    for (let i = 1; i <= childrenPax; i++) keys.push({ key: `CHD-${i}`, label: `Anak ${i}` });
    for (let i = 1; i <= infants; i++) keys.push({ key: `INF-${i}`, label: `Bayi ${i}` });
    return keys;
  }, [adults, childrenPax, infants]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top bar progres ringan */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-600 flex items-center gap-2">
          <span className="text-gray-800 font-medium">Pencarian</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 font-medium">Pilih Perjalanan</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600 font-semibold">Booking</span>
          <ChevronRight className="w-4 h-4" />
          <span>Pembayaran</span>
          <ChevronRight className="w-4 h-4" />
          <span>E-Ticket</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_360px] gap-6">
        {/* Kiri: Form */}
        <div className="space-y-4">
          {/* Ringkasan Trip */}
          <div className="border rounded-xl overflow-hidden bg-white">
            <div className="h-40 w-full bg-gray-100 relative">
              <img src={selectedTrip.image} alt="trip" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white space-y-1">
                <div className="inline-flex items-center gap-2 text-xs bg-white/20 backdrop-blur px-2 py-1 rounded">
                  <IconByType type={selectedTrip.type} /> {selectedTrip.operator}
                </div>
                <p className="text-lg font-semibold">
                  {selectedTrip.from.label} → {selectedTrip.to.label}
                </p>
              </div>
            </div>
            <div className="p-4 text-sm text-gray-700 flex flex-wrap gap-x-6 gap-y-2">
              <div className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {selectedTrip.date}
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4" /> {selectedTrip.depart}–{selectedTrip.arrive} • {minToStr(selectedTrip.durationMin)}
              </div>
              <div className="inline-flex items-center gap-2">
                <Luggage className="w-4 h-4" /> Termasuk bagasi {selectedTrip.amenities.baggageIncludedKg}kg
              </div>
            </div>
          </div>

          {/* Jumlah Penumpang */}
          <div className="border rounded-xl p-4 bg-white">
            <p className="font-semibold mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-blue-700" /> Penumpang</p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { label: "Dewasa", value: adults, setter: setAdults, min: 1 },
                { label: "Anak", value: childrenPax, setter: setChildrenPax, min: 0 },
                { label: "Bayi", value: infants, setter: setInfants, min: 0 },
              ].map(({ label, value, setter, min }) => (
                <div key={label} className="rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm">{label}</p>
                    <p className="text-xs text-gray-500">
                      {label === "Dewasa" ? "≥ 12 th" : label === "Anak" ? "2–11 th" : "＜ 2 th"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setter(Math.max(min, value - 1))}
                      className="p-1 border rounded disabled:opacity-40"
                      disabled={value <= min}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center">{value}</span>
                    <button
                      type="button"
                      onClick={() => setter(value + 1)}
                      className="p-1 border rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kontak Pemesan */}
          <div className="border rounded-xl p-4 bg-white">
            <p className="font-semibold mb-3 flex items-center gap-2"><User className="w-5 h-5 text-blue-700" /> Kontak Pemesan</p>
            <div className="grid sm:grid-cols-3 gap-3">
              <Field label="Nama Lengkap" required>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  value={contact.name}
                  onChange={e => setContact({ ...contact, name: e.target.value })}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md"
                  value={contact.email}
                  onChange={e => setContact({ ...contact, email: e.target.value })}
                />
              </Field>
              <Field label="No. HP (WA)" required>
                <input
                  className="w-full px-3 py-2 border rounded-md"
                  value={contact.phone}
                  onChange={e => setContact({ ...contact, phone: e.target.value })}
                />
              </Field>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              E-ticket & update perjalanan akan dikirim ke email/WA di atas.
            </p>
          </div>

          {/* Add-ons */}
          <Collapsible
            title="Add-Ons Bagasi"
            subtitle="Tambahan bagasi di luar jatah bawaan"
            right={<Luggage className="w-5 h-5 text-blue-700" />}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {paxKeys.map(pk => (
                <div key={pk.key} className="border rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">{pk.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {BAGGAGE_OPTIONS.map((o, idx) => {
                      const active = baggage[pk.key] === idx;
                      return (
                        <Chip
                          key={idx}
                          active={active}
                          onClick={() =>
                            setBaggage(prev => ({ ...prev, [pk.key]: active ? null : idx }))
                          }
                        >
                          {o.kg}kg • {formatIDR(o.price)}
                        </Chip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible
            title="Pilih Kursi"
            subtitle={`Biaya ${formatIDR(SEAT_MAP.pricePerSeat)} / kursi (opsional)`}
            right={<SeatLegend />}
          >
            <div className="grid md:grid-cols-[220px_1fr] gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Penumpang</p>
                <div className="flex flex-col gap-2">
                  {paxKeys.map(pk => (
                    <div key={pk.key} className="flex items-center justify-between rounded border px-3 py-2">
                      <span className="text-sm">{pk.label}</span>
                      <span className="text-xs text-gray-500">
                        {seatSelected[pk.key] || "Belum dipilih"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <SeatGrid
                seatMap={SEAT_MAP}
                selected={seatSelected}
                onToggle={toggleSeat}
                paxKeys={paxKeys}
              />
            </div>
          </Collapsible>

          <div className="border rounded-xl p-4 bg-white">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1"
                checked={insurance}
                onChange={(e) => setInsurance(e.target.checked)}
              />
              <div>
                <p className="font-medium flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-700" /> {INSURANCE.label}
                </p>
                <p className="text-sm text-gray-600">{INSURANCE.desc}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Biaya {formatIDR(INSURANCE.pricePerPax)} per penumpang
                </p>
              </div>
            </label>
          </div>

          {/* Voucher */}
          <div className="border rounded-xl p-4 bg-white">
            <p className="font-semibold mb-3 flex items-center gap-2"><Percent className="w-5 h-5 text-blue-700" /> Voucher</p>
            {voucherApplied ? (
              <div className="flex items-center justify-between p-3 rounded border bg-green-50 text-sm">
                <span>Kode <span className="font-semibold">{voucherApplied.code}</span> terpasang ({Math.round(voucherApplied.pct * 100)}%)</span>
                <button onClick={clearVoucher} className="text-red-600 hover:underline text-xs">Hapus</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  value={voucher}
                  onChange={e => setVoucher(e.target.value)}
                  placeholder="Masukkan kode…"
                  className="px-3 py-2 border rounded-md flex-1"
                />
                <button onClick={applyVoucher} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">
                  Terapkan
                </button>
              </div>
            )}
          </div>

          {/* Metode Pembayaran */}
          <div className="border rounded-xl p-4 bg-white">
            <p className="font-semibold mb-3">Metode Pembayaran</p>
            <div className="grid md:grid-cols-3 gap-3">
              {PAYMENT_METHODS.map(m => {
                const Icon = m.icon;
                const active = payment === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setPayment(m.key)}
                    className={`text-left border rounded-lg p-3 hover:shadow-sm transition
                      ${active ? "border-blue-600 ring-1 ring-blue-200 bg-blue-50/50" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-medium">
                        <Icon className="w-5 h-5 text-blue-700" /> {m.label}
                      </span>
                      {active ? <Check className="w-5 h-5 text-blue-600" /> : <span className="w-5 h-5" />}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{m.note}</p>
                    {m.fee > 0 && (
                      <p className="text-xs text-amber-600 mt-1">
                        Biaya admin ~ {Math.round(m.fee * 100)}%
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Persetujuan */}
          <div className="text-xs text-gray-600">
            Dengan melanjutkan, Anda menyetujui <a href="#" className="text-blue-600 underline">Syarat & Ketentuan</a> dan <a href="#" className="text-blue-600 underline">Kebijakan Privasi</a>.
          </div>
        </div>

        {/* Kanan: Rincian Harga + CTA */}
        <aside className="space-y-4">
          <div className="border rounded-xl p-4 bg-white">
            <p className="font-semibold mb-3">Ringkasan Harga</p>
            <div className="text-sm space-y-2">
              <Row label={`Tiket (${adults} Dewasa)`} value={adults * selectedTrip.basePrice} />
              {childrenPax > 0 && (
                <Row label={`Tiket (${childrenPax} Anak)`} value={childrenPax * Math.round(selectedTrip.basePrice * 0.75)} />
              )}
              {infants > 0 && <Row label={`Tiket (${infants} Bayi)`} value={infants * 50000} />}
              {price.baggageSubtotal > 0 && <Row label="Bagasi Tambahan" value={price.baggageSubtotal} />}
              {price.seatSubtotal > 0 && <Row label="Biaya Kursi" value={price.seatSubtotal} />}
              {price.insuranceSubtotal > 0 && <Row label="Asuransi" value={price.insuranceSubtotal} />}
              {price.voucherCut > 0 && <Row label="Voucher" value={-price.voucherCut} highlightNeg />}
              {price.paymentFee > 0 && <Row label="Biaya Pembayaran" value={price.paymentFee} />}
              <Row label="PPN (11%)" value={price.tax} />
              <div className="border-t pt-2 mt-2">
                <Row label="Total" value={price.total} bold />
              </div>
            </div>
          </div>

          <button
            disabled={!canSubmit}
            onClick={() => alert("Lanjut ke Pembayaran (demo)")}
            className={`w-full py-3 rounded-xl text-white font-semibold ${
              canSubmit ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Lanjut ke Pembayaran
          </button>

          <div className="text-xs text-gray-500">
            Setelah pembayaran terkonfirmasi, e-ticket akan dikirim otomatis ke email/WA.
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   SUB-KOMPONEN TAMBAHAN
   ========================================================= */
function Row({ label, value, bold, highlightNeg }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-gray-700 ${bold ? "font-semibold" : ""}`}>{label}</span>
      <span className={`${bold ? "font-semibold" : ""} ${highlightNeg ? "text-green-700" : "text-gray-900"}`}>
        {value < 0 ? `- ${formatIDR(Math.abs(value))}` : formatIDR(value)}
      </span>
    </div>
  );
}

function SeatLegend() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded border bg-white" /> Tersedia
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded border bg-gray-300" /> Terisi
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block w-4 h-4 rounded border bg-blue-100" /> Dipilih
      </span>
    </div>
  );
}

function SeatGrid({ seatMap, selected, onToggle, paxKeys }) {
  const { rows, cols, unavailable } = seatMap;
  const [activePax, setActivePax] = useState(paxKeys[0]?.key || "");

  const isTaken = (code) =>
    unavailable.has(code) || Object.values(selected).includes(code);

  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium">Pilih kursi untuk:</p>
        <select
          className="text-sm border rounded px-2 py-1"
          value={activePax}
          onChange={(e) => setActivePax(e.target.value)}
        >
          {paxKeys.map(pk => <option key={pk.key} value={pk.key}>{pk.label}</option>)}
        </select>
      </div>

      <div className="overflow-auto">
        <div className="inline-grid" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(36px, 1fr))`, gap: 8 }}>
          {Array.from({ length: rows }).map((_, rIdx) => (
            <React.Fragment key={rIdx}>
              {cols.map((c) => {
                const code = `${rIdx + 1}${c}`;
                const taken = isTaken(code);
                const chosen = selected[activePax] === code;
                return (
                  <button
                    key={code}
                    disabled={taken && !chosen}
                    onClick={() => onToggle(activePax, code)}
                    className={`h-9 rounded border text-xs
                      ${taken && !chosen ? "bg-gray-300 text-gray-500 cursor-not-allowed" :
                        chosen ? "bg-blue-100 border-blue-500" : "bg-white hover:bg-gray-50"}`}
                    title={code}
                  >
                    {code}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <p className="text-[11px] text-gray-500 mt-2">
        Kursi berbayar: {formatIDR(SEAT_MAP.pricePerSeat)} per kursi (opsional). Beberapa kursi mungkin tidak tersedia.
      </p>
    </div>
  );
}
