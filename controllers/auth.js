const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const { HttpError, ctrlWrapper, sendEmail} = require("../helpers");

const { User } = require("../models");

  const avatarsDir = path.join(__dirname, "../", "public", "avatars")

// REGISTER
const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${process.env.BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
  }

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

// VERIFY
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken })
  if (!user) {
    throw HttpError(401, "Email not found")
  }
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

  res.json({
    message: "Email verify success"
  })
};

// RESEND VERIFY 
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found")
  };
  if (user.verify) {
    throw HttpError(401, "Email already verify");
  };

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blanc" href="${process.env.BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send succes"
  })
};

// LOG IN
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  };

  if (!user.verify) {
    throw HttpError(401, "Email is not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  };

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token})
  res.json({
    token,
  });
};

// LOG OUT
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({message: "Logout success"})
};

// GET CURRENT
const current = async (req, res) => {
  const { email, name } = req.user;
  res.json({ name, email });
};

// UPDATE SUBSCRIPTION
const updateSub = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription, });
  res.json({ message: `User ${_id} change subscription to - "${subscription}"` })
};

// UPDATE AVATAR
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  jimp // CROP AVATAR
    .read(resultUpload)
    .then((img) => {
      return img.resize(250, 250).write(resultUpload);
    })
    .catch((error) => console.log(error));
  
  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSub: ctrlWrapper(updateSub),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
