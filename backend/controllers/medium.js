const { Medium } = require("../models/medium");

// create, read, update, remove
exports.create = async (req, res) => {
  const { medium } = req.body;
  let newMedium = new Medium({ medium });

  try {
    let data = await newMedium.save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Error Creating Medium...",
    });
  }
};

exports.read = async (req, res) => {
  try {
    let data = await Medium.find({});
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      error: "Error Reading Mediums",
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { medium } = req.body;

  try {
    const updated = await Medium.findOneAndUpdate(
      { _id: id },
      { medium },
      { new: true }
    );

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({
      error: "Error Updating Medium...",
    });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Medium.findOneAndRemove({ _id: id });
    return res.status(200).json({
      message: "Medium Removed SuccessFully...",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error Removing the medium..",
    });
  }
};
