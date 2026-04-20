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
  X,
  Eye,
  Search,
  Filter,
  AlertTriangle,
  Save,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const users = [
    {
      id: 1,
      nom: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      role: 'administrateur',
      statut: 'actif',
      derniere_connexion: '2024-03-15',
      created_at: '2024-01-15'
    },
    {
      id: 2,
      nom: 'Marie Martin',
      email: 'marie.martin@email.com',
      role: 'gestionnaire_stock',
      statut: 'actif',
      derniere_connexion: '2024-03-14',
      created_at: '2024-02-01'
    },
    {
      id: 3,
      nom: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      role: 'gerant',
      statut: 'en_attente',
      derniere_connexion: null,
      created_at: '2024-03-10'
    },
    {
      id: 4,
      nom: 'Sophie Lemoine',
      email: 'sophie.lemoine@email.com',
      role: 'gestionnaire_stock',
      statut: 'inactif',
      derniere_connexion: '2024-03-01',
      created_at: '2024-01-20'
    }
  ]

  const companySettings = {
    nom: 'StockShow Pro',
    email: 'contact@stockshow.com',
    telephone: '+33 1 23 45 67 89',
    adresse: '123 Rue de la Gestion, 75001 Paris',
    devise: 'EUR',
    langue: 'fr',
    timezone: 'Europe/Paris',
    seuil_alerte_stock_faible: 10,
    seuil_alerte_stock_critique: 5
  }

  const roles = [
    { value: 'administrateur', label: 'Administrateur', permissions: ['toutes'] },
    { value: 'gestionnaire_stock', label: 'Gestionnaire de stock', permissions: ['produits', 'categories', 'fournisseurs', 'mouvements', 'pertes', 'alertes'] },
    { value: 'gerant', label: 'Gérant', permissions: ['dashboard', 'previsions', 'rapports', 'alertes_lecture'] }
  ]

  const handleValidateUser = (userId) => {
    console.log('Validation utilisateur:', userId)
  }

  const handleRejectUser = (userId) => {
    console.log('Rejet utilisateur:', userId)
  }

  const handleRoleChange = (userId, newRole) => {
    console.log('Changement rôle:', userId, newRole)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'actif':
        return 'bg-green-100 text-green-800'
      case 'inactif':
        return 'bg-red-100 text-red-800'
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'actif':
        return 'Actif'
      case 'inactif':
        return 'Inactif'
      case 'en_attente':
        return 'En attente'
      default:
        return 'Inconnu'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'administrateur':
        return 'bg-purple-100 text-purple-800'
      case 'gestionnaire_stock':
        return 'bg-blue-100 text-blue-800'
      case 'gerant':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter(user =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>Administration</h1>
              <p style={{ color: '#6b7280' }}>Gestion des utilisateurs et paramètres système</p>
            </div>
            <button className="btn-primary">
              <Plus style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>Ajouter utilisateur</span>
            </button>
          </div>

          {/* Tabs */}
          <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>
            <nav style={{ display: 'flex', gap: '2rem', padding: '0 1.5rem' }}>
              <button
                onClick={() => setActiveTab('users')}
                style={{
                  padding: '1rem 0',
                  borderBottom: activeTab === 'users' ? '2px solid #3b82f6' : '2px solid transparent',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: activeTab === 'users' ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Users style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem' }} />
                Utilisateurs
              </button>
              <button
                onClick={() => setActiveTab('roles')}
                style={{
                  padding: '1rem 0',
                  borderBottom: activeTab === 'roles' ? '2px solid #3b82f6' : '2px solid transparent',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: activeTab === 'roles' ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Shield style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem' }} />
                Rôles
              </button>
              <button
                onClick={() => setActiveTab('company')}
                style={{
                  padding: '1rem 0',
                  borderBottom: activeTab === 'company' ? '2px solid #3b82f6' : '2px solid transparent',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: activeTab === 'company' ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <Building style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem' }} />
                Entreprise
              </button>
              <button
                onClick={() => setActiveTab('thresholds')}
                style={{
                  padding: '1rem 0',
                  borderBottom: activeTab === 'thresholds' ? '2px solid #3b82f6' : '2px solid transparent',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: activeTab === 'thresholds' ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <AlertTriangle style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem' }} />
                Seuils d'alerte
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          {activeTab === 'users' && (
            <div>
              {/* Search and Filters */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexDirection: 'column' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
                  <input
                    type="text"
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '2.5rem' }}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary"
                >
                  <Filter style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Filtres</span>
                </button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Rôle</label>
                      <select className="input-field">
                        <option value="">Tous les rôles</option>
                        <option value="administrateur">Administrateur</option>
                        <option value="gestionnaire_stock">Gestionnaire de stock</option>
                        <option value="gerant">Gérant</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Statut</label>
                      <select className="input-field">
                        <option value="">Tous les statuts</option>
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                        <option value="en_attente">En attente</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Date d'inscription</label>
                      <input type="date" className="input-field" />
                    </div>
                  </div>
                </div>
              )}

              {/* Users Table */}
              <div style={{ overflowX: 'auto' }}>
                <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr>
                      <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                        Utilisateur
                      </th>
                      <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                        Rôle
                      </th>
                      <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                        Statut
                      </th>
                      <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                        Dernière connexion
                      </th>
                      <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                          <div>
                            <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{user.nom}</p>
                            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</p>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                          <span style={{ display: 'inline-flex', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', borderRadius: '9999px', ...getRoleStyle(user.role) }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                          <span style={{ display: 'inline-flex', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', borderRadius: '9999px', ...getStatusStyle(user.statut) }}>
                            {getStatusLabel(user.statut)}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', fontSize: '0.875rem', color: '#6b7280' }}>
                          {user.derniere_connexion ? new Date(user.derniere_connexion).toLocaleDateString('fr-FR') : 'Jamais'}
                        </td>
                        <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', fontSize: '0.875rem', fontWeight: '500' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button style={{ color: '#9ca3af', cursor: 'pointer' }}>
                              <Eye style={{ width: '1rem', height: '1rem' }} />
                            </button>
                            <button style={{ color: '#9ca3af', cursor: 'pointer' }}>
                              <Edit style={{ width: '1rem', height: '1rem' }} />
                            </button>
                            {user.statut === 'en_attente' && (
                              <>
                                <button 
                                  onClick={() => handleValidateUser(user.id)}
                                  style={{ color: '#9ca3af', cursor: 'pointer' }}
                                >
                                  <Check style={{ width: '1rem', height: '1rem' }} />
                                </button>
                                <button 
                                  onClick={() => handleRejectUser(user.id)}
                                  style={{ color: '#9ca3af', cursor: 'pointer' }}
                                >
                                  <X style={{ width: '1rem', height: '1rem' }} />
                                </button>
                              </>
                            )}
                            <button style={{ color: '#9ca3af', cursor: 'pointer' }}>
                              <Trash2 style={{ width: '1rem', height: '1rem' }} />
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

          {activeTab === 'roles' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>Gestion des rôles</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {roles.map((role) => (
                  <div key={role.value} style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <h4 style={{ fontWeight: '500', color: '#111827' }}>{role.label}</h4>
                      <button className="btn-secondary">
                        Modifier
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {role.permissions.map((permission) => (
                        <span key={permission} style={{ display: 'inline-flex', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: '500', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '0.25rem' }}>
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>Paramètres de l'entreprise</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Nom de l'entreprise</label>
                  <input type="text" className="input-field" defaultValue={companySettings.nom} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Email</label>
                  <input type="email" className="input-field" defaultValue={companySettings.email} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Téléphone</label>
                  <input type="tel" className="input-field" defaultValue={companySettings.telephone} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Adresse</label>
                  <input type="text" className="input-field" defaultValue={companySettings.adresse} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Devise</label>
                  <select className="input-field" defaultValue={companySettings.devise}>
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - Dollar américain</option>
                    <option value="GBP">GBP - Livre sterling</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Langue</label>
                  <select className="input-field" defaultValue={companySettings.langue}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <button className="btn-primary">
                  <Save style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Sauvegarder</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'thresholds' && (
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1.5rem' }}>Seuils d'alerte</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Seuil d'alerte de stock faible
                  </label>
                  <input 
                    type="number" 
                    className="input-field" 
                    defaultValue={companySettings.seuil_alerte_stock_faible}
                    min="1"
                  />
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Alertez lorsque le stock est inférieur à cette valeur
                  </p>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Seuil d'alerte de stock critique
                  </label>
                  <input 
                    type="number" 
                    className="input-field" 
                    defaultValue={companySettings.seuil_alerte_stock_critique}
                    min="1"
                  />
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Alertez lorsque le stock est critique
                  </p>
                </div>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <button className="btn-primary">
                  <Save style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Sauvegarder</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  function getStatusStyle(status) {
    switch (status) {
      case 'actif':
        return { backgroundColor: '#dcfce7', color: '#166534' }
      case 'inactif':
        return { backgroundColor: '#fee2e2', color: '#991b1b' }
      case 'en_attente':
        return { backgroundColor: '#fef3c7', color: '#92400e' }
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' }
    }
  }

  function getRoleStyle(role) {
    switch (role) {
      case 'administrateur':
        return { backgroundColor: '#f3e8ff', color: '#6b21a8' }
      case 'gestionnaire_stock':
        return { backgroundColor: '#dbeafe', color: '#1e40af' }
      case 'gerant':
        return { backgroundColor: '#dcfce7', color: '#166534' }
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' }
    }
  }
}

export default Admin
