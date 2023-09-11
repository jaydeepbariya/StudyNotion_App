import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../../services/operations/courseService';
import { setCourse, setEditCourse } from '../../../slice/courseSlice';
import { toast } from 'react-hot-toast';
import { TailSpin } from 'react-loader-spinner';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();

    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);

    const {token} = useSelector((state)=>state.auth);

    const fetchCourse = async () =>{
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId, token);

        if(result?.courseDetails){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }

        setLoading(false);
    }
    useEffect(()=>{
        fetchCourse();
    },[]);

    if(loading===true){
        return (
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
  
            <p className="text-center">Loading Course Data...</p>
          </div>
        )
    }

  return (
        <div className="w-11/12 min-h-screen flex flex-col gap-x-12">
            <p className='text-2xl text-richBlack-400 mx-auto my-6'>Edit Course</p>

            <div className='min-w-screen flex flex-col justify-center items-center'>
                {
                    course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                }
            </div>
        </div>

  )
}

export default EditCourse