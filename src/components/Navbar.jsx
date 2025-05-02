import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const handleSearch = () => {
    if (!title && !locationQuery) return; // Avoid empty search
    navigate(`/?title=${encodeURIComponent(title)}&location=${encodeURIComponent(locationQuery)}`);
  };
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null); // Clear if logged out
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center text-gray-700 font-medium space-x-6">
          {["/", "/about", "/contact"].map((path, idx) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-1 py-2 text-sm border-b-2 ${isActive
                  ? "border-red-500 text-red-600"
                  : "border-transparent hover:border-red-500 hover:text-red-600"
                }`
              }
            >
              {["Home", "About Us", "Contact"][idx]}
            </NavLink>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-white rounded-full shadow-sm px-3 py-1 w-[250px]">
          <input
            type="text"
            placeholder="Title..."
            className="w-full text-sm outline-none text-gray-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location..."
            className="w-full text-sm outline-none text-gray-700 ml-2"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 ml-2"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Auth Buttons + Dropdown */}
        <div className="flex items-center space-x-4">
          {/* Auth Buttons or Logout */}
          {user ? (
            <>
              <span className="text-sm text-gray-700">Hi, {user.role}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded-full hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-50 text-sm"
              >
                Login
              </Link>

              <Link
                to="/candidate"
                className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 text-sm"
              >
                Register
              </Link>
            </>
          )}

          {/* Dropdown */}
          <div className="relative group">
            <div className="flex items-center space-x-4 text-sm text-gray-700">
              <NavLink
                to="/employer"
                className={({ isActive }) =>
                  `px-2 py-1 border-b-2 ${isActive
                    ? "text-red-600 border-red-500"
                    : "hover:text-red-600 hover:border-red-500 border-transparent"
                  }`
                }
              >
                Employer
              </NavLink>

            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
