import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-richblack-800">
      <ReactLoading
        type={"spin"}
        color={"#4A90E2"}
        height={"64px"}
        width={"64px"}
      />
    </div>
  );
};

export default Loading;
