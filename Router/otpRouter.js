import express from "express"
import { generateOtpController } from "../Controller/generateOtpController/generateOtpController.js";
import { verifyOtpController } from "../Controller/verifyOtpController.js/verifyOtpController.js";
import { otpExpiry } from "../Utils/verifyOtp.js";
const router = express.Router();

router.post("/generate-otp", generateOtpController);
router.post("/verify-otp", otpExpiry, verifyOtpController);


export default router;