import { User } from "../../model/Models/UserModel.js";
import { sendEmail } from "../../Utils/sendEmail.js";
import bcrypt from "bcrypt";

export const generateOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Enter email"
            })
        }
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user registered with this email"
            })
        }
        if (Date.now() <= (user.otpValidity) - 9 * 60 * 1000) {
            return res.status(400).json({
                success: false,
                message: "Re generate otp after 60 seconds"
            })
        }
        let otp = Math.floor(1000 + Math.random() * 9000);
        await sendEmail(`Your OTP for email verification is ${otp}`, email, "OTP for email verification on Node Connect");
        let hashed_otp = await bcrypt.hash(otp.toString(), 10);
        let otp_validity = Date.now() + 10 * 60 * 1000;
        user.otpValidity = otp_validity;
        user.otp = hashed_otp;
        user.isOtpUsed = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Working well"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Somthing went wrong at our side"
        })
    }

}