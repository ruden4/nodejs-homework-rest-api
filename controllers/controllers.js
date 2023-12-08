const Contact = require("../models/contact");

const {  HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
        const result = await Contact.find();
        res.json(result);
};

const getById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
};

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json("Delete success");
};

const updateContact = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

const addToFavorite = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    addToFavorite: ctrlWrapper(addToFavorite),
}