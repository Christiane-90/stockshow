import React, { useState } from 'react'
import { 
  FileText, 
  TrendingUp, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Package,
  Truck,
  Users,
  Eye,
  Printer
} from 'lucide-react'

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const reports = [
    {
      id: 1,
      name: 'Rapport mensuel des ventes',
      type: 'sales',
      category: 'Ventes',
      date: '2024-03-15',
      period: 'Mars 2024',
      size: '2.4 MB',
      format: 'PDF',
      status: 'generated',
      generatedBy: 'Jean Dupont'
    },
    {
      id: 2,
      name: 'Analyse des mouvements de stock',
      type: 'inventory',
      category: 'Stock',
      date: '2024-03-14',
      period: 'Février 2024',
      size: '1.8 MB',
      format: 'Excel',
      status: 'generated',
      generatedBy: 'Marie Martin'
    },
    {
      id: 3,
      name: 'Prévisions de demande',
      type: 'forecast',
      category: 'Prévisions',
      date: '2024-03-13',
      period: 'T2 2024',
      size: '3.1 MB',
      format: 'PDF',
      status: 'generating',
      generatedBy: 'Système'
    },
    {
      id: 4,
      name: 'Performance fournisseurs',
      type: 'supplier',
      category: 'Fournisseurs',
      date: '2024-03-12',
      period: 'Mars 2024',
      size: '1.2 MB',
      format: 'PDF',
      status: 'generated',
      generatedBy: 'Jean Dupont'
    },
    {
      id: 5,
      name: 'Rapport des pertes',
      type: 'losses',
      category: 'Stock',
      date: '2024-03-10',
      period: 'Février 2024',
      size: '856 KB',
      format: 'Excel',
      status: 'generated',
      generatedBy: 'Marie Martin'
    }
  ]

  const stats = {
    totalReports: reports.length,
    generatedReports: reports.filter(r => r.status === 'generated').length,
    generatingReports: reports.filter(r => r.status === 'generating').length,
    totalSize: '9.3 MB'
  }

  const getReportIcon = (type) => {
    switch (type) {
      case 'sales':
        return <DollarSign className="w-5 h-5 text-green-600" />
      case 'inventory':
        return <Package className="w-5 h-5 text-blue-600" />
      case 'forecast':
        return <TrendingUp className="w-5 h-5 text-purple-600" />
      case 'supplier':
        return <Truck className="w-5 h-5 text-orange-600" />
      case 'losses':
        return <Activity className="w-5 h-5 text-red-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    return status === 'generated' 
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
  }

  const getStatusLabel = (status) => {
    return status === 'generated' ? 'Généré' : 'En cours'
  }

  const getFormatIcon = (format) => {
    return format === 'PDF' 
      ? '📄'
      : format === 'Excel' 
      ? '📊'
      : '📋'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rapports et Analytiques</h1>
          <p className="text-gray-600">Analyse des données et prévisions</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Nouveau rapport</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total rapports</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalReports}</p>
            </div>
            <FileText className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Générés</p>
              <p className="text-2xl font-bold text-green-600">{stats.generatedReports}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.generatingReports}</p>
            </div>
            <Activity className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Espace utilisé</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalSize}</p>
            </div>
            <PieChart className="w-8 h-8 text-blue-600" />
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
            onClick={() => setActiveTab('sales')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sales'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Ventes
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'inventory'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Stock
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'forecast'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Prévisions
          </button>
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button className="card p-4 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Rapport de ventes</p>
              <p className="text-sm text-gray-500">Mensuel/Annuel</p>
            </div>
          </div>
        </button>
        <button className="card p-4 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">État du stock</p>
              <p className="text-sm text-gray-500">Actuel/Historique</p>
            </div>
          </div>
        </button>
        <button className="card p-4 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Prévisions</p>
              <p className="text-sm text-gray-500">Demande/Tendances</p>
            </div>
          </div>
        </button>
        <button className="card p-4 text-left hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Fournisseurs</p>
              <p className="text-sm text-gray-500">Performance</p>
            </div>
          </div>
        </button>
      </div>

      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Période:</label>
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
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Période personnalisée</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un rapport..."
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select className="input-field">
                <option>Toutes les catégories</option>
                <option>Ventes</option>
                <option>Stock</option>
                <option>Prévisions</option>
                <option>Fournisseurs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select className="input-field">
                <option>Tous les formats</option>
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
              <select className="input-field">
                <option>Tous les statuts</option>
                <option>Généré</option>
                <option>En cours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" className="input-field" />
            </div>
          </div>
        </div>
      )}

      {/* Reports Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rapport
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Période
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de génération
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Taille
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Format
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
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      {getReportIcon(report.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-500">Par {report.generatedBy}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{report.category}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{report.period}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(report.date).toLocaleDateString('fr-FR')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-900">{report.size}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getFormatIcon(report.format)}</span>
                      <span className="text-sm text-gray-900">{report.format}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                      {getStatusLabel(report.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-purple-600">
                        <Printer className="w-4 h-4" />
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
  )
}

export default Reports
