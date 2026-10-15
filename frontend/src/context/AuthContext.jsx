import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function checkLogin() {
    try {
      const res = await api.get("/auth/verify")
      setUser(res.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  // page ughadla ki: "mi aat aahe ka?" backend la vichar
  useEffect(() => {
    checkLogin()
  }, [])

  async function login(email, password) {
    const res = await api.post("/auth/login", { email, password })
    setUser(res.data.user)
  }

  async function logout() {
    await api.post("/auth/logout")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}