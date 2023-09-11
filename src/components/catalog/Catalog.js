import React from "react";
import CourseSlider from "./CourseSlider";
import Footer from "../common/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import CourseCard from "./CourseCard";
import { useEffect } from "react";
import {categories} from '../../services/apis';
import {apiConnector} from '../../services/apiConnector';
import { TailSpin } from "react-loader-spinner";

const Catalog = () => {

  const {categoryId} = useParams();
  const [categoryPageData, setCategoryPageData] = useState({});
  const [loading, setLoading] = useState(false);

  const getCoursesByCategoryId = async () => {
    const response = await apiConnector('GET', categories.COURSES_BY_CATEGORY_ID + categoryId);
    setCategoryPageData(response?.data);
  }

  useEffect(()=>{
    setLoading(true);
    getCoursesByCategoryId();
    setLoading(false);
  },[categoryId]);

  if(loading===true){
    return (
      <div className="min-w-full min-h-screen flex justify-center items-center gap-10">
      <TailSpin
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

      <p className="text-center">Loading Catalog Data...</p>
    </div>
    )
  }

  return (
      <div className="w-full min-h-screen mb-12">
        <div className="py-12 mx-auto bg-richblack-700">
          <p className="text-md  font-inter ml-12">Home / Catalog / <span className="text-yellow-50">{categoryPageData?.name}</span></p>
          <p className="text-2xl font-semibold font-inter ml-12 my-5">{categoryPageData?.name}</p>
          <p className="text-md  font-inter ml-12">{categoryPageData?.description}</p>
        </div>

        <p className="text-3xl font-semibold my-4 ml-16">Courses to get you started</p>
        <div className="h-[1px] bg-richblack-500 w-11/12 mx-auto"></div>

        <div className="w-11/12 mx-auto grid grid-cols-3 max-md:grid-cols-1 gap-6 my-12">
        
            {
              categoryPageData?.courses?.map((course,index)=>{
                return (
                  <CourseCard course={course} key={course._id} />
                )
              })
            }
        </div>
      </div>

      
  );
};

export default Catalog;
