import { io } from "socket.io-client";
export const socket = io("http://localhost:5000", {
  withCredentials: true,
});

export const connectToSocket = () => {
  socket.on("connect", () => {
    console.log(
      `${socket.connected ? "socket is connected" : "socket is not connected"}`
    );
    console.log(`user is ${socket.id}`);
  });
};
