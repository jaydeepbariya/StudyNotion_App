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
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [subLinks, setSubLinks] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative flex justify-around items-center py-3 border-b-[1px] border-richblack-500 bg-richblack-800">
      <button
        className="absolute top-5 right-5 hidden max-md:block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ImCross size={25} /> : <GiHamburgerMenu size={25} />}
      </button>
      <div className="w-11/12 flex justify-around items-center max-md:flex-col">
        <Link to={"/"}>
          <img
            src={navbarLogo}
            className="w-[150px] h-[30px]"
            alt="logo navbar"
          />
        </Link>

        <ul
          className={`flex items-center justify-center gap-4 max-md:flex-col max-md:my-6 max-md:${
            isOpen ? "block" : "hidden"
          }`}
        >
          {NavbarLinks.map((navLink, index) => {
            return navLink?.title !== "Catalog" ? (
              <li
                key={index}
                className={` ${
                  matchRoute(navLink.path)
                    ? "text-yellow-100"
                    : "text-richblack-200"
                }`}
              >
                <Link to={navLink.path}>{navLink.title}</Link>
              </li>
            ) : (
              <div className="group flex items-center gap-x-2 cursor-pointer relative">
                <p>Catalog</p>
                <BsArrowDown />

                <div className="min-w-max min-h-min invisible absolute bottom-0 top-[100%] flex flex-col rounded-md bg-richblack-5 p-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                  {subLinks?.map((subLink, index) => {
                    return (
                      <li
                        className="p-2 rounded-md hover:bg-richblack-500"
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
            );
          })}
        </ul>

        {/* Buttons on Navbar */}
        <div
          className={`flex gap-x-4 justify-center items-center max-md:gap-6 max-md:${
            isOpen ? "block" : "hidden"
          }`}
        >
          {user && user?.accountType !== USER_ROLES.INSTRUCTOR && (
            <Link to={"/dashboard/cart"}>
              <FaShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="bg-richblack-700 px-3 py-1 rounded-md outline outline-[2px] outline-caribbeangreen-300 active:outline-white active:outline-[2px] hover:outline-white transition-all duration-200">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="bg-richblack-700 px-3 py-1 rounded-md outline outline-[2px] outline-caribbeangreen-300 active:outline-white active:outline-[2px] hover:outline-white transition-all duration-200">
                Signup
              </button>
            </Link>
          )}
          {token !== null && (
            <div className="flex justify-center items-center gap-6">
              <Link to={"/dashboard/my-profile"}>
                <img
                  src={user.image}
                  width={"30px"}
                  height={"30px"}
                  alt="user's pic"
                />
              </Link>

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
