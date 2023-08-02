import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slice/authSlice"
import { setUser } from "../../slice/profileSlice"
import { apiConnector } from '../apiConnector'
import {auth} from '../apis'

export const login = (loginData, navigate)=>{
  return async (dispatch)=>{
    try{
      dispatch(setLoading(true));

      const response = await apiConnector('POST', auth.LOGIN, loginData);

      if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
        return;
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      toast.success("Login Successful");

      navigate("/dashboard/my-profile");

      dispatch(setLoading(false));

    }catch(error){
      console.log("LOGIN ERROR....", error.message);
      toast.error("Invalid Credentials");
      navigate("/login");
    }
  }
}

export const logout = (navigate)=>{
  return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out Successfully...");
    navigate("/");
  }
}

export const sendOtp = (email, navigate)=>{
  return async (dispatch)=>{
    try{
      dispatch(setLoading(true));
      const response = await apiConnector('POST', auth.SENDOTP, {email : email});

      if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
        return;
      }

      toast.success("OTP Sent Successfully");
      
      dispatch(setLoading(false));

      navigate("/verify-email");

    }catch(error){
      console.log("SEND OTP ERROR....", error.message);
      toast.error("Please Try Again Later");
    }
  }
}

export const signup = (signupData, otp, navigate)=>{
  return async (dispatch)=>{
    try{

      console.log("OTP...", otp);

      const {firstName, lastName, email, password, confirmPassword, accountType} = signupData;
      dispatch(setLoading(true));
      const response = await apiConnector('POST', auth.SIGNUP, {firstName, lastName, email, password, confirmPassword,accountType, otp});

      if(!response.data.success){
        toast.error(toast.data.message);
        throw new Error(response.data.message);
        return;
      }

      toast.success("Signup Successful. Please Login");

      navigate('/login');

      dispatch(setLoading(false));
    }catch(error){
      console.log("SIGN UP ERROR....", error.message);
      toast.error("Please Try Again Later");
    }
  }
}

export const getPasswordResetToken = (email, setEmailSent)=>{
  return async (dispatch)=>{
    console.log("EMAIL", email);
    try{
      dispatch(setLoading(true));
      const response = await apiConnector('POST', auth.RESET_PASSWORD_TOKEN, {email : email});

      if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
        return;
      }

      toast.success("Reset Email Sent Successfully");
      
      setEmailSent(true);

      dispatch(setLoading(false));

    }catch(error){
      console.log("SEND RESETPASSWORD TOKEN EMAIL ERROR....", error.message);
      toast.error("Please Try Again Later");
      dispatch(setLoading(false));
    }
  }
}

export const resetPassword = (formData, navigate)=>{
  return async (dispatch)=>{
    try{
      dispatch(setLoading(true));
      
      const {password, confirmPassword, token} = formData;

      const response = await apiConnector('POST', auth.RESET_PASSWORD, {password, confirmPassword, token});
      
      console.log("RESET PASSWORD RESPONSE...", response);

      if(!response.data.success){
        toast.error(response.data.message);
        throw new Error(response.data.message);
        return;
      }

      toast.success("Password Changed Successfully...");

      dispatch(setLoading(false));
      navigate("/reset-complete");
  }catch(error){
    console.log("SEND RESETPASSWORD ERROR....", error.message);
    toast.error("Please Try Again Later");
    dispatch(setLoading(false));

  }
}
}