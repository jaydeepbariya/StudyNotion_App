import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { course, payment } from "../apis";
import rzpLogo from "../../assets/Logo/Logo-Small-Dark.png";
import { resetCart } from "../../slice/cartSlice";
import {setPaymentLoading} from '../../slice/courseSlice';


function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    //load the script
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    console.log('Script loaded...', res);

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const orderResponse = await createOrder(courses, token);

    console.log("orderResponse...", orderResponse);

    //values for options
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.paymentResponse.currency,
      amount: `${orderResponse.data.paymentResponse.amount}`,
      order_id: orderResponse.data.paymentResponse.id,
      name: "StudyNotion",
      description: "Thank You for Purchasing the course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function(response){
        sendPaymentSuccessEmail(response, orderResponse.data.paymentResponse.amount,token);
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };


    const paymentObject = new Window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", (response)=>{
      toast.error("Could not make payment");
      console.log(response.error);
    })
  } catch (error) {
    console.log("PAYMENT API ERROR...", error.message);
    toast.error("Payment Failed");
  }

  toast.dismiss(toastId);
}

export const createOrder = async (courses, token) => {
      //create order
      const orderResponse = await apiConnector(
        "POST",
        payment.COURSE_PAYMENT_API,
        { courses : courses },
        { Authorization: `Bearer ${token}` }
      );
  
      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message);
      }

      return orderResponse;
}

export const sendPaymentSuccessEmail = async (response, amount, token) => {
    
  try {
    await apiConnector(
      "POST",
      payment.PAYMENT_SUCCESS_EMAIL,
      {
         orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {Authorization : `Bearer ${token}`}
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR...", error);
  }
};

export const verifyPayment = async (bodyData, token, navigate, dispatch) => {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await apiConnector('POST', payment.COURSE_VERIFY_API, bodyData, {
            Authorization : `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful, You enrolled in the course");

        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        console.log("PAYMENT VERIFICATION ERROR...", error);
        toast.error("Payment Verification Not Successful");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
