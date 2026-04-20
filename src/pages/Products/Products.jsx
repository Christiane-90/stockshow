import React, { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const products = [
    {
      id: 1,
      name: 'Clavier mécanique',
      reference: 'KB-001',
      category: 'Accessoires',
      supplier: 'TechSupplier',
      currentStock: 25,
      threshold: 10,
      price: 89.99,
      purchasePrice: 45.50,
      status: 'in_stock',
      image: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Souris sans fil',
      reference: 'MS-002',
      category: 'Accessoires',
      supplier: 'TechSupplier',
      currentStock: 45,
      threshold: 20,
      price: 19.99,
      purchasePrice: 10.25,
      status: 'in_stock',
      image: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Moniteur 24"',
      reference: 'MN-003',
      category: 'Écrans',
      supplier: 'DisplayCorp',
      currentStock: 0,
      threshold: 5,
      price: 199.99,
      purchasePrice: 120.00,
      status: 'out_of_stock',
      image: '/api/placeholder/60/60'
    },
    {
      id: 4,
      name: 'Ordinateur portable',
      reference: 'LP-004',
      category: 'Ordinateurs',
      supplier: 'ComputerInc',
      currentStock: 8,
      threshold: 15,
      price: 899.99,
      purchasePrice: 650.00,
      status: 'low_stock',
      image: '/api/placeholder/60/60'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-800'
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'out_of_stock':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_stock':
        return 'En stock'
      case 'low_stock':
        return 'Stock faible'
      case 'out_of_stock':
        return 'Rupture'
      default:
        return 'Inconnu'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock':
        return <Package className="w-4 h-4 text-green-600" />
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'out_of_stock':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reference.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalProducts = products.length
  const inStockProducts = products.filter(p => p.status === 'in_stock').length
  const lowStockProducts = products.filter(p => p.status === 'low_stock').length
  const outOfStockProducts = products.filter(p => p.status === 'out_of_stock').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600">Catalogue des produits et gestion des stocks</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau produit</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total produits</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En stock</p>
              <p className="text-2xl font-bold text-green-600">{inStockProducts}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock faible</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockProducts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rupture</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockProducts}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select className="input-field">
                <option value="">Toutes</option>
                <option value="accessoires">Accessoires</option>
                <option value="ecrans">Écrans</option>
                <option value="ordinateurs">Ordinateurs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select className="input-field">
                <option value="">Tous</option>
                <option value="in_stock">En stock</option>
                <option value="low_stock">Stock faible</option>
                <option value="out_of_stock">Rupture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix min</label>
              <input type="number" className="input-field" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prix max</label>
              <input type="number" className="input-field" placeholder="999" />
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock actuel
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seuil
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.supplier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{product.reference}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{product.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${
                      product.currentStock <= product.threshold ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {product.currentStock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">{product.threshold}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">€{product.price}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(product.status)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                        {getStatusLabel(product.status)}
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

export default Products
