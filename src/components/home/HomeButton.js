import React from 'react'
import { Link } from 'react-router-dom'

const HomeButton = ({text, active, link}) => {
  return (
    <div className={`min-w-[100px] text-center font-inter px-4 py-2 ${active===true ? "bg-yellow-300 text-richblack-800":"bg-richblack-700 text-richblack-300"} rounded-md hover:scale-95 active:shadow-md active:shadow-white`}>
        <Link to={link}>{text}</Link>
    </div>
  )
}

export default HomeButton