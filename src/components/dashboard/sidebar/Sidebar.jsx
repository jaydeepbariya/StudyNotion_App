import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authService";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (profileLoading || authLoading) {
    return (
      <div className="w-[100vw] min-h-full flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="mt-4">
        {sidebarLinks.map((link, index) => {
          return (
            <div key={index}>
              {( link.type === user.accountType || link.type === null ) ? (
                <SidebarLink link={link} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="h-[2px] bg-richblack-600 w-[80%] mx-auto my-4"></div>

      <SidebarLink
        link={{
          name: "Settings",
          path: "/dashboard/settings",
          icon: "VscSettingsGear",
        }}
      />

      <button
        onClick={() => dispatch(logout(navigate))}
        className="my-6 w-[80%] mx-auto px-4 py-2 rounded-md text-center bg-richblack-400  hover:outline hover:outline-white hover:outline-[2px] transition-all duration-200"
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
