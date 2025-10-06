import React from 'react';
import {
  Plane,
  Plus,
  Settings,
  BarChart3,
  Building,
  Route,
  Clock,
  Star
} from 'lucide-react';
import { useToast } from '../components/Toast';

const TransportationManagement = () => {
  const toast = useToast();

  const features = [
    {
      title: 'Transportation Operators',
      description: 'Manage airlines, train companies, bus operators, and other transportation providers',
      icon: Building,
      color: 'bg-blue-500',
      stats: '24 Operators'
    },
    {
      title: 'Vehicle Management',
      description: 'Add and manage vehicles, seats configuration, and amenities',
      icon: Plane,
      color: 'bg-green-500',
      stats: '156 Vehicles'
    },
    {
      title: 'Routes & Schedules',
      description: 'Configure routes between locations and manage departure schedules',
      icon: Route,
      color: 'bg-purple-500',
      stats: '89 Routes'
    },
    {
      title: 'Schedule Management',
      description: 'Create and update departure/arrival times, pricing, and availability',
      icon: Clock,
      color: 'bg-amber-500',
      stats: '234 Schedules'
    },
    {
      title: 'Performance Analytics',
      description: 'Monitor transportation performance, occupancy rates, and revenue',
      icon: BarChart3,
      color: 'bg-indigo-500',
      stats: '12 Reports'
    },
    {
      title: 'Operator Reviews',
      description: 'Manage customer reviews and ratings for transportation operators',
      icon: Star,
      color: 'bg-yellow-500',
      stats: '1,247 Reviews'
    }
  ];

  const handleFeatureClick = (feature) => {
    toast.info(`${feature.title} feature coming soon! 🚀`);
  };

  const handleCreateOperator = () => {
    toast.info("Opening operator registration form...");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transportation Management</h1>
          <p className="text-gray-600 mt-1">
            Manage transportation operators, vehicles, routes, and schedules
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleCreateOperator}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Operator
          </button>
        </div>
      </div>

      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Plane className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Transportation Network</h2>
            <p className="text-blue-100">
              Comprehensive management system for all transportation services. Manage operators, vehicles, routes, and schedules from a single dashboard.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">89</div>
            <div className="text-blue-100 text-sm">Active Routes</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Airlines</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <Plane className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Train Operators</p>
              <p className="text-2xl font-bold text-gray-900">6</p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">🚄</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bus Companies</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">🚌</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ship Lines</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="h-8 w-8 bg-cyan-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">🚢</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              onClick={() => handleFeatureClick(feature)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`${feature.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-600">
                      {feature.stats}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                      Click to manage →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Development Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Settings className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800 mb-1">
              🚧 Under Development
            </h3>
            <p className="text-sm text-amber-700">
              The Transportation Management module is currently being developed. Full functionality including
              CRUD operations for operators, vehicles, routes, and schedules will be available soon.
            </p>
            <div className="mt-3">
              <p className="text-xs text-amber-600 font-medium">
                Planned Features:
              </p>
              <ul className="text-xs text-amber-600 mt-1 space-y-0.5">
                <li>• Operator registration and verification</li>
                <li>• Vehicle fleet management</li>
                <li>• Dynamic route configuration</li>
                <li>• Real-time schedule updates</li>
                <li>• Pricing and discount management</li>
                <li>• Performance analytics dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationManagement;