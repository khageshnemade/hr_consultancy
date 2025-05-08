import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Reusable Nav Item with custom hover/active underline behavior
const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-3 py-1.5 text-sm font-medium transition duration-200 border-b-2 ${
        isActive
          ? "text-red-600 bg-red-50 border-red-600"
          : "text-gray-700 border-transparent hover:border-red-500 hover:text-red-600"
      }`
    }
  >
    {children}
  </NavLink>
);

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Companies", to: "/companies" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const PublicNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-14 border-b border-gray-200">
        {/* Logo */}
         <div className="flex items-center space-x-3">
                  <Link to="/">
                    <img
                      src="/logos/hr_consultancy_logo_compressed.jpg"
                      alt="Logo"
                      className="h-12 w-auto"
                    />
                  </Link>
                </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map(({ label, to }) => (
            <NavItem key={to} to={to}>
              {label}
            </NavItem>
          ))}

          {/* Auth Buttons - no underline behavior */}
          <NavLink
            to="/login"
            className="text-blue-600 border border-blue-600 text-xs px-3 py-1.5 rounded-full hover:bg-blue-50 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/candidate"
            className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full hover:bg-green-600 transition"
          >
            Register
          </NavLink>
          <NavLink
            to="/employer"
            className="bg-orange-500 text-white text-xs px-3 py-1.5 rounded-full hover:bg-orange-600 transition"
          >
            Company Register
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col space-y-3 text-center text-sm border-t border-gray-200">
          {navItems.map(({ label, to }) => (
            <NavItem key={to} to={to} onClick={toggleMenu}>
              {label}
            </NavItem>
          ))}

          {/* Auth Buttons (no underline) */}
          <NavLink
            to="/login"
            onClick={toggleMenu}
            className="text-blue-600 border border-blue-600 px-3 py-1.5 rounded-full hover:bg-blue-50 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/candidate"
            onClick={toggleMenu}
            className="bg-green-500 text-white px-3 py-1.5 rounded-full hover:bg-green-600 transition"
          >
            Register
          </NavLink>
          <NavLink
            to="/employer"
            onClick={toggleMenu}
            className="bg-orange-500 text-white px-3 py-1.5 rounded-full hover:bg-orange-600 transition"
          >
            Company Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
