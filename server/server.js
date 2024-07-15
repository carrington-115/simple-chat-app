require("dotenv").config({ path: ".env" });
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer();
const socket = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const messages = [];
socket.on("connection", (socket) => {
  console.log(`${socket.id} is connected`);
  socket.on("message", (message) => {
    messages.push(message);
    socket.emit("message", messages);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is running on", process.env.PORT);
});
