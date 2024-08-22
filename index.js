const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
main()
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
//   Index Route
app.get(
  "/chats",
  wrapAsync(async (req, res) => {
    let chats = await Chat.find();
    //   console.log(chats)
    res.render("index.ejs", { chats });
  })
);

// New Route  means this will create form
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// create Route
app.post(
  "/chats",
  wrapAsync(async (req, res) => {
    let { from, to, msg } = req.body;
    console.log(req.body);
    // if(!req.body) {
    //   throw new ExpressError(400, "Send valid data for listing");
    // }
    // here above is not working because if we cannot send data in body but still it returns {}  empty object
    //  therefore belove will work
    // Object.keys will make array  measn it will make array from req.body object and then we check this array length
    if (Object.keys(req.body).length === 0) {
      throw new ExpressError(400, "Send valid data for listing");
    }

    if (!from) {
      throw new ExpressError(400, "From(sender) is missing");
    }
    if (!to) {
      throw new ExpressError(400, "To is missing");
    }
    if (!msg) {
      throw new ExpressError(400, "message is missing");
    }
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
      // updated_at: new Date(),
    });
    //   console.log(newChat);
    await newChat.save();
    console.log("chat was saved");
    //   res.send("working");
    res.redirect("/chats");
  })
);

// Edit Route
app.get(
  "/chats/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    //   console.log(chat);
    res.render("edit.ejs", { chat });
  })
);

// Update Route
app.put(
  "/chats/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;

    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true },
      { new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
  })
);

// Delete Route
app.delete(
  "/chats/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  })
);

app.get("/", (req, res) => {
  res.send("root is working");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});
app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
