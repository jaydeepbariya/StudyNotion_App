import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../../services/apiConnector";
import { profile } from "../../services/apis";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [changePasswordData, setChangePasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (e, field) => {
    setChangePasswordData({ ...changePasswordData, [field]: e.target.value });
  };

  const changeMyPassword = async (e) => {
    const toastId = toast.loading("Changing Password...");
    try {
      const response = await apiConnector(
        "POST",
        profile.CHANGE_PASSWORD_API,
        changePasswordData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (response.data.success) {
        toast.dismiss(toastId);
        toast.success(response.data.message);
      } else {
        toast.dismiss(toastId);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log("CHANGE PASSWORD...", error.message);
    }
  };

  return (
    <div className="w-full mx-auto my-12 flex flex-col text-black bg-richblack-600 p-4 rounded-md">
      <div className="w-[40%] mx-auto flex flex-col gap-x-4">
        <div className="flex flex-col my-4 relative">
          <label htmlFor="oldPassword" className="mb-3">
            Old Password <sup className="text-caribbeangreen-500">*</sup>
          </label>
          <input
            type={`${showOldPassword ? "text" : "password"}`}
            value={changePasswordData.oldPassword}
            onChange={(e) => handleChange(e, "oldPassword")}
            className="px-2 py-1 outline-none border-none text-black"
          />

          <div
            className="absolute right-2 top-3"
            onClick={() => setShowOldPassword(!showOldPassword)}
          >
            {showOldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>

        <div className="flex flex-col my-4 relative">
          <label htmlFor="newPassword" className="mb-3">
            New Password <sup className="text-caribbeangreen-500">*</sup>
          </label>
          <input
            type={`${showNewPassword ? "text" : "password"}`}
            value={changePasswordData.newPassword}
            onChange={(e) => handleChange(e, "newPassword")}
            className="px-2 py-1 outline-none border-none text-black"
          />

          <div
            className="absolute right-2 top-3"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
        <div className="flex flex-col my-4 relative">
          <label htmlFor="newConfirmPassword" className="mb-3">
            Confirm New Password{" "}
            <sup className="text-caribbeangreen-500">*</sup>
          </label>
          <input
            type={`${showConfirmNewPassword ? "text" : "password"}`}
            value={changePasswordData.confirmNewPassword}
            onChange={(e) => handleChange(e, "confirmNewPassword")}
            className="px-2 py-1 outline-none border-none text-black"
          />

          <div
            className="absolute right-2 top-3"
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
          >
            {showConfirmNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </div>
        </div>
      </div>

      <button
        className="w-[40%] mx-auto px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md"
        onClick={() => changeMyPassword()}
      >
        Reset Password
      </button>
    </div>
  );
};

export default ChangePassword;
