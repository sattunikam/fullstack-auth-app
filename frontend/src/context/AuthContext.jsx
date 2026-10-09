import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // page ughadla ki: "mi aat aahe ka?" backend la vichar
  useEffect(() => {
    checkLogin()
  }, [])

  async function checkLogin() {
    try {
      const res = await api.get("/verify")
      setUser(res.data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    const res = await api.post("/login", { email, password })
    setUser(res.data.user)
  }

  async function logout() {
    await api.post("/logout")
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