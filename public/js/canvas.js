import {
  onCanvasStateFromServer,
  onClearCanvasSignal,
  onDrawLineSignal,
} from "./index.js";
import { computePointInCanvas } from "./utils.js";
import { Signal } from "./signal.js";
const clearBtn = document.querySelector("#clear");
const button = document.querySelector("#draw");

export class Canvas {
  constructor(socket) {
    this.socket = socket;
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.prevPoint = null;
    this.isMouseDown = false;
    this.color = "#000000";
    this.canDraw = true;
    this.#initialize();

    onDrawLineSignal.connect(this.drawLine);
    onClearCanvasSignal.connect(this.clearCanvas);
    onColorChange.connect(this.setColor);
    onCanvasStateFromServer.connect(this.drawImage);
  }

  #initialize() {
    this.canvas.addEventListener("mousedown", (e) => {
      console.log("Mouse down");
      this.isMouseDown = true;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.isMouseDown) return;
      this.currentPoint = computePointInCanvas(e, this.canvas);
      if (!this.currentPoint) return;

      const drawLineProps = {
        prevPoint: this.prevPoint,
        currentPoint: this.currentPoint,
        color: this.color,
      };

      this.drawLine(drawLineProps);

      this.socket.emit("draw-line", drawLineProps);

      this.prevPoint = this.currentPoint;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.prevPoint = null;
      this.isMouseDown = false;
      this.ctx.closePath();
    });

    this.canvas.addEventListener("touchstart", (e) => {
      console.log("Mouse down");
      this.isMouseDown = true;
    });

    this.canvas.addEventListener("touchmove", (e) => {
      // console.log(e.changedTouches[0]);
      if (!this.isMouseDown) return;
      const { pageX: x, pageY: y } = e.changedTouches[0];
      this.currentPoint = computePointInCanvas({ x, y }, this.canvas);
      if (!this.currentPoint) return;

      const drawLineProps = {
        prevPoint: this.prevPoint,
        currentPoint: this.currentPoint,
        color: this.color,
      };

      this.drawLine(drawLineProps);

      this.socket.emit("draw-line", drawLineProps);

      this.prevPoint = this.currentPoint;
    });

    this.canvas.addEventListener("touchend", (e) => {
      this.prevPoint = null;
      this.isMouseDown = false;
      this.ctx.closePath();
    });
  }

  setColor = (color) => {
    this.color = color;
  };

  setCanDraw = (canDraw) => {
    this.canDraw = canDraw;
  };

  getCanvas = () => {
    return this.canvas;
  };

  clearCanvas = () => {
    // console.log(this.canvas.toDataURL());
    this.ctx.clearRect(0, 0, 10000, 10000);
  };

  drawImage = (state) => {
    const img = new Image();
    img.src = state;
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0);
    };
  };

  drawLine = ({ prevPoint, currentPoint, color }) => {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    // if (color == "#ffffff") {
    //   this.ctx.clearRect(currX - 10, currY - 10, 20, 20);
    //   return;
    // }

    let startPoint = prevPoint ?? currentPoint;
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = lineColor;
    this.ctx.moveTo(startPoint.x, startPoint.y);
    this.ctx.lineTo(currX, currY);
    this.ctx.stroke();

    this.ctx.fillStyle = lineColor;
    this.ctx.beginPath();
    this.ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    this.ctx.fill();
  };
}

export const onColorChange = new Signal();
const picker = document.querySelector("#color-picker");
picker.addEventListener("change", (event) => {
  // console.log(event.target.value);
  onColorChange.emit(event.target.value);
  // canvas.setColor(event.target.value);
});
