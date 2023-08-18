import React, { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { apiConnector } from "../services/apiConnector";
import { buyCourse } from "../services/operations/paymentService";
import { addToCart, removeFromCart } from "../slice/cartSlice";
import { toast } from "react-hot-toast";

const CourseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const {user} = useSelector((state)=> state.profile);

  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [addedInCart, setAddedInCart] = useState(false);


  const getCourseDetails = async () => {
    const response = await apiConnector(
      "POST",
      "http://localhost:4000/api/v1/course/getCourseDetails",
      { courseId: courseId }
    );
    setCourse(response?.data?.data?.courseDetails);
  };

  useEffect(() => {
    getCourseDetails();
  }, []);

  const handleCart = () => {
    if (!addedInCart) {
      dispatch(addToCart(course));
      setAddedInCart(true);
      return;
    } else {
      dispatch(removeFromCart(course._id));
      setAddedInCart(false);
      return;
    }
  };


  const handleBuyCourse = ()=>{
      if(token){
        buyCourse(token, [courseId], user, navigate, dispatch);
        return;
      }
      else{
        toast.success("Please Login");
        navigate("/login");
      }
  }

  return (
    <div className="flex flex-col mx-auto items-center">
      <div className="w-11/12 flex justify-center gap-x-6 bg-richblack-500 py-4">
        <div className="w-[60%] flex flex-col items-start ml-6">
          <p className="text-md font-semibold text-richblack-800 mt-8">
            Home / Catalog / {course?.category?.name} /{" "}
            <span className="text-yellow-50">{course?.courseName}</span>
          </p>
          <p className="text-richblack-800 my-4 font-bold text-2xl">
            {course?.courseName}
          </p>
          <p className="my-4">{course?.courseDescription}</p>

          <div className="flex items-center gap-x-4">
            <ReactStars count={5} size={30} edit={false} />
            <span>({course?.ratingAndReviews?.length} Reviews) </span>
            <span>({course?.studentsEnrolled?.length} Students Enrolled)</span>
          </div>
          <p className="my-4">
            Created By : {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          <div className="flex">
            <div className="flex items-center gap-x-4">
              <BiWorld />
              <p>English</p>
            </div>
          </div>

          <div className="flex flex-col mt-6">
            <p className="text-2xl font-semibold mt-6 mb-3">
              What You will Learn
            </p>
            <p>{course?.whatYouWillLearn}</p>
          </div>
        </div>

        <div className="w-[40%] flex flex-col mx-auto mt-6">
          <img
            src={course?.thumbnail}
            alt={"course thumbnail"}
            className="max-w-[90%] mx-auto"
          />
          <p className="w-[40%] text-3xl font-semibold font-inter ml-6 my-6">
            Rs. {course?.price}
          </p>

          <div className="w-[40%] flex flex-col items-center gap-y-2 my-2 mx-auto">
            <button
              onClick={() => handleCart()}
              className="w-full px-2 py-1 rounded-md bg-yellow-50 text-richblack-900 hover:scale-95 active:shadow-sm active:shadow-white"
            >
              {addedInCart ? "Remove From Cart" : "Add to Cart"}
            </button>

            <button 
              className="w-full px-2 py-1 rounded-md bg-richblack-600 text-richblack-900 hover:scale-95 active:shadow-sm active:shadow-white"
              onClick={()=>handleBuyCourse()}
              >
              Buy Now
            </button>
          </div>

          <p className="text-center">30 Days Money Back Guarantee</p>
        </div>
      </div>

      <p className="text-3xl font-semibold font-inter my-6">Course Content</p>

      <div className="w-[80%] flex flex-col mx-auto bg-richblack-600 rounded-md px-3 py-4">
        {course?.courseContent?.map((section, index) => {
          return (
            <details className="my-5 bg-richblack-800 px-2 py-2 rounded-md" key={index} >
              <summary className="w-full flex justify-between">
                <p className="font-bold">{section?.sectionName}</p>
                <p className="text-yellow-50">
                  {section?.subSection?.length} Lectures
                </p>
              </summary>
              {section?.subSection?.map((lecture, index) => {
                return (
                  <details className="my-5 bg-richblack-800 px-2 py-2 rounded-md" key={index} >
                    <summary className="w-full flex justify-between">
                      <div className="flex flex-col">
                        <p className="font-semibold">{lecture?.title}</p>
                        <p>{lecture?.description}</p>
                      </div>
                      <p>{lecture?.timeDuration}min</p>
                    </summary>
                  </details>
                );
              })}
            </details>
          );
        })}
      </div>

      <div className="w-11/12 mx-auto flex flex-col">
        <p className="text-3xl font-semibold font-inter my-6 text-center">
          About Instructor
        </p>

        <div className="flex justify-center items-start gap-x-6 my-12">
          <img
            src={course?.instructor?.image}
            alt="Instructor Image"
            width={100}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="font-semibold font-inter">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <p className="font-inter">
              {course?.instructor?.additionalDetails?.about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
