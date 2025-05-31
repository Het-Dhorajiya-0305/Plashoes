import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';

const verifyUser=async (req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ","")

        if(!token)
        {
            res.status(404).json({
                success:false,
                message:"unathorized user"
            })
        }
        const decodeToken=await jwt.verify(token,process.env.ACCESSS_TOKEN_SECRET);

        const user=await User.findById(decodeToken._id).select("-password -refreshToken");

        if(!user)
        {
            res.status(404).json(
                {
                    success:false,
                    message:"invalid access token"
                }
            )
        }

        req.user=user;
        next();
    } catch (error) {
        res.status(404).json({
            success:false,
            message:"invalid access token"
        })
    }
}
export default verifyUser;