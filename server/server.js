require("dotenv").config({ path: ".env" });
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const messages = [];

io.on("connection", (socket) => {
  console.log(`${socket} is connected`);
  socket.broadcast.emit("user", `${socket.id.substring(0, 5)} is connected`);

  socket.on("message", (message) => {
    console.log(`${socket.id} has send message`);
    messages.push({ id: socket.id.substring(0, 5), message: message });
    io.emit("message", messages);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is running on", process.env.PORT);
});
