import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Package, 
  Calendar,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'
import RoleBasedAccess from '../../components/Auth/RoleBasedAccess'

const Losses = () => {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [editingLoss, setEditingLoss] = useState(null)

  const [formData, setFormData] = useState({
    produit_id: '',
    quantite: '',
    motif: '',
    description: '',
    date_perte: new Date().toISOString().split('T')[0],
    responsable: '',
    valeur_unitaire: '',
    categorie_perte: 'deterioration'
  })

  const [losses, setLosses] = useState([
    {
      id: 1,
      produit_nom: 'Produit A',
      reference: 'PROD-001',
      quantite: 15,
      motif: 'deterioration',
      description: 'Produits endommagés lors du transport',
      date_perte: '2024-03-15',
      responsable: 'Jean Dupont',
      valeur_unitaire: 25.50,
      valeur_totale: 382.50,
      statut: 'confirmee',
      categorie_perte: 'deterioration'
    },
    {
      id: 2,
      produit_nom: 'Produit B',
      reference: 'PROD-002',
      quantite: 8,
      motif: 'peremption',
      description: 'Produits périmés non vendus à temps',
      date_perte: '2024-03-14',
      responsable: 'Marie Martin',
      valeur_unitaire: 45.00,
      valeur_totale: 360.00,
      statut: 'confirmee',
      categorie_perte: 'peremption'
    },
    {
      id: 3,
      produit_nom: 'Produit C',
      reference: 'PROD-003',
      quantite: 5,
      motif: 'vol',
      description: 'Perte suspectée lors du stockage',
      date_perte: '2024-03-13',
      responsable: 'Pierre Durand',
      valeur_unitaire: 120.00,
      valeur_totale: 600.00,
      statut: 'en_attente',
      categorie_perte: 'vol'
    }
  ])

  const motifsPerte = [
    { value: 'deterioration', label: 'Détérioration' },
    { value: 'peremption', label: 'Péremption' },
    { value: 'vol', label: 'Vol' },
    { value: 'casse', label: 'Casse' },
    { value: 'erreur_inventaire', label: 'Erreur d\'inventaire' },
    { value: 'autre', label: 'Autre' }
  ]

  const produits = [
    { id: 1, nom: 'Produit A', reference: 'PROD-001', stock_actuel: 150 },
    { id: 2, nom: 'Produit B', reference: 'PROD-002', stock_actuel: 80 },
    { id: 3, nom: 'Produit C', reference: 'PROD-003', stock_actuel: 45 }
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
    
    const produit = produits.find(p => p.id == formData.produit_id)
    const nouvellePerte = {
      id: losses.length + 1,
      produit_nom: produit?.nom || 'Inconnu',
      reference: produit?.reference || 'N/A',
      quantite: parseInt(formData.quantite),
      motif: formData.motif,
      description: formData.description,
      date_perte: formData.date_perte,
      responsable: formData.responsable,
      valeur_unitaire: parseFloat(formData.valeur_unitaire),
      valeur_totale: parseInt(formData.quantite) * parseFloat(formData.valeur_unitaire),
      statut: 'en_attente',
      categorie_perte: formData.categorie_perte
    }

    if (editingLoss) {
      setLosses(prev => prev.map(loss => 
        loss.id === editingLoss.id ? { ...nouvellePerte, id: editingLoss.id } : loss
      ))
      setEditingLoss(null)
    } else {
      setLosses(prev => [nouvellePerte, ...prev])
    }

    setShowForm(false)
    setFormData({
      produit_id: '',
      quantite: '',
      motif: '',
      description: '',
      date_perte: new Date().toISOString().split('T')[0],
      responsable: '',
      valeur_unitaire: '',
      categorie_perte: 'deterioration'
    })
  }

  const handleEdit = (loss) => {
    setEditingLoss(loss)
    setFormData({
      produit_id: loss.produit_nom,
      quantite: loss.quantite.toString(),
      motif: loss.motif,
      description: loss.description,
      date_perte: loss.date_perte,
      responsable: loss.responsable,
      valeur_unitaire: loss.valeur_unitaire.toString(),
      categorie_perte: loss.categorie_perte
    })
    setShowForm(true)
  }

  const handleDelete = (lossId) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette perte ?')) {
      setLosses(prev => prev.filter(loss => loss.id !== lossId))
    }
  }

  const getMotifLabel = (motif) => {
    const motifObj = motifsPerte.find(m => m.value === motif)
    return motifObj ? motifObj.label : motif
  }

  const getMotifColor = (motif) => {
    switch (motif) {
      case 'deterioration':
        return 'bg-orange-100 text-orange-800'
      case 'peremption':
        return 'bg-red-100 text-red-800'
      case 'vol':
        return 'bg-purple-100 text-purple-800'
      case 'casse':
        return 'bg-yellow-100 text-yellow-800'
      case 'erreur_inventaire':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatutColor = (statut) => {
    switch (statut) {
      case 'confirmee':
        return 'bg-green-100 text-green-800'
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredLosses = losses.filter(loss =>
    loss.produit_nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loss.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loss.responsable.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalLosses = losses.reduce((sum, loss) => sum + loss.valeur_totale, 0)

  return (
    <RoleBasedAccess requiredRole="gestionnaire_stock">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestion des Pertes</h1>
            <p className="text-gray-600">Enregistrement et suivi des pertes de stock</p>
          </div>
          <div className="flex space-x-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">Valeur totale des pertes</p>
              <p className="text-xl font-bold text-red-600">€{totalLosses.toFixed(2)}</p>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Enregistrer perte</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total pertes</p>
                <p className="text-2xl font-bold text-gray-900">{losses.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ce mois</p>
                <p className="text-2xl font-bold text-orange-600">
                  {losses.filter(l => new Date(l.date_perte).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {losses.filter(l => l.statut === 'en_attente').length}
                </p>
              </div>
              <Package className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmées</p>
                <p className="text-2xl font-bold text-green-600">
                  {losses.filter(l => l.statut === 'confirmee').length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une perte..."
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Motif</label>
                <select className="input-field">
                  <option value="">Tous les motifs</option>
                  {motifsPerte.map(motif => (
                    <option key={motif.value} value={motif.value}>
                      {motif.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select className="input-field">
                  <option value="">Tous les statuts</option>
                  <option value="en_attente">En attente</option>
                  <option value="confirmee">Confirmée</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Période</label>
                <input type="date" className="input-field" />
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
                  {editingLoss ? 'Modifier perte' : 'Enregistrer une perte'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingLoss(null)
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
                      Produit *
                    </label>
                    <select
                      name="produit_id"
                      value={formData.produit_id}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Sélectionner un produit</option>
                      {produits.map(produit => (
                        <option key={produit.id} value={produit.id}>
                          {produit.nom} ({produit.reference}) - Stock: {produit.stock_actuel}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantité *
                    </label>
                    <input
                      type="number"
                      name="quantite"
                      value={formData.quantite}
                      onChange={handleInputChange}
                      className="input-field"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motif de perte *
                    </label>
                    <select
                      name="motif"
                      value={formData.motif}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Sélectionner un motif</option>
                      {motifsPerte.map(motif => (
                        <option key={motif.value} value={motif.value}>
                          {motif.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Valeur unitaire (€) *
                    </label>
                    <input
                      type="number"
                      name="valeur_unitaire"
                      value={formData.valeur_unitaire}
                      onChange={handleInputChange}
                      className="input-field"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de perte *
                    </label>
                    <input
                      type="date"
                      name="date_perte"
                      value={formData.date_perte}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Responsable *
                    </label>
                    <input
                      type="text"
                      name="responsable"
                      value={formData.responsable}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
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
                    placeholder="Description détaillée de la perte..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingLoss(null)
                    }}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary flex items-center space-x-2">
                    <Save className="w-5 h-5" />
                    <span>{editingLoss ? 'Mettre à jour' : 'Enregistrer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Losses Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantité
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motif
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valeur totale
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Responsable
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
                {filteredLosses.map((loss) => (
                  <tr key={loss.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{loss.produit_nom}</p>
                        <p className="text-sm text-gray-500">{loss.reference}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{loss.quantite}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getMotifColor(loss.motif)}`}>
                        {getMotifLabel(loss.motif)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-red-600">€{loss.valeur_totale.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(loss.date_perte).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">{loss.responsable}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatutColor(loss.statut)}`}>
                        {loss.statut === 'confirmee' ? 'Confirmée' : 'En attente'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(loss)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(loss.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Supprimer"
                        >
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
    </RoleBasedAccess>
  )
}

export default Losses
