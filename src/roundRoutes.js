const words = ["cat", "dog", "foo"];

export const roundData = {
  players: [],
  drawingPlayer: null,
  endRoundTime: null,
  currentWord: null,
};

export function handleRoundSocketRoutes(socket, io) {
  socket.on("client-ready", (username, cb) => {
    const player = { username, id: socket.id };
    roundData.players.push(player);

    if (roundData.players.length == 1) {
      startNewRound(io);
      console.log("round started");
    }

    cb(player);

    // send data to player after adding the player
    socket.emit("round-data", roundData);

    // tell other players
    socket.broadcast.emit("player-joined", player);
    socket.broadcast.emit("get-canvas-state");
    // console.log(roundData);
  });

  socket.on("get-round", () => {
    socket.emit("round-data", roundData);
  });

  socket.on("disconnect", () => {
    console.log(roundData);
    const p = roundData.players.find((val) => val.id == socket.id);
    roundData.players.splice(roundData.players.indexOf(p), 1);
    console.log(roundData);
    socket.broadcast.emit("player-left", socket.id);
  });
}

export function startNewRound(io) {
  if (roundData.players.length)
    roundData.drawingPlayer =
      roundData.players[Math.floor(Math.random() * roundData.players.length)];
  roundData.endRoundTime = Date.now() + 5 * 1000;
  roundData.currentWord = words[Math.floor(Math.random() * words.length)];
  console.log(roundData);

  io.emit("round-data", roundData);
}
