import React from "react";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link }) => {
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath(location.pathname, route);
  };

  return (
    <NavLink
      to={link.path}
      className={`mx-auto my-4 w-[90%] rounded-md flex flex-col justify-center items-center ${
        matchRoute(link.path)
          ? "bg-yellow-400 text-richBlack-900"
          : "bg-transparent"
      } px-4 py-2 hover:bg-richblack-700 hover:text-white transition-all duration-200`}
    >
      <span>{link.name}</span>
    </NavLink>
  );
};

export default SidebarLink;
