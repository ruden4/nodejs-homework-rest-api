const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');

const ctrl = require("../../controllers");

const { registerSchema, loginSchema, verifySchema } = require('../../models');

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(verifySchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.current);

router.patch("/", authenticate, ctrl.updateSub);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)


module.exports = router;