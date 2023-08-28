import React from 'react'
import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { BsArrowBarLeft } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../services/operations/authService';
const UpdatePassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [resetPasswordData, setResetPasswordData] = useState({
      password : "",
      confirmPassword : "",
      token : params.token 
    });
  
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const handleChange = (e,field)=>{
      setResetPasswordData({...resetPasswordData, [field]:e.target.value});
    }
  
    const resetMyPassword = ()=>{
       dispatch(resetPassword(resetPasswordData, navigate));
    }
  
    return (
      <div className='w-11/12 mx-auto min-h-screen flex justify-center items-center'>
          <div className='w-[50%] max-md:w-full min-h-[300px] max-h-[600px] flex flex-col justify-center items-center my-6'>
              <p className='font-bold text-2xl font-inter mt-6 mb-3'>Reset Password</p>
              <p className='text-lg font-inter mt-3'>Almost done. Please type your new password and confirm the same.</p>
  
              <div className="w-[60%] flex flex-col gap-x-4">
                <div className="flex flex-col my-4 relative">
                  <label htmlFor="password" className="mb-3">
                    Password <sup className="text-caribbeangreen-500">*</sup>
                  </label>
                  <input
                    type={`${showPassword ? "text" : "password"}`}
                    value={resetPasswordData.password}
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
                    value={resetPasswordData.confirmPassword}
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
  
              <button className='px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md'
                  onClick={()=>resetMyPassword()}
                  >
                  Reset Password               
              </button>
  
  
              <div className='w-[100%] flex justify-start items-center mt-2'>
                  <button className='flex items-center gap-x-3'>
                  <BsArrowBarLeft />
                  <Link to={"/login"}>Back To Login</Link>
                  </button>
              </div>
  
          </div>
      </div>
    )
}

export default UpdatePassword