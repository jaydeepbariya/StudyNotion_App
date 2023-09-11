import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
    
  return (
    <div className="w-11/12 min-h-screen flex flex-col gap-x-12">
        <p className='text-2xl text-richBlack-400 mx-auto my-6'>Add Course</p>
            <div>
            <RenderSteps />      
            </div>
    </div>
  )
}

export default AddCourse