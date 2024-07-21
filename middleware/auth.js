import errorHandler from "../utills/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'; 

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("user token",token);

    if(!token){
        return next(new errorHandler("Please Login to access this resource", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new errorHandler("Invalid token", 401));
    }
});

export default isAuthenticatedUser;