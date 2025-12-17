export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium " +
        "bg-black text-white hover:bg-gray-600 cursor-pointer " +
        "transition " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
