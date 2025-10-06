import React, { useState } from 'react';
import {
  Percent,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Gift,
  Tag,
  TrendingUp
} from 'lucide-react';
import { useToast } from '../components/Toast';

const PromoManagement = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const [promos] = useState([
    {
      id: 'PROMO-001',
      code: 'BALI25OFF',
      title: 'Diskon 25% Liburan Bali',
      description: 'Dapatkan diskon hingga 25% untuk semua paket wisata Bali. Berlaku untuk pemesanan hingga akhir Oktober.',
      type: 'percentage',
      value: 25,
      maxDiscount: 500000,
      minSpend: 2000000,
      appliesTo: ['combo', 'destination'],
      validPeriod: {
        startDate: '2025-10-01T00:00:00Z',
        endDate: '2025-10-31T23:59:59Z'
      },
      usage: {
        quota: 1000,
        usedCount: 347,
        userLimit: 1
      },
      status: 'active',
      totalSavings: 87500000,
      totalUsage: 347,
      createdAt: '2025-09-25T00:00:00Z'
    },
    {
      id: 'PROMO-002',
      code: 'FLIGHT50K',
      title: 'Potongan 50K Tiket Pesawat',
      description: 'Hemat Rp 50.000 untuk semua pembelian tiket pesawat domestik. Syarat dan ketentuan berlaku.',
      type: 'fixed',
      value: 50000,
      maxDiscount: 50000,
      minSpend: 500000,
      appliesTo: ['flight'],
      validPeriod: {
        startDate: '2025-10-05T00:00:00Z',
        endDate: '2025-11-15T23:59:59Z'
      },
      usage: {
        quota: 500,
        usedCount: 123,
        userLimit: 2
      },
      status: 'active',
      totalSavings: 6150000,
      totalUsage: 123,
      createdAt: '2025-09-28T00:00:00Z'
    },
    {
      id: 'PROMO-003',
      code: 'EARLYBIRD',
      title: 'Early Bird Booking',
      description: 'Dapatkan diskon 15% untuk pemesanan yang dilakukan 30 hari sebelum tanggal keberangkatan.',
      type: 'percentage',
      value: 15,
      maxDiscount: 300000,
      minSpend: 1000000,
      appliesTo: ['all'],
      validPeriod: {
        startDate: '2025-09-01T00:00:00Z',
        endDate: '2025-12-31T23:59:59Z'
      },
      usage: {
        quota: 2000,
        usedCount: 567,
        userLimit: 1
      },
      status: 'active',
      totalSavings: 42750000,
      totalUsage: 567,
      createdAt: '2025-08-25T00:00:00Z'
    },
    {
      id: 'PROMO-004',
      code: 'WEEKEND20',
      title: 'Weekend Getaway 20%',
      description: 'Promo khusus untuk liburan weekend dengan diskon 20%. Periode terbatas.',
      type: 'percentage',
      value: 20,
      maxDiscount: 400000,
      minSpend: 1500000,
      appliesTo: ['combo'],
      validPeriod: {
        startDate: '2025-09-15T00:00:00Z',
        endDate: '2025-10-15T23:59:59Z'
      },
      usage: {
        quota: 300,
        usedCount: 298,
        userLimit: 1
      },
      status: 'expired',
      totalSavings: 23840000,
      totalUsage: 298,
      createdAt: '2025-09-10T00:00:00Z'
    }
  ]);

  const filteredPromos = promos.filter(promo => {
    const matchesSearch = promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || promo.type === filterType;
    const matchesStatus = filterStatus === 'all' || promo.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type) => {
    switch (type) {
      case 'percentage':
        return 'bg-blue-100 text-blue-800';
      case 'fixed':
        return 'bg-green-100 text-green-800';
      case 'buy_one_get_one':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'inactive':
        return <XCircle className="h-4 w-4" />;
      case 'expired':
        return <Clock className="h-4 w-4" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const getUsagePercentage = (used, total) => {
    return ((used / total) * 100).toFixed(1);
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getRemainingDays = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleAction = (action, promo) => {
    setShowDropdown(null);
    switch (action) {
      case 'view':
        toast.info(`Viewing details for ${promo.code}`);
        break;
      case 'edit':
        toast.info(`Editing promo ${promo.code}`);
        break;
      case 'delete':
        toast.warning(`Are you sure you want to delete ${promo.code}?`);
        break;
      case 'activate':
        toast.success(`Promo ${promo.code} has been activated! ✅`);
        break;
      case 'deactivate':
        toast.warning(`Promo ${promo.code} has been deactivated`);
        break;
      case 'duplicate':
        toast.info(`Creating a copy of ${promo.code}...`);
        break;
      default:
        break;
    }
  };

  const handleCreatePromo = () => {
    toast.info("Opening promo creation form...");
  };

  const getPromoStats = () => {
    const total = promos.length;
    const active = promos.filter(p => p.status === 'active').length;
    const expired = promos.filter(p => p.status === 'expired').length;
    const totalUsage = promos.reduce((sum, p) => sum + p.totalUsage, 0);
    const totalSavings = promos.reduce((sum, p) => sum + p.totalSavings, 0);

    return { total, active, expired, totalUsage, totalSavings };
  };

  const stats = getPromoStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promo Management</h1>
          <p className="text-gray-600 mt-1">
            Create and manage promotional campaigns and discounts
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleCreatePromo}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Promo
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Promos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Tag className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Promos</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usage</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalUsage.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Savings</p>
              <p className="text-lg font-bold text-orange-600">{formatCurrency(stats.totalSavings)}</p>
            </div>
            <Gift className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-600">{stats.expired}</p>
            </div>
            <Clock className="h-8 w-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search promos by code or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
                <option value="buy_one_get_one">BOGO</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Promos Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPromos.map((promo) => (
          <div key={promo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {promo.code}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(promo.type)}`}>
                      {promo.type === 'percentage' ? <Percent className="h-3 w-3 mr-1" /> : <DollarSign className="h-3 w-3 mr-1" />}
                      {promo.type}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {promo.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {promo.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(promo.status)}`}>
                    {getStatusIcon(promo.status)}
                    <span className="ml-1">{promo.status}</span>
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === promo.id ? null : promo.id)}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>

                    {showDropdown === promo.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleAction('view', promo)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleAction('edit', promo)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Promo
                          </button>
                          <button
                            onClick={() => handleAction('duplicate', promo)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Duplicate
                          </button>
                          {promo.status === 'active' ? (
                            <button
                              onClick={() => handleAction('deactivate', promo)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAction('activate', promo)}
                              className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Activate
                            </button>
                          )}
                          <div className="border-t border-gray-100"></div>
                          <button
                            onClick={() => handleAction('delete', promo)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Discount Value */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Discount Value</p>
                  <p className="text-lg font-bold text-blue-600">
                    {promo.type === 'percentage' ? formatPercentage(promo.value) : formatCurrency(promo.value)}
                  </p>
                  {promo.maxDiscount && (
                    <p className="text-xs text-gray-500">
                      Max: {formatCurrency(promo.maxDiscount)}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Min. Spend</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(promo.minSpend)}
                  </p>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Usage</p>
                  <p className="text-sm font-medium text-gray-900">
                    {promo.usage.usedCount} / {promo.usage.quota}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getUsagePercentage(promo.usage.usedCount, promo.usage.quota)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {getUsagePercentage(promo.usage.usedCount, promo.usage.quota)}% used
                </p>
              </div>

              {/* Period */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Valid Period</p>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">
                    {formatDate(promo.validPeriod.startDate)} - {formatDate(promo.validPeriod.endDate)}
                  </span>
                </div>
                {promo.status === 'active' && !isExpired(promo.validPeriod.endDate) && (
                  <p className="text-xs text-blue-600 mt-1">
                    {getRemainingDays(promo.validPeriod.endDate)} days remaining
                  </p>
                )}
              </div>

              {/* Applies To */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Applies To</p>
                <div className="flex flex-wrap gap-1">
                  {promo.appliesTo.map((item, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <p className="text-gray-600">Total Savings</p>
                  <p className="font-medium text-green-600">{formatCurrency(promo.totalSavings)}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="text-gray-600">Created</p>
                  <p className="font-medium text-gray-900">{formatDate(promo.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPromos.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Percent className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-sm font-medium text-gray-900">No promos found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  );
};

export default PromoManagement;