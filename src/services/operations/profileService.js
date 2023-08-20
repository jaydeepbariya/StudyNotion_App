import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../../slice/profileSlice";
import { apiConnector } from "../apiConnector";
import { profile } from "../apis";
import { logout } from "../operations/authService";

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        profile.GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      profile.GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      response
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
    toast.success("Enrolled Courses");
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  return result;
}

export async function getInstructorData(token){
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      profile.GET_INSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("GET INSTRUCTOR DATA API RESPONSE....", response);

    result = response?.data?.courses
    toast.dismiss(toastId);
  } catch (error) {
    console.log("GET INSTRUCTOR DATA API ERROR....", error);
    toast.error("Could not get instructor data");
  }

  toast.dismiss(toastId);
  return result;
}
