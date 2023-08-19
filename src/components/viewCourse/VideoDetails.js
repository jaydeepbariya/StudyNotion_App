import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../slice/viewCourseSlice";
import { markLectureAsComplete } from "../../services/operations/courseService";
import { Player } from "video-react";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        //let's assume k all 3 fields are present

        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section ki next video me jao
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex + 1
        ]._id;
      //next video pr jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      //different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      ///iss voide par jao
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex != 0) {
      //same section , prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ];
      //iss video par chalge jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      //different section , last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      //iss video par chalge jao
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    
      console.log("courseId", courseId);
      setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    //state update
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  return (
    <div>
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          {videoEnded && (
            <div className="flex justify-center items-center gap-x-5 my-5">
              {!completedLectures.includes(subSectionId) && (
                <button
                  disabled={loading}
                  onClick={() => handleLectureCompletion()}
                  className="px-2 py-1 rounded-md text-richblack-800 bg-yellow-300 hover:scale-105"
                >
                  {!loading ? "Mark As Completed" : "Loading..."}
                </button>
              )}

              <button
                className="px-2 py-1 rounded-md text-richblack-800 bg-yellow-300 hover:scale-105"
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
              >
                Rewatch
              </button>

              <div>
                {!isFirstVideo() && (
                  <button
                    className="px-2 py-1 rounded-md text-richblack-800 bg-yellow-300 hover:scale-105"
                    disabled={loading}
                    onClick={goToPrevVideo}
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    className="px-2 py-1 rounded-md text-richblack-800 bg-yellow-300 hover:scale-105"
                    disabled={loading}
                    onClick={goToNextVideo}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
      <h1 className="text-2xl font-bold mt-5">{videoData?.title}</h1>
      <p className="text-xl font-semibold mb-5">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
