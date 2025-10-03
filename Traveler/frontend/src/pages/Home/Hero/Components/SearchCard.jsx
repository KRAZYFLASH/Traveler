import React, { useEffect, useMemo, useRef, useState } from 'react'

const SearchCard = () => {
   const [type, setType] = useState("flight");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [pax, setPax] = useState(1);
  
    const [focus, setFocus] = useState(null); // "from" | "to" | null
  
    return (
      <div className="rounded-2xl bg-white text-[#1C1C1C] shadow-2xl ring-1 ring-black/5 p-4 md:p-6">
        <div className="flex flex-wrap gap-3">
          {/* Transport type */}
          <Select
            label="Jenis Transport"
            value={type}
            onChange={setType}
            options={[
              { value: "flight", label: "Pesawat ✈️" },
              { value: "train", label: "Kereta 🚆" },
              { value: "bus", label: "Bus 🚌" },
              { value: "ship", label: "Kapal 🚢" },
              { value: "car", label: "Mobil 🚗" },
            ]}
            className="min-w-[180px]"
          />
  
          {/* From */}
          <Autocomplete
            label="Asal"
            placeholder="Ketik kota/bandara/stasiun"
            value={from}
            onChange={setFrom}
            onFocus={() => setFocus("from")}
            onBlur={() => setFocus(null)}
          />
  
          {/* To */}
          <Autocomplete
            label="Tujuan"
            placeholder="Ketik kota/bandara/stasiun"
            value={to}
            onChange={setTo}
            onFocus={() => setFocus("to")}
            onBlur={() => setFocus(null)}
          />
  
          {/* Date */}
          <Field label="Tanggal" className="min-w-[180px]">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-black/10 outline-none focus:ring-2 focus:ring-[#0077B6]"
            />
          </Field>
  
          {/* Pax */}
          <Field label="Penumpang" className="min-w-[140px]">
            <input
              type="number"
              min={1}
              value={pax}
              onChange={(e) => setPax(Number(e.target.value) || 1)}
              className="w-full px-3 py-3 rounded-xl border border-black/10 outline-none focus:ring-2 focus:ring-[#0077B6]"
            />
          </Field>
  
          <div className="flex items-end">
            <SearchButton
              params={{ type, from, to, date, pax }}
              disabled={!from || !to || !date}
            />
          </div>
        </div>
  
        {/* Quick filters */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {[
            "Paling Murah",
            "Tercepat",
            "Langsung (Non-Stop)",
          ].map((t) => (
            <span key={t} className="px-3 py-1 rounded-full bg-black/5">
              {t}
            </span>
          ))}
        </div>
      </div>
    );
}

export default SearchCard




function SearchButton({ params, disabled }) {
  const [loading, setLoading] = useState(false);

  async function onSearch() {
    try {
      setLoading(true);
      const qs = new URLSearchParams(
        Object.entries(params).reduce((acc, [k, v]) => {
          acc[k] = String(v ?? "");
          return acc;
        }, {})
      ).toString();

      // Placeholder request — ganti dengan router navigate("/search?" + qs)
      const res = await fetch(`/api/search?${qs}`);
      if (!res.ok) throw new Error("Gagal mencari perjalanan");
      const data = await res.json();
      console.log("Hasil pencarian:", data);
      alert("Pencarian dikirim. Cek console untuk hasil (placeholder).");
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onSearch}
      disabled={disabled || loading}
      className="px-5 py-3 rounded-xl bg-[#FF6B35] text-white font-semibold disabled:opacity-90 hover:bg-[#e85c2e] transition"
    >
      {loading ? "Mencari…" : "Cari"}
    </button>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`flex-1 min-w-[220px] ${className}`}>
      <label className="text-xs text-black/60 block mb-1">{label}</label>
      {children}
    </div>
  );
}

function Select({ label, value, onChange, options = [], className = "" }) {
  return (
    <Field label={label} className={className}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 rounded-xl border border-black/10 outline-none focus:ring-2 focus:ring-[#0077B6]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

// --- Autocomplete component ---
function Autocomplete({ label, value, onChange, placeholder, onFocus, onBlur }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  // Debounce input
  const [q, setQ] = useState("");
  useEffect(() => setQ(value), [value]);
  const debounced = useDebounce(q, 250);

  useEffect(() => {
    let active = true;
    async function run() {
      if (!debounced || debounced.length < 2) {
        setItems([]);
        return;
      }
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/locations?query=${encodeURIComponent(debounced)}`);
        if (!res.ok) throw new Error("Gagal memuat lokasi");
        const data = await res.json();
        if (!active) return;
        setItems(data || []);
        setOpen(true);
      } catch (e) {
        if (!active) return;
        setError(e.message);
        setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    run();
    return () => {
      active = false;
    };
  }, [debounced]);

  function selectItem(item) {
    onChange(item.name);
    setOpen(false);
  }

  return (
    <Field label={label}>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => {
            setOpen(items.length > 0);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            // Small delay so click can register
            setTimeout(() => setOpen(false), 120);
            onBlur?.(e);
          }}
          placeholder={placeholder}
          className="w-full px-3 py-3 rounded-xl border border-black/10 outline-none focus:ring-2 focus:ring-[#0077B6]"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="loc-listbox"
          role="combobox"
        />

        {/* Dropdown */}
        {open && (
          <div
            ref={listRef}
            id="loc-listbox"
            role="listbox"
            className="absolute z-20 mt-1 w-full rounded-xl border border-black/10 bg-white shadow-lg overflow-hidden"
          >
            {loading && (
              <div className="px-3 py-2 text-sm text-black/60">Memuat…</div>
            )}
            {error && (
              <div className="px-3 py-2 text-sm text-red-600">{error}</div>
            )}
            {!loading && !error && items.length === 0 && (
              <div className="px-3 py-2 text-sm text-black/60">Tidak ada hasil</div>
            )}
            {!loading && !error &&
              items.map((it, idx) => (
                <button
                  type="button"
                  key={`${it.code}-${idx}`}
                  role="option"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-black/5"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectItem(it)}
                >
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-black/60">
                    {it.type} • {it.code} • {it.country}
                  </div>
                </button>
              ))}
          </div>
        )}
      </div>
    </Field>
  );
}

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
