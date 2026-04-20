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
  Truck,
  ShoppingCart,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

const StockMovements = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const movements = [
    {
      id: 1,
      type: 'entree',
      reference: 'ENT-001',
      date: '2024-03-15',
      product: 'Clavier mécanique',
      productRef: 'KB-001',
      quantity: 25,
      supplier: 'TechSupplier',
      reason: 'Nouvelle livraison',
      operator: 'Jean Dupont',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'sortie',
      reference: 'VTE-001',
      date: '2024-03-15',
      product: 'Souris sans fil',
      productRef: 'MS-002',
      quantity: 10,
      client: 'Client Alpha',
      reason: 'Vente',
      operator: 'Marie Martin',
      status: 'confirmed'
    },
    {
      id: 3,
      type: 'entree',
      reference: 'ENT-002',
      date: '2024-03-14',
      product: 'Moniteur 24"',
      productRef: 'MN-003',
      quantity: 15,
      supplier: 'DisplayCorp',
      reason: 'Retour fournisseur',
      operator: 'Pierre Durand',
      status: 'confirmed'
    },
    {
      id: 4,
      type: 'sortie',
      reference: 'VTE-002',
      date: '2024-03-14',
      product: 'Ordinateur portable',
      productRef: 'LP-004',
      quantity: 2,
      client: 'Client Beta',
      reason: 'Vente en ligne',
      operator: 'Sophie Lemoine',
      status: 'confirmed'
    },
    {
      id: 5,
      type: 'perte',
      reference: 'PER-001',
      date: '2024-03-13',
      product: 'Cable USB',
      productRef: 'USB-005',
      quantity: 5,
      reason: 'Détérioration',
      operator: 'Jean Dupont',
      status: 'confirmed'
    }
  ]

  const getMovementIcon = (type) => {
    switch (type) {
      case 'entree':
        return <Package className="w-5 h-5 text-green-600" />
      case 'sortie':
        return <ShoppingCart className="w-5 h-5 text-red-600" />
      case 'perte':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getMovementLabel = (type) => {
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

  const getMovementColor = (type) => {
    switch (type) {
      case 'entree':
        return 'bg-green-100 text-green-800'
      case 'sortie':
        return 'bg-red-100 text-red-800'
      case 'perte':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredMovements = movements.filter(movement =>
    movement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.productRef.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalMovements = movements.length
  const entrees = movements.filter(m => m.type === 'entree').length
  const sorties = movements.filter(m => m.type === 'sortie').length
  const pertes = movements.filter(m => m.type === 'perte').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mouvements de Stock</h1>
          <p className="text-gray-600">Historique des entrées et sorties</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
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
              <p className="text-sm font-medium text-gray-600">Total mouvements</p>
              <p className="text-2xl font-bold text-gray-900">{totalMovements}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Entrées</p>
              <p className="text-2xl font-bold text-green-600">{entrees}</p>
            </div>
            <ArrowUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sorties</p>
              <p className="text-2xl font-bold text-red-600">{sorties}</p>
            </div>
            <ArrowDown className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pertes</p>
              <p className="text-2xl font-bold text-orange-600">{pertes}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
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
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="input-field">
                <option value="">Tous</option>
                <option value="entree">Entrées</option>
                <option value="sortie">Sorties</option>
                <option value="perte">Pertes</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Opérateur</label>
              <select className="input-field">
                <option value="">Tous</option>
                <option value="jean">Jean Dupont</option>
                <option value="marie">Marie Martin</option>
                <option value="pierre">Pierre Durand</option>
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
                  Référence
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source/Destination
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Motif
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opérateur
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMovements.map((movement) => (
                <tr key={movement.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">{movement.reference}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getMovementIcon(movement.type)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getMovementColor(movement.type)}`}>
                        {getMovementLabel(movement.type)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(movement.date).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{movement.product}</p>
                      <p className="text-sm text-gray-500">{movement.productRef}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">{movement.quantity}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {movement.supplier || movement.client || '-'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{movement.reason}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{movement.operator}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
