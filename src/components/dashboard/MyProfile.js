import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-[100%] min-h-screen flex flex-col">
      <h1 className="text-2xl my-6 mx-auto">My Profile</h1>

      <div className="relative w-[70%] mx-auto flex justify-center items-center gap-x-12 my-6 bg-richblack-700 p-4 rounded-lg">
        <div className="flex items-center justify-around gap-4">
          <img
            src={user.image}
            alt={`image-${user.firstName}`}
            className="aspect-square w-[80px] rounded-full object-cover"
          />

          <div className="flex flex-col">
            <p>{user?.firstName + "   " + user?.lastName}</p>
            <p>{user?.email}</p>
          </div>

          <div
            className="absolute top-5 right-5 px-2 py-1 rounded-md bg-yellow-200 text-richblack-900 hover:scale-95 active:shadow-sm active:shadow-white"
            onClick={() => navigate("/dashboard/settings")}
          >
            <span>Edit Profile</span>
          </div>
        </div>
      </div>

      <div className="w-[70%] mx-auto my-6 flex justify-center items-center gap-x-32 bg-richblack-700 p-4 rounded-lg relative">
        <div className="flex flex-col justify-center">
          <p className="font-bold">About</p>
          <p>
            {user.additionalDetails.about
              ? user.additionalDetails.about
              : "Please Enter About Yourself"}
          </p>
        </div>

        <div
          className="absolute top-5 right-5 px-2 py-1 rounded-md bg-yellow-200 text-richblack-900 hover:scale-95 active:shadow-sm active:shadow-white"
          onClick={() => navigate("/dashboard/settings")}
        >
          <span>Edit Profile</span>
        </div>
      </div>

      <div className="w-[100%]">
        <div className="relative w-[70%] mx-auto grid grid-cols-2 grid-rows-3 gap-x-5 gap-y-5 mt-12 bg-richblack-700 p-6 rounded-lg">
          
        <div
          className="absolute top-5 right-5 px-2 py-1 rounded-md bg-yellow-200 text-richblack-900 hover:scale-95 active:shadow-sm active:shadow-white"
          onClick={() => navigate("/dashboard/settings")}
        >
          <span>Edit Profile</span>
        </div>

          <div>
            <p>First Name</p>
            <p>{user.firstName}</p>
          </div>
          <div>
            <p>Last Name</p>
            <p>{user.lastName}</p>
          </div>
          <div>
            <p>Email</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p>Gender</p>
            <p>
              {user.additionalDetails.gender
                ? user.additionalDetails.gender
                : "Add Gender"}
            </p>
          </div>
          <div>
            <p>Date Of Birth</p>
            <p>
              {user.additionalDetails.dateOfBirth
                ? user.additionalDetails.dateOfBirth
                : "Add DateOfBirth"}
            </p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>
              {user.additionalDetails.contactNumber
                ? user.additionalDetails.contactNumber
                : "Add PhoneNumber"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
