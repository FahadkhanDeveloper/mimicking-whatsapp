// we will use this file one time      means we will run node init.js only one time
// it is used to initialize database
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "laiba",
    to: "aiza",
    msg: "send me exam date sheets",
    created_at: new Date(),
  },
  // You can add more objects here
  {
    from: "john",
    to: "jane",
    msg: "can you send me the report?",
    created_at: new Date(),
  },
  {
    from: "alex",
    to: "sam",
    msg: "let's meet for lunch",
    created_at: new Date(),
  },
  {
    from: "ravi",
    to: "sara",
    msg: "happy birthday!",
    created_at: new Date(),
  },
];
Chat.insertMany(allChats).then(res => {
  console.log(res)
})
