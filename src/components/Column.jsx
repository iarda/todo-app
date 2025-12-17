export default function Column({ title, subtitle, onDropCard, onDragOver, children }) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="mb-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-bold text-neutral-900">{title}</h2>
          {subtitle ? <span className="text-xs text-neutral-500">{subtitle}</span> : null}
        </div>
      </div>

      <div
        onDragOver={onDragOver}
        onDrop={onDropCard}
        className="min-h-[220px] space-y-3 rounded-2xl border border-dashed border-neutral-200 bg-white/70 p-3"
      >
        {children}
      </div>
    </section>
  );
}
