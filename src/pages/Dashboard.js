import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

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
    <div className="w-[100vw] min-h-screen flex justify-start items-start">
        <div className="min-w-[10rem] min-h-screen bg-richblack-700">
            <Sidebar />
        </div>

        <div className="min-w-[calc(100vw-10rem)] min-h-screen flex justify-center items-center">
            <Outlet />
        </div>
    </div>
  )
};

export default Dashboard;
