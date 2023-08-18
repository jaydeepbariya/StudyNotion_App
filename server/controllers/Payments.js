const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/MailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

exports.capturePayment = async (req, res) => {
  
  console.log(req.body);

  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({ success: false, message: "Please provide course Id"});
  }

  let totalAmount = 0;

  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could not find course"
        });
      }

      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student already enrolled"
        });
      }

      totalAmount += course.price;

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  var instance = new Razorpay({ key_id: "rzp_test_rOIxWyv3Ka9Sfq", key_secret: "uqzZhhbrm5ctbT8F9v1wCUt5" });

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);

    return res.json({
      success: true,
      paymentResponse
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.verifySignature = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if ( 
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    enrollStudent(courses, userId, res);

    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }
  return res.status(200).json({
    success: false,
    message: "Payment Failed",
  });
};

const enrollStudent = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide data for courses and userId",
    });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: "Course not found" });
      }

      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );

      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Enrollment Confirmation - StudyNotion",
        courseEnrollmentEmail(
          enrolledCourse?.courseName,
          `${enrolledStudent?.firstName}`
        )
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  try {
    const enrolledStudent = await User.findById(userId);
    const emailResponse = await mailSender(
      enrolledStudent.email,
      "Payment Received - StudyNotion",
        `${enrolledStudent.firstName} ${enrolledStudent.lastName} Amount : ${amount / 100} Order Id : ${orderId} Payment Id : ${paymentId}`
    );
    console.log(emailResponse);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

