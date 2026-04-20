import React from 'react'
import { Bell, AlertTriangle, TrendingUp, Package, Clock } from 'lucide-react'

const AlertsList = () => {
  const alerts = [
    {
      id: 1,
      type: 'stock_low',
      title: 'Stock faible',
      message: 'Clavier USB en dessous du seuil',
      priority: 'high',
      time: 'Il y a 5 min',
      product: 'Clavier USB',
      currentStock: 8,
      threshold: 10
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Recommandation',
      message: 'Commande suggérée',
      priority: 'medium',
      time: 'Il y a 1 heure',
      product: 'Souris sans fil',
      recommendedQuantity: 50
    },
    {
      id: 3,
      type: 'stock_out',
      title: 'Rupture de stock',
      message: 'Moniteur 24" plus en stock',
      priority: 'high',
      time: 'Il y a 2 heures',
      product: 'Moniteur 24"',
      currentStock: 0
    },
    {
      id: 4,
      type: 'forecast',
      title: 'Prévision',
      message: 'Demande élevée prévue',
      priority: 'low',
      time: 'Il y a 3 heures',
      product: 'Webcam HD',
      forecastPeriod: '30 jours'
    }
  ]

  getAlertIcon = (type) => {
    switch (type) {
      case 'stock_low':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'stock_out':
        return <Package className="w-4 h-4 text-red-500" />
      case 'recommendation':
        return <TrendingUp className="w-4 h-4 text-blue-500" />
      case 'forecast':
        return <Clock className="w-4 h-4 text-gray-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  getPriorityColor = (priority) => {
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

  getPriorityBadge = (priority) => {
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

  getPriorityLabel = (priority) => {
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

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Alertes récentes</h3>
          <p className="text-sm text-gray-600">Notifications importantes</p>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Voir tout
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 border-l-4 rounded-lg ${getPriorityColor(alert.priority)} hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
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
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {alert.message}
                  </p>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{alert.product}</span>
                    {alert.currentStock !== undefined && (
                      <span className="ml-2">
                        Stock: {alert.currentStock}
                        {alert.threshold && ` / Seuil: ${alert.threshold}`}
                      </span>
                    )}
                    {alert.recommendedQuantity && (
                      <span className="ml-2">
                        Qté recommandée: {alert.recommendedQuantity}
                      </span>
                    )}
                    {alert.forecastPeriod && (
                      <span className="ml-2">
                        Période: {alert.forecastPeriod}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {alert.time}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
          Gérer toutes les alertes
        </button>
      </div>
    </div>
  )
}

export default AlertsList
