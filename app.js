require("dotenv").config();
const express=  require("express");
const app = express();
const connectDB = require("./db/connectDB")
const cors = require("cors")
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes")
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));




app.use(express.json({limit : "5mb"})) // to set the limit how much data to store data in json format

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


// Routes declaration
app.use("/api/v1/users",userRouter);
















connectDB();



module.exports = app;