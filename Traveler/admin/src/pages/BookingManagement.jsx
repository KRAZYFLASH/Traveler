import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  X,
  Check,
  Plane,
  Train,
  Bus,
  MapPin,
  User,
  Clock,
  DollarSign,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '../components/Toast';

const BookingManagement = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const [bookings] = useState([
    {
      id: 'BK-001',
      bookingNumber: 'TRV25100612001',
      customerName: 'Ahmad Faris',
      customerEmail: 'ahmad.faris@email.com',
      type: 'combo',
      destination: 'Bali - Paket Pantai & Budaya',
      travelDate: '2025-10-15T07:30:00Z',
      bookingDate: '2025-09-25T10:00:00Z',
      passengers: 2,
      totalAmount: 2500000,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      paymentMethod: 'credit_card'
    },
    {
      id: 'BK-002',
      bookingNumber: 'TRV25100611002',
      customerName: 'Sari Dewi',
      customerEmail: 'sari.dewi@email.com',
      type: 'flight',
      destination: 'Jakarta - Yogyakarta',
      travelDate: '2025-10-10T14:20:00Z',
      bookingDate: '2025-09-20T14:30:00Z',
      passengers: 1,
      totalAmount: 850000,
      paymentStatus: 'pending',
      bookingStatus: 'pending',
      paymentMethod: 'bank_transfer'
    },
    {
      id: 'BK-003',
      bookingNumber: 'TRV25100610003',
      customerName: 'Budi Santoso',
      customerEmail: 'budi.santoso@email.com',
      type: 'train',
      destination: 'Bandung - Malang',
      travelDate: '2025-10-12T08:00:00Z',
      bookingDate: '2025-09-18T09:45:00Z',
      passengers: 3,
      totalAmount: 450000,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      paymentMethod: 'e_wallet'
    },
    {
      id: 'BK-004',
      bookingNumber: 'TRV25100609004',
      customerName: 'Lisa Permata',
      customerEmail: 'lisa.permata@email.com',
      type: 'destination',
      destination: 'Yogyakarta - Candi Prambanan',
      travelDate: '2025-10-08T10:00:00Z',
      bookingDate: '2025-09-15T16:20:00Z',
      passengers: 4,
      totalAmount: 320000,
      paymentStatus: 'failed',
      bookingStatus: 'cancelled',
      paymentMethod: 'credit_card'
    }
  ]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.bookingStatus === filterStatus;
    const matchesType = filterType === 'all' || booking.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-4 w-4" />;
      case 'train':
        return <Train className="h-4 w-4" />;
      case 'bus':
        return <Bus className="h-4 w-4" />;
      case 'combo':
        return <MapPin className="h-4 w-4" />;
      case 'destination':
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAction = (action, booking) => {
    setShowDropdown(null);
    switch (action) {
      case 'view':
        toast.info(`Viewing details for ${booking.bookingNumber}`);
        break;
      case 'edit':
        toast.info(`Editing booking ${booking.bookingNumber}`);
        break;
      case 'confirm':
        toast.success(`Booking ${booking.bookingNumber} has been confirmed! ✅`);
        break;
      case 'cancel':
        toast.warning(`Booking ${booking.bookingNumber} has been cancelled`);
        break;
      case 'refund':
        toast.loading("Processing refund...", 3000);
        setTimeout(() => {
          toast.success(`Refund processed for ${booking.bookingNumber} 💰`);
        }, 3000);
        break;
      default:
        break;
    }
  };

  const handleExportBookings = () => {
    toast.loading("Exporting booking data...", 3000);
    setTimeout(() => {
      toast.success("Booking data exported successfully! 📊");
    }, 3000);
  };

  const getBookingStats = () => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.bookingStatus === 'confirmed').length;
    const pending = bookings.filter(b => b.bookingStatus === 'pending').length;
    const cancelled = bookings.filter(b => b.bookingStatus === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalAmount, 0);

    return { total, confirmed, pending, cancelled, totalRevenue };
  };

  const stats = getBookingStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-1">
            Manage reservations, payments, and customer bookings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleExportBookings}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-lg font-bold text-purple-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-500" />
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
                placeholder="Search by booking number, customer name, or destination..."
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
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="combo">Combo</option>
                <option value="destination">Destination</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Bookings ({filteredBookings.length})
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Travel Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                          {getTypeIcon(booking.type)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.bookingNumber}
                        </div>
                        <div className="text-sm text-gray-500">{booking.destination}</div>
                        <div className="flex items-center text-xs text-gray-400 mt-1">
                          <User className="h-3 w-3 mr-1" />
                          {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                    <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      Booked: {formatDate(booking.bookingDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(booking.travelDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(booking.totalAmount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      via {booking.paymentMethod.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                        {booking.bookingStatus}
                      </span>
                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() => setShowDropdown(showDropdown === booking.id ? null : booking.id)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {showDropdown === booking.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleAction('view', booking)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </button>
                            <button
                              onClick={() => handleAction('edit', booking)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Booking
                            </button>
                            {booking.bookingStatus === 'pending' && (
                              <button
                                onClick={() => handleAction('confirm', booking)}
                                className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Confirm
                              </button>
                            )}
                            {booking.bookingStatus !== 'cancelled' && (
                              <button
                                onClick={() => handleAction('cancel', booking)}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </button>
                            )}
                            {booking.paymentStatus === 'paid' && (
                              <>
                                <div className="border-t border-gray-100"></div>
                                <button
                                  onClick={() => handleAction('refund', booking)}
                                  className="flex items-center w-full px-4 py-2 text-sm text-purple-700 hover:bg-purple-50"
                                >
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Process Refund
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-sm font-medium text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

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

export default BookingManagement;