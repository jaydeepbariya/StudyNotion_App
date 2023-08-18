import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice';
import userReducer from "../slice/profileSlice";
import cartReducer from "../slice/cartSlice";
import courseReducer from '../slice/courseSlice';
import viewCourseReducer from '../slice/viewCourseSlice';

export const rootReducer = combineReducers({
    auth : authReducer,
    profile : userReducer,
    cart: cartReducer,
    course: courseReducer,
    viewCourse : viewCourseReducer
});