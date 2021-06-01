const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

io.on("connection", (socket) => {
  console.log("connected");
  const userId = socket.handshake.query.userId;
  socket.join(userId);
  console.log(userId);
  console.log(socket.id);

  socket.on("addUser", (userId) => {
    console.log(userId, "userId");
  });

  socket.on("sendMessage", ({ userId, receiverId, input }) => {
    socket.broadcast.to(receiverId).emit("getMessage", {
      userId,
      receiverId,
      input,
    });
    console.log(userId, receiverId, input);
  });
});
