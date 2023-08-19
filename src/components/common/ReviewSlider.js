import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode, Navigation, Pagination } from 'swiper';
import ReactStars from 'react-stars';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiConnector } from '../../services/apiConnector';
import { ratingAndReviews } from '../../services/apis';

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    const getAllReviews = async () => {
        const response = await apiConnector('GET', ratingAndReviews.REVIEWS_DETAILS_API);

        const { data } = response;

        if (data?.success) {
            setReviews(data?.data);
        }

        console.log("PRINTING REVIEWS", reviews);
    }

    useEffect(() => {
        getAllReviews();
    }, []);

  return (
    <div className='w-11/12 mx-auto my-12'>
          <h1 className='text-3xl font-bold text-center'>Reviews From Learners</h1>
          
          <div className='h-[200px] flex items-center max-w-maxContent'>
              <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  loop={true}
                  freeMode={true}
                  autoplay={{
                  delay:2500
                  }}
                  modules={[FreeMode, Pagination, Autoplay]}
                  className='w-full'  
              >

                  {
                      reviews?.map((review, index) => {
                          return (
                              <SwiperSlide key={index} className='px-4 py-2 rounded-md bg-richblack-700'>
                                  <img src={ `${review?.user?.image ? review?.user?.image : "https://api.dicebear.com/5.x/initials/svg?seed="+review?.user?.firstName +" "+review?.user?.lastName}`} className='w-[40px] h-[40px] rounded-full'/>
                                  <p className='text-md font-bold'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                  <p className='text-sm'>{review?.user?.email} </p>

                                  <ReactStars 
                                      value={review?.rating}
                                      edit={false}
                                      className='my-2'
                                  />

                                  <p className='text-sm text-justify my-3'>{review?.review}</p>
                              </SwiperSlide>
                          )
                      })
                  }

            </Swiper>
          </div>
    </div>
  )
}

export default ReviewSlider