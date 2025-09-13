import { supabase } from "./supabaseClient"

export type Todo = {
  id: number
  text: string
  completed: boolean
  user_id: string
}

// Fetch todos only for logged-in user
export const fetchTodos = async (): Promise<Todo[]> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id)
    .order("id", { ascending: true })

  if (error) throw error
  return data as Todo[]
}

// Add a todo for the current user
export const addTodo = async (text: string) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not logged in")

  const { error } = await supabase.from("todos").insert([
    { text, completed: false, user_id: user.id },
  ])
  if (error) throw error
}

// Toggle completed
export const toggleTodo = async (todo: Todo) => {
  const { error } = await supabase
    .from("todos")
    .update({ completed: !todo.completed })
    .eq("id", todo.id)
  if (error) throw error
}

// Delete
export const deleteTodo = async (id: number) => {
  const { error } = await supabase.from("todos").delete().eq("id", id)
  if (error) throw error
}

// Update text
export const updateTodo = async ({ id, text }: { id: number; text: string }) => {
  const { error } = await supabase.from("todos").update({ text }).eq("id", id)
  if (error) throw error
}
