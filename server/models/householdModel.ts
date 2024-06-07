import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface IHousehold  {
    name?: string;
    area: string;
    address: string;
    owner?: ObjectId;
    memberNumber?: number;
}

const HouseholdSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        area: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Individual",
        },
        memberNumber: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Household:mongoose.Model<IHousehold> = mongoose.models.Household || mongoose.model<IHousehold>("Household", HouseholdSchema);

export default Household;
