const mailSender = require('../utils/MailSender');

exports.contactUs = async (req,res) => {
    try{    
        const {firstName,lastName,email,countryCode, phoneNumber,message} = req.body;
        console.log("Request Body....", req.body);

        if(!firstName || !lastName || !email || !phoneNumber || !message){
            return res.status(200).json({
                success : false,
                message : 'All Fields Required'
            });
        }

        const mailResponseUser = mailSender(email, "Your Message Received - StudyNotion", 
        "Received Your Message. We will be in touch with you shortly. Thanks");
        console.log("Mail Response User....", mailResponseUser);

        const mailResponseAdmin = mailSender("jaydeepbariya59@gmail.com", "Someone Tried To Reach You", 
            "firstName : " +firstName,
            "lastName : " +lastName,
            "email : " +email,
            "phoneNumber : " + countryCode+ "  " +phoneNumber,
            "message : " +message
        );

        console.log("Mail Response Admin....", mailResponseAdmin);

        return res.status(200).json({
            success : true,
            message : "Contact Request Successful. Will Reach out to you soon. Thanks"
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