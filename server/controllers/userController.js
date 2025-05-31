import User from '../models/usermodel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import validator from 'validator';


const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
        return error
    }
}

// register user

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { userName, email, password } = req.body;


    if (!userName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields",
        })
    }

    if(!validator.isEmail(email))
    {
        return res.status(400).json({
            success: false,
            message: "Please provide valid email",
        })
    }
    if(password.length<8)   
    {
        return res.status(400).json({
            success: false,
            message: "password should be atleast 8 characters",
        })
    }
    const existedUser = await User.findOne(
        {
            $or: [
                { userName },
                { email }
            ]
        }
    )
    if (existedUser) {
        return res.status(400).json({
            success: false,
            message: "username already exists",
        })
    }

    const newUser = await User.create({
        userName: userName,
        email: email,
        password: password,
    })

    const createdUser = await User.findById(newUser._id).select(
        "-password"
    )

    if (!createdUser) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
    return res.status(200).json({
        message:"user created successfully",
        success: true,
        user: createdUser})
})

// loginUser


const loginUser = asyncHandler(async (req, res) => {

    const { userName, password } = req.body;

    console.log(req.body)

    if (!userName || !password) {
        return res.status(404).json({
            success: false,
            message: "userName and password are required"
        })
    }

    const user = await User.findOne({ userName })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user does not exist!!"
        })
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            success: false,
            message: "invalid password"
        })
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true
    }


    return res
        .status(200)
        .cookie("refreshToken", refreshToken, option)
        .cookie("accessToken", accessToken, option)
        .json({
            success: true,
            user: loggedInUser,
            accessToken,
            refreshToken,
            message: "login successfully"
        })




})

// logout user

const logOutUser = asyncHandler(async (req, res) => {
    const logoutUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        })

    const option={
        httpOnly:true,
        secure:true
    }

    return res
            .status(200)
            .clearCookie("refreshToken",option)
            .clearCookie("accessToken",option)
            .json({
                success:true,
                username:logoutUser.userName,
                message:"user successfully logout!!"
            })
})

// change password


const changePassword=asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword}=req.body;

    if(!oldPassword||!newPassword)
    {
        return res.status(400).json({
            success:false,
            message:"please provide all the fields"
        })
    }


    const user=await User.findById(req.user?._id);


    if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }

    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect)
    {
        return res.status(404).json({
            success:false,
            message:"invalid password"
        })
    }

    if(oldPassword===newPassword)
    {
        return res.status(404).json({
            success:false,
            message:"new password should not be same as old password"
        })
    }

    user.password=newPassword;
    await user.save({validateBeforeSave:false})

    return res.status(200).json({
        success:true,
        message:"passord changed successfully"
    })

})


export { registerUser, loginUser, logOutUser, changePassword };