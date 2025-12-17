export default function TodoCard({ todo, onToggle, onDelete, onDragStart, onDragEnd }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragEnd={onDragEnd}
      className="group rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm hover:shadow transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-neutral-900">{todo.title}</div>
          {todo.note ? <div className="mt-1 text-xs text-neutral-600">{todo.note}</div> : null}
        </div>

        <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
          <button
            onClick={() => onToggle(todo.id)}
            className="rounded-lg border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-50"
            title="Toggle Done"
          >
            {todo.status === "todo" ? "Done" : "Undo"}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="rounded-lg border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-50"
            title="Delete"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}
