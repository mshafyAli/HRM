import express from "express";
import User from "../models/User.js";
import errorHandler from "../utills/errorHandler.js";
import jwt from "jsonwebtoken";
import sendMail from "../utills/sendMail.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import sendToken from "../utills/jwtTokens.js";
import  isAuthenticatedUser  from "../middleware/auth.js";

const router = express.Router();


router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body); // Verify request body

    if (!name || !email || !password) {
      return next(new errorHandler("All fields are required", 400));
    }

    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new errorHandler("Email already exists", 400));
    }

    const user = { name, email, password };

    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:5173/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account.`,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  } catch (err) {
    console.log(err);
    return next(new errorHandler(err.message, 400));
  }
});

// Create activation token function
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

// Activate User route
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      if (!newUser) {
        return next(new errorHandler("Invalid token", 400));
      }

      const { name, email, password } = newUser;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return next(new errorHandler("User already exists", 400));
      }

      // Create new user
      user = await User.create({
        name,
        email,
        password,
      });

      // Send token response
      sendToken(user, 201, res);
    } catch (err) {
      return next(new errorHandler(err.message), 500);
    }
  })
);

//login Routes

router.post("/login-user",catchAsyncError(async(req,res,next)=>{

    try{
      const {email, password} = req.body;
      if(!email || !password){
        return next(new errorHandler("Please enter email and password", 400));
      }
      const user = await User.findOne({email}).select("+password");
      if(!user){
        return next(new errorHandler("User not found", 400));
      }
      const isPasswordValid = await user.comparePassword(password);
      if(!isPasswordValid){
        return next(new errorHandler("please provide the correct Information", 400));
      }
      
      sendToken(user, 200, res);
    }catch(err){
  
      return next(new errorHandler(err.message), 500);
  
    }
    
  
  
  })
  );
  // load User
  router.get("/get-user",isAuthenticatedUser,catchAsyncError(async(req,res,next)=>{
    
    try{
  
      const user = await User.findById(req.user.id);
  
      if(!user){
        return next(new errorHandler("User not found", 400));
      }
  
      res.status(200).json({
        success: true,
        user
      })
  
  
  
    }catch(err){
      return next(new errorHandler(err.message), 500);
  
    }
  
  
  }))
  





export default router;
