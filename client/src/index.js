import { ChatManager } from "./ChatManager.js";
import { Canvas } from "./canvas.js";
import { Signal } from "./signal.js";

const socket = io("http://localhost:5000");

export const onDrawLineSignal = new Signal();
export const onClearCanvasSignal = new Signal();
export const onMessageReceived = new Signal();

socket.on("connect", () => {
  console.log("connected", socket.id);
});

const canvas = new Canvas(socket);
const chatManager = new ChatManager(socket);

const picker = document.querySelector("#color-picker");
picker.addEventListener("change", (event) => {
  console.log(event.target.value);
  canvas.setColor(event.target.value);
});

socket.on("draw-line", (data) => {
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

// const submit = document.querySelector("#submit");
// submit.addEventListener("click", () => {
//   console.log("emmited data");
//   socket.emit("canvas", getCanvasData());
// });

// console.log(socket);
