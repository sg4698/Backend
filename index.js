const mongoose = require("mongoose");
require("dotenv").config()
const express = require("express");
const app  = require("./app");





app.listen(process.env.PORT,()=>{
    console.log("Server is running on port")
})




