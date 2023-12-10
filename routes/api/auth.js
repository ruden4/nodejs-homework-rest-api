const express = require('express');

const { validateBody, authenticate } = require('../../middlewares');

const ctrl = require("../../controllers");

const { registerSchema, loginSchema } = require('../../models');

const router = express.Router();

router.post("/register", validateBody(registerSchema), ctrl.register);

router.post("/login", validateBody(loginSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.current);

router.patch("/", authenticate, ctrl.updateSub);


module.exports = router;