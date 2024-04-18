const words = [
  "cat",
  // "dog", "book", "desk", "bottle"
];

export const roundData = {
  roundIndex: 1,
  totalRounds: 4,
  players: [],
  correctGuessPlayers: [],
  drawingPlayer: null,
  endRoundTime: null,
  currentWord: null,
};

export function handleRoundSocketRoutes(socket, io) {
  socket.on("client-ready", ({ name: username, imageSrc }, cb) => {
    const player = { username, id: socket.id, score: 0, imageSrc };
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
    // console.log(roundData);
    const p = roundData.players.find((val) => val.id == socket.id);
    roundData.players.splice(roundData.players.indexOf(p), 1);
    if (p.id == roundData.drawingPlayer.id) startNewRound(io);
    // console.log(roundData);
    socket.broadcast.emit("player-left", p);
  });

  socket.on("guess", ({ message, player }) => {
    // socket.broadcast.emit("message", data);
    const foundPlayer = roundData.players.find((pl) => pl.id == player.id);
    console.log(foundPlayer);

    if (player.id == roundData.drawingPlayer.id) {
      socket.emit("message", {
        message: "you can't send messages when drawing",
        player: foundPlayer,
        isCorrect: false,
      });

      return;
    }
    console.log(roundData.currentWord);
    if (message == roundData.currentWord) {
      if (roundData.correctGuessPlayers.indexOf(player.id) != -1) return;
      console.log(`${player.username} guessed`);

      foundPlayer.score += 500;
      roundData.correctGuessPlayers.push(player.id);
      console.log(roundData.correctGuessPlayers);

      io.emit("correct-guess", foundPlayer);
      io.emit("message", {
        message: null,
        player: foundPlayer,
        isCorrect: true,
      });
    } else {
      io.emit("message", { message, player: foundPlayer, isCorrect: false });
    }

    console.log({ message, player });
  });
}

export function startNewRound(io) {
  if (roundData.players.length)
    roundData.drawingPlayer =
      roundData.players[Math.floor(Math.random() * roundData.players.length)];

  if (roundData.roundIndex == roundData.totalRounds) roundData.roundIndex = 1;
  else roundData.roundIndex++;

  roundData.endRoundTime = Date.now() + 95 * 1000;
  roundData.currentWord = words[Math.floor(Math.random() * words.length)];
  roundData.correctGuessPlayers = [];
  // console.log(roundData);

  io.emit("round-data", roundData);
}
