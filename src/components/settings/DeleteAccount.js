import React from "react";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { apiConnector } from "../../services/apiConnector";
import { profile } from "../../services/apis";
import { useSelector } from "react-redux";
import { logoutUser } from "../../slice/profileSlice";
import { logout } from "../../services/operations/authService";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {

  const {token} = useSelector((state)=>state.auth);
  const navigate = useNavigate();

  const deleteMyAccount = async () => {
    try {

      // eslint-disable-next-line no-restricted-globals
      let wantDeletion = confirm("Are You Sure ??");
      
      console.log(wantDeletion);
      if(wantDeletion){
        const response = await apiConnector("DELETE", profile.DELETE_PROFILE_API,{},{Authorization:`Bearer ${token}`});

      if (response.data.success) {
        toast.success(response.data.message);
        logout();
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    
      }else{
        return;
      }

    }catch (error) {
      console.log("DELETE ACCOUNT ERROR..", error.message);
    }  
  };

  return (
    <div className="w-full mx-auto my-12 grid grid-cols-2 max-md:grid-cols-1 gap-6 text-black bg-richblack-600 p-4 rounded-md">
      <div className="w-full flex flex-col">
        <div className="w-[50px] h-[50px] flex justify-center items-center rounded-full bg-richblack-800 my-4 mx-2">
          <MdDelete fill="white" size={30}/>
        </div>

        <div className="text-richblack-300">
          <p className="font-bold">Delete Account</p>
          <p>Would you like to delete account ?</p>
          <p>
            This account contains Paid course. You will lose of the content and
            paid amount as well.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <button
          onClick={() => deleteMyAccount()}
          className="px-2 py-1 rounded-md bg-yellow-300 hover:scale-95 active:shadow-white active:shadow-md"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
