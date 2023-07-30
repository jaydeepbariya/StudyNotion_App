const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req,res) => {
    try{

        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : "SectionName and CourseId Both Required"
            });
        }

        const section = await Section.create({sectionName : sectionName});

        const updatedCourse = await Course.findOneAndUpdate(
            {_id : courseId},
            {
                $push : {courseContent : section._id}
            },
            { new : true }
        ).populate("courseContent").exec();
        //How to populate children object of courseContent

        return res.status(200).json({
            success : true,
            message : "Section Created Successfully",
            updatedCourse : updatedCourse
        });

    }catch(error){
        console.log("Error In Section Creation ", section);
        return res.status(400).json({
            success : false,
            message : "Error In Section Creation, Please Try Again"
        });
    }
}


exports.updateSection = async (req,res)=>{
    try{
        const {sectionName,sectionId} = req.body;

        if(!sectionName){
            return res.status(400).json({
                success : false,
                message : "SectionName Required"
            });
        }

        const updatedSection = await Section.findOneAndUpdate(
            { _id : sectionId },
            {sectionName : sectionName },
            {new : true}
        );

        return res.status(200).json({
            success : true,
            message : "Section Updated Successfully"
        });

    }catch(error){
        console.log("Error ",error);
        return res.status(400).json({
            success : false,
            message : "Update Section Error, Please Try Again"
        });
    }
}


exports.deleteSection = async (req,res) => {
    try{
        const {sectionId} = req.body;

        if(!sectionId){
            return res.status(400).json({
                message : "SectionId Required"
            });
        }

        await Section.deleteOne({_id : sectionId});

        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully"
        });

    }catch(error){
        console.log("Error ", error);
        return res.status(400).json({
            success : false,
            message : "Error In Deletion of Section, Please Try Again"
        });
    }
}

