import {
  onCanvasStateFromServer,
  onClearCanvasSignal,
  onDrawLineSignal,
  onRoundDataReceived,
} from "./index.js";
import { computePointInCanvas, getUser } from "./utils.js";
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

    // disable can draw
    this.setCanDraw(false);

    onDrawLineSignal.connect(this.drawLine);
    onClearCanvasSignal.connect(this.clearCanvas);
    onColorChange.connect(this.setColor);
    onCanvasStateFromServer.connect(this.drawImage);
    onRoundDataReceived.connect(this.onRoundReceived);
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

      if (this.canDraw) {
        this.drawLine(drawLineProps);

        this.socket.emit("draw-line", drawLineProps);

        this.prevPoint = this.currentPoint;
      }
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
      const { clientX: x, clientY: y } = e.changedTouches[0];
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
    this.ctx.clearRect(1, 0, 10000, 10000);
    if (this.canDraw) {
      this.socket.emit("clear-canvas");
    }
  };

  onRoundReceived = (roundData) => {
    const player = getUser();
    if (player.id == roundData.drawingPlayer.id) {
      console.log(roundData, "received");
      console.log(player);
      this.setCanDraw(true);
      this.clearCanvas();
      this.#showCanvasUtils(true);
    } else {
      this.setCanDraw(true);
      this.clearCanvas();
      this.setCanDraw(false);
      this.#showCanvasUtils(false);
    }
  };

  #showCanvasUtils = (show) => {
    if (show) {
      clearBtn.classList.remove("hide");
      picker.classList.remove("hide");
      eraser.classList.remove("hide");
    } else {
      clearBtn.classList.add("hide");
      picker.classList.add("hide");
      eraser.classList.add("hide");
    }
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
    let startPoint = prevPoint ?? currentPoint;

    if (color == "#ffffff") {
      // this.ctx.clearRect(currX - 10, currY - 10, 20, 20);

      this.ctx.fillStyle = lineColor;
      this.ctx.beginPath();
      this.ctx.arc(startPoint.x, startPoint.y, 20, 0, 2 * Math.PI);
      this.ctx.fill();
      return;
    }

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
  console.log(event.target.value);
  onColorChange.emit(event.target.value);
  // canvas.setColor(event.target.value);
});

const eraser = document.querySelector("#eraser");

eraser.addEventListener("click", (event) => {
  // console.log(event.target.value);
  onColorChange.emit("#ffffff");
  // canvas.setColor(event.target.value);
});
