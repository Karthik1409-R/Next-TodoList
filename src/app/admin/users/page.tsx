"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2, Save, X } from "lucide-react"

interface User {
  id: string
  email: string
  full_name: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newEmail, setNewEmail] = useState("")
  const [newFullName, setNewFullName] = useState("")

  const fetchUsers = async () => {
    try {
      const res = await fetch("/admin/api/users/list")
      const data = await res.json()
      console.log("Users from API:", data)
      setUsers(data)
    } catch (err) {
      console.error("Failed to fetch users:", err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAddUser = async () => {
    if (!fullName || !email || !password) return alert("Enter full name, email & password")

    await fetch("/admin/api/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, email, password }),
    })

    setFullName("")
    setEmail("")
    setPassword("")
    fetchUsers()
  }

  const startEditing = (user: User) => {
    setEditingUser(user)
    setNewEmail(user.email)
    setNewFullName(user.full_name)
  }

  const handleUpdate = async () => {
    if (!editingUser) return

    await fetch("/admin/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingUser.id,
        email: newEmail,
        full_name: newFullName,
      }),
    })

    setEditingUser(null)
    setNewEmail("")
    setNewFullName("")
    fetchUsers()
  }

  const handleDelete = async (id: string) => {
    await fetch("/admin/api/users/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    fetchUsers()
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
          User Management</h1>

      {/* Add User Form */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-64"
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64"
        />
        <Button
          onClick={handleAddUser}
          className="bg-green-500 text-white cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 mr-1 cursor-pointer" /> Add User
        </Button>
      </div>

      {/* Users Table */}
      <p className="mb-4 text-gray-500">
        Total users: <span className="font-semibold">{users.length}</span>
      </p>

      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800">
              <TableHead className="w-16">#</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                className=""
              >
                <TableCell className="font-medium">{index + 1}</TableCell>

                {/* Full Name */}
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Input
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                    />
                  ) : (
                    user.full_name
                  )}
                </TableCell>

                {/* Email */}
                <TableCell>
                  {editingUser?.id === user.id ? (
                    <Input
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  ) : (
                    <span className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      {user.email}
                    </span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right space-x-2">
                  {editingUser?.id === user.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white cursor-pointer"
                      >
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gray-500 text-white cursor-pointer"
                        onClick={() => setEditingUser(null)}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        className="bg-yellow-400 text-white cursor-pointer"
                        onClick={() => startEditing(user)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-red-500 text-white cursor-pointer"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
