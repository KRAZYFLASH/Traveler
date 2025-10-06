import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Star,
  Upload,
  Image,
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../components/Toast';

const DestinationManagement = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  const [destinations] = useState([
    {
      id: 'DST-001',
      name: 'Pantai Kuta Bali',
      category: 'Pantai',
      location: {
        city: 'Badung',
        province: 'Bali',
        country: 'Indonesia'
      },
      description: 'Pantai yang terkenal dengan sunset yang indah dan ombak yang cocok untuk surfing.',
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
        'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400'
      ],
      rating: 4.5,
      totalReviews: 2847,
      price: {
        adult: 25000,
        child: 15000,
        infant: 0
      },
      amenities: ['Parking', 'Toilet', 'Restaurant', 'Surfboard Rental'],
      openingHours: '24 Hours',
      tags: ['sunset', 'surfing', 'beach', 'romantic'],
      status: 'active',
      totalBookings: 1245,
      revenue: 31125000,
      createdAt: '2025-01-15T00:00:00Z'
    },
    {
      id: 'DST-002',
      name: 'Candi Prambanan',
      category: 'Sejarah',
      location: {
        city: 'Sleman',
        province: 'Yogyakarta',
        country: 'Indonesia'
      },
      description: 'Kompleks candi Hindu terbesar di Indonesia yang merupakan warisan dunia UNESCO.',
      images: [
        'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
      ],
      rating: 4.8,
      totalReviews: 1923,
      price: {
        adult: 50000,
        child: 25000,
        infant: 0
      },
      amenities: ['Guided Tour', 'Museum', 'Parking', 'Souvenir Shop'],
      openingHours: '06:00 - 17:00',
      tags: ['historical', 'unesco', 'cultural', 'educational'],
      status: 'active',
      totalBookings: 856,
      revenue: 42800000,
      createdAt: '2025-01-20T00:00:00Z'
    },
    {
      id: 'DST-003',
      name: 'Gunung Bromo',
      category: 'Gunung',
      location: {
        city: 'Probolinggo',
        province: 'Jawa Timur',
        country: 'Indonesia'
      },
      description: 'Gunung berapi aktif dengan pemandangan sunrise yang spektakuler.',
      images: [
        'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=400',
        'https://images.unsplash.com/photo-1578736641330-3155e606cd40?w=400'
      ],
      rating: 4.7,
      totalReviews: 3421,
      price: {
        adult: 35000,
        child: 20000,
        infant: 0
      },
      amenities: ['Jeep Tour', 'Camping Ground', 'Horse Riding', 'Restaurant'],
      openingHours: '24 Hours',
      tags: ['sunrise', 'volcano', 'adventure', 'photography'],
      status: 'active',
      totalBookings: 2156,
      revenue: 75460000,
      createdAt: '2025-02-01T00:00:00Z'
    },
    {
      id: 'DST-004',
      name: 'Danau Toba',
      category: 'Danau',
      location: {
        city: 'Toba Samosir',
        province: 'Sumatera Utara',
        country: 'Indonesia'
      },
      description: 'Danau vulkanik terbesar di dunia dengan keindahan alam yang menakjubkan.',
      images: [
        'https://images.unsplash.com/photo-1578499259993-2e6b2b1b9e4b?w=400'
      ],
      rating: 4.6,
      totalReviews: 1567,
      price: {
        adult: 30000,
        child: 18000,
        infant: 0
      },
      amenities: ['Boat Tour', 'Traditional Village', 'Hot Springs', 'Local Food'],
      openingHours: '24 Hours',
      tags: ['lake', 'culture', 'relaxation', 'boat'],
      status: 'maintenance',
      totalBookings: 678,
      revenue: 20340000,
      createdAt: '2025-02-10T00:00:00Z'
    }
  ]);

  const categories = ['Pantai', 'Gunung', 'Sejarah', 'Danau', 'Taman', 'Museum'];

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.location.province.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || destination.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || destination.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Pantai': 'bg-blue-100 text-blue-800',
      'Gunung': 'bg-green-100 text-green-800',
      'Sejarah': 'bg-purple-100 text-purple-800',
      'Danau': 'bg-cyan-100 text-cyan-800',
      'Taman': 'bg-emerald-100 text-emerald-800',
      'Museum': 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
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
      case 'maintenance':
        return <AlertCircle className="h-4 w-4" />;
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

  const handleAction = (action, destination) => {
    setShowDropdown(null);
    switch (action) {
      case 'view':
        toast.info(`Viewing details for ${destination.name}`);
        break;
      case 'edit':
        toast.info(`Editing destination ${destination.name}`);
        break;
      case 'delete':
        toast.warning(`Are you sure you want to delete ${destination.name}?`);
        break;
      case 'activate':
        toast.success(`${destination.name} has been activated! ✅`);
        break;
      case 'deactivate':
        toast.warning(`${destination.name} has been deactivated`);
        break;
      case 'maintenance':
        toast.info(`${destination.name} set to maintenance mode 🔧`);
        break;
      default:
        break;
    }
  };

  const handleCreateDestination = () => {
    toast.info("Opening destination creation form...");
  };

  const handleUploadImages = () => {
    toast.loading("Uploading images...", 3000);
    setTimeout(() => {
      toast.success("Images uploaded successfully! 📸");
    }, 3000);
  };

  const getDestinationStats = () => {
    const total = destinations.length;
    const active = destinations.filter(d => d.status === 'active').length;
    const maintenance = destinations.filter(d => d.status === 'maintenance').length;
    const totalBookings = destinations.reduce((sum, d) => sum + d.totalBookings, 0);
    const totalRevenue = destinations.reduce((sum, d) => sum + d.revenue, 0);

    return { total, active, maintenance, totalBookings, totalRevenue };
  };

  const stats = getDestinationStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Destination Management</h1>
          <p className="text-gray-600 mt-1">
            Manage tourist destinations, pricing, and content
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleUploadImages}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Images
          </button>
          <button
            onClick={handleCreateDestination}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Destination
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Destinations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MapPin className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalBookings.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-lg font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
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
                placeholder="Search destinations by name or location..."
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
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <div key={destination.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
              {destination.images.length > 0 ? (
                <img
                  src={destination.images[0]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="h-12 w-12 text-gray-400" />
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(destination.status)}`}>
                  {getStatusIcon(destination.status)}
                  <span className="ml-1">{destination.status}</span>
                </span>
              </div>
              {/* Actions */}
              <div className="absolute top-3 right-3">
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(showDropdown === destination.id ? null : destination.id)}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-1.5 rounded-lg shadow-sm transition-all duration-200"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>

                  {showDropdown === destination.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={() => handleAction('view', destination)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleAction('edit', destination)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Destination
                        </button>
                        {destination.status === 'active' && (
                          <>
                            <button
                              onClick={() => handleAction('maintenance', destination)}
                              className="flex items-center w-full px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50"
                            >
                              <AlertCircle className="h-4 w-4 mr-2" />
                              Set Maintenance
                            </button>
                            <button
                              onClick={() => handleAction('deactivate', destination)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Deactivate
                            </button>
                          </>
                        )}
                        {destination.status !== 'active' && (
                          <button
                            onClick={() => handleAction('activate', destination)}
                            className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Activate
                          </button>
                        )}
                        <div className="border-t border-gray-100"></div>
                        <button
                          onClick={() => handleAction('delete', destination)}
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

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {destination.location.city}, {destination.location.province}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(destination.category)}`}>
                  {destination.category}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {destination.description}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium text-gray-900">{destination.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({destination.totalReviews})</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  {destination.totalBookings} bookings
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Pricing:</div>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="font-medium">Adult: {formatCurrency(destination.price.adult)}</span>
                  <span className="text-gray-500">Child: {formatCurrency(destination.price.child)}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Revenue: {formatCurrency(destination.revenue)}
                </div>
                <div className="text-xs text-gray-400">
                  Added: {formatDate(destination.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-sm font-medium text-gray-900">No destinations found</h3>
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

export default DestinationManagement;