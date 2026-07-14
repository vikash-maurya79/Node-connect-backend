import mongoose from "mongoose";
import { requestSchema } from "../schema/requestSchema.js";


export const RequestSchema = mongoose.model('RequestSchema', requestSchema);