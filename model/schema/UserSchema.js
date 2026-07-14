import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: null
    },
    otpValidity: {
        type: Date,
        default: null
    },
    isOtpUsed: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    skills: [{ type: String }],
    userType: {
        type: String,
        enum: ["Interviewer", "Interviewee"],
        default: "Interviewer"
    },
    resume: {
        type: String,
        default: null
    },
    experiance: {
        type: Number,
        default: 'Fresher'
    }

})
