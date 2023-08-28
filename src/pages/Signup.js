import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import signupImg from "../assets/Images/signup.webp";
import frame from "../assets/Images/frame.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, sendotp, signup } from "../services/operations/authService";
import { useNavigate } from "react-router-dom";
import { addSignupData, setLoading } from "../slice/authSlice";
import { TailSpin } from "react-loader-spinner";

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    dispatch(addSignupData(signupData));
    dispatch(sendOtp(signupData.email, navigate));
    setLoading(false);

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

  if(loading){
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <TailSpin
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="3"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />

    <p>Sending OTP....</p>
      </div>
    )
  }

  return (
    <div className="w-11/12 min-h-max mx-auto flex justify-center items-center mb-12">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className=" mt-6 flex flex-col justify-center items-center">
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
                  First Name <sup className="text-red">*</sup>
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
                  Last Name <sup className="text-red">*</sup>
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
                Email <sup className="text-red">*</sup>
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
                  Password <sup className="text-red">*</sup>
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
                  <sup className="text-red">*</sup>
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

      <div className="w-[40%] relative">
        <img src={signupImg} className="absolute top-5 left-5 -z-2 w-[400px]" alt="signup pic"/>
        <img src={frame} alt="sign up frame" className="w-[400px]"/>
      </div>
    </div>
  );
};

export default Signup;
