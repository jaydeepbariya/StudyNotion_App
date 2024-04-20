import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { apiConnector } from "../../services/apiConnector";
import { profile } from "../../services/apis";
import { setUser } from "../../slice/profileSlice";

// About, Gender, DOB, contactNumber

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.profile);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { about, dateOfBirth, gender, contactNumber } = user.additionalDetails;

  const [profileData, setProfileData] = useState({
    about,
    dateOfBirth,
    gender,
    contactNumber,
  });

  const handleChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
    console.log(profileData);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Profile...");
    try {
      const response = await apiConnector("PUT", profile.UPDATE_PROFILE_API, {
        ...profileData,
        token,
      });
      if (response.data.success) {
        toast.dismiss(toastId);
        toast.success("Profile Update Successful...");
        dispatch(setUser(response.data.user));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log("Update Profile Error....", error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => updateProfile(e)}
      className="w-full mx-auto my-6 text-black bg-richblack-600 p-4 rounded-md"
    >
      <div className="p-4 grid grid-cols-2 max-md:grid-cols-1 gap-6">
        <div>
          <label htmlFor="about" className="text-richblack-300">
            About
          </label>
          <textarea
            value={profileData.about}
            onChange={(e) => handleChange(e, "about")}
            rows={7}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="gender" className="text-richblack-300">
            Gender
          </label>
          <select
            value={profileData.gender}
            onChange={(e) => handleChange(e, "gender")}
            className="w-full"
          >
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Other"}>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="text-richblack-300">
            Date Of Birth
          </label>
          <input
            type={"date"}
            value={profileData.dateOfBirth}
            onChange={(e) => handleChange(e, "dateOfBirth")}
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="phonNumber" className="text-richblack-300">
            Phone Number
          </label>
          <input
            type={"number"}
            value={profileData.contactNumber}
            onChange={(e) => handleChange(e, "contactNumber")}
            className="w-full"
          />
        </div>
      </div>
      <div className="text-center py-3">
        <button
          type="submit"
          className="px-2 py-1 bg-yellow-200 text-black active:shadow-sm active:shadow-white hover:scale-95 rounded-md"
        >
          Save Updates
        </button>
      </div>
    </form>
  );
};

export default UpdateProfile;
