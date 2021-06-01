const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    username: String,
    userEmail: String,
    receiverId: String,
    users: [],
    message: String,
    Id: String,
    timestamp: String,
  },
  { timestamp: true }
);

module.exports = mongoose.model("Messages", MessageSchema);
