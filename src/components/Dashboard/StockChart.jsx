import React from 'react'

const StockChart = () => {
  const data = [
    { month: 'Oct', entrees: 4000, sorties: 2400, stock: 12000 },
    { month: 'Nov', entrees: 3000, sorties: 1398, stock: 13602 },
    { month: 'Dec', entrees: 2000, sorties: 9800, stock: 5802 },
    { month: 'Jan', entrees: 2780, sorties: 3908, stock: 4674 },
    { month: 'Fev', entrees: 1890, sorties: 4800, stock: 1764 },
    { month: 'Mar', entrees: 2390, sorties: 3800, stock: 354 }
  ]

  const maxEntrees = Math.max(...data.map(d => d.entrees))
  const maxSorties = Math.max(...data.map(d => d.sorties))

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Évolution des mouvements</h3>
          <p className="text-sm text-gray-600">Entrées et sorties sur 6 mois</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">
            6 mois
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            1 an
          </button>
        </div>
      </div>
      
      {/* Graphique en barres simplifié */}
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between px-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="w-full flex items-end justify-center space-x-1">
                {/* Barre entrées */}
                <div
                  className="w-8 bg-green-500 rounded-t"
                  style={{
                    height: `${(item.entrees / maxEntrees) * 100}%`,
                    minHeight: '4px'
                  }}
                  title={`Entrées: ${item.entrees}`}
                />
                {/* Barre sorties */}
                <div
                  className="w-8 bg-red-500 rounded-t"
                  style={{
                    height: `${(item.sorties / maxSorties) * 100}%`,
                    minHeight: '4px'
                  }}
                  title={`Sorties: ${item.sorties}`}
                />
              </div>
              <span className="text-xs text-gray-600 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Légende */}
      <div className="flex items-center justify-center space-x-6 text-sm mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Entrées</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Sorties</span>
        </div>
      </div>
    </div>
  )
}

export default StockChart
