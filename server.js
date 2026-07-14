import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import mongoose from "mongoose";
import http from "http";
import cookieParser from 'cookie-parser'


import userRouter from "./Router/userRouter.js"
import otpRouter from "./Router/otpRouter.js";
import getUserRouter from './Router/getUserRouter.js'
import { disconnect } from "cluster";
import { connectSocket } from "./Utils/socket.js";

const app = express();
const server = http.createServer(app);
dotenv.config();
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))


connectSocket(server);



app.use("/user", userRouter);
app.use("/auth", otpRouter);
app.use('/getUser', getUserRouter);

server.listen(8000, async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected")
    console.log("SERVER STARTED AT PORT 8000");
})