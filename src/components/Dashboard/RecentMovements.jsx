import React from 'react'
import { ArrowUp, ArrowDown, AlertTriangle, Package } from 'lucide-react'

const RecentMovements = () => {
  const movements = [
    {
      id: 1,
      product: 'Clavier USB',
      type: 'entree',
      quantity: 50,
      date: '2024-03-15',
      reference: 'CMD-2024-001',
      status: 'completed'
    },
    {
      id: 2,
      product: 'Souris sans fil',
      type: 'sortie',
      quantity: 25,
      date: '2024-03-14',
      reference: 'VENTE-2024-042',
      status: 'completed'
    },
    {
      id: 3,
      product: 'Moniteur 24"',
      type: 'entree',
      quantity: 15,
      date: '2024-03-14',
      reference: 'CMD-2024-002',
      status: 'pending'
    },
    {
      id: 4,
      product: 'Câble HDMI',
      type: 'perte',
      quantity: 5,
      date: '2024-03-13',
      reference: 'PERTE-2024-001',
      status: 'completed'
    },
    {
      id: 5,
      product: 'Webcam HD',
      type: 'sortie',
      quantity: 30,
      date: '2024-03-13',
      reference: 'VENTE-2024-043',
      status: 'completed'
    }
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case 'entree':
        return <ArrowUp className="w-4 h-4 text-green-600" />
      case 'sortie':
        return <ArrowDown className="w-4 h-4 text-purple-600" />
      case 'perte':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'entree':
        return 'bg-green-50 text-green-700'
      case 'sortie':
        return 'bg-purple-50 text-purple-700'
      case 'perte':
        return 'bg-red-50 text-red-700'
      default:
        return 'bg-gray-50 text-gray-700'
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'entree':
        return 'Entrée'
      case 'sortie':
        return 'Sortie'
      case 'perte':
        return 'Perte'
      default:
        return 'Inconnu'
    }
  }

  const getStatusBadge = (status) => {
    return status === 'completed' 
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mouvements récents</h3>
          <p className="text-sm text-gray-600">Dernières activités de stock</p>
        </div>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Voir tout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantité
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Référence
              </th>
              <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement.id} className="hover:bg-gray-50">
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {movement.product}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    {getTypeIcon(movement.type)}
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getTypeColor(movement.type)}`}>
                      {getTypeLabel(movement.type)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-900">
                    {movement.quantity}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-600">
                    {new Date(movement.date).toLocaleDateString('fr-FR')}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-xs text-gray-500">
                    {movement.reference}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(movement.status)}`}>
                    {movement.status === 'completed' ? 'Terminé' : 'En attente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentMovements
