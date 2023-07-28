import React from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import { signup } from "../services/operations/authService";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {signupData} = useSelector((state)=>state.auth);

  const [loading, setLoading] = useState(false);

  const registerUser = () => {
    setLoading(true);
    dispatch(signup(signupData, otp ,navigate));
    setLoading(false);
  };

  return (
    <div className="w-[100%] min-h-screen flex justify-center items-center">
      {loading === true ? (
        <div>
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
      ) : (
        <div className="w-[50%] min-h-[300px] flex flex-col justify-center items-center my-6">
          <p className="font-bold text-2xl font-inter mt-6 mb-3">
            Verify Email
          </p>
          <p className="text-lg font-inter mt-3">
            A verification code has been sent on your email
          </p>

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span> - </span>}
            renderInput={(props) => <input {...props} className="bg-green-100"/>}
            shouldAutoFocus={true}
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
      )}
    </div>
  );
};

export default VerifyEmail;
