import React, { useState } from 'react'
import { 
  Folder, 
  FolderPlus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Package,
  Tag,
  Save,
  X,
  Eye
} from 'lucide-react'
import RoleBasedAccess from '../../components/Auth/RoleBasedAccess'

const Categories = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)

  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    couleur: '#3B82F6',
    icone: 'Package',
    parent_id: '',
    statut: 'active'
  })

  const [categories, setCategories] = useState([
    {
      id: 1,
      nom: 'Électronique',
      description: 'Produits électroniques et gadgets',
      couleur: '#3B82F6',
      icone: 'Package',
      parent_id: null,
      statut: 'active',
      nombre_produits: 45,
      created_at: '2024-01-15',
      updated_at: '2024-03-10'
    },
    {
      id: 2,
      nom: 'Mobilier',
      description: 'Meubles et articles de maison',
      couleur: '#10B981',
      icone: 'Home',
      parent_id: null,
      statut: 'active',
      nombre_produits: 28,
      created_at: '2024-01-20',
      updated_at: '2024-03-08'
    },
    {
      id: 3,
      nom: 'Vêtements',
      description: 'Habits et accessoires',
      couleur: '#8B5CF6',
      icone: 'ShoppingBag',
      parent_id: null,
      statut: 'active',
      nombre_produits: 67,
      created_at: '2024-02-01',
      updated_at: '2024-03-12'
    },
    {
      id: 4,
      nom: 'Téléphones',
      description: 'Smartphones et accessoires',
      couleur: '#EF4444',
      icone: 'Phone',
      parent_id: 1,
      statut: 'active',
      nombre_produits: 23,
      created_at: '2024-02-15',
      updated_at: '2024-03-05'
    },
    {
      id: 5,
      nom: 'Ordinateurs',
      description: 'PC portables et de bureau',
      couleur: '#059669',
      icone: 'Laptop',
      parent_id: 1,
      statut: 'active',
      nombre_produits: 22,
      created_at: '2024-02-20',
      updated_at: '2024-03-01'
    }
  ])

  const iconesDisponibles = [
    { value: 'Package', label: 'Colis', icon: '📦' },
    { value: 'Home', label: 'Maison', icon: '🏠' },
    { value: 'ShoppingBag', label: 'Sac', icon: '🛍' },
    { value: 'Phone', label: 'Téléphone', icon: '📱' },
    { value: 'Laptop', label: 'Ordinateur', icon: '💻' },
    { value: 'Car', label: 'Voiture', icon: '🚗' },
    { value: 'Book', label: 'Livre', icon: '📚' },
    { value: 'Heart', label: 'Cœur', icon: '❤️' },
    { value: 'Star', label: 'Étoile', icon: '⭐' },
    { value: 'Coffee', label: 'Café', icon: '☕' }
  ]

  const couleursDisponibles = [
    { value: '#3B82F6', label: 'Bleu' },
    { value: '#10B981', label: 'Vert' },
    { value: '#8B5CF6', label: 'Violet' },
    { value: '#EF4444', label: 'Rouge' },
    { value: '#059669', label: 'Émeraude' },
    { value: '#F59E0B', label: 'Jaune' },
    { value: '#6B7280', label: 'Gris' },
    { value: '#EC4899', label: 'Rose' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const nouvelleCategorie = {
      id: editingCategory ? editingCategory.id : categories.length + 1,
      ...formData,
      nombre_produits: editingCategory ? editingCategory.nombre_produits : 0,
      created_at: editingCategory ? editingCategory.created_at : new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    }

    if (editingCategory) {
      setCategories(prev => prev.map(cat => 
        cat.id === editingCategory.id ? { ...nouvelleCategorie, id: editingCategory.id } : cat
      ))
      setEditingCategory(null)
    } else {
      setCategories(prev => [nouvelleCategorie, ...prev])
    }

    setShowForm(false)
    setFormData({
      nom: '',
      description: '',
      couleur: '#3B82F6',
      icone: 'Package',
      parent_id: '',
      statut: 'active'
    })
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      nom: category.nom,
      description: category.description,
      couleur: category.couleur,
      icone: category.icone,
      parent_id: category.parent_id || '',
      statut: category.statut
    })
    setShowForm(true)
  }

  const handleDelete = (categoryId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
    }
  }

  const getIconeDisplay = (icone) => {
    const iconeObj = iconesDisponibles.find(i => i.value === icone)
    return iconeObj ? iconeObj.icon : '📦'
  }

  const getCouleurDisplay = (couleur) => {
    return couleur || '#3B82F6'
  }

  const getParentName = (parentId) => {
    if (!parentId) return 'Aucune'
    const parent = categories.find(cat => cat.id == parentId)
    return parent ? parent.nom : 'Aucune'
  }

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const filteredCategories = categories.filter(category =>
    category.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCategories = categories.length
  const activeCategories = categories.filter(cat => cat.statut === 'active').length
  const totalProducts = categories.reduce((sum, cat) => sum + cat.nombre_produits, 0)

  return (
    <RoleBasedAccess requiredRole="gestionnaire_stock">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h1>
            <p className="text-gray-600">Organisation des produits par catégories</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <FolderPlus className="w-5 h-5" />
            <span>Nouvelle catégorie</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total catégories</p>
                <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
              </div>
              <Folder className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actives</p>
                <p className="text-2xl font-bold text-green-600">{activeCategories}</p>
              </div>
              <Tag className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total produits</p>
                <p className="text-2xl font-bold text-purple-600">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sous-catégories</p>
                <p className="text-2xl font-bold text-orange-600">
                  {categories.filter(cat => cat.parent_id !== null).length}
                </p>
              </div>
              <Folder className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select className="input-field">
                  <option value="">Tous les statuts</option>
                  <option value="active">Actives</option>
                  <option value="inactive">Inactives</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent</label>
                <select className="input-field">
                  <option value="">Toutes les catégories</option>
                  <option value="">Catégories principales</option>
                  <option value="">Sous-catégories</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de produits</label>
                <select className="input-field">
                  <option value="">Toutes</option>
                  <option value="avec-produits">Avec produits</option>
                  <option value="sans-produits">Sans produits</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingCategory ? 'Modifier catégorie' : 'Nouvelle catégorie'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingCategory(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de la catégorie *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Ex: Électronique"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie parente
                    </label>
                    <select
                      name="parent_id"
                      value={formData.parent_id}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Aucune (catégorie principale)</option>
                      {categories.filter(cat => cat.parent_id === null).map(parent => (
                        <option key={parent.id} value={parent.id}>
                          {parent.nom}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icône
                    </label>
                    <select
                      name="icone"
                      value={formData.icone}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      {iconesDisponibles.map(icone => (
                        <option key={icone.value} value={icone.value}>
                          {icone.icon} {icone.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Couleur
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        name="couleur"
                        value={formData.couleur}
                        onChange={handleInputChange}
                        className="h-10 w-20 border border-gray-300 rounded-md"
                      />
                      <select
                        value={formData.couleur}
                        onChange={(e) => setFormData(prev => ({...prev, couleur: e.target.value}))}
                        className="input-field flex-1"
                      >
                        {couleursDisponibles.map(couleur => (
                          <option key={couleur.value} value={couleur.value}>
                            {couleur.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="input-field"
                    rows={3}
                    placeholder="Description de la catégorie..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingCategory(null)
                    }}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>{editingCategory ? 'Mettre à jour' : 'Créer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                      style={{ backgroundColor: getCouleurDisplay(category.couleur) }}
                    >
                      {getIconeDisplay(category.icone)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.nom}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatutColor(category.statut)}`}>
                        {category.statut === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Parent:</span>
                    <span className="font-medium text-gray-900">
                      {getParentName(category.parent_id)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Produits:</span>
                    <span className="font-medium text-gray-900">
                      {category.nombre_produits} articles
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Créée le:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(category.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleBasedAccess>
  )
}

export default Categories
