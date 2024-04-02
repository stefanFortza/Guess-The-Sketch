let id;
export function onRoundReceived(roundData) {
  clearInterval(id);
  // console.log(roundData);
  const roundDataEl = document.querySelector("#round-data");
  const timer = roundDataEl.querySelector("#timer");
  const user = roundDataEl.querySelector("#user");
  const word = roundDataEl.querySelector("#word");
  console.log(roundData);
  console.log(roundData);

  id = setInterval(() => {
    timer.innerHTML = Math.round(
      (new Date(roundData.endRoundTime) - Date.now()) / 1000
    );
    user.innerHTML = roundData.drawingPlayer.username;
    word.innerHTML = roundData.currentWord;
  }, 1000);
}
