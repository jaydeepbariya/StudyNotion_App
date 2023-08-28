import React from "react";
import { useState } from "react";
import { HomePageExplore } from "../../data/homepage-explore";
import GradientText from "./GradientText";
import {TbHierarchy} from 'react-icons/tb';
import {PiStudent} from 'react-icons/pi';

const ExploreMore = () => {
  const [category, setCategory] = useState(HomePageExplore[0].tag);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);

  const changeExplore = (index) => {
    setCategory(HomePageExplore[index].tag);
    setCourses(HomePageExplore[index].courses);
  };

  return (
    <div className="w-11/12 min-h-[300px] flex flex-col text-center my-12 max-md:flex-col max-md:w-full">
      <p className="text-3xl font-semibold font-inter">
        Unlock The <GradientText>Power of Code</GradientText>
      </p>
      <p className="text-richblack-400 my-3">
        Learn to build anything that you can imagine
      </p>

      <ul className="flex justify-around bg-richblack-500 rounded-md max-md:flex-col">
        {HomePageExplore.map((tag, index) => {
          return (
            <li
              className={`${
                tag.tag === category
                  ? "bg-richblack-700 text-white"
                  : "bg-richblack-500"
              } cursor-pointer px-3 py-2 rounded-md my-1`}
              onClick={() => changeExplore(index)}
            >
              {tag.tag}
            </li>
          );
        })}
      </ul>

      <div className="w-11/12 min-h-max flex justify-center items-center my-6 max-md:flex-col max-md:gap-y-6 mx-auto gap-x-6">
        {courses.map((course, index) => {
          return (
            <div
              key={index}
              className="min-w-[300px] min-h-[250px] gap-x-4 text-left px-2 py-1 rounded-sm hover:bg-richblack-400 bg-richblack-600 "
            >
              <p className="text-xl my-3 font-semibold">{course.heading}</p>
              <p className="text-md my-3">{course.description}</p>

              <div className="flex justify-around mb-3">
                <div className="flex items-center gap-x-3">
                <p>{course.level}</p>
                <PiStudent />
                </div>
                <div className="flex items-center gap-x-3">
                    <p>{course.lessionNumber}</p>
                    <TbHierarchy />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMore;
