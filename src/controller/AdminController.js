const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const uuid = require("uuid");

// Model Schema
const Admin = require("../model/Admin");
const User = require("../model/User");

// Joi Schema
const { signIn, signUp } = require("../schemas/authSchema");
const { settings, phoneNum } = require("../schemas/settingSchema");

// Config
const { SECRET_KEY } = require("../config");

module.exports = {
  testAPIRoute: async (req, res, next) => {
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        type: "success",
        msg: "Test route worked!"
      }
    });
  },
  /**
   * TODO: Validate API KEY if user present one...
   */
  createAdminUserAPIRoute: async (req, res, next) => {
    try {
      const admin = await Admin.findOne({ email: req.body.email });
      // If admin email already exist
      if (admin) {
        return res.status(404).json({
          statusCode: 404,
          error: {
            email: "Email already exist, please register with a different email"
          },
          data: null
        });
      }

      // Create a new admin user
      const createNewAdmin = await Admin.create({ uid: uuid(), ...req.body });
      // check if account is created
      if (createNewAdmin) {
        return res.status(200).json({
          statusCode: 200,
          error: null,
          data: {
            status: "success",
            msg: "Successfully created new admin account."
          }
        });
      }
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  loginAdminUserAPIRoute: async (req, res, next) => {
    try {
      const admin = await Admin.findOne({
        email: req.body.email
      });

      // Check if admin account exist or not
      if (!admin) {
        return res.status(404).json({
          statusCode: 404,
          error: {
            email: "Email does not exist, please try a different email"
          },
          data: null
        });
      }

      // Match password
      const isMatch = await admin.comparePassword(req.body.password);
      if (!isMatch) {
        return res.status(404).json({
          statusCode: 404,
          error: {
            password: "Invalid password, please try again!"
          },
          data: null
        });
      }

      // Create a payload for JWT token
      const payload = {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        uid: admin.uid
      };

      await jwt.sign(payload, SECRET_KEY, { expiresIn: 3600 }, (err, token) => {
        // return if error
        if (err) {
          return res.status(400).json({
            statusCode: 400,
            error: err,
            data: null
          });
        }

        // only return if no error
        return res.status(200).json({
          statusCode: 200,
          error: null,
          data: {
            status: "success",
            authorized: true,
            token
          }
        });
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          error
        });
      }
    }
  },
  currentAdminAPIRoute: async (req, res, next) => {
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        ...req.user
      }
    });
  },
  adminSettingsAPIRoute: async (req, res, next) => {
    try {
      const {
        phoneNumber,
        twilioAccountSID,
        twilioAuthToken,
        twilioPhoneNumber,
        message
      } = req.body;

      const admin = await Admin.findOne({ email: req.user.email });

      // Set new values
      admin.settings.phoneNumber = phoneNumber;
      admin.settings.twilioPhoneNumber = twilioPhoneNumber;
      admin.settings.twilioAccountSID = twilioAccountSID;
      admin.settings.twilioAuthToken = twilioAuthToken;
      admin.settings.message = message;
      // save the cred back to our db
      await admin.save();

      // return response back
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          status: "success",
          msg: "Successully saved settings!"
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  fetchAdminSettingsAPIRoute: async (req, res, next) => {
    try {
      const admin = await Admin.findOne({ email: req.user.email });

      // return response back
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: admin.settings
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  clearAdminSettingsAPIRoute: async (req, res, next) => {
    try {
      const admin = await Admin.findOne({ email: req.user.email });

      // Set new values
      admin.settings.phoneNumber = "";
      admin.settings.twilioPhoneNumber = "";
      admin.settings.twilioAccountSID = "";
      admin.settings.twilioAuthToken = "";
      admin.settings.message = "";
      // save the cred back to our db
      await admin.save();

      // return response back
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          status: "success",
          msg: "Successully saved settings!"
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  createNewUserAPIRoute: async (req, res, next) => {
    try {
      const admin = await Admin.findOne({ email: req.user.email });

      //create user
      const users = await User.create(req.body);

      // // add the users into the admin .users array
      // await admin.users.unshift(...users);
      admin.user = [...users, ...admin.user];

      // save the users
      await admin.save();

      // return response back
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          status: "success",
          msg: "Successfully created " + users.length + " users!",
          users
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  getAllUserAPIRoute: async (req, res, next) => {
    try {
      const { limit } = req.query;
      const users = await Admin.findOne({ email: req.user.email })
        .sort({ date: -1 })
        .populate("user")
        .limit(limit)
        .exec();

      // return response back
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          status: "success",
          users: users.user
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  deleteUserAPIRoute: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      await user.remove();

      const admin = await Admin.findOne({ email: req.user.email });
      const foundUser = admin.user.map(val => val.toString()).indexOf(id);

      await admin.user.splice(foundUser, 1);
      await admin.save();
      // return response back
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          status: "success",
          msg: "Successfully removed user!"
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  },
  sendMessageAPIRoute: async (req, res, next) => {
    try {
      const { test } = req.query;
      const {
        settings: {
          twilioAccountSID,
          twilioAuthToken,
          twilioPhoneNumber,
          message
        },
        _id
      } = await Admin.findOne({
        email: req.user.email
      });

      const getMatchingUsers = await User.find({ admin: _id });
      const getPhoneNumbers = getMatchingUsers.map(user => user.phoneNumber);

      // connect twilio
      const client = new twilio(twilioAccountSID, twilioAuthToken);
      getPhoneNumbers.map(phoneNumber => {
        client.messages
          .create({
            body: test === "true" ? "TEST MESSAGE" : message,
            to: phoneNumber,
            from: twilioPhoneNumber
          })
          .then(message => {
            return res.status(200).json({
              statusCode: 200,
              error: null,
              data: {
                status: "success",
                messagesid: message.sid,
                msg: "Successully sent message to all users"
              }
            });
          })
          .catch(e => console.log(e));
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error,
          data: null
        });
      }
    }
  }
};
