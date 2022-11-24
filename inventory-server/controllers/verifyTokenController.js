const jwt = require("jsonwebtoken");
const User = require("../models/User");
const user = require("../models/User")
const verifyTokenController = async (req,res)=>{
    res.send(req.query);

    if(!token){
        return res.status(404).json({success: false, msg: "invalid Token"})
    }

    //decoding token
    let decodedToken;
    try{
        deccodedToken = jwt.verify(token, "$hvbhasdfcd");
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


    res.status(200).json({success:true, data: decodedToken.email});
};

module.exports = verifyTokenController;