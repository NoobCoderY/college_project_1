import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema({
    assinged_driver: {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        }
    },

    address: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    },
    

    binStatus: {
        type: String,
        enum: ["Empty", "halfFilled", "Full"],
        default: "Empty",
    },


})

Schema.index({location:"2dsphere"})



export const binSchema = mongoose.model("binSchema", Schema)
