const jwt = require("jsonwebtoken");
const User = require("../models/User")

const verifyEmailController = async (req,res)=>{
        const {token} = req.query
        if(!token){
            return res.status(404).json({success: false, msg: "invalid Token"})
        }
    
        //decoding token
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, "$hvbhasdfcd");
        } catch(err){
            return res.status(400).json({success: false, msg: "Invalid Token", error:err})
        }
    
        //checking user present or not
    
        const oldUser = await User.findOne({email: decodedToken.email});
        if(!oldUser){
            return res 
            .status(400)
            .json({success: false, msg: "user not found"})
        }

        oldUser.verified = true;

        res
        .status(200)
        .json({success: true, msg: "you are verified Successfully!"})
};

module.exports = {
    verifyEmailController,

}