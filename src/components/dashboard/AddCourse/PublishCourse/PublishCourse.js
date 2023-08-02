import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import {resetCourseState, setStep} from '../../../../slice/courseSlice';
import { useEffect } from 'react';
import {COURSE_STATUS} from '../../../../util/constants';
import { useNavigate } from 'react-router-dom';
import {editCourseDetails} from '../../../../services/operations/courseService';

const PublishCourse = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors}
  } = useForm();

  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue('public', true);
    }
  },[]);

  const goToCourses = ()=>{
    dispatch(resetCourseState());
    navigate("/my-courses");
  }

  const handleCoursePublish = async ()=>{
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues('public')===true || 
      course?.status === COURSE_STATUS.DRAFT && getValues('public')===false ){
        goToCourses();
        return;
      }  
    

    const formData = new FormData();

    const courseStatus = getValues('public') ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;

    formData.append("status", courseStatus);
    formData.append("courseId", course._id);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if(result){
      goToCourses();
    }
    setLoading(false);
  }

  const onSubmit = (data) => {
      handleCoursePublish();
  }

  const goBack = ()=>{
    dispatch(setStep(2));
  }

  return (
    <div className='mt-10 rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>
        <p className='text-2xl font-semibold text-center my-6'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center gap-x-6 my-5'>
            <label htmlFor='public'>Make this course public</label>
            <input 
              type='checkbox'
              id="public"
              {...register("public")}
              className='w-[25px] h-[25px]'
              />
          </div>

          <div className='flex flex-col items-center gap-x-6 my-5'>
            <button
              type='button'
              disabled={loading}
              onClick={goBack}
              className='px-2 py-1 rounded-md bg-richblack-200 text-richblack-900'
              >
              Back
            </button>

            <button
              type='submit'
              disabled={loading}
              className='mt-6 px-2 py-1 rounded-md bg-yellow-50 text-richblack-900'
              >
              Save Changes
            </button>
          </div>
        </form>
    </div>
  )
}

export default PublishCourse