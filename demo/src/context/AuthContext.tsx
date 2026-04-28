import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { login as loginRequest } from '../services/auth'
import type { LoginRequest, User } from '../types/api'

interface AuthContextValue {
  user: User | null
  login: (payload: LoginRequest) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AUTH_STORAGE_KEY = 'demo-auth-user'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      setUser(JSON.parse(stored) as User)
    }
  }, [])

  const login = async (payload: LoginRequest) => {
    const response = await loginRequest(payload)
    const signedUser = { email: payload.email, token: response.token }
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(signedUser))
    setUser(signedUser)
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
