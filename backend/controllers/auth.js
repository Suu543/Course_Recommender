const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
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
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                    <html>
                        <h1>Vefiry Your Email Address</h1>
                        <p>Please use the following link to complete your registration:</p>
                        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                    </html>
                `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Complete your registration",
      },
    },
  };

  const sendEmailOnRegister = ses.sendEmail(params).promise();

  sendEmailOnRegister
    .then((data) => {
      console.log("Email Submitted to SES", data);
      res.send("Email Sent!");
    })
    .catch((error) => {
      console.log("SES Email on Register", error);
      res.json("Email Failed!");
    });
};
