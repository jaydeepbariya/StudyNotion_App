const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');


exports.createRating = async (req,res)=>{
    try{
        const {rating, review, courseId} = req.body;

        console.log(req.body);

        const userId = req.user.id;

        if(!rating || !review || !courseId) {
            return res.status(500).json({
                success : false,
                message : "All Fields Required"
            });
        }

        const ratingAndReview = await RatingAndReview.create({
            user : userId,
            rating : rating,
            review : review
        });

        const course = await Course.findOneAndUpdate(
            { _id : courseId},
            { $push : {ratingAndReviews : ratingAndReview}},
            { new : true}
        );

        return res.status(200).json({
            success : true,
            message : "Rating And Review Added Successfully"
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }

}

exports.getAverageRating = async (req,res)=>{
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(500).json({
                success : false,
                message : "CourseId Required"
            });
        }

        const course = await Course.findById(courseId).populate("ratingAndReviews").exec();
        
        const courseRatingAndReviews = course.ratingAndReviews;

        let sumRating=0;
        for(let i=0;i<courseRatingAndReviews.length;i++){
            sumRating += courseRatingAndReviews[i].rating;
        }

        const avgRating = sumRating/courseRatingAndReviews.length;

        return res.status(200).json({
            success : true,
            message : "Avg Rating of Course Found",
            avgRating : avgRating,
            courseId : courseId
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }

}

exports.getAllRating = async (req,res)=>{
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(500).json({
                success : false,
                message : "CourseId Required"
            });
        }

        const course = await Course.findById(courseId).populate("ratingAndReviews").exec();

        if(!course){
            return res.status(500).json({
                success : false,
                message : "No Course Found"
            });
        }

        const allRatingCourse = course.ratingAndReviews;

        return res.status(200).json({
            success : true,
            message : 'Course Rating Found Successfully',
            courseRatings : allRatingCourse
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }

}