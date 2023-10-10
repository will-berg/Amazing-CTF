const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Virtual for this challenge instance URL.
challengeSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised. Remove _id and __v from challenge object before returning it
challengeSchema.set("toJSON", {
  virtuals: true,
  transform: function (_doc, challenge, _options) {
    delete challenge._id;
    delete challenge.__v;
  },
});

module.exports = mongoose.model("challanges", challengeSchema);
