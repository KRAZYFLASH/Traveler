import React, { useMemo, useState } from "react";
import {
  Search, LifeBuoy, Mail, Phone, MessageCircle, AlertTriangle, CheckCircle2,
  Info, Sparkles, ChevronDown, MapPin, Wallet, Calendar, Shield,
  Plane, Train, Bus, Ship, ExternalLink
} from "lucide-react";

/* =========================
   TOPIK & MODE
   ========================= */
const TOPICS = [
  { key: "pesanan", label: "Pesanan & Tiket", icon: CheckCircle2 },
  { key: "pembayaran", label: "Pembayaran", icon: Wallet },
  { key: "promo", label: "Promo & Diskon", icon: Sparkles },
  { key: "rute", label: "Rute & Jadwal", icon: Calendar },
  { key: "akun", label: "Akun & Keamanan", icon: Shield },
];

const TRANSPORTS = [
  { key: "flight", label: "Pesawat", icon: Plane },
  { key: "train", label: "Kereta", icon: Train },
  { key: "bus", label: "Bus", icon: Bus },
  { key: "ship", label: "Kapal", icon: Ship },
];

/* =========================
   FAQ (sudah dipetakan ke topic & modes)
   ========================= */
const FAQS = [
  {
    q: "Bagaimana cara memesan tiket transportasi?",
    a: "Buka halaman Transportasi, pilih mode (Pesawat/Kereta/Bus/Kapal), isi rute & tanggal, lalu klik Pilih pada rute yang diinginkan. Anda akan diarahkan ke halaman checkout untuk melengkapi data penumpang dan pembayaran.",
    topic: "pesanan",
    modes: ["flight", "train", "bus", "ship"],
    tags: ["pesan tiket", "checkout", "pemesanan"]
  },
  {
    q: "Apa itu Paket Combo (Transportasi + Destinasi)?",
    a: "Paket Combo menggabungkan tiket transportasi dan destinasi (hotel/aktivitas) dalam satu buket dengan diskon otomatis sesuai aturan kombinasi. Cek halaman Paket Combo untuk membangun paket dan melihat harga akhir.",
    topic: "promo",
    modes: ["flight", "train", "bus", "ship"],
    tags: ["combo", "paket", "diskon"]
  },
  {
    q: "Bagaimana kebijakan refund & reschedule?",
    a: "Kebijakan refund/reschedule mengikuti operator (maskapai/kereta/bus/kapal) dan kelas tiket. Pada halaman Pesanan, klik Detail > Kebijakan untuk melihat ketentuan. Beberapa tiket promo bisa Non-Refundable.",
    topic: "pesanan",
    modes: ["flight", "train", "bus", "ship"],
    tags: ["refund", "reschedule", "kebijakan"]
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "Kami mendukung transfer bank, e-wallet, kartu kredit/debit, dan gerai retail tertentu. Metode bisa berbeda per negara/kampanye promo.",
    topic: "pembayaran",
    modes: [],
    tags: ["pembayaran", "e-wallet", "kartu"]
  },
  {
    q: "Bagaimana cara menggunakan kode promo?",
    a: "Masukkan kode promo saat checkout pada bagian 'Voucher/Kode Promo'. Jika valid, diskon langsung terpotong pada ringkasan pembayaran.",
    topic: "promo",
    modes: [],
    tags: ["voucher", "kupon", "kode promo"]
  },
  {
    q: "Di mana saya melihat tiket dan riwayat pesanan?",
    a: "Masuk ke akun Anda, buka halaman Pesanan (My Trips). Di sana ada tiket aktif, e-ticket (PDF/QR), status pembayaran, serta histori.",
    topic: "pesanan",
    modes: [],
    tags: ["tiket", "riwayat", "my trips"]
  },
  {
    q: "Apakah aman bertransaksi di website ini?",
    a: "Kami menggunakan enkripsi TLS, tokenisasi pembayaran, dan audit keamanan berkala. Lihat halaman Keamanan & Privasi untuk detail praktik terbaik kami.",
    topic: "akun",
    modes: [],
    tags: ["keamanan", "privasi", "aman"]
  },
  {
    q: "Pembayaran gagal tetapi saldo terpotong?",
    a: "Biasanya dana otomatis kembali dalam 1x24 jam oleh penyedia pembayaran. Jika belum kembali, hubungi kami melalui Pusat Bantuan dengan bukti transaksi.",
    topic: "pembayaran",
    modes: [],
    tags: ["gagal", "refund", "saldo terpotong"]
  },
  {
    q: "Cara klaim bagasi/hilang barang?",
    a: "Untuk kejadian operasional, segera hubungi operator terkait (maskapai/stasiun/terminal/pelabuhan). Simpan bukti perjalanan dan ajukan laporan resmi. Kami dapat membantu eskalasi bila perlu.",
    topic: "pesanan",
    modes: ["flight", "train", "bus", "ship"],
    tags: ["bagasi", "lost and found", "klaim"]
  },
  {
    q: "Apakah ada layanan pelanggan 24/7?",
    a: "Ya, Chat Support tersedia 24/7. Email & telepon beroperasi jam 08:00–22:00 WIB (respon cepat di jam operasional).",
    topic: "akun",
    modes: [],
    tags: ["support", "cs", "24/7"]
  },
];

/* =========================
   KOMPONEN KECIL
   ========================= */
const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm border transition inline-flex items-center gap-2
      ${active ? "bg-blue-600 text-white border-blue-600 shadow-sm"
               : "bg-white/80 text-gray-700 border-gray-200 hover:bg-white"}`}
  >
    {children}
  </button>
);

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-white/80">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`w-5 h-5 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 text-sm text-gray-700">
          {a}
        </div>
      )}
    </div>
  );
};

const ContactCard = ({ icon: Icon, title, desc, href, label }) => (
  <div className="rounded-2xl border bg-white/70 p-5">
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      <Icon className="w-5 h-5 text-blue-700" /> {title}
    </h3>
    <p className="text-sm text-gray-600">{desc}</p>
    <a href={href} className="inline-flex items-center gap-1 mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700">
      {label} <ExternalLink className="w-4 h-4" />
    </a>
  </div>
);

/* =========================
   HALAMAN HELP (Eksploratif)
   ========================= */
export default function HelpPageExplorative() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");   // all | TOPICS.key
  const [mode, setMode] = useState("all");     // all | flight | train | bus | ship

  const filteredFaqs = useMemo(() => {
    let arr = [...FAQS];

    if (topic !== "all") arr = arr.filter((f) => f.topic === topic);
    if (mode !== "all") arr = arr.filter((f) => (f.modes?.length ? f.modes.includes(mode) : true));

    if (query.trim()) {
      const s = query.toLowerCase();
      arr = arr.filter((item) =>
        item.q.toLowerCase().includes(s) ||
        item.a.toLowerCase().includes(s) ||
        (item.tags || []).some(tag => tag.toLowerCase().includes(s))
      );
    }

    return arr;
  }, [query, topic, mode]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* TOP BAR HERO – ringan (bukan dashboard) */}
      <section className="border-b bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-700">
                <LifeBuoy className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Pusat Bantuan
                </span>
              </div>
              <h1 className="mt-2 text-2xl md:text-3xl font-extrabold leading-tight">
                Ada kendala? Temukan jawabannya di sini.
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Cari solusi cepat, baca panduan, atau hubungi tim kami 24/7 via chat.
              </p>
            </div>

            {/* Search */}
            <div className="w-full md:w-[460px]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari FAQ: refund, kode promo, pembayaran gagal, dll…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: ketik kata kunci spesifik, mis. <em>“refund pesawat”</em> atau <em>“kode promo”</em>.
              </p>
            </div>
          </div>

          {/* Chips Topik */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Chip active={topic === "all"} onClick={() => setTopic("all")}>
              <Info className="w-4 h-4" /> Semua Topik
            </Chip>
            {TOPICS.map((t) => (
              <Chip key={t.key} active={topic === t.key} onClick={() => setTopic(t.key)}>
                <t.icon className="w-4 h-4" /> {t.label}
              </Chip>
            ))}
          </div>

          {/* Chips Mode Transport */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Chip active={mode === "all"} onClick={() => setMode("all")}>
              Semua Transport
            </Chip>
            {TRANSPORTS.map((m) => (
              <Chip key={m.key} active={mode === m.key} onClick={() => setMode(m.key)}>
                <m.icon className="w-4 h-4" /> {m.label}
              </Chip>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {TOPICS.map((t) => (
            <button
              key={t.key}
              className="rounded-2xl border bg-white hover:shadow-md transition flex items-center gap-3 p-4 text-left"
              onClick={() => {
                setTopic(t.key);
                window?.scrollTo({ top: document.getElementById("faqs")?.offsetTop - 16 || 0, behavior: "smooth" });
              }}
            >
              <t.icon className="w-5 h-5 text-blue-700" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* KONTAK & LAPORAN – ringan */}
      <section className="max-w-7xl mx-auto px-6 mt-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <ContactCard
            icon={MessageCircle}
            title="Chat 24/7"
            desc="Dapatkan bantuan cepat via chat dengan agen kami."
            href="#"
            label="Mulai Chat"
          />
          <ContactCard
            icon={Mail}
            title="Email"
            desc="Respons cepat di jam 08:00–22:00 WIB."
            href="mailto:support@travelsite.example"
            label="Kirim Email"
          />
          <ContactCard
            icon={Phone}
            title="Telepon"
            desc="Butuh bicara langsung? Hubungi kami."
            href="tel:+62210000000"
            label="Hubungi"
          />
        </div>

        {/* Laporan Masalah Singkat */}
        <div className="mt-4 rounded-2xl border bg-white p-5">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" /> Laporkan Masalah
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Sampaikan detail agar kami bisa membantu lebih cepat.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Terima kasih! Laporan Anda sudah terkirim (demo).");
              e.target.reset();
            }}
            className="grid md:grid-cols-3 gap-3"
          >
            <input placeholder="Email Anda" className="px-3 py-2 rounded-xl border" required />
            <input placeholder="Subjek" className="px-3 py-2 rounded-xl border" required />
            <input placeholder="Nomor Pesanan (opsional)" className="px-3 py-2 rounded-xl border" />
            <textarea placeholder="Ceritakan masalah Anda..." className="md:col-span-3 px-3 py-2 rounded-xl border min-h-[100px]" required />
            <button className="md:col-span-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700">
              Kirim Laporan
            </button>
          </form>
        </div>
      </section>

      {/* FAQS */}
      <section id="faqs" className="max-w-7xl mx-auto px-6 pb-14">
        <h2 className="text-xl font-bold mb-3">Pertanyaan yang Sering Diajukan</h2>
        <p className="text-sm text-gray-600 mb-4">Klik setiap pertanyaan untuk membuka jawabannya.</p>
        {filteredFaqs.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 text-center text-gray-600">
            Tidak ada FAQ yang cocok. Coba ubah filter/topik atau kata kunci.
          </div>
        ) : (
          <div className="grid gap-3">
            {filteredFaqs.map((f, i) => (
              <FaqItem key={`${f.q}-${i}`} q={f.q} a={f.a} />
            ))}
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500 flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Layanan pelanggan berlokasi di Jakarta, Indonesia.
        </div>
      </section>
    </div>
  );
}
