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
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();


    const setCourseSpecificDetails = async () => {
        const courseDetails = await getFullDetailsOfCourse(courseId, token);
        dispatch(setCourseSectionData(courseDetails.courseContent));
        dispatch(setEntireCourseData(courseDetails.courseDetails));
        dispatch(setCompletedLectures(courseDetails.completedVideos));

        let lectures = 0;

        courseDetails?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length;
        })

        dispatch(setTotalNoOfLectures(lectures));
    }

    useEffect(() => {
        setCourseSpecificDetails();
    }, []);
  return (
    <>
      <div>
        <div>
          <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div>
          <Outlet />
        </div>
      </div>
      
     {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
