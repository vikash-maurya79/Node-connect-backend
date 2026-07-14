import bcrypt from "bcrypt"
import { User } from "../model/Models/UserModel.js";
export const otpExpiry = async (req, res, next) => {
    try {
        console.log("log1");
        const { email, otp } = req.body;
        let user = await User.findOne({ email });
        console.log("log2");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }
        console.log("log3");
        if (user.isOtpUsed) {
            return res.status(403).json({
                success: false,
                message: "OTP used"
            })
        }
        console.log("log4");
        if (Date.now() > user.otpValidity) {
            return res.status(403).json({
                success: false,
                message: "OTP Expired"
            })
        }
        console.log("log5");
        console.log(user.otp);
        let match_password = await bcrypt.compare(otp.toString(), user.otp.toString());
        console.log(match_password);
        if (!match_password) {
            return res.status(403).json({
                success: false,
                message: "OTP not matched"
            })
        }
        console.log("log6");
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something is broken at our side",
            error: error
        })
    }
}