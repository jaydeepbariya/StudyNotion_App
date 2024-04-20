import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../services/operations/courseService";
import { getInstructorData } from "../services/operations/profileService";
import { Link } from "react-router-dom";
import InstructorChart from "../components/instructorDashboard/InstructorChart";

const InstructorDashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);

      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApiData?.length) {
        setInstructorData(instructorApiData);
      }

      if (result) {
        setCourses(result);
      }

      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="w-full min-h-screen mx-auto p-4 rounded-md my-6">
      <h1 className="text-3xl my-4 text-left font-bold p-4">Dashboard</h1>

      <div className="w-4/5 mx-auto bg-richblack-400 rounded-md px-4 py-3">
        <h1 className="text-2xl font-bold text-richBlack-5 mt-12">
          Hi {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richBlack-200">
          Let's start something new
        </p>
      </div>
      
      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div className="w-4/5 mx-auto flex bg-richblack-400 rounded-md max-md:flex-col">
          <div className="w-full my-4 flex h-[250px] max-lg:flex max-lg:flex-col space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richBlack-800 p-6">
                <p className="text-lg font-bold text-richBlack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richBlack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
          </div>
          <div className="flex mx-auto min-w-[250px] flex-col rounded-md bg-richBlack-800 p-6">
            <p className="text-lg font-bold text-richBlack-5">Statistics</p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-lg text-richBlack-200">Total Courses</p>
                <p className="text-3xl font-semibold text-richBlack-50">
                  {courses.length}
                </p>
              </div>
              <div>
                <p className="text-lg text-richBlack-200">Total Students</p>
                <p className="text-3xl font-semibold text-richBlack-50">
                  {totalStudents}
                </p>
              </div>
              <div>
                <p className="text-lg text-richBlack-200">Total Income</p>
                <p className="text-3xl font-semibold text-richBlack-50">
                  Rs. {totalAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richBlack-800 p-6 pt-20">
          <p className="text-center text-2xl font-bold text-richBlack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
      <div className="w-4/5 mx-auto min-h-[300px] rounded-md bg-richBlack-800 p-2">
        <div className="flex items-center justify-between max-lg:flex-col">
          <p className="text-lg font-bold text-richBlack-5">Your Courses</p>
          <Link to="/dashboard/my-courses">
            <p className="text-xs font-semibold text-yellow-50">View All</p>
          </Link>
        </div>
        <div className="my-2 flex items-start max-lg:flex-col space-x-6">
          {courses.slice(0, 3).map((course) => (
            <div key={course._id} className="max-lg:w-full mx-auto">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="h-[201px] w-full rounded-md object-cover"
              />
              <div className="mt-3 w-full">
                <p className="text-sm font-medium text-richBlack-50">
                  {course.courseName}
                </p>
                <div className="mt-1 flex items-center space-x-2">
                  <p className="text-xs font-medium text-richBlack-300">
                    {course?.studentsEnrolled?.length} students
                  </p>
                  <p className="text-xs font-medium text-richBlack-300">|</p>
                  <p className="text-xs font-medium text-richBlack-300">
                    Rs. {course.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
