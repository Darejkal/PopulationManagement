import mongoose from "mongoose"
import bcrypt from "bcrypt";
export interface IUser{
    email:string,
    password:string,
    firstname:string,
    lastname:string,
    phoneNumber:string,
    CCCD?:string,
    sex?:string,
    position:"Admin"|"User",
    household?:string
    status?:string,
    hokhau?:string
}
export interface IUserDocument extends mongoose.Document,IUser{
    isPasswordMatched: (password:string)=>Promise<any>;
}
const UserSchema = new mongoose.Schema<IUserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        sex: {
            type: String,
        },
        CCCD: {
            type: String,
        },
        household: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Household",
        },
        status:{
            type: String,
            enum:["Cư dân","Tạm trú","Tạm vắng","Người Dùng"]
        },
        position: {
            type: String,
            enum:["Admin","User"],
            default:"User"
        },
        hokhau: {
            type: String,
        }
    },
    {
        timestamps:true
    }
);

UserSchema.methods.isPasswordMatched=async function (password:string){
    return await bcrypt.compare(password,this.password);
}
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
let userModel=mongoose.models.User
if(!userModel){
    userModel= mongoose.model<IUserDocument>("User",UserSchema)
}

export default (userModel as mongoose.Model<IUserDocument>)