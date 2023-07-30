import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./CourseBuilder/NestedView";
import { setCourse, setEditCourse, setStep } from "../../../slice/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../services/operations/courseService";

const CourseBuilderForm = () => {
  const { course, step } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [editSectionName, setEditSectionName] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Creating/Editing Section...");
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course?._id
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course?._id,
        },
        token
      );

      dispatch(setCourse(result));
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const gotoNext = () => {
    dispatch(setStep(step + 1));
  };

  const goBack = () => {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="w-[60%] rounded-md border-richblack-700 p-6 space-y-8">
      <p className="text-2xl font-semibold text-center my-4">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Section Name <sup>*</sup>
          </label>
          <input
            id="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
            className="w-full px-2 py-1 rounded-md "
          />
          {errors.sectionName && <span>Section Name is required</span>}
        </div>

        <div className="flex ml-4 gap-x-4">
          <button
            type="submit"
            className="px-2 py-1 text-sm rounded-md bg-yellow-100 text-black my-4 hover:scale-95 active:shadow-sm active:shadow-white"
          >
            {editSectionName ? "Edit Section Name" : "Create Section"}
          </button>

          {editSectionName && (
            <button
              type="button"
              className="text-sm text-richblack-400 underline"
              onClick={cancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-x-6">
        <button
          onClick={goBack}
          className="px-2 py-1 rounded-md bg-yellow-100 text-black"
        >
          Back
        </button>
        <button
          onClick={gotoNext}
          className="px-2 py-1 rounded-md bg-richblack-500 text-black"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
