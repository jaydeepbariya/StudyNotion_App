import React from 'react'
import { useSelector } from 'react-redux';
import { MdOutlineDone } from 'react-icons/md';
import CourseInformationForm from './CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm';
import PublishCourse from './PublishCourse';


const RenderSteps = () => {

    const { step } = useSelector((state) => state.course);
    
    const steps = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ];



  return (
      <div>
          <div className='w-[100%] min-w-screen flex flex-col justify-center items-center'>
          <div className='min-w-[200px] flex justify-between items-center gap-x-5'>
              {
                  steps.map((item, index) => {
                      return (
                          <div key={index} className={`min-w-[140px] min-h-[50px] rounded-full ${item.id===step ? "bg-yellow-400 text-richblack-900":"bg-richblack-600 text-richblack-50"} ${step>item.id ? "bg-caribbeangreen-400":""} flex flex-col justify-center items-center`}>
                              <p className='text-sm'>{step>item.id ? <MdOutlineDone />: item.id}</p>
                              <p className='text-sm'>{item.title}</p>
                          </div>
                      )
                  })
              }
          </div>

          {step === 1 && <CourseInformationForm />}
          {step === 2 && <CourseBuilderForm />}
          {/* {step === 3 && <PublishCourse />} */}
          
    </div>
      </div>
  )
}

export default RenderSteps