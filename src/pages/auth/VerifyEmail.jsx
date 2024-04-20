import React from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../services/operations/authService";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData } = useSelector((state) => state.auth);

  const registerUser = () => {
    dispatch(signup(signupData, otp, navigate));
  };

  return (
    <div className="w-[100%] min-h-screen flex justify-center items-center">
      <div className="w-[50%] min-h-[300px] flex justify-center items-center flex-col mt-10">
        <p className="font-bold text-2xl font-inter mt-6 mb-3">Verify Email</p>
        <p className="text-lg font-inter mt-3">
          A verification code has been sent on your email
        </p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{ padding: "20px" }}
          className="w-[48px] lg:w-[60px] p-4 border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
        />

        <button
          className="px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md"
          onClick={() => registerUser()}
        >
          Register
        </button>

        <div className="w-[100%] flex justify-start items-center mt-2">
          <button className="flex items-center gap-x-3">
            <BsArrowBarLeft />
            <Link to={"/login"}>Back To Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
