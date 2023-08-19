import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { createRating } from '../../services/operations/courseService';

const CourseReviewModal = ({ setReviewModal }) => {
  
 const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state)=> state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    useEffect(()=> {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    },[])

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    const onSubmit = async(data) => {
        await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    }

  return (
    <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <div className='flex flex-col items-between'>
            {/* Modal header */}
            <div className='gap-x-12 my-4'>
                <p className='text-center text-2xl font-bold'>Add Review</p>
                  <button 
                      className='mx-auto px-2 py-1 rounded-md bg-yellow-200 text-richblack-900'
                onClick={() => setReviewModal(false)}
                >
                    Close
                </button>
            </div>

            {/* Modal Body */}
            <div className='flex flex-col gap-y-6'>

                <div className='flex justify-center items-center gap-x-4 my-4'>
                    <img 
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square  w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-3 flex flex-col items-center'>

                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div>
                        <label htmlFor='courseExperience'>
                            Add Your Experience*
                        </label>
                        <textarea 
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='form-style min-h-[130px] w-full'
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div>
                        <button
                        onClick={() => setReviewModal(false)}
                        >
                            Cancel
              </button>
              
                        <button type='submit'>Save</button>
                    </div>


                </form>

            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal