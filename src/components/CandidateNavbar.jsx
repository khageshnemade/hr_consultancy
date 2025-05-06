import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const CandidateNavbar = ({ onLogout }) => {
  // State to toggle mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profile = useSelector((state) => state?.profile?.profile);
  console.log(profile);

  // Toggle function for mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center h-16 relative">
        {/* Left-aligned: Logo and Hi, Candidate */}
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img
                src="/logos/hr_consultancy_logo_compressed.jpg"
                alt="Logo"
                className="h-16 w-auto"
              />
            </Link>
          </div>

          <span className="text-sm text-gray-700">Hi, {profile?.name}</span>
        </div>

        {/* Right-aligned Navbar Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavItem to="/candidate/dashboard">Dashboard</NavItem>
          <NavItem to="/candidate/applied_jobs">My Jobs</NavItem>
          <NavItem to="/candidate/jobs">All Jobs</NavItem>
          <NavItem to="/candidate/profile">Profile</NavItem>

          {/* Profile Picture (Desktop View) */}
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={`https://consultancy.scholarnet.in/${profile?.profile_pic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center ml-auto">
          {/* Profile Picture (Mobile View) */}
          <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
            <img
              src={`https://consultancy.scholarnet.in/${profile?.profile_pic}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hamburger Icon */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-50">
            <div className="flex flex-col items-center space-y-4 py-4">
              <NavItem to="/candidate/dashboard">Dashboard</NavItem>
              <NavItem to="/candidate/applied_jobs">My Jobs</NavItem>
              <NavItem to="/candidate/jobs">All Jobs</NavItem>
              <NavItem to="/candidate/profile">Profile</NavItem>
              <button
                onClick={onLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CandidateNavbar;
