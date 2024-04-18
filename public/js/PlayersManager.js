import {
  onCorrectGuess,
  onPlayerJoined,
  onPlayerLeft,
  onRoundDataReceived,
} from "./index.js";

export class PlayersManager {
  constructor(socket) {
    this.socket = socket;
    this.playersContainer = document.querySelector("#players-container");
    this.players = [];

    onPlayerJoined.connect(this.addPlayer);
    onRoundDataReceived.connect(this.onRoundReceived);
    onPlayerLeft.connect(this.removePlayer);
    onCorrectGuess.connect(this.onPlayerGuessed);
  }

  addPlayer = (player) => {
    const aud = new Audio("/assets/sound/player-joined.mp3");
    aud.play();
    const playerNode = this.#getPlayerEl(player);
    // this.playersContainer.innerHTML += `<div>${message.username}</div>`;
    this.playersContainer.appendChild(playerNode);

    this.players.push(new Player({ ...player, node: playerNode }));
  };

  removePlayer = (id) => {
    console.log(`remove ${id}`);
    this.playersContainer.childNodes.forEach((player) => {
      if (player.id == id) {
        player.remove();
      }
    });
  };

  onRoundReceived = (roundData) => {
    this.playersContainer.innerHTML = "";
    for (const player of roundData.players) {
      //   this.playersContainer.innerHTML += `<div>${player.username}</div>`;
      this.addPlayer(player);
    }
    // console.log(roundData);
  };

  onPlayerGuessed = (player) => {
    this.playersContainer.childNodes.forEach((node) => {
      if (node.id == player.id) {
        const pl = this.#getPlayerEl(player);
        node.innerHTML = pl.innerHTML;
        node
          .querySelector("img")
          .classList.add("correct-guess-player-animation-class");

        const aud = new Audio("/assets/sound/player-guessed.mp3");
        aud.play();
      }
    });
  };

  #getPlayerEl(player) {
    const playerNode = document.createElement("div");
    const image = document.createElement("img");
    image.src = player.imageSrc;

    playerNode.innerHTML = `<div><b>${player.username}</b> ${player.score}</div>`;
    playerNode.id = player.id;
    playerNode.appendChild(image);
    playerNode.classList.add("shadow");
    return playerNode;
  }
}

class Player {
  constructor({ id, name, node }) {
    this.id = id;
    this.name = name;
    this.node = node;
  }

  removeNode() {
    this.node.remove();
  }
}
