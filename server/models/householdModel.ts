import mongoose, { ObjectId, Schema, Document } from "mongoose";
import { IFee } from "./feeModel";

export interface IHousehold  {
    name?: string;
    area: string;
    address: string;
    owner?: ObjectId;
}
export interface IHouseholdDocument extends mongoose.Document,IHousehold{
    getHouseholdType:(address:string)=>IFee["houseType"]
}
const HouseholdSchema: Schema<IHouseholdDocument> = new mongoose.Schema(
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
            unique: true,
            validate: {
                validator: function(v:string) {
                    var re = /^(K|U|H|P)\w{4}$/;
                    return (!v || !v.trim().length) || re.test(v)
                },
                message: 'Số nhà cung cấp là chưa chính xác.'
            }
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);
HouseholdSchema.methods.getHouseholdType= (address:string):IFee["houseType"]=>{
    switch (address[0]) {
        case "K":
            return "Kiot"
        case "U":
            return "Underground"
        case "H":
            return "House"
        case "P":
            return "Penhouse"
        default:
            throw "houseType not specified";
    }
}
const Household:mongoose.Model<IHouseholdDocument> = mongoose.models.Household || mongoose.model<IHouseholdDocument>("Household", HouseholdSchema);

export default Household;
