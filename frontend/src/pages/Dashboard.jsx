import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-white">Welcome, {user.name} 👋</h2>
        <p className="text-slate-300 mt-2">You are logged in securely.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Name</p>
            <p className="text-white text-lg font-semibold mt-1">{user.name}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Email</p>
            <p className="text-white text-lg font-semibold mt-1">{user.email}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
            <p className="text-slate-400 text-sm">Status</p>
            <p className="text-green-400 text-lg font-semibold mt-1">Authenticated ✅</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard