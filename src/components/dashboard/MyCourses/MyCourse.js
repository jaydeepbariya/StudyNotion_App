import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {fetchInstructorCourses} from '../../../services/operations/courseService';
import CourseTable from './CourseTable';


const MyCourse = () => {

    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const fetchCourses = async ()=>{
        const result = await fetchInstructorCourses(token);

        if(result) {
            setCourses(result);
        }
    }

    useEffect(()=>{
        fetchCourses();
    },[]);

  return (
    <div className='w-11/12 mx-auto bg-richblack-600 p-4 rounded-md my-6'>
        <div className='flex justify-between items-start'>
            <p className='text-2xl font-semibold font-inter text-richblack-800'>My Courses</p>
            <button onClick={()=>navigate("/dashboard/add-course")} className='px-2 py-1 rounded-md bg-yellow-50 text-richblack-800 hover:scale-95'>Add Course</button>
        </div>
        
        <div className='mt-10'>
        <CourseTable courses={courses} setCourses={setCourses}/>
        </div>
    </div>
  )
}

export default MyCourse