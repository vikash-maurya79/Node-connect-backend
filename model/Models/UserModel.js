import mongoose from "mongoose";
import { userSchema } from "../schema/UserSchema.js";

export const User = mongoose.model("User", userSchema);