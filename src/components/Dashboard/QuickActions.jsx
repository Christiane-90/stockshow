import React from 'react'
import { Plus, Minus, Package, Truck, FileText, AlertTriangle } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    {
      title: 'Entrée de stock',
      description: 'Enregistrer une réception',
      icon: Plus,
      color: 'bg-green-500',
      action: 'entree'
    },
    {
      title: 'Sortie de stock',
      description: 'Enregistrer une sortie',
      icon: Minus,
      color: 'bg-red-500',
      action: 'sortie'
    },
    {
      title: 'Nouveau produit',
      description: 'Ajouter un article',
      icon: Package,
      color: 'bg-blue-500',
      action: 'produit'
    },
    {
      title: 'Nouveau fournisseur',
      description: 'Ajouter un fournisseur',
      icon: Truck,
      color: 'bg-purple-500',
      action: 'fournisseur'
    },
    {
      title: 'Nouvelle commande',
      description: 'Créer une commande',
      icon: FileText,
      color: 'bg-yellow-500',
      action: 'commande'
    },
    {
      title: 'Signaler une perte',
      description: 'Enregistrer une perte',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      action: 'perte'
    }
  ]

  const handleAction = (actionType) => {
    console.log(`Action: ${actionType}`)
    // Ici vous pouvez rediriger vers la page appropriée ou ouvrir une modal
  }

  return (
    <div className="card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
        <p className="text-sm text-gray-600">Accès rapide aux fonctionnalités</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              onClick={() => handleAction(action.action)}
              className="p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                {action.title}
              </h4>
              <p className="text-xs text-gray-500">
                {action.description}
              </p>
            </button>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200">
          Voir toutes les actions
        </button>
      </div>
    </div>
  )
}

export default QuickActions
