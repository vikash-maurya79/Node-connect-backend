import { User } from "../../model/Models/UserModel.js";

export const verifyOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found from controller"
            })
        }
        user.otp = null;
        user.otpValidity = null;
        user.isOtpUsed = true;
        user.isEmailVerified = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Working well email verified"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Something is broken at our side"
        })
    }
}