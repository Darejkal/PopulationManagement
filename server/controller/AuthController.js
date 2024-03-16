const generateToken = require("../config/jwtToken")
const User = require("../model/userModel")
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler")

//function
const createUser = asyncHandler(async (req, res) => {
    response.status(401).send({
        message:"Not implemented",
    })
})

const login = asyncHandler(async (request, response) => {
    const {email,password}=request.body;
    const currentUser=await User.findOne({email:email});
    if(currentUser && (await currentUser.isPasswordMatched(password))){
        response.status(200).send({
            message: "Login Successfully",
            currentUser:{
                "role":currentUser.role,
                "position":currentUser.position,
                "_id":currentUser._id,
                "email":currentUser.email,
            },
            token: generateToken(currentUser._id),
        })
    }else{
        response.status(401).send({
            message:"Login failure",
        })
    }
});

const changePassword = asyncHandler(async (request, response) => {
    const { email, oldPassword, newPassword } = request.body;

    // Find the user by email
    const currentUser = await User.findOne({ email: email });

    if (currentUser && (await currentUser.isPasswordMatched(oldPassword))) {
        // Check if oldPassword matches the current password

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        const updatedUser = await User.findOneAndUpdate(
            { _id: request.user._id },
            { password: hashedNewPassword }
        );

        response.status(200).send({
            message: 'Password changed successfully',
            updatedUser,
            token: generateToken(updatedUser._id),
        });
    } else {
        response.status(401).send({
            message: 'Invalid credentials or old password does not match',
        });
    }
});


const signup = asyncHandler(async (req, res,next) => {
    console.log("SignUp:",req.body);
    const newUser=await User.create(req.body);
    next()
});
module.exports={login,changePassword,createUser,signup}
