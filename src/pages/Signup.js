import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import signupImg from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, sendotp, signup } from "../services/operations/authService";
import { useNavigate } from "react-router-dom";
import { addSignupData } from "../slice/authSlice";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType : "Student"
  });

  const [role, setRole] = useState("Student");

  const handleRole = (role) => {
    setRole(role);
    setSignupData({ ...signupData, ["accountType"] : role });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e, field) => {
    setSignupData({ ...signupData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSignupData(signupData));
    dispatch(sendOtp(signupData.email, navigate));

  };

  const resetForm = ()=>{
    setSignupData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
  }

  return (
    <div className="w-[100%] min-h-screen mx-auto flex justify-center ">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className="w-full mt-6 flex flex-col justify-center">
          <p className="text-4xl font-bold my-5">Welcome Back</p>
          <p className="text-lg text-richblack-400 font-semibold my-5">
            Discover your passion{" "}
            <span className="italic font-edu-sa text-blue-400">
              Be Unstoppable
            </span>
          </p>

          <div className="bg-richblack-500 px-3 py-2 rounded-full flex justify-around gap-x-4">
            <button
              onClick={() => handleRole("Student")}
              className={`px-2 py-1 rounded-lg ${
                role === "Student"
                  ? "bg-richblack-800 text-richblack-50"
                  : "bg-richblack-600 text-richblack-800"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => handleRole("Instructor")}
              className={`px-2 py-1 rounded-lg ${
                role === "Instructor"
                  ? "bg-richblack-800 text-richblack-50"
                  : "bg-richblack-600 text-richblack-800"
              }`}
            >
              Instructor
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex gap-x-4">
              <div className="flex flex-col my-4">
                <label htmlFor="firstName" className="mb-3">
                  First Name <sup className="text-caribbeangreen-500">*</sup>
                </label>
                <input
                  type={"text"}
                  value={signupData.firstName}
                  onChange={(e) => handleChange(e, "firstName")}
                  className="px-2 py-1 outline-none border-none text-black"
                />
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="lastName" className="mb-3">
                  Last Name <sup className="text-caribbeangreen-500">*</sup>
                </label>
                <input
                  type={"text"}
                  value={signupData.lastName}
                  onChange={(e) => handleChange(e, "lastName")}
                  className="px-2 py-1 outline-none border-none text-black"
                />
              </div>
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="email" className="mb-3">
                Email <sup className="text-caribbeangreen-500">*</sup>
              </label>
              <input
                type={"text"}
                value={signupData.email}
                onChange={(e) => handleChange(e, "email")}
                className="px-2 py-1 outline-none border-none text-black"
              />
            </div>

            <div className="flex gap-x-4">
              <div className="flex flex-col my-4 relative">
                <label htmlFor="password" className="mb-3">
                  Password <sup className="text-caribbeangreen-500">*</sup>
                </label>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  value={signupData.password}
                  onChange={(e) => handleChange(e, "password")}
                  className="px-2 py-1 outline-none border-none text-black"
                />

                <div
                  className="absolute right-2 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>

              <div className="flex flex-col my-4 relative">
                <label htmlFor="password" className="mb-3">
                  Confirm Password{" "}
                  <sup className="text-caribbeangreen-500">*</sup>
                </label>
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  value={signupData.confirmPassword}
                  onChange={(e) => handleChange(e, "confirmPassword")}
                  className="px-2 py-1 outline-none border-none text-black"
                />

                <div
                  className="absolute right-2 top-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-yellow-400 text-black mt-6 hover:scale-95 active:shadow-sm"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <div className="w-[50%] relative mt-24">
        <img src={signupImg} className="absolute top-5 left-5 -z-2" />
        <img src={frame} />
      </div>
    </div>
  );
};

export default Signup;
