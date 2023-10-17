const mongoose = require("mongoose");

const MAX_RETRIES = 5;

const db = async () => {
  // First time could fail as MongoDB could be initializing
  let retries = 0;
  let error = null;
  while (mongoose.connection.readyState !== 1) {
    if (retries++ >= MAX_RETRIES) {
      console.error(error);
      console.error(`Couldn't connect to MongoDB after ${MAX_RETRIES} retries`);
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
      error = err;
    }
  }
};

module.exports = db;
