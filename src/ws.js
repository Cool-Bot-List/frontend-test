import socketIoClient from "socket.io-client";

export const io = socketIoClient("http://localhost:5000");
