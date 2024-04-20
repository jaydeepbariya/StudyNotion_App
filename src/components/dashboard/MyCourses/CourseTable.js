import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Tr } from "react-super-responsive-table";
import { COURSE_STATUS } from "../../../util/constants";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../services/operations/courseService";
import { useNavigate } from "react-router-dom";

const CourseTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);

    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }

    setLoading(false);
    setConfirmationModal(null);
  };

  if (courses.length === 0) {
    return (
      <div className="w-full min-h-[400px] mx-auto flex flex-col justify-start items-center my-6">
        <h1 className="text-center font-bold text-xl">
          You have no courses to display yet. Please create a new one !
        </h1>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="my-5 w-[200px] h-[50px] px-2 py-1 rounded-md bg-yellow-50 text-richblack-800 hover:scale-95"
        >
          Add Course
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mx-auto flex justify-between items-center my-6">
      <button
        onClick={() => navigate("/dashboard/add-course")}
        className="my-5 w-[200px] h-[50px] px-2 py-1 rounded-md bg-yellow-50 text-richblack-800 hover:scale-95"
      >
        Add Course
      </button>

      <Table className="w-full">
        <Tbody>
          {courses?.length !== 0 &&
            courses?.map((course) => {
              return (
                <Tr
                  key={course._id}
                  className="w-full flex justify-between items-center"
                >
                  <Td className="flex my-4">
                    <img
                      alt="Course Thumbnail"
                      src={course?.thumbnail}
                      className="h-[150px] w-[250px] rounded-lg object-cover m-2"
                    />
                    <div className="flex flex-col justify-center gap-y-4">
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>

                      <div className="flex gap-x-6">
                        {course.status === COURSE_STATUS.DRAFT ? (
                          <p>DRAFT</p>
                        ) : (
                          <p>PUBLISHED</p>
                        )}
                      </div>
                    </div>
                  </Td>

                  <Td className="max-lg:hidden">2 Hr 30 Mins</Td>

                  <Td>{course.price}</Td>

                  <Td className="flex justify-center gap-x-4">
                    <button
                      disabled={loading}
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      className="px-2 py-1 rounded-md bg-yellow-50 text-richblack-800 hover:scale-95"
                    >
                      Edit
                    </button>

                    <button
                      disabled={loading}
                      className="px-2 py-1 rounded-md bg-richblack-800 text-richblack-300 hover:scale-95"
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Are You Sure ?",
                          text2: "Whole course data will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            !loading ? handleCourseDelete(course._id) : {},
                          btn2Handler: () =>
                            !loading ? setConfirmationModal(null) : {},
                        });
                      }}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
