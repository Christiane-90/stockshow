import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulation d'appel API avec détection de rôle par email
      let role = 'gerant' // Par défaut
      
      if (email.includes('admin')) {
        role = 'administrateur'
      } else if (email.includes('stock') || email.includes('gestion')) {
        role = 'gestionnaire_stock'
      }
      
      const mockUser = {
        id: 1,
        nom: role === 'administrateur' ? 'Administrateur' : role === 'gestionnaire_stock' ? 'Gestionnaire Stock' : 'Gérant',
        email: email,
        role: role,
        derniere_connexion: new Date().toISOString()
      }
      
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Identifiants incorrects' }
    }
  }

  const register = async (userData) => {
    try {
      // Simulation d'appel API
      const newUser = {
        id: Date.now(),
        ...userData,
        role: 'utilisateur',
        date_creation: new Date().toISOString()
      }
      
      setUser(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
