const jwt = require("jsonwebtoken");
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
module.exports = generateToken;
// const sendToken = (user, statusCode, res) => {
//   // Create Jwt token
//   const token = user.getJwtToken();

//   // Options for cookie
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   res.status(statusCode).cookie("token", token, options).json({
//     success: true,
//     token,
//     user,
//   });
// };
