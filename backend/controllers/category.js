const { Link } = require("../models/link");
const { Category } = require("../models/category");
const slugify = require("slugify");
const formidable = require("formidable");
const AWS = require("aws-sdk");
// For unique key in image
const { v4: uuidv4 } = require("uuid"); // Unique String
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

exports.create = (req, res) => {
  console.log("Category - create");
  const { name, image, content } = req.body;

  // image data

  const base64Data = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const type = image.split(";")[0].split("/")[1];

  const slug = slugify(name);
  let category = new Category({ name, content, slug });
  console.log("req,user.", req.user._id);
  category.postedBy = req.user._id;

  // upload image to s3
  const params = {
    Bucket: "sucr-su",
    Key: `category/${uuidv4()}.${type}`,
    Body: base64Data,
    ACL: "public-read",
    ContentEncoding: "base64",
    ContentType: `image/${type}`,
  };

  s3.upload(params, async (err, data) => {
    // if(err) console.log(err) 이런식으로 에러 잡기
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Upload to s3 failed..." });
    }
    console.log("AWS UPLOAD RES DATA", data);

    // S3에 저장후 Return 된 값
    category.image.url = data.Location;
    category.image.key = data.Key;

    // posted by
    category.postedBy = req.user._id;

    // Save to DB
    try {
      let data = await category.save();
      res.status(200).json(data);
    } catch (error) {
      console.log("catch error", error);
      return res.status(400).json({
        error: "Error saving category to Database (Duplicated Category)",
      });
    }
  });
};

// exports.create = (req, res) => {
//   console.log("Category - create");

//   let form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image could not upload",
//       });
//     }

//     // console.table({err, fields, files})
//     const { name, content } = fields;
//     const { image } = files;

//     const slug = slugify(name);
//     let category = new Category({ name, content, slug });
//     category.postedBy = req.user._id;

//     if (image.size > 2000000) {
//       return res.status(400).json({
//         error: "Image should be less than 2mb",
//       });
//     }

//     // upload image to s3
//     const params = {
//       Bucket: "sucr-su",
//       Key: `category/${uuidv4()}`,
//       Body: fs.readFileSync(image.path),
//       ACL: "public-read",
//       ContentType: `image/jpg`,
//     };

//     s3.upload(params, async (err, data) => {
//       // if(err) console.log(err) 이런식으로 에러 잡기
//       if (err) {
//         console.log(err);
//         res.status(400).json({ error: "Upload to s3 failed..." });
//       }
//       console.log("AWS UPLOAD RES DATA", data);

//       // S3에 저장후 Return 된 값
//       category.image.url = data.Location;
//       category.image.key = data.Key;

//       // Save to DB
//       try {
//         let data = await category.save();
//         res.status(200).json(data);
//       } catch (error) {
//         console.log("catch error", error);
//         return res.status(400).json({
//           error: "Error saving category to Database (Duplicated Category)",
//         });
//       }
//     });
//   });
// };

// https://github.com/aws/aws-sdk-js/issues/296

exports.list = async (req, res) => {
  try {
    let categories = await Category.find({});
    if (categories) res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({
      error: "Categories could not load...",
    });
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  console.log("req.body.limit", req.body);
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  try {
    const category = await Category.findOne({ slug }).populate(
      "postedBy",
      "_id name username"
    );

    try {
      const links = await Link.find({ categories: category })
        .populate("postedBy", "_id name username")
        .populate("categories", "name")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

      return res.status(200).json({ category, links });
    } catch (error) {
      return res.status(400).json({
        error: "Could not load links of a category",
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Could not load category",
    });
  }
};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};
