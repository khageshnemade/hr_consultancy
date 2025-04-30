import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
                `px-1 py-2 text-sm border-b-2 ${
                  isActive
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
            placeholder="Search..."
            className="w-full text-sm outline-none text-gray-700"
          />
          <button className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 ml-2">
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
            <div className="flex items-center space-x-1 text-sm text-gray-700 hover:text-red-600 cursor-pointer border-b-2 border-transparent group-hover:border-red-500">
              <span>For employers</span>
              <ChevronDown size={16} />
            </div>

            {/* Dropdown Items */}
            <div className="absolute right-0 mt-2 w-40 bg-white rounded py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {["/employer", "/candidate", "/admin"].map((link, idx) => (
                <NavLink
                  key={link}
                  to={link}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm ${
                      isActive
                        ? "text-red-600 border-b-2 border-red-500"
                        : "hover:text-red-600 hover:border-b-2 hover:border-red-500"
                    }`
                  }
                >
                  {["Employer", "Admin"][idx]}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
