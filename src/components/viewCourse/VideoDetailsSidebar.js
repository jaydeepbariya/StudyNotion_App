import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        console.log("I am inside Add handleAddReview")
        setReviewModal(true);
    }


  return (
    <>
        <div className='w-[20%] min-h-screen bg-richblack-700 text-richblack-50'>
            {/* for buttons and headings */}
            <div className="flex flex-col justify-around items-center">
                {/* for buttons */}
                <div className="flex gap-x-4 mt-4">
                      <div 
                       className="px-2 py-1 rounded-md bg-yellow-200 text-richblack-900 hover:scale-95"
                    onClick={()=> {
                        navigate("/dashboard/enrolled-courses")
                    }}
                    >
                        Back
                    </div>

                    <div className="px-2 py-1 rounded-md bg-yellow-200 text-richblack-900 hover:scale-95">
                        <button 
                            onClick={() => handleAddReview()}
                        >Add Review</button>
                    </div>

                </div>
                {/* for heading or title */}
                <div className="my-3">
                    <p className="font-bold text-center w-[60%] mx-auto">{courseEntireData?.courseDetails?.courseName}</p>
                    <p className="text-center">{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* for sections and subSections */}
            <div className="flex flex-col justify-center items-start mt-5">
                {
                    courseSectionData.map((course, index)=> (
                        <div
                        onClick={() => setActiveStatus(course?._id)}
                            key={index}
                            className="w-full"
                        >

                            {/* section */}

                            <div className="px-2 py-1 rounded-sm bg-richblack-400 text-richblack-200">
                                <div>
                                    {course?.sectionName}
                                </div>
                            </div>

                            {/* subSections */}
                            <div className="px-2 py-1 rounded-sm bg-richblack-700 text-richblack-200">
                                {
                                    activeStatus === course?._id && (
                                        <div>
                                            {
                                                course.subSection.map((topic, index) => (
                                                    <div
                                                    className={`flex gap-5 p-5 ${
                                                        videoBarActive === topic._id
                                                        ? "bg-yellow-200 text-richblack-900"
                                                        : "bg-richblack-900 text-white"
                                                    }`}
                                                    key={index}
                                                    onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                        )
                                                        setVideoBarActive(topic?._id);
                                                    }}
                                                    >
                                                        <input
                                                        type='checkbox'
                                                        checked= {completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
};

export default VideoDetailsSidebar;
