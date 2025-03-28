const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { Socket } = require("dgram");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

io.on("connection", (socket) => {
    // console.log("connected: ",socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log('join_room', data);

        // console.log(`user id: ${socket.id}, joined room ${data}`)
    })

    socket.on("send_message", (data) => {
        console.log('send_message', data);

        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect", () => {
        // console.log("user out: ", socket.id);
    });
});

server.listen(3001, () => {
    console.log('server');
});