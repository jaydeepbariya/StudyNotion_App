import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../services/apiConnector";
import { contact } from "../../services/apis";
import countryCode from "../../data/countrycode.json";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      const response = await apiConnector("POST", contact.CONTACT, data);

      console.log("CONTACT RESPONSE...", response);

      if (!response.data.success) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }

      toast.success("We will be in touch soon. Thanks.");
      setLoading(false);
    } catch (error) {
      console.log("CONTACT ERROR...", error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phoneNumber: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="w-[300px] min-h-screen flex flex-col justify-center items-center mx-auto"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col my-4">
          <label htmlFor="firstName" >
            First Name <sup>*</sup>
          </label>
          <input
            type={"text"}
            name="firstName"
            id="firstName"
            placeholder="Enter First Name"
            {...register("firstName", { required: true })}
            className="px-2 py-1 text-black outline-none border-none"
          />

          {errors.firstName && <span className="text-">First Name Required</span>}
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="lastName">Last Name </label>
          <input
            type={"text"}
            name="lastName"
            id="lastName"
            placeholder="Enter Last Name"
            {...register("lastName")}
            className="px-2 py-1 text-black outline-none border-none"
          />
        </div>
      </div>

      <div className="flex flex-col my-4 w-full">
        <label htmlFor="email">
          Email Address <sup>*</sup>
        </label>
        <input
          type={"text"}
          name="email"
          id="email"
          placeholder="Enter Email"
          {...register("email", { required: true })}
          className="px-2 py-1 text-black outline-none border-none"
        />

        {errors.email && <span>Email Required</span>}
      </div>

      <div className="flex flex-col my-4 w-full">
        <label>
          Phone Number <sup>*</sup>
        </label>
        <div className="w-full flex justify-between">
          <select
            name="countryCode"
            id="countryCode"
            {...register("countryCode", { required: true })}
            className="w-[20%] px-2 py-1 text-black outline-none border-none"
          >
            {countryCode.map((countryCode, index) => {
              return (
                <option value={countryCode.code}>
                  {countryCode.code} - {countryCode.country}
                </option>
              );
            })}
          </select>

          <input 
            type={"number"}
            name="phoneNumber"
            id="phoneNumber"
            placeholder="1234567890"
            {...register('phoneNumber', {required:{value:true, message:"Phone Number required"}, maxLength:{value:10, message:"Maximum 10 Digits"}})}
            className="px-2 py-1 text-black outline-none border-none"
          />

          {
            errors.phoneNumber && (
                <span>PhoneNumber Required. Max length 10</span>
            )
          }
        </div>
      </div>

      <div className="flex flex-col my-4 w-full">
        <label htmlFor="message">
          Message <sup>*</sup>
        </label>
        <textarea
          name="message"
          id="message"
          placeholder="Enter Message"
          {...register("message", { required: true })}
          rows={7}
          className="px-2 py-1 text-black outline-none border-none"
        />
        {errors.message && <span>Message Required</span>}
      </div>

      <button
        type="submit"
        className="px-2 py-1 rounded-md bg-yellow-300 text-black hover:scale-95 active:shadow-sm my-4"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
