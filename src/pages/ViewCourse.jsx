import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseService";
import { setEntireCourseData,setCompletedLectures, setTotalNoOfLectures, setCourseSpecificDetails, setCourseSectionData } from '../slice/viewCourseSlice';
import CourseReviewModal from '../components/viewCourse/CourseReviewModal';
import VideoDetailsSidebar from "../components/viewCourse/VideoDetailsSidebar";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse(courseId, token);
              dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);


  return (
    <div className="w-11/12 min-h-screen mx-auto ">
        <div className="flex justify-between items-center gap-x-5">
            <VideoDetailsSidebar setReviewModal={setReviewModal} />
            <div className="w-[80%] my-4">
                <Outlet />
        </div>
        {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}

        </div>
    </div>
  )

};

export default ViewCourse;
