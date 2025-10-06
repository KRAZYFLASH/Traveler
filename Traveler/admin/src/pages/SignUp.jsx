import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";

/**
 * Traveler-themed Admin Signup page
 * - Ocean-to-sunset gradient background with subtle noise & glow
 * - Travel motif: plane path accent, destination badges
 * - Accessible inputs with icons, password visibility toggle
 * - Basic client-side validation + strength meter
 * - Ready to wire with your API (see handleSubmit)
 */

const PASSWORD_RULES = [
  { id: "len", test: (v) => v.length >= 8, label: "≥ 8 karakter" },
  { id: "num", test: (v) => /\d/.test(v), label: "Ada angka" },
  { id: "alpha", test: (v) => /[a-zA-Z]/.test(v), label: "Ada huruf" },
  { id: "sym", test: (v) => /[^a-zA-Z0-9]/.test(v), label: "Ada simbol" },
];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const passScore = useMemo(() => PASSWORD_RULES.filter(r => r.test(password)).length, [password]);
  const passPct = useMemo(() => (passScore / PASSWORD_RULES.length) * 100, [passScore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    if (!agree) {
      setError("Centang persetujuan terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      // TODO: ganti endpoint sesuai backend Anda
      // Example minimal request (adjust body/headers as needed):
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Signup gagal (status ${res.status})`);
      }

      setOk(true);
      // Opsional: redirect ke /login setelah sukses
      // navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-200" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_80%_0%,rgba(255,165,0,0.25),transparent)]" />
      <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:"url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 40 40\\'><path fill=\\'%23ffffff\\' fill-opacity=\\'0.6\\' d=\\'M0 39h40v1H0zM39 0h1v40h-1z\\'/></svg>')"}} />

      {/* Decorative plane path */}
      <svg className="pointer-events-none absolute -top-12 right-0 w-[640px] opacity-50" viewBox="0 0 640 240" fill="none" aria-hidden>
        <path d="M10 200 C160 100, 320 100, 480 160 S620 220, 630 140" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 10" />
        <g transform="translate(606,130)">
          <Plane className="text-white" width={24} height={24} />
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-2">
        {/* Left hero */}
        <div className="hidden lg:flex items-center justify-center p-12">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-400/40 to-blue-500/40 blur-2xl" />
            <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-8 border border-white/60">
              <div className="flex items-center gap-3">
                <img src="/assets/Traveler-RB.png" alt="Traveler" className="h-10 w-10 rounded-xl object-contain" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-blue-600">Traveler Admin</p>
                  <h2 className="text-2xl font-bold text-slate-800">Bangun Perjalanan Tanpa Ribet</h2>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Keamanan akun admin berlapis</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Kelola promo, jadwal, dan kendaraan</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Akses cepat & responsif</li>
              </ul>
              <div className="mt-6 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 p-4 text-white">
                <p className="text-sm/6">Tip: Gunakan email kerja agar mudah verifikasi dan manajemen akses tim.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="relative w-full max-w-md">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 blur-xl opacity-30" />
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/60 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-2xl bg-blue-50">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Signup</h1>
                <p className="text-sm text-slate-600 mt-1">Bergabung untuk mengelola destinasi, jadwal, dan promo Traveler.</p>
              </div>

              {/* Name */}
              <label className="block text-sm font-medium text-slate-700">Nama</label>
              <div className="mt-1 mb-3 relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-10 outline-none ring-0 focus:border-blue-400"
                  placeholder="Nama lengkap"
                  autoComplete="name"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z"/></svg>
              </div>

              {/* Email */}
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <div className="mt-1 mb-3 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-10 outline-none ring-0 focus:border-blue-400"
                  placeholder="admin@contoh.com"
                  autoComplete="email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>

              {/* Password */}
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1 mb-2 relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-10 pr-10 outline-none ring-0 focus:border-blue-400"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100"
                  aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPass ? <EyeOff className="h-5 w-5"/> : <Eye className="h-5 w-5"/>}
                </button>
              </div>

              {/* Strength meter */}
              <div className="mb-3">
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      passPct < 50 ? "bg-red-400" : passPct < 75 ? "bg-yellow-400" : "bg-green-500"
                    }`}
                    style={{ width: `${passPct}%` }}
                  />
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  {PASSWORD_RULES.map(r => (
                    <div key={r.id} className="flex items-center gap-1">
                      <CheckCircle2 className={`h-4 w-4 ${r.test(password) ? "text-green-500" : "text-slate-300"}`} />
                      <span>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agreement */}
              <label className="flex items-start gap-3 text-sm text-slate-700 select-none">
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400" />
                <span>
                  Saya setuju dengan <a className="text-blue-600 hover:underline" href="#">Ketentuan</a> dan <a className="text-blue-600 hover:underline" href="#">Kebijakan Privasi</a> Traveler.
                </span>
              </label>

              {/* Alerts */}
              {error && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}
              {ok && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Signup berhasil! Silakan cek email Anda untuk verifikasi.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2.5 font-semibold text-white shadow hover:brightness-110 active:brightness-95 disabled:opacity-70"
              >
                {loading ? (<><Loader2 className="h-5 w-5 animate-spin"/> Memproses...</>) : (<>Daftar Admin</>)}
              </button>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
                <div className="h-px w-full bg-slate-200"/>
                <span>atau</span>
                <div className="h-px w-full bg-slate-200"/>
              </div>

              {/* SSO placeholder */}
              <button type="button" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50">
                Lanjutkan dengan Google
              </button>

              <p className="mt-4 text-center text-sm text-slate-600">
                Sudah punya akun? {" "}
                <Link to="/login" className="text-blue-600 hover:underline">Masuk di sini</Link>
              </p>
            </div>

            {/* Footer mini */}
            <p className="mt-4 text-center text-xs text-slate-600">
              © {new Date().getFullYear()} Traveler. Semua hak dilindungi.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
