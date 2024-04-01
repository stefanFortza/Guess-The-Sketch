import { onMessageReceived } from "./index.js";

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
      socket.emit("guess", message);
      //   console.log(message);
    });
  }

  addMessage = (message) => {
    this.messageContainer.innerHTML =
      `<div>${message}</div>` + this.messageContainer.innerHTML;
  };
}
