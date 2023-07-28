import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../services/apiConnector';
import { profile } from '../../services/apis';
import { setNewDisplayPicture, setUser } from '../../slice/profileSlice';

const UpdateProfilePicture = () => {
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
  
    const handleImage = (e)=>{
      console.log(e.target.files);
      setImage(e.target.files[0]);
    }
  
    const updateProfilePicture = async ()=>{
      const formData = new FormData();
      formData.append('displayPicture', image);
      formData.append('token', token);
  
      const response = await apiConnector('PUT',profile.UPDATE_DISPLAY_PICTURE, formData);
    
      if(!response.data.success){
        toast.error("File Upload Error");
        return;
      }
  
      dispatch(setNewDisplayPicture(response.data.data.image));
  
      toast.success("Profile Picture Updated...");
  
    }
  
    return (
      <div className='w-[100%] mx-auto flex flex-col my-12'>
        <div className='w-[50%] mx-auto flex justify-center items-center gap-x-6 bg-richblack-700 p-4 round'>
        <img src={user.image} className="w-[80px] h-[80px] rounded-full object-cover"/>
          <input type="file" name="file" onChange={(e)=>handleImage(e)}/>
          <button onClick={()=>updateProfilePicture()} className="px-2 py-1 rounded-lg bg-yellow-300 text-black hover:scale-95 active:shadow-sm active:shadow-white">Submit</button>
        </div>
      </div>
  
    )
}

export default UpdateProfilePicture