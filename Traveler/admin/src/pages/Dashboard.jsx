import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  Plane,
  BarChart3,
  Activity,
  Clock,
  Star,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  const [stats] = useState({
    totalUsers: 2847,
    totalBookings: 1263,
    totalRevenue: 8750000000,
    activePromosions: 12,
    pendingBookings: 47,
    totalDestinations: 156,
    averageRating: 4.7,
    monthlyGrowth: 12.5
  });

  const [recentBookings] = useState([
    {
      id: 'BK-001',
      customerName: 'Ahmad Faris',
      destination: 'Bali - Pantai Kuta',
      amount: 2500000,
      status: 'confirmed',
      date: '2025-10-06T10:30:00Z',
      type: 'combo'
    },
    {
      id: 'BK-002',
      customerName: 'Sari Dewi',
      destination: 'Jakarta - Yogyakarta',
      amount: 850000,
      status: 'pending',
      date: '2025-10-06T09:15:00Z',
      type: 'flight'
    },
    {
      id: 'BK-003',
      customerName: 'Budi Santoso',
      destination: 'Bandung - Malang',
      amount: 450000,
      status: 'paid',
      date: '2025-10-06T08:45:00Z',
      type: 'train'
    }
  ]);

  const [quickStats] = useState([
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.3%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Bookings',
      value: '1,263',
      change: '+8.1%',
      changeType: 'positive',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Monthly Revenue',
      value: 'Rp 8.75M',
      change: '+15.7%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Bookings',
      value: '47',
      change: '-2.4%',
      changeType: 'negative',
      icon: Clock,
      color: 'bg-amber-500'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-4 w-4" />;
      case 'train':
        return <Activity className="h-4 w-4" />;
      case 'combo':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
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
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
            <p className="text-blue-100">
              Welcome back! Here's what's happening with Traveler today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <div className="text-3xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="text-blue-100 text-sm">Total Revenue This Month</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="space-y-0">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                          {getTypeIcon(booking.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {booking.customerName}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{booking.destination}</p>
                        <p className="text-xs text-gray-400">{formatDate(booking.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(booking.amount)}
                      </p>
                      <p className="text-xs text-gray-500">#{booking.id}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3" />
                  <span className="font-medium">Add New User</span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900">Add Destination</span>
                </div>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3 text-gray-600" />
                  <span className="font-medium text-gray-900">Create Promo</span>
                </div>
              </button>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    47 Pending Bookings
                  </p>
                  <p className="text-xs text-yellow-600">
                    Require attention for processing
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <Star className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    New Reviews Available
                  </p>
                  <p className="text-xs text-blue-600">
                    15 new customer reviews to moderate
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Revenue Growth
                  </p>
                  <p className="text-xs text-green-600">
                    +15.7% increase this month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 font-medium">
              7 Days
            </button>
            <button className="px-3 py-1 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              30 Days
            </button>
            <button className="px-3 py-1 text-sm rounded-lg text-gray-600 hover:bg-gray-100">
              90 Days
            </button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Revenue Chart Placeholder</p>
            <p className="text-sm text-gray-400">Integrate with Chart.js or similar library</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;