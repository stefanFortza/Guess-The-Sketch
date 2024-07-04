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
  });

  // 30 s per guess
  setInterval(() => {
    if (roundData.players.length) {
      startNewRound(io);
    }
  }, 95000);
}

export default { init };
