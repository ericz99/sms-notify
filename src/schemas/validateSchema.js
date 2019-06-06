const Joi = require("@hapi/joi");

const validateBody = schema => {
  return (req, res, next) => {
    let errors = {};
    const result = Joi.validate(req.body, schema, { abortEarly: false });
    if (result.error) {
      const { details } = result.error;
      const errorMessage = details.map(val => {
        const key = val.context.key;
        const value = val.message;

        errors[key] = value;
      });

      return res.status(400).json({
        statusCode: 400,
        error: errors,
        data: null
      });
    }

    if (!req.value) {
      req.value = {};
    }

    req.value["body"] = result.value;
    next();
  };
};

module.exports = {
  validateBody
};
