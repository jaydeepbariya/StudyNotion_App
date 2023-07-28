const BASE_URL = "http://localhost:4000/api/v1";

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
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


};

export const user = {
  USER_INFO: BASE_URL + "/auth/user-details",
};


