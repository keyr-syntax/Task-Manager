const mongoose = require("mongoose");
const MONGODB_LOCAL = "mongodb://localhost:27017/taskmanager";
const MONGODB_ATLAS =
  "mongodb+srv://keyrumail:yopO9cm5F1gVyjoj@cluster0.w457g.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_ATLAS);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
