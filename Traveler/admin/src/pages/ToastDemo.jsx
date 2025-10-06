import React from 'react';
import { useToast } from '../components/Toast';

const ToastDemo = () => {
    const toast = useToast();

    const showToasts = () => {
        // Success Toast
        setTimeout(() => {
            toast.success("Pemesanan tiket berhasil! Selamat berlibur! ✈️");
        }, 500);

        // Info Toast  
        setTimeout(() => {
            toast.info("Jangan lupa check-in 2 jam sebelum keberangkatan 📅");
        }, 1000);

        // Warning Toast
        setTimeout(() => {
            toast.warning("Cuaca buruk di tujuan. Siapkan jas hujan! 🌧️");
        }, 1500);

        // Error Toast
        setTimeout(() => {
            toast.error("Pembayaran gagal. Silakan coba lagi atau hubungi CS.");
        }, 2000);

        // Loading Toast
        setTimeout(() => {
            toast.loading("Sedang memproses pembayaran...", 8000);
        }, 2500);
    };

    const clearAllToasts = () => {
        toast.clear();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl text-white">🎯</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Traveler Toast Demo
                        </h1>
                        <p className="text-gray-600">
                            Custom toast notifications dengan tema Traveler
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={showToasts}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            🚀 Show All Toast Types
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => toast.success("Booking confirmed! ✈️")}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                ✅ Success
                            </button>

                            <button
                                onClick={() => toast.error("Payment failed!")}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                ❌ Error
                            </button>

                            <button
                                onClick={() => toast.warning("Weather alert! 🌧️")}
                                className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                ⚠️ Warning
                            </button>

                            <button
                                onClick={() => toast.info("Check-in reminder 📅")}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                ℹ️ Info
                            </button>
                        </div>

                        <button
                            onClick={() => toast.loading("Processing payment...", 5000)}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            ⏳ Loading Toast
                        </button>

                        <button
                            onClick={clearAllToasts}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            🗑️ Clear All Toasts
                        </button>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Fitur Toast:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>✨ 5 tipe toast (success, error, warning, info, loading)</li>
                            <li>🎨 Desain gradient sesuai tema Traveler</li>
                            <li>⚡ Animasi smooth masuk dan keluar</li>
                            <li>🎯 Auto-dismiss dengan durasi custom</li>
                            <li>👆 Manual close dengan tombol X</li>
                            <li>📱 Responsive dan accessible</li>
                            <li>🚀 Portal rendering untuk z-index optimal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToastDemo;