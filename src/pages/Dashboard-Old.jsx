import React from 'react'
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  Bell,
  Truck,
  Eye,
  Plus,
  Minus
} from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre inventaire</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Produits en stock</p>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ventes du mois</p>
              <p className="text-2xl font-bold text-gray-900">€45,678</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+8%</span>
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Movements and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentMovements />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
