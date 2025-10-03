import React, { useEffect, useState } from 'react';
import {
    FiChevronDown, FiSearch, FiPlay, FiHeart, FiMapPin, FiStar,
} from "react-icons/fi";
import {
    MdApartment, MdWarehouse, MdVilla, MdBusiness, MdHome
} from "react-icons/md";

import profilePhoto from '../assets/profile-photo.jpg'

import logo from '../assets/Traveler-RB.png'
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

    const location = useLocation();
    const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

    return (
        <header className={!isHome ? `fixed top-0 left-0 w-full z-50 border-b bg-black/80 backdrop-blur` :`fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-colors duration-300 ` +
            (scrolled ? "bg-black/80 backdrop-blur" : "bg-black/30 backdrop-blur-sm")}>
            <div className='max-w-7xl mx-auto px-4 h-14 flex flex-row items-center gap-6 justify-between'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="" className='h-10 w-auto object-contain' />
                </div>
                    <nav className='hidden md:flex items-center gap-6 text-slate-300'>
                        <a href="/">Home</a>
                        <a href="/promo">Promo</a>
                        <a href="/combo">Combo</a>
                        <a href="/transportation">Transportasi</a>
                        <a href="/help">Bantuan</a>
                    </nav>
                    {
                        token ? 
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img src={profilePhoto} alt="" className='w-8 h-8 rounded-full object-cover'/>
                            <FiChevronDown className="w-4 h-4 text-gray-600" />
                            
                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                                <div className="min-w-48 bg-stone-100 rounded flex flex-col">
                                <p
                                    onClick={() => navigate("/profile")}
                                    className="w-full px-3 py-2 rounded hover:bg-black/20 cursor-pointer"
                                >
                                    Profile
                                </p>
                                <p
                                    onClick={() => navigate("/booking")}
                                    className="w-full px-3 py-2 rounded hover:bg-black/20 cursor-pointer"
                                >
                                    Booking
                                </p>
                                <p
                                    onClick={() => navigate("/logout")}
                                    className="w-full px-3 py-2 rounded hover:bg-black/20 cursor-pointer"
                                >
                                    Logout
                                </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex items-center gap-3">
                        <button className="hidden md:inline px-4 py-2 rounded-xl 
                            bg-gradient-to-r from-blue-500 to-indigo-600 
                            text-white font-medium shadow-md 
                            hover:from-indigo-600 hover:to-blue-500 
                            hover:shadow-lg hover:scale-105 
                            transition-all duration-300 ease-in-out">
                            Login / Sign Up
                        </button>
                        </div>
                    }
            </div>
        </header>
    );
}

export default Navbar;