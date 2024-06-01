const jwt = require('jsonwebtoken');

const Register = require('../models/student');
const keysecret = process.env.SECRET_KEY

const authenticate = async (req, res, next) => {
   
    const token = req.header("Authorization");
    // console.log(req.header("Authorization"));
    // console.log(token ,)
    if (!token) {
      // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
      return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided" });
    }
  
    // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
    const jwtToken = token.replace("Bearer", "").trim();
    // console.log(jwtToken);
  
    try {
      // Verifying the token
      const isVerified = jwt.verify(jwtToken, keysecret );
    //   console.log(isVerified  , "i am verfy" );
  
      // getting the complete user details & also we don't want password to be sent
      const userData = await Register.findOne({ email: isVerified.email })
    //   console.log(userData , "i am all in one")
  
    //   req.token = token;
      req.user = userData;
    //   req.userID = user._id;
  
      // Move on to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    
}
}
module.exports = authenticate;
