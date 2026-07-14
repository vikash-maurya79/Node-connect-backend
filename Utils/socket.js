import { Server } from "socket.io";
import { RequestSchema } from "../model/Models/RequestModel.js";

export const connectSocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log(`User connected: ${socket.id}`);

        let roomid;

        socket.on("join-room", (roomId) => {

            roomid = roomId;

            socket.join(roomId);

            console.log(`Joined room ${roomId}`);

        });

        socket.on("send-message", (message) => {

            console.log("Message:", message);

            io.emit("send_message_to_all", message);

        });

        socket.on("offer", (offer) => {

            socket.to(roomid).emit(
                "offer",
                offer
            );

        });

        socket.on("answer", (answer) => {

            socket.to(roomid).emit(
                "answer",
                answer
            );

        });

        socket.on("ice-candidate", (candidate) => {

            socket.to(roomid).emit(
                "ice-candidate",
                candidate
            );

        });

        socket.on("disconnect", () => {

            console.log(
                `User disconnected: ${socket.id}`
            );

        });
        socket.on('send-request', async (data) => {
            console.log("request recived");
            let request = new RequestSchema({
                sentBy: data.sendBy,
                sentTo: data.sendTo,
                message: data.msg,
                dateTime: data.date,
            })
            let res = await request.save();
            console.log("response after saveing request", res);
            socket.emit('request-recived', data);
            console.log(data);
        })

    });

};