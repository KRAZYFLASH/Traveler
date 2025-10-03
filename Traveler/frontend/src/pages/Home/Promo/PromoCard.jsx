import React from 'react'

const PromoCard = (p) => {
  return (
    <div>
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
            <p className="mt-1 line-clamp-1 text-xs text-black/60">
              {p.subtitle}
            </p>
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
    </div>
  )
}

export default PromoCard
