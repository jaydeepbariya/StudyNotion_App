import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import signupImg from "../../assets/Images/signup.webp";
import frame from "../../assets/Images/frame.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../services/operations/authService";
import { useNavigate } from "react-router-dom";
import { addSignupData } from "../../slice/authSlice";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password", "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(addSignupData(data));
    dispatch(sendOtp(data.email, navigate));
    setLoading(false);
    reset();
  };

  if (loading) {
    return (
      <div className="w-full min-h-max flex flex-col justify-center items-center">
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
    );
  }

  return (
    <div className="w-11/12 min-h-max mx-auto flex justify-center items-center mb-8">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className=" mt-6 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold mb-5">Welcome Back</p>
          <p className="text-lg text-richblack-400 font-semibold my-5">
            Discover your passion{" "}
            <span className="italic font-edu-sa text-blue-400">
              Be Unstoppable
            </span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex gap-x-4">
              <div className="flex flex-col my-4">
                <label htmlFor="firstName" className="mb-3">
                  First Name <sup className="text-red">*</sup>
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  className="px-2 py-1 outline-none border-none text-black"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col my-4">
                <label htmlFor="lastName" className="mb-3">
                  Last Name <sup className="text-red">*</sup>
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  className="px-2 py-1 outline-none border-none text-black"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="email" className="mb-3">
                Email <sup className="text-red">*</sup>
              </label>
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className="px-2 py-1 outline-none border-none text-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col my-4">
              <label htmlFor="role" className="mb-3">
                Account Type <sup className="text-red">*</sup>
              </label>
              <select
                id="role"
                {...register("accountType", {
                  required: "Account Type is required",
                })}
                className="px-2 py-1 outline-none border-none text-black"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-sm">
                  {errors.accountType.message}
                </p>
              )}
            </div>

            <div className="flex gap-x-4">
              <div className="flex flex-col my-4 relative">
                <label htmlFor="password" className="mb-3">
                  Password <sup className="text-red">*</sup>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 5,
                      message: "Password must be at least 5 characters",
                    },
                  })}
                  className="px-2 py-1 outline-none border-none text-black"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
                <div
                  className="absolute right-2 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
              </div>

              <div className="flex flex-col my-4 relative">
                <label htmlFor="confirmPassword" className="mb-3">
                  Confirm Password <sup className="text-red">*</sup>
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="px-2 py-1 outline-none border-none text-black"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
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

      <div className="w-[40%] max-md:hidden relative">
        <img
          src={signupImg}
          className="absolute top-5 left-5 -z-2 w-[400px]"
          alt="signup pic"
        />
        <img src={frame} alt="sign up frame" className="w-[400px]" />
      </div>
    </div>
  );
};

export default Signup;
