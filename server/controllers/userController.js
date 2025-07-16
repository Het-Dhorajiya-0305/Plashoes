import User from '../models/usermodel.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import validator from 'validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import sendEmail from '../utils/sendEmail.js';

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

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields",
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid email",
        })
    }

    if (password.length < 8) {
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
        message: "user created successfully",
        success: true,
        user: createdUser
    })
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
            message: "Invalid Username"
        })
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(404).json({
            success: false,
            message: "Invalid Password"
        })
    }
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
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

// login using google oauth

const googleLogin = asyncHandler(async (req, res) => {
    const googleUser = req.user;


    if (!googleUser) {
        return res.status(400).json({
            success: false,
            message: "Google user not found"
        });
    }

    // Extract user info from Google profile
    const email = googleUser._json.email;
    const name = googleUser.displayName;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email not available from Google"
        });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    // If not, register a new user
    if (!user) {
        user = await User.create({
            userName: name.trim(),
            email,
            password: "google-oauth-password"
        });
    }


    // Generate tokens
    if (!user._id) {
        return res.status(500).json({
            success: false,
            message: "User ID not found"
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    if (!accessToken || !refreshToken) {
        return res.status(500).json({
            success: false,
            message: "Error generating tokens"
        });
    }

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    };

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, option)
        .cookie("accessToken", accessToken, option)
        .redirect(`http://localhost:5173/oauth/success?accessToken=${accessToken}`)
});


// logout user

const logOutUser = asyncHandler(async (req, res) => {
    const logoutUser = await User.findByIdAndUpdate(
        req.userId,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        })

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    }


    return res
        .status(200)
        .clearCookie("refreshToken", option)
        .clearCookie("accessToken", option)
        .json({
            success: true,
            username: logoutUser.userName,
            message: "user successfully logout!!"
        })
})

// authorization

const checkAuth=asyncHandler(async (req,res) => {
    return res.status(200).json({
        success:true,
        message:"authorizes user"
    })

})

// forgot password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(404).json({
            success: false,
            message: "Email id required"
        })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid email",
        })
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user did not exist!"
        })
    }

    const accestoken = await user.generateAccessToken();

    const redirectUrl = `http://localhost:5173/reset-password/${accestoken}`;
    // const redirectUrl=`${process.env.FRONTEND_URL}/reset-password/${accestoken}`;

    const message = "Reset your password by clicking on the link below:\n\n" + redirectUrl;

    const mailResponse = await sendEmail(user.email, 'Reset Password', message)

    if (!mailResponse) {
        return res.status(500).json({
            success: false,
            message: "Error in sending email"
        })
    }

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    }


    return res.status(200).cookie('accessToken', accestoken, option).json({
        success: true,
        message: "Email successfully sent to your email address, please check your email"
    })
})


// change password


const resetPassword = asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({
            success: false,
            message: "please provide new password"
        })
    }

    const user = await User.findById(req.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }

    const isPasswordCorrect = await user.isPasswordCorrect(newPassword)

    if (isPasswordCorrect) {
        return res.status(404).json({
            success: false,
            message: "new password should not be same as old password"
        })
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false })

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    }

    return res.status(200).clearCookie('accessToken',option).json({
        success: true,
        message: "password changed successfully"
    })
})


// admin login

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
        return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD); // Use hashed password
    if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    const accessToken = jwt.sign(
        { email, isAdmin: true },
        process.env.ACCESSS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    }

    return res.status(200).cookie('adminAccessToken', accessToken, option).json({
        success: true,
        message: 'Login successful',
        accessToken,
    });
});

// admin logout

const adminLogOut = asyncHandler(async (req, res) => {
    const option = {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
    }
    return res.status(200).clearCookie("adminAccessToken", option).json({
        success: true,
        message: "admin logout!!"
    })
})


export { registerUser, loginUser, logOutUser, adminLogin, resetPassword, adminLogOut, googleLogin, forgotPassword,checkAuth };