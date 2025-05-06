import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const CandidateNavbar = ({ onLogout }) => {
  // State to toggle mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profile = useSelector((state) => state?.profile?.profile);
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
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center h-14 relative border-b border-gray-200">
        {/* Left-aligned: Logo and Hi, Candidate */}
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
          <NavItem to="/candidate/dashboard">Dashboard</NavItem>
          <NavItem to="/candidate/applied_jobs">My Jobs</NavItem>
          <NavItem to="/candidate/jobs">All Jobs</NavItem>
          <Link to="/candidate/profile">
            <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer">
              <img
                src={`https://consultancy.scholarnet.in/${profile?.profile_pic}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded-full hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center ml-auto">
          {/* Profile Picture (Mobile View) */}
          <Link to="/candidate/profile">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
              <img
                src={`https://consultancy.scholarnet.in/${profile?.profile_pic}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="h-5 w-5"
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
          <div
            ref={menuRef}
            className="md:hidden absolute top-14 left-0 w-full bg-white shadow-lg z-50"
          >
            <div className="flex flex-col items-center space-y-3 py-4">
              <NavItem to="/candidate/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavItem>
              <NavItem to="/candidate/applied_jobs" onClick={() => setIsMobileMenuOpen(false)}>My Jobs</NavItem>
              <NavItem to="/candidate/jobs" onClick={() => setIsMobileMenuOpen(false)}>All Jobs</NavItem>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onLogout();
                }}
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
