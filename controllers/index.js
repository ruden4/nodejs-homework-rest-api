const {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  addToFavorite,
} = require("./contacts");

const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  current,
  updateSub,
  updateAvatar,
} = require("./auth");


module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
  addToFavorite,
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  logout,
  current,
  updateSub,
  updateAvatar,
};