import React, { useState } from "react";
import { BsArrowBarLeft } from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../../services/operations/authService";
import { setLoading } from "../../slice/authSlice";

const ForgotPassword = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const [emailSent, setEmailSent] = useState(false);

  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div>
      {loading ? (
        <div className="min-w-full min-h-screen flex justify-center items-center gap-10">
          <TailSpin
            height="100"
            width="100"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />

          <p className="text-center">Sending Reset Password Link to Your Email Address..</p>
        </div>
      ) : (
        <div>
          {emailSent ? (
            <div className="w-11/12 min-h-screen flex justify-center items-center gap-10">
              <div className="w-[40%] max-md:w-11/12 flex flex-col justify-center items-center my-6 mx-auto">
                <p className="font-bold text-2xl font-inter mt-6 mb-3">
                  Resend Email
                </p>
                <p className="text-md font-inter mt-3">
                  We have sent the reset email on your given email
                </p>

                <button className="px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md"
                  onClick={handleSubmit}
                  >
                  Resend Email
                </button>

                <div className="w-full flex justify-center items-center">
                  <button className="flex items-center gap-x-3">
                    <BsArrowBarLeft />
                    <Link to={"/login"}>Back To Login</Link>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-11/12 min-h-screen flex justify-center items-center">
              <div className="w-[40%] max-md:w-[70%] min-h-[300px] flex flex-col justify-center items-center my-6">
                <p className="font-bold text-2xl font-inter mt-6 mb-3">
                  Reset Password
                </p>
                <p className="text-md font-inter mt-3 text-center">
                  Have no fear. We will email you instructions to reset your
                  password. If you dont have access to your email we can try
                  account recovery
                </p>

                <div className="w-full">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full flex flex-col my-2">
                  <label htmlFor="email" className="mb-3">
                    Email Address{" "}
                    <sup className="text-caribbeangreen-500">*</sup>
                  </label>
                  <input
                    type={"text"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-2 py-1 outline-none border-none text-black"
                  />
                <button
                  className="px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md"
                  type="submit"
                >
                  Reset Password
                </button>
                </form>
                </div>


                <div className="w-[100%] flex justify-start items-center">
                  <button className="flex items-center gap-x-3">
                    <BsArrowBarLeft />
                    <Link to={"/login"}>Back To Login</Link>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
