import React, { useMemo, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useToast } from "../components/Toast";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Loader2,
} from "lucide-react";

/**
 * Traveler-themed Admin Login page (lucide-react version)
 */

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setAtoken, backendUrl } = useContext(AdminContext);
  const toast = useToast();
  const navigate = useNavigate();

  const canSubmit = useMemo(() => email && password && !isLoading, [email, password, isLoading]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsLoading(true);
    const loadingId = toast.loading("Sedang login...");

    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });

      toast.remove(loadingId);

      if (data?.success && data?.token) {
        if (remember) localStorage.setItem("adminToken", data.token);
        setAtoken(data.token);
        toast.success("Selamat datang kembali! ✈️");
        navigate("/admin");
      } else {
        toast.error(data?.message || "Login gagal. Periksa kredensial.");
      }
    } catch (err) {
      toast.remove(loadingId);
      if (err.response?.data?.message) toast.error(err.response.data.message);
      else if (err.response?.status === 404) toast.error("Endpoint tidak ditemukan. Cek backend.");
      else if (err.code === "NETWORK_ERROR") toast.error("Tidak dapat terhubung ke server.");
      else toast.error("Terjadi kesalahan. Cek koneksi Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-200 via-blue-200 to-indigo-200" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_80%_0%,rgba(255,165,0,0.25),transparent)]" />
      <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:"url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'160\\' height=\\'160\\' viewBox=\\'0 0 40 40\\'><path fill=\\'%23ffffff\\' fill-opacity=\\'0.6\\' d=\\'M0 39h40v1H0zM39 0h1v40h-1z\\'/></svg>')"}} />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-2">
        {/* Left info card */}
        <div className="hidden lg:flex items-center justify-center p-10">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-400/40 to-blue-500/40 blur-2xl" />
            <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-8 border border-white/60">
              <div className="flex items-center gap-3">
                <img src="/assets/Traveler-RB.png" alt="Traveler" className="h-10 w-10 rounded-xl object-contain" />
                <div>
                  <p className="text-sm uppercase tracking-widest text-blue-600">Traveler Admin</p>
                  <h2 className="text-2xl font-bold text-slate-800">Kelola Perjalanan Lebih Lincah</h2>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-slate-700">
                <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Proteksi akses admin</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> Otentikasi cepat & aman</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> SIAP: promo, jadwal, kendaraan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <form onSubmit={onSubmitHandler} className="relative w-full max-w-md">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-500 blur-xl opacity-30" />
            <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/60 p-6 sm:p-8">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 h-12 w-12 grid place-items-center rounded-2xl bg-blue-50">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">Masuk Admin</h1>
                <p className="text-sm text-slate-600 mt-1">Akses dashboard Traveler Anda.</p>
              </div>

              {/* Email */}
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <div className="mt-1 mb-3 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full rounded-lg border border-slate-200 bg-white px-3 py-2 pl-10 outline-none ring-0 focus:border-blue-400"
                  placeholder="admin@traveler.com"
                  autoComplete="email"
                  required
                  disabled={isLoading}
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
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
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

              {/* Options */}
              <div className="mb-4 flex items-center justify-between text-sm text-slate-700">
                <label className="inline-flex items-center gap-2 select-none">
                  <input type="checkbox" className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400" checked={remember} onChange={(e)=>setRemember(e.target.checked)} />
                  Ingat saya
                </label>
                <button type="button" className="text-blue-600 hover:underline">Lupa password?</button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-semibold text-white shadow transition-all ${
                  canSubmit ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 active:brightness-95" : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                {isLoading ? (<><Loader2 className="h-5 w-5 animate-spin"/> Sedang masuk...</>) : (<>Masuk ke Dashboard</>)}
              </button>

              <p className="mt-5 text-center text-sm text-slate-600">
                Belum punya akun admin? {" "}
                <Link to="/signup" className="text-blue-600 hover:underline">Daftar di sini</Link>
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-slate-600">© {new Date().getFullYear()} Traveler. Semua hak dilindungi.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
