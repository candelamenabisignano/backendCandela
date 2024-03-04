const socket = io();
const button = document.querySelector("#sendMessage");
const input = document.querySelector("#messageInput");
const messages = document.querySelector("#messagesContainer");
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value === "") return;
  socket.emit("message", input.value);
});
socket.on("messages", (data) => {
  messages.innerHTML = "";
  data.forEach((m) => {
    messages.innerHTML += `
        <h1>${m}</h1>
        `;
  });
});
