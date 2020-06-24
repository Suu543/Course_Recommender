const Joi = require("@hapi/joi");

// exports.linkCreateValidator = (req, res) => {
//   console.log("Validator - linkCreateValidator");

//   const schema = Joi.object({
//     title: Joi.string().required(),
//     url: Joi.string().required(),
//     categories: Joi.string().required(),
//     type: Joi.string().required(),
//     medium: Joi.string().required(),
//   });

//   return schema.validate(req);
// };

exports.linkCreateValidator = (req, res) => {
  console.log("Validator - linkCreateValidator");

  const schema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required(),
    categories: Joi.array().required(),
    type: Joi.string().required(),
    medium: Joi.string().required(),
  });

  return schema.validate(req);
};

exports.linkUpdateValidator = (req, res) => {
  console.log("Validator - linkUpdateValidator");

  const schema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required(),
    categories: Joi.array().required(),
    type: Joi.string().required(),
    medium: Joi.string().required(),
  });

  return schema.validate(req);
};
