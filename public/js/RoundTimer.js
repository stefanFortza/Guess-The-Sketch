import { getUser } from "./utils.js";

let id;
export function onRoundReceived(roundData) {
  clearInterval(id);
  // console.log(roundData);
  const roundDataEl = document.querySelector("#round-data");
  const roundIndex = roundDataEl.querySelector("#round-index");
  const timer = roundDataEl.querySelector("#timer");
  const user = roundDataEl.querySelector("#user");
  const word = document.querySelector("#word");
  // const word = roundDataEl.querySelector("#word");
  // console.log(word);

  id = setInterval(() => {
    roundIndex.innerHTML = `Round: ${roundData.roundIndex} / ${roundData.totalRounds}`;
    timer.innerHTML = `${Math.round(
      (new Date(roundData.endRoundTime) - Date.now()) / 1000
    )} s`;
    user.innerHTML = `<b>${roundData.drawingPlayer.username}</b> is drawing`;

    const player = getUser();
    if (player.id == roundData.drawingPlayer.id) {
      word.innerHTML = roundData.currentWord;
    } else {
      word.innerHTML = roundData.currentWord
        .split("")
        .map((c) => "_")
        .join("");
    }
  }, 1000);
}
