import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

const CandidateNavbar = ({ onLogout }) => {
  // State to toggle mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Handle logout button click to show the modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false)
  };

  // Handle confirming logout
  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    onLogout();
  };

  // Handle cancelling logout
  const handleCancelLogout = () => {
    setIsModalOpen(false);
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
                src={
                  profile?.profile_pic
                    ? `https://consultancy.scholarnet.in/${profile.profile_pic}`
                    : "/images/user_pic.jpg"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />

            </div>
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
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
                onClick={handleLogoutClick}
                className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Background and Modal */}
      {isModalOpen && (
        <>
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40" />

          {/* Modal */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 text-center">
              <h2 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmLogout}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default CandidateNavbar;
