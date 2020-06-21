const { Link } = require("../models/link");
const slugify = require("slugify");

// create, list, read, update, remove

exports.create = async (req, res) => {
  const { title, url, categories, type, medium } = req.body;
  //   console.table({ title, url, categories, type, medium });
  const slug = url;
  let link = new Link({ title, url, categories, type, medium, slug });
  // posted by user
  link.postedBy = req.user._id;

  // Categories
  // let arrayOfCategories = categories && categories.split(",");
  // link.categories = arrayOfCategories;

  // save link
  try {
    let data = await link.save();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      error: "Link Already Exist!",
    });
  }
};

exports.list = async (req, res) => {
  try {
    let allLinks = await Link.find({});
    res.status(200).json(allLinks);
  } catch (error) {
    return res.status(400).json({
      error: "Could not list links",
    });
  }
};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};
