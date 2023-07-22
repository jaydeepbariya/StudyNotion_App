const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/MailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");

// HMAC, SHA, checksum, Digest -- Read More

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
  try {
    //get courseId and userId
    const { courseId } = req.body;
    const userId = req.user.id;
    //valid courseId
    if (!courseId) {
      return res.json({
        success: false,
        message: "Please enter valid courseId",
      });
    }

    let course;
    try {
      course = await Course.findById({ _id: courseId });
      if (!course) {
        return res.json({
          success: false,
          message: "Could not find the course",
        });
      }

      //userId already bought the course
      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student Already Enrolled",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: courseId,
        userId: userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);

      return res.status(200).json({
        success: true,
        message: "Payment Initiated Successfully",
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        courseThumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Could not initiate order",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

//verify Signature of Razorpay and Server

exports.verifySignature = async(req, res)=>{
  //server signature
  const webhookSecret = '12345678';

  //razorpay signature
  const signature = req.headers('x-razorpay-signature');

  const shasum = crypto.createHMac("sha256",webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if(signature === digest){
      console.log("Payment is Authorized");

      const {courseId, userId} = req.body.payload.payment.entity.notes;

      try{
        const enrolledCourse = await Course.findOneAndUpdate(
          {_id : courseId},
          { $push : {studentEnrolled: userId}},
          {new : true}
          );

        if(!enrolledCourse){
          return res.status(500).json({
            success : false,
            message : "Course Not Found"
          });
        }

        console.log(enrolledCourse);

        const enrolledStudent = await User.findOneAndUpdate(
          { _id : userId},
          { $push : {courses : enrolledCourse}},
          { new : true}
        );

          const emailResponse = await mailSender(
            enrolledStudent.email,
            "Congratulations - CodeHelp",
            "You are added in new course"
            );

          console.log(emailResponse);

          return res.status(200).json({
            success : true,
            message : "Student Enrolled In Course Successfully"
          });


      }catch(error){
        console.log(error);
        return res.status(500).json({
          success : false,
          message : error.message
        });
      }
  }
  else{
    return res.status(500).json({
      success : false,
      message : "Invalid request"
    });
  }
}
