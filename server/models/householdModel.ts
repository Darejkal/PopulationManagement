import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface IHousehold  {
    name?: string;
    area: string;
    address: string;
    owner?: ObjectId;
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

const Household:mongoose.Model<IHousehold> = mongoose.models.Household || mongoose.model<IHousehold>("Household", HouseholdSchema);

export default Household;
