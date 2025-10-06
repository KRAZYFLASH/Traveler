import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { useToast } from "../components/Toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { Atoken, setAtoken, backendUrl } = useContext(AdminContext);
  const toast = useToast();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Show loading toast
    const loadingToastId = toast.loading("Sedang login...");

    try {
      console.log("Mengirim login dengan:", backendUrl);
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password
      });

      // Remove loading toast
      toast.remove(loadingToastId);

      if (data.success) {
        console.log("Login berhasil, token:", data.token);
        localStorage.setItem("adminToken", data.token);
        setAtoken(data.token);

        // Show success toast
        toast.success(`Selamat datang kembali! Login berhasil. ✈️`);
      } else {
        toast.error(data.message || "Login gagal. Periksa kredensial Anda.");
      }

    } catch (error) {
      // Remove loading toast
      toast.remove(loadingToastId);

      console.error("Login error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 404) {
        toast.error("API endpoint tidak ditemukan. Periksa server backend.");
      } else if (error.code === 'NETWORK_ERROR') {
        toast.error("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
      } else {
        toast.error("Terjadi kesalahan. Periksa koneksi internet Anda.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // ...existing JSX code...
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white">✈️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Traveler Admin</h2>
          <p className="text-gray-600 text-sm">Masuk ke dashboard admin</p>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="admin@traveler.com"
            required
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="••••••••"
            required
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
            ${isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300'
            }
            text-white transform hover:scale-[1.02] active:scale-[0.98]
          `}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sedang masuk...
            </div>
          ) : (
            'Masuk ke Dashboard'
          )}
        </button>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Belum punya akun admin?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;