import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate("/login")
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <h1 className="text-xl font-bold text-white">🔐 AuthApp</h1>

      <div className="flex items-center gap-4">
        <span className="text-slate-200 text-sm">Hi, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar