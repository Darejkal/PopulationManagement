import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IFeeHouseholdRel  {
    household: ObjectId;
    fee: ObjectId;
    paymentTime?: Date;
    amount: number;
    status?: boolean;
    relList?: ObjectId;
    name: string;
    startTime:Date,
    lateTime:Date,
    required:boolean
}

const FeeHouseholdRelSchema: Schema<IFeeHouseholdRel> = new mongoose.Schema(
    {
        household: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Household",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        fee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fee",
            required: true
        },
        startTime:{
            type: Date,
            required:true,
        },
        lateTime:{
            type: Date,
            required:true,
        },
        paymentTime: {
            type: Date,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        relList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RelList",
        },
        required:{
            type:Boolean,
            default:false,
        }
    }
);

const FeeHouseholdRel:mongoose.Model<IFeeHouseholdRel> = mongoose.models.FeeHouseholdRel || mongoose.model<IFeeHouseholdRel>("FeeHouseholdRel", FeeHouseholdRelSchema);

export default FeeHouseholdRel;
