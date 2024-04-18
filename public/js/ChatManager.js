import {
  onClientReady,
  onMessageReceived,
  onPlayerJoined,
  onPlayerLeft,
  onRoundDataReceived,
} from "./index.js";
import { getUser } from "./utils.js";

export class ChatManager {
  constructor(socket) {
    this.socket = socket;
    this.messageInput = document.querySelector("#message-input");
    this.messageContainer = document.querySelector("#message-container");

    onClientReady.connect(this.#onJoinedLobby);
    onMessageReceived.connect(this.#onMessageReceived);
    onPlayerJoined.connect(this.#onPlayerJoined);
    onPlayerLeft.connect(this.#onPlayerLeft);
    onRoundDataReceived.connect(this.#onRoundDataReceived);

    this.messageInput.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const message = data.get("message");

      const player = getUser();

      socket.emit("guess", { message, player });
      //   console.log(message);

      event.target.reset();
    });
  }

  #addMessage = (message) => {
    this.messageContainer.scroll({ top: this.messageContainer.scrollHeight });
    this.messageContainer.appendChild(message);
  };

  #onJoinedLobby = (player) => {
    const el = this.#getMessageElement(
      `you joined the lobby as ${player.username}`
    );
    el.classList.add("player-joined-message");
    this.#addMessage(el);
  };

  #onPlayerJoined = (player) => {
    console.log(player);
    const el = this.#getMessageElement(
      `<b>${player.username}</b> joined the lobby`
    );
    el.classList.add("player-joined-message");
    this.#addMessage(el);
  };

  #onPlayerLeft = (player) => {
    console.log(player);
    const el = this.#getMessageElement(
      `<b>${player.username}</b> left the lobby`
    );
    el.classList.add("player-left-message");
    this.#addMessage(el);
  };

  #onMessageReceived = ({ message, player, isCorrect }) => {
    const el = this.#getMessageElement();

    if (isCorrect) {
      el.innerHTML = `<b>${player.username}</b>: guessed the word`;
      el.classList.add("correct-guessed-message");
    } else {
      el.innerHTML = `<b>${player.username}</b>: ${message}`;
    }

    this.#addMessage(el);
  };
  #onRoundDataReceived = (roundData) => {
    const el = this.#getMessageElement(
      `<b>${roundData.drawingPlayer.username}</b> is currently drawing`
    );
    el.classList.add("player-drawing-message");
    this.#addMessage(el);
  };

  #getMessageElement(message) {
    const el = document.createElement("div");
    el.innerHTML = `${message}`;
    return el;
  }
}
