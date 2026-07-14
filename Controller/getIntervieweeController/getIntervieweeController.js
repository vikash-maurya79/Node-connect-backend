import { StatusCodes } from "http-status-codes"
import { User } from "../../model/Models/UserModel.js"

export const getInterviewee = async (req, res) => {
    try {
        let result = await User.find({ userType: "Interviewee" }).select(" username email userType skills resume");
        console.log("result after query", result);
        if (!result || result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Data not found"
            })
        }
        res.status(StatusCodes.OK).json({
            success: true,
            message: "working well",
            result
        })
    } catch (error) {

    }
}