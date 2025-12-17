export default function TextInput({ label, error, className = "", ...props }) {
  return (
    <label className={"block " + className}>
      {label ? <div className="mb-1 text-sm font-medium text-neutral-800">{label}</div> : null}

      <input
        className={
          "w-full rounded-xl border px-3 py-2 outline-none transition " +
          (error ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-neutral-200 focus:ring-2 focus:ring-neutral-200")
        }
        {...props}
      />

      {error ? <div className="mt-1 text-xs text-red-600">{error}</div> : null}
    </label>
  );
}
