import { onPlayerJoined, onPlayerLeft, onRoundDataReceived } from "./index.js";

export class PlayersManager {
  constructor(socket) {
    this.socket = socket;
    this.playersContainer = document.querySelector("#players-container");
    this.players = [];

    onPlayerJoined.connect(this.addPlayer);
    onRoundDataReceived.connect(this.onRoundReceived);
    onPlayerLeft.connect(this.removePlayer);
  }

  addPlayer = (player) => {
    const playerNode = document.createElement("div");
    playerNode.innerText = `${player.username}`;
    playerNode.id = player.id;
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
