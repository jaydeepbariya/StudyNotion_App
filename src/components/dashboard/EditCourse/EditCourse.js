import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { useEffect } from 'react';
import { getFullDetailsOfCourse } from '../../../services/operations/courseService';
import { setCourse, setEditCourse } from '../../../slice/courseSlice';
import { toast } from 'react-hot-toast';

const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();

    const {course} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);

    const {token} = useSelector((state)=>state.auth);

    const fetchCourse = async () =>{
        setLoading(true);
        const result = await getFullDetailsOfCourse(courseId, token);

        if(result?.courseDetails){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails));
        }

        setLoading(false);
    }
    useEffect(()=>{
        fetchCourse();
    },[]);

    if(loading===true){
        return <p>Loading...</p>
    }

  return (
    <div>
        <div>
            <h1>Edit Course</h1>

            <div>
                {
                    course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                }
            </div>

        </div>
    </div>
  )
}

export default EditCourse