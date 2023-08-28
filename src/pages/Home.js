import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import GradientText from "../components/home/GradientText";
import HomeButton from "../components/home/HomeButton";
import boxoffice from "../assets/Images/boxoffice.png";
import CodeBlock from "../components/home/CodeBlock";
import ExploreMore from "../components/home/ExploreMore";
import timelineImg from "../assets/Images/TimelineImage.png";
import { timelineFeatures } from "../data/timelineFeatures";
import knowYourProgress from "../assets/Images/Know_your_progress.png";
import compareWithOthers from "../assets/Images/Compare_with_others.png";
import planYourLessons from "../assets/Images/Plan_your_lessons.png";
import instructorImg from "../assets/Images/Instructor.png";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col justify-center items-center mt-24">
      <div className="max-w-[250px] flex flex-row justify-center items-center gap-x-3 px-3 py-2 font-inter rounded-full bg-richblack-600 text-white transition-all duration-200 hover:scale-95">
        <p>Become An Instructor</p>
        <BsFillArrowRightCircleFill />
      </div>

      <div className="w-[70%] flex flex-col mx-auto">
        <p className="text-center text-4xl my-6 font-semibold font-inter">
          Empower your career with <GradientText>Coding Skills</GradientText>
        </p>
        <p className="text-center text-lg mb-6">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className="flex justify-center gap-6">
          <HomeButton text="Learn More" active={true} link="/signup" />
          <HomeButton text="Book a Demo" active={false} link="/about" />
        </div>
      </div>

      <div className="my-16">
        <img src={boxoffice} alt="Hero Section" />
      </div>

      <div className="w-11/12 flex justify-center gap-x-12 my-12 max-md:flex-col max-md:w-full">
        <div className="w-[50%] flex flex-col justify-between items-center max-md:items-start max-md:w-full">
          <p className="text-4xl text-richblack-200 font-semibold">
            Unlock your <GradientText>coding potential</GradientText> with our
            online courses.
          </p>
          <p className="text-lg text-richblack-200 mt-6">
            Our courses are designed and taught by industry experts who have
            years of experience in coding and are passionate about sharing their
            knowledge with you.
          </p>

          <div className="flex justify-start mt-6 gap-6">
            <HomeButton text="Try It Yourself" active={true} link="/signup" />
            <HomeButton text="Learn More" active={false} link="/about" />
          </div>
        </div>

        <div className="w-[50%] max-md:w-full max-md:mt-6">
          <CodeBlock />
        </div>
      </div>

      <div className="w-11/12 flex flex-row-reverse justify-center gap-x-12 my-12 max-md:flex-col max-md:w-full">
        <div className="w-[50%] flex flex-col justify-between items-center max-md:w-full">
          <p className="text-4xl text-richblack-200 font-semibold">
            Start your <GradientText>coding journey</GradientText> with our
            online courses.
          </p>
          <p className="text-lg text-richblack-200 mt-6">
            Go ahead, give it a try. Our hands-on learning environment means
            you'll be writing real code from your very first lesson.
          </p>

          <div className="flex justify-start mt-6 gap-6">
            <HomeButton text="Continue Learning" active={true} link="/signup" />
            <HomeButton text="Learn More" active={false} link="/about" />
          </div>
        </div>

        <div className="w-[50%] max-md:w-full max-md:mt-6">
          <CodeBlock />
        </div>
      </div>

      <ExploreMore />

      <div className="flex gap-x-6 mb-20">
        <HomeButton
          active={false}
          text={"Explore Full Catalog"}
          link="/courses"
        />
        <HomeButton active={true} text={"Learn More"} link="/signup" />
      </div>

      <div className="flex justify-around items-center max-md:flex-col max-md:gap-y-6">
        <div className="w-[40%] max-md:w-11/12">
          <p className="text-3xl">
            Get the skills you require for a{" "}
            <GradientText>job that is in demand</GradientText>
          </p>
        </div>

        <div className="w-[40%] flex flex-col items-start max-md:w-11/12">
          <p className="text-lg my-4">
            The modren studynotion is the pioneer of learning online in best
            class manner. please make use of this beautiful opportunity
          </p>

          <div className="my-4">
            <HomeButton text={"Learn More"} link="/courses" active={true} />
          </div>
        </div>
      </div>

      <div className="flex gap-x-6 my-12 max-md:flex-col max-md:mb-6">
        <div className="w-[40%] flex flex-col justify-center items-start max-md:w-11/12">
          {timelineFeatures.map((feature, index) => {
            return (
              <div key={index} className="my-4">
                <p className="font-semibold mb-2">{feature.title}</p>
                <p>{feature.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="w-[50%] relative -z-1 max-md:w-11/12 max-md:mx-auto">
          <img src={timelineImg} alt="timeline" />

          <div className="w-[350px] min-h-[100px] bg-caribbeangreen-600 flex justify-around items-center absolute -bottom-12 right-20 mb-12">
            <div className="w-[100px] flex items-center gap-x-3 max-md:gap-x-0 font-inter">
              <p className="font-bold text-3xl">10</p>
              <p className="text-richblack-200 uppercase text-sm text-left">years experience</p>
            </div>
            <div className="w-[100px] flex items-center gap-x-3 max-md:gap-x-0 font-inter">
              <p className="font-bold text-3xl">250</p>
              <p className="text-richblack-200 uppercase text-sm">types of courses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-11/12 min-h-[300px] mx-auto flex flex-col text-center mt-12">
        <p className="text-3xl font-semibold mt-8 mb-4">
          Your swiss knife for{" "}
          <GradientText>learning any technology</GradientText>
        </p>
        <p className="text-lg mb-6">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </p>
      </div>

      <div className="w-11/12 max-h-[400px] flex justify-center items-center max-md:hidden ">
          <img src={knowYourProgress}  alt="know progress" className="w-[30%] "/>
          <img src={compareWithOthers}  alt="compare with others" className="w-[30%]" />
          <img src={planYourLessons}  alt="plan your lessons" className="w-[30%]" />
        </div>

        <HomeButton text={"Learn More"} active={true} link={"/courses"} />


      <div className="w-11/12 min-h-[400px] my-20 flex justify-between items-center max-md:flex-col max-md:gap-y-6">

          <img src={instructorImg} className="w-[40%] shadow-xl shadow-white max-md:w-full" alt="instructor" />

        <div className="w-[40%] flex flex-col justify-around items-center max-md:w-full">
          <p className="text-3xl font-bold max-md:mt-12">
            Become an <GradientText>Instructor</GradientText>
          </p>
          <p className="text-lg max-md:mt-12">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="max-md:my-6">
          <HomeButton
            text={"Become An Instructor"}
            active={true}
            link="/signup"
          />
          </div>

        </div>
      </div>

      <ReviewSlider />

    </div>
  );
};

export default Home;
