const Contact = require('./contact.js');

const {
  User,
  registerSchema,
  loginSchema,
  verifySchema,
} = require("./user.js");

module.exports = {
  Contact,
  User,
  registerSchema,
  loginSchema,
  verifySchema,
};