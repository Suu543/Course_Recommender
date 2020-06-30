const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  medium: {
    type: String,
    default: "Video",
    required: true
  },
});

const Medium = mongoose.model("Medium", modelSchema);

module.exports = {
  Medium,
};
