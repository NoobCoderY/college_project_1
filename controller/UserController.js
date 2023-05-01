import { User } from "../model/User.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import sendToken from "../utils/sendToken.js";
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        let flag = false;
        const user = await User.create({
            name,
            email,
            password,
            role
        })


        sendToken(user, 200, res);

    } catch (error) {
        return next(new ErrorHandler(error, 200))

    }

}

export const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        console.log(email,password);
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }

        const user = await User.findOne({ email }).select("+password");
        if(user===null)
        {
            return next(new ErrorHandler("user not found", 401));
        }
          
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        sendToken(user,200,res)

    } catch (error) {
        return next(new ErrorHandler(error, 200))

    }
}

export const logOutUser=async(req,res,next)=>{
     try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
          });
        
          res.status(200).json({
            success: true,
            message: "Logged Out",
          });
        
     } catch (error) {
        return next(new ErrorHandler(error, 200))
     }
}