import { NavLink } from "react-router-dom";

export const NavItemMobile = ({ to, icon, text, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center justify-center text-center space-x-2 py-2 ${
          isActive ? "text-yellow-400" : "text-white"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};
