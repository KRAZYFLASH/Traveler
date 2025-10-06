# Traveler Admin Panel Documentation

## 📋 Overview

Comprehensive admin panel untuk mengelola seluruh aspek platform Traveler. Panel ini menyediakan interface yang user-friendly untuk administrator dalam mengelola users, bookings, destinations, promotions, dan sistem secara keseluruhan.

## 🏗️ Architecture & Structure

### 📁 Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── AdminLayout.jsx      # Layout utama dengan sidebar dan header
│   │   └── Toast.jsx           # Custom toast notification system
│   ├── pages/
│   │   ├── Dashboard.jsx       # Dashboard utama dengan statistik
│   │   ├── UserManagement.jsx  # Kelola users dan permissions
│   │   ├── BookingManagement.jsx # Kelola booking dan payments
│   │   ├── DestinationManagement.jsx # Kelola destinasi wisata
│   │   ├── PromoManagement.jsx # Kelola promo dan discount
│   │   ├── TransportationManagement.jsx # Kelola transportasi (placeholder)
│   │   ├── ContentManagement.jsx # Kelola content dan media (placeholder)
│   │   ├── SystemSettings.jsx  # Pengaturan sistem (placeholder)
│   │   ├── Login.jsx          # Halaman login admin
│   │   └── ToastDemo.jsx      # Demo toast notifications
│   ├── context/
│   │   └── AdminContext.jsx   # Context untuk state management
│   └── App.jsx               # Router dan app configuration
```

## 🚀 Features Overview

### 1. **Dashboard** (`/dashboard`)

- **Statistics Cards**: Total users, bookings, revenue, pending items
- **Recent Bookings**: List booking terbaru dengan status
- **Quick Actions**: Shortcut untuk aksi umum
- **System Alerts**: Notifikasi penting untuk admin
- **Revenue Chart**: Placeholder untuk grafik pendapatan

**Key Components:**

- Real-time statistics
- Interactive action buttons
- Responsive design untuk mobile
- Color-coded status indicators

### 2. **User Management** (`/users`)

- **User List**: Table dengan informasi lengkap user
- **Search & Filter**: Cari by name/email, filter by role
- **User Actions**: View, Edit, Activate/Deactivate, Delete
- **Export**: Export data user ke CSV/Excel
- **Role Management**: Customer vs Admin roles

**Data Fields:**

- Personal info (name, email, phone, location)
- Account status & verification
- Booking history & spending
- Join date & last login

### 3. **Booking Management** (`/bookings`)

- **Booking Overview**: Stats cards dengan metrics penting
- **Booking Table**: List semua booking dengan filter
- **Status Management**: Confirm, Cancel, Refund bookings
- **Payment Tracking**: Monitor payment status
- **Multi-type Support**: Flight, Train, Bus, Combo, Destination

**Key Features:**

- Advanced filtering (status, type, date range)
- Bulk actions untuk multiple bookings
- Payment status tracking
- Customer contact information

### 4. **Destination Management** (`/destinations`)

- **Destination Grid**: Card layout dengan preview images
- **CRUD Operations**: Create, Read, Update, Delete destinations
- **Category Management**: Organize by categories (Pantai, Gunung, etc.)
- **Pricing Control**: Set adult/child/infant pricing
- **Image Management**: Upload dan organize destination images
- **Status Control**: Active, Inactive, Maintenance modes

**Advanced Features:**

- Amenities management
- Review & rating display
- Revenue tracking per destination
- Location-based organization

### 5. **Promo Management** (`/promos`)

- **Promo Types**: Percentage, Fixed amount, BOGO
- **Usage Tracking**: Monitor quota dan usage statistics
- **Validity Period**: Start/end date management
- **Scope Control**: Apply to specific services
- **Performance Metrics**: Total savings, usage count

**Promo Features:**

- Code generation & validation
- Min spend requirements
- Max discount limits
- User limit per promo
- Real-time usage progress

### 6. **Transportation Management** (`/transportation`)

_Status: Under Development_

- **Operator Management**: Airlines, train companies, bus operators
- **Vehicle Fleet**: Manage vehicles dan seat configurations
- **Route Planning**: Origin-destination route setup
- **Schedule Management**: Departure/arrival times
- **Performance Analytics**: Occupancy rates, revenue

### 7. **Content Management** (`/content`)

_Status: Under Development_

- **Media Library**: Upload dan organize images/videos
- **Website Content**: Edit homepage, about us, policies
- **Blog Articles**: Travel guides dan tips
- **Email Templates**: Booking confirmations, notifications
- **SEO Settings**: Meta tags, descriptions

### 8. **System Settings** (`/settings`)

_Status: Under Development_

- **General Configuration**: System name, timezone, currency
- **Database Settings**: Connection, backup, maintenance
- **Email/SMS Setup**: SMTP, SMS providers
- **Security**: Authentication, password policies
- **API Configuration**: Payment gateways, external services

## 🎨 Design System

### Color Scheme

- **Primary**: Blue gradient (`from-blue-500 to-indigo-600`)
- **Success**: Green (`text-green-800`, `bg-green-100`)
- **Warning**: Amber (`text-amber-800`, `bg-amber-100`)
- **Error**: Red (`text-red-800`, `bg-red-100`)
- **Info**: Blue (`text-blue-800`, `bg-blue-100`)

### Icons

Menggunakan **Lucide React** untuk consistency:

- Dashboard: `LayoutDashboard`
- Users: `Users`
- Bookings: `Calendar`
- Destinations: `MapPin`
- Promos: `Percent`
- Transportation: `Plane`

### Layout Components

- **Sidebar Navigation**: Fixed left sidebar dengan icons
- **Header**: Top bar dengan search, notifications, user menu
- **Content Area**: Main area dengan proper spacing
- **Cards**: Consistent shadow, border, rounded corners
- **Tables**: Striped rows, hover effects, responsive

## 🔧 Technical Implementation

### State Management

- **React Context**: `AdminContext` untuk global state
- **Local State**: `useState` untuk component-specific data
- **Toast System**: Custom notification system dengan portal

### Routing

```jsx
<Route path="/" element={<AdminLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="users" element={<UserManagement />} />
  <Route path="bookings" element={<BookingManagement />} />
  <Route path="destinations" element={<DestinationManagement />} />
  <Route path="promos" element={<PromoManagement />} />
  <Route path="transportation" element={<TransportationManagement />} />
  <Route path="content" element={<ContentManagement />} />
  <Route path="settings" element={<SystemSettings />} />
  <Route index element={<Dashboard />} />
</Route>
```

### Data Flow

1. **Mock Data**: Currently using static data untuk development
2. **API Ready**: Structure siap untuk integrasi dengan backend API
3. **Error Handling**: Toast notifications untuk user feedback
4. **Loading States**: Proper loading indicators

## 📱 Responsive Design

### Breakpoints

- **Mobile**: `< 768px` - Collapsed sidebar, stacked layout
- **Tablet**: `768px - 1024px` - Condensed sidebar, grid adjustments
- **Desktop**: `> 1024px` - Full sidebar, optimal spacing

### Mobile Optimizations

- Hamburger menu untuk sidebar toggle
- Touch-friendly button sizes
- Horizontal scroll untuk tables
- Condensed information display

## 🔐 Security Considerations

### Authentication

- Login form dengan validation
- Session management (placeholder)
- Role-based access control struktur

### Authorization

- Admin vs Customer role differentiation
- Protected routes structure
- Action-based permissions framework

## 📊 Data Models Integration

### MongoDB Models Support

Admin panel terintegrasi dengan MongoDB models:

- **User Model**: userModels.js
- **Booking Model**: bookingModels.js
- **Destination Model**: destinationModels.js
- **Promotion Model**: promoModels.js
- **Transportation Models**: Various operator/vehicle models

### API Endpoints Structure

```javascript
// Users
GET /api/users - List users with pagination
POST /api/users - Create new user
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user

// Bookings
GET /api/bookings - List bookings with filters
PUT /api/bookings/:id/status - Update booking status
POST /api/bookings/:id/refund - Process refund

// Destinations
GET /api/destinations - List destinations
POST /api/destinations - Create destination
PUT /api/destinations/:id - Update destination
DELETE /api/destinations/:id - Delete destination

// Promotions
GET /api/promotions - List promotions
POST /api/promotions - Create promotion
PUT /api/promotions/:id - Update promotion
PUT /api/promotions/:id/status - Activate/deactivate
```

## 🚦 Development Status

### ✅ **Completed Features**

- [x] AdminLayout dengan responsive sidebar
- [x] Dashboard dengan statistics dan overview
- [x] User Management dengan CRUD operations
- [x] Booking Management dengan status control
- [x] Destination Management dengan image support
- [x] Promo Management dengan usage tracking
- [x] Custom Toast notification system
- [x] Routing dan navigation structure

### 🚧 **In Development**

- [ ] Transportation Management (full implementation)
- [ ] Content Management System
- [ ] System Settings configuration
- [ ] Backend API integration
- [ ] Authentication system
- [ ] File upload functionality

### 📋 **Planned Features**

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Bulk import/export tools
- [ ] Audit logs
- [ ] Multi-language support
- [ ] Dark mode theme

## 🛠️ Development Workflow

### Setup

```bash
cd admin
npm install
npm run dev
```

### File Organization

- **Pages**: Functional components untuk setiap route
- **Components**: Reusable UI components
- **Context**: State management
- **Utils**: Helper functions (future)

### Code Standards

- Functional components dengan hooks
- Consistent naming conventions
- Proper component composition
- Responsive design first
- TypeScript ready structure

## 🔄 Backend Integration Plan

### API Integration Points

1. **Authentication**: Login/logout dengan JWT
2. **Data Fetching**: Replace mock data dengan API calls
3. **Real-time Updates**: WebSocket untuk live data
4. **File Upload**: Cloudinary integration untuk images
5. **Error Handling**: Centralized error management

### Database Connection

- MongoDB dengan Mongoose ODM
- Connection pooling untuk performance
- Data validation pada server side
- Indexing untuk search optimization

## 📈 Performance Optimization

### Current Optimizations

- Lazy loading untuk heavy components
- Efficient re-rendering dengan proper keys
- Responsive images dengan proper sizing
- Minimal bundle size dengan tree shaking

### Future Optimizations

- Virtual scrolling untuk large tables
- Image compression dan CDN
- Caching strategies
- Progressive Web App features

## 🎯 Usage Guidelines

### For Developers

1. Follow component structure patterns
2. Use existing design tokens
3. Implement proper error handling
4. Add loading states untuk async operations
5. Test responsive behavior

### For Administrators

1. Regular backup dari system settings
2. Monitor system performance metrics
3. Review user activities dan security logs
4. Update content dan promotions regularly
5. Maintain clean data dengan regular cleanup

## 📚 Resources & References

### Libraries Used

- **React 18**: UI framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **Vite**: Build tool dan dev server

### External APIs (Planned)

- **Cloudinary**: Image management
- **Payment Gateways**: Stripe, Midtrans
- **Maps API**: Google Maps untuk locations
- **Email Service**: SendGrid atau similar

---

_Last Updated: October 6, 2025_  
_Version: 1.0.0_  
_Status: Production Ready (Core Features)_
