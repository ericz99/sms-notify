const Joi = require("@hapi/joi");

const phRegEx = /^[2-9]\d{2}-\d{3}-\d{4}$/;

const phoneNumber = Joi.string()
  .regex(phRegEx)
  .label("PhoneNumber")
  .error(errors => {
    return {
      message: "Invalid Phone Number"
    };
  });

const twilioPhoneNumber = Joi.string()
  .regex(phRegEx)
  .label("twilioPhoneNumber")
  .error(errors => {
    return {
      message: "Invalid Twilio Phone Number"
    };
  });

const twilioAccountSID = Joi.string()
  .min(34)
  .max(34)
  .label("twilioAccountSID")
  .error(errors => {
    return {
      message: "Invalid Twilio Account SID"
    };
  });

const twilioAuthToken = Joi.string()
  .min(32)
  .max(32)
  .label("twilioAuthToken")
  .error(errors => {
    return {
      message: "Invalid Twilio Account Token"
    };
  });

const settings = Joi.object().keys({
  phoneNumber,
  twilioPhoneNumber,
  twilioAccountSID,
  twilioAuthToken
});

const phoneNum = Joi.object().keys({
  phoneNumber
});

module.exports = {
  settings,
  phoneNum
};
