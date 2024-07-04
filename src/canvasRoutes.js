export function handleCanvasSocketRoutes(socket, io) {
  socket.on("canvas-state", (state) => {
    console.log("received canvas state");

    socket.broadcast.emit("canvas-state-from-server", state);
  });

  socket.on("draw-line", ({ prevPoint, currentPoint, color }) => {
    // console.log({ prevPoint, currentPoint, color });
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
  });

  socket.on("clear-canvas", () => {
    socket.broadcast.emit("clear-canvas");
  });
}
