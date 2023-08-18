import React, { useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import navbarLogo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { USER_ROLES } from "../../util/constants";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { logout } from "../../services/operations/authService";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);

  const getCategories = async () => {
    const response = await apiConnector("GET", categories.CATEGORIES_API);
    setSubLinks(response.data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const matchRoute = (path) => {
    return matchPath(location.pathname.split("/").at(-1), path);
  };

  return (
    <div className="flex justify-around h-14 border-b-[1px] border-richblack-500 bg-richblack-800">
      <div className="w-11/12 flex justify-around items-center">
        <Link to={"/"}>
          <img src={navbarLogo} className="w-[150px] h-[30px]" />
        </Link>

        <ul className="flex items-center justify-center gap-x-6">
          {NavbarLinks.map((navLink, index) => {
            return (
              navLink?.title !== "Catalog" 
              ? 
              (
              <li
                className={`${
                  matchRoute(navLink.path)
                    ? "text-yellow-100"
                    : "text-richblack-200"
                }`}
              >
                <Link to={navLink.path}>{navLink.title}</Link>
              </li>
              ) 
              : 
              (
              <div className="group flex items-center gap-x-2 cursor-pointer relative">
                <p>Catalog</p>
                <BsArrowDown />

                <div className="min-w-max min-h-min invisible absolute bottom-0 top-[100%] flex flex-col rounded-md bg-richblack-5 p-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {subLinks?.map((subLink, index) => {
                    return (
                      <li
                        className="hover:bg-richblack-300 p-2 rounded-md"
                        key={index}
                      >
                        <Link to={`/catalog/${subLink._id}`}>
                          {subLink.name}
                        </Link>
                      </li>
                    );
                  })}
                </div>
              </div>
            )
            )
          })}
        </ul>

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType !== USER_ROLES.INSTRUCTOR && (
            <Link to={"/dashboard/cart"} className="relative">
              <FaShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="bg-richblack-700 px-3 py-1 rounded-md active:shadow-white active:shadow-sm">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="bg-richblack-700 px-3 py-1 rounded-md active:shadow-white active:shadow-sm">
                Signup
              </button>
            </Link>
          )}
          {token !== null && (
            <div className="flex items-center gap-x-4">
              <img src={user.image} width={"30px"} height={"30px"} />

              <Link to={"/dashboard/my-profile"}>
                <button className="bg-richblack-600 px-3 py-1 rounded-md active:shadow-white active:shadow-sm">
                  Dashboard
                </button>
              </Link>
              <Link to={"/"}>
                <button
                  className="bg-richblack-300 text-richblack-800 px-3 py-1 rounded-md active:shadow-white active:shadow-sm"
                  onClick={() => dispatch(logout(navigate))}
                >
                  Log Out
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
