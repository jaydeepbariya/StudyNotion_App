import { React } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResendEmail from "./pages/ResendEmail";
import ResetComplete from "./pages/ResetComplete";
import Signup from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/dashboard/MyProfile";
import EnrolledCourses from './components/dashboard/EnrolledCourses';
import PurchaseHistory from './components/dashboard/PurchaseHistory';
import Settings from './components/dashboard/Settings';
import AddCourse from "./components/dashboard/AddCourse";
import MyCourse from "./components/dashboard/MyCourses/MyCourse";
import EditCourse from "./components/dashboard/EditCourse/EditCourse";
import Catalog from "./components/catalog/Catalog";
import CourseDetail from "./pages/CourseDetail";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from './components/viewCourse/VideoDetails';
import InstructorDashboard from "./pages/InstructorDashboard";
function App() {
  return (
    <div className="w-[100vw] min-h-[100vh] overflow-x-hidden overflow-y-auto bg-richblack-800 text-richblack-100">
      <Navbar />

      {/* Non Logged User Routes */}

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/verify-email"} element={<VerifyEmail />} />
        <Route path={"/forgot-password"} element={<ForgotPassword />} />
        <Route path={"/resend-email"} element={<ResendEmail />} />
        <Route path={"/update-password/:token"} element={<UpdatePassword />} />
        <Route path={"/reset-complete"} element={<ResetComplete />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
        <Route path={"/catalog/:categoryId"} element={<Catalog />} />
        <Route path={"/courses/:courseId"} element={<CourseDetail />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path={"/dashboard/my-profile"} element={<MyProfile />} />
          <Route path={"/dashboard/enrolled-courses"} element={<EnrolledCourses />} />
          <Route path={"/dashboard/purchase-history"} element={<PurchaseHistory />} />
          <Route path={"/dashboard/settings"} element={<Settings />} />
          <Route path={"/dashboard/add-course"} element={<AddCourse />} />
          <Route path={"/dashboard/my-courses"} element={<MyCourse />} />
          <Route path={"/dashboard/edit-course/:courseId"} element={<EditCourse />} />
          <Route path={"/dashboard/instructor"} element={<InstructorDashboard />} />
        </Route>

        <Route path="/view-course" element={<ViewCourse />}>
          <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
        </Route>


        <Route path={"*"} element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
