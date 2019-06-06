const express = require("express");
const Router = express.Router();

const { signIn, signUp } = require("../../schemas/authSchema");
const { validateBody } = require("../../schemas/validateSchema");

const {
  testAPIRoute,
  createAdminUserAPIRoute,
  loginAdminUserAPIRoute,
  adminSettingsAPIRoute,
  currentAdminAPIRoute,
  createNewUserAPIRoute,
  sendMessageAPIRoute,
  fetchAdminSettingsAPIRoute,
  getAllUserAPIRoute,
  deleteUserAPIRoute,
  clearAdminSettingsAPIRoute
} = require("../../controller/AdminController");

// Authentication
const isAuth = require("../../helper/isAuth");

/**
 * @access PUBLIC
 * @description Test API Route
 */
Router.get("/test", testAPIRoute);

/**
 * @access PUBLIC
 * @description Create Admin User API Route
 */
Router.post("/register", validateBody(signUp), createAdminUserAPIRoute);

/**
 * @access PUBLIC
 * @description Login Admin User API Route
 */
Router.post("/login", validateBody(signIn), loginAdminUserAPIRoute);

/**
 * @access PRIVATE
 * @description Current Admin
 */

Router.get("/current", isAuth, currentAdminAPIRoute);

/**
 * @access PRIVATE
 * @description User fill in their settings
 */

Router.post("/settings", isAuth, adminSettingsAPIRoute);

/**
 * @access PRIVATE
 * @description Fetch Settings
 */

Router.get("/settings", isAuth, fetchAdminSettingsAPIRoute);

/**
 * @access PRIVATE
 * @description Clear Admin Settings
 */

Router.get("/settings/clear", isAuth, clearAdminSettingsAPIRoute);

/**
 * @access PRIVATE
 * @description Create new user, to send sms to
 */
Router.post("/create", isAuth, createNewUserAPIRoute);

/**
 * @access PRIVATE
 * @description Delete User
 */
Router.delete("/user/delete/:id", isAuth, deleteUserAPIRoute);

/**
 * @access PRIVATE
 * @description Get all users with limits
 */
Router.get("/users/get?", isAuth, getAllUserAPIRoute);

/**
 * @access PRIVATE
 * @description Send a test message to all phone numbers
 */
Router.get("/send?", isAuth, sendMessageAPIRoute);

module.exports = Router;
