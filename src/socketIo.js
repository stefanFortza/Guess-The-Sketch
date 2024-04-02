import { io } from "./index.js";
import {
  handleRoundSocketRoutes,
  roundData,
  startNewRound,
} from "./roundRoutes.js";
import { handleCanvasSocketRoutes } from "./canvasRoutes.js";
// import { players } from "./round.js";

function init() {
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    handleRoundSocketRoutes(socket, io);

    handleCanvasSocketRoutes(socket, io);

    socket.on("guess", (data) => {
      // socket.broadcast.emit("message", data);
      io.emit("message", data);
      console.log(data);
    });
  });

  // 30 s per guess
  setInterval(() => {
    if (roundData.players.length) {
      startNewRound(io);
    }
  }, 5000);
}

export default { init };
