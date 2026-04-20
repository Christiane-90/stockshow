import React, { useState } from 'react'
import { 
  TrendingUp, 
  Calendar, 
  BarChart3,
  Package,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Eye
} from 'lucide-react'
import RoleBasedAccess from '../../components/Auth/RoleBasedAccess'

const Forecasting = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const forecasts = [
    {
      id: 1,
      produit: 'Produit A',
      categorie: 'Électronique',
      demande_actuelle: 150,
      prevision: 180,
      confiance: 85,
      tendance: 'hausse',
      recommandation: 'augmenter_stock'
    },
    {
      id: 2,
      produit: 'Produit B',
      categorie: 'Mobilier',
      demande_actuelle: 80,
      prevision: 65,
      confiance: 72,
      tendance: 'baisse',
      recommandation: 'reduire_commande'
    },
    {
      id: 3,
      produit: 'Produit C',
      categorie: 'Électronique',
      demande_actuelle: 200,
      prevision: 210,
      confiance: 90,
      tendance: 'stable',
      recommandation: 'maintenir_niveau'
    }
  ]

  const recommendations = [
    {
      id: 1,
      type: 'achat',
      priorite: 'haute',
      produit: 'Produit A',
      quantite: 50,
      raison: 'Prévision de forte demande',
      delai: '2 semaines',
      statut: 'en_attente'
    },
    {
      id: 2,
      type: 'promotion',
      priorite: 'moyenne',
      produit: 'Produit B',
      quantite: 30,
      raison: 'Baisse de demande prévue',
      delai: '1 mois',
      statut: 'en_attente'
    }
  ]

  const getTrendIcon = (tendance) => {
    switch (tendance) {
      case 'hausse':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'baisse':
        return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  const getRecommendationColor = (recommandation) => {
    switch (recommandation) {
      case 'augmenter_stock':
        return 'bg-green-100 text-green-800'
      case 'reduire_commande':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getPriorityColor = (priorite) => {
    switch (priorite) {
      case 'haute':
        return 'bg-red-100 text-red-800'
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-green-100 text-green-800'
    }
  }

  return (
    <RoleBasedAccess requiredRole="gerant">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prévisions et Recommandations</h1>
            <p className="text-gray-600">Analyse prédictive et suggestions d'optimisation</p>
          </div>
          <div className="flex space-x-3">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field w-auto"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prévisions actives</p>
                <p className="text-2xl font-bold text-blue-600">24</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recommandations</p>
                <p className="text-2xl font-bold text-purple-600">18</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Précision moyenne</p>
                <p className="text-2xl font-bold text-green-600">87%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alertes prédictives</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Vue d'ensemble
            </button>
            <button
              onClick={() => setActiveTab('forecasts')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'forecasts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Prévisions détaillées
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recommendations'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recommandations
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prévisions principales</h3>
              <div className="space-y-4">
                {forecasts.slice(0, 3).map((forecast) => (
                  <div key={forecast.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{forecast.produit}</p>
                        <p className="text-sm text-gray-500">{forecast.categorie}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(forecast.tendance)}
                        <span className="text-sm font-medium text-gray-900">
                          {forecast.prevision} unités
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Confiance: {forecast.confiance}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions recommandées</h3>
              <div className="space-y-4">
                {recommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priorite)}`}>
                          {rec.priorite}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {rec.type === 'achat' ? 'Achat' : 'Promotion'}
                        </span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-800">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.raison}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {rec.quantite} unités de {rec.produit}
                      </span>
                      <span className="text-xs text-gray-500">
                        Délai: {rec.delai}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Forecasts Tab */}
        {activeTab === 'forecasts' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Catégorie
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Demande actuelle
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prévision
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confiance
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tendance
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommandation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {forecasts.map((forecast) => (
                    <tr key={forecast.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-gray-900">{forecast.produit}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{forecast.categorie}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{forecast.demande_actuelle}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm font-medium text-gray-900">{forecast.prevision}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{width: `${forecast.confiance}%`}}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{forecast.confiance}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(forecast.tendance)}
                          <span className="text-sm text-gray-600 capitalize">{forecast.tendance}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getRecommendationColor(forecast.recommandation)}`}>
                          {forecast.recommandation.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="card">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priorité
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Raison
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Délai
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recommendations.map((rec) => (
                    <tr key={rec.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {rec.type === 'achat' ? (
                            <Package className="w-4 h-4 text-green-600" />
                          ) : (
                            <DollarSign className="w-4 h-4 text-blue-600" />
                          )}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {rec.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rec.priorite)}`}>
                          {rec.priorite}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{rec.produit}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-900">{rec.quantite}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{rec.raison}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600">{rec.delai}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="btn-primary text-sm">
                            Valider
                          </button>
                          <button className="btn-secondary text-sm">
                            Ignorer
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
      </div>
    </RoleBasedAccess>
  )
}

export default Forecasting
