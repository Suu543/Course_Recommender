const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Free",
  },
});

const Type = mongoose.model("Type", typeSchema);

module.exports = {
  Type,
};
