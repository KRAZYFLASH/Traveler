import React from 'react';
import {
  FileText,
  Image,
  Upload,
  Settings,
  Monitor,
  Megaphone,
  Globe,
  Mail
} from 'lucide-react';
import { useToast } from '../components/Toast';

const ContentManagement = () => {
  const toast = useToast();

  const contentTypes = [
    {
      title: 'Media Library',
      description: 'Upload and manage images, videos, and documents for the platform',
      icon: Image,
      color: 'bg-blue-500',
      stats: '1,247 Files'
    },
    {
      title: 'Website Content',
      description: 'Edit homepage content, about us, terms of service, and privacy policy',
      icon: Globe,
      color: 'bg-green-500',
      stats: '12 Pages'
    },
    {
      title: 'Blog & Articles',
      description: 'Create and publish travel guides, tips, and destination articles',
      icon: FileText,
      color: 'bg-purple-500',
      stats: '34 Articles'
    },
    {
      title: 'Announcements',
      description: 'Manage system announcements, notifications, and promotional banners',
      icon: Megaphone,
      color: 'bg-amber-500',
      stats: '8 Active'
    },
    {
      title: 'Email Templates',
      description: 'Design and customize email templates for bookings, confirmations, etc.',
      icon: Mail,
      color: 'bg-indigo-500',
      stats: '15 Templates'
    },
    {
      title: 'SEO Settings',
      description: 'Manage meta tags, descriptions, and search engine optimization',
      icon: Monitor,
      color: 'bg-teal-500',
      stats: '89% Score'
    }
  ];

  const handleContentTypeClick = (contentType) => {
    toast.info(`${contentType.title} management coming soon! 📝`);
  };

  const handleUploadMedia = () => {
    toast.loading("Uploading media files...", 3000);
    setTimeout(() => {
      toast.success("Media files uploaded successfully! 📁");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">
            Manage website content, media library, and communication templates
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleUploadMedia}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Media
          </button>
        </div>
      </div>

      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Content Hub</h2>
            <p className="text-purple-100">
              Centralized content management system for all your platform needs. Manage media, content, templates, and SEO settings.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">1.2k+</div>
            <div className="text-purple-100 text-sm">Content Items</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-2xl font-bold text-gray-900">892</p>
            </div>
            <Image className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Articles</p>
              <p className="text-2xl font-bold text-gray-900">34</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <div className="h-8 w-8 bg-purple-500 rounded flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎥</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Templates</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
            <Mail className="h-8 w-8 text-indigo-500" />
          </div>
        </div>
      </div>

      {/* Content Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((contentType, index) => {
          const Icon = contentType.icon;
          return (
            <div
              key={index}
              onClick={() => handleContentTypeClick(contentType)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start space-x-4">
                <div className={`${contentType.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                    {contentType.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {contentType.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-600">
                      {contentType.stats}
                    </span>
                    <span className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors duration-200">
                      Click to manage →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Content Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">New images uploaded</span> to Bali destination gallery
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Article published:</span> "10 Hidden Gems in Yogyakarta"
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Email template updated:</span> Booking confirmation template
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Megaphone className="h-4 w-4 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">New announcement:</span> Special discount for October bookings
                </p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Development Notice */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Settings className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-purple-800 mb-1">
              🚧 Under Development
            </h3>
            <p className="text-sm text-purple-700">
              The Content Management System is currently being developed. Full functionality including
              media library, content editor, and template management will be available soon.
            </p>
            <div className="mt-3">
              <p className="text-xs text-purple-600 font-medium">
                Planned Features:
              </p>
              <ul className="text-xs text-purple-600 mt-1 space-y-0.5">
                <li>• Drag & drop media upload</li>
                <li>• Rich text editor for articles</li>
                <li>• Template builder for emails</li>
                <li>• SEO optimization tools</li>
                <li>• Content scheduling</li>
                <li>• Multi-language support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;