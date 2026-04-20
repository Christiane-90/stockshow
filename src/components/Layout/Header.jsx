import React from 'react'
import { useSidebar } from '../../contexts/SidebarContext'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Menu, 
  Bell, 
  Search, 
  User, 
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react'

const Header = () => {
  const { toggleSidebar } = useSidebar()
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [showProfile, setShowProfile] = React.useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Stock faible',
      message: 'Le produit "Clavier USB" est en dessous du seuil d\'alerte',
      type: 'warning',
      time: 'Il y a 5 min'
    },
    {
      id: 2,
      title: 'Nouvelle recommandation',
      message: 'Commande suggérée pour "Souris sans fil"',
      type: 'info',
      time: 'Il y a 1 heure'
    },
    {
      id: 3,
      title: 'Mouvement enregistré',
      message: 'Entrée de 50 unités de "Moniteur 24"',
      type: 'success',
      time: 'Il y a 2 heures'
    }
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return '🔴'
      case 'info':
        return '🔵'
      case 'success':
        return '🟢'
      default:
        return '⚪'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden lg:block ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Rechercher un produit, fournisseur..."
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search mobile */}
            <div className="lg:hidden">
              <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100">
                <Search className="w-6 h-6" />
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowProfile(false)
                }}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                      Voir toutes les notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfile(!showProfile)
                  setShowNotifications(false)
                }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.nom || 'Utilisateur'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || 'Gestionnaire'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.nom || 'Utilisateur'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Mon profil</span>
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Paramètres</span>
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
