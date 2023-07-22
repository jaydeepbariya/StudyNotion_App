const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const {fileUploader} = require('../utils/fileUploader');

exports.createSubSection = async (req,res) => {
    try{

        const {title, duration, description, sectionId} = req.body;
        const video = req.files.video;

        if(!title || !duration || !description || !sectionId){
            return res.status(400).json({
                success : false,
                message : "All Fields Required"
            });
        }

        const videoUploaded = fileUploader(video, process.env.FOLDER_NAME);

        const subSection = await SubSection.create({
            title : title,
            description : description,
            duration : duration,
            videoUrl : videoUploaded.secure_url
        });

        const updatedSection = await Section.findOneAndUpdate(
            {_id : sectionId},
            {$push : {subSection : subSection._id}},
            {new : true}
        ).populate('subSection').exec();

        return res.status(200).json({
            success : true,
            message : "SubSection Created Successfully",
            updatedSection
        });
    }catch(error){
        console.log("Error ", error);
        return res.status(400).json({
            success : false,
            message : "Error In SubSection Creation, Please Try Again",
            error : error.message
        });
    } 
}


exports.updateSubSection = async (req,res) => {
    try{

        const {title, description, duration, subSectionId} = req.body;
        const video = req.files.video;

        let updatePayload = {};

        if(title){
            updatePayload.title = title;
        }
        if(description){
            updatePayload.description = description;
        }
        if(duration){
            updatePayload.duration = duration;
        }
        if(video){
            const videoUploaded = await fileUploader(video, process.env.FOLDER_NAME);
            updatePayload.videoUrl = videoUploaded.secure_url;
        }

        const updatedSubSection = await SubSection.findOneAndUpdate(
            {_id : subSectionId},
            updatePayload,
            {new : true}
        );
        
        return res.status(200).json({
            success : true,
            message : "SubSection updated successfully"
        });

    }catch(error){
        console.log("Error ", error);
        return res.status(400).json({
            success : false,
            message : "SubSection Update Error, Please Try Again"
        });
    }
}


exports.deleteSubSection = async (req,res) => {
    try{
        const {subSectionId} = req.body;

        if(!subSectionId){
            return res.status(400).json({
                success : false,
                message : "SubSectionId Required"
            });
        }

        await SubSection.deleteOne({_id : subSectionId});

        return res.status(200).json({
            success : true,
            message : "SubSection Deleted Successfully"
        });
    }catch(error){
        console.log("Error ", error);
        return res.status(400).json({
            success : false,
            message : "SubSection Deletion Error, Please Try Again"
        });
    }
}