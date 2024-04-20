import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-x-12">
      <h1 className="text-3xl my-4 text-left font-bold p-4">Add Course</h1>
      <div className="w-4/5 mx-auto">
        <RenderSteps />
      </div>
    </div>
  );
};

export default AddCourse;
