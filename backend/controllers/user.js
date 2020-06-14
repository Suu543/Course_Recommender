exports.read = (req, res) => {
  console.log("readread");
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.status(200).json(req.profile);
};
