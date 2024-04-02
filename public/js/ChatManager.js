import { onMessageReceived } from "./index.js";
import { getUser } from "./utils.js";

export class ChatManager {
  constructor(socket) {
    this.socket = socket;
    this.messageInput = document.querySelector("#message-input");
    this.messageContainer = document.querySelector("#message-container");

    onMessageReceived.connect(this.addMessage);

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

  addMessage = ({ message, player }) => {
    this.messageContainer.innerHTML += `<div>${player.username}: ${message}</div>`;
    this.messageContainer.scroll({ top: this.messageContainer.scrollHeight });
  };
}
