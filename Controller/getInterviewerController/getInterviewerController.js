import { User } from "../../model/Models/UserModel.js"
import { StatusCodes } from 'http-status-codes'

export const getUser = async (req, res) => {
    try {
        let result = await User.find({ userType: 'Interviewer' }).select(" username email userType skills resume");
        if (!result || result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "No user found"
            })
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: "Users found",
            result
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            messsage: "Server side error occured"
        })
    }
}