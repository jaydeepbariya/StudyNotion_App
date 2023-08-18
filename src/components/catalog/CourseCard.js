import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const CourseCard = ({course,height}) => {
  return (
    <div className="max-w-[300px] max-h-[500px] bg-richblack-600 flex flex-col items-center rounded-lg">
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-col items-center">
          <div>
            <img src={course?.thumbnail} alt="thumbnail" height={150} width={250} className="my-5 rounded-md" />
          </div>
          <div className="flex flex-col font-inter items-start ml-3">
            <p className="font-bold text-xl text-richblack-300">{course?.courseName}</p>
            <p className="font-semibold text-md my-2">{course?.courseDescription}</p>
            <p className="text-md">Created By : {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
            <div className="flex items-center gap-x-2">
            <ReactStars
              count={5}
              edit={false}
              value={course?.ratingAndReviews?.length}
              size={24}
              color2={"#ffd700"}
              className="my-1"
            />
            <span className="text-md">({course?.ratingAndReviews?.length})</span>
            </div>

            <p className="my-5 text-2xl font-semibold">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
