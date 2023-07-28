import React from 'react'
import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {sidebarLinks} from '../../data/dashboard-links';
import { logout } from '../../services/operations/authService';
import SidebarLink from './SidebarLink';

const Sidebar = () => {

  const {user, loading : profileLoading} = useSelector((state)=>state.profile);
  const {loading : authLoading} = useSelector((state)=>state.auth); 

  const dispatch = useDispatch();
  const navigate = useNavigate();


  if (profileLoading || authLoading) {
    return (
      <div className="w-[100vw] min-h-screen flex justify-center items-center">
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
      <div className='h-[100%] flex flex-col gap-y-4 mt-6'>
        {
          sidebarLinks.map((link, index)=>{
             return (
                
                  ( link.type && link.type !== user.accountType) 
                  ?
                  (null)
                  :
                  (<SidebarLink key={index} link={link} iconName={link.icon}/>)
                
             )
          })
        }

        <div className='h-[1px] bg-richblack-400 w-[80%] mx-auto my-6'></div>

        <SidebarLink link={{name:"Settings", path:"/dashboard/settings", icon: "VscSettingsGear"}}/>
    
        <button
            onClick={()=>dispatch(logout(navigate))}
            className="text-left ml-2 cursor-pointer"
          >
            Log Out
        </button>
    </div>
  )
}
 
export default Sidebar