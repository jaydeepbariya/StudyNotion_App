const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const categoryCheck = await Category.findOne({ name: name });

    if (categoryCheck) {
      return res.status(400).json({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    console.log("Error ", error);
    return res.status(400).json({
      success: false,
      message: "Error In Adding Category, Please Try Again",
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, { name: 1, desc: 1, course: 1 });

    if (!categories) {
      return res.status(400).json({
        success: false,
        message: "No Categories Exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Categories",
      categories,
    });
  } catch (error) {
    console.log("Error ", error);
    return res.status(400).json({
      success: false,
      message: "Something Went Wrong, Please Try Again",
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    const { categoryId } = req.body;

    //find all courses with this categoryId
    const selectedCategoryCourses = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    //validations
    if (!selectedCategoryCourses) {
      return res.status(404).json({
        success: false,
        message: "No Courses with this category",
      });
    }

    //different category courses
    const differentCategoryCourses = await Category.find({ _id : {$ne : categoryId}}).populate('courses').exec();


    //like top selling courses
    const topSellingCourses = await Course.find()
      .sort({ studentsEnrolled: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      message: "Category Page Data Fetched Successfully",
      data : {
        selectedCategoryCourses,
        topSellingCourses,
        differentCategoryCourses
      }
    });
  } catch (error) {
    console.log(error);

    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getCoursesByCategoryId = async (req,res)=>{
  
  const {categoryId} = req.params;
  
  if(!categoryId){
    return res.status(400).json({
      success : false,
      message : "categoryId required"
    });
  }

  try{
    const response = await Category.findById(categoryId).populate({
      path : "courses",
      populate : {
        path : "ratingAndReviews",
        model : "RatingAndReview"
      },
      populate: {
        path: 'instructor',
        model: 'User'
      },
      
    }).exec();
    
    const result = response.courses;

    return res.status(200).json({
      success : true,
      message : `Courses of Category ${response.name}`,
      courses : result,
      name : response.name,
      description : response.description
    });

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success : false,
      message : error.message
    })
    }
}