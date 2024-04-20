import React from 'react'
import { BsArrowBarLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ResendEmail = () => {

  return (
    <div className="w-[100%] min-h-screen flex justify-center items-center">
      <div className="w-[40%] min-h-[300px] flex flex-col justify-center items-center my-6">
        <p className="font-bold text-2xl font-inter mt-6 mb-3">
          Resend Email
        </p>
        <p className="text-md font-inter mt-3">
          We have sent the reset email on your given email
        </p>

        <button className="px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md">
          Resend Email
        </button>

        <div className="w-[100%] flex justify-start items-center">
          <button className="flex items-center gap-x-3">
            <BsArrowBarLeft />
            <Link to={"/login"}>Back To Login</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResendEmail