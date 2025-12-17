import { useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { makeId } from "./utils/ids";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import TodoCard from "./components/TodoCard";
import Column from "./components/Column";

const STORAGE_KEY = "todo-app:v1";

export default function App() {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [draggingId, setDraggingId] = useState(null);

  const { todoList, doneList } = useMemo(() => {
    const todoList = todos.filter((t) => t.status === "todo");
    const doneList = todos.filter((t) => t.status === "done");
    return { todoList, doneList };
  }, [todos]);

  function validate() {
    const trimmed = title.trim();
    if (!trimmed) return "Please enter a title.";
    if (trimmed.length < 3) return "At least 3 characters.";
    if (trimmed.length > 80) return "Maximum 80 characters.";
    return "";
  }

  function addTodo(e) {
    e.preventDefault();
    const msg = validate();
    setError(msg);
    if (msg) return;

    const newTodo = {
      id: makeId(),
      title: title.trim(),
      note: note.trim(),
      status: "todo",
      createdAt: Date.now(),
    };

    setTodos((prev) => [newTodo, ...prev]);
    setTitle("");
    setNote("");
    setError("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === "todo" ? "done" : "todo" } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function onDragStart(e, id) {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  function dropTo(status) {
    return (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain") || draggingId;
      if (!id) return;

      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
      setDraggingId(null);
    };
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mt-3 mb-8 text-3xl font-extrabold tracking-tight text-neutral-900">
          To-Do App
        </h1>

        <form
          onSubmit={addTodo}
          className="mb-8 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <TextInput
              label="Title"
              placeholder="your to-do"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={error}
            />

            <TextInput
              label="Notice"
              placeholder="your notice"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <Button type="submit" className="h-[42px]">
              Add
            </Button>
          </div>
        </form>

        <div className="grid gap-4 md:grid-cols-2">
          <Column
            title={`To-Do (${todoList.length})`}
            subtitle="Drop here"
            onDragOver={allowDrop}
            onDropCard={dropTo("todo")}
          >
            {todoList.length === 0 ? (
              <EmptyState text="Please Add a To-Do" />
            ) : (
              todoList.map((t) => (
                <TodoCard
                  key={t.id}
                  todo={t}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onDragStart={onDragStart}
                />
              ))
            )}
          </Column>

          <Column
            title={`Done (${doneList.length})`}
            subtitle="Drop here"
            onDragOver={allowDrop}
            onDropCard={dropTo("done")}
          >
            {doneList.length === 0 ? (
              <EmptyState text="Empty" />
            ) : (
              doneList.map((t) => (
                <TodoCard
                  key={t.id}
                  todo={t}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onDragStart={onDragStart}
                />
              ))
            )}
          </Column>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
      {text}
    </div>
  );
}
