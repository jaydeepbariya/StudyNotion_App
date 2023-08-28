import React from "react";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = () => {
  return (
    <div className="w-11/12 bg-richblack-200 text-yellow-200 bg-opacity-40 py-5 px-3 flex justify-start">
      <div className="px-2 text-black font-semibold text-[15px] bg-richblack-200 text-center mr-4 h-[100%]">
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
        <p>12</p>
        <p>13</p>
      </div>
      <TypeAnimation
        style={{ whiteSpace: "pre-line", height: "200px", display: "block", fontFamily:"monospace", fontSize:"1rem" }}
        sequence={[
          `<!DOCTYPE html>
           <html>
           <head>
           <title>My web page</title>
           </head>
           <body>
           <h1>Hello, world!</h1>
           <p>This is my first web page.</p>
           <p>It contains a <strong>main heading</strong> and <em> paragraph </em>.</p>
           </body>
           </html>`,
          "",
        ]}
        repeat={Infinity}
      />
    </div>
  );
};

export default CodeBlock;
