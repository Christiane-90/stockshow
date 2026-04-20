import React, { useState } from 'react'
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Truck,
  Package,
  Calendar,
  DollarSign,
  User,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'

const Orders = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState([])

  const orders = [
    {
      id: 1,
      reference: 'CMD-2024-001',
      type: 'supplier',
      supplier: 'TechSupplier',
      date: '2024-03-15',
      expectedDelivery: '2024-03-20',
      status: 'pending',
      totalAmount: 1250.50,
      items: [
        { product: 'Clavier USB', quantity: 50, unitPrice: 15.50 },
        { product: 'Souris sans fil', quantity: 30, unitPrice: 10.25 }
      ],
      notes: 'Commande mensuelle routine'
    },
    {
      id: 2,
      reference: 'VENTE-2024-042',
      type: 'customer',
      customer: 'Client ABC',
      date: '2024-03-14',
      expectedDelivery: '2024-03-16',
      status: 'confirmed',
      totalAmount: 899.75,
      items: [
        { product: 'Moniteur 24"', quantity: 3, unitPrice: 199.99 },
        { product: 'Webcam HD', quantity: 5, unitPrice: 49.99 }
      ],
      notes: 'Commande express'
    },
    {
      id: 3,
      reference: 'CMD-2024-002',
      type: 'supplier',
      supplier: 'DisplayCorp',
      date: '2024-03-14',
      expectedDelivery: '2024-03-21',
      status: 'processing',
      totalAmount: 2400.00,
      items: [
        { product: 'Moniteur 24"', quantity: 10, unitPrice: 120.00 }
      ],
      notes: 'Replenishment stock'
    },
    {
      id: 4,
      reference: 'VENTE-2024-043',
      type: 'customer',
      customer: 'Client XYZ',
      date: '2024-03-13',
      expectedDelivery: '2024-03-15',
      status: 'delivered',
      totalAmount: 1499.70,
      items: [
        { product: 'Webcam HD', quantity: 30, unitPrice: 49.99 }
      ],
      notes: 'Commande en ligne'
    },
    {
      id: 5,
      reference: 'CMD-2024-003',
      type: 'supplier',
      supplier: 'CamTech',
      date: '2024-03-12',
      expectedDelivery: '2024-03-18',
      status: 'cancelled',
      totalAmount: 575.00,
      items: [
        { product: 'Webcam HD', quantity: 20, unitPrice: 28.75 }
      ],
      notes: 'Annulée par fournisseur'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'processing':
        return <Package className="w-4 h-4 text-blue-600" />
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'delivered':
        return <Truck className="w-4 h-4 text-green-600" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <ShoppingCart className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'processing':
        return 'En traitement'
      case 'confirmed':
        return 'Confirmée'
      case 'delivered':
        return 'Livrée'
      case 'cancelled':
        return 'Annulée'
      default:
        return 'Inconnue'
    }
  }

  const getTypeIcon = (type) => {
    return type === 'supplier' 
      ? <Truck className="w-4 h-4 text-blue-600" />
      : <ShoppingCart className="w-4 h-4 text-green-600" />
  }

  const getTypeLabel = (type) => {
    return type === 'supplier' ? 'Fournisseur' : 'Client'
  }

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id))
    }
  }

  const filteredOrders = orders.filter(order =>
    order.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.supplier && order.supplier.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.customer && order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const supplierOrders = orders.filter(o => o.type === 'supplier')
  const customerOrders = orders.filter(o => o.type === 'customer')
  const pendingOrders = orders.filter(o => o.status === 'pending')
  const totalRevenue = customerOrders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Commandes</h1>
          <p className="text-gray-600">Gestion des commandes fournisseurs et clients</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-success flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Commande fournisseur</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Vente client</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total commandes</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Commandes fournisseurs</p>
              <p className="text-2xl font-bold text-blue-600">{supplierOrders.length}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ventes clients</p>
              <p className="text-2xl font-bold text-green-600">{customerOrders.length}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Toutes ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('supplier')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'supplier'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Fournisseurs ({supplierOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('customer')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customer'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Clients ({customerOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            En attente ({pendingOrders.length})
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une commande..."
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
                <option>Fournisseur</option>
                <option>Client</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select className="input-field">
                <option>Tous les statuts</option>
                <option>En attente</option>
                <option>En traitement</option>
                <option>Confirmée</option>
                <option>Livrée</option>
                <option>Annulée</option>
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
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partenaire
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Livraison prévue
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant total
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.reference}</p>
                      <p className="text-xs text-gray-500">{order.items.length} article(s)</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(order.type)}
                      <span className="text-sm text-gray-900">{getTypeLabel(order.type)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">
                      {order.supplier || order.customer}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(order.expectedDelivery).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
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

export default Orders
