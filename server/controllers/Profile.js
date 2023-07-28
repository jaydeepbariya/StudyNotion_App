const { default: mongoose } = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User');
const { fileUploader } = require('../utils/fileUploader');

exports.updateProfile = async (req,res) =>{
    try{
        const {dateOfBirth, about, contactNumber, gender} = req.body;
        const {id} = req.user;


        const user = await User.findById({_id : id});
        
        const updateProfile = await Profile.findOneAndUpdate(
            {_id : user.additionalDetails},
            {
                dateOfBirth,
                about,
                contactNumber,
                gender
            }
        );

        console.log(updateProfile);

        const updatedUser = await User.findById({_id : id}).populate("additionalDetails");

        return res.status(200).json({
            success : true,
            message : "Profile Update Successful",
            user : updatedUser
        });

    }catch(error){
        console.log("Error ", error);
        return res.status(200).json({
            success : false,
            message : "Profile Update Error, Please Try Again"
        });
    }
}

exports.deleteProfile = async (req,res) => {
    try{
        const {id} = req.user;

        const userId = id;

        if(!userId){
            return res.status(400).json({
                success : false,
                message : "Invalid UserId"
            });
        }

        const userDetails = await User.findById(userId);

        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "No User Exists with This Id"
            });
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id : userId});

        return res.status(200).json({
            success : true,
            message : "UserProfile Deleted Successfully"
        });
    }catch(error){
        console.log("Error ", error);
        return res.status(400).json({
            success : false,
            message : "UserProfile Deletion Not Successful, Please Try Again"
        });
    }
}


//HW : Delete Courses of Particular User Before Deleting the User Itself
//HW : Crone Job Scheduling to Delete Account After Some Time

exports.getAllUserDetails = async (req,res) => {
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success : true,
            message : "User Data Fetched Successfully"
        });

    }catch(error){
        console.log("Error ", error);
        
        return res.status(400).json({
            success : false,
            message : error.message
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      const image = await fileUploader(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getUserDetails = async (req,res)=>{
  try{

    const {id} = req.user;

     const userData = await User.findById(id);

     if(!userData){
        return res.status(400).json({
          success : false,
          message : "Not a User"
        })
     }

     return res.status(200).json({
      success : true,
      message : "User Details",
      userData
      })
  }catch(error){
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}