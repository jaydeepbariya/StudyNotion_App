import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  const [isOpen, setIsOpen] = useState(false);

  if (profileLoading || authLoading) {
    return (
      <div className="w-[100%] min-h-screen flex justify-center items-center">
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
    <div className="w-full h-full flex justify-center items-start mx-auto relative">
      <button className="absolute top-5 left-3 hidden max-md:block" onClick={()=>setIsOpen(!isOpen)}>
        {isOpen ? <ImCross size={20}/> : <GiHamburgerMenu size={20}/>}
      </button>
      <div
        className={`min-w-[10rem] min-h-screen bg-richblack-700 max-md:${isOpen ? "block":"hidden"}`}
      >

        <Sidebar />
      </div>

      <div className="min-w-[calc(100vw-10rem)] min-h-screen flex justify-end items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
