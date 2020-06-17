const Joi = require("@hapi/joi");

exports.categoryCreateValidator = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.object().keys({
      url: Joi.string(),
      key: Joi.string(),
    }),
    content: Joi.string().min(20).required(),
  });

  return schema.validate(req);
};

exports.categoryUpdateValidator = (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().min(20).required(),
  });

  return schema.validate(req);
};


