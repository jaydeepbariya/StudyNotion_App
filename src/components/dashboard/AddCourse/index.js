import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
    
  return (
    <div className="w-[100%] min-h-screen flex flex-col gap-x-12">
        <p className='text-2xl text-richblack-400 text-center my-6'>Add Course</p>
            <div>
            <RenderSteps />      
            </div>
    </div>
  )
}

export default AddCourse