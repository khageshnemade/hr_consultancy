import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // lucide-react icons for modern UI

const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between h-16 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/logos/hr_consultancy_logo_compressed.jpg" alt="Logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4">
         

          <NavLink
            to="/login"
            className="text-sm text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-all"
          >
            Login
          </NavLink>

          <NavLink
            to="/candidate"
            className="text-sm text-white bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition-all"
          >
            Register
          </NavLink>

          <NavLink
            to="/employer"
            className="text-sm text-white bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600 transition-all"
          >
            Employer Register
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col items-center justify-center space-y-3 text-center">
       
          <NavLink
            to="/login"
            onClick={toggleMenu}
            className="block text-blue-600 border border-blue-600 rounded-full px-4 py-2 text-sm hover:bg-blue-50 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/candidate"
            onClick={toggleMenu}
            className="block bg-green-500 text-white rounded-full px-4 py-2 text-sm hover:bg-green-600 transition"
          >
            Register
          </NavLink>
          <NavLink
            to="/employer"
            onClick={toggleMenu}
            className="block bg-orange-500 text-white rounded-full px-4 py-2 text-sm hover:bg-orange-600 transition"
          >
            Employer Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
