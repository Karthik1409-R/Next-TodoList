"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Edit, Trash2, CheckCircle, Circle } from "lucide-react"

type Todo = {
  id: number
  text: string
  completed: boolean
  user_id: string
}

export default function TaskManagement() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [newText, setNewText] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id")

    if (error) {
      console.error("Error fetching todos:", error)
    } else {
      setTodos(data as Todo[])
    }
    setLoading(false)
  }

  const deleteTodo = async (id: number) => {
    await supabase.from("todos").delete().eq("id", id)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const updateTodo = async (id: number, text: string) => {
    await supabase.from("todos").update({ text }).eq("id", id)
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    )
    setEditingId(null)
    setNewText("")
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading tasks...</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        Task Management (All User Tasks)
      </h1>
      <p className="mb-4 text-gray-600">
        Total tasks: <span className="font-bold">{todos.length}</span>
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">User ID</th>
              <th className="px-4 py-2 text-left">Task</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, idx) => (
              <tr key={todo.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{todo.user_id}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {todo.completed ? (
                    <CheckCircle className="text-green-500" size={18} />
                  ) : (
                    <Circle className="text-gray-400" size={18} />
                  )}
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    todo.text
                  )}
                </td>
                <td className="px-4 py-2">
                  {todo.completed ? (
                    <span className="text-green-600 font-medium">Completed</span>
                  ) : (
                    <span className="text-red-500 font-medium">Pending</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {editingId === todo.id ? (
                    <button
                      onClick={() => updateTodo(todo.id, newText)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(todo.id)
                        setNewText(todo.text)
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                    >
                      <Edit size={16} /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
            {todos.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
