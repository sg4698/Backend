require("dotenv").config();
const express=  require("express");
const app = express();
const connectDB = require("./db/connectDB")
const cors = require("cors")
const cookiesParser = require("cookie-parser");

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));




app.use(express.json({limit : "5mb"})) // to set the limit how much data to store data in json format

app.use(express.urlencoded({extended: true}));

















connectDB();



module.exports = app;