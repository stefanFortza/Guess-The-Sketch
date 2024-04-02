import { ChatManager } from "./ChatManager.js";
import { PlayersManager } from "./PlayersManager.js";
import { onRoundReceived } from "./RoundTimer.js";
import { Canvas } from "./canvas.js";
import { Signal } from "./signal.js";

const socket = io("http://localhost:5000");

export const onDrawLineSignal = new Signal();
export const onClearCanvasSignal = new Signal();
export const onMessageReceived = new Signal();
export const onCanvasStateFromServer = new Signal();
export const onPlayerJoined = new Signal();
export const onRoundDataReceived = new Signal();
export const onPlayerLeft = new Signal();

const canvas = new Canvas(socket);
const chatManager = new ChatManager(socket);
const playersManageer = new PlayersManager(socket);
onRoundDataReceived.connect(onRoundReceived);

socket.on("connect", () => {
  console.log("connected", socket.id);

  console.log(location);
  const a = new URLSearchParams(location.search);
  const name = a.get("username");
  console.log(name);

  socket.emit("client-ready", name, (player) => {
    sessionStorage.setItem("player", JSON.stringify(player));
  });
});

socket.on("get-canvas-state", () => {
  if (!canvas.getCanvas().toDataURL()) return;
  // console.log("sending canvas state");
  socket.emit("canvas-state", canvas.getCanvas().toDataURL());
});

socket.on("canvas-state-from-server", (state) => {
  onCanvasStateFromServer.emit(state);
});

socket.on("draw-line", (data) => {
  console.log("got line from server");
  onDrawLineSignal.emit(data);
});

socket.on("clear-canvas", (data) => {
  onClearCanvasSignal.emit(data);
});

const submit = document.querySelector("#clear");
submit.addEventListener("click", () => {
  console.log("emmited data");

  socket.emit("clear-canvas");
  canvas.clearCanvas();
});

socket.on("message", (data) => {
  onMessageReceived.emit(data);
});

socket.on("player-joined", (player) => {
  onPlayerJoined.emit(player);
});

socket.on("player-left", (player) => {
  onPlayerLeft.emit(player);
});

socket.on("round-data", (roundData) => {
  onRoundDataReceived.emit(roundData);
  console.log(roundData);
});
