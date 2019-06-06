const Joi = require("@hapi/joi");

const email = Joi.string()
  .email()
  .required()
  .label("Email")
  .error(errors => {
    return {
      message: "Email field is required!"
    };
  });

const name = Joi.string()
  .max(254)
  .required()
  .label("Name")
  .error(errors => {
    return {
      message: "Full Name field is required!"
    };
  });

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^[a-zA-Z0-9]{3,30}$/)
  .required()
  .label("Password")
  .options({
    language: {
      string: {
        regex: {
          base:
            "must have at least one lowercase letter, one uppercase letter, and one digit."
        }
      }
    }
  })
  .error(errors => {
    return {
      message: "Password must be 8 characters long!"
    };
  });

const confirmPassword = Joi.any()
  .required()
  .valid(Joi.ref("password"))
  .error(errors => {
    return {
      message: "Confirm Password must match with password!"
    };
  });

const signUp = Joi.object().keys({
  email,
  name,
  password,
  confirmPassword
});

const signIn = Joi.object().keys({
  email,
  password
});

module.exports = {
  signIn,
  signUp
};
