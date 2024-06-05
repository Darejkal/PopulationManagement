const mongoose = require("mongoose");
const khoanPhiSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        amount:{
            type:Number,
            required: true,
        },
        description:{
            type:String,
        },
        feeType:{
            type:String,
            enum:["Household","Individual"],
        },
        frequency:{
            type: String,
            enum:["yearly","monthly"],
        }

    },
    {
        timestamps:true
    }
);
module.exports = mongoose.models.KhoanPhi || mongoose.model("KhoanPhi",khoanPhiSchema)



