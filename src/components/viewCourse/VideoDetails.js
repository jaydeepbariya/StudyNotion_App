import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../slice/viewCourseSlice";
import { markLectureAsComplete } from "../../services/operations/courseService";
import { Player } from "video-react";
import { AiFillPlayCircle } from 'react-icons/ai';

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { courseEntireData, courseSectionData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length === 0) {
        return;
      }

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        );

        const filteredVideoData = filteredData[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData);
        setVideoEnded(false);
      }
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.filter(
      (section) => section._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.filter(
      (section) => section._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

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
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1];
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const previousSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ];
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`
      );
    } else {
      const previousSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const previousSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const previousSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          previousSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${previousSectionId}/sub-section/${previousSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );

    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
    {!videoData ? (
      <div>No Data Found</div>
    ) : (
      <Player
        ref={playerRef}
        aspectratio="16:9"
        playsInline
        onEnded={() => setVideoEnded(true)}
        src={videoData?.videoUrl}
      >
        <AiFillPlayCircle />

        {videoEnded && (
          <div>
            {!completedLectures.includes(subSectionId) && (
              <button
                disabled={loading}
                onclick={() => handleLectureCompletion()}
              >{!loading ? "Mark As Completed" : "Loading..."}</button>
            )}

            <button
              disabled={loading}
              onclick={() => {
                if (playerRef?.current) {
                  playerRef.current?.seek(0);
                  setVideoEnded(false);
                }
              }}

            >Rewatch</button>

            <div>
              {!isFirstVideo() && (
                <button
                  disabled={loading}
                  onClick={goToPreviousVideo}
                  className="blackButton"
                >
                  Prev
                </button>
              )}
              {!isLastVideo() && (
                <button
                  disabled={loading}
                  onClick={goToNextVideo}
                  className="blackButton"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </Player>
    )}
    <h1>{videoData?.title}</h1>
    <p>{videoData?.description}</p>
  </div>
    </div>
  )
};

export default VideoDetails;
