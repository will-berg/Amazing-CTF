const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb://root:test@database:27017/amazing-ctf?authSource=admin",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
