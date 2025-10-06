import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ToastDemo from "./pages/ToastDemo";
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
          </Routes>
        </ToastProvider>
      </AdminContextProvider>
    </BrowserRouter>
  );
};

export default App;
