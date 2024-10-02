const jwt  = require("jsonwebtoken");

module.exports.generateToken = (user)=>{
    return jwt.sign({id: user._id, email: user.email , fullname : user.fullname}, process.env.JWT_KEY);
}