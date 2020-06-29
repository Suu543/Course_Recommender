const Joi = require("@hapi/joi");

exports.mediumCreateValidator = (req, res) => {
  console.log("Validator - MediumCreateValidator");

  const schema = Joi.object({
    medium: Joi.string().required(),
  });

  return schema.validate(req);
};

exports.mediumUpdateValidator = (req, res) => {
  console.log("Validator - MediumUpdateValidator");

  const schema = Joi.object({
    medium: Joi.string().required(),
  });
};
