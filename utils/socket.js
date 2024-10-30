const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);

    socket.on("joinSession", (sessionId) => {
      socket.join(sessionId);
      console.log(`Player joined session: ${sessionId}`);
    });

    socket.on("broadcastMessage", (data) => {
      io.to(data.sessionId).emit("message", data.message);
    });

    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
};

module.exports = { initializeSocket, getIO };
