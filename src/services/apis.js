const BASE_URL = "http://localhost:4000/api/v1";

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  COURSES_BY_CATEGORY_ID : BASE_URL + "/course/getCoursesByCategory/"
};

export const auth = {
  SENDOTP: BASE_URL + "/auth/sendotp",
  SIGNUP: BASE_URL + "/auth/signup",
  LOGIN: BASE_URL + "/auth/login",
  RESET_PASSWORD_TOKEN: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD: BASE_URL + "/auth/reset-password",
};

export const contact = {
  CONTACT: BASE_URL + "/contact/reach/contact",
};

export const profile = {
  UPDATE_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API : BASE_URL + "/profile/instructorDashboard"

};

export const user = {
  USER_INFO: BASE_URL + "/auth/user-details",
};

export const course = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  GET_ALL_RATING : BASE_URL + "/course/getReviews"
}

export const catalog = {
  CATALOG_PAGE_DATA : BASE_URL+"/course/getCatagoryPageDetails"
}

export const payment = {
  COURSE_PAYMENT_API : BASE_URL+"/payment/capturePayment",
  COURSE_VERIFY_API : BASE_URL + "/payment/verifySignature",
  PAYMENT_SUCCESS_EMAIL : BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const ratingAndReviews = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}


