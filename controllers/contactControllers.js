import asyncHandler from "express-async-handler";
import Contact from "../models/contactModels.js";

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  if (!contacts) {
    res.status(404);
    throw new Error("No contacts found");
  }
  res.status(200).json(contacts);
});

// @desc    Get a contact by ID
// @route   GET /api/contacts/:id
// @access  Private

export const getContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }
  res.status(200).json(contact);
});

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Private

export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  if (!contact) {
    res.status(400);
    throw new Error("Contact not created");
  }
  console.log(contact);
  res.status(201).json(contact);
});

// @desc    Update a contact by ID
// @route   PUT /api/contacts/:id
// @access  Private

export const updateContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      name: req.body.name || contact.name,
      email: req.body.email || contact.email,
      phone: req.body.phone || contact.phone,
    },
    { new: true }
  );
  res.status(200).json(updatedContact);
});

// @desc    Delete a contact by ID
// @route   DELETE /api/contacts/:id
// @access  Private

export const deleteContactById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.findByIdAndDelete(id);
  res.status(200).json(contact);
});
