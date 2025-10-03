import { useEffect, useRef, useState } from "react";

// -------------------- Card --------------------
function PromoCard({ p }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md h-full"
      aria-label={p.title}
    >
      {/* Media */}
      <div className="relative aspect-[16/9] bg-gray-100">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#FFD60A] to-[#FF6B35]" />
        )}

        {/* Discount Badge */}
        {p.discountPct && (
          <div className="absolute left-3 top-3 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-semibold text-white shadow">
            {p.discountPct}% OFF
          </div>
        )}

        {/* Transport Badge */}
        {p.transport && (
          <div className="absolute right-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white">
            {p.transport}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold text-[#1C1C1C]">
            {p.title}
          </h3>
          {p.subtitle && (
            <p className="mt-1 line-clamp-1 text-xs text-black/60">{p.subtitle}</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/70">
              {p.priceFrom ? (
                <>
                  Mulai{" "}
                  <span className="font-semibold">
                    Rp {p.priceFrom.toLocaleString("id-ID")}
                  </span>
                </>
              ) : (
                <span>&nbsp;</span>
              )}
            </span>

            <a
              href={p.url || "#"}
              className="inline-flex items-center gap-1 rounded-xl bg-[#0077B6] px-3 py-2 text-xs font-semibold text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0077B6]/30"
            >
              Ambil Promo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M13.5 4.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V6.31l-9.22 9.22a.75.75 0 1 1-1.06-1.06l9.22-9.22H14.25a.75.75 0 0 1-.75-.75Z" />
                <path d="M3 5.25A2.25 2.25 0 0 1 5.25 3h6a.75.75 0 0 1 0 1.5h-6c-.414 0-.75.336-.75.75v12c0 .414.336.75.75.75h12c.414 0 .75-.336.75-.75v-6a.75.75 0 0 1 1.5 0v6A2.25 2.25 0 0 1 17.25 21h-12A2.25 2.25 0 0 1 3 18.75v-12Z" />
              </svg>
            </a>
          </div>

          {p.validUntil && (
            <p className="text-[10px] text-black/50">
              Berlaku s.d. {new Date(p.validUntil).toLocaleDateString("id-ID")}
            </p>
          )}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
    </article>
  );
}

// -------------------- Skeleton --------------------
function PromoCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      <div className="aspect-[16/9] animate-pulse bg-gray-200" />
      <div className="p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}



// -------------------- Section --------------------
export default function PopularDestination() {
  const [promos, setPromos] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef(null);

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        setLoading(true);
        // Replace with real API call: /api/promotions
        const mock = [
          {
            id: "p1",
            title: "Diskon 25% Pesawat ke Bali",
            subtitle: "Periode 1–31 Okt",
            image:
              "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop",
            transport: "flight",
            discountPct: 25,
            priceFrom: 750000,
            validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
            url: "#",
            highlight: true,
          },
          {
            id: "p2",
            title: "Kereta Cepat Jakarta–Bandung mulai Rp 150rb",
            subtitle: "Weekend Deal",
            image:
              "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop",
            transport: "train",
            discountPct: 15,
            priceFrom: 150000,
            validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
            url: "#",
          },
          {
            id: "p3",
            title: "Rental Mobil Harian 12% OFF",
            subtitle: "Bandung & Surabaya",
            image:
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
            transport: "car",
            discountPct: 12,
            priceFrom: 200000,
            validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
            url: "#",
          },
          {
            id: "p4",
            title: "Pelni & Kapal Cepat – 10% Lebih Hemat",
            subtitle: "Rute Antar Pulau",
            image:
              "https://images.unsplash.com/photo-1527490087278-9c75beed2681?q=80&w=1600&auto=format&fit=crop",
            transport: "ship",
            discountPct: 10,
            priceFrom: 180000,
            validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
            url: "#",
          },
          {
            id: "p5",
            title: "Diskon 15% Tiket Pesawat Domestik",
            subtitle: "Terbang Hemat ke Berbagai Kota",
            image:
              "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1600&auto=format&fit=crop",
            transport: "flight",
            discountPct: 15,
            priceFrom: 750000,
            validUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 25).toISOString(),
            url: "#",
          },
        ];
        if (!ignore) setPromos(mock);
      } catch (e) {
        console.error(e);
        if (!ignore) setPromos([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const highlights = (promos || []).filter((p) => p.highlight);
  const others = (promos || []).filter((p) => !p.highlight);

  // Ambil tepat 4 card untuk bagian bawah
  const bottomCards = others.slice(0, 4);
  const padCount = Math.max(0, 4 - bottomCards.length);

  // Horizontal scroll helpers (kalau nanti mau dipakai)
  const scrollBy = (dx) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <section className="bg-white" aria-labelledby="promo-heading">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="promo-heading" className="text-xl font-bold">
            Favorite Destination
          </h2>
        </div>

        {/* Bagian bawah — selalu 4 kolom di desktop */}
        <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {!loading && bottomCards.map((p) => <PromoCard key={`g-${p.id}`} p={p} />)}

          {/* Pad dengan skeleton jika item < 4 */}
          {!loading &&
            Array.from({ length: padCount }).map((_, idx) => (
              <PromoCardSkeleton key={`pad-${idx}`} />
            ))}

          {/* Saat loading, tampilkan 4 skeleton */}
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <PromoCardSkeleton key={`s-${i}`} />
            ))}
        </div>
        {/* Button paling bawah */}
      <div className="p-5 border-t border-black/10">
        <a
          href={"#"}
          className="block w-full rounded-xl bg-[#FFD60A] px-4 py-2 text-center text-sm font-semibold text-[#1C1C1C] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#FFD60A]/30"
        >
          Detail Promo
        </a>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
      </div>
    </section>
  );
}