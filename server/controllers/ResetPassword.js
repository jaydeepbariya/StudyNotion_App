const User = require("../models/User");
const mailSender = require('../utils/MailSender');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
//resetPasswordToken
exports.resetPasswordToken = async (req,res) => {
    try{
        const {email} = req.body;

        if(!email){
            return res.status(400).json({
                success : false,
                message : "Email cannot be empty"
            });
        }

        const user = await User.findOne({email : email});

        if(!user) {
            return res.status(400).json({
                success : false,
                message : "No User with this email"
            });
        }

        const token = crypto.randomUUID();

        const updatedUser = await User.findOneAndUpdate({email : email},{token : token, resetPasswordTokenExpires : Date.now()+ 5*60*1000},{new : true});

        const url = `http://localhost:3000/update-password/${token}`;

        const response = mailSender(email, 'Reset Password Link - StudyNotion',`Reset Password by Clicking Here ${url}`);

        return res.status(200).json({
            success : true, 
            message : "Reset Password Link Sent Successfully"
        });
    }catch(error){
        return res.status(200).json({
            success : false, 
            message : "Reset Password Error, Please Try Again"
        });
    }
}

//resetPassword
exports.resetPassword = async (req,res) => {
    try{
        const {password,confirmPassword,token} = req.body;

        if(!password || !confirmPassword || !token){
            return res.status(400).json({
                success : false,
                message : "All Fields Required"
            });
        }

        if(password != confirmPassword){
            return res.status(400).json({
                success : false,
                message : "New Password and ConfirmPassword not matching"
            });
        }

        const user = await User.findOne({token : token});

        if(!user){
            return res.status(400).json({
                success : false,
                message : "Token Invalid"
            })
        }

        if(user.resetPasswordTokenExpires < Date.now()){
            return res.status(400).json({
                success : false,
                message : "Expired Token, Generate New Token"
            });
        }

        const hashedNewPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findOneAndUpdate({token : token}, {password : hashedNewPassword},{new:true});

        return res.status(200).json({
            success : true,
            message : "Password Update Successful"
        });

    }catch(error){
        console.log("Password reset ",error.message);
        return res.status(400).json({
            success : false,
            message : "Password Update Error, Try Again"
        });
    }
}