import jwt from 'jsonwebtoken'


const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies?.refreshToken || req.header("token")?.replace("Bearer ", "")

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }

        const token_decode = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        if (token_decode.username+token_decode.password !== process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: false,
                message: "incorrect password"
            })
        }

        next()

    } catch (error) {
        return error;
    }
}

export default verifyAdmin;