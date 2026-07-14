import { User } from "../../model/Models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("request recived");
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "Invalid input"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found with this email"
            })
        }
        const pass_check = await bcrypt.compare(password.toString(), user.password);
        if (!pass_check) {
            return res.status(403).json({
                success: false,
                message: "Incorrect password"
            })
        }
        if (!user.isEmailVerified) {
            return res.status(403).json({
                success: false,
                message: "Email not verified"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({
            success: true,
            message: "Login successfull"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something broken"
        })
    }
}