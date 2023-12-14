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
  login,
  logout,
  current,
  updateSub,
  updateAvatar,
};