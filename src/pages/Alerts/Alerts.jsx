import React, { useState } from 'react'
import { 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  Clock, 
  Search, 
  Filter,
  Check,
  X,
  Eye,
  Settings
} from 'lucide-react'

const Alerts = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedAlerts, setSelectedAlerts] = useState([])

  const alerts = [
    {
      id: 1,
      type: 'stock_low',
      title: 'Stock faible',
      message: 'Clavier USB en dessous du seuil d\'alerte',
      priority: 'high',
      status: 'unread',
      time: 'Il y a 5 min',
      date: '2024-03-15',
      product: 'Clavier USB',
      currentStock: 8,
      threshold: 10,
      recommendation: 'Commander 20 unités',
      user: 'Système'
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Recommandation d\'achat',
      message: 'Commande suggérée pour les 30 prochains jours',
      priority: 'medium',
      status: 'unread',
      time: 'Il y a 1 heure',
      date: '2024-03-15',
      product: 'Souris sans fil',
      recommendedQuantity: 50,
      justification: 'Tendance de vente à la hausse',
      user: 'IA Prévision'
    },
    {
      id: 3,
      type: 'stock_out',
      title: 'Rupture de stock',
      message: 'Moniteur 24" n\'est plus disponible',
      priority: 'high',
      status: 'read',
      time: 'Il y a 2 heures',
      date: '2024-03-14',
      product: 'Moniteur 24"',
      currentStock: 0,
      threshold: 5,
      recommendation: 'Commande urgente requise',
      user: 'Système'
    },
    {
      id: 4,
      type: 'forecast',
      title: 'Prévision de demande',
      message: 'Augmentation de la demande prévue',
      priority: 'low',
      status: 'read',
      time: 'Il y a 3 heures',
      date: '2024-03-14',
      product: 'Webcam HD',
      forecastPeriod: '30 jours',
      predictedDemand: 75,
      user: 'IA Prévision'
    },
    {
      id: 5,
      type: 'price_alert',
      title: 'Alerte prix',
      message: 'Augmentation de prix détectée',
      priority: 'medium',
      status: 'read',
      time: 'Il y a 5 heures',
      date: '2024-03-14',
      product: 'Câble HDMI',
      oldPrice: 8.99,
      newPrice: 9.99,
      supplier: 'CablePro',
      user: 'Système'
    }
  ]

  const getAlertIcon = (type) => {
    switch (type) {
      case 'stock_low':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'stock_out':
        return <Package className="w-5 h-5 text-red-500" />
      case 'recommendation':
        return <TrendingUp className="w-5 h-5 text-blue-500" />
      case 'forecast':
        return <Clock className="w-5 h-5 text-gray-500" />
      case 'price_alert':
        return <TrendingUp className="w-5 h-5 text-yellow-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50'
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50'
      case 'low':
        return 'border-l-green-500 bg-green-50'
      default:
        return 'border-l-gray-500 bg-gray-50'
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high':
        return 'Élevée'
      case 'medium':
        return 'Moyenne'
      case 'low':
        return 'Faible'
      default:
        return 'Normale'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'stock_low':
        return 'Stock faible'
      case 'stock_out':
        return 'Rupture'
      case 'recommendation':
        return 'Recommandation'
      case 'forecast':
        return 'Prévision'
      case 'price_alert':
        return 'Alerte prix'
      default:
        return 'Autre'
    }
  }

  const handleSelectAlert = (alertId) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    )
  }

  const handleSelectAll = () => {
    if (selectedAlerts.length === filteredAlerts.length) {
      setSelectedAlerts([])
    } else {
      setSelectedAlerts(filteredAlerts.map(a => a.id))
    }
  }

  const handleMarkAsRead = (alertId) => {
    console.log(`Mark alert ${alertId} as read`)
  }

  const handleDismissAlert = (alertId) => {
    console.log(`Dismiss alert ${alertId}`)
  }

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.product.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && alert.status === 'unread') ||
                      (activeTab === 'high' && alert.priority === 'high') ||
                      (activeTab === 'medium' && alert.priority === 'medium') ||
                      (activeTab === 'low' && alert.priority === 'low')
    
    return matchesSearch && matchesTab
  })

  const unreadCount = alerts.filter(a => a.status === 'unread').length
  const highPriorityCount = alerts.filter(a => a.priority === 'high').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alertes et Recommandations</h1>
          <p className="text-gray-600">Gestion des notifications et aide à la décision</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Configuration</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total alertes</p>
              <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
            </div>
            <Bell className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Non lues</p>
              <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Priorité élevée</p>
              <p className="text-2xl font-bold text-red-600">{highPriorityCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recommandations</p>
              <p className="text-2xl font-bold text-green-600">
                {alerts.filter(a => a.type === 'recommendation').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
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
            Toutes ({alerts.length})
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'unread'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Non lues ({unreadCount})
          </button>
          <button
            onClick={() => setActiveTab('high')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'high'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Priorité élevée ({highPriorityCount})
          </button>
          <button
            onClick={() => setActiveTab('medium')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'medium'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Priorité moyenne ({alerts.filter(a => a.priority === 'medium').length})
          </button>
          <button
            onClick={() => setActiveTab('low')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'low'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Priorité faible ({alerts.filter(a => a.priority === 'low').length})
          </button>
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une alerte..."
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select className="input-field">
                <option>Tous les types</option>
                <option>Stock faible</option>
                <option>Rupture</option>
                <option>Recommandation</option>
                <option>Prévision</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
              <select className="input-field">
                <option>Toutes les priorités</option>
                <option>Élevée</option>
                <option>Moyenne</option>
                <option>Faible</option>
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

      {/* Bulk Actions */}
      {selectedAlerts.length > 0 && (
        <div className="card p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-800">
              {selectedAlerts.length} alerte(s) sélectionnée(s)
            </span>
            <div className="flex space-x-2">
              <button className="btn-primary text-sm flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Marquer comme lues</span>
              </button>
              <button className="btn-secondary text-sm flex items-center space-x-1">
                <X className="w-4 h-4" />
                <span>Ignorer</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 border-l-4 rounded-lg ${getPriorityColor(alert.priority)} hover:shadow-md transition-shadow cursor-pointer ${
              alert.status === 'unread' ? 'border-l-8' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedAlerts.includes(alert.id)}
                  onChange={() => handleSelectAlert(alert.id)}
                  className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(alert.priority)}`}>
                      {getPriorityLabel(alert.priority)}
                    </span>
                    {alert.status === 'unread' && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {alert.message}
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>
                      <span className="font-medium">Produit:</span> {alert.product}
                    </div>
                    {alert.currentStock !== undefined && (
                      <div>
                        <span className="font-medium">Stock actuel:</span> {alert.currentStock}
                        {alert.threshold && ` / Seuil: ${alert.threshold}`}
                      </div>
                    )}
                    {alert.recommendedQuantity && (
                      <div>
                        <span className="font-medium">Qté recommandée:</span> {alert.recommendedQuantity}
                      </div>
                    )}
                    {alert.justification && (
                      <div>
                        <span className="font-medium">Justification:</span> {alert.justification}
                      </div>
                    )}
                    <div>
                      <span className="font-medium">Source:</span> {alert.user}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-1 text-gray-400 hover:text-blue-600">
                  <Eye className="w-4 h-4" />
                </button>
                {alert.status === 'unread' && (
                  <button 
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="p-1 text-gray-400 hover:text-green-600"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => handleDismissAlert(alert.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
              <span>{alert.time}</span>
              <span>{new Date(alert.date).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Alerts
