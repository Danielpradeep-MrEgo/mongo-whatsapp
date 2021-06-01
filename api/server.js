// imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const MessagesRouter = require("./routes/messages");

//  app config
const app = express();
const port = process.env.PORT || 9000;

// middle wares
app.use(express.json());
app.use(morgan());

// db connection

const connection_URL =
  "mongodb+srv://admin:dXLvj02LRA7zNLgs@cluster0.sagwp.mongodb.net/DataDB?retryWrites=true&w=majority";

mongoose.connect(
  connection_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB CONNEcted")
);

// api routes
app.use("/messages/", MessagesRouter);

// listen
app.listen(port, () => console.log("listening to port 9000"));
