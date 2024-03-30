import { getCanvasData, setCanvasData, Canvas } from "./canvas.js";
// console.log(getCanvasData());

// const socket = io("http://localhost:5000");

// socket.on("connect", () => {
//   console.log("connected", socket.id);
// });
const canvas = new Canvas();

socket.on("draw-line", (data) => {
  //   canvas.drawLine(data);
  //   setCanvasData(data);
});

// const submit = document.querySelector("#submit");
// submit.addEventListener("click", () => {
//   console.log("emmited data");
//   socket.emit("canvas", getCanvasData());
// });

// console.log(socket);
