import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const RoleBasedAccess = ({ children, requiredRole, fallback = null }) => {
  const { user } = useAuth()

  if (!user) return fallback

  // Mapping des rôles avec hiérarchie
  const roleHierarchy = {
    'administrateur': 3,
    'gestionnaire_stock': 2,
    'gerant': 1
  }

  const userLevel = roleHierarchy[user.role] || 0
  const requiredLevel = roleHierarchy[requiredRole] || 0

  if (userLevel >= requiredLevel) {
    return children
  }

  return fallback || <div className="text-center py-8">
    <p className="text-gray-500">Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
  </div>
}

export default RoleBasedAccess
