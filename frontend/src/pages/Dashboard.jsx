import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"

function Dashboard() {
  const { user } = useAuth()

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Edit states
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  // 1. Read notes
  async function fetchNotes() {
    try {
      const res = await api.get("/notes")
      setNotes(res.data.notes || [])
    } catch (error) {
      console.log("Error fetching notes:", error)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  // 2. Create note
  async function handleAddNote(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert("Title is required")
      return
    }

    try {
      const res = await api.post("/notes", { title, description })
      setNotes([res.data.note, ...notes])
      setTitle("")
      setDescription("")
    } catch (error) {
      console.log("Error creating note:", error)
    }
  }

  // 3. Start edit
  function handleEdit(note) {
    setEditId(note._id)
    setEditTitle(note.title)
    setEditDescription(note.description)
  }

  // 4. Update note
  async function handleUpdate(id) {
    if (!editTitle.trim()) {
      alert("Title is required")
      return
    }

    try {
      const res = await api.put(`/notes/${id}`, {
        title: editTitle,
        description: editDescription,
      })
      setNotes(notes.map((n) => (n._id === id ? res.data.note : n)))
      setEditId(null)
    } catch (error) {
      console.log("Error updating note:", error)
    }
  }

  // 5. Delete note
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await api.delete(`/notes/${id}`)
      setNotes(notes.filter((n) => n._id !== id))
    } catch (error) {
      console.log("Error deleting note:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* User Info Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-3 text-gray-800">User Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
              <p className="text-base font-medium text-gray-800 mt-1">{user?.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
              <p className="text-base font-medium text-gray-800 mt-1">{user?.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="text-xs text-gray-500 uppercase font-semibold">Status</p>
              <p className="text-base font-medium text-green-600 mt-1">Logged In ✅</p>
            </div>
          </div>
        </div>

        {/* Add Note Form (Create) */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Add New Note</h3>
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Description</label>
              <textarea
                placeholder="Enter note description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 p-2.5 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded transition"
            >
              Add Note
            </button>
          </form>
        </div>

        {/* Notes List (Read, Update, Delete) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">My Notes ({notes.length})</h3>

          {notes.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
              No notes yet. Add your first note above!
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
              >
                {editId === note._id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      rows="3"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(note._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1.5 rounded text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{note.title}</h4>
                    <p className="text-gray-600 mt-1 whitespace-pre-wrap">{note.description}</p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => handleEdit(note)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard