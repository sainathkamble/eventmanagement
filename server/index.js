const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnect = require("./dbConnect");
const logger = require("./utils/logger");
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

const {auth} = require("./middlewares/auth.middleware");

const authRoute = require("./routes/auth.route");
const eventRoute = require("./routes/event.route");
const accountRoute = require("./routes/account.route");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Allow all origins
    },
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req,res)=>{
  res.send("OK From Server") ;
})

app.get("/ping", (req,res)=>{
    res.send("OK") ;
})

app.use("/auth", authRoute);
app.use("/events", eventRoute);
app.use("/account", auth, accountRoute);

app.listen(PORT, "0.0.0.0", ()=>{
    logger.info(`Server started on port : ${PORT}`);
    dbConnect();
})