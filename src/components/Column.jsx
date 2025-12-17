export default function Column({ 
  title, 
  onDropCard, 
  onDragOver, 
  onDragEnter,
  onDragLeave,
  showDropOverlay=false,
  isActiveDropzone = false, 
  children
}) {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
      <div className="mb-3">
        <h2 className="text-sm font-bold text-neutral-900">{title}</h2>
      </div>

      <div
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDropCard}
        className={
          "relative min-h-[220px] space-y-3 rounded-2xl border border-dashed p-3 transition " +
          (isActiveDropzone
          ? "border-neutral-900 bg-neutral-50 shadow-sm"
          : "border-neutral-200 bg-white/70")
          }
        >
        {showDropOverlay ? (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="rounded-2xl bg-black/70 px-4 py-2 text-sm font-semibold text-white shadow">
              Drop here
            </div>
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
