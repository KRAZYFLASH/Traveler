// Footer Component — React + Tailwind
// Struktur ini fleksibel untuk travel website

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-xl bg-[#0077B6]" />
            <span className="font-bold tracking-wide text-[#1C1C1C]">Travelio</span>
          </div>
          <p className="text-black/60 max-w-xs">
            Solusi lengkap untuk perjalananmu: pesawat, kereta, bus, kapal, dan mobil rental.
          </p>
          <p className="mt-3 text-xs text-black/50">© {new Date().getFullYear()} Travelio. Semua Hak Dilindungi.</p>
        </div>

        {/* Perusahaan */}
        <div>
          <h3 className="font-semibold mb-3 text-[#1C1C1C]">Perusahaan</h3>
          <ul className="space-y-2 text-black/70">
            <li><a href="#" className="hover:text-[#0077B6]">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-[#0077B6]">Karier</a></li>
            <li><a href="#" className="hover:text-[#0077B6]">Blog</a></li>
          </ul>
        </div>

        {/* Bantuan */}
        <div>
          <h3 className="font-semibold mb-3 text-[#1C1C1C]">Bantuan</h3>
          <ul className="space-y-2 text-black/70">
            <li><a href="#" className="hover:text-[#0077B6]">FAQ</a></li>
            <li><a href="#" className="hover:text-[#0077B6]">Kontak</a></li>
            <li><a href="#" className="hover:text-[#0077B6]">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-[#0077B6]">Syarat & Ketentuan</a></li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="font-semibold mb-3 text-[#1C1C1C]">Ikuti Kami</h3>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#0077B6] hover:text-white">F</a>
            <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#0077B6] hover:text-white">I</a>
            <a href="#" aria-label="Twitter" className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#0077B6] hover:text-white">T</a>
            <a href="#" aria-label="YouTube" className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-[#0077B6] hover:text-white">Y</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
