// This module.exports.leaderboardSocket function creates a socket.io server for managing connections related to a leaderboard feature.
// Importing the socket.io library and initializing it with the provided server and CORS settings.
module.exports.leaderboardSocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  // When a client connects to the server, this event listener is triggered.
  io.on("connection", (socket) => {

    // Event listener for the "updateLeaderBoard" event.
    // When this event is received from any client, the server broadcasts a "sendUsers" event to all connected clients.
    socket.on("updateLeaderBoard", () => {
      io.sockets.emit("sendUsers");
    });

    // Event listener for the "disconnect" event.
    // This event is triggered when a client disconnects from the server.
    socket.on("disconnect", () => {
      // This function is empty, meaning it doesn't contain any specific actions to be taken upon disconnection.
      // It could be used for cleanup or logging purposes.
    });
  });
};
