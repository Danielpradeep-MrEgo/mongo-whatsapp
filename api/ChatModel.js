const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  users: [],
  username: String,
});

module.exports = mongoose.model("Chat", chatSchema);
