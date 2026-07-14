import jwt from 'jsonwebtoken'
import { User } from '../../model/Models/UserModel.js';
export const isLoggedinController = async (req, res) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(403).json({
                success: false,
                message: "Token not found"
            })
        }
        let cookie_check = jwt.decode(token, process.env.JWT_SECRET);
        if (!cookie_check) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        let user = await User.findById(cookie_check.userId);
        let new_user = {
            userId: user._id,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            userType: user.userType
        }
        console.log(new_user);
        res.status(200).json({
            success: true,
            message: "Is loggedin response is well",
            data: new_user
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Internal server error"
        })
    }

}