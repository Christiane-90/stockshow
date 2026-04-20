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
  MapPin,
  Building,
  Star,
  Package
} from 'lucide-react'

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSuppliers, setSelectedSuppliers] = useState([])

  const suppliers = [
    {
      id: 1,
      name: 'TechSupplier',
      email: 'contact@techsupplier.com',
      phone: '+33 1 23 45 67 89',
      address: '123 Rue de la Technologie, 75001 Paris',
      siret: '12345678901234',
      category: 'Électronique',
      rating: 4.5,
      totalOrders: 45,
      lastOrder: '2024-03-10',
      status: 'active',
      products: ['Clavier USB', 'Souris sans fil'],
      averageDeliveryTime: '3-5 jours'
    },
    {
      id: 2,
      name: 'DisplayCorp',
      email: 'info@displaycorp.com',
      phone: '+33 1 98 76 54 32',
      address: '456 Avenue des Écrans, 75002 Paris',
      siret: '23456789012345',
      category: 'Écrans',
      rating: 4.2,
      totalOrders: 23,
      lastOrder: '2024-03-08',
      status: 'active',
      products: ['Moniteur 24"', 'Moniteur 27"'],
      averageDeliveryTime: '5-7 jours'
    },
    {
      id: 3,
      name: 'CamTech',
      email: 'sales@camtech.com',
      phone: '+33 1 11 22 33 44',
      address: '789 Boulevard de la Caméra, 75003 Paris',
      siret: '34567890123456',
      category: 'Accessoires',
      rating: 4.8,
      totalOrders: 67,
      lastOrder: '2024-03-12',
      status: 'active',
      products: ['Webcam HD', 'Microphone USB'],
      averageDeliveryTime: '2-4 jours'
    },
    {
      id: 4,
      name: 'CablePro',
      email: 'contact@cablepro.com',
      phone: '+33 1 55 66 77 88',
      address: '321 Rue des Câbles, 75004 Paris',
      siret: '45678901234567',
      category: 'Câbles',
      rating: 3.9,
      totalOrders: 89,
      lastOrder: '2024-03-05',
      status: 'active',
      products: ['Câble HDMI', 'Câble USB-C'],
      averageDeliveryTime: '1-3 jours'
    },
    {
      id: 5,
      name: 'OfficeSupply',
      email: 'info@officesupply.com',
      phone: '+33 1 99 88 77 66',
      address: '654 Place du Bureau, 75005 Paris',
      siret: '56789012345678',
      category: 'Bureautique',
      rating: 4.0,
      totalOrders: 12,
      lastOrder: '2024-02-28',
      status: 'inactive',
      products: ['Clavier mécanique', 'Tapis de souris'],
      averageDeliveryTime: '4-6 jours'
    }
  ]

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status) => {
    return status === 'active' ? 'Actif' : 'Inactif'
  }

  const getRatingStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  const handleSelectSupplier = (supplierId) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    )
  }

  const handleSelectAll = () => {
    if (selectedSuppliers.length === filteredSuppliers.length) {
      setSelectedSuppliers([])
    } else {
      setSelectedSuppliers(filteredSuppliers.map(s => s.id))
    }
  }

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeSuppliersCount = suppliers.filter(s => s.status === 'active').length
  const averageRating = (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fournisseurs</h1>
          <p className="text-gray-600">Gestion de vos partenaires fournisseurs</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Nouveau fournisseur</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total fournisseurs</p>
              <p className="text-2xl font-bold text-gray-900">{suppliers.length}</p>
            </div>
            <Building className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Fournisseurs actifs</p>
              <p className="text-2xl font-bold text-green-600">{activeSuppliersCount}</p>
            </div>
            <Truck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Note moyenne</p>
              <p className="text-2xl font-bold text-yellow-600">{averageRating}/5</p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total commandes</p>
              <p className="text-2xl font-bold text-blue-600">
                {suppliers.reduce((sum, s) => sum + s.totalOrders, 0)}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select className="input-field">
                <option>Toutes les catégories</option>
                <option>Électronique</option>
                <option>Écrans</option>
                <option>Accessoires</option>
                <option>Câbles</option>
                <option>Bureautique</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select className="input-field">
                <option>Tous les statuts</option>
                <option>Actif</option>
                <option>Inactif</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note minimale</label>
              <select className="input-field">
                <option>Toutes les notes</option>
                <option>4+ étoiles</option>
                <option>3+ étoiles</option>
                <option>2+ étoiles</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Délai livraison</label>
              <select className="input-field">
                <option>Tous les délais</option>
                <option>1-3 jours</option>
                <option>3-5 jours</option>
                <option>5-7 jours</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Suppliers Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.length === filteredSuppliers.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fournisseur
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commandes
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Délai livraison
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
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedSuppliers.includes(supplier.id)}
                      onChange={() => handleSelectSupplier(supplier.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{supplier.name}</p>
                      <p className="text-xs text-gray-500">{supplier.siret}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{supplier.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{supplier.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{supplier.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {getRatingStars(supplier.rating)}
                      </div>
                      <span className="text-xs text-gray-600">({supplier.rating})</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{supplier.totalOrders}</p>
                      <p className="text-xs text-gray-500">
                        Dernière: {new Date(supplier.lastOrder).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{supplier.averageDeliveryTime}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(supplier.status)}`}>
                      {getStatusLabel(supplier.status)}
                    </span>
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

export default Suppliers
