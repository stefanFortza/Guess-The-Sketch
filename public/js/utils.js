/**
 *
 * @param {MouseEvent} event
 * @param {HTMLCanvasElement} canvas
 * @returns {Point}
 */
export function computePointInCanvas(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.x;
  const y = event.clientY - rect.y;
  return { x, y };
}

export function getUser() {
  return JSON.parse(sessionStorage.getItem("player"));
}

const players = document.querySelector("#players");
let arePlayersHidden = true;
document.querySelector("#drawer").addEventListener("click", (e) => {
  // players.style.display = "block";
  if (arePlayersHidden) {
    players.style.display = "block";
    console.log("da");
    arePlayersHidden = false;
  } else {
    players.style.display = "none";
    arePlayersHidden = true;
  }
});

window.addEventListener("resize", (e) => {
  if (window.innerWidth > 700) {
    players.style.display = "block";
    arePlayersHidden = false;
  } else {
    players.style.display = "none";
    arePlayersHidden = true;
  }
  console.log(e);
});
