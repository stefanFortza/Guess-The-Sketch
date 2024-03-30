import { computePointInCanvas, drawLine } from "./utils.js";
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clear");
const button = document.querySelector("#draw");
let prevPoint = null;
let isMouseDown = false;

export class Canvas {
  constructor() {
    this.canvas = 
  }
}

canvas.addEventListener("mousedown", (e) => {
  console.log("Mouse down");
  isMouseDown = true;
});

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("connected", socket.id);
});

socket.on("draw-line", (data) => {
  drawLine({ ...data, ctx, color: "" });
});

const submit = document.querySelector("#submit");
submit.addEventListener("click", () => {
  console.log("emmited data");
  socket.emit("canvas", getCanvasData());
});

console.log(socket);

canvas.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  const currentPoint = computePointInCanvas(e, canvas);
  if (!currentPoint) return;

  drawLine({ prevPoint, currentPoint, ctx, color: "da" });
  socket.emit("draw-line", { prevPoint, currentPoint });
  prevPoint = currentPoint;

  // data = canvas.toDataURL();
});

canvas.addEventListener("mouseup", (e) => {
  prevPoint = null;
  isMouseDown = false;
  ctx.closePath();
});

clearBtn.addEventListener("click", (e) => {
  console.log(canvas.toDataURL());
  data = canvas.toDataURL();
  ctx.clearRect(0, 0, 10000, 10000);
});

let data = "";
button.addEventListener("click", (e) => {
  setCanvasData(data);
});

export const getCanvasData = () => data;
export const setCanvasData = (data) => {
  var img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0);
  };

  img.src = data;
};
