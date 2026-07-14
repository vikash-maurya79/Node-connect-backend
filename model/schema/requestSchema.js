import mongoose from "mongoose";

export const requestSchema = new mongoose.Schema({
    sentBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sentTo: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        default: null
    },
    seen: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false

    },
    dateTime: {
        type: String,
        required: true
    }
})