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
  Minus,
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  Search,
  Filter
} from 'lucide-react'

const Dashboard = () => {
  const recentMovements = [
    {
      id: 1,
      type: 'entree',
      produit: 'Produit A',
      quantite: 50,
      date: '2024-03-15',
      reference: 'ENT-001',
      fournisseur: 'Fournisseur Alpha'
    },
    {
      id: 2,
      type: 'sortie',
      produit: 'Produit B',
      quantite: 25,
      date: '2024-03-15',
      reference: 'VTE-001',
      client: 'Client Beta'
    },
    {
      id: 3,
      type: 'entree',
      produit: 'Produit C',
      quantite: 100,
      date: '2024-03-14',
      reference: 'ENT-002',
      fournisseur: 'Fournisseur Gamma'
    },
    {
      id: 4,
      type: 'sortie',
      produit: 'Produit D',
      quantite: 30,
      date: '2024-03-14',
      reference: 'VTE-002',
      client: 'Client Delta'
    }
  ]

  const alerts = [
    {
      id: 1,
      type: 'stock_faible',
      produit: 'Produit X',
      quantite_actuelle: 5,
      seuil: 10,
      priorite: 'haute',
      date: '2024-03-15'
    },
    {
      id: 2,
      type: 'peremption',
      produit: 'Produit Y',
      quantite: 15,
      date_expiration: '2024-03-20',
      priorite: 'moyenne',
      date: '2024-03-15'
    },
    {
      id: 3,
      type: 'commande_retard',
      fournisseur: 'Fournisseur Z',
      commande_ref: 'CMD-001',
      retard: 3,
      priorite: 'haute',
      date: '2024-03-14'
    }
  ]

  const chartData = [
    { month: 'Oct', entrees: 4000, sorties: 2400 },
    { month: 'Nov', entrees: 3000, sorties: 1398 },
    { month: 'Dec', entrees: 2000, sorties: 9800 },
    { month: 'Jan', entrees: 2780, sorties: 3908 },
    { month: 'Fev', entrees: 1890, sorties: 4800 },
    { month: 'Mar', entrees: 3200, sorties: 2100 }
  ]

  const maxEntrees = Math.max(...chartData.map(d => d.entrees))
  const maxSorties = Math.max(...chartData.map(d => d.sorties))

  const getMovementIcon = (type) => {
    return type === 'entree' ? 
      <Package className="w-5 h-5 text-green-600" /> : 
      <ShoppingCart className="w-5 h-5 text-red-600" />
  }

  const getMovementType = (type) => {
    return type === 'entree' ? 'Entrée' : 'Sortie'
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'stock_faible':
        return <Package className="w-5 h-5 text-orange-600" />
      case 'peremption':
        return <Calendar className="w-5 h-5 text-yellow-600" />
      case 'commande_retard':
        return <Truck className="w-5 h-5 text-red-600" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />
    }
  }

  const getAlertColor = (priorite) => {
    switch (priorite) {
      case 'haute':
        return 'bg-red-100 text-red-800'
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble de votre inventaire</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Nouveau mouvement</span>
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
              <p className="text-2xl font-bold text-gray-900">45,678</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+8%</span>
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertes actives</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <div className="flex items-center text-red-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+5%</span>
              </div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes en cours</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <div className="flex items-center text-green-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                <span>+2%</span>
              </div>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Évolution des mouvements</h3>
              <p className="text-sm text-gray-600">Entrées et sorties sur 6 mois</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">
                6 mois
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                1 an
              </button>
            </div>
          </div>
          
          {/* Graphique en barres simplifié */}
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between px-2">
              {chartData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full flex items-end justify-center space-x-1">
                    {/* Barre entrées */}
                    <div
                      className="w-8 bg-green-500 rounded-t"
                      style={{
                        height: `${(item.entrees / maxEntrees) * 100}%`,
                        minHeight: '4px'
                      }}
                      title={`Entrées: ${item.entrees}`}
                    />
                    {/* Barre sorties */}
                    <div
                      className="w-8 bg-red-500 rounded-t"
                      style={{
                        height: `${(item.sorties / maxSorties) * 100}%`,
                        minHeight: '4px'
                      }}
                      title={`Sorties: ${item.sorties}`}
                    />
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Légende */}
          <div className="flex items-center justify-center space-x-6 text-sm mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Entrées</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600">Sorties</span>
            </div>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Mouvements récents</h3>
              <p className="text-sm text-gray-600">Dernières transactions</p>
            </div>
            <button className="btn-secondary text-sm">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-3">
            {recentMovements.map((movement) => (
              <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  {getMovementIcon(movement.type)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {getMovementType(movement.type)} - {movement.produit}
                    </p>
                    <p className="text-sm text-gray-500">
                      {movement.reference} - {new Date(movement.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{movement.quantite} unités</p>
                  <p className="text-sm text-gray-500">
                    {movement.fournisseur || movement.client || ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Alertes actives</h3>
              <p className="text-sm text-gray-600">Notifications importantes</p>
            </div>
            <button className="btn-secondary text-sm">
              Voir tout
            </button>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {alert.type === 'stock_faible' && `Stock faible: ${alert.produit}`}
                      {alert.type === 'peremption' && `Péremption: ${alert.produit}`}
                      {alert.type === 'commande_retard' && `Commande en retard: ${alert.commande_ref}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {alert.type === 'stock_faible' && `${alert.quantite_actuelle}/${alert.seuil} unités`}
                      {alert.type === 'peremption' && `Expire le ${new Date(alert.date_expiration).toLocaleDateString('fr-FR')}`}
                      {alert.type === 'commande_retard' && `${alert.retard} jours de retard`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getAlertColor(alert.priorite)}`}>
                    {alert.priorite}
                  </span>
                  <button className="text-gray-400 hover:text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
              <p className="text-sm text-gray-600">Opérations fréquentes</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors">
              <Plus className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-medium text-gray-900">Ajouter stock</p>
              <p className="text-sm text-gray-500">Entrée de marchandise</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors">
              <Minus className="w-6 h-6 text-red-600 mb-2" />
              <p className="font-medium text-gray-900">Retirer stock</p>
              <p className="text-sm text-gray-500">Sortie de marchandise</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors">
              <Package className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-medium text-gray-900">Nouveau produit</p>
              <p className="text-sm text-gray-500">Ajouter un article</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors">
              <Truck className="w-6 h-6 text-purple-600 mb-2" />
              <p className="font-medium text-gray-900">Nouvelle commande</p>
              <p className="text-sm text-gray-500">Commande fournisseur</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors">
              <Users className="w-6 h-6 text-orange-600 mb-2" />
              <p className="font-medium text-gray-900">Nouveau client</p>
              <p className="text-sm text-gray-500">Ajouter un client</p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors">
              <BarChart3 className="w-6 h-6 text-indigo-600 mb-2" />
              <p className="font-medium text-gray-900">Voir rapports</p>
              <p className="text-sm text-gray-500">Analytiques détaillées</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
