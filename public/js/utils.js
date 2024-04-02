/**
 *
 * @param {MouseEvent} event
 * @param {HTMLCanvasElement} canvas
 * @returns {Point}
 */
export function computePointInCanvas(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = event.x - rect.x;
  const y = event.y - rect.y;
  return { x, y };
}

/**
 *
 * @param {DrawLineProps} param
 */
// export const drawLine = ({ prevPoint, currentPoint, ctx, color }) => {
//   const { x: currX, y: currY } = currentPoint;
//   const lineColor = color;
//   const lineWidth = 5;

//   let startPoint = prevPoint ?? currentPoint;
//   ctx.beginPath();
//   ctx.lineWidth = lineWidth;
//   ctx.strokeStyle = lineColor;
//   ctx.moveTo(startPoint.x, startPoint.y);
//   ctx.lineTo(currX, currY);
//   ctx.stroke();

//   // ctx.fillStyle = lineColor;
//   ctx.beginPath();
//   ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
//   ctx.fill();
// };

export function getUser() {
  return JSON.parse(sessionStorage.getItem("player"));
}
