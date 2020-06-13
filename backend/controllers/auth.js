const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
const { registerEmailParams } = require("../helpers/email");
const shortId = require("shortid");
const dotenv = require("dotenv");
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Check if user exists in database
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      error: "이미 등록된 이메일입니다...",
    });
  }

  // 2. Generate token with name, email, and password
  const token = jwt.sign(
    { name, email, password },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
      expiresIn: "10m",
    }
  );

  // 3. Send Email
  const params = registerEmailParams(email, token);

  const sendEmailOnRegister = ses.sendEmail(params).promise();

  sendEmailOnRegister
    .then((data) => {
      console.log("Email Submitted to SES", data);
      res.json({
        message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
      });
    })
    .catch((error) => {
      console.log("SES Email on Register", error);
      res.json({
        message: `We could not verify your email. Please try again...`,
      });
    });
};

exports.activateRegistration = (req, res) => {
  const { token } = req.body;
  // console.log(token);
  jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async function (
    err,
    decoded
  ) {
    if (err) {
      return res.status(401).json({
        error: "Expired Link. Try Again!",
      });
    }
    // unique한 username 생성을 위해 userid package 사용
    const { name, email, password } = jwt.decode(token);
    const username = shortId.generate();
    let user = await User.findOne({ email });

    if (user) {
      return res.status(401).json({
        error: "Email is already taken",
      });
    }

    try {
      user = new User({ name, username, email });
      user.salt = await user.makeSalt();
      user.hashed_password = await user.encryptPassword(password);
      await user.save();
      return res.json({
        message: "Registration Success. Please Login...",
      });
    } catch (error) {
      return res.status(401).json({
        error: "Error Saving User in Database. Try Again or Later",
      });
    }
  });
};

exports.login = async (req, res) => {
  // const { email, password } = req.body;
  // console.table({ email, password });

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "등록되지않은 계정입니다..." });
  }

  const validPassword = await user.authenticate(req.body.password);
  if (!validPassword) {
    return res
      .status(400)
      .json({ error: "해당 이메일과 입력하신 비밀번호가 일치하지않습니다." });
  }
  const { _id, name, email, role } = user;

  const token = user.generateAuthToken();

  res.header("x-auth-token", token);
  res.cookie("token", token, { expiresIn: "1d" });
  res.json({
    token,
    user: { _id, name, email, role },
  });
};

exports.requireSignin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .send("접근 권한에 사용되는 토큰이 없습니다... 다시 로그인 해주세요...");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

exports.authMiddleware = async (req, res, next) => {
  const user = await User.findById({
    _id: req.user._id,
  });

  if (!user)
    return res.status(400).json({ error: "사용자를 찾지 못했습니다..." });

  req.profile = user;
  next();
};

exports.adminMiddleware = async (req, res, next) => {
  const user = await User.findById({
    _id: req.user._id,
  });

  if (!user) {
    return res.status(404).json({ error: "사용자를 찾지 못했습니다..." });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      error: "접근이 거부되었습니다. 관리자 권한입니다. ",
    });
  }

  req.profile = user;
  next();
};
