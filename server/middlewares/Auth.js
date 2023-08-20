const jwt = require('jsonwebtoken');
const User = require('../models/User');
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
exports.isInstructor = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });
		console.log(userDetails);

		console.log(userDetails.accountType);

		if (userDetails.accountType !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};


//isInstructor
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

        console.log(userDetails);

		if (userDetails.accountType !== "Student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

