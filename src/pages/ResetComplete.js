import React from 'react'
import { Link } from 'react-router-dom'

const ResetComplete = () => {
  return (
    <div className="w-[100%] min-h-screen flex justify-center items-center">
      <div className="w-[40%] min-h-[300px] flex flex-col justify-center items-center my-6">
        <p className="font-bold text-2xl font-inter mt-6 mb-3">
          Resend Complete!
        </p>
        <p className="text-md font-inter mt-3">
        All done! We have sent an email to confirm password change
        </p>

        <button className="px-3 py-1 rounded-md bg-yellow-400 text-black mt-4 my-2 hover:scale-95 active:shadow-white active:shadow-md">
          <Link to={"/login"}>Return to Login</Link>
        </button>

      </div>
    </div>
  )
}

export default ResetComplete