const PARTNERS = [
  { mono: "STIP", name: "STIP Tolitoli" },
  { mono: "TWH", name: "Tut Wuri Handayani" },
  { mono: "BIMA", name: "BIMA" },
  { mono: "DST", name: "DIKTISAINTEK Berdampak" },
];

export default function PartnersStrip() {
  return (
    <section className="border-y border-border bg-primary-50 py-10">
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="mb-4 text-center text-xs font-bold tracking-wide text-muted">Didukung oleh</p>
        <div className="flex flex-wrap justify-center gap-3.5">
          {PARTNERS.map((p) => (
            <div
              key={p.mono}
              className="flex items-center gap-2.5 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-4"
            >
              <span className="flex size-8 flex-none items-center justify-center rounded-full bg-primary text-[0.65rem] font-extrabold text-white">
                {p.mono}
              </span>
              <span className="text-sm font-bold text-ink">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
