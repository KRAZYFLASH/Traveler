import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Promo from './pages/Promo/promo'
import Combo from './pages/Combo/Combo'
import Transportation from './pages/Transportation/Transportation'
import Help from './pages/Help/Help'
import Profile from './pages/DropDown/Profile'
import Booking from './pages/DropDown/Booking'

const App = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    // beri padding top utk non-home supaya konten tidak ketimpa navbar
    <div className={isHome ? '' : 'pt-13'}>
      <Navbar isHome={isHome} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/promo" element={<Promo />} />
        <Route path="/combo" element={<Combo />} />
        <Route path="/transportation" element={<Transportation />} />
        <Route path="/help" element={<Help />} />
        
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/logout" element={<Home />} />

        
      </Routes>
    </div>
  )
}

export default App