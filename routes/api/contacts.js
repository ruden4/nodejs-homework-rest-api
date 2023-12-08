const express = require("express");

const router = express.Router();

const ctrl = require('../../controllers/controllers');

const {isValidId, addSchema, putSchema, addToFavSchema} = require("../../helpers");

const validateBody = require("../../middlewares");

// GET ALL
router.get("/", ctrl.getAll);

// GET BY ID
router.get("/:contactId", isValidId, ctrl.getById);

// CREATE
router.post("/", validateBody(addSchema), ctrl.addContact);

// DELETE
router.delete("/:contactId", isValidId, ctrl.deleteContact);

// UPDATE
router.put("/:contactId", validateBody(putSchema),isValidId,ctrl.updateContact);

// ADD TO FAVORITE
router.patch("/:contactId/favorite", validateBody(addToFavSchema), isValidId, ctrl.addToFavorite);

module.exports = router;
