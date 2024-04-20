import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseService";
import CourseTable from "./CourseTable";

const MyCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token);

    if (result) {
      setCourses(result);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="w-full rounded-md">
      <h1 className="w-full text-3xl my-4 text-left font-bold p-4">My Courses</h1>

      <div className="w-full mt-10">
        <CourseTable courses={courses} setCourses={setCourses} />
      </div>
    </div>
  );
};

export default MyCourse;
