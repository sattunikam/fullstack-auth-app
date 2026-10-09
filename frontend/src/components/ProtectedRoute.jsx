import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // 1. backend la vicharay, thamb
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-lg">Loading...</p>
      </div>
    )
  }

  // 2. login nahi tar login page var pathav
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // 3. login aahe tar aat soda
  return children
}

export default ProtectedRoute