import  jwt  from "jsonwebtoken";
import { User } from "../model/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticatedUser= async (req, res, next) => {
   try {
    const { token } = req.cookies;
  
    if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
  
    const decodedData = jwt.verify(token, "mknfksnvksnvvnlzxmvlzdmlmvladm");
  
    req.user = await User.findById(decodedData.id);
  
    next();
    
   } catch (error) {
         return next(new ErrorHandler (error,400));
   }
  };

  export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };