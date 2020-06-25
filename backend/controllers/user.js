const { User } = require("../models/user");
const { Link } = require("../models/link");

exports.read = async (req, res) => {
  console.log("User - read");
  // req.profile.hashed_password = undefined;
  // req.profile.salt = undefined;

  try {
    const user = await User.findOne({ _id: req.user._id });

    try {
      const links = await Link.find({ postedBy: user })
        .populate("categories", "name slug")
        .populate("postedBy", "name")
        .sort({ createdAt: -1 });

      user.hashed_password = undefined;
      user.salt = undefined;
      user.resetPasswordLink = undefined;

      return res.status(200).json({ user, links });
    } catch (error) {
      return res.status(400).json({
        error: "Could not find links",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "User Not Found...",
    });
  }
};

exports.likes = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });
    console.log("user", user.likes);

    return res.status(200).json({
      likes: user.likes,
    });
  } catch (error) {
    return res.status(400).json({
      error: "User Not Found...",
    });
  }
};
