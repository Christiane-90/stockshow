import React, { useState } from 'react'
import { 
  Users, 
  Settings, 
  Shield, 
  Building, 
  Plus,
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react'
import RoleBasedAccess from '../../components/Auth/RoleBasedAccess'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState([
    {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      role: 'gerant',
      statut: 'actif',
      date_creation: '2024-01-15'
    },
    {
      id: 2,
      nom: 'Marie Martin',
      email: 'marie.martin@email.com',
      role: 'gestionnaire_stock',
      statut: 'actif',
      date_creation: '2024-02-20'
    },
    {
      id: 3,
      nom: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      role: 'gerant',
      statut: 'en_attente',
      date_creation: '2024-03-10'
    }
  ])

  const [entrepriseSettings, setEntrepriseSettings] = useState({
    nom: 'Ma PME',
    email: 'contact@mapme.com',
    telephone: '+33 1 23 45 67 89',
    siret: '12345678901234',
    seuil_alerte_stock_faible: 10,
    seuil_alerte_stock_critique: 5
  })

  const roles = [
    { value: 'administrateur', label: 'Administrateur' },
    { value: 'gestionnaire_stock', label: 'Gestionnaire de stock' },
    { value: 'gerant', label: 'Gérant' }
  ]

  const handleValidateUser = (userId) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, statut: 'actif' } : user
    ))
  }

  const handleRejectUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
  }

  const handleRoleChange = (userId, newRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  return (
    <RoleBasedAccess requiredRole="administrateur">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-600">Gestion des utilisateurs et paramètres système</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Ajouter utilisateur</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Rôles
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Paramètres
            </button>
          </nav>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date d'inscription
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.nom}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="text-sm border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        >
                          {roles.map(role => (
                            <option key={role.value} value={role.value}>
                              {role.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.statut === 'actif' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.statut === 'actif' ? 'Actif' : 'En attente'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">
                          {new Date(user.date_creation).toLocaleDateString('fr-FR')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {user.statut === 'en_attente' && (
                            <>
                              <button
                                onClick={() => handleValidateUser(user.id)}
                                className="p-1 text-green-600 hover:text-green-800"
                                title="Valider"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRejectUser(user.id)}
                                className="p-1 text-red-600 hover:text-red-800"
                                title="Rejeter"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Modifier"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
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
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Gestion des rôles et permissions</h3>
            <div className="space-y-6">
              {roles.map((role) => (
                <div key={role.value} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-md font-medium text-gray-900">{role.label}</h4>
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    {role.value === 'administrateur' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Gestion complète des utilisateurs</li>
                        <li>Gestion des rôles et permissions</li>
                        <li>Paramétrage de l'entreprise</li>
                        <li>Gestion des seuils d'alerte</li>
                        <li>Accès à toutes les fonctionnalités</li>
                      </ul>
                    )}
                    {role.value === 'gestionnaire_stock' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Gestion des produits et catégories</li>
                        <li>Gestion des fournisseurs</li>
                        <li>Enregistrement des ventes</li>
                        <li>Gestion des commandes fournisseurs</li>
                        <li>Enregistrement des mouvements de stock</li>
                        <li>Traitement des alertes</li>
                      </ul>
                    )}
                    {role.value === 'gerant' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Consultation du tableau de bord</li>
                        <li>Consultation des prévisions</li>
                        <li>Consultation des rapports</li>
                        <li>Validation des recommandations d'achat</li>
                        <li>Consultation des alertes (lecture seule)</li>
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Paramètres de l'entreprise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  value={entrepriseSettings.nom}
                  onChange={(e) => setEntrepriseSettings(prev => ({...prev, nom: e.target.value}))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={entrepriseSettings.email}
                  onChange={(e) => setEntrepriseSettings(prev => ({...prev, email: e.target.value}))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={entrepriseSettings.telephone}
                  onChange={(e) => setEntrepriseSettings(prev => ({...prev, telephone: e.target.value}))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SIRET
                </label>
                <input
                  type="text"
                  value={entrepriseSettings.siret}
                  onChange={(e) => setEntrepriseSettings(prev => ({...prev, siret: e.target.value}))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seuil d'alerte stock faible
                </label>
                <input
                  type="number"
                  value={entrepriseSettings.seuil_alerte_stock_faible}
                  onChange={(e) => setEntrepriseSettings(prev => ({...prev, seuil_alerte_stock_faible: parseInt(e.target.value)}))}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seuil d'alerte stock critique
                </label>
                <input
                  type="number"
                  value={entrepriseSettings.seuil_alerte_stock_critique}
                  onChange={(e) => setEntrepriseSettings(prev => ({...prev, seuil_alerte_stock_critique: parseInt(e.target.value)}))}
                  className="input-field"
                />
              </div>
            </div>
            <div className="mt-6">
              <button className="btn-primary">
                <Settings className="w-5 h-5 mr-2" />
                Enregistrer les paramètres
              </button>
            </div>
          </div>
        )}
      </div>
    </RoleBasedAccess>
  )
}

export default Admin
