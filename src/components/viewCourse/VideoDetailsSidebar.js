import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const location = useLocation();
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideobarActive] = useState("");

  const { sectionId, subSectionId } = useParams();

  const navigate = useNavigate();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const setActiveFlags = () => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideobarActive(activeSubSectionId);
  };

  useEffect(() => {
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <>
      <div>
        <div>
          <div>
            <div onClick={() => navigate("/dashboard/enrolled-courses")}>
              Back
            </div>

            <div onClick={() => setReviewModal(true)}>Add Review</div>
          </div>

          <div>
            <p>{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>
              
        <div>
            {
            courseSectionData?.map((section, index) => {
                return (
                    <div
                        onClick={() => setActiveStatus(section?._id)}
                        key={index}
                        >
                        <div>
                            <div>
                                { section?.sectionName }
                            </div>
                        </div>

                        <div>
                            {
                                activeStatus ===  section?._id && (
                                    <div>
                                        {
                                            section.subSection.map((topic, index) => {
                                                return (
                                                    <div onClick={() => {
                                                        navigate(
                                                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                        setVideobarActive(topic);
                                                    }}>   
                                                        <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => { }} />
                                                        <p>{ topic.title}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                        
                                )
                            }
                        </div>
                    </div>
                        
                )        
                })          
            }          
        </div>    
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
