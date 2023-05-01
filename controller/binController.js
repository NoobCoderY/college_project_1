import { User } from "../model/User.js";
import { binSchema } from "../model/bin.js"
import ErrorHandler from "../utils/ErrorHandler.js"

export const createBin = async (req, res, next) => {
    try {
        const { name, email, address, pin, longitude, latitude } = req.body;

        const user = await User.findOne({ name: name, email: email })
        if (user === null) {
            return next(new ErrorHandler("please first register driver", 401))
        }
        const binInfo = {
            assinged_driver: {
                user: user._id
            },
            address: address,
            pin: pin,
            location: {
                coordinates: [
                    longitude, latitude
                ]
            }
        }
        const bin = await binSchema.create(binInfo);
        res.status(201).json({
            success: true,
            bin
        })
        console.log(bin);


    } catch (error) {
        return next(new ErrorHandler(error, 200))

    }
}

export const getAllBin = async (req, res, next) => {
    try {
        console.log(req.user);
        const { name, email } = req.user;

        const bins = await binSchema.find({ assinged_driver: { user: req.user._id } });
        res.status(201).json({
            success: true,
            bins

        })

    } catch (error) {
        return next(new ErrorHandler(error, 400))

    }
}


export const getAllBinAdmin = async (req, res, next) => {
    try {
        const { address } = req.body;
        const bins = await binSchema.find({ address: address })

        res.status(200).json({
            success: true,
            bins
        })

    } catch (error) {
        return (next(new ErrorHandler(error.message, 400)))
    }
}

export const deleteBin = async (req, res, next) => {
    try {
        const { id } = req.params

        const bin = await binSchema.findById(id);
        console.log(bin);

        if (!bin) {
            return next(new ErrorHandler("Bin not found ", 404))

        }

        await bin.deleteOne();

        res.status(200).json({
            success: true,
            message: "delete successfully"

        })

    } catch (error) {
        return (next(new ErrorHandler(error.message, 400)))

    }
}

export const updateBin=async(req,res,next)=>{
   try {
    const id=req.params.id;
    const status=req.body.binStatus
    const bin=await binSchema.findOneAndUpdate({_id:id},{$set:{binStatus:status}},
        {
            new:true,      
    })

    res.status(200).json({
        message:"success",
        bin
    })
   } catch (error) {
    return(next(new ErrorHandler(error,201)))
    
   }

}