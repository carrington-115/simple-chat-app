require("dotenv").config({ path: "/.env" });
const { createServer } = require("http");
const { Server } = require("socket.io");
const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
  },
});

io.on("connection", (socket) => {
  console.log(socket);
});

server.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
