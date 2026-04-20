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
  DollarSign
} from 'lucide-react'

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])

  const products = [
    {
      id: 1,
      name: 'Clavier USB',
      reference: 'KB-001',
      category: 'Accessoires',
      supplier: 'TechSupplier',
      currentStock: 8,
      threshold: 10,
      price: 29.99,
      purchasePrice: 15.50,
      status: 'low_stock',
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
      name: 'Webcam HD',
      reference: 'WC-004',
      category: 'Accessoires',
      supplier: 'CamTech',
      currentStock: 25,
      threshold: 15,
      price: 49.99,
      purchasePrice: 28.75,
      status: 'in_stock',
      image: '/api/placeholder/60/60'
    },
    {
      id: 5,
      name: 'Câble HDMI',
      reference: 'CB-005',
      category: 'Câbles',
      supplier: 'CablePro',
      currentStock: 150,
      threshold: 50,
      price: 9.99,
      purchasePrice: 3.50,
      status: 'in_stock',
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

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map(p => p.id))
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
          <p className="text-gray-600">Gestion de votre catalogue de produits</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau produit</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total produits</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En stock</p>
              <p className="text-2xl font-bold text-green-600">
                {products.filter(p => p.status === 'in_stock').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stock faible</p>
              <p className="text-2xl font-bold text-yellow-600">
                {products.filter(p => p.status === 'low_stock').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rupture</p>
              <p className="text-2xl font-bold text-red-600">
                {products.filter(p => p.status === 'out_of_stock').length}
              </p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select className="input-field">
                <option>Toutes les catégories</option>
                <option>Accessoires</option>
                <option>Écrans</option>
                <option>Câbles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select className="input-field">
                <option>Tous les statuts</option>
                <option>En stock</option>
                <option>Stock faible</option>
                <option>Rupture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fournisseur</label>
              <select className="input-field">
                <option>Tous les fournisseurs</option>
                <option>TechSupplier</option>
                <option>DisplayCorp</option>
                <option>CamTech</option>
                <option>CablePro</option>
              </select>
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
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fournisseur
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock actuel
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seuil alerte
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix vente
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
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.reference}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{product.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{product.supplier}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">{product.currentStock}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{product.threshold}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{product.price}</span>
                    </div>
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
