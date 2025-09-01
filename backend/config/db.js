const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("error connecting to mongoDB server");
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
