const mongoose = require("mongoose");



const connectDB = async ()=> {
    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected")
    } catch (error) {
        console.log("MongoDB failed to Connect");
    }
}

module.exports = connectDB;