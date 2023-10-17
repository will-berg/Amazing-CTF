const mongoose = require("mongoose");

const MAX_RETRIES = 5;

const db = async () => {
  // First time could fail as MongoDB could be initializing
  let retries = 0;
  while (mongoose.connection.readyState !== 1) {
    if (retries++ >= MAX_RETRIES) {
      console.log("Could not connect to MongoDB");
      process.exit(1);
    }

    console.log(`Connecting to MongoDB (try ${retries}/${MAX_RETRIES})`);
    try {
      await mongoose.connect(
        "mongodb://root:test@database:27017/amazing-ctf?authSource=admin",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      console.log("Connected to MongoDB!!!");
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = db;
