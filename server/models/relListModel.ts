import mongoose, { ObjectId ,Document} from "mongoose";

export interface IRelList {
    name?:string,
    creator?:ObjectId,
    type?:string
}
const RelListSchema = new mongoose.Schema(
    {
        name:{
            type:String,
        },
        creator:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        },
        type:{
            type:String,
        }
    },
    {
        timestamps:true
    }
);
export default (mongoose.models.RelList|| mongoose.model<IRelList>("RelList",RelListSchema)) as mongoose.Model<IRelList>
