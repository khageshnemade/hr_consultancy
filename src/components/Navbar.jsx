import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import EmployerNavbar from "./EmployerNavbar";
import CandidateNavbar from "./CandidateNavbar";
import PublicNavbar from "./PublicNavbar";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("reduxState")
    setUser(null);
    navigate("/login");
  };

  if (!user?.role) return <PublicNavbar/>; 

  if (user.role === "Admin") return <AdminNavbar onLogout={handleLogout} />;
  if (user.role === "Employer") return <EmployerNavbar onLogout={handleLogout} />;
  if (user.role === "Candidate") return <CandidateNavbar onLogout={handleLogout} />;

  return null; // default fallback
};

export default Navbar;
