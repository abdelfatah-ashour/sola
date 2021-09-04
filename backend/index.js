require("dotenv").config({
  path: "./.env",
});

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const IO = require("socket.io")(server);

IO.on("connection", (socket) => {
  console.log("connected user!");

  socket.on("JOIN_ROOM", (id) => {
    socket.join(id);
  });

  socket.on("TYPING", (data) => {
    IO.to(data.roomId).emit("TYPING", data.payload);
  });

  socket.on("NON_TYPING", (data) => {
    IO.to(data.roomId).emit("NON_TYPING", data.payload);
  });

  socket.on("NEW_MESSAGE", (payload) => {
    IO.to(payload.roomId).emit("NEW_MESSAGE", payload);
  });

  socket.on("error", (error) => {
    console.log("Error Socket : ", error.message);
  });

  socket.on("disconnect", () => {
    console.log("disconnect user!");
  });
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server is work on PORT ${PORT}`);
});
