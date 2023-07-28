import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice';
import userReducer from "../slice/profileSlice";
import cartReducer from "../slice/cartSlice";

export const rootReducer = combineReducers({
    auth : authReducer,
    profile : userReducer,
    cart : cartReducer
});