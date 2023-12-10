const express = require("express");

const router = express.Router();

const {getAll, getById, addContact, deleteContact, updateContact, addToFavorite} = require('../../controllers');

const {addSchema, putSchema, addToFavSchema} = require("../../helpers");

const { authenticate, validateBody, isValidId} = require("../../middlewares");


// GET ALL
router.get("/", authenticate, getAll);

// GET BY ID
router.get("/:contactId", authenticate, isValidId, getById);

// CREATE
router.post("/", authenticate, validateBody(addSchema), addContact);

// DELETE
router.delete("/:contactId", authenticate, isValidId, deleteContact);

// UPDATE
router.put("/:contactId", authenticate, validateBody(putSchema),isValidId,updateContact);

// ADD TO FAVORITE
router.patch("/:contactId/favorite", authenticate, validateBody(addToFavSchema), isValidId, addToFavorite);

module.exports = router;
