import React from 'react';
import {
  Settings,
  Database,
  Mail,
  Shield,
  Globe,
  Bell,
  Palette,
  Key,
  Server,
  CreditCard
} from 'lucide-react';
import { useToast } from '../components/Toast';

const SystemSettings = () => {
  const toast = useToast();

  const settingCategories = [
    {
      title: 'General Settings',
      description: 'Basic system configuration, timezone, and regional settings',
      icon: Settings,
      color: 'bg-gray-500',
      items: ['System Name', 'Timezone', 'Language', 'Currency']
    },
    {
      title: 'Database Configuration',
      description: 'Database connection settings, backup schedules, and maintenance',
      icon: Database,
      color: 'bg-blue-500',
      items: ['Connection', 'Backup', 'Maintenance', 'Performance']
    },
    {
      title: 'Email & SMS Settings',
      description: 'Configure SMTP settings, SMS providers, and notification preferences',
      icon: Mail,
      color: 'bg-green-500',
      items: ['SMTP Config', 'SMS Provider', 'Templates', 'Delivery']
    },
    {
      title: 'Security & Authentication',
      description: 'User authentication, password policies, and security measures',
      icon: Shield,
      color: 'bg-red-500',
      items: ['Password Policy', '2FA Settings', 'Session Timeout', 'IP Whitelist']
    },
    {
      title: 'API & Integrations',
      description: 'External API configurations, webhooks, and third-party integrations',
      icon: Globe,
      color: 'bg-purple-500',
      items: ['Payment Gateway', 'Maps API', 'Social Login', 'Analytics']
    },
    {
      title: 'Notifications',
      description: 'Push notifications, email alerts, and system announcements',
      icon: Bell,
      color: 'bg-yellow-500',
      items: ['Push Settings', 'Email Alerts', 'SMS Alerts', 'Admin Notifications']
    },
    {
      title: 'Appearance & Branding',
      description: 'Logo, colors, themes, and UI customization settings',
      icon: Palette,
      color: 'bg-pink-500',
      items: ['Logo Upload', 'Color Scheme', 'Typography', 'Favicon']
    },
    {
      title: 'API Keys & Secrets',
      description: 'Manage API keys, secret tokens, and environment variables',
      icon: Key,
      color: 'bg-indigo-500',
      items: ['API Keys', 'Encryption', 'OAuth', 'Webhooks']
    },
    {
      title: 'Server & Performance',
      description: 'Server monitoring, caching, and performance optimization',
      icon: Server,
      color: 'bg-teal-500',
      items: ['Server Status', 'Cache Settings', 'CDN Config', 'Monitoring']
    },
    {
      title: 'Payment & Billing',
      description: 'Payment processing, billing cycles, and financial configurations',
      icon: CreditCard,
      color: 'bg-orange-500',
      items: ['Payment Methods', 'Billing Cycle', 'Tax Settings', 'Refund Policy']
    }
  ];

  const handleCategoryClick = (category) => {
    toast.info(`${category.title} configuration coming soon! ⚙️`);
  };

  const handleBackupNow = () => {
    toast.loading("Creating system backup...", 5000);
    setTimeout(() => {
      toast.success("System backup completed successfully! 💾");
    }, 5000);
  };

  const handleTestEmail = () => {
    toast.loading("Sending test email...", 3000);
    setTimeout(() => {
      toast.success("Test email sent successfully! 📧");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure system-wide settings, integrations, and preferences
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleTestEmail}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <Mail className="h-4 w-4 mr-2" />
            Test Email
          </button>
          <button
            onClick={handleBackupNow}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            <Database className="h-4 w-4 mr-2" />
            Backup Now
          </button>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Settings className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">System Status: Healthy</h2>
            <p className="text-green-100">
              All systems are operational. Last backup: 2 hours ago. Database performance: Excellent.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-2xl font-bold text-green-600">99.9%</p>
            </div>
            <Server className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-lg font-bold text-gray-900">2h ago</p>
            </div>
            <Database className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">847</p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">API Calls</p>
              <p className="text-2xl font-bold text-gray-900">12.5K</p>
            </div>
            <Globe className="h-8 w-8 text-teal-500" />
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {category.description}
                  </p>
                  <div className="space-y-1">
                    {category.items.map((item, itemIndex) => (
                      <span key={itemIndex} className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-1 mb-1">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                      Click to configure →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Version</p>
                <p className="text-lg font-mono text-gray-900">v2.1.0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Environment</p>
                <p className="text-lg text-gray-900">Production</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Database</p>
                <p className="text-lg text-gray-900">MongoDB 7.0.2</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Server</p>
                <p className="text-lg text-gray-900">Node.js 20.9.0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-lg text-gray-900">2.4 GB / 100 GB</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Last Updated</p>
                <p className="text-lg text-gray-900">Oct 1, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Settings className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-800 mb-1">
              🚧 Under Development
            </h3>
            <p className="text-sm text-blue-700">
              The System Settings module is currently being developed. Full configuration
              capabilities for all system components will be available soon.
            </p>
            <div className="mt-3">
              <p className="text-xs text-blue-600 font-medium">
                Planned Features:
              </p>
              <ul className="text-xs text-blue-600 mt-1 space-y-0.5">
                <li>• Real-time configuration updates</li>
                <li>• Automated backup scheduling</li>
                <li>• Performance monitoring dashboard</li>
                <li>• Environment variable management</li>
                <li>• Security audit logs</li>
                <li>• API rate limiting controls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;