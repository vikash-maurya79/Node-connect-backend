import { User } from "../../model/Models/UserModel.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;
        if (!username || !email || !password || !userType) {
            return res.status(403).json({
                success: false,
                message: "Fill all fields"
            })
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(402).json({
                success: false,
                message: "Email already registered"
            }
            )
        }
        let hashed_password = await bcrypt.hash(password.toString(), 10);
        let new_user = new User({
            username: username,
            email: email,
            password: hashed_password,
            userType: userType
        })
        await new_user.save();
        res.status(200).json({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Something broken"
        })
    }

}