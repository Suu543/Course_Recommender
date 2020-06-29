const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  medium: {
    type: String,
    default: "Video",
  },
});

const Medium = mongoose.model("Medium", modelSchema);

module.exports = {
  Medium,
};
