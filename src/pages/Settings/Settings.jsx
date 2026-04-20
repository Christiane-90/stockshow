import React, { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Bell, 
  Shield, 
  Database,
  Save,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit
} from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    stockAlerts: true,
    orderUpdates: true,
    reports: false
  })

  const [companySettings, setCompanySettings] = useState({
    name: 'Ma PME',
    email: 'contact@mapme.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de l\'Entreprise, 75000 Paris',
    siret: '12345678901234',
    currency: 'EUR',
    language: 'fr'
  })

  const [userSettings, setUserSettings] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@mapme.com',
    phone: '+33 6 12 34 56 78',
    role: 'Administrateur'
  })

  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [stockThresholds, setStockThresholds] = useState({
    lowStockThreshold: 10,
    criticalStockThreshold: 5,
    reorderPoint: 15
  })

  const tabs = [
    { id: 'general', label: 'Général', icon: SettingsIcon },
    { id: 'company', label: 'Entreprise', icon: Building },
    { id: 'user', label: 'Utilisateur', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'inventory', label: 'Inventaire', icon: Database }
  ]

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSaveSettings = () => {
    console.log('Settings saved:', {
      companySettings,
      userSettings,
      notifications,
      stockThresholds
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Configuration de la plateforme</p>
        </div>
        <button 
          onClick={handleSaveSettings}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Enregistrer</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Paramètres généraux</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Langue par défaut
                    </label>
                    <select 
                      value={companySettings.language}
                      onChange={(e) => setCompanySettings(prev => ({...prev, language: e.target.value}))}
                      className="input-field"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Devise par défaut
                    </label>
                    <select 
                      value={companySettings.currency}
                      onChange={(e) => setCompanySettings(prev => ({...prev, currency: e.target.value}))}
                      className="input-field"
                    >
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuseau horaire
                  </label>
                  <select className="input-field">
                    <option>Europe/Paris (UTC+1)</option>
                    <option>America/New_York (UTC-5)</option>
                    <option>Asia/Tokyo (UTC+9)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format de date
                  </label>
                  <select className="input-field">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === 'company' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations entreprise</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom de l'entreprise
                    </label>
                    <input
                      type="text"
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings(prev => ({...prev, name: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings(prev => ({...prev, email: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings(prev => ({...prev, phone: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SIRET
                    </label>
                    <input
                      type="text"
                      value={companySettings.siret}
                      onChange={(e) => setCompanySettings(prev => ({...prev, siret: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse
                  </label>
                  <textarea
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings(prev => ({...prev, address: e.target.value}))}
                    className="input-field"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* User Settings */}
          {activeTab === 'user' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Profil utilisateur</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      value={userSettings.firstName}
                      onChange={(e) => setUserSettings(prev => ({...prev, firstName: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      value={userSettings.lastName}
                      onChange={(e) => setUserSettings(prev => ({...prev, lastName: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => setUserSettings(prev => ({...prev, email: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={userSettings.phone}
                      onChange={(e) => setUserSettings(prev => ({...prev, phone: e.target.value}))}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle
                  </label>
                  <input
                    type="text"
                    value={userSettings.role}
                    disabled
                    className="input-field bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Changer le mot de passe</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe actuel
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordSettings.currentPassword}
                        onChange={(e) => setPasswordSettings(prev => ({...prev, currentPassword: e.target.value}))}
                        className="input-field pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nouveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordSettings.newPassword}
                        onChange={(e) => setPasswordSettings(prev => ({...prev, newPassword: e.target.value}))}
                        className="input-field pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le nouveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordSettings.confirmPassword}
                        onChange={(e) => setPasswordSettings(prev => ({...prev, confirmPassword: e.target.value}))}
                        className="input-field pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Sécurité du compte</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">Authentification à deux facteurs</p>
                      <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire</p>
                    </div>
                    <button className="btn-secondary">Activer</button>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-gray-900">Sessions actives</p>
                      <p className="text-sm text-gray-500">Gérez les appareils connectés</p>
                    </div>
                    <button className="btn-secondary">Voir</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Préférences de notification</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Canaux de notification</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Notifications par email</p>
                        <p className="text-sm text-gray-500">Recevez les alertes par email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={() => handleNotificationChange('email')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Notifications push</p>
                        <p className="text-sm text-gray-500">Recevez les alertes en temps réel</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={() => handleNotificationChange('push')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Types de notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Alertes de stock</p>
                        <p className="text-sm text-gray-500">Stock faible ou rupture</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.stockAlerts}
                        onChange={() => handleNotificationChange('stockAlerts')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Mises à jour des commandes</p>
                        <p className="text-sm text-gray-500">Changements de statut des commandes</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.orderUpdates}
                        onChange={() => handleNotificationChange('orderUpdates')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Rapports générés</p>
                        <p className="text-sm text-gray-500">Nouveaux rapports disponibles</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.reports}
                        onChange={() => handleNotificationChange('reports')}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Inventory Settings */}
          {activeTab === 'inventory' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Paramètres d'inventaire</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Seuils d'alerte</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seuil de stock faible
                      </label>
                      <input
                        type="number"
                        value={stockThresholds.lowStockThreshold}
                        onChange={(e) => setStockThresholds(prev => ({...prev, lowStockThreshold: parseInt(e.target.value)}))}
                        className="input-field"
                      />
                      <p className="text-xs text-gray-500 mt-1">Alerte quand le stock est inférieur à cette valeur</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seuil de stock critique
                      </label>
                      <input
                        type="number"
                        value={stockThresholds.criticalStockThreshold}
                        onChange={(e) => setStockThresholds(prev => ({...prev, criticalStockThreshold: parseInt(e.target.value)}))}
                        className="input-field"
                      />
                      <p className="text-xs text-gray-500 mt-1">Alerte urgente quand le stock est inférieur à cette valeur</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Point de réapprovisionnement
                      </label>
                      <input
                        type="number"
                        value={stockThresholds.reorderPoint}
                        onChange={(e) => setStockThresholds(prev => ({...prev, reorderPoint: parseInt(e.target.value)}))}
                        className="input-field"
                      />
                      <p className="text-xs text-gray-500 mt-1">Suggérer une commande quand le stock atteint cette valeur</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-4">Préférences de suivi</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Suivi automatique des mouvements</p>
                        <p className="text-sm text-gray-500">Enregistrer automatiquement les changements de stock</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                    <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div>
                        <p className="font-medium text-gray-900">Prévisions intelligentes</p>
                        <p className="text-sm text-gray-500">Utiliser l'IA pour prédire la demande</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={true}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
