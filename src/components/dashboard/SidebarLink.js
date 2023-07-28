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
      className={`${
        matchRoute(link.path)
          ? "bg-yellow-400 text-richblack-900"
          : "bg-transparent"
      } px-2 py-1`}
    >
      <div className="flex gap-x-3">
        <span>{link.name}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
