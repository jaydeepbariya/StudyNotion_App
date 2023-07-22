const jwt = require('jsonwebtoken');

//auth
exports.auth = async (req,res,next) =>{

    try{
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace("Bearer ", "");
        
        if(!token){
            return res.status(400).json({
                success : false,
                message : "Empty Token"
            });
        }

        let decode;

        try{
            decode = jwt.verify(token, process.env.JWT_SECRET);
        }catch(error){
            console.log("token verification error", error.message);
            return res.status(401).json({
                success : false,
                message : "Invalid Token"
            });
        }

        req.user = decode;

        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({
            success : false,
            message : "Error In Token Validation, Please Try Again"
        });
    }

}

//isInstructor
exports.isInstructor = async (req,res,next) => {
    try{
    if(req.user.accountType != "Instructor") {
        return res.status(400).json({
            success : false,
            message : "This is Protected Route for Instructor Role"
        })
    }
    next();
    }catch(error) {
        return res.status(400).json({
            success : false,
            message : "Error In Instructor Role Validation, Please Try Again"
        });
    }

}

//isInstructor
exports.isStudent = async (req,res,next) => {
    try{
    if(req.user.accountType != "Student") {
        return res.status(400).json({
            success : false,
            message : "This is Protected Route for Student Role"
        })
        next();
    }
    }catch(error) {
        return res.status(400).json({
            success : false,
            message : "Error In Student Role Validation, Please Try Again"
        });
    }

}

//isAdmin
exports.isAdmin = async (req,res,next) => {
    try{
    if(req.user.accountType != "Admin") {
        return res.status(400).json({
            success : false,
            message : "This is Protected Route for Admin Role"
        })
    }
    next();
    }catch(error) {
        return res.status(400).json({
            success : false,
            message : "Error In Admin Role Validation, Please Try Again"
        });
    }

}