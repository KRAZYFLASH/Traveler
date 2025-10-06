import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ToastDemo from "./pages/ToastDemo";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import BookingManagement from "./pages/BookingManagement";
import DestinationManagement from "./pages/DestinationManagement";
import PromoManagement from "./pages/PromoManagement";
import TransportationManagement from "./pages/TransportationManagement";
import ContentManagement from "./pages/ContentManagement";
import SystemSettings from "./pages/SystemSettings";
import AdminLayout from "./components/AdminLayout";
import AdminContextProvider from "./context/AdminContext";
import { ToastProvider } from "./components/Toast";

const App = () => {
  return (
    <BrowserRouter>
      <AdminContextProvider>
        <ToastProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<ToastDemo />} />
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
          </Routes>
        </ToastProvider>
      </AdminContextProvider>
    </BrowserRouter>
  );
};

export default App;
