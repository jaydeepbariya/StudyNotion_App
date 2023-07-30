const Course = require("../models/Course");
const {fileUploader} = require("../utils/fileUploader");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
	try {
		const userId = req.user.id;

		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions
		} = req.body;

		console.log("REQ BODY...", req.body);

		const thumbnail = req?.files?.thumbnail;

		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}

		const thumbnailImage = await fileUploader(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);

		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});


		await User.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);

		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {

		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: 1,
        courseDescription: 1,
        whatYouWillLearn: 1,
        price: 1,
        instructor: 1,
        ratingAndReviews: 1,
        studentsEnrolled: 1,
      }
    )
      .populate("instructor")
      .exec();

    if (allCourse.length == 0) {
      return res.status(404).json({
        success: false,
        message: "No Course Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Courses",
      courses: allCourse,
    });
  } catch (error) {
	console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error In Fetching Courses, Please Try Again",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(500).json({
        success: false,
        message: "CourseId Required",
      });
    }

    const courseDetails = await Course.findById({ _id: courseId })
      .populate("instructor")
      .populate("courseContent")
      .populate("ratingAndReviews")
      .populate("category")
      .exec();

    if(!courseDetails){
      return res.status(500),json({
        success : true,
        message : "No Course Exists"

      });
      
    }
    
    return res.status(200).json({
      success : true,
      message : "CourseDetails Are Here",
      courseDetails : courseDetails
    });

  } catch (error) {
    return res.status(500).json({
      success : false,
      message : "CourseDetails Not Found"
    });
    
  }
};
