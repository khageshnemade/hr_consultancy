import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const EmployerNavbar = ({ onLogout }) => {
  // State to toggle mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profile = useSelector((state) => state.profile.profile);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle function for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center h-16 border-b border-gray-200">
        {/* Left-aligned: Logo and Hi, Employer */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img
              src="/logos/hr_consultancy_logo_compressed.jpg"
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>
          <span className="text-sm text-gray-700">Hi, {profile?.name}</span>
        </div>

        {/* Right-aligned Navbar Links */}
        <div className="hidden md:flex items-center space-x-4">
          <NavItem to="/employer/dashboard">Dashboard</NavItem>
          <NavItem to="/employer/jobs">Jobs</NavItem>

          {/* Profile Picture */}
          <Link to="/employer/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
              <img
                src={`https://consultancy.scholarnet.in/${profile?.organization_logo}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition-colors duration-300 text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center ml-auto">
          <Link to="/employer/profile">
            <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer mr-4">
              <img
                src={`https://consultancy.scholarnet.in/${profile?.organization_logo}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40 border-t border-gray-200"
        >
          <div className="flex flex-col items-center space-y-3 py-4">
            <NavItem to="/employer/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavItem>
            <NavItem to="/employer/jobs" onClick={() => setIsMobileMenuOpen(false)}>Jobs</NavItem>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 transition-colors duration-300 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default EmployerNavbar;
