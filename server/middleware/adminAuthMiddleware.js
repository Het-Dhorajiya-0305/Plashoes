import { faDiagramNext } from '@fortawesome/free-solid-svg-icons'
import jwt from 'jsonwebtoken'


const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("token")?.replace("Bearer ", "")

        console.log(token)

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }

        const token_decode = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        console.log(token_decode)
        console.log( process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD)

        if (token_decode !== process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD) {
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