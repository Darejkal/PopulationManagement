import mongoose from "mongoose"
import bcrypt from "bcrypt";
export interface IUser{
    email:string,
    password:string,
    firstName:string,
    lastname:string,
    phoneNumber:string,
    address?:string,
    identifyCardId?:string,
    sex:string,
    role:string,
    position:"Admin"|"User"
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
        firstName: {
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
            required: true
        },
        role: {
            type: String,
            default: "user",
        },
        address: {
            type: String,
            // required: true,
        },
        identifyCardId: {
            type: String,
            // required: true,
        },
        position: {
            type: String,
            enum:["Admin","User"],
            default:"User"
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


export default (mongoose.models.User|| mongoose.model<IUserDocument>("User",UserSchema)) as mongoose.Model<IUserDocument>