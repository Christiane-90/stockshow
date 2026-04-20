import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '../../contexts/SidebarContext'
import { 
  LayoutDashboard, 
  Package, 
  ArrowUpDown, 
  Bell, 
  Truck, 
  ShoppingCart, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  Users,
  AlertTriangle as LossIcon,
  Folder
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar()
  const { user, logout } = useAuth()
  const location = useLocation()

  const getMenuItemsByRole = (role) => {
  const baseItems = [
    {
      path: '/',
      icon: LayoutDashboard,
      label: 'Tableau de bord',
      description: 'Vue d\'ensemble'
    }
  ]

  switch (role) {
    case 'administrateur':
      return [
        ...baseItems,
        {
          path: '/admin',
          icon: Users,
          label: 'Administration',
          description: 'Gestion des utilisateurs'
        },
        {
          path: '/produits',
          icon: Package,
          label: 'Produits',
          description: 'Gestion des produits'
        },
        {
          path: '/mouvements-stock',
          icon: ArrowUpDown,
          label: 'Mouvements de stock',
          description: 'Entrées et sorties'
        },
        {
          path: '/fournisseurs',
          icon: Truck,
          label: 'Fournisseurs',
          description: 'Gestion des fournisseurs'
        },
        {
          path: '/commandes',
          icon: ShoppingCart,
          label: 'Commandes',
          description: 'Gestion des commandes'
        },
        {
          path: '/rapports',
          icon: FileText,
          label: 'Rapports',
          description: 'Analytiques et prévisions'
        },
        {
          path: '/parametres',
          icon: Settings,
          label: 'Paramètres',
          description: 'Configuration'
        }
      ]
    
    case 'gestionnaire_stock':
      return [
        ...baseItems,
        {
          path: '/produits',
          icon: Package,
          label: 'Produits',
          description: 'Gestion des produits'
        },
        {
          path: '/categories',
          icon: Folder,
          label: 'Catégories',
          description: 'Gestion des catégories'
        },
        {
          path: '/mouvements-stock',
          icon: ArrowUpDown,
          label: 'Mouvements de stock',
          description: 'Entrées et sorties'
        },
        {
          path: '/alertes',
          icon: Bell,
          label: 'Alertes',
          description: 'Notifications et recommandations'
        },
        {
          path: '/fournisseurs',
          icon: Truck,
          label: 'Fournisseurs',
          description: 'Gestion des fournisseurs'
        },
        {
          path: '/commandes',
          icon: ShoppingCart,
          label: 'Commandes',
          description: 'Gestion des commandes'
        },
        {
          path: '/pertes',
          icon: LossIcon,
          label: 'Pertes',
          description: 'Enregistrement des pertes'
        }
      ]
    
    case 'gerant':
      return [
        ...baseItems,
        {
          path: '/previsions',
          icon: TrendingUp,
          label: 'Prévisions',
          description: 'Prévisions et recommandations'
        },
        {
          path: '/rapports',
          icon: FileText,
          label: 'Rapports',
          description: 'Consultation des rapports'
        },
        {
          path: '/alertes',
          icon: AlertTriangle,
          label: 'Alertes',
          description: 'Consultation des alertes'
        }
      ]
    
    default:
      return baseItems
  }
}

const menuItems = getMenuItemsByRole(user?.role)

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      {/* Overlay mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 w-64 h-screen bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Stockflow</h1>
                <p className="text-xs text-gray-500">Gestion intelligente</p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar()
                    }
                  }}
                  className={`
                    group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`
                    mr-3 h-5 w-5 flex-shrink-0
                    ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}
                  `} />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.nom || 'Utilisateur'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
