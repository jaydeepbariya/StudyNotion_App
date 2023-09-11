import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath(location.pathname, route);
  };
  
  return (
    <NavLink
      to={link.path}
      className={`w-[100%] h-[30px] flex flex-col justify-center items-center ${
        matchRoute(link.path)
          ? "bg-yellow-400 text-richBlack-900"
          : "bg-transparent"
      } px-2 py-1`}
    >
        <span>{link.name}</span>
    </NavLink>
  );
};

export default SidebarLink;
