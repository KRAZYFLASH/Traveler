// src/pages/Admin/Admin.jsx
import React from "react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Halaman Admin</h1>
      <p className="mb-6">Selamat datang di dashboard admin.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Statistik */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Jumlah Pengguna</h2>
          <p className="text-2xl font-bold">1.250</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Jumlah Pesanan</h2>
          <p className="text-2xl font-bold">480</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Promo Aktif</h2>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>

      <div className="mt-8">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Kelola Promo
        </button>
      </div>
    </div>
  );
};

export default Admin;
