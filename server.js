const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

// use build folder to serve index.html
app.use(express.static("build"));

// on refresh, always serve index.html file
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("join", ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    clients.forEach((socketId) => {
      io.to(socketId.socketId).emit("joined", {
        clients,
        userName,
        socketId: socket.id,
      });
    });
  });

  socket.on("codeChange", ({ roomID, code }) => {
    socket.in(roomID).emit("codeChange", {
      code,
    });
  });

  socket.on("syncCode", ({ socketId, code }) => {
    io.to(socketId).emit("codeChange", { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        userName: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
