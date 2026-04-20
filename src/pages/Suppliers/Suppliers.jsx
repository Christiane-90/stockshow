import React, { useState } from 'react'
import { 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const suppliers = [
    {
      id: 1,
      name: 'TechSupplier',
      contact: 'Jean Martin',
      email: 'contact@techsupplier.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue de la Tech, 75001 Paris',
      products: 45,
      orders: 12,
      status: 'active'
    },
    {
      id: 2,
      name: 'DisplayCorp',
      contact: 'Marie Dupont',
      email: 'info@displaycorp.com',
      phone: '+33 1 23 45 67 90',
      address: '456 Avenue des Écrans, 69000 Lyon',
      products: 23,
      orders: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'ComputerInc',
      contact: 'Pierre Durand',
      email: 'sales@computerinc.com',
      phone: '+33 1 23 45 67 91',
      address: '789 Boulevard des Ordinateurs, 44000 Nantes',
      products: 67,
      orders: 15,
      status: 'inactive'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'inactive':
        return 'Inactif'
      default:
        return 'Inconnu'
    }
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter(s => s.status === 'active').length
  const inactiveSuppliers = suppliers.filter(s => s.status === 'inactive').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Fournisseurs</h1>
          <p className="text-gray-600">Annuaire des fournisseurs et commandes</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau fournisseur</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total fournisseurs</p>
              <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
            </div>
            <Truck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Actifs</p>
              <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inactifs</p>
              <p className="text-2xl font-bold text-red-600">{inactiveSuppliers}</p>
            </div>
            <Truck className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total produits</p>
              <p className="text-2xl font-bold text-purple-600">
                {suppliers.reduce((sum, s) => sum + s.products, 0)}
              </p>
            </div>
            <Truck className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un fournisseur..."
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select className="input-field">
                <option value="">Tous</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de produits</label>
              <select className="input-field">
                <option value="">Tous</option>
                <option value="1-10">1-10 produits</option>
                <option value="11-50">11-50 produits</option>
                <option value="50+">50+ produits</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commandes</label>
              <select className="input-field">
                <option value="">Toutes</option>
                <option value="recent">Récentes</option>
                <option value="en-attente">En attente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
              <input type="text" className="input-field" placeholder="Paris" />
            </div>
          </div>
        </div>
      )}

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.map((supplier) => (
          <div key={supplier.id} className="card hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(supplier.status)}`}>
                      {getStatusLabel(supplier.status)}
                    </span>
                  </div>
                </div>
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
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{supplier.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{supplier.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{supplier.address}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{supplier.products}</p>
                  <p className="text-sm text-gray-500">Produits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{supplier.orders}</p>
                  <p className="text-sm text-gray-500">Commandes</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suppliers
