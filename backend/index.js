const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const connectDb = require("./config/mongoose");
const bodyParser=require('body-parser');
const app = express();
const PORT = process.env.PORT;

//connecting database
connectDb();

app.use(bodyParser.json());
app.use(cors());

//user api
app.use("/users", userRouter);
app.get('/', (req, res) => {
  res.send('Home Page');
});
app.all("*", (req, res) => {
  
   res.status(404).send("404 NOT FOUND");
   
});


// enabling socket server // -------
const socketServer = require("http").Server(app);
const socket = require("./config/leaderBoardSocket").leaderboardSocket(
  socketServer
);

socketServer.listen(4000, (err) => {
  if (err) {
    ("error in listening socket server");
  } else {
    console.log("SOCKET SERVER IS RUUNING ON PORT 4000");
  }
});

app.listen(PORT, () => {
  console.log(`API IS RUNNING `);
});


process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("ERROR ! SERVER IS SHUTING DOWN ");
  process.exit(1);
});