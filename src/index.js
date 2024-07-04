import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import expressRoutes from "./express.js";
import socketIo from "./socketIo.js";

export const app = express();
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://127.0.0.1:8080"],
  },
});

expressRoutes.init();
socketIo.init();

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
