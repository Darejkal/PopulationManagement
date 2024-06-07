const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
    console.log(process.env.MONGODB_URL)
    mongoose.connect(
        process.env.MONGODB_URL
    ).then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    }).catch((error:any) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    })
}

export default dbConnect;


