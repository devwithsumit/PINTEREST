const jwt  =  require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function(req, res, next){
    try {
        // Check if the token exists in the cookies
        const token = req.cookies.token;

        if (!token) {
            // If no token, redirect to the login page
            return res.redirect('/login');
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Find the user by the decoded token email, excluding the password field
        const user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");

        if (!user) {
            // If user not found, redirect to login
            return res.redirect('/login');
        }

        // Attach the user object to the request
        req.user = user;

        // Proceed to the next middleware
        next();

    } catch (error) {
        // If an error occurs (invalid token, verification failed, etc.), redirect to login
        console.error("Authentication error: ", error.message);
        return res.redirect('/login');
    }
}