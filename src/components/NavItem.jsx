import { NavLink } from "react-router-dom";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick} // Add this line
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
      ${isActive
        ? "text-red-600 border-b-2 border-red-500 bg-red-50"
        : "text-gray-700 hover:text-red-600 hover:bg-red-50 border-b-2 border-transparent"}`
    }
  >
    {children}
  </NavLink>
);

export default NavItem;
