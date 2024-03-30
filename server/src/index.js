import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:8080"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("draw-line", ({ prevPoint, currentPoint, color }) => {
    console.log({ prevPoint, currentPoint, color });
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
  });
});

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
