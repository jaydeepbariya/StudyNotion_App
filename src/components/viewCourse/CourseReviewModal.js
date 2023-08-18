import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { createRating } from '../../services/operations/courseService';

const CourseReviewModal = ({ setReviewModal }) => {
  
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  },[])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  const onSubmit = async (data) => {
    await createRating({
      courseId: courseEntireData._id,
      rating : data.courseRating,
      review : data.courseExperience
    })

    setReviewModal(false);
  }

  return (
    <div>
      <div>
        <div>
          <p>Add Review</p>
          <button onClick={setReviewModal(false)}>Close</button>
        </div>

        <div>
          <div>
            <img src={user.image} alt='user-profile' className='w-[50px] h-[50px] rounded-full' />
            
            <div>
              <p>{user.firstName} {user.lastName}</p>
              <p>Review Publically</p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
            <ReactStars
                count={5}
                onChange={(e)=>ratingChanged(e.target.value)}
                size={20}
                color2={'#ffd700'} />
              
              <div>
                <label htmlFor='courseExperience'>Course Experience</label>
                <textarea 
                  id='courseExperience'
                  placeholder='Add Your Experience Here'
                  {...register("courseExperience", {required:true})}
                />
                {
                  errors.courseExperience && (
                    <span>Please add course experience</span>
                  )
                }
              </div>
              
              <div>
                <button onClick={()=>setReviewModal(false)}>
                    Cancel
                </button>

                <button type='submit'>
                    Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal