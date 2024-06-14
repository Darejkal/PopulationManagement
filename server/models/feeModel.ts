import mongoose, { Schema, Document } from "mongoose";

export interface IFee  {
    name: string;
    amount: number;
    description?: string;
    frequency: "yearly" | "monthly";
	houseType: "Penhouse"|"House"|"Kiot"|"Underground"|"All"|"Individual";
    weight:"None"|"HouseSize",
    useremail?:string
}

const FeeSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        weight: {
            type: String,
            enum: ["None", "HouseSize"],
            default:"None",
            required: true,
        },
        description: {
            type: String,
        },
        useremail: {
            type: String,
        },
        frequency: {
            type: String,
            enum: ["yearly", "monthly"],
            required:true
        },
	    houseType:{
            type:String,
            enum:["Penhouse","House","Kiot","Underground","All","Individual"],
        }
    },
    {
        timestamps: true,
    }
);
const Fee:mongoose.Model<IFee> = mongoose.models.Fee || mongoose.model<IFee>("Fee", FeeSchema);

export default Fee;
