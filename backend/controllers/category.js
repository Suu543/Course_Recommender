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

  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    // console.table({err, fields, files})
    const { name, content } = fields;
    const { image } = files;

    const slug = slugify(name);
    let category = new Category({ name, content, slug });
    category.postedBy = req.user._id;

    if (image.size > 2000000) {
      return res.status(400).json({
        error: "Image should be less than 2mb",
      });
    }

    // upload image to s3
    const params = {
      Bucket: "sucr-su",
      Key: `category/${uuidv4()}`,
      Body: fs.readFileSync(image.path),
      ACL: "public-read",
      ContentType: `image/jpg`,
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
  });
};

// https://github.com/aws/aws-sdk-js/issues/296

exports.list = (req, res) => {};

exports.read = (req, res) => {};

exports.update = (req, res) => {};

exports.remove = (req, res) => {};
