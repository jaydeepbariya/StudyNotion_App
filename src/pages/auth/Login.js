import React from "react";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import loginImg from "../../assets/Images/login.webp";
import frame from "../../assets/Images/frame.png";
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/authService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    dispatch(login(data, navigate));
    reset();
  };

  return (
    <div className="w-11/12 max-h-[700px] mx-auto flex justify-center items-center gap-x-24 my-14">
      <div className="flex flex-col justify-start items-center">
        <div className="mt-6 flex flex-col justify-start">
          <p className="text-4xl font-bold my-5">Welcome Back</p>
          <p className="text-lg text-richblack-400 font-semibold my-5">
            Discover your passion{" "}
            <span className="italic font-edu-sa text-blue-400">
              Be Unstoppable
            </span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col my-4">
              <label htmlFor="email" className="mb-3">
                Email Address <sup className="text-red">*</sup>
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
                  pattern: {
                    value: /^[a-zA-Z0-9]*$/,
                    message: "Password must contain only letters and numbers",
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
              <Link className="mt-3 text-right" to={"/forgot-password"}>
                Forgot Password ?
              </Link>
            </div>
            <button
              type="submit"
              className="px-2 py-1 rounded-md bg-yellow-400 text-black mt-6 hover:scale-95 active:shadow-sm"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <div className="max-md:hidden relative">
        <img
          src={loginImg}
          className="absolute top-5 left-5 -z-2 w-[400px]"
          alt="img1"
        />
        <img src={frame} alt="img2" className="w-[400px]" />
      </div>
    </div>
  );
};

export default Login;
