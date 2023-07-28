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

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path={"/dashboard/my-profile"} element={<MyProfile />} />
          <Route path={"/dashboard/enrolled-courses"} element={<EnrolledCourses />} />
          <Route path={"/dashboard/purchase-history"} element={<PurchaseHistory />} />
          <Route path={"/dashboard/settings"} element={<Settings />} />
        </Route>

        <Route path={"*"} element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
