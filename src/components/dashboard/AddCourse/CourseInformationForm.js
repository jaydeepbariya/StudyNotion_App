import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../services/operations/courseService';
import { useForm } from 'react-hook-form';
import RequirementField from './RequirementField';
import { setCourse, setStep } from '../../../slice/courseSlice';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../util/constants';
import ChipInput from './ChipInput';
import Upload from '../Upload';

const CourseInformationForm = () => {
  
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();
  
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [ loading, setLoading ] = useState(false);
  const [ courseCategories, setCourseCategories ]= useState([]);



  const fetchCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories?.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);  

    if (editCourse) {
      setValue('courseTitle', course.courseName);
      setValue('courseShortDesc', course.courseDescription);
      setValue('coursePrice', course.price);
      setValue('courseTags', course.tag);
      console.log(course);
      setValue('courseBenefits', course.whatYouWillLearn);
      setValue('courseCategory', course.category._id);
      setValue('courseRequirements', course.instructions);
      console.log(course.instructions);
      setValue('courseImage', course.thumbnail);
    }
  }

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.courseTitle !== course.courseName || 
      currentValues.courseShortDesc !== course.courseDescription || 
      currentValues.coursePrice !== course.price || 
      currentValues.courseTags.toString() !== course.tag.toString() || 
      currentValues.courseBenefits !== course.whatYouWillLearn || 
      currentValues.courseCategory !== course.category._id ||
      currentValues.courseImage !== course.thumbnail || 
      currentValues.courseRequirements.toString() !== course.instructions.toString()
      ) {
      return true;
    } else {
      return false;
    }
  }

  const submitCourse = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = FormData();
      
        formData.append('courseId', course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory !== course.category._id) {
          formData.append("category", data.courseCategory.name);
        }

        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements));
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", );
          console.log("course tags....", JSON.stringify(data.courseTags));

        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        setLoading(true);
        const response = await editCourseDetails(formData, token);
        setLoading(false);
        if (response) {
          dispatch(setStep(2));
          dispatch(setCourse(response));
        }
      } else {
        toast.error('No Changes Yet');
      }
      return;
    }
    
    //create new course
    const newCourseForm = new FormData();

    newCourseForm.append("courseName", data?.courseTitle);
    newCourseForm.append("courseDescription", data?.courseShortDesc);
    newCourseForm.append("price", data?.coursePrice);
    newCourseForm.append("whatYouWillLearn", data?.courseBenefits);
    newCourseForm.append("category", data?.courseCategory);
    newCourseForm.append("instructions", JSON.stringify(data?.courseRequirements));
    newCourseForm.append("status", COURSE_STATUS.DRAFT);
    newCourseForm.append("thumbnail", data?.courseImage);
    newCourseForm.append("tag", JSON.stringify(data?.courseTags));

    setLoading(true)
    const result = await addCourseDetails(newCourseForm, token)
    console.log("Result...", result);
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories();
  },[]);

  return (
    <form onSubmit={handleSubmit(submitCourse)}
      className='rounded-md border-richBlack-700 p-6 space-y-8'
    >
      <div className='flex flex-col gap-y-3 my-4'>
        <label htmlFor='courseTitle'>Course title <sup>*</sup></label>
        <input 
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", { required: true })}
          className='w-full text-black outline-none border-none focus:shadow-md focus:shadow-richBlack-200'
        />
        {
          errors.courseTitle && (
            <span>Course Title Required</span>
          )
        }
      </div>

      <div className='flex flex-col gap-y-3 my-4'>
        <label htmlFor='courseShortDesc'>Course Short Description <sup>*</sup></label>
        <textarea 
          id='courseShortDesc'
          placeholder='Enter Course Description'
          {...register("courseShortDesc", { required: true })}
          className='w-full text-black outline-none border-none focus:shadow-md focus:shadow-richBlack-200'
          rows={8}
        />
                {
          errors.courseShortDesc && (
            <span>Course Short Description Required</span>
          )
        }
      </div>

      <div className='flex flex-col gap-y-3 my-4'>
        <label htmlFor='coursePrice'>Course Price {"(Rs)"} <sup>*</sup></label>
        <input 
          type='number'
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice", { required: true })}
          className='w-full text-black outline-none border-none focus:shadow-md focus:shadow-richBlack-200'
        />
                {
          errors.courseShortDesc && (
            <span>Course Short Description Required</span>
          )
        }
      </div>

      <div className='flex flex-col gap-y-3 my-4'>
        <label htmlFor='courseCategory'>Course Category <sup>*</sup></label>
        <select 
          id='courseCategory'
          {...register("courseCategory", { required: true })}
          className='w-full text-black outline-none border-none focus:shadow-md focus:shadow-richBlack-200'
        >
          <option value={null} selected={true}>Select Category</option>
          {
            courseCategories?.map((category, index) => {
              return (
                <option value={category._id}>{category?.name}</option>
              )
            })
          }
        </select>
                {
          errors.courseShortDesc && (
            <span>Course Short Description Required</span>
          )
        }
      </div>

      <div className='flex flex-col gap-y-3 my-4'>
        <ChipInput 
          label="Tags"
          name="courseTags"
          placeholder="Enter tag and press enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </div>

      <div className='flex flex-col gap-y-3 my-4'>
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      </div>

      <div className='flex flex-col gap-y-3 my-4'>
        <label htmlFor='courseBenefits'>Course Benefits <sup>*</sup></label>
        <textarea 
          id='courseBenefits'
          placeholder='Enter Course Benefits'
          {...register("courseBenefits", { required: true })}
          className='w-full text-black outline-none border-none focus:shadow-md focus:shadow-richBlack-200'
          rows={8}
        />
                {
          errors.courseBenefits && (
            <span>Course Benefits Required</span>
          )
        }
      </div>

      <RequirementField 
        name="courseRequirements"
        label="Requirement/Instructions"
        register={register}
        errors={errors}
        getValues={getValues}
        setValue={setValue}
      />

      <div>
        {
        editCourse && (
        <button
          onClick={()=>dispatch(setStep(2))}
        >
          Continue without Saving
        </button>
        )
        }

        <button type='submit' className='px-2 py-1 rounded-md bg-yellow-200 text-black hover:scale-95 active:shadow-sm active:shadow-white'>{ !editCourse ? "Next" : "Save Changes"}</button>
      </div>
    </form>
  )
}

export default CourseInformationForm