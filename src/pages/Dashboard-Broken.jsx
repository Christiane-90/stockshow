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
import StatCard from '../components/Dashboard/StatCard'
import StockChart from '../components/Dashboard/StockChart'
import RecentMovements from '../components/Dashboard/RecentMovements'
import AlertsList from '../components/Dashboard/AlertsList'
import QuickActions from '../components/Dashboard/QuickActions'

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
        <StatCard
          title="Produits en stock"
          value="1,234"
          change="+12%"
          changeType="increase"
          icon={<Package className="w-8 h-8 text-blue-600" />}
        />
        <StatCard
          title="Ventes du mois"
          value="€45,678"
          change="+8%"
          changeType="increase"
          icon={<TrendingUp className="w-8 h-8 text-green-600" />}
        />
        <StatCard
          title="Alertes actives"
          value="23"
          change="-5%"
          changeType="decrease"
          icon={<AlertTriangle className="w-8 h-8 text-red-600" />}
        />
        <StatCard
          title="Commandes en cours"
          value="156"
          change="+2%"
          changeType="increase"
          icon={<ShoppingCart className="w-8 h-8 text-purple-600" />}
        />
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockChart />
        <RecentMovements />
      </div>

      {/* Alerts and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsList />
        <QuickActions />
      </div>
    </div>
  )
}

export default Dashboard
