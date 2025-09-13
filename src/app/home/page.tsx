'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, addTodo, toggleTodo, deleteTodo, updateTodo, Todo } from '@/lib/todoApi'
import { supabase } from '@/lib/supabaseClient'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AlertDialogDemo } from './Alert'

export default function Page() {
  const [task, setTask] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')
  const [userName, setUserName] = useState<string>('')  
  const queryClient = useQueryClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const name = data?.user?.user_metadata?.full_name || data?.user?.email || ''
      setUserName(name)
    })
  }, [])

  // Fetch
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  // Mutations
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Task added!')
      setTask('')
    },
  })

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.error('Task deleted!')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Task updated!')
      setEditingId(null)
      setEditingText('')
    },
  })

  // Add Task
  const handleAddTask = () => {
    if (!task.trim()) {
      toast.error('Task cannot be empty!')
      return
    }
    addMutation.mutate(task.trim())
  }

  // Update Task
  const handleUpdateTask = (id: number, text: string) => {
    if (!text.trim()) {
      toast.error('Task cannot be empty!')
      return
    }
    updateMutation.mutate({ id, text: text.trim() })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-3 sm:p-6">
      <Card className="w-full max-w-sm sm:max-w-md md:max-w-xl shadow-2xl rounded-2xl border border-gray-200 bg-white/90 backdrop-blur">
        {/* Header */}
        <CardHeader className="pb-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <CardTitle className="text-center text-2xl sm:text-3xl font-extrabold text-indigo-700">
            {userName ? `${userName}'s Tasks` : 'My Todo List'}
          </CardTitle>
          <AlertDialogDemo />
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Input */}
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
            <Input
              placeholder="Enter a new task..."
              value={task}
              required
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 sm:py-3 text-sm sm:text-base"
            />
            <Button
              onClick={handleAddTask}
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
            >
              <PlusCircle size={18} />
              Add
            </Button>
          </div>

          {/* List */}
          {isLoading ? (
            <p className="text-gray-500 text-center text-sm sm:text-base">Loading...</p>
          ) : todos?.length === 0 ? (
            <p className="text-gray-400 text-center text-sm sm:text-base">No tasks yet..</p>
          ) : (
            <ul className="space-y-3 max-h-72 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
              {todos?.map((todo: Todo) => (
                <li
                  key={todo.id}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center justify-between bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* Checkbox + Text */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 w-full">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleMutation.mutate(todo)}
                    />
                    {editingId === todo.id ? (
                      <Input
                        value={editingText}
                        required
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && handleUpdateTask(todo.id, editingText)
                        }
                        className="flex-1 rounded-lg border border-gray-300 px-2 sm:px-3 py-2 text-sm sm:text-base"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`flex-1 text-base sm:text-lg ${
                          todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                        }`}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    {editingId === todo.id ? (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 sm:px-4 text-sm cursor-pointer"
                        onClick={() => handleUpdateTask(todo.id, editingText)}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg px-3 sm:px-4 text-sm cursor-pointer"
                        onClick={() => {
                          setEditingId(todo.id)
                          setEditingText(todo.text)
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 sm:px-4 text-sm cursor-pointer"
                      onClick={() => deleteMutation.mutate(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c7c7c7;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a3a3a3;
        }
      `}</style>
    </div>
  )
}


