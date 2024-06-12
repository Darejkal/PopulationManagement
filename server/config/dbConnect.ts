import userModel from "../models/userModel";

const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
    console.log(process.env.MONGODB_URL)
    mongoose.connect(
        process.env.MONGODB_URL
    ).then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
        userModel.findOne({email:"admin@admin.com"}).then((v)=>{
            if(!v){
                userModel.create({
                    email:"admin@admin.com",
                    password:"admin@admin.com",
                    firstname:"admin@admin.com",
                    lastname:"admin@admin.com",
                    phoneNumber:"admin@admin.com",
                    position:"Admin"
                })
            }
        })
    }).catch((error:any) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    })
}

export default dbConnect;


