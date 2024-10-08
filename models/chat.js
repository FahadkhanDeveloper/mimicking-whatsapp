const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: {
    type: String, // who send msg
    required: true,
  },
  to: {
    type: String, // who receive msg
    required: true,
  },
  msg: {
    type: String,
    maxLength: 50,
  },
  created_at: {
    type: Date,
    required: true,
  },
  // updated_at: {
  //   type: Date,
  // }
});
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
