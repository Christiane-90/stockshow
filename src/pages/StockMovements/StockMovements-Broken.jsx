import React, { useState } from 'react'
import { 
  Plus, 
  Minus, 
  AlertTriangle, 
  Search, 
  Filter,
  Calendar,
  Package,
  ArrowUp,
  ArrowDown,
  TrendingUp
} from 'lucide-react'

const StockMovements = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const movements = [
    {
      id: 1,
      type: 'entree',
      product: 'Clavier USB',
      quantity: 50,
      date: '2024-03-15',
      reference: 'CMD-2024-001',
      supplier: 'TechSupplier',
      user: 'Jean Dupont',
      notes: 'Réception commande mensuelle'
    },
    {
      id: 2,
      type: 'sortie',
      product: 'Souris sans fil',
      quantity: 25,
      date: '2024-03-14',
      reference: 'VENTE-2024-042',
      client: 'Client ABC',
      user: 'Marie Martin',
      notes: 'Vente en magasin'
    },
    {
      id: 3,
      type: 'entree',
      product: 'Moniteur 24"',
      quantity: 15,
      date: '2024-03-14',
      reference: 'CMD-2024-002',
      supplier: 'DisplayCorp',
      user: 'Jean Dupont',
      notes: 'Commande urgente'
    },
    {
      id: 4,
      type: 'perte',
      product: 'Câble HDMI',
      quantity: 5,
      date: '2024-03-13',
      reference: 'PERTE-2024-001',
      reason: 'Produits endommagés',
      user: 'Marie Martin',
      notes: 'Retour client'
    },
    {
      id: 5,
      type: 'sortie',
      product: 'Webcam HD',
      quantity: 30,
      date: '2024-03-13',
      reference: 'VENTE-2024-043',
      client: 'Client XYZ',
      user: 'Jean Dupont',
      notes: 'Commande en ligne'
    }
  ]

  const monthlyStats = [
    { month: 'Oct', entrees: 4000, sorties: 2400, pertes: 50 },
    { month: 'Nov', entrees: 3000, sorties: 1398, pertes: 30 },
    { month: 'Dec', entrees: 2000, sorties: 9800, pertes: 80 },
    { month: 'Jan', entrees: 2780, sorties: 3908, pertes: 45 },
    { month: 'Fev', entrees: 1890, sorties: 4800, pertes: 60 },
    { month: 'Mar', entrees: 2390, sorties: 3800, pertes: 35 }
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case 'entree':
        return <ArrowUp className="w-5 h-5 text-green-600" />
      case 'sortie':
        return <ArrowDown className="w-5 h-5 text-purple-600" />
      case 'perte':
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'entree':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'sortie':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'perte':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'entree':
        return 'Entrée'
      case 'sortie':
        return 'Sortie'
      case 'perte':
        return 'Perte'
      default:
        return 'Inconnu'
    }
  }

  const filteredMovements = movements.filter(movement =>
    movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.reference.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalEntrees = movements.filter(m => m.type === 'entree').reduce((sum, m) => sum + m.quantity, 0)
  const totalSorties = movements.filter(m => m.type === 'sortie').reduce((sum, m) => sum + m.quantity, 0)
  const totalPertes = movements.filter(m => m.type === 'perte').reduce((sum, m) => sum + m.quantity, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mouvements de Stock</h1>
          <p className="text-gray-600">Suivi des entrées, sorties et pertes</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-success flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Entrée de stock</span>
          </button>
          <button className="btn-danger flex items-center space-x-2">
            <Minus className="w-5 h-5" />
            <span>Sortie de stock</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('entrees')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'entrees'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Entrées
          </button>
          <button
            onClick={() => setActiveTab('sorties')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sorties'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sorties
          </button>
          <button
            onClick={() => setActiveTab('pertes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pertes'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Pertes
          </button>
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total entrées</p>
              <p className="text-2xl font-bold text-green-600">{totalEntrees}</p>
              <p className="text-xs text-gray-500 mt-1">Ce mois</p>
            </div>
            <ArrowUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="stat-card border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total sorties</p>
              <p className="text-2xl font-bold text-purple-600">{totalSorties}</p>
              <p className="text-xs text-gray-500 mt-1">Ce mois</p>
            </div>
            <ArrowDown className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="stat-card border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total pertes</p>
              <p className="text-2xl font-bold text-red-600">{totalPertes}</p>
              <p className="text-xs text-gray-500 mt-1">Ce mois</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Enregistrer une entrée</h3>
            <Plus className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">Ajouter des produits au stock</p>
          <button className="w-full btn-success">Nouvelle entrée</button>
        </div>
        <div className="card p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Enregistrer une sortie</h3>
            <Minus className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mb-4">Retirer des produits du stock</p>
          <button className="w-full btn-danger">Nouvelle sortie</button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un mouvement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary flex items-center space-x-2"
        >
          <Filter className="w-5 h-5" />
          <span>Filtres</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Période</span>
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="input-field">
                <option>Tous les types</option>
                <option>Entrée</option>
                <option>Sortie</option>
                <option>Perte</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date début</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date fin</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Utilisateur</label>
              <select className="input-field">
                <option>Tous les utilisateurs</option>
                <option>Jean Dupont</option>
                <option>Marie Martin</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Movements Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partenaire
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(movement.type)}
                      <span className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(movement.type)}`}>
                        {getTypeLabel(movement.type)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{movement.product}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">{movement.quantity}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(movement.date).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-gray-500">{movement.reference}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">
                      {movement.supplier || movement.client || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{movement.user}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{movement.notes}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default StockMovements
