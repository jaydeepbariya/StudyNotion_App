import { lazy, React, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";

const Footer = lazy(() => import("./components/common/Footer"));
const Navbar = lazy(() => import("./components/common/Navbar"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const ResendEmail = lazy(() => import("./pages/auth/ResendEmail"));
const ResetComplete = lazy(() => import("./pages/auth/ResetComplete"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const UpdatePassword = lazy(() => import("./pages/auth/UpdatePassword"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MyProfile = lazy(() =>
  import("./components/dashboard/profile/MyProfile")
);
const EnrolledCourses = lazy(() =>
  import("./components/dashboard/EnrolledCourses")
);
const PurchaseHistory = lazy(() =>
  import("./components/dashboard/PurchaseHistory")
);
const Settings = lazy(() => import("./components/dashboard/profile/Settings"));
const AddCourse = lazy(() => import("./components/dashboard/AddCourse"));
const MyCourse = lazy(() =>
  import("./components/dashboard/MyCourses/MyCourse")
);
const EditCourse = lazy(() =>
  import("./components/dashboard/EditCourse/EditCourse")
);
const Catalog = lazy(() => import("./components/catalog/Catalog"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const ViewCourse = lazy(() => import("./pages/ViewCourse"));
const VideoDetails = lazy(() => import("./components/viewCourse/VideoDetails"));
const InstructorDashboard = lazy(() => import("./pages/InstructorDashboard"));
const Loading = lazy(() => import("./components/common/Loading"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
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
          <Route
            path={"/update-password/:token"}
            element={<UpdatePassword />}
          />
          <Route path={"/reset-complete"} element={<ResetComplete />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/contact"} element={<Contact />} />
          <Route path={"/catalog/:categoryId"} element={<Catalog />} />
          <Route path={"/courses/:courseId"} element={<CourseDetail />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path={"/dashboard/my-profile"} element={<MyProfile />} />
            <Route
              path={"/dashboard/enrolled-courses"}
              element={<EnrolledCourses />}
            />
            <Route
              path={"/dashboard/purchase-history"}
              element={<PurchaseHistory />}
            />
            <Route path={"/dashboard/settings"} element={<Settings />} />
            <Route path={"/dashboard/add-course"} element={<AddCourse />} />
            <Route path={"/dashboard/my-courses"} element={<MyCourse />} />
            <Route path={"/dashboard/cart"} element={<Cart />} />
            <Route
              path={"/dashboard/edit-course/:courseId"}
              element={<EditCourse />}
            />
            <Route
              path={"/dashboard/instructor"}
              element={<InstructorDashboard />}
            />
          </Route>

          <Route path="/view-course" element={<ViewCourse />}>
            <Route
              path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          </Route>

          <Route path={"*"} element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
